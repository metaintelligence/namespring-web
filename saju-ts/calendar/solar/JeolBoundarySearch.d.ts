export interface BoundaryMomentLike {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
}
export declare function momentKey(year: number, month: number, day: number, hour: number, minute: number): number;
export declare function boundaryMomentKey(boundary: BoundaryMomentLike): number;
export declare function compareBoundaryMoments(left: BoundaryMomentLike, right: BoundaryMomentLike): number;
export declare function findLastBoundaryByKey<T extends BoundaryMomentLike>(boundaries: readonly T[], key: number, inclusive: boolean): T | undefined;
export declare function findFirstBoundaryByKey<T extends BoundaryMomentLike>(boundaries: readonly T[], key: number, inclusive: boolean): T | undefined;
//# sourceMappingURL=JeolBoundarySearch.d.ts.map