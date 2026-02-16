import { Cheongan } from './Cheongan.js';
export declare enum StrengthLevel {
    VERY_STRONG = "VERY_STRONG",
    STRONG = "STRONG",
    SLIGHTLY_STRONG = "SLIGHTLY_STRONG",
    SLIGHTLY_WEAK = "SLIGHTLY_WEAK",
    WEAK = "WEAK",
    VERY_WEAK = "VERY_WEAK"
}
export declare const STRENGTH_LEVEL_INFO: Record<StrengthLevel, {
    koreanName: string;
}>;
export declare function isStrongSide(level: StrengthLevel): boolean;
export interface StrengthScore {
    readonly deukryeong: number;
    readonly deukji: number;
    readonly deukse: number;
    readonly totalSupport: number;
    readonly totalOppose: number;
}
export interface StrengthResult {
    readonly dayMaster: Cheongan;
    readonly level: StrengthLevel;
    readonly score: StrengthScore;
    readonly isStrong: boolean;
    readonly details: readonly string[];
}
//# sourceMappingURL=StrengthResult.d.ts.map