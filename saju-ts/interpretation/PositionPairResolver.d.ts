import { PillarPosition } from '../domain/PillarPosition.js';
import { PositionPair } from './RelationSignificanceData.js';
export declare function pairFromPositions(first: PillarPosition, last: PillarPosition): PositionPair | null;
export declare function inferPositionPairFromMembers<T>(members: ReadonlySet<T>, positionedValues: readonly (readonly [PillarPosition, T])[]): PositionPair | null;
//# sourceMappingURL=PositionPairResolver.d.ts.map