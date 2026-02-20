/**
 * Signed angular difference (a - b) wrapped to [-180, 180).
 */
export declare function angleDiffDeg(aDeg: number, bDeg: number): number;
/**
 * Apparent solar ecliptic longitude (degrees) for a given Julian Day.
 *
 * Input is interpreted as Julian Day in UT (UTC approximation). Internally we:
 * 1) convert to TT using ΔT polynomials (good to a few seconds)
 * 2) compute Earth's heliocentric longitude via VSOP87 periodic terms (SPA)
 * 3) convert to Sun's geocentric longitude (add 180°)
 * 4) apply small aberration + nutation correction using the dominant Ω term
 */
export declare function solarApparentLongitudeDeg(jdUtc: number): number;
export declare function solarLongitudeAtUtcMsDeg(utcMs: number): number;
