import { Jiji } from '../domain/Jiji.js';
import { PillarSet } from '../domain/PillarSet.js';
import { JijiRelationType } from '../domain/Relations.js';
import { PositionPair, type SignificanceEntry as Significance } from './RelationSignificanceData.js';
export { POSITION_PAIR_INFO, PositionPair } from './RelationSignificanceData.js';
export type { PositionPairInfo } from './RelationSignificanceData.js';
export declare function inferPositionPair(members: ReadonlySet<Jiji>, pillars: PillarSet): PositionPair | null;
export declare function interpretRelationSignificance(relationType: JijiRelationType, members: ReadonlySet<Jiji>, pillars: PillarSet): Significance | null;
export declare function interpretRelationSignificanceWithPair(relationType: JijiRelationType, posPair: PositionPair): Significance;
export declare const RelationSignificanceInterpreter: {
    readonly interpret: typeof interpretRelationSignificance;
    readonly interpretWithPair: typeof interpretRelationSignificanceWithPair;
};
//# sourceMappingURL=RelationSignificanceInterpreter.d.ts.map