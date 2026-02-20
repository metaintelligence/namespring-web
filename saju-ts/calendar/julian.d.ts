import type { LocalDate } from './iso.js';
/**
 * Proleptic Gregorian calendar → Julian Day Number (JDN).
 * Returns the integer JDN that corresponds to noon-based day count.
 */
export declare function gregorianToJdn(date: LocalDate): number;
/**
 * UTC milliseconds → Julian Day (JD).
 *
 * - JD is a continuous day count (with fractional day).
 * - JD 2440587.5 corresponds to 1970-01-01T00:00:00Z.
 */
export declare function utcMsToJulianDay(utcMs: number): number;
/**
 * Julian Day (JD) → UTC milliseconds.
 */
export declare function julianDayToUtcMs(jd: number): number;
