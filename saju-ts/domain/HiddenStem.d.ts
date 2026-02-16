import { Cheongan } from './Cheongan.js';
import { Jiji } from './Jiji.js';
export declare enum HiddenStemRole {
    YEOGI = "YEOGI",
    JUNGGI = "JUNGGI",
    JEONGGI = "JEONGGI"
}
export declare enum HiddenStemVariant {
    STANDARD = "STANDARD",
    NO_RESIDUAL_EARTH = "NO_RESIDUAL_EARTH"
}
export declare enum HiddenStemDayAllocation {
    YEONHAE_JAPYEONG = "YEONHAE_JAPYEONG",
    SAMMYEONG_TONGHOE = "SAMMYEONG_TONGHOE"
}
export interface HiddenStemEntry {
    readonly stem: Cheongan;
    readonly role: HiddenStemRole;
    readonly days: number;
}
export declare const HiddenStemTable: {
    readonly getHiddenStems: (branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation) => readonly HiddenStemEntry[];
    readonly getPrincipalStem: (branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation) => Cheongan;
};
//# sourceMappingURL=HiddenStem.d.ts.map