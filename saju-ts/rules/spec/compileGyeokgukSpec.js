import { ELEMENT_ORDER } from '../../core/elementVector.js';
import { DEFAULT_GYEOKGUK_RULESET } from '../defaultRuleSets.js';
function renderTemplate(template, vars) {
    return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (_m, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}
function andAll(parts) {
    const xs = parts.filter((x) => x != null);
    if (xs.length === 0)
        return true;
    if (xs.length === 1)
        return xs[0];
    return { op: 'and', args: xs };
}
function compileMonthQualityGate(gate) {
    if (!gate || typeof gate !== 'object')
        return null;
    const parts = [];
    if (gate.requireNotBroken === true)
        parts.push({ op: 'eq', args: [{ var: 'month.gyeok.quality.broken' }, false] });
    if (gate.requireNotMixed === true)
        parts.push({ op: 'eq', args: [{ var: 'month.gyeok.quality.mixed' }, false] });
    if (typeof gate.minMultiplier === 'number' && Number.isFinite(gate.minMultiplier))
        parts.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.multiplier' }, gate.minMultiplier] });
    if (typeof gate.minIntegrity === 'number' && Number.isFinite(gate.minIntegrity))
        parts.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.integrity' }, gate.minIntegrity] });
    if (typeof gate.minClarity === 'number' && Number.isFinite(gate.minClarity))
        parts.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.clarity' }, gate.minClarity] });
    if (gate.requireQingZhuo === 'QING' || gate.requireQingZhuo === 'ZHUO')
        parts.push({ op: 'eq', args: [{ var: 'month.gyeok.quality.qingZhuo' }, gate.requireQingZhuo] });
    return parts.length ? andAll(parts) : null;
}
function monthQualityGuards(mq) {
    if (!mq || typeof mq !== 'object')
        return [];
    const out = [];
    const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
    const minMul = num(mq.minMultiplier);
    const minCl = num(mq.minClarity);
    const minIn = num(mq.minIntegrity);
    if (minMul != null)
        out.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.multiplier' }, minMul] });
    if (minCl != null)
        out.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.clarity' }, minCl] });
    if (minIn != null)
        out.push({ op: 'gte', args: [{ var: 'month.gyeok.quality.integrity' }, minIn] });
    if (mq.requireQing === true)
        out.push({ op: 'eq', args: [{ var: 'month.gyeok.quality.qingZhuo' }, 'QING'] });
    if (mq.excludeZhuo === true)
        out.push({ op: 'ne', args: [{ var: 'month.gyeok.quality.qingZhuo' }, 'ZHUO'] });
    if (mq.excludeBroken === true)
        out.push({ op: 'ne', args: [{ var: 'month.gyeok.quality.broken' }, true] });
    if (mq.excludeMixed === true)
        out.push({ op: 'ne', args: [{ var: 'month.gyeok.quality.mixed' }, true] });
    return out;
}
const ALL_TEN_GODS = [
    'BI_GYEON',
    'GEOB_JAE',
    'SIK_SHIN',
    'SANG_GWAN',
    'PYEON_JAE',
    'JEONG_JAE',
    'PYEON_GWAN',
    'JEONG_GWAN',
    'PYEON_IN',
    'JEONG_IN',
];
function compileMacros(macros) {
    const out = [];
    for (const m of macros ?? []) {
        switch (m.kind) {
            case 'monthMainTenGod': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_MONTH_MAIN_TENGOD';
                const explainTpl = m.explainTemplate ?? '월지 본기 십성({tenGod}) → {tenGod}격(보정)';
                const tags = m.tags;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 1;
                const tenGods = (m.tenGods && m.tenGods.length ? m.tenGods : ALL_TEN_GODS).filter(Boolean);
                for (const tg of tenGods) {
                    const whenTg = { op: 'eq', args: [{ var: 'month.mainTenGod' }, tg] };
                    out.push({
                        id: `${idPrefix}_${tg}`,
                        when: andAll([m.when, whenTg]),
                        score: { [`gyeokguk.${tg}`]: bonus },
                        explain: renderTemplate(explainTpl, { tenGod: tg }),
                        tags,
                    });
                }
                break;
            }
            case 'monthGyeokTenGod': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_MONTH_GYEOK_TENGOD';
                const explainTpl = m.explainTemplate ?? '월지 투간/회지 십성({tenGod}) → {tenGod}격(보정)';
                const tags = m.tags;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 1;
                const useMul = m.useQualityMultiplier === true;
                const mulVar = typeof m.qualityMultiplierVar === 'string' ? m.qualityMultiplierVar : 'month.gyeok.quality.multiplier';
                const baseScore = useMul ? { op: 'mul', args: [bonus, { var: mulVar }] } : bonus;
                const tenGods = (m.tenGods && m.tenGods.length ? m.tenGods : ALL_TEN_GODS).filter(Boolean);
                for (const tg of tenGods) {
                    const whenTg = { op: 'eq', args: [{ var: 'month.gyeok.tenGod' }, tg] };
                    out.push({
                        id: `${idPrefix}_${tg}`,
                        when: andAll([m.when, whenTg]),
                        score: { [`gyeokguk.${tg}`]: baseScore },
                        explain: renderTemplate(explainTpl, { tenGod: tg }),
                        tags,
                    });
                }
                break;
            }
            case 'customRules':
                out.push(...(m.rules ?? []));
                break;
            case 'oneElementDominance': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_ONEELEMENT';
                const explainTpl = m.explainTemplate ?? '일행득기/专旺({element}) 신호 → 专旺格 후보({key}) 보정';
                const tags = m.tags;
                const minFactor = typeof m.minFactor === 'number' && Number.isFinite(m.minFactor) ? m.minFactor : 0.62;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 0.85;
                const key = typeof m.key === 'string' && m.key.trim() ? m.key : 'gyeokguk.ZHUAN_WANG';
                const factorSel = m.factor === 'zhuanwang' || m.factor === 'raw' ? m.factor : 'raw';
                const rawVar = 'patterns.elements.oneElement.factor';
                const zwVar = 'patterns.elements.oneElement.zhuanwangFactor';
                const factorExpr = factorSel === 'zhuanwang'
                    ? {
                        op: 'if',
                        args: [
                            { op: 'gt', args: [{ var: zwVar }, 0] },
                            { var: zwVar },
                            { var: rawVar },
                        ],
                    }
                    : { var: rawVar };
                const elVar = 'patterns.elements.oneElement.element';
                const baseGuards = [];
                if (m.requireIsOneElement === true)
                    baseGuards.push({ op: 'eq', args: [{ var: 'patterns.elements.oneElement.isOneElement' }, true] });
                baseGuards.push(...monthQualityGuards(m.monthQuality));
                {
                    const qGate = compileMonthQualityGate(m.qualityGate);
                    if (qGate)
                        baseGuards.push(qGate);
                }
                for (const e of ELEMENT_ORDER) {
                    const when = andAll([
                        m.when,
                        { op: 'gte', args: [factorExpr, minFactor] },
                        { op: 'eq', args: [{ var: elVar }, e] },
                        ...m.requireDayMasterMatch === true ? [{ op: 'eq', args: [{ var: 'dayMaster.element' }, e] }] : [],
                        ...baseGuards,
                    ]);
                    out.push({
                        id: `${idPrefix}_${e}`,
                        when,
                        score: { [key]: { op: 'mul', args: [factorExpr, bonus] } },
                        explain: renderTemplate(explainTpl, { element: e, key }),
                        tags,
                    });
                }
                break;
            }
            case 'transformationsBest': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_TRANSFORM';
                const explainTpl = m.explainTemplate ?? '합화(化气) best 신호 → 化气格 후보({key}) 보정';
                const tags = m.tags;
                const minFactor = typeof m.minFactor === 'number' && Number.isFinite(m.minFactor) ? m.minFactor : 0.6;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 0.85;
                const key = typeof m.key === 'string' && m.key.trim() ? m.key : 'gyeokguk.HUA_QI';
                const factorSel = m.factor === 'huaqi' || m.factor === 'raw' || m.factor === 'effective' ? m.factor : 'effective';
                const factorVar = factorSel === 'huaqi'
                    ? 'patterns.transformations.best.huaqiFactor'
                    : factorSel === 'raw'
                        ? 'patterns.transformations.best.factor'
                        : 'patterns.transformations.best.effectiveFactor';
                const guards = [];
                if (m.requireDayMasterInvolved === true) {
                    guards.push({ op: 'eq', args: [{ var: 'patterns.transformations.best.huaqiDetails.flags.dayInvolved' }, true] });
                }
                guards.push(...monthQualityGuards(m.monthQuality));
                {
                    const qGate = compileMonthQualityGate(m.qualityGate);
                    if (qGate)
                        guards.push(qGate);
                }
                out.push({
                    id: `${idPrefix}_BEST`,
                    when: andAll([m.when, { op: 'gte', args: [{ var: factorVar }, minFactor] }, ...guards]),
                    score: { [key]: { op: 'mul', args: [{ var: factorVar }, bonus] } },
                    explain: renderTemplate(explainTpl, { key }),
                    tags,
                });
                break;
            }
            case 'followJonggyeok': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_FOLLOW';
                const explainTpl = m.explainTemplate ?? '종격/从格(jonggyeok) 신호 → 从格 후보({key}) 보정';
                const tags = m.tags;
                const minFactor = typeof m.minFactor === 'number' && Number.isFinite(m.minFactor) ? m.minFactor : 0.6;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 0.85;
                const key = typeof m.key === 'string' && m.key.trim() ? m.key : 'gyeokguk.CONG_GE';
                const factorSel = m.factor === 'potential' || m.factor === 'jonggyeok' ? m.factor : 'jonggyeok';
                const factorVar = factorSel === 'potential' ? 'patterns.follow.potential' : 'patterns.follow.jonggyeokFactor';
                const modeSel = m.mode === 'PRESSURE' || m.mode === 'SUPPORT' || m.mode === 'ANY' ? m.mode : 'ANY';
                const modeWhen = modeSel === 'PRESSURE' || modeSel === 'SUPPORT' ? { op: 'eq', args: [{ var: 'patterns.follow.mode' }, modeSel] } : null;
                const guards = [];
                // Optional: filter by followType
                if (Array.isArray(m.types) && m.types.length) {
                    guards.push({ op: 'in', args: [{ var: 'patterns.follow.followType' }, m.types] });
                }
                if (Array.isArray(m.excludeTypes) && m.excludeTypes.length) {
                    guards.push({ op: 'not', args: [{ op: 'in', args: [{ var: 'patterns.follow.followType' }, m.excludeTypes] }] });
                }
                // Optional: require subtype confidence
                if (typeof m.minSubtypeConfidence === 'number' && Number.isFinite(m.minSubtypeConfidence)) {
                    guards.push({ op: 'gte', args: [{ var: 'patterns.follow.followTenGodSplit.confidence' }, m.minSubtypeConfidence] });
                }
                guards.push(...monthQualityGuards(m.monthQuality));
                {
                    const qGate = compileMonthQualityGate(m.qualityGate);
                    if (qGate)
                        guards.push(qGate);
                }
                out.push({
                    id: `${idPrefix}_${modeSel}_${factorSel}`,
                    when: andAll([m.when, modeWhen, { op: 'gte', args: [{ var: factorVar }, minFactor] }, ...guards]),
                    score: { [key]: { op: 'mul', args: [{ var: factorVar }, bonus] } },
                    explain: renderTemplate(explainTpl, { key }),
                    tags,
                });
                break;
            }
            case 'followJonggyeokTyped': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_FOLLOW_TYPED';
                const explainTpl = m.explainTemplate ?? '종격/从格 type={type} 신호 → 从格 후보({key}) 보정';
                const tags = m.tags;
                const minFactor = typeof m.minFactor === 'number' && Number.isFinite(m.minFactor) ? m.minFactor : 0.6;
                const bonus = typeof m.bonus === 'number' && Number.isFinite(m.bonus) ? m.bonus : 0.85;
                const keyPrefix = typeof m.keyPrefix === 'string' && m.keyPrefix.trim() ? m.keyPrefix : 'gyeokguk.';
                const factorSel = m.factor === 'potential' || m.factor === 'jonggyeok' ? m.factor : 'jonggyeok';
                const factorVar = factorSel === 'potential' ? 'patterns.follow.potential' : 'patterns.follow.jonggyeokFactor';
                const modeSel = m.mode === 'PRESSURE' || m.mode === 'SUPPORT' || m.mode === 'ANY' ? m.mode : 'ANY';
                const modeWhen = modeSel === 'PRESSURE' || modeSel === 'SUPPORT' ? { op: 'eq', args: [{ var: 'patterns.follow.mode' }, modeSel] } : null;
                const typesRaw = Array.isArray(m.types) ? m.types : [];
                const valid = (t) => t === 'CONG_CAI' || t === 'CONG_GUAN' || t === 'CONG_SHA' || t === 'CONG_ER' || t === 'CONG_YIN' || t === 'CONG_BI';
                const types = typesRaw.length ? typesRaw.filter(valid) : ['CONG_CAI', 'CONG_GUAN', 'CONG_SHA', 'CONG_ER', 'CONG_YIN', 'CONG_BI'];
                const guardsBase = [];
                if (typeof m.minSubtypeConfidence === 'number' && Number.isFinite(m.minSubtypeConfidence)) {
                    guardsBase.push({ op: 'gte', args: [{ var: 'patterns.follow.followTenGodSplit.confidence' }, m.minSubtypeConfidence] });
                }
                guardsBase.push(...monthQualityGuards(m.monthQuality));
                {
                    const qGate = compileMonthQualityGate(m.qualityGate);
                    if (qGate)
                        guardsBase.push(qGate);
                }
                for (const type of types) {
                    const key = `${keyPrefix}${type}`;
                    out.push({
                        id: `${idPrefix}_${type}_${modeSel}_${factorSel}`,
                        when: andAll([
                            m.when,
                            modeWhen,
                            { op: 'eq', args: [{ var: 'patterns.follow.followType' }, type] },
                            { op: 'gte', args: [{ var: factorVar }, minFactor] },
                            ...guardsBase,
                        ]),
                        score: { [key]: { op: 'mul', args: [{ var: factorVar }, bonus] } },
                        explain: renderTemplate(explainTpl, { key, type }),
                        tags,
                    });
                }
                break;
            }
            case 'suppressOtherFrames': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_SUPPRESS';
                const explainTpl = m.explainTemplate ?? 'special-frame suppression: {winner} strong → suppress {key}';
                const tags = m.tags;
                const winner = m.winner;
                const minFactor = typeof m.minFactor === 'number' && Number.isFinite(m.minFactor) ? m.minFactor : 0.65;
                const penalty = typeof m.penalty === 'number' && Number.isFinite(m.penalty) ? m.penalty : 0.6;
                // Winner factor expression
                let factorExpr = 0;
                if (winner === 'follow') {
                    const sel = (m.factor && m.factor.frame === 'follow' ? m.factor.sel : null);
                    const s = sel === 'potential' || sel === 'jonggyeok' ? sel : 'jonggyeok';
                    const v = s === 'potential' ? 'patterns.follow.potential' : 'patterns.follow.jonggyeokFactor';
                    factorExpr = { var: v };
                }
                else if (winner === 'transformations') {
                    const sel = (m.factor && m.factor.frame === 'transformations' ? m.factor.sel : null);
                    const s = sel === 'huaqi' || sel === 'raw' || sel === 'effective' ? sel : 'effective';
                    const v = s === 'huaqi' ? 'patterns.transformations.best.huaqiFactor' : s === 'raw' ? 'patterns.transformations.best.factor' : 'patterns.transformations.best.effectiveFactor';
                    factorExpr = { var: v };
                }
                else if (winner === 'oneElement') {
                    const sel = (m.factor && m.factor.frame === 'oneElement' ? m.factor.sel : null);
                    const s = sel === 'zhuanwang' || sel === 'raw' ? sel : 'raw';
                    const rawVar = 'patterns.elements.oneElement.factor';
                    const zwVar = 'patterns.elements.oneElement.zhuanwangFactor';
                    factorExpr =
                        s === 'zhuanwang'
                            ? {
                                op: 'if',
                                args: [
                                    { op: 'gt', args: [{ var: zwVar }, 0] },
                                    { var: zwVar },
                                    { var: rawVar },
                                ],
                            }
                            : { var: rawVar };
                }
                const baseWhen = andAll([m.when, { op: 'gte', args: [factorExpr, minFactor] }]);
                const km = m.keyMap ?? {};
                const defaultKeys = (frame) => {
                    if (frame === 'transformations')
                        return ['gyeokguk.HUA_QI'];
                    if (frame === 'oneElement')
                        return ['gyeokguk.ZHUAN_WANG'];
                    return ['gyeokguk.CONG_CAI', 'gyeokguk.CONG_GUAN', 'gyeokguk.CONG_SHA', 'gyeokguk.CONG_ER', 'gyeokguk.CONG_YIN', 'gyeokguk.CONG_BI', 'gyeokguk.CONG_GE'];
                };
                const targetsRaw = Array.isArray(m.targets) ? m.targets : ['transformations', 'oneElement', 'follow'];
                const targets = targetsRaw.filter((x) => x === 'transformations' || x === 'oneElement' || x === 'follow');
                for (const target of targets) {
                    if (target === winner)
                        continue;
                    const keys = Array.isArray(km?.[target]) && km[target].length ? km[target] : defaultKeys(target);
                    for (const key of keys) {
                        out.push({
                            id: `${idPrefix}_${winner}_${target}_${String(key).replace(/[^a-zA-Z0-9_]/g, '_')}`,
                            when: baseWhen,
                            score: { [key]: { op: 'mul', args: [factorExpr, -penalty] } },
                            explain: renderTemplate(explainTpl, { winner, target, key }),
                            tags,
                        });
                    }
                }
                break;
            }
            case 'penalizeKeyWhen': {
                const idPrefix = m.idPrefix ?? 'GYEOKGUK_PENALIZE';
                const explainTpl = m.explainTemplate ?? 'penalize {key} when condition holds';
                const tags = m.tags;
                const key = typeof m.key === 'string' && m.key.trim() ? m.key.trim() : '';
                const pRaw = typeof m.penalty === 'number' && Number.isFinite(m.penalty) ? m.penalty : 0;
                const penalty = Math.abs(pRaw);
                if (!key || penalty <= 0)
                    break;
                const scaleVar = typeof m.scaleVar === 'string' && m.scaleVar.trim() ? m.scaleVar : null;
                const scoreExpr = scaleVar ? { op: 'mul', args: [{ var: scaleVar }, -penalty] } : -penalty;
                out.push({
                    id: `${idPrefix}_${String(key).replace(/[^a-zA-Z0-9_]/g, '_')}`,
                    when: m.when ?? true,
                    score: { [key]: scoreExpr },
                    explain: renderTemplate(explainTpl, { key }),
                    tags,
                });
                break;
            }
            default: {
                const _exhaustive = m;
                throw new Error(`Unknown gyeokguk macro kind: ${m.kind}`);
            }
        }
    }
    return out;
}
function applyMode(baseRules, compiled, mode) {
    switch (mode) {
        case 'prepend':
            return [...compiled, ...baseRules];
        case 'replace':
            return [...compiled];
        case 'append':
        default:
            return [...baseRules, ...compiled];
    }
}
export function compileGyeokgukRuleSpec(specInput) {
    const specs = Array.isArray(specInput) ? specInput : [specInput];
    if (specs.length === 0)
        return DEFAULT_GYEOKGUK_RULESET;
    let rules = [];
    let meta = {
        id: specs[0]?.id ?? 'gyeokguk.spec',
        version: specs[0]?.version ?? '0.1',
        description: specs[0]?.description,
    };
    let first = true;
    for (const s of specs) {
        const compiled = compileMacros(s.macros ?? []);
        if (first) {
            const base = s.base ?? 'default';
            const baseRules = base === 'default' ? DEFAULT_GYEOKGUK_RULESET.rules : [];
            const mode = s.mode ?? 'append';
            rules = applyMode(baseRules, compiled, mode);
            meta = {
                id: s.id ?? meta.id,
                version: s.version ?? meta.version,
                description: s.description ?? meta.description,
            };
            first = false;
        }
        else {
            const mode = s.mode ?? 'append';
            rules = applyMode(rules, compiled, mode);
            if (s.description)
                meta.description = (meta.description ? `${meta.description}\n` : '') + s.description;
        }
    }
    return {
        id: meta.id,
        version: meta.version,
        description: meta.description,
        rules,
    };
}
