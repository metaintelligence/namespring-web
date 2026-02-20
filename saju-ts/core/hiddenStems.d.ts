import type { BranchIdx, StemIdx } from './cycle.js';
/** 본기/중기/여기 */
export type HiddenStemRole = 'MAIN' | 'MIDDLE' | 'RESIDUAL';
export interface HiddenStemBase {
    stem: StemIdx;
    role: HiddenStemRole;
}
export interface HiddenStem extends HiddenStemBase {
    /** Branch-internal weight. In `scheme='standard'`, sums to 1. */
    weight: number;
}
export type HiddenStemWeightScheme = 'standard' | 'equal';
export interface HiddenStemWeightPolicy {
    /**
     * Weight scheme within a branch.
     * - `standard`: (1), (0.7/0.3), (0.6/0.3/0.1)
     * - `equal`: 1/n for each hidden stem
     */
    scheme?: HiddenStemWeightScheme;
    /** Optional override for the `standard` scheme. Values are normalized per branch. */
    standard?: {
        one?: number;
        two?: {
            main: number;
            residual: number;
        };
        three?: {
            main: number;
            middle: number;
            residual: number;
        };
    };
}
/**
 * Minimal “raw” hidden-stem table (12 branches × up to 3 stems).
 *
 * Order per branch is significant:
 * - 1 stem: [MAIN]
 * - 2 stems: [MAIN, RESIDUAL]
 * - 3 stems: [MAIN, MIDDLE, RESIDUAL]
 */
export declare const rawHiddenStemsTable: ReadonlyArray<readonly HiddenStemBase[]>;
/**
 * Get hidden stems of a branch with weights.
 *
 * - Table is fixed (small) and expressed as indices.
 * - Weights are “policy”, not “data”: by default, `standard` uses (1), (0.7/0.3), (0.6/0.3/0.1).
 */
export declare function hiddenStemsOfBranch(branch: BranchIdx, policy?: HiddenStemWeightPolicy): HiddenStem[];
