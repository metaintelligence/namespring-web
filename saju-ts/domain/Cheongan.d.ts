import { Eumyang } from './Eumyang.js';
import { Ohaeng } from './Ohaeng.js';
export declare enum Cheongan {
    GAP = "GAP",
    EUL = "EUL",
    BYEONG = "BYEONG",
    JEONG = "JEONG",
    MU = "MU",
    GI = "GI",
    GYEONG = "GYEONG",
    SIN = "SIN",
    IM = "IM",
    GYE = "GYE"
}
export interface CheonganInfo {
    readonly hangul: string;
    readonly hanja: string;
    readonly eumyang: Eumyang;
    readonly ohaeng: Ohaeng;
}
export declare const CHEONGAN_INFO: Record<Cheongan, CheonganInfo>;
export declare const CHEONGAN_VALUES: readonly Cheongan[];
export declare function cheonganOrdinal(c: Cheongan): number;
//# sourceMappingURL=Cheongan.d.ts.map