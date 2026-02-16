import type { CheonganRelationHit, HapHwaEvaluation, JijiRelationHit, ResolvedRelation, ScoredCheonganRelation } from '../../domain/Relations.js';
import type { PillarSet } from '../../domain/PillarSet.js';
export interface RelationAnalysisBundle {
    readonly rawJijiRelations: JijiRelationHit[];
    readonly resolvedJijiRelations: ResolvedRelation[];
    readonly scoredCheonganRelations: ScoredCheonganRelation[];
}
export declare function analyzeRelationsBundle(pillars: PillarSet, cheonganRelations: CheonganRelationHit[], hapHwaEvaluations: HapHwaEvaluation[], allowBanhap: boolean): RelationAnalysisBundle;
//# sourceMappingURL=RelationAnalysisHelpers.d.ts.map