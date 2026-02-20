import { julianDayToUtcMs, utcMsToJulianDay } from './julian.js';
/**
 * Solar-term utilities.
 *
 * Goals:
 * - Math-first (longitude roots) rather than lookup tables
 * - Minimal, explicit data only for (id ↔ longitude ↔ rough bracket date)
 * - Cache by (method, year)
 */
export type SolarTermMethod = 'approx' | 'meeus';
/**
 * 24절기(二十四節氣) — identified by the target longitude (deg) of Sun's
 * apparent ecliptic longitude λ.
 */
export type SolarTermId = 'XIAOHAN' | 'DAHAN' | 'LICHUN' | 'YUSHUI' | 'JINGZHE' | 'CHUNFEN' | 'QINGMING' | 'GUYU' | 'LIXIA' | 'XIAOMAN' | 'MANGZHONG' | 'XIAZHI' | 'XIAOSHU' | 'DASHU' | 'LIQIU' | 'CHUSHU' | 'BAILU' | 'QIUFEN' | 'HANLU' | 'SHUANGJIANG' | 'LIDONG' | 'XIAOXUE' | 'DAXUE' | 'DONGZHI';
/**
 * 12절(節) — used as month boundaries in many Four Pillars schools.
 *
 * This is the “odd 15° multiples” subset of the 24 solar terms.
 */
export type JieTermId = 'XIAOHAN' | 'LICHUN' | 'JINGZHE' | 'QINGMING' | 'LIXIA' | 'MANGZHONG' | 'XIAOSHU' | 'LIQIU' | 'BAILU' | 'HANLU' | 'LIDONG' | 'DAXUE';
export interface SolarTermInstant {
    id: SolarTermId;
    /** Gregorian year used to compute this term */
    year: number;
    /** target longitude (deg) */
    longitude: number;
    /** boundary instant in UTC (epoch ms) */
    utcMs: number;
}
export interface SolarTermsAround {
    baseYear: number;
    method: SolarTermMethod;
    /** Combined (baseYear-1, baseYear, baseYear+1) terms sorted by utcMs. */
    terms: SolarTermInstant[];
}
export interface JieBoundariesAround {
    baseYear: number;
    method: SolarTermMethod;
    /** Combined (baseYear-1, baseYear, baseYear+1) boundaries sorted by utcMs. */
    terms: SolarTermInstant[];
}
/**
 * Keep the legacy export name for compatibility; delegate to shared solar model.
 */
export declare function sunApparentLongitudeDeg(jd: number): number;
/** Re-exported for convenience (and backward-compat). */
export { utcMsToJulianDay, julianDayToUtcMs };
export declare function solarTermLongitude(id: SolarTermId): number;
export declare function isJieTermId(id: SolarTermId): id is JieTermId;
/**
 * 12절(節)의 "월 차수"(0..11) — 寅월(立春)부터 시작.
 *
 * Formula: m = floor(((λ - 315) mod 360) / 30).
 */
export declare function jieTermMonthOrder(id: JieTermId): number;
/**
 * Core solver: find UTC ms when the Sun's apparent longitude reaches a target value.
 */
export declare function solarTermUtcMsForLongitude(year: number, longitude: number, method: SolarTermMethod): number;
export declare function getSolarTerms(year: number, method: SolarTermMethod): SolarTermInstant[];
export declare function getJieBoundaries(year: number, method: SolarTermMethod): SolarTermInstant[];
export declare function getSolarTermsAround(baseYear: number, method: SolarTermMethod): SolarTermsAround;
export declare function getJieBoundariesAround(baseYear: number, method: SolarTermMethod): JieBoundariesAround;
export declare function getLiChunUtcMs(year: number, method: SolarTermMethod): number;
export declare function listJieTermIds(): readonly JieTermId[];
