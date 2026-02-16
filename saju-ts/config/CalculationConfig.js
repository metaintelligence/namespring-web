import { DayCutMode } from '../calendar/time/DayCutMode.js';
import { HiddenStemVariant, HiddenStemDayAllocation } from '../domain/HiddenStem.js';
export var SaryeongMode;
(function (SaryeongMode) {
    SaryeongMode["ALWAYS_JEONGGI"] = "ALWAYS_JEONGGI";
    SaryeongMode["BY_DAY_IN_MONTH"] = "BY_DAY_IN_MONTH";
})(SaryeongMode || (SaryeongMode = {}));
export var EarthLifeStageRule;
(function (EarthLifeStageRule) {
    EarthLifeStageRule["FOLLOW_FIRE"] = "FOLLOW_FIRE";
    EarthLifeStageRule["FOLLOW_WATER"] = "FOLLOW_WATER";
    EarthLifeStageRule["INDEPENDENT"] = "INDEPENDENT";
})(EarthLifeStageRule || (EarthLifeStageRule = {}));
export var HiddenStemScope;
(function (HiddenStemScope) {
    HiddenStemScope["ALL_THREE"] = "ALL_THREE";
    HiddenStemScope["JEONGGI_ONLY"] = "JEONGGI_ONLY";
    HiddenStemScope["SARYEONG_BASED"] = "SARYEONG_BASED";
})(HiddenStemScope || (HiddenStemScope = {}));
export var YongshinPriority;
(function (YongshinPriority) {
    YongshinPriority["JOHU_FIRST"] = "JOHU_FIRST";
    YongshinPriority["EOKBU_FIRST"] = "EOKBU_FIRST";
    YongshinPriority["EQUAL_WEIGHT"] = "EQUAL_WEIGHT";
})(YongshinPriority || (YongshinPriority = {}));
export var JonggyeokYongshinMode;
(function (JonggyeokYongshinMode) {
    JonggyeokYongshinMode["FOLLOW_DOMINANT"] = "FOLLOW_DOMINANT";
    JonggyeokYongshinMode["COUNTER_DOMINANT"] = "COUNTER_DOMINANT";
})(JonggyeokYongshinMode || (JonggyeokYongshinMode = {}));
export var HapHwaStrictness;
(function (HapHwaStrictness) {
    HapHwaStrictness["STRICT_FIVE_CONDITIONS"] = "STRICT_FIVE_CONDITIONS";
    HapHwaStrictness["MODERATE"] = "MODERATE";
    HapHwaStrictness["LENIENT"] = "LENIENT";
})(HapHwaStrictness || (HapHwaStrictness = {}));
export var GwiiinTableVariant;
(function (GwiiinTableVariant) {
    GwiiinTableVariant["KOREAN_MAINSTREAM"] = "KOREAN_MAINSTREAM";
    GwiiinTableVariant["CHINESE_TRADITIONAL"] = "CHINESE_TRADITIONAL";
})(GwiiinTableVariant || (GwiiinTableVariant = {}));
export var ShinsalReferenceBranch;
(function (ShinsalReferenceBranch) {
    ShinsalReferenceBranch["DAY_ONLY"] = "DAY_ONLY";
    ShinsalReferenceBranch["YEAR_ONLY"] = "YEAR_ONLY";
    ShinsalReferenceBranch["DAY_AND_YEAR"] = "DAY_AND_YEAR";
})(ShinsalReferenceBranch || (ShinsalReferenceBranch = {}));
export var JeolgiPrecision;
(function (JeolgiPrecision) {
    JeolgiPrecision["APPROXIMATE"] = "APPROXIMATE";
    JeolgiPrecision["VSOP87D_EXACT"] = "VSOP87D_EXACT";
})(JeolgiPrecision || (JeolgiPrecision = {}));
export var SchoolPreset;
(function (SchoolPreset) {
    SchoolPreset["KOREAN_MAINSTREAM"] = "KOREAN_MAINSTREAM";
    SchoolPreset["TRADITIONAL_CHINESE"] = "TRADITIONAL_CHINESE";
    SchoolPreset["MODERN_INTEGRATED"] = "MODERN_INTEGRATED";
})(SchoolPreset || (SchoolPreset = {}));
export const DEFAULT_CONFIG = {
    dayCutMode: DayCutMode.YAZA_23_TO_01_NEXTDAY,
    applyDstHistory: true,
    includeEquationOfTime: false,
    lmtBaselineLongitude: 135.0,
    jeolgiPrecision: JeolgiPrecision.APPROXIMATE,
    hiddenStemVariant: HiddenStemVariant.STANDARD,
    hiddenStemDayAllocation: HiddenStemDayAllocation.YEONHAE_JAPYEONG,
    saryeongMode: SaryeongMode.ALWAYS_JEONGGI,
    earthLifeStageRule: EarthLifeStageRule.FOLLOW_FIRE,
    yinReversalEnabled: true,
    deukryeongWeight: 40.0,
    proportionalDeukryeong: false,
    strengthThreshold: 50.0,
    hiddenStemScopeForStrength: HiddenStemScope.ALL_THREE,
    deukjiPerBranch: 5.0,
    deukseBigyeop: 7.0,
    deukseInseong: 5.0,
    yongshinPriority: YongshinPriority.JOHU_FIRST,
    jonggyeokYongshinMode: JonggyeokYongshinMode.FOLLOW_DOMINANT,
    jonggyeokWeakThreshold: 15.0,
    jonggyeokStrongThreshold: 62.4,
    hapHwaStrictness: HapHwaStrictness.STRICT_FIVE_CONDITIONS,
    allowBanhap: true,
    dayMasterNeverHapGeo: true,
    gwiiinTable: GwiiinTableVariant.KOREAN_MAINSTREAM,
    shinsalReferenceBranch: ShinsalReferenceBranch.DAY_AND_YEAR,
};
export function createConfig(overrides) {
    return {
        ...DEFAULT_CONFIG,
        ...(overrides ?? {}),
    };
}
const COMMON_YAZA_23_30_NEXTDAY = {
    dayCutMode: DayCutMode.YAZA_23_30_TO_01_30_NEXTDAY,
};
function withCommonDayCutMode(overrides) {
    return { ...COMMON_YAZA_23_30_NEXTDAY, ...overrides };
}
const TRADITIONAL_CHINESE_PRESET_OVERRIDES = {
    applyDstHistory: false,
    lmtBaselineLongitude: 120.0,
    saryeongMode: SaryeongMode.BY_DAY_IN_MONTH,
    deukryeongWeight: 50.0,
    proportionalDeukryeong: true,
    hiddenStemScopeForStrength: HiddenStemScope.JEONGGI_ONLY,
    yongshinPriority: YongshinPriority.EOKBU_FIRST,
    hapHwaStrictness: HapHwaStrictness.STRICT_FIVE_CONDITIONS,
    allowBanhap: false,
    dayMasterNeverHapGeo: false,
    gwiiinTable: GwiiinTableVariant.CHINESE_TRADITIONAL,
    shinsalReferenceBranch: ShinsalReferenceBranch.DAY_ONLY,
};
const MODERN_INTEGRATED_PRESET_OVERRIDES = {
    dayCutMode: DayCutMode.JOJA_SPLIT,
    includeEquationOfTime: true,
    jeolgiPrecision: JeolgiPrecision.VSOP87D_EXACT,
    saryeongMode: SaryeongMode.BY_DAY_IN_MONTH,
    proportionalDeukryeong: true,
    yongshinPriority: YongshinPriority.EQUAL_WEIGHT,
    jonggyeokWeakThreshold: 20.0,
    jonggyeokStrongThreshold: 58.0,
    hapHwaStrictness: HapHwaStrictness.MODERATE,
};
const PRESET_OVERRIDES = {
    [SchoolPreset.KOREAN_MAINSTREAM]: withCommonDayCutMode(),
    [SchoolPreset.TRADITIONAL_CHINESE]: withCommonDayCutMode(TRADITIONAL_CHINESE_PRESET_OVERRIDES),
    [SchoolPreset.MODERN_INTEGRATED]: MODERN_INTEGRATED_PRESET_OVERRIDES,
};
export function configFromPreset(preset) {
    return createConfig(PRESET_OVERRIDES[preset]);
}
//# sourceMappingURL=CalculationConfig.js.map