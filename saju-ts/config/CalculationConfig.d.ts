import { DayCutMode } from '../calendar/time/DayCutMode.js';
import { HiddenStemVariant, HiddenStemDayAllocation } from '../domain/HiddenStem.js';
export declare enum SaryeongMode {
    ALWAYS_JEONGGI = "ALWAYS_JEONGGI",
    BY_DAY_IN_MONTH = "BY_DAY_IN_MONTH"
}
export declare enum EarthLifeStageRule {
    FOLLOW_FIRE = "FOLLOW_FIRE",
    FOLLOW_WATER = "FOLLOW_WATER",
    INDEPENDENT = "INDEPENDENT"
}
export declare enum HiddenStemScope {
    ALL_THREE = "ALL_THREE",
    JEONGGI_ONLY = "JEONGGI_ONLY",
    SARYEONG_BASED = "SARYEONG_BASED"
}
export declare enum YongshinPriority {
    JOHU_FIRST = "JOHU_FIRST",
    EOKBU_FIRST = "EOKBU_FIRST",
    EQUAL_WEIGHT = "EQUAL_WEIGHT"
}
export declare enum JonggyeokYongshinMode {
    FOLLOW_DOMINANT = "FOLLOW_DOMINANT",
    COUNTER_DOMINANT = "COUNTER_DOMINANT"
}
export declare enum HapHwaStrictness {
    STRICT_FIVE_CONDITIONS = "STRICT_FIVE_CONDITIONS",
    MODERATE = "MODERATE",
    LENIENT = "LENIENT"
}
export declare enum GwiiinTableVariant {
    KOREAN_MAINSTREAM = "KOREAN_MAINSTREAM",
    CHINESE_TRADITIONAL = "CHINESE_TRADITIONAL"
}
export declare enum ShinsalReferenceBranch {
    DAY_ONLY = "DAY_ONLY",
    YEAR_ONLY = "YEAR_ONLY",
    DAY_AND_YEAR = "DAY_AND_YEAR"
}
export declare enum JeolgiPrecision {
    APPROXIMATE = "APPROXIMATE",
    VSOP87D_EXACT = "VSOP87D_EXACT"
}
export declare enum SchoolPreset {
    KOREAN_MAINSTREAM = "KOREAN_MAINSTREAM",
    TRADITIONAL_CHINESE = "TRADITIONAL_CHINESE",
    MODERN_INTEGRATED = "MODERN_INTEGRATED"
}
export interface CalculationConfig {
    readonly dayCutMode: DayCutMode;
    readonly applyDstHistory: boolean;
    readonly includeEquationOfTime: boolean;
    readonly lmtBaselineLongitude: number;
    readonly jeolgiPrecision: JeolgiPrecision;
    readonly hiddenStemVariant: HiddenStemVariant;
    readonly hiddenStemDayAllocation: HiddenStemDayAllocation;
    readonly saryeongMode: SaryeongMode;
    readonly earthLifeStageRule: EarthLifeStageRule;
    readonly yinReversalEnabled: boolean;
    readonly deukryeongWeight: number;
    readonly proportionalDeukryeong: boolean;
    readonly strengthThreshold: number;
    readonly hiddenStemScopeForStrength: HiddenStemScope;
    readonly deukjiPerBranch: number;
    readonly deukseBigyeop: number;
    readonly deukseInseong: number;
    readonly yongshinPriority: YongshinPriority;
    readonly jonggyeokYongshinMode: JonggyeokYongshinMode;
    readonly jonggyeokWeakThreshold: number;
    readonly jonggyeokStrongThreshold: number;
    readonly hapHwaStrictness: HapHwaStrictness;
    readonly allowBanhap: boolean;
    readonly dayMasterNeverHapGeo: boolean;
    readonly gwiiinTable: GwiiinTableVariant;
    readonly shinsalReferenceBranch: ShinsalReferenceBranch;
}
export declare const DEFAULT_CONFIG: CalculationConfig;
export declare function createConfig(overrides?: Partial<CalculationConfig>): CalculationConfig;
export declare function configFromPreset(preset: SchoolPreset): CalculationConfig;
//# sourceMappingURL=CalculationConfig.d.ts.map