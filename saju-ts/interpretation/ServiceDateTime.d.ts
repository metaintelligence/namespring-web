export interface ServiceDateParts {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
}
export declare const SERVICE_TIMEZONE = "Asia/Seoul";
export declare function getDatePartsInTimeZone(date: Date, timeZone: string): ServiceDateParts;
export declare function getKoreanDateParts(date?: Date): ServiceDateParts;
//# sourceMappingURL=ServiceDateTime.d.ts.map