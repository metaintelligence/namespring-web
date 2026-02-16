import { Jiji } from '../../domain/Jiji.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { CheonganRelationHit, HapHwaEvaluation, InteractionScore, JijiRelationType, ResolvedRelation, ScoredCheonganRelation } from '../../domain/Relations.js';
export declare function scoreJijiRelation(resolved: ResolvedRelation, branchPositions: ReadonlyMap<Jiji, readonly number[]>): InteractionScore;
export declare function scoreAllJijiRelations(resolvedRelations: readonly ResolvedRelation[], branchPositions: ReadonlyMap<Jiji, readonly number[]>): ResolvedRelation[];
export declare const JijiRelationScorer: {
    readonly score: typeof scoreJijiRelation;
    readonly scoreAll: typeof scoreAllJijiRelations;
    readonly baseScoreFor: typeof baseScoreFor;
};
declare function baseScoreFor(type: JijiRelationType, note: string): number;
export declare function scoreCheonganRelation(hit: CheonganRelationHit, hapHwaEvaluations: readonly HapHwaEvaluation[], pillars: PillarSet): ScoredCheonganRelation;
export declare function scoreAllCheonganRelations(hits: readonly CheonganRelationHit[], hapHwaEvaluations: readonly HapHwaEvaluation[], pillars: PillarSet): ScoredCheonganRelation[];
export declare const CheonganRelationScorer: {
    readonly score: typeof scoreCheonganRelation;
    readonly scoreAll: typeof scoreAllCheonganRelations;
};
export {};
//# sourceMappingURL=InteractionScoreModel.d.ts.map