import type { EngineConfig } from '../api/types.js';
import type { BranchIdx, Element, PillarIdx, StemIdx } from '../core/cycle.js';
import type { DetectedRelation, RelationType } from '../core/branchRelations.js';
import type { ElementDistribution } from '../core/elementDistribution.js';
import type { ElementVector } from '../core/elementVector.js';
import type { PillarsScoringResult, TenGodScore } from '../core/scoring.js';
import type { TenGod } from '../core/tenGod.js';
import type { HiddenStemRole } from '../core/hiddenStems.js';
import type { JohooTemplateResult } from './johooTemplate.js';
import type { SeasonGroup } from './season.js';
export type DayMasterRole = 'COMPANION' | 'RESOURCE' | 'OUTPUT' | 'WEALTH' | 'OFFICER';
export type FollowType = 'NONE' | 'CONG_CAI' | 'CONG_GUAN' | 'CONG_SHA' | 'CONG_ER' | 'CONG_YIN' | 'CONG_BI';
/**
 * 12신살(十二神殺) keys — 삼합군(지지 % 4) 기반 순차 표를 수학화한 표준 키 집합.
 *
 * 기준(대표 표):
 *  - 申子辰: 地(申)→桃(酉)→月(戌)→亡(亥)→将(子)→攀(丑)→驿(寅)→六(卯)→華(辰)→劫(巳)→災(午)→天(未)
 *  - 寅午戌: 地(寅)→桃(卯)→月(辰)→亡(巳)→将(午)→攀(未)→驿(申)→六(酉)→華(戌)→劫(亥)→災(子)→天(丑)
 *
 * 이 엔진은 이를 “start = (8 - 3*(branch%4)) mod 12”로 단순화하고, 각 항목을 start+offset으로 계산한다.
 */
