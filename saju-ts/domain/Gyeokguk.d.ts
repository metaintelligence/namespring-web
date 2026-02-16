import { Ohaeng } from './Ohaeng.js';
import { Sipseong } from './Sipseong.js';
export declare enum GyeokgukType {
    GEONROK = "GEONROK",
    YANGIN = "YANGIN",
    SIKSIN = "SIKSIN",
    SANGGWAN = "SANGGWAN",
    PYEONJAE = "PYEONJAE",
    JEONGJAE = "JEONGJAE",
    PYEONGWAN = "PYEONGWAN",
    JEONGGWAN = "JEONGGWAN",
    PYEONIN = "PYEONIN",
    JEONGIN = "JEONGIN",
    JONGGANG = "JONGGANG",
    JONGA = "JONGA",
    JONGJAE = "JONGJAE",
    JONGSAL = "JONGSAL",
    JONGSE = "JONGSE",
    HAPWHA_EARTH = "HAPWHA_EARTH",
    HAPWHA_METAL = "HAPWHA_METAL",
    HAPWHA_WATER = "HAPWHA_WATER",
    HAPWHA_WOOD = "HAPWHA_WOOD",
    HAPWHA_FIRE = "HAPWHA_FIRE",
    GOKJIK = "GOKJIK",
    YEOMSANG = "YEOMSANG",
    GASAEK = "GASAEK",
    JONGHYEOK = "JONGHYEOK",
    YUNHA = "YUNHA"
}
export interface GyeokgukTypeInfo {
    readonly koreanName: string;
    readonly hanja: string;
}
export declare const GYEOKGUK_TYPE_INFO: Record<GyeokgukType, GyeokgukTypeInfo>;
export declare function gyeokgukFromSipseong(sipseong: Sipseong): GyeokgukType;
export declare function ilhaengFromOhaeng(ohaeng: Ohaeng): GyeokgukType;
export declare enum GyeokgukCategory {
    NAEGYEOK = "NAEGYEOK",
    JONGGYEOK = "JONGGYEOK",
    HWAGYEOK = "HWAGYEOK",
    ILHAENG = "ILHAENG"
}
export declare enum GyeokgukQuality {
    WELL_FORMED = "WELL_FORMED",
    BROKEN = "BROKEN",
    RESCUED = "RESCUED",
    NOT_ASSESSED = "NOT_ASSESSED"
}
export declare const GYEOKGUK_QUALITY_INFO: Record<GyeokgukQuality, {
    koreanName: string;
}>;
export interface GyeokgukFormation {
    readonly quality: GyeokgukQuality;
    readonly breakingFactors: readonly string[];
    readonly rescueFactors: readonly string[];
    readonly reasoning: string;
}
export interface GyeokgukResult {
    readonly type: GyeokgukType;
    readonly category: GyeokgukCategory;
    readonly baseSipseong: Sipseong | null;
    readonly confidence: number;
    readonly reasoning: string;
    readonly formation: GyeokgukFormation | null;
}
//# sourceMappingURL=Gyeokguk.d.ts.map