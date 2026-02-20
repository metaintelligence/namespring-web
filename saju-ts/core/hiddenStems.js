import { mod } from './mod.js';
const M = 'MAIN';
const MD = 'MIDDLE';
const R = 'RESIDUAL';
const e = (stem, role) => ({ stem, role });
/**
 * Minimal “raw” hidden-stem table (12 branches × up to 3 stems).
 *
 * Order per branch is significant:
 * - 1 stem: [MAIN]
 * - 2 stems: [MAIN, RESIDUAL]
 * - 3 stems: [MAIN, MIDDLE, RESIDUAL]
 */
export const rawHiddenStemsTable = [
    /* 子 */ [e(9, M)],
    /* 丑 */ [e(5, M), e(9, MD), e(7, R)],
    /* 寅 */ [e(0, M), e(2, MD), e(4, R)],
    /* 卯 */ [e(1, M)],
    /* 辰 */ [e(4, M), e(1, MD), e(9, R)],
    /* 巳 */ [e(2, M), e(6, MD), e(4, R)],
    /* 午 */ [e(3, M), e(5, R)],
    /* 未 */ [e(5, M), e(3, MD), e(1, R)],
    /* 申 */ [e(6, M), e(8, MD), e(4, R)],
    /* 酉 */ [e(7, M)],
    /* 戌 */ [e(4, M), e(7, MD), e(3, R)],
    /* 亥 */ [e(8, M), e(0, R)],
];
function weightsForCount(n, scheme, std) {
    if (n <= 0)
        return [];
    if (scheme === 'equal')
        return Array.from({ length: n }, () => 1 / n);
    // standard
    if (n === 1)
        return [std?.one ?? 1];
    if (n === 2)
        return [std?.two?.main ?? 0.7, std?.two?.residual ?? 0.3];
    return [std?.three?.main ?? 0.6, std?.three?.middle ?? 0.3, std?.three?.residual ?? 0.1];
}
function normalize(xs) {
    const s = xs.reduce((a, x) => a + (Number.isFinite(x) ? x : 0), 0);
    if (s <= 0)
        return xs.map(() => 0);
    return xs.map((x) => x / s);
}
/**
 * Get hidden stems of a branch with weights.
 *
 * - Table is fixed (small) and expressed as indices.
 * - Weights are “policy”, not “data”: by default, `standard` uses (1), (0.7/0.3), (0.6/0.3/0.1).
 */
export function hiddenStemsOfBranch(branch, policy = { scheme: 'standard' }) {
    const b = mod(branch, 12);
    const base = rawHiddenStemsTable[b] ?? [];
    const wRaw = weightsForCount(base.length, policy.scheme ?? 'standard', policy.standard);
    const w = normalize(wRaw);
    return base.map((x, i) => ({ ...x, weight: w[i] ?? 0 }));
}
