import { branchYinYang, stemElement, stemYinYang } from './cycle.js';
import { tenGodOf } from './tenGod.js';
import { hiddenStemsOfBranch } from './hiddenStems.js';
export const DEFAULT_SCORE_POLICY = {
    stemWeight: 1,
    branchWeight: 1,
    hiddenStemWeights: { scheme: 'standard' },
    includeBranchYinYang: false,
};
export function emptyElementScore() {
    return {
        WOOD: 0,
        FIRE: 0,
        EARTH: 0,
        METAL: 0,
        WATER: 0,
    };
}
export function emptyYinYangScore() {
    return {
        YANG: 0,
        YIN: 0,
    };
}
export function emptyTenGodScore() {
    return {
        BI_GYEON: 0,
        GEOB_JAE: 0,
        SIK_SHIN: 0,
        SANG_GWAN: 0,
        PYEON_JAE: 0,
        JEONG_JAE: 0,
        PYEON_GWAN: 0,
        JEONG_GWAN: 0,
        PYEON_IN: 0,
        JEONG_IN: 0,
    };
}
export function scoreElementsFromStems(stems, weight) {
    const s = emptyElementScore();
    for (const st of stems) {
        s[stemElement(st)] += weight;
    }
    return s;
}
export function scoreYinYangFromStems(stems, weight) {
    const s = emptyYinYangScore();
    for (const st of stems) {
        s[stemYinYang(st)] += weight;
    }
    return s;
}
export function hiddenStemsWithTenGod(dayStem, branch, policy) {
    return hiddenStemsOfBranch(branch, policy).map((h) => ({
        ...h,
        tenGod: tenGodOf(dayStem, h.stem),
    }));
}
export function scorePillars(pillars, policy) {
    const p = { ...DEFAULT_SCORE_POLICY, ...policy };
    const dayStem = pillars.day.stem;
    const elements = emptyElementScore();
    const yinYang = emptyYinYangScore();
    const tenGods = emptyTenGodScore();
    const stemList = [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem];
    const branchList = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];
    // --- Stems contribute directly
    for (const st of stemList) {
        elements[stemElement(st)] += p.stemWeight;
        yinYang[stemYinYang(st)] += p.stemWeight;
        tenGods[tenGodOf(dayStem, st)] += p.stemWeight;
    }
    // --- Branches contribute via hidden stems
    const hidden = {
        year: hiddenStemsWithTenGod(dayStem, pillars.year.branch, p.hiddenStemWeights),
        month: hiddenStemsWithTenGod(dayStem, pillars.month.branch, p.hiddenStemWeights),
        day: hiddenStemsWithTenGod(dayStem, pillars.day.branch, p.hiddenStemWeights),
        hour: hiddenStemsWithTenGod(dayStem, pillars.hour.branch, p.hiddenStemWeights),
    };
    for (const key of ['year', 'month', 'day', 'hour']) {
        for (const h of hidden[key]) {
            const w = p.branchWeight * h.weight;
            elements[stemElement(h.stem)] += w;
            yinYang[stemYinYang(h.stem)] += w;
            tenGods[h.tenGod] += w;
        }
    }
    if (p.includeBranchYinYang) {
        for (const br of branchList) {
            yinYang[branchYinYang(br)] += p.branchWeight;
        }
    }
    return { elements, yinYang, tenGods, hiddenStems: hidden };
}
