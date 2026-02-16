import { Eumyang } from './Eumyang.js';
import { Ohaeng } from './Ohaeng.js';
export declare enum Jiji {
    JA = "JA",
    CHUK = "CHUK",
    IN = "IN",
    MYO = "MYO",
    JIN = "JIN",
    SA = "SA",
    O = "O",
    MI = "MI",
    SIN = "SIN",
    YU = "YU",
    SUL = "SUL",
    HAE = "HAE"
}
export interface JijiInfo {
    readonly hangul: string;
    readonly hanja: string;
    readonly eumyang: Eumyang;
    readonly ohaeng: Ohaeng;
}
export declare const JIJI_INFO: Record<Jiji, JijiInfo>;
export declare const JIJI_VALUES: readonly Jiji[];
export declare function jijiOrdinal(j: Jiji): number;
//# sourceMappingURL=Jiji.d.ts.map