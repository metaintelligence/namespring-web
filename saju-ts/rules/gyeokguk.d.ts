import type { EngineConfig } from '../api/types.js';
import type { RuleMatch, RuleSet } from './dsl.js';
import type { RuleFacts } from './facts.js';
export type GyeokgukCompetitionMethod = 'follow' | 'transformations' | 'oneElement' | 'tenGod';
export type FollowSignalSelector = 'auto' | 'jonggyeok' | 'potential' | 'raw';
export type TransformSignalSelector = 'auto' | 'huaqi' | 'effective' | 'raw';
export type OneElementSignalSelector = 'auto' | 'zhuanwang' | 'raw';
export type TenGodSignalSelector = 'monthQuality' | 'auto';
export interface CompetitionKeyGroupSpec {
    /** Include keys that start with any of these prefixes. */
    prefixes?: string[];
    /** Include these exact keys (if present in the score map). */
    keys?: string[];
    /** Exclude keys that start with any of these prefixes (after inclusion). */
    excludePrefixes?: string[];
    /** Exclude these exact keys (after inclusion). */
    excludeKeys?: string[];
}
export interface CompetitionSignalSelectors {
    follow?: FollowSignalSelector;
    transformations?: TransformSignalSelector;
    oneElement?: OneElementSignalSelector;
    /** For tenGod axis: use month-gyeok quality multiplier, or a fixed 0..1 constant. */
    tenGod?: TenGodSignalSelector | number;
}
export interface GyeokgukPolicy {
    ruleSet: RuleSet;
    tieBreakOrder: string[];
    /**
     * Optional competition between “special frame” candidates.
     *
     * Motivation: when multiple high-level frames are simultaneously plausible,
     * many schools prioritize the clearer/stronger one instead of stacking.
     *
     * This operates on the *score keys* emitted by the ruleset.
     */
    competition?: {
        enabled: boolean;
        /** Names: 'follow' | 'transformations' | 'oneElement' | 'tenGod'. Unknown strings are ignored. */
        methods: string[];
        /** Softmax-like power (>=0.01). */
        power: number;
        /** Floor multiplier in [0,1]. */
        minKeep: number;
        /** If true, preserve total |score| mass across affected keys (default: true). */
        renormalize?: boolean;
        /**
         * Key grouping per method.
         *
         * Defaults:
         * - follow: prefixes ['gyeokguk.CONG_']
         * - transformations: keys ['gyeokguk.HUA_QI']
         * - oneElement: keys ['gyeokguk.ZHUAN_WANG']
         */
        groups?: Partial<Record<GyeokgukCompetitionMethod, CompetitionKeyGroupSpec>>;
        /**
         * Signal selectors per method (how shares are computed).
         *
         * Defaults are 'auto' which mirrors the engine’s built-in fallbacks:
         * - follow: jonggyeokFactor → potential → potentialRaw
         * - transformations: huaqiFactor → effectiveFactor → factor
         * - oneElement: zhuanwangFactor → factor
         */
        signals?: CompetitionSignalSelectors;
    };
}
export interface GyeokgukCompetition {
    enabled: boolean;
    /** Configured method list (after filtering unknowns). */
    methods: string[];
    /** Methods that actually had non-zero scores (and were competed). */
    activeMethods: string[];
    power: number;
    minKeep: number;
    renormalize: boolean;
    scale: number;
    /** Resolved key groups (post-merge). */
    groups: Record<GyeokgukCompetitionMethod, CompetitionKeyGroupSpec>;
    /** Resolved signal selectors (post-merge). */
    signalSelectors: CompetitionSignalSelectors;
    /** Keys used per active method. */
    methodKeys: Record<string, string[]>;
    signals: Record<string, number>;
    shares: Record<string, number>;
    multipliers: Record<string, number>;
    /** Winner info (largest share among active methods). */
    winner?: {
        method: string;
        share: number;
        signal: number;
        multiplier: number;
        keys: string[];
    };
    totalBefore: number;
    totalAfter: number;
    /** Method-wise totals (sum of |scores| in the method key-group). */
    methodTotals: Record<string, {
        before: number;
        after: number;
    }>;
    /** Only keys that had non-zero scores before scaling are included. */
    affected: Record<string, {
        before: number;
        after: number;
    }>;
}
export interface GyeokgukResult {
    best: string | null;
    ranking: Array<{
        key: string;
        score: number;
    }>;
    scores: Record<string, number>;
    /** Optional debug payload for special-frame competition (alias of basis.competition). */
    competition?: GyeokgukCompetition;
    basis: {
        /** 월지 본기 십성 */
        monthMainTenGod: string;
        /** 월지 “격”(透干/会支 기반) 십성 */
        monthGyeokTenGod: string;
        /** 월지 격 선정 방법 */
        monthGyeokMethod: string;
        /** 청탁/파격 품질 지표 */
        monthGyeokQuality?: RuleFacts['month']['gyeok']['quality'];
        /** Optional debug payload for special-frame competition. */
        competition?: GyeokgukCompetition;
    };
    rules: {
        matches: RuleMatch[];
        assertionsFailed: Array<{
            ruleId: string;
            explain?: string;
        }>;
    };
}
export declare function computeGyeokguk(config: EngineConfig, facts: RuleFacts): GyeokgukResult;
