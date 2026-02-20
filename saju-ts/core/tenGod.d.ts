import type { StemIdx } from './cycle.js';
export type TenGod = 'BI_GYEON' | 'GEOB_JAE' | 'SIK_SHIN' | 'SANG_GWAN' | 'PYEON_JAE' | 'JEONG_JAE' | 'PYEON_GWAN' | 'JEONG_GWAN' | 'PYEON_IN' | 'JEONG_IN';
/**
 * Compute Ten Gods (십성) of `otherStem` relative to `dayStem`.
 *
 * Rule: relationship is determined by 5-element 生/剋 + Yin/Yang parity.
 */
export declare function tenGodOf(dayStem: StemIdx, otherStem: StemIdx): TenGod;
