import { Jiji } from './Jiji.js';
import { PillarPosition } from './PillarPosition.js';
export declare enum ShinsalGrade {
    A = "A",
    B = "B",
    C = "C"
}
export declare enum ShinsalType {
    CHEONUL_GWIIN = "CHEONUL_GWIIN",
    YEOKMA = "YEOKMA",
    DOHWA = "DOHWA",
    HWAGAE = "HWAGAE",
    TAEGUK_GWIIN = "TAEGUK_GWIIN",
    JANGSEONG = "JANGSEONG",
    WONJIN = "WONJIN",
    CHEONDEOK_GWIIN = "CHEONDEOK_GWIIN",
    WOLDEOK_GWIIN = "WOLDEOK_GWIIN",
    MUNCHANG = "MUNCHANG",
    YANGIN = "YANGIN",
    GOEGANG = "GOEGANG",
    HAKDANG = "HAKDANG",
    GEUMYEO = "GEUMYEO",
    GEOPSAL = "GEOPSAL",
    GOSIN = "GOSIN",
    GWASUK = "GWASUK",
    CHEONDEOK_HAP = "CHEONDEOK_HAP",
    WOLDEOK_HAP = "WOLDEOK_HAP",
    CHEONGWAN_GWIIN = "CHEONGWAN_GWIIN",
    BOKSEONG_GWIIN = "BOKSEONG_GWIIN",
    MUNGOK_GWIIN = "MUNGOK_GWIIN",
    GUGIN_GWIIN = "GUGIN_GWIIN",
    BAEKHO = "BAEKHO",
    HONGYEOM = "HONGYEOM",
    AMNOK = "AMNOK",
    CHEONUI = "CHEONUI",
    CHEOLLA_JIMANG = "CHEOLLA_JIMANG",
    JAESAL = "JAESAL",
    GYEOKGAK = "GYEOKGAK",
    CHEONBOK_GWIIN = "CHEONBOK_GWIIN",
    YUKHAESAL = "YUKHAESAL",
    HYEOLINSAL = "HYEOLINSAL",
    GWANBUSAL = "GWANBUSAL",
    SANGMUNSAL = "SANGMUNSAL",
    CHEONSAL = "CHEONSAL",
    JISAL = "JISAL",
    MANGSINSAL = "MANGSINSAL",
    BANANSAL = "BANANSAL",
    CHEONJU_GWIIN = "CHEONJU_GWIIN",
    GORANSAL = "GORANSAL"
}
export interface ShinsalTypeInfo {
    readonly koreanName: string;
    readonly hanja: string;
    readonly grade: ShinsalGrade;
    readonly description: string;
}
export declare const SHINSAL_TYPE_INFO: Record<ShinsalType, ShinsalTypeInfo>;
export interface ShinsalHit {
    readonly type: ShinsalType;
    readonly position: PillarPosition;
    readonly referenceBranch: Jiji;
    readonly note: string;
}
//# sourceMappingURL=Shinsal.d.ts.map