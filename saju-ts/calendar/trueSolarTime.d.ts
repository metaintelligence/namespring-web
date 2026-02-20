import type { EngineConfig, SajuRequest } from '../api/types.js';
import type { LocalDateTime } from './iso.js';
/**
 * True solar time correction = longitude correction (LMST vs local standard time)
 * + equation of time (AST vs MST).
 *
 * This module is intentionally compact and “math-first”:
 * - Longitude correction: 4 minutes per degree difference from the zone meridian.
 * - Equation of time: NOAA-style trigonometric approximation (minutes).
 *
 * References:
 * - NOAA Solar Calculator equations (gamma / EoT)
 * - Standard definition: EoT = Apparent Solar Time - Mean Solar Time
 */
export interface TrueSolarTimeCorrection {
    enabled: boolean;
    applied: boolean;
    /** Reason if not applied even though enabled. */
    reason?: string;
    method: 'none' | 'approx';
    longitudeDeg?: number;
    standardMeridianDeg?: number;
    longitudeCorrectionMinutes?: number;
    equationOfTimeMinutes?: number;
    totalCorrectionMinutes?: number;
    formula?: string;
}
/**
 * NOAA-style approximation of equation of time (minutes).
 * Good enough for “hour pillar boundary” use cases.
 */
export declare function equationOfTimeMinutesApprox(utcMs: number): number;
/**
 * Longitude correction (minutes) converting local standard time (given by utcOffset)
 * to local mean solar time.
 *
 * LST = UTC + offsetHours
 * LMST = UTC + lon/15
 * LMST - LST = lon/15 - offsetHours = 4*(lon - 15*offsetHours) minutes
 */
export declare function longitudeCorrectionMinutes(offsetMinutes: number, longitudeDeg: number): number;
export declare function computeTrueSolarTimeCorrection(args: {
    utcMs: number;
    offsetMinutes: number;
    location: SajuRequest['location'] | undefined;
    policy: EngineConfig['calendar']['trueSolarTime'];
}): TrueSolarTimeCorrection;
/**
 * Apply a minute offset to a LocalDateTime (used for true solar time representation).
 *
 * This does NOT change the underlying instant; it only adjusts the local “clock reading”
 * used for pillar boundary classification.
 */
export declare function applyMinuteOffsetToLocalDateTime(ldt: LocalDateTime, deltaMinutes: number): LocalDateTime;
