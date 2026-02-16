export interface SolarTimeAdjustment {
    readonly standardYear: number;
    readonly standardMonth: number;
    readonly standardDay: number;
    readonly standardHour: number;
    readonly standardMinute: number;
    readonly adjustedYear: number;
    readonly adjustedMonth: number;
    readonly adjustedDay: number;
    readonly adjustedHour: number;
    readonly adjustedMinute: number;
    readonly dstCorrectionMinutes: number;
    readonly longitudeCorrectionMinutes: number;
    readonly equationOfTimeMinutes: number;
}
export interface SimpleDateTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
export interface SolarTimeAdjustParams extends SimpleDateTime {
    timezone: string;
    longitudeDeg: number;
    applyDstHistory: boolean;
    includeEquationOfTime: boolean;
    lmtBaselineOverride?: number;
}
export declare function standardMeridianDegrees(timezone: string): number;
export declare function lmtOffsetMinutes(longitudeDeg: number, standardMeridian: number): number;
export declare function equationOfTimeMinutes(dayOfYear: number): number;
export declare function adjustSolarTime(params: SolarTimeAdjustParams): SolarTimeAdjustment;
//# sourceMappingURL=SolarTimeAdjuster.d.ts.map