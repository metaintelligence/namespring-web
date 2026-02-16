export function hasAllMembers(present, ...members) {
    return members.every((member) => present.has(member));
}
export function addPairHits(type, defs, present, addHit) {
    for (const pair of defs) {
        if (hasAllMembers(present, pair.a, pair.b)) {
            addHit(type, new Set([pair.a, pair.b]), pair.note);
        }
    }
}
export function addTripleHits(type, defs, present, addHit) {
    for (const triple of defs) {
        if (hasAllMembers(present, triple.a, triple.b, triple.c)) {
            addHit(type, new Set([triple.a, triple.b, triple.c]), triple.note);
        }
    }
}
//# sourceMappingURL=RelationHitHelpers.js.map