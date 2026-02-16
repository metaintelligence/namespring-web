import { Jiji } from '../../domain/Jiji.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { JijiRelationHit, JijiRelationType, ResolvedRelation } from '../../domain/Relations.js';
export declare const RelationInteractionResolver: {
    readonly priorityOf: (type: JijiRelationType) => number;
    readonly resolve: (hits: readonly JijiRelationHit[], pillars: PillarSet) => ResolvedRelation[];
    readonly buildBranchPositionMap: (pillars: PillarSet) => Map<Jiji, number[]>;
    readonly positionsOf: (branch: Jiji, pillars: PillarSet) => number[];
    readonly areAdjacent: (pos1: number, pos2: number) => boolean;
};
//# sourceMappingURL=RelationInteractionResolver.d.ts.map