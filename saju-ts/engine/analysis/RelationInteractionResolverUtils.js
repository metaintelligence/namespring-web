const ADJACENT_POSITION_GAP = 1;
function areAdjacentPositions(posA, posB) {
    return Math.abs(posA - posB) === ADJACENT_POSITION_GAP;
}
function orderedBySetSize(a, b) {
    return a.size <= b.size ? [a, b] : [b, a];
}
function setsOverlap(a, b) {
    const [smaller, larger] = orderedBySetSize(a, b);
    for (const item of smaller) {
        if (larger.has(item))
            return true;
    }
    return false;
}
function hasAdjacentPositions(positionsA, positionsB) {
    if (!positionsA || !positionsB)
        return false;
    for (const pa of positionsA) {
        for (const pb of positionsB) {
            if (areAdjacentPositions(pa, pb))
                return true;
        }
    }
    return false;
}
export function setIntersection(a, b) {
    const [smaller, larger] = orderedBySetSize(a, b);
    return collectFromSet(smaller, (item) => larger.has(item));
}
export function setDifference(a, b) {
    return collectFromSet(a, (item) => !b.has(item));
}
function collectFromSet(source, include) {
    const result = new Set();
    for (const item of source) {
        if (include(item))
            result.add(item);
    }
    return result;
}
export function containsAll(superset, subset) {
    for (const item of subset) {
        if (!superset.has(item))
            return false;
    }
    return true;
}
export function anyPairAdjacent(setA, setB, positionsByValue) {
    for (const a of setA) {
        const positionsA = positionsByValue.get(a);
        for (const b of setB) {
            if (hasAdjacentPositions(positionsA, positionsByValue.get(b)))
                return true;
        }
    }
    return false;
}
export function buildOverlapGraph(hits) {
    const n = hits.length;
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (setsOverlap(hits[i].members, hits[j].members)) {
                graph[i].push(j);
                graph[j].push(i);
            }
        }
    }
    return graph;
}
//# sourceMappingURL=RelationInteractionResolverUtils.js.map