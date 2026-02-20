import { stemElement, stemYinYang } from './cycle.js';
export function emptyElementTally() {
    return { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
}
export function emptyYinYangTally() {
    return { YANG: 0, YIN: 0 };
}
export function addElement(t, e, w) {
    t[e] += w;
}
export function addYinYang(t, y, w) {
    t[y] += w;
}
export function mergeElementTallies(a, b) {
    return {
        WOOD: a.WOOD + b.WOOD,
        FIRE: a.FIRE + b.FIRE,
        EARTH: a.EARTH + b.EARTH,
        METAL: a.METAL + b.METAL,
        WATER: a.WATER + b.WATER,
    };
}
export function tallyStems(stems, stemWeight = 1) {
    const el = emptyElementTally();
    const yy = emptyYinYangTally();
    for (const s of stems) {
        addElement(el, stemElement(s), stemWeight);
        addYinYang(yy, stemYinYang(s), stemWeight);
    }
    return { elements: el, yinYang: yy };
}
export function tallyHiddenStems(branchHidden, branchTotalWeight = 1) {
    const el = emptyElementTally();
    const yy = emptyYinYangTally();
    for (const hs of branchHidden) {
        const w = hs.weight * branchTotalWeight;
        addElement(el, stemElement(hs.stem), w);
        addYinYang(yy, stemYinYang(hs.stem), w);
    }
    return { elements: el, yinYang: yy };
}
