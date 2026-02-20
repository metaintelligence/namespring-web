import type { BranchIdx, StemIdx } from '../core/cycle.js';
export interface RawShinsalCatalog {
    meta?: {
        id?: string;
        version?: string;
        description?: string;
    };
    /** key → { branches: { '甲': ['丑','未'], ... } } */
    dayStem?: Record<string, {
        branches: Record<string, string[]>;
        description?: string;
    }>;
    /**
     * Month-branch based STEM targets: key → { stems: { '寅': ['丙'], ... } }
     *
     * Typically used for 월덕/월덕합, and stem-part of 천덕/천덕합.
     */
    monthBranchStem?: Record<string, {
        stems: Record<string, string[]>;
        description?: string;
    }>;
    /**
     * Month-branch based BRANCH targets: key → { branches: { '卯': ['申'], ... } }
     *
     * Typically used for branch-part of 천덕.
     */
    monthBranchBranch?: Record<string, {
        branches: Record<string, string[]>;
        description?: string;
    }>;
    /** key → { primary: ['甲辰', ...], extended?: ['戊辰', ...], requiresDayPillar?: boolean } */
    dayPillar?: Record<string, {
        primary: string[];
        extended?: string[];
        requiresDayPillar?: boolean;
        description?: string;
    }>;
}
export interface NormalizedDayStemSpec {
    /** length 10; missing stems become empty arrays */
    byStem: BranchIdx[][];
    description?: string;
}
export interface NormalizedMonthBranchStemSpec {
    /** length 12; missing branches become empty arrays */
    byBranch: StemIdx[][];
    description?: string;
}
export interface NormalizedMonthBranchBranchSpec {
    /** length 12; missing branches become empty arrays */
    byBranch: BranchIdx[][];
    description?: string;
}
export interface NormalizedDayPillarSpec {
    primary: Set<number>;
    extended: Set<number>;
    requiresDayPillar: boolean;
    description?: string;
}
export interface NormalizedShinsalCatalog {
    meta: {
        id: string;
        version: string;
        description?: string;
    };
    dayStem: Record<string, NormalizedDayStemSpec>;
    monthBranchStem: Record<string, NormalizedMonthBranchStemSpec>;
    monthBranchBranch: Record<string, NormalizedMonthBranchBranchSpec>;
    dayPillar: Record<string, NormalizedDayPillarSpec>;
}
export declare function mergeRawShinsalCatalog(base: RawShinsalCatalog, ext: RawShinsalCatalog): RawShinsalCatalog;
export declare function normalizeShinsalCatalog(raw: RawShinsalCatalog): NormalizedShinsalCatalog;
