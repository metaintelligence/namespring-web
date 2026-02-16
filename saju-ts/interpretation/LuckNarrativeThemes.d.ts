import { SibiUnseong } from '../domain/SibiUnseong.js';
import { Sipseong } from '../domain/Sipseong.js';
export interface SipseongUnTheme {
    readonly sipseong: Sipseong;
    readonly themeName: string;
    readonly themeDescription: string;
    readonly favorableAspects: readonly string[];
    readonly cautionPoints: readonly string[];
    readonly lifeDomain: string;
}
export interface UnseongEnergyTheme {
    readonly sibiUnseong: SibiUnseong;
    readonly energyLevel: string;
    readonly description: string;
    readonly actionAdvice: string;
}
export declare const SIPSEONG_UN_THEMES: ReadonlyMap<Sipseong, SipseongUnTheme>;
export declare const UNSEONG_ENERGY_THEMES: ReadonlyMap<SibiUnseong, UnseongEnergyTheme>;
//# sourceMappingURL=LuckNarrativeThemes.d.ts.map