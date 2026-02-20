import type { EngineConfig } from '../api/types.js';
import type { BranchIdx, StemIdx } from '../core/cycle.js';
import type { RuleMatch, RuleSet } from './dsl.js';
import type { RuleFacts } from './facts.js';
import type { ShinsalDamageKey, ShinsalQualityModel } from './packs/shinsalConditionsBasePack.js';
export type ShinsalBasedOn = 'YEAR_BRANCH' | 'DAY_BRANCH' | 'MONTH_BRANCH' | 'OTHER';
export type ShinsalTargetKind = 'BRANCH' | 'STEM' | 'NONE';
export interface ShinsalDetection {
    name: string;
    /** Optional category label for category-level scoring/attenuation (data-first, school-extensible). */
    category?: string;
    basedOn: ShinsalBasedOn;
    targetKind: ShinsalTargetKind;
    targetBranch?: BranchIdx;
    targetStem?: StemIdx;
    /** Optional multi-target provenance (e.g. 관계 기반 살: 충/형/해/파/원진) */
    targetBranches?: BranchIdx[];
    targetStems?: StemIdx[];
    /** Extra structured provenance payload from rulesets (kept as-is). */
    details?: any;
    matchedPillars?: Array<'year' | 'month' | 'day' | 'hour'>;
    /** Quality label derived from the quality model (or emitted explicitly). */
    quality?: 'FULL' | 'WEAK';
    /** Continuous quality multiplier in [0,1] (math-first). */
    qualityWeight?: number;
    /** If true, the hit is treated as fully invalidated (qualityWeight=0). */
    invalidated?: boolean;
    /** Convenience: whether this detection is included in downstream summaries (default: !invalidated). */
    active?: boolean;
    /** Reasons that affected the multiplier (e.g., CHUNG/HAE/...). */
    qualityReasons?: ShinsalDamageKey[];
    /** Convenience: final penalty in [0,1] used to compute qualityWeight = 1 - penalty. */
    conditionPenalty?: number;
}
export interface ShinsalPolicy {
    ruleSet: RuleSet;
    conditionsRuleSet: RuleSet;
    qualityModel: ShinsalQualityModel;
}
export interface ShinsalResult {
    detections: ShinsalDetection[];
    scores: Record<string, number>;
    /** Quality-adjusted scores computed from detections (forward-compatible). */
    scoresAdjusted: Record<string, number>;
    rules: {
        /** Base ruleset (existence) */
        matches: RuleMatch[];
        assertionsFailed: Array<{
            ruleId: string;
            explain?: string;
        }>;
        /** Optional: per-detection conditions trace */
        conditions?: Array<{
            detectionIndex: number;
            detection: Pick<ShinsalDetection, 'name' | 'targetKind' | 'targetBranch' | 'targetStem' | 'targetBranches' | 'matchedPillars'>;
            scores: Record<string, number>;
            penaltyParts: Array<{
                key: ShinsalDamageKey;
                value: number;
            }>;
            combinedPenalty: number;
            qualityWeight: number;
            qualityReasons: ShinsalDamageKey[];
            invalidated: boolean;
            matches: RuleMatch[];
            assertionsFailed: Array<{
                ruleId: string;
                explain?: string;
            }>;
        }>;
    };
}
export declare function computeShinsal(config: EngineConfig, facts: RuleFacts): ShinsalResult;
