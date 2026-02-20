import { type SolarTermMethod } from './solarTerms.js';
export interface LunarNewYearBoundary {
    /** Gregorian year whose Lunar New Year day is being computed. */
    localYear: number;
    /** Offset minutes for the local civil time zone. */
    offsetMinutes: number;
    /** Solar-term computation method used for the winter-solstice anchor. */
    method: SolarTermMethod;
    /** Winter solstice instant (UTC, ms). */
    winterSolsticeUtcMs: number;
    /** 2nd new moon instant after winter solstice (UTC, ms; TT≈UTC). */
    newMoonUtcMs: number;
    /** Lunar New Year day in local civil calendar (y,m,d). */
    localDate: {
        y: number;
        m: number;
        d: number;
    };
    /** Boundary instant in UTC (ms): localDate at 00:00 in the given offsetMinutes zone. */
    boundaryUtcMs: number;
    /** Algorithm identifier. */
    algorithm: 'secondNewMoonAfterWinterSolstice';
}
/**
 * Meeus Ch. 49 — true new moon in Julian Ephemeris Day (TT).
 * Ported from the vendored cal/astro implementation to keep this repo self-contained.
 */
export declare function trueNewMoonJDE(k: number): number;
/**
 * Compute Lunar New Year boundary for a given local civil year.
 */
export declare function computeLunarNewYearBoundary(localYear: number, offsetMinutes: number, method: SolarTermMethod): LunarNewYearBoundary;
