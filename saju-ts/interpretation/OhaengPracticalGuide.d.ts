import { Ohaeng } from '../domain/Ohaeng.js';
export interface PracticalGuide {
    readonly element: Ohaeng;
    readonly colors: readonly string[];
    readonly direction: string;
    readonly season: string;
    readonly numbers: readonly number[];
    readonly taste: string;
    readonly organ: string;
    readonly careers: readonly string[];
    readonly dailyTips: readonly string[];
}
export declare const OhaengPracticalGuide: {
    readonly guide: (ohaeng: Ohaeng) => PracticalGuide;
    readonly avoidanceNote: (gisin: Ohaeng) => string;
};
//# sourceMappingURL=OhaengPracticalGuide.d.ts.map