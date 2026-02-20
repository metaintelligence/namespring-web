import type { SajuRequest } from '../api/types.js';
import type { ParsedInstant } from './iso.js';
export type CalSolarTimeMode = 'NONE' | 'LMT' | 'APPARENT';
export interface CalTimeAdapterOptions {
    /**
     * How to treat local solar time when converting the birth instant.
     *
     * - NONE: no shift (standard civil time)
     * - LMT: apply longitude correction only (Local Mean Time)
     * - APPARENT: longitude correction + equation of time (apparent solar time)
     *
     * Default: 'LMT' (backward-compatible with the previous hardcoded behavior).
     */
    solarTimeMode?: CalSolarTimeMode;
    /**
     * If true, throw when location.lat/lon is missing and solarTimeMode is not NONE.
     * Default: true (avoid silently assuming a fallback location).
     */
    requireLocation?: boolean;
}
export declare function adjustInstantWithCal(input: SajuRequest, parsed: ParsedInstant, opts?: CalTimeAdapterOptions): string;
