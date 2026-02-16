export declare function isLeapYear(year: number): boolean;
export declare function dayOfYear(year: number, month: number, day: number): number;
export declare function daysInYear(year: number): number;
interface MinutePrecisionDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
interface CalendarDateTime extends MinutePrecisionDate {
    second: number;
}
export declare function datetimeToJdUtc(year: number, month: number, day: number, hour: number, minute: number, second: number): number;
export declare function kstToJdUtc(year: number, month: number, day: number, hour: number, minute: number, second: number): number;
export declare function jdUtcToKst(jd: number): CalendarDateTime;
export declare function jdToCalendar(jd: number): CalendarDateTime;
export declare function roundToNearestMinute(cal: CalendarDateTime): MinutePrecisionDate;
export {};
//# sourceMappingURL=Vsop87dFallbackTimeUtils.d.ts.map