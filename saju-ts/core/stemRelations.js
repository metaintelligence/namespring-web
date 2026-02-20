import { mod } from './mod.js';
const STEM_RELATION_ORDER = ['HAP', 'CHUNG'];
const STEM_RELATION_RANK = Object.fromEntries(STEM_RELATION_ORDER.map((t, i) => [t, i]));
function compareStemRelation(a, b) {
    const ra = STEM_RELATION_RANK[a.type] ?? 999;
    const rb = STEM_RELATION_RANK[b.type] ?? 999;
    if (ra !== rb)
        return ra - rb;
    const [a0, a1] = a.members;
    const [b0, b1] = b.members;
    if (a0 !== b0)
        return a0 - b0;
    if (a1 !== b1)
        return a1 - b1;
    return 0;
}
export function stemHapPartner(i) {
    return mod(i + 5, 10);
}
export function stemHapResultElement(a, b) {
    const x = Math.min(mod(a, 10), mod(b, 10));
    const y = Math.max(mod(a, 10), mod(b, 10));
    // 甲己合土, 乙庚合金, 丙辛合水, 丁壬合木, 戊癸合火
    if (x === 0 && y === 5)
        return 'EARTH';
    if (x === 1 && y === 6)
        return 'METAL';
    if (x === 2 && y === 7)
        return 'WATER';
    if (x === 3 && y === 8)
        return 'WOOD';
    if (x === 4 && y === 9)
        return 'FIRE';
    return undefined;
}
export function isStemChung(a, b) {
    const x = Math.min(mod(a, 10), mod(b, 10));
    const y = Math.max(mod(a, 10), mod(b, 10));
    // 甲庚冲, 乙辛冲, 丙壬冲, 丁癸冲
    return ((x === 0 && y === 6) ||
        (x === 1 && y === 7) ||
        (x === 2 && y === 8) ||
        (x === 3 && y === 9));
}
function uniqByKey(arr, key) {
    const seen = new Set();
    const out = [];
    for (const x of arr) {
        const k = key(x);
        if (seen.has(k))
            continue;
        seen.add(k);
        out.push(x);
    }
    return out;
}
export function detectStemRelations(stems) {
    const ss = stems.map((s) => mod(s, 10));
    const rels = [];
    for (let i = 0; i < ss.length; i++) {
        for (let j = i + 1; j < ss.length; j++) {
            const a = ss[i];
            const b = ss[j];
            if (stemHapPartner(a) === b) {
                rels.push({
                    type: 'HAP',
                    members: [Math.min(a, b), Math.max(a, b)],
                    resultElement: stemHapResultElement(a, b),
                });
            }
            if (isStemChung(a, b)) {
                rels.push({ type: 'CHUNG', members: [Math.min(a, b), Math.max(a, b)] });
            }
        }
    }
    return uniqByKey(rels, (r) => `${r.type}:${r.members[0]}-${r.members[1]}`).sort(compareStemRelation);
}
