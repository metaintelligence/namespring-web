import { InteractionOutcome, JijiRelationType, } from '../../domain/Relations.js';
import { buildOverlapGraph } from './RelationInteractionResolverUtils.js';
import { evaluateInteraction } from './RelationInteractionRules.js';
const RELATION_PRIORITIES = {
    [JijiRelationType.SAMHAP]: 1,
    [JijiRelationType.BANGHAP]: 2,
    [JijiRelationType.YUKHAP]: 3,
    [JijiRelationType.BANHAP]: 4,
    [JijiRelationType.CHUNG]: 5,
    [JijiRelationType.HYEONG]: 6,
    [JijiRelationType.PA]: 7,
    [JijiRelationType.HAE]: 8,
    [JijiRelationType.WONJIN]: 9,
};
function pillarBranches(pillars) {
    return [pillars.year.jiji, pillars.month.jiji, pillars.day.jiji, pillars.hour.jiji];
}
function sortByPriority(hits) {
    return [...hits].sort((a, b) => RelationInteractionResolver.priorityOf(a.type) - RelationInteractionResolver.priorityOf(b.type));
}
function overlappingHitsAtIndex(hits, overlapGraph, index) {
    return overlapGraph[index].map((hitIndex) => hits[hitIndex]);
}
export const RelationInteractionResolver = {
    priorityOf(type) {
        return RELATION_PRIORITIES[type];
    },
    resolve(hits, pillars) {
        if (hits.length === 0)
            return [];
        const branchPositions = RelationInteractionResolver.buildBranchPositionMap(pillars);
        const overlapGraph = buildOverlapGraph(hits);
        return hits.map((hit, idx) => {
            const overlapping = overlappingHitsAtIndex(hits, overlapGraph, idx);
            return resolveOne(hit, overlapping, branchPositions);
        });
    },
    buildBranchPositionMap(pillars) {
        const branches = pillarBranches(pillars);
        const map = new Map();
        branches.forEach((b, idx) => {
            const existing = map.get(b);
            if (existing) {
                existing.push(idx);
            }
            else {
                map.set(b, [idx]);
            }
        });
        return map;
    },
    positionsOf(branch, pillars) {
        const positions = RelationInteractionResolver.buildBranchPositionMap(pillars).get(branch) ?? [];
        return [...positions];
    },
    areAdjacent(pos1, pos2) {
        return Math.abs(pos1 - pos2) === 1;
    },
};
function resolveOne(hit, overlapping, branchPositions) {
    if (overlapping.length === 0) {
        return {
            hit,
            outcome: InteractionOutcome.ACTIVE,
            interactsWith: [],
            reasoning: `${hit.note} 관계가 단독으로 성립합니다.`,
            score: null,
        };
    }
    const sortedOverlapping = sortByPriority(overlapping);
    let outcome = InteractionOutcome.ACTIVE;
    const interactors = [];
    const reasons = [];
    for (const other of sortedOverlapping) {
        const result = evaluateInteraction(hit, other, branchPositions, RelationInteractionResolver.priorityOf);
        if (result === null)
            continue;
        interactors.push(other);
        reasons.push(result.reason);
        outcome = mergeOutcome(outcome, result.outcomeForTarget);
    }
    const reasoning = reasons.length === 0
        ? `${hit.note} 관계가 성립합니다.`
        : reasons.join(' ');
    return {
        hit,
        outcome,
        interactsWith: interactors,
        reasoning,
        score: null,
    };
}
function mergeOutcome(current, incoming) {
    switch (incoming) {
        case InteractionOutcome.BROKEN:
            return InteractionOutcome.BROKEN;
        case InteractionOutcome.WEAKENED:
            return current === InteractionOutcome.BROKEN ? current : InteractionOutcome.WEAKENED;
        case InteractionOutcome.STRENGTHENED:
            return current === InteractionOutcome.ACTIVE ? InteractionOutcome.STRENGTHENED : current;
        case InteractionOutcome.ACTIVE:
            return current;
    }
}
//# sourceMappingURL=RelationInteractionResolver.js.map