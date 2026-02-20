import type { Element, StemIdx, YinYang } from './cycle.js';
import type { HiddenStem } from './hiddenStems.js';
export interface ElementTally {
    WOOD: number;
    FIRE: number;
    EARTH: number;
    METAL: number;
    WATER: number;
}
export interface YinYangTally {
    YANG: number;
    YIN: number;
}
export declare function emptyElementTally(): ElementTally;
export declare function emptyYinYangTally(): YinYangTally;
export declare function addElement(t: ElementTally, e: Element, w: number): void;
export declare function addYinYang(t: YinYangTally, y: YinYang, w: number): void;
export declare function mergeElementTallies(a: ElementTally, b: ElementTally): ElementTally;
export declare function tallyStems(stems: StemIdx[], stemWeight?: number): {
    elements: ElementTally;
    yinYang: YinYangTally;
};
export declare function tallyHiddenStems(branchHidden: HiddenStem[], branchTotalWeight?: number): {
    elements: ElementTally;
    yinYang: YinYangTally;
};
