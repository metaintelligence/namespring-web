import type { EngineConfig } from '../api/types.js';
import type { Element } from '../core/cycle.js';
import type { RuleMatch, RuleSet } from './dsl.js';
import { type ClimateModel } from './climate.js';
import type { RuleFacts } from './facts.js';
export type YongshinRole = 'COMPANION' | 'RESOURCE' | 'OUTPUT' | 'WEALTH' | 'OFFICER';
export interface YongshinPolicy {
    weights: {
        balance: number;
        role: number;
        climate: number;
        /** Disease/medicine (病藥) style term based on excess element control. */
        medicine: number;
        /** 通關(통관) term (bridge element from controlling-pair “battle” intensity). */
        tongguan: number;
        /** 從勢/從格(종격) follow-trend term (experimental). */
        follow: number;
        /** 調候 “template” bonus term (궁통보감 계열의 간단 힌트). */
        johooTemplate: number;
        /** 合化/化气(화격) term based on `patterns.transformations.best.factor` (continuous signal). */
        transformations: number;
        /** 一行得气/专旺(전왕) term based on `patterns.elements.oneElement.(zhuanwangFactor|factor)` (continuous signal). */
        oneElement: number;
    };
    target: 'uniform';
    tieBreakOrder: Element[];
    ruleSet: RuleSet;
    climate: {
        enabled: boolean;
        model: ClimateModel;
    };
    /** Optional dynamic weighting: “调候为急” (prioritize climate when need is large). */
    climateUrgency?: {
        enabled: boolean;
        /** If |need| <= threshold, no reweighting. */
        threshold: number;
        /** Max multiplicative boost applied to climate weight at |need|≈1. */
        maxBoost: number;
        /** Fractional reduction applied to non-climate weights at |need|≈1. */
        reduceOthers: number;
    };
    /** Optional meta-selector that can dynamically blend multiple methods (调候/病药/通关/从势). */
    methodSelector?: {
        enabled: boolean;
        climate?: {
            enabled: boolean;
            threshold: number;
            maxBoost: number;
            reduceOthers: number;
        };
        medicine?: {
            enabled: boolean;
            /** Threshold is applied to maxExcessNormalized in [0,1]. */
            threshold: number;
            maxBoost: number;
            reduceOthers: number;
        };
        tongguan?: {
            enabled: boolean;
            threshold: number;
        };
        follow?: {
            enabled: boolean;
            threshold: number;
            weakThreshold: number;
            /** If omitted, defaults to -weakThreshold (symmetric). */
            strongThreshold?: number;
            minDominanceRatio: number;
        };
        johooTemplate?: {
            enabled: boolean;
            /** 'climate' → scale by climateFactor; 'always' → constant. */
            scaleBy: 'climate' | 'always';
        };
        /** 合化/化气(화격) 게이팅: best.factor가 일정 이상일 때 transformations term을 활성화 */
        transformations?: {
            enabled: boolean;
            threshold: number;
        };
        /** 一行得气/专旺(전왕) 게이팅: oneElement signal이 일정 이상일 때 oneElement term을 활성화 */
        oneElement?: {
            enabled: boolean;
            threshold: number;
            /** 'zhuanwang' → zhuanwangFactor 우선(없으면 raw), 'raw' → raw factor */
            factor?: 'zhuanwang' | 'raw';
        };
        /** Optional competition between special-pattern methods (e.g., follow vs transformations vs oneElement). */
        competition?: {
            enabled: boolean;
            methods: string[];
            power: number;
            minKeep: number;
            /** If true, preserve total |weight| mass across competed methods (default: false). */
            renormalize?: boolean;
        };
    };
}
export interface YongshinResult {
    best: Element;
    ranking: Array<{
        element: Element;
        score: number;
    }>;
    scores: Record<Element, number>;
    base: {
        deficiency: Record<Element, number>;
        role: Record<Element, {
            role: YongshinRole;
            preference: number;
        }>;
        climate?: {
            env: {
                temp: number;
                moist: number;
            };
            need: {
                temp: number;
                moist: number;
            };
            scores: Record<Element, number>;
        };
        medicine?: {
            excess: Record<Element, number>;
            scores: Record<Element, number>;
        };
        tongguan?: {
            threshold: number;
            factor: number;
            maxIntensity: number;
            effectiveMaxIntensity?: number;
            sumIntensity?: number;
            dominance?: number;
            dispersion?: number;
            scores: Record<Element, number>;
        };
        follow?: {
            threshold: number;
            factor: number;
            /** Final follow potential used by gating (after boosts/condition packs). */
            potential: number;
            /** Raw follow potential from strength/dominance (pre one-element boost). */
            potentialRaw?: number;
            /** Potential after one-element boost, before jonggyeok(从格) condition pack (if any). */
            potentialBoosted?: number;
            /** Concentration factor used for optional one-element boost (0..1). */
            oneElementFactor?: number;
            /** Boost coefficient applied to oneElementFactor. */
            oneElementBoost?: number;
            /** Optional: jonggyeok(从格/종격) condition factor in [0,1]. */
            jonggyeokConditionFactor?: number;
            dominanceRatio: number;
            mode?: 'PRESSURE' | 'SUPPORT' | 'NONE';
            dominantRole: YongshinRole;
            /** Optional: typed follow classification from patterns.follow.followType. */
            followType?: string;
            /** Optional: dominant ten-god inside dominantRole group (e.g., JEONG_GWAN vs PYEON_GWAN). */
            followTenGod?: string;
            /** Optional: 0..1 confidence for followTenGod split. */
            followSubtypeConfidence?: number;
            scores: Record<Element, number>;
        };
        johooTemplate?: {
            factor: number;
            bonus: Record<Element, number>;
            primary: Element;
            secondary: Element;
            reasons: string[];
        };
        transformations?: {
            threshold: number;
            factor: number;
            bestFactor: number;
            best?: {
                pair: string;
                resultElement: Element;
            };
            scores: Record<Element, number>;
        };
        oneElement?: {
            threshold: number;
            factor: number;
            signal: number;
            element?: Element;
            scores: Record<Element, number>;
        };
        methodSelector?: {
            enabled: boolean;
            climate?: {
                magnitude: number;
                threshold: number;
                factor: number;
            };
            medicine?: {
                maxExcess: number;
                maxExcessNormalized: number;
                threshold: number;
                factor: number;
            };
            tongguan?: {
                maxIntensity: number;
                effectiveMaxIntensity?: number;
                dominance?: number;
                threshold: number;
                factor: number;
            };
            follow?: {
                potential: number;
                potentialRaw?: number;
                potentialBoosted?: number;
                oneElementFactor?: number;
                oneElementBoost?: number;
                jonggyeokConditionFactor?: number;
                dominanceRatio: number;
                mode?: 'PRESSURE' | 'SUPPORT' | 'NONE';
                /** Optional: typed follow classification from patterns.follow.followType. */
                followType?: string;
                /** Optional: dominant ten-god inside dominantRole group (e.g., JEONG_GWAN vs PYEON_GWAN). */
                followTenGod?: string;
                /** Optional: 0..1 confidence for followTenGod split. */
                followSubtypeConfidence?: number;
                threshold: number;
                factor: number;
            };
            johooTemplate?: {
                factor: number;
                scaleBy: 'climate' | 'always';
            };
            transformations?: {
                bestFactor: number;
                threshold: number;
                factor: number;
                pair?: string;
                resultElement?: Element;
            };
            oneElement?: {
                signal: number;
                threshold: number;
                factor: number;
                element?: Element;
            };
            competition?: {
                methods: string[];
                power: number;
                minKeep: number;
                signals: Record<string, number>;
                shares: Record<string, number>;
                multipliers: Record<string, number>;
            };
        };
        /** Effective weights after optional urgency reweighting. */
        effectiveWeights: {
            balance: number;
            role: number;
            climate: number;
            medicine: number;
            tongguan: number;
            follow: number;
            johooTemplate: number;
            transformations: number;
            oneElement: number;
        };
        climateUrgency?: {
            magnitude: number;
            threshold: number;
            factor: number;
        };
        strengthIndex: number;
    };
    rules: {
        matches: RuleMatch[];
        assertionsFailed: Array<{
            ruleId: string;
            explain?: string;
        }>;
    };
}
export declare function computeYongshin(config: EngineConfig, facts: RuleFacts): YongshinResult;