export declare const TWELVE_SAL_KEYS: readonly ["JI_SAL", "DOHWA", "WOL_SAL", "MANG_SHIN_SAL", "JANGSEONG", "BAN_AN_SAL", "YEOKMA", "YUK_HAE_SAL", "HUAGAI", "GEOB_SAL", "JAESAL", "CHEON_SAL"];
export type TwelveSalKey = (typeof TWELVE_SAL_KEYS)[number];
export interface StrengthFacts {
    /** [-1, +1] where negative = weak, positive = strong (in this model). */
    index: number;
    support: number;
    pressure: number;
    total: number;
    components: {
        companions: number;
        resources: number;
        outputs: number;
        wealth: number;
        officers: number;
    };
    /** Strength model id used for this run (e.g., 'base', 'seasonalRoots'). */
    model?: string;
    /**
     * Optional decomposition for advanced models.
     * Kept optional to preserve API stability and allow schools to evolve.
     */
    details?: {
        season?: {
            monthElement: Element;
            seasonGroup: SeasonGroup;
            dayMasterElement: Element;
            /** Signed score in [-1,+1] roughly indicating 得令/失令 for DM under month element. */
            score: number;
            /** Applied multiplicative factor for support adjustment (e.g. 0.12). */
            factor: number;
        };
        roots?: {
            /** Sum of hidden-stem weights where stem-element == DM element. */
            sameElement: number;
            /** Sum of hidden-stem weights where stem-element generates DM element. */
            resourceElement: number;
            /** Combined root support score (non-negative). */
            score: number;
            /** Applied multiplicative factor for support adjustment. */
            factor: number;
        };
        delingdiShi?: {
            deLing: {
                monthElement: Element;
                dayMasterElement: Element;
                score: number;
                factor: number;
            };
            deDi: {
                sameElement: number;
                resourceElement: number;
                score: number;
                normalized: number;
                factor: number;
            };
            deShi: {
                sameElement: number;
                resourceElement: number;
                score: number;
                normalized: number;
                factor: number;
                positionWeights: {
                    year: number;
                    month: number;
                    hour: number;
                };
            };
            adjusted: {
                support: number;
                pressure: number;
                total: number;
            };
        };
        adjusted?: {
            support: number;
            pressure: number;
            total: number;
        };
    };
}
export interface RuleFacts {
    chart: {
        pillars: {
            year: {
                stem: StemIdx;
                branch: BranchIdx;
            };
            month: {
                stem: StemIdx;
                branch: BranchIdx;
            };
            day: {
                stem: StemIdx;
                branch: BranchIdx;
            };
            hour: {
                stem: StemIdx;
                branch: BranchIdx;
            };
        };
        stems: StemIdx[];
        branches: BranchIdx[];
        relations: {
            /** Full detected relations (합/충/형/해/파/원진/삼합/방합/삼형) */
            detected: DetectedRelation[];
            /** Convenience index: relation-type → list of member arrays */
            byType: Partial<Record<RelationType, BranchIdx[][]>>;
            /** 支冲(정충) 감지: b와 (b+6) 동시 존재 시 b를 포함 */
            chungBranches: BranchIdx[];
            /** 支害 감지: b와 haePartner(b) 동시 존재 시 b를 포함 */
            haeBranches: BranchIdx[];
            /** 六合 (합) */
            yukhapBranches: BranchIdx[];
            /** 支破 (파) */
            paBranches: BranchIdx[];
            /** 怨嗔 (원진) */
            wonjinBranches: BranchIdx[];
            /** 刑 (형) + 自刑/三刑 포함 */
            hyeongBranches: BranchIdx[];
            /** Common “damage” set used for quality/attenuation. */
            damagedBranches: BranchIdx[];
            /** Relation types treated as “damage” in this run (school/policy dependent). */
            damageTypes?: RelationType[];
        };
    };
    dayMaster: {
        stem: StemIdx;
        element: Element;
    };
    dayMasterRoleByElement: Record<Element, DayMasterRole>;
    month: {
        branch: BranchIdx;
        element: Element;
        seasonGroup: SeasonGroup;
        mainHiddenStem: StemIdx;
        mainTenGod: TenGod;
        /** Month-branch hidden stems (本气/中气/余气) with ten-god + visibility. */
        hiddenStems: Array<{
            stem: StemIdx;
            element: Element;
            role: HiddenStemRole;
            weight: number;
            tenGod: TenGod;
            visibleInChart: boolean;
        }>;
        /** True if 월지 本气(본기) stem is exposed(透干) in any pillar stem. */
        mainHiddenStemVisible: boolean;
        /**
         * ZiPing-style 格局 anchor candidate derived from month hidden-stem exposure.
         * - MAIN_EXPOSED: 本气透干 → 본기를 고정
         * - VISIBLE_HIDDEN: 본기 미투간이지만 중/여기 중 노출된 것이 있어 그 stem을 채택
         * - MAIN_FALLBACK: 아무것도 노출되지 않아 본기로 fallback
         */
        gyeok: {
            stem: StemIdx;
            tenGod: TenGod;
            method: 'MAIN_EXPOSED' | 'VISIBLE_HIDDEN' | 'GROUP_SUPPORTED' | 'MAIN_FALLBACK';
            /** Optional “会支” support info (삼합/방합) used when no stem is exposed. */
            support?: {
                type: 'SAMHAP' | 'BANGHAP';
                element: Element;
                members: BranchIdx[];
            } | null;
            /** Optional debug candidate list with scores and reasons. */
            candidates?: Array<{
                stem: StemIdx;
                element: Element;
                tenGod: TenGod;
                score: number;
                reasons: string[];
                visibleInChart: boolean;
                role: HiddenStemRole;
                weight: number;
            }>;
            /**
             * 格局 품질(청탁/파격)을 연속값으로 근사한 지표.
             *
             * - clarity: [0..1] (높을수록 “청(清)”에 가까움)
             * - integrity: [0..1] (높을수록 “파격(破格) 요인”이 적음)
             * - multiplier: [0..1] 기본 격국 점수에 곱할 수 있는 종합 가중치
             */
            quality: {
                clarity: number;
                integrity: number;
                damage: number;
                qingZhuo: 'QING' | 'ZHUO';
                broken: boolean;
                mixed: boolean;
                multiplier: number;
                reasons: string[];
                details?: {
                    gap: number;
                    alignmentRank: number;
                    rootScore: number;
                    rootNorm: number;
                    damageByType: Record<string, number>;
                    damageRelations: DetectedRelation[];
                };
            };
        };
    };
    elements: {
        total: ElementVector;
        totalSum: number;
        normalized: ElementVector;
        normalizedArr: number[];
    };
    /**
     * High-level patterns derived from the element distribution.
     *
     * This is intentionally “math-first”: a small set of continuous signals
     * (dominance/entropy) that schools can interpret differently.
     */
    patterns: {
        elements: {
            top: {
                element: Element;
                value: number;
                second: number;
                dominanceRatio: number;
                entropy: number;
            };
            oneElement: {
                enabled: boolean;
                isOneElement: boolean;
                element: Element;
                factor: number;
                thresholds: {
                    topMin: number;
                    dominanceRatioMin: number;
                    entropyMax: number;
                };
                /** Optional: 专旺/전왕(일행득기) 정밀 조건팩 — base factor에 추가 감쇠/강화(연속값). */
                zhuanwangConditionFactor?: number;
                /** factor × zhuanwangConditionFactor (전왕 후보에 더 적합한 최종 factor). */
                zhuanwangFactor?: number;
                /** Debug payload for zhuanwang conditions (kept optional for API stability). */
                zhuanwangDetails?: {
                    enabled: boolean;
                    requireDayMasterMatch: boolean;
                    weights: Record<string, number>;
                    thresholds: Record<string, number>;
                    signals: Record<string, number>;
                    flags: Record<string, boolean>;
                    reasons: string[];
                };
            };
        };
        /**
         * Heavenly-stem combination → transformation element signals (合化/화격 후보).
         *
         * This is *not* a hard boolean “it transforms”, but a continuous factor.
         */
        transformations?: {
            enabled: boolean;
            threshold: number;
            /** Optional ambiguity/competition attenuation based on 2nd-best candidate. */
            competition?: {
                enabled: boolean;
                /** Start penalizing when second/best >= startRatio. */
                startRatio: number;
                /** Max penalty applied when second/best → 1. */
                maxPenalty: number;
                /** secondFactor/bestFactor in [0,1]. */
                ratio: number;
                /** Multiplicative confidence factor in [0,1] applied to best.factor. */
                factor: number;
            };
            /** Weights for blended support (normalized internally when normalizeWeights=true). */
            weightShare: number;
            weightSeason: number;
            weightRoot?: number;
            weightPosition?: number;
            normalizeWeights?: boolean;
            /** Position weights used when weightPosition>0. */
            positionWeights?: {
                year: number;
                month: number;
                day: number;
                hour: number;
            };
            /** Root weights used when weightRoot>0 (month/day branch roots). */
            rootWeights?: {
                month: number;
                day: number;
            };
            /** Break/attenuation (破合) policy. */
            break?: {
                enabled: boolean;
                weights?: {
                    stemClash?: number;
                    branchDamage?: number;
                    interBranchDamage?: number;
                };
            };
            candidates: Array<{
                pair: string;
                stems: {
                    a: StemIdx;
                    b: StemIdx;
                };
                resultElement: Element;
                present: boolean;
                counts: {
                    a: number;
                    b: number;
                };
                support: {
                    elementShare: number;
                    seasonScore: number;
                    season01: number;
                    rootScore?: number;
                    root01?: number;
                    pos?: {
                        a: number;
                        b: number;
                        pair: number;
                    };
                    /** Max(1/distance) among stem positions (adjacent=1, 2-step=0.5, 3-step≈0.33). */
                    distanceFactor?: number;
                    blended: number;
                    weights?: {
                        share: number;
                        season: number;
                        root: number;
                        position: number;
                        total: number;
                    };
                };
                break?: {
                    stemClash: number;
                    branchDamage: number;
                    interBranchDamage: number;
                    penalty: number;
                    factor: number;
                    weights?: {
                        stemClash: number;
                        branchDamage: number;
                        interBranchDamage: number;
                    };
                };
                /** factor before applying break attenuation */
                rawFactor?: number;
                factor: number;
            }>;
            /** Best candidate summary (continuous signal; not a hard “it transforms”). */
            best?: {
                pair: string;
                resultElement: Element;
                /** Raw factor after support blend + break attenuation (pre-competition). */
                factor: number;
                /** Best support.blended in [0,1]. */
                blended: number;
                /** factor before applying break attenuation */
                rawFactor?: number;
                /** break attenuation in [0,1] */
                breakFactor?: number;
                /** 2nd best factor (pre-competition). */
                secondFactor?: number;
                /** Competition/ambiguity confidence in [0,1]. */
                competitionFactor?: number;
                /** factor × competitionFactor (effective factor used by downstream policies). */
                effectiveFactor?: number;
                /** Optional: 化气格(화기격) 정밀 조건팩을 적용한 추가 감쇠/강화 결과. */
                huaqiConditionFactor?: number;
                /** effectiveFactor × huaqiConditionFactor (화기격 후보에 더 적합한 최종 factor). */
                huaqiFactor?: number;
                /** Debug payload for huaqi conditions (kept optional for API stability). */
                huaqiDetails?: {
                    enabled: boolean;
                    requireDayMasterInvolved: boolean;
                    weights: Record<string, number>;
                    thresholds: Record<string, number>;
                    signals: Record<string, number>;
                    flags: Record<string, boolean>;
                    reasons: string[];
                };
            };
        };
        /**
         * 從格/從勢(종격) follow-trend pattern signal (continuous).
         *
         * Derived from strength extremeness + dominance ratio, optionally enriched by
         * a “jonggyeok condition pack” (순수성/월령/통근/극신/파격 등).
         */
        follow?: {
            enabled: boolean;
            /** Raw follow potential from strength/dominance (pre one-element boost). */
            potentialRaw: number;
            /** Potential after optional one-element boost (pre jonggyeok conditions). */
            potential: number;
            mode: 'PRESSURE' | 'SUPPORT' | 'NONE';
            dominanceRatio: number;
            dominantRole: DayMasterRole;
            dominantElement: Element;
            /** Classified follow-type (从财/从官/从杀/从儿/从印/从比). */
            followType?: FollowType;
            /** Dominant ten-god inside the dominantRole group (e.g., JEONG_GWAN vs PYEON_GWAN). */
            followTenGod?: TenGod;
            /** Ten-god split inside dominantRole group (primary/secondary shares). */
            followTenGodSplit?: {
                primary: TenGod;
                secondary: TenGod;
                primaryScore: number;
                secondaryScore: number;
                total: number;
                primaryShare: number;
                /** 0..1, 1 means primary fully dominates secondary. */
                confidence: number;
            };
            /** Factor used for optional one-element boost (e.g., oneElement.factor or zhuanwangFactor). */
            oneElementFactor?: number;
            /** Boost coefficient applied to oneElementFactor. */
            oneElementBoost?: number;
            /** Optional: 종격 정밀 조건팩 factor in [0,1]. */
            jonggyeokConditionFactor?: number;
            /** potential × jonggyeokConditionFactor (종격 후보에 더 적합한 최종 factor). */
            jonggyeokFactor?: number;
            /** Debug payload for jonggyeok conditions (kept optional for API stability). */
            jonggyeokDetails?: {
                enabled: boolean;
                applyTo: 'BOTH' | 'PRESSURE' | 'SUPPORT';
                weights: Record<string, number>;
                thresholds: Record<string, number>;
                signals: Record<string, number>;
                flags: Record<string, boolean>;
                reasons: string[];
            };
        };
    };
    tenGodScores: TenGodScore;
    tenGodScoresRanking: Array<{
        tenGod: TenGod;
        score: number;
    }>;
    tenGodScoresBest: {
        tenGod: TenGod;
        score: number;
    };
    /**
     * Seasonal climate model (조후/调候).
     *
     * This mirrors the internal climate scoring used by yongshin so that DSL rules
     * can reference `climate.need.*` or `climate.scores.*` consistently.
     */
    climate: {
        seasonGroup: SeasonGroup;
        /** Vector form: +hot/-cold, +wet/-dry (johoo scoring) */
        env: {
            temp: number;
            moist: number;
        };
        /** Target - env */
        need: {
            temp: number;
            moist: number;
        };
        /** Element scores (dot(effect, need)) */
        scores: Record<Element, number>;
        /** Optional 조후(調候) “template hints” (궁통보감 계열) — compact, non-table heuristic. */
        template?: JohooTemplateResult;
    };
    /**
     * 通关(tongguan) “battle” intensities between controlling element pairs.
     * DSL rules can use these to boost a bridge element.
     */
    tongguan: {
        pairs: {
            waterFire: {
                a: Element;
                b: Element;
                bridge: Element;
                intensity: number;
                weightedIntensity?: number;
            };
            fireMetal: {
                a: Element;
                b: Element;
                bridge: Element;
                intensity: number;
                weightedIntensity?: number;
            };
            metalWood: {
                a: Element;
                b: Element;
                bridge: Element;
                intensity: number;
                weightedIntensity?: number;
            };
            woodEarth: {
                a: Element;
                b: Element;
                bridge: Element;
                intensity: number;
                weightedIntensity?: number;
            };
            earthWater: {
                a: Element;
                b: Element;
                bridge: Element;
                intensity: number;
                weightedIntensity?: number;
            };
        };
        maxIntensity: number;
        /** Sum of all pair intensities (0..5). Useful to detect multi-battle charts. */
        sumIntensity?: number;
        /** How dominant the max battle is among all battles: max/sum (0..1). */
        dominance?: number;
        /** Entropy-like dispersion metric of battle intensities (0..1). Higher = more dispersed. */
        dispersion?: number;
        /** Optional alternative “effective max” that accounts for dominance (max * dominance). */
        effectiveMaxIntensity?: number;
    };
    strength: StrengthFacts;
    shinsal: {
        /** 12신살(삼합군 기반) 타깃 지지 — year/day anchors */
        twelveSal: {
            year: Record<TwelveSalKey, BranchIdx>;
            day: Record<TwelveSalKey, BranchIdx>;
        };
        peach: {
            year: BranchIdx;
            day: BranchIdx;
        };
        horse: {
            year: BranchIdx;
            day: BranchIdx;
        };
        huagai: {
            year: BranchIdx;
            day: BranchIdx;
        };
        jangseong: {
            year: BranchIdx;
            day: BranchIdx;
        };
        jaesal: {
            year: BranchIdx;
            day: BranchIdx;
        };
        hongluan: {
            year: BranchIdx;
        };
        cheonhui: {
            year: BranchIdx;
        };
        gongmang: {
            day: [BranchIdx, BranchIdx];
        };
        /** Special/seasonal day markers (e.g., 天赦日). */
        specialDays?: {
            CHEON_SA?: {
                season: SeasonGroup;
                targetDayPillar: {
                    stem: StemIdx;
                    branch: BranchIdx;
                };
                targetDayPillarHanja: string;
                active: boolean;
                matchedPillars: ReadonlyArray<'month' | 'day'>;
            };
        };
        /**
         * Relation-derived shinsal payloads.
         *
         * We keep these as ready-to-emit JSON arrays because the DSL intentionally has no loops.
         */
        relationSal?: Record<string, any[]>;
        /**
         * Catalog-driven shinsal facts (data-pack).
         *
         * Rulesets may reference these keys directly.
         */
        catalog: {
            /** key → { targets, present, count } derived from 日干 tables */
            dayStem: Record<string, {
                targets: BranchIdx[];
                present: BranchIdx[];
                count: number;
                matchedPillars: Array<'year' | 'month' | 'day' | 'hour'>;
            }>;
            /** key → { targets, present, count } derived from 年干 tables (same catalog, different anchor) */
            yearStem: Record<string, {
                targets: BranchIdx[];
                present: BranchIdx[];
                count: number;
                matchedPillars: Array<'year' | 'month' | 'day' | 'hour'>;
            }>;
            /** key → { targets, present, count } derived from 月支→天干 tables */
            monthBranchStem: Record<string, {
                targets: StemIdx[];
                target: StemIdx | null;
                present: StemIdx[];
                count: number;
                matchedPillars: Array<'year' | 'month' | 'day' | 'hour'>;
                scopePillars?: Array<'year' | 'month' | 'day' | 'hour'>;
            }>;
            /** key → { targets, present, count } derived from 月支→지지 tables */
            monthBranchBranch: Record<string, {
                targets: BranchIdx[];
                target: BranchIdx | null;
                present: BranchIdx[];
                count: number;
                matchedPillars: Array<'year' | 'month' | 'day' | 'hour'>;
                scopePillars?: Array<'year' | 'month' | 'day' | 'hour'>;
            }>;
            /** key → 日柱/四柱 membership results derived from 60갑자 sets */
            dayPillar: Record<string, {
                requiresDayPillar: boolean;
                isDayPillar: boolean;
                active: boolean;
                matchedPillars: Array<'year' | 'month' | 'day' | 'hour'>;
            }>;
        };
    };
    config: {
        schemaVersion: string;
        strategies: Record<string, unknown>;
        weights: Record<string, unknown>;
        extensions: Record<string, unknown>;
    };
}
export declare function buildRuleFacts(args: {
    config: EngineConfig;
    pillars: {
        year: PillarIdx;
        month: PillarIdx;
        day: PillarIdx;
        hour: PillarIdx;
    };
    elementDistribution: ElementDistribution;
    scoring: PillarsScoringResult;
}): RuleFacts;
