import { Jiji } from '../../domain/Jiji.js';
export interface JeolBoundary {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly solarLongitude: number;
    readonly sajuMonthIndex: number;
    readonly branch: Jiji;
}
export declare function isSupportedYear(year: number): boolean;
export declare function ipchunOf(year: number): JeolBoundary | undefined;
export declare function sajuMonthIndexAt(year: number, month: number, day: number, hour: number, minute: number): number | undefined;
export declare function nextBoundaryAfter(year: number, month: number, day: number, hour: number, minute: number): JeolBoundary | undefined;
export declare function previousBoundaryAtOrBefore(year: number, month: number, day: number, hour: number, minute: number): JeolBoundary | undefined;
export declare function boundariesForYear(year: number): Map<number, JeolBoundary> | undefined;
export declare const JeolBoundaryTable: {
    readonly isSupportedYear: typeof isSupportedYear;
    readonly ipchunOf: typeof ipchunOf;
    readonly sajuMonthIndexAt: typeof sajuMonthIndexAt;
    readonly nextBoundaryAfter: typeof nextBoundaryAfter;
    readonly previousBoundaryAtOrBefore: typeof previousBoundaryAtOrBefore;
    readonly boundariesForYear: typeof boundariesForYear;
};
//# sourceMappingURL=JeolBoundaryTable.d.ts.map