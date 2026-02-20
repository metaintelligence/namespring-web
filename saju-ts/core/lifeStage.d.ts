import type { BranchIdx, StemIdx } from './cycle.js';
export type LifeStage = 'JANG_SAENG' | 'MOK_YOK' | 'GWAN_DAE' | 'GEON_ROK' | 'JE_WANG' | 'SWOE' | 'BYEONG' | 'SA' | 'MYO' | 'JEOL' | 'TAE' | 'YANG';
export type EarthLifeStageRule = 'FOLLOW_FIRE' | 'FOLLOW_WATER' | 'INDEPENDENT';
export interface LifeStagePolicy {
    earthRule: EarthLifeStageRule;
    /** If true, Yin stems run the 12-stage sequence in reverse (양순음역). */
    yinReversalEnabled: boolean;
}
export declare const LIFE_STAGE_VALUES: readonly LifeStage[];
/**
 * Compute 十二運星 (십이운성) of `branch` relative to `stem` (usually day stem).
 */
export declare function lifeStageOf(stem: StemIdx, branch: BranchIdx, policy: LifeStagePolicy): {
    stage: LifeStage;
    index: number;
    startBranch: BranchIdx;
};
