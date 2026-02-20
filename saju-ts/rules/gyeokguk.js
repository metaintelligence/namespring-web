import { evalRuleSet } from './dsl.js';
import { DEFAULT_GYEOKGUK_RULESET } from './defaultRuleSets.js';
import { compileGyeokgukRuleSpec } from './spec/compileGyeokgukSpec.js';
import { compete, renormalizeScale } from '../core/competition.js';
const TEN_GOD_GROUP_KEYS = [
    'gyeokguk.JEONG_GWAN',
    'gyeokguk.PYEON_GWAN',
    'gyeokguk.JEONG_JAE',
    'gyeokguk.PYEON_JAE',
    'gyeokguk.SIK_SHIN',
    'gyeokguk.SANG_GWAN',
    'gyeokguk.JEONG_IN',
    'gyeokguk.PYEON_IN',
    'gyeokguk.BI_GYEON',
    'gyeokguk.GEOB_JAE',
];
const DEFAULT_COMP_GROUPS = {
    follow: { prefixes: ['gyeokguk.CONG_'] },
    transformations: { keys: ['gyeokguk.HUA_QI'] },
    oneElement: { keys: ['gyeokguk.ZHUAN_WANG'] },
    tenGod: { keys: TEN_GOD_GROUP_KEYS },
};
const DEFAULT_COMP_SIGNALS = {
    follow: 'auto',
    transformations: 'auto',
    oneElement: 'auto',
    tenGod: 'monthQuality',
};
const DEFAULT_POLICY = {
    ruleSet: DEFAULT_GYEOKGUK_RULESET,
    tieBreakOrder: [
        'gyeokguk.JEONG_GWAN',
        'gyeokguk.PYEON_GWAN',
        'gyeokguk.JEONG_JAE',
        'gyeokguk.PYEON_JAE',
        'gyeokguk.SIK_SHIN',
        'gyeokguk.SANG_GWAN',
        'gyeokguk.JEONG_IN',
        'gyeokguk.PYEON_IN',
        'gyeokguk.BI_GYEON',
        'gyeokguk.GEOB_JAE',
        // Advanced/high-level pattern keys (kept last by default so ten-god 格局 remains primary)
        'gyeokguk.HUA_QI',
        'gyeokguk.ZHUAN_WANG',
        'gyeokguk.CONG_CAI',
        'gyeokguk.CONG_GUAN',
        'gyeokguk.CONG_SHA',
        'gyeokguk.CONG_ER',
        'gyeokguk.CONG_YIN',
        'gyeokguk.CONG_BI',
        'gyeokguk.CONG_GE',
    ],
    competition: {
        enabled: false,
        methods: ['follow', 'transformations', 'oneElement'],
        power: 2.0,
        minKeep: 0.2,
        renormalize: true,
        groups: DEFAULT_COMP_GROUPS,
        signals: { ...DEFAULT_COMP_SIGNALS },
    },
};
// Cache compiled policy per EngineConfig identity (engine-level immutability assumption).
// This prevents repeatedly compiling JSON ruleSpecs on every analyze() call.
const POLICY_CACHE = new WeakMap();
function getCachedPolicy(config) {
    const key = config;
    const hit = POLICY_CACHE.get(key);
    if (hit)
        return hit;
    const p = buildPolicy(config);
    POLICY_CACHE.set(key, p);
    return p;
}
function asNumber(x, fallback) {
    return typeof x === 'number' && Number.isFinite(x) ? x : fallback;
}
function clamp01(x) {
    return Math.min(1, Math.max(0, x));
}
function absSum(scores, keys) {
    let s = 0;
    for (const k of keys) {
        const v = scores[k];
        if (typeof v !== 'number' || !Number.isFinite(v) || v === 0)
            continue;
        s += Math.abs(v);
    }
    return s;
}
function safeTieIndex(tieBreakOrder, key) {
    const idx = tieBreakOrder.indexOf(key);
    return idx >= 0 ? idx : 1_000_000;
}
function readTransformSignal(facts, selector = 'auto') {
    const t = facts.patterns?.transformations;
    const b = t?.best;
    const huaqi = b?.huaqiFactor;
    const eff = b?.effectiveFactor;
    const raw = b?.factor;
    if (selector === 'raw') {
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    if (selector === 'effective') {
        if (typeof eff === 'number' && Number.isFinite(eff) && eff > 0)
            return clamp01(eff);
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    if (selector === 'huaqi') {
        if (typeof huaqi === 'number' && Number.isFinite(huaqi) && huaqi > 0)
            return clamp01(huaqi);
        if (typeof eff === 'number' && Number.isFinite(eff) && eff > 0)
            return clamp01(eff);
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    // auto: huaqiFactor → effectiveFactor → factor
    if (typeof huaqi === 'number' && Number.isFinite(huaqi) && huaqi > 0)
        return clamp01(huaqi);
    if (typeof eff === 'number' && Number.isFinite(eff) && eff > 0)
        return clamp01(eff);
    if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
        return clamp01(raw);
    return 0;
}
function readOneElementSignal(facts, selector = 'auto') {
    const oe = facts.patterns?.elements?.oneElement;
    const zw = oe?.zhuanwangFactor;
    const raw = oe?.factor;
    if (selector === 'raw') {
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    if (selector === 'zhuanwang') {
        if (typeof zw === 'number' && Number.isFinite(zw) && zw > 0)
            return clamp01(zw);
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    // auto: zhuanwangFactor → factor
    if (typeof zw === 'number' && Number.isFinite(zw) && zw > 0)
        return clamp01(zw);
    if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
        return clamp01(raw);
    return 0;
}
function readFollowSignal(facts, selector = 'auto') {
    const f = facts.patterns?.follow;
    const jong = f?.jonggyeokFactor;
    const pot = f?.potential;
    const raw = f?.potentialRaw;
    if (selector === 'raw') {
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    if (selector === 'potential') {
        if (typeof pot === 'number' && Number.isFinite(pot) && pot > 0)
            return clamp01(pot);
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    if (selector === 'jonggyeok') {
        if (typeof jong === 'number' && Number.isFinite(jong) && jong > 0)
            return clamp01(jong);
        if (typeof pot === 'number' && Number.isFinite(pot) && pot > 0)
            return clamp01(pot);
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
            return clamp01(raw);
        return 0;
    }
    // auto: jonggyeokFactor → potential → potentialRaw
    if (typeof jong === 'number' && Number.isFinite(jong) && jong > 0)
        return clamp01(jong);
    if (typeof pot === 'number' && Number.isFinite(pot) && pot > 0)
        return clamp01(pot);
    if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0)
        return clamp01(raw);
    return 0;
}
function readTenGodSignal(facts, selector = 'monthQuality') {
    if (typeof selector === 'number') {
        return Number.isFinite(selector) ? clamp01(selector) : 0.5;
    }
    const sel = selector === 'auto' ? 'monthQuality' : selector;
    if (sel === 'monthQuality') {
        // Use month-gyeok quality multiplier as the “tenGod axis” signal.
        // If anything is missing, fall back to 0.5 (neutral).
        const q = facts.month?.gyeok?.quality;
        const m = q?.multiplier;
        if (typeof m === 'number' && Number.isFinite(m))
            return clamp01(m);
        return 0.5;
    }
    return 0.5;
}
function normalizeMethods(methods, fallback) {
    const xs = Array.isArray(methods) ? methods.map(String) : fallback;
    const allowed = new Set(['follow', 'transformations', 'oneElement', 'tenGod']);
    return xs.filter((m) => allowed.has(m));
}
function normalizeKeyGroupSpec(raw, fallback) {
    const arr = (x, fb) => Array.isArray(x) ? x.map(String).filter((s) => s && s.trim()) : fb;
    return {
        prefixes: arr(raw?.prefixes, fallback.prefixes),
        keys: arr(raw?.keys, fallback.keys),
        excludePrefixes: arr(raw?.excludePrefixes, fallback.excludePrefixes),
        excludeKeys: arr(raw?.excludeKeys, fallback.excludeKeys),
    };
}
function mergeGroupMap(base, override) {
    const out = {
        follow: { ...base.follow },
        transformations: { ...base.transformations },
        oneElement: { ...base.oneElement },
        tenGod: { ...base.tenGod },
    };
    if (!override || typeof override !== 'object')
        return out;
    for (const m of ['follow', 'transformations', 'oneElement', 'tenGod']) {
        if (m in override) {
            out[m] = normalizeKeyGroupSpec(override[m], base[m]);
        }
    }
    return out;
}
function normalizeSelector(value, allowed, fallback) {
    const v = typeof value === 'string' ? value : fallback;
    return allowed.has(v) ? v : fallback;
}
function mergeSignalSelectors(base, override) {
    const out = { ...base };
    if (!override || typeof override !== 'object')
        return out;
    // follow
    out.follow = normalizeSelector(override.follow, new Set(['auto', 'jonggyeok', 'potential', 'raw']), (typeof out.follow === 'string' ? out.follow : 'auto'));
    // transformations
    out.transformations = normalizeSelector(override.transformations, new Set(['auto', 'huaqi', 'effective', 'raw']), (typeof out.transformations === 'string' ? out.transformations : 'auto'));
    // oneElement
    out.oneElement = normalizeSelector(override.oneElement, new Set(['auto', 'zhuanwang', 'raw']), (typeof out.oneElement === 'string' ? out.oneElement : 'auto'));
    // tenGod: allow either a selector string or a fixed constant in [0,1]
    const tg = override.tenGod;
    if (typeof tg === 'number') {
        if (Number.isFinite(tg))
            out.tenGod = clamp01(tg);
    }
    else if (typeof tg === 'string') {
        const fb = (typeof out.tenGod === 'string' ? out.tenGod : 'monthQuality');
        out.tenGod = normalizeSelector(tg, new Set(['auto', 'monthQuality']), fb);
    }
    return out;
}
function mergeCompetition(base, override) {
    if (!override || typeof override !== 'object')
        return base;
    // Always merge through defaults to guarantee all methods get stable fallbacks.
    const mergedGroups = mergeGroupMap(mergeGroupMap(DEFAULT_COMP_GROUPS, base.groups ?? {}), override.groups);
    const mergedSignals = mergeSignalSelectors(mergeSignalSelectors(DEFAULT_COMP_SIGNALS, base.signals ?? {}), override.signals);
    return {
        enabled: typeof override.enabled === 'boolean' ? override.enabled : base.enabled,
        methods: normalizeMethods(override.methods, base.methods),
        power: asNumber(override.power, base.power),
        minKeep: asNumber(override.minKeep, base.minKeep),
        renormalize: typeof override.renormalize === 'boolean' ? override.renormalize : base.renormalize,
        groups: mergedGroups,
        signals: mergedSignals,
    };
}
function buildKeysFromGroup(scores, group) {
    const inc = new Set();
    for (const k of group.keys ?? []) {
        if (k in scores)
            inc.add(k);
    }
    const prefixes = group.prefixes ?? [];
    if (prefixes.length) {
        for (const k of Object.keys(scores)) {
            for (const p of prefixes) {
                if (k.startsWith(p)) {
                    inc.add(k);
                    break;
                }
            }
        }
    }
    // Exclusions
    for (const k of group.excludeKeys ?? []) {
        inc.delete(k);
    }
    const exPrefixes = group.excludePrefixes ?? [];
    if (exPrefixes.length) {
        for (const k of Array.from(inc)) {
            for (const p of exPrefixes) {
                if (k.startsWith(p)) {
                    inc.delete(k);
                    break;
                }
            }
        }
    }
    // Final: keep only non-zero numeric scores
    return Array.from(inc).filter((k) => {
        const v = scores[k];
        return typeof v === 'number' && Number.isFinite(v) && v !== 0;
    });
}
function applySpecialCompetition(scores, facts, policy) {
    const compPol = policy.competition;
    if (!compPol || compPol.enabled !== true)
        return null;
    const power = Math.max(0.01, asNumber(compPol.power, 2.0));
    const minKeep = clamp01(asNumber(compPol.minKeep, 0.2));
    const renormalize = compPol.renormalize !== false;
    const methods = normalizeMethods(compPol.methods, ['follow', 'transformations', 'oneElement']);
    if (methods.length < 2)
        return null;
    const groups = mergeGroupMap(DEFAULT_COMP_GROUPS, compPol.groups ?? {});
    const signalSelectors = mergeSignalSelectors(DEFAULT_COMP_SIGNALS, compPol.signals ?? {});
    const groupKeys = {
        follow: buildKeysFromGroup(scores, groups.follow),
        transformations: buildKeysFromGroup(scores, groups.transformations),
        oneElement: buildKeysFromGroup(scores, groups.oneElement),
        tenGod: buildKeysFromGroup(scores, groups.tenGod),
    };
    const groupBefore = {
        follow: absSum(scores, groupKeys.follow),
        transformations: absSum(scores, groupKeys.transformations),
        oneElement: absSum(scores, groupKeys.oneElement),
        tenGod: absSum(scores, groupKeys.tenGod),
    };
    const items = methods
        .map((name) => {
        const keys = groupKeys[name] ?? [];
        const before = groupBefore[name] ?? 0;
        const sel = signalSelectors[name];
        const signal = name === 'follow'
            ? readFollowSignal(facts, sel)
            : name === 'transformations'
                ? readTransformSignal(facts, sel)
                : name === 'oneElement'
                    ? readOneElementSignal(facts, sel)
                    : readTenGodSignal(facts, sel);
        return { name, keys, before, signal };
    })
        .filter((it) => it.before > 0 && it.keys.length > 0);
    if (items.length < 2)
        return null;
    const totalBefore = items.reduce((a, b) => a + b.before, 0);
    if (!(totalBefore > 0))
        return null;
    // Compute shares + multipliers (softmax-like); if all signals are 0, fallback to uniform.
    const sigMap = {};
    for (const it of items)
        sigMap[it.name] = it.signal;
    const comp = compete(items.map((x) => x.name), sigMap, { power, minKeep });
    const signalsOut = {};
    const sharesOut = {};
    const multOut = {};
    const methodTotals = {};
    const affectedKeys = new Set();
    const beforeMap = {};
    // Winner tracking
    let winnerMethod = null;
    let winnerShare = -1;
    for (const it of items) {
        const sh = comp.shares[it.name] ?? 0;
        if (sh > winnerShare) {
            winnerShare = sh;
            winnerMethod = it.name;
        }
    }
    for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const share = comp.shares[it.name] ?? 0;
        const mul = comp.multipliers[it.name] ?? minKeep;
        signalsOut[it.name] = it.signal;
        sharesOut[it.name] = share;
        multOut[it.name] = mul;
        methodTotals[it.name] = { before: it.before, after: 0 };
        for (const k of it.keys) {
            const v = scores[k];
            if (typeof v !== 'number' || !Number.isFinite(v) || v === 0)
                continue;
            affectedKeys.add(k);
            if (!(k in beforeMap))
                beforeMap[k] = v;
            scores[k] = v * mul;
        }
    }
    // Renormalize to preserve total |score| mass (optional).
    let scale = 1;
    if (renormalize) {
        const totalAfterRaw = absSum(scores, Array.from(affectedKeys));
        if (totalAfterRaw > 1e-12) {
            scale = renormalizeScale(totalBefore, totalAfterRaw);
            for (const k of affectedKeys) {
                const v = scores[k];
                if (typeof v !== 'number' || !Number.isFinite(v) || v === 0)
                    continue;
                scores[k] = v * scale;
            }
        }
    }
    const affected = {};
    for (const k of affectedKeys) {
        affected[k] = { before: beforeMap[k], after: scores[k] };
    }
    // Method-wise after totals
    for (const it of items) {
        methodTotals[it.name] = { before: methodTotals[it.name]?.before ?? it.before, after: absSum(scores, it.keys) };
    }
    const totalAfter = absSum(scores, Array.from(affectedKeys));
    const methodKeysOut = {};
    for (const it of items)
        methodKeysOut[it.name] = [...it.keys];
    const win = winnerMethod ? items.find((x) => x.name === winnerMethod) : undefined;
    const winner = win
        ? {
            method: win.name,
            share: comp.shares[win.name] ?? 0,
            signal: win.signal,
            multiplier: comp.multipliers[win.name] ?? minKeep,
            keys: [...win.keys],
        }
        : undefined;
    return {
        enabled: true,
        methods,
        activeMethods: items.map((x) => x.name),
        power,
        minKeep,
        renormalize,
        scale,
        groups,
        signalSelectors,
        methodKeys: methodKeysOut,
        signals: signalsOut,
        shares: sharesOut,
        multipliers: multOut,
        winner,
        totalBefore,
        totalAfter,
        methodTotals,
        affected,
    };
}
function buildPolicy(config) {
    const raw = config.strategies?.gyeokguk ?? {};
    const specInput = config.extensions?.ruleSpecs?.gyeokguk;
    const specArr = Array.isArray(specInput) ? specInput : specInput ? [specInput] : [];
    const compiledFromSpec = specInput ? compileGyeokgukRuleSpec(specInput) : null;
    const rs = config.extensions?.rulesets?.gyeokguk ??
        config.extensions?.rules?.gyeokguk ??
        compiledFromSpec ??
        DEFAULT_POLICY.ruleSet;
    const tieBreakOrder = Array.isArray(raw.tieBreakOrder) ? raw.tieBreakOrder : DEFAULT_POLICY.tieBreakOrder;
    // Competition: default → spec.policy → strategies.gyeokguk.competition
    let comp = { ...DEFAULT_POLICY.competition };
    for (const s of specArr) {
        const ov = s?.policy?.competition;
        if (ov && typeof ov === 'object')
            comp = mergeCompetition(comp, ov);
    }
    comp = mergeCompetition(comp, raw.competition ?? {});
    return { ...DEFAULT_POLICY, ruleSet: rs, tieBreakOrder, competition: comp };
}
export function computeGyeokguk(config, facts) {
    const policy = getCachedPolicy(config);
    const init = {};
    for (const k of policy.tieBreakOrder)
        init[k] = 0;
    const evalRes = evalRuleSet(policy.ruleSet, facts, init);
    // NOTE: we *mutate* the score map in-place for competition to keep allocations small.
    const scores = evalRes.scores;
    const comp = applySpecialCompetition(scores, facts, policy);
    const ranking = [...Object.entries(scores)]
        .filter(([k]) => k.startsWith('gyeokguk.'))
        .sort((a, b) => {
        if (b[1] !== a[1])
            return b[1] - a[1];
        return safeTieIndex(policy.tieBreakOrder, a[0]) - safeTieIndex(policy.tieBreakOrder, b[0]);
    })
        .map(([key, score]) => ({ key, score }));
    const best = ranking.length && ranking[0].score > 0 ? ranking[0].key : null;
    return {
        best,
        ranking,
        scores,
        competition: comp ?? undefined,
        basis: {
            monthMainTenGod: facts.month.mainTenGod,
            monthGyeokTenGod: facts.month.gyeok.tenGod,
            monthGyeokMethod: facts.month.gyeok.method,
            monthGyeokQuality: facts.month.gyeok.quality,
            competition: comp ?? undefined,
        },
        rules: { matches: evalRes.matches, assertionsFailed: evalRes.assertionsFailed },
    };
}
