import { Cheongan } from '../domain/Cheongan.js';
import { PillarSet } from '../domain/PillarSet.js';
import { CheonganRelationType } from '../domain/Relations.js';
import { PositionPair, type SignificanceEntry as Significance } from './RelationSignificanceData.js';
export { PositionPair } from './RelationSignificanceData.js';
declare function inferPositionPair(members: ReadonlySet<Cheongan>, pillars: PillarSet): PositionPair | null;
export declare function interpretCheonganSignificance(relationType: CheonganRelationType, membersOrPosPair: ReadonlySet<Cheongan> | PositionPair, pillars?: PillarSet): Significance | null;
export declare const CheonganSignificanceInterpreter: {
    readonly interpret: typeof interpretCheonganSignificance;
    readonly inferPositionPair: typeof inferPositionPair;
};
//# sourceMappingURL=CheonganSignificanceInterpreter.d.ts.map