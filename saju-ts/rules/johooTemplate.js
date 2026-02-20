import { branchHanja, stemElement, stemHanja, stemIdxFromHanja } from '../core/cycle.js';
import { ELEMENT_ORDER } from '../core/elementVector.js';
import { seasonGroupOfMonthBranch } from './season.js';
const DEFAULT_STEM_PREFERENCES = {
    // A compact “互不离” set (config override supported).
    // See docs/20_johoo_template.md for rationale & references.
    '甲': ['庚'],
    '乙': ['癸'],
    '丙': ['壬'],
    '丁': ['甲'],
    '戊': ['甲'],
    '己': ['丙'],
    '庚': ['丁'],
    '辛': ['壬'],
    '壬': ['戊'],
    '癸': ['辛'],
};
function asNumber(x, fallback) {
    return typeof x === 'number' && Number.isFinite(x) ? x : fallback;
}
function readPolicy(config) {
    const raw = config.strategies?.yongshin?.johooTemplate ?? config.strategies?.johooTemplate ?? {};
    return {
        enabled: raw?.enabled === true,
        seasonMandatoryBoost: asNumber(raw?.seasonMandatoryBoost, 0.35),
        stemPreferenceBoost: asNumber(raw?.stemPreferenceBoost, 0.25),
        enforceSummerWinter: raw?.enforceSummerWinter !== false,
        stemPreferencesOverride: raw?.stemPreferencesOverride && typeof raw?.stemPreferencesOverride === 'object' ? raw.stemPreferencesOverride : undefined,
    };
}
function mergeStemPref(policy) {
    const base = { ...DEFAULT_STEM_PREFERENCES };
    const ov = policy.stemPreferencesOverride;
    if (!ov)
        return base;
    for (const [k, v] of Object.entries(ov)) {
        if (!Array.isArray(v))
            continue;
        const arr = v.map((x) => (typeof x === 'string' ? x.trim() : '')).filter(Boolean);
        if (arr.length === 0)
            continue;
        base[k] = arr;
    }
    return base;
}
function mandatoryBySeason(season) {
    // Minimal step rule: winter needs fire, summer needs water.
    if (season === 'WINTER')
        return ['FIRE'];
    if (season === 'SUMMER')
        return ['WATER'];
    return [];
}
export function computeJohooTemplate(config, args) {
    const policy = readPolicy(config);
    if (!policy.enabled)
        return null;
    const seasonGroup = seasonGroupOfMonthBranch(args.monthBranch);
    const dayStemHanja = stemHanja(args.dayStem);
    const monthBranchHanja = branchHanja(args.monthBranch);
    const prefs = mergeStemPref(policy);
    const prefHanjaBase = prefs[dayStemHanja] ?? [];
    const prefHanja = [...prefHanjaBase];
    const preferredStems = prefHanja.map((h) => stemIdxFromHanja(h)).filter((x) => typeof x === 'number');
    const preferredElements = preferredStems.map((s) => stemElement(s));
    const mandatoryElements = mandatoryBySeason(seasonGroup);
    const bonus = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
    const reasons = [];
    for (const e of mandatoryElements) {
        bonus[e] += policy.seasonMandatoryBoost;
    }
    if (mandatoryElements.length > 0)
        reasons.push(`seasonMandatory:${seasonGroup}`);
    // “互不离” stems → element bonus.
    for (const s of preferredStems) {
        const el = stemElement(s);
        bonus[el] += policy.stemPreferenceBoost;
    }
    if (preferredStems.length > 0)
        reasons.push(`stemPreference:${dayStemHanja}`);
    // Optional: enforce “夏不离水 / 冬不离火” even if users later extend season mapping.
    if (policy.enforceSummerWinter) {
        // Also inject the classic “冬生要丙 / 夏生要癸” stem-level hint.
        // This is intentionally minimal and uses the same stemPreferenceBoost.
        const extraStemHanja = seasonGroup === 'WINTER' ? '丙' : seasonGroup === 'SUMMER' ? '癸' : null;
        if (extraStemHanja) {
            const extraStem = stemIdxFromHanja(extraStemHanja);
            if (typeof extraStem === 'number' && preferredStems.indexOf(extraStem) === -1) {
                prefHanja.push(extraStemHanja);
                preferredStems.push(extraStem);
                preferredElements.push(stemElement(extraStem));
                bonus[stemElement(extraStem)] += policy.stemPreferenceBoost;
                reasons.push(`seasonStemHelper:${seasonGroup}:${extraStemHanja}`);
            }
        }
    }
    const combinedScores = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
    for (const e of ELEMENT_ORDER)
        combinedScores[e] = (args.climateScores[e] ?? 0) + (bonus[e] ?? 0);
    const ranking = [...ELEMENT_ORDER]
        .map((e) => ({ element: e, score: combinedScores[e] }))
        .sort((a, b) => b.score - a.score);
    return {
        enabled: true,
        seasonGroup,
        dayStem: args.dayStem,
        monthBranch: args.monthBranch,
        dayStemHanja,
        monthBranchHanja,
        preferredStems,
        preferredStemHanja: prefHanja,
        preferredElements,
        mandatoryElements,
        bonus,
        combinedScores,
        ranking,
        primary: ranking[0]?.element ?? 'WOOD',
        secondary: ranking[1]?.element ?? ranking[0]?.element ?? 'WOOD',
        reasons,
    };
}
