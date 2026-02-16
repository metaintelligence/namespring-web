import { JijiRelationHit } from '../../domain/Relations.js';
export declare function setIntersection<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): Set<T>;
export declare function setDifference<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): Set<T>;
export declare function containsAll<T>(superset: ReadonlySet<T>, subset: ReadonlySet<T>): boolean;
export declare function anyPairAdjacent<T>(setA: ReadonlySet<T>, setB: ReadonlySet<T>, positionsByValue: ReadonlyMap<T, readonly number[]>): boolean;
export declare function buildOverlapGraph(hits: readonly JijiRelationHit[]): number[][];
//# sourceMappingURL=RelationInteractionResolverUtils.d.ts.map