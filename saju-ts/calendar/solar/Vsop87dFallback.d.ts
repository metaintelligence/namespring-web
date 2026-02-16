import type { JeolBoundary } from './JeolBoundaryTable.js';
export declare const Vsop87dFallback: {
    readonly ipchunOf: (year: number) => JeolBoundary;
    readonly sajuMonthIndexAt: (year: number, month: number, day: number, hour: number, minute: number) => number;
    readonly nextBoundaryAfter: (year: number, month: number, day: number, hour: number, minute: number) => JeolBoundary;
    readonly previousBoundaryAtOrBefore: (year: number, month: number, day: number, hour: number, minute: number) => JeolBoundary;
    readonly boundariesOfYear: (year: number) => JeolBoundary[];
};
//# sourceMappingURL=Vsop87dFallback.d.ts.map