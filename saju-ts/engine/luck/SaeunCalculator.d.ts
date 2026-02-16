import type { SaeunPillar, WolunPillar } from '../../domain/SaeunInfo.js';
export declare const SaeunCalculator: {
    readonly calculate: (startYear: number, count?: number) => SaeunPillar[];
    readonly forYear: (year: number) => SaeunPillar;
    readonly sajuMonthIndexAt: (year: number, month: number, day: number, hour?: number, minute?: number) => number;
    readonly monthlyLuck: (year: number) => WolunPillar[];
};
//# sourceMappingURL=SaeunCalculator.d.ts.map