import type { BranchIdx, Element, PillarIdx, StemIdx, YinYang } from './cycle.js';
import type { TenGod } from './tenGod.js';
import type { HiddenStem, HiddenStemWeightPolicy } from './hiddenStems.js';
export type ElementScore = Record<Element, number>;
export type YinYangScore = Record<YinYang, number>;
export type TenGodScore = Record<TenGod, number>;
export interface ScorePolicy {
    stemWeight: number;
    branchWeight: number;
    hiddenStemWeights: HiddenStemWeightPolicy;
    /** Whether to count the branch's own Yin/Yang as well (in addition to hidden stems). */
    includeBranchYinYang: boolean;
}
export declare const DEFAULT_SCORE_POLICY: ScorePolicy;
export declare function emptyElementScore(): ElementScore;
export declare function emptyYinYangScore(): YinYangScore;
export declare function emptyTenGodScore(): TenGodScore;
export declare function scoreElementsFromStems(stems: StemIdx[], weight: number): ElementScore;
export declare function scoreYinYangFromStems(stems: StemIdx[], weight: number): YinYangScore;
export interface HiddenStemWithTenGod extends HiddenStem {
    tenGod: TenGod;
}
export declare function hiddenStemsWithTenGod(dayStem: StemIdx, branch: BranchIdx, policy: HiddenStemWeightPolicy): HiddenStemWithTenGod[];
export interface PillarsScoringResult {
    elements: ElementScore;
    yinYang: YinYangScore;
    tenGods: TenGodScore;
    hiddenStems: {
        year: HiddenStemWithTenGod[];
        month: HiddenStemWithTenGod[];
        day: HiddenStemWithTenGod[];
        hour: HiddenStemWithTenGod[];
    };
}
export declare function scorePillars(pillars: {
    year: PillarIdx;
    month: PillarIdx;
    day: PillarIdx;
    hour: PillarIdx;
}, policy: ScorePolicy): PillarsScoringResult;
