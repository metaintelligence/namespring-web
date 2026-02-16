export function setsEqual(a, b) {
    if (a.size !== b.size)
        return false;
    for (const item of a) {
        if (!b.has(item))
            return false;
    }
    return true;
}
export function findCheonganHap(pair, hapPairs) {
    return findRelationNote(pair, hapPairs);
}
export function findCheonganChung(pair, chungPairs) {
    return findRelationNote(pair, chungPairs);
}
export function matchesJijiPair(pairDef, a, b) {
    return (pairDef.a === a && pairDef.b === b) || (pairDef.a === b && pairDef.b === a);
}
export function distinct(arr) {
    return [...new Set(arr)];
}
function findRelationNote(pair, defs) {
    return defs.find(def => setsEqual(def.pair, pair))?.note;
}
//# sourceMappingURL=LuckInteractionRelationUtils.js.map