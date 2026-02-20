import { branchElement, branchHanja, branchYinYang, stemElement, stemHanja, stemYinYang, } from '../core/cycle.js';
export function toStemView(idx) {
    return {
        idx,
        text: stemHanja(idx),
        element: stemElement(idx),
        yinYang: stemYinYang(idx),
    };
}
export function toBranchView(idx) {
    return {
        idx,
        text: branchHanja(idx),
        element: branchElement(idx),
        yinYang: branchYinYang(idx),
    };
}
export function toPillarView(pillar) {
    return {
        stem: toStemView(pillar.stem),
        branch: toBranchView(pillar.branch),
    };
}
export function toHiddenStemView(h) {
    return {
        stem: toStemView(h.stem),
        role: h.role,
        weight: h.weight,
    };
}
export function toHiddenStemTenGodView(h) {
    return {
        stem: toStemView(h.stem),
        role: h.role,
        weight: h.weight,
        tenGod: h.tenGod,
    };
}
export function toStemRelationView(rel) {
    return {
        type: rel.type,
        members: rel.members.map(toStemView),
        resultElement: rel.resultElement,
    };
}
