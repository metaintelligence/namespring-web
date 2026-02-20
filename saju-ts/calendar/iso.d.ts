export interface LocalDate {
    y: number;
    m: number;
    d: number;
}
export interface LocalTime {
    h: number;
    min: number;
}
export interface LocalDateTime {
    date: LocalDate;
    time: LocalTime;
    /** offset minutes from UTC (e.g. +09:00 => 540) */
    offsetMinutes: number;
}
export interface ParsedInstant {
    utcMs: number;
    offsetMinutes: number;
    localDateTime: LocalDateTime;
}
/**
 * Parse ISO-8601 string with explicit offset (or 'Z').
 * - Minutes are required.
 */
export declare function parseIsoInstant(instant: string): ParsedInstant;
