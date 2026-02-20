import type { BranchIdx } from '../core/cycle.js';
import type { Element } from '../core/cycle.js';
/**
 * A small, math-first "climate" (調候) model.
 *
 * We represent the seasonal environment as a 2D vector:
 * - temp: +hot / -cold
 * - moist: +wet / -dry
 *
 * A candidate element is also a 2D vector representing how it shifts those axes.
 * The "benefit" is the dot product with the needed adjustment vector.
 *
 * This intentionally stays simple so that schools can override the tables.
 */
export interface ClimateVector {
    temp: number;
    moist: number;
}
export interface ClimateModel {
    /** Environment vector per month branch (0..11). */
    envByMonthBranch: ClimateVector[];
    /** Element effect vectors. */
    elementEffect: Record<Element, ClimateVector>;
    /** Optional scale applied to need before scoring (e.g., normalize by magnitude). */
    needScale?: 'none' | 'unit';
}
export declare const DEFAULT_CLIMATE_MODEL: ClimateModel;
export declare function dot(a: ClimateVector, b: ClimateVector): number;
export declare function neg(v: ClimateVector): ClimateVector;
export declare function norm(v: ClimateVector): number;
export declare function scale(v: ClimateVector, k: number): ClimateVector;
export declare function normalizeNeed(v: ClimateVector, mode: ClimateModel['needScale']): ClimateVector;
export declare function envOfMonthBranch(model: ClimateModel, monthBranch: BranchIdx): ClimateVector;
export declare function computeClimateScores(model: ClimateModel, monthBranch: BranchIdx): {
    env: ClimateVector;
    need: ClimateVector;
    scores: Record<Element, number>;
};
/**
 * Parse a user-provided partial climate model.
 *
 * Supports:
 * - envByMonthBranch as an object keyed by branch hanja ("子", "丑", ...) -> {temp,moist}
 * - elementEffect as a partial object keyed by Element.
 */
export declare function mergeClimateModel(base: ClimateModel, override: any): ClimateModel;
export declare function debugClimateTable(model: ClimateModel): Array<{
    month: string;
    envTemp: number;
    envMoist: number;
}>;
