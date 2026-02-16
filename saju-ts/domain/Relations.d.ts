import { Cheongan } from './Cheongan.js';
import { Jiji } from './Jiji.js';
import { Ohaeng } from './Ohaeng.js';
export declare enum CheonganRelationType {
    HAP = "HAP",
    CHUNG = "CHUNG"
}
export interface CheonganRelationHit {
    readonly type: CheonganRelationType;
    readonly members: ReadonlySet<Cheongan>;
    readonly resultOhaeng: Ohaeng | null;
    readonly note: string;
}
export declare enum JijiRelationType {
    YUKHAP = "YUKHAP",
    SAMHAP = "SAMHAP",
    BANGHAP = "BANGHAP",
    BANHAP = "BANHAP",
    CHUNG = "CHUNG",
    HYEONG = "HYEONG",
    PA = "PA",
    HAE = "HAE",
    WONJIN = "WONJIN"
}
export interface JijiRelationHit {
    readonly type: JijiRelationType;
    readonly members: ReadonlySet<Jiji>;
    readonly note: string;
}
export interface InteractionScore {
    readonly baseScore: number;
    readonly adjacencyBonus: number;
    readonly outcomeMultiplier: number;
    readonly finalScore: number;
    readonly rationale: string;
}
export interface ScoredCheonganRelation {
    readonly hit: CheonganRelationHit;
    readonly hapHwaEvaluation: HapHwaEvaluation | null;
    readonly score: InteractionScore;
}
export declare enum HapState {
    HAPWHA = "HAPWHA",
    HAPGEO = "HAPGEO",
    NOT_ESTABLISHED = "NOT_ESTABLISHED"
}
export declare const HAP_STATE_INFO: Record<HapState, {
    koreanName: string;
}>;
import { PillarPosition } from './PillarPosition.js';
export interface HapHwaEvaluation {
    readonly stem1: Cheongan;
    readonly stem2: Cheongan;
    readonly position1: PillarPosition;
    readonly position2: PillarPosition;
    readonly resultOhaeng: Ohaeng;
    readonly state: HapState;
    readonly confidence: number;
    readonly conditionsMet: readonly string[];
    readonly conditionsFailed: readonly string[];
    readonly reasoning: string;
    readonly dayMasterInvolved: boolean;
}
export declare enum InteractionOutcome {
    ACTIVE = "ACTIVE",
    WEAKENED = "WEAKENED",
    BROKEN = "BROKEN",
    STRENGTHENED = "STRENGTHENED"
}
export interface ResolvedRelation {
    readonly hit: JijiRelationHit;
    readonly outcome: InteractionOutcome;
    readonly interactsWith: readonly JijiRelationHit[];
    readonly reasoning: string;
    readonly score: InteractionScore | null;
}
import { ShinsalHit } from './Shinsal.js';
export declare enum CompositeInteractionType {
    SYNERGY = "SYNERGY",
    AMPLIFY = "AMPLIFY",
    AMPLIFY_NEGATIVE = "AMPLIFY_NEGATIVE",
    TEMPER = "TEMPER",
    TRANSFORM = "TRANSFORM"
}
export declare const COMPOSITE_INTERACTION_INFO: Record<CompositeInteractionType, {
    koreanName: string;
}>;
export interface WeightedShinsalHit {
    readonly hit: ShinsalHit;
    readonly baseWeight: number;
    readonly positionMultiplier: number;
    readonly weightedScore: number;
}
export interface ShinsalComposite {
    readonly patternName: string;
    readonly interactionType: CompositeInteractionType;
    readonly involvedHits: readonly ShinsalHit[];
    readonly interpretation: string;
    readonly bonusScore: number;
}
//# sourceMappingURL=Relations.d.ts.map