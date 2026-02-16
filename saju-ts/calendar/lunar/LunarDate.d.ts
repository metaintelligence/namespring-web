export interface LunarDate {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly isLeapMonth: boolean;
}
export interface SolarDate {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}
export declare function createLunarDate(year: number, month: number, day: number, isLeapMonth?: boolean): LunarDate;
export declare function formatLunarDate(ld: LunarDate): string;
export declare function lunarDateEquals(a: LunarDate, b: LunarDate): boolean;
//# sourceMappingURL=LunarDate.d.ts.map