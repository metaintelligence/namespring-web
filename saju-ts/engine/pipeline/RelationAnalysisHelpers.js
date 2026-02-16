import { JijiRelationType } from '../../domain/Relations.js';
import { DefaultRelationAnalyzer } from '../analysis/DefaultRelationAnalyzer.js';
import { RelationInteractionResolver } from '../analysis/RelationInteractionResolver.js';
import { JijiRelationScorer, CheonganRelationScorer } from '../analysis/InteractionScoreModel.js';
const DEFAULT_RELATION_ANALYZER = new DefaultRelationAnalyzer();
export function analyzeRelationsBundle(pillars, cheonganRelations, hapHwaEvaluations, allowBanhap) {
    const rawJijiRelations = DEFAULT_RELATION_ANALYZER.analyze(pillars);
    const resolvedJijiRelations = resolveAndScoreJijiRelations(pillars, rawJijiRelations, allowBanhap);
    const scoredCheonganRelations = scoreCheonganRelations(pillars, cheonganRelations, hapHwaEvaluations);
    return {
        rawJijiRelations,
        resolvedJijiRelations,
        scoredCheonganRelations,
    };
}
function resolveAndScoreJijiRelations(pillars, rawJijiRelations, allowBanhap) {
    const branchPositions = RelationInteractionResolver.buildBranchPositionMap(pillars);
    const jijiHitsForResolution = filterBanhapIfDisabled(rawJijiRelations, allowBanhap);
    const resolvedRaw = RelationInteractionResolver.resolve(jijiHitsForResolution, pillars);
    return JijiRelationScorer.scoreAll(resolvedRaw, branchPositions);
}
function scoreCheonganRelations(pillars, cheonganRelations, hapHwaEvaluations) {
    return CheonganRelationScorer.scoreAll(cheonganRelations, hapHwaEvaluations, pillars);
}
function filterBanhapIfDisabled(hits, allowBanhap) {
    return allowBanhap
        ? [...hits]
        : hits.filter((hit) => hit.type !== JijiRelationType.BANHAP);
}
//# sourceMappingURL=RelationAnalysisHelpers.js.map