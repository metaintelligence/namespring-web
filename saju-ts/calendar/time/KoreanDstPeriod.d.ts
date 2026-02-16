export interface DstPeriod {
    readonly startYear: number;
    readonly startMonth: number;
    readonly startDay: number;
    readonly endYear: number;
    readonly endMonth: number;
    readonly endDay: number;
    readonly offsetMinutes: number;
}
export declare const KOREAN_DST_RANGES: readonly DstPeriod[];
export declare function koreanDstOffsetMinutes(year: number, month: number, day: number): number;
//# sourceMappingURL=KoreanDstPeriod.d.ts.map