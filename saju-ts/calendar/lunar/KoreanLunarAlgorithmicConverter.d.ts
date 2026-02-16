import type { LunarDate, SolarDate } from './LunarDate.js';
export declare const MIN_LUNAR_YEAR = 1899;
export declare const MAX_LUNAR_YEAR = 2050;
export declare const MIN_SOLAR_YEAR = 1900;
export declare const MIN_SOLAR_MONTH = 1;
export declare const MIN_SOLAR_DAY = 1;
export declare const MAX_SOLAR_YEAR = 2050;
export declare const MAX_SOLAR_MONTH = 12;
export declare const MAX_SOLAR_DAY = 31;
export declare function lunarToSolar(lunarDate: LunarDate): SolarDate | null;
export declare function solarToLunar(solarDate: SolarDate): LunarDate | null;
export declare const KoreanLunarAlgorithmicConverter: {
    readonly lunarToSolar: typeof lunarToSolar;
    readonly solarToLunar: typeof solarToLunar;
    readonly MIN_LUNAR_YEAR: 1899;
    readonly MAX_LUNAR_YEAR: 2050;
    readonly MIN_SOLAR_YEAR: 1900;
    readonly MAX_SOLAR_YEAR: 2050;
};
//# sourceMappingURL=KoreanLunarAlgorithmicConverter.d.ts.map