import type { EngineConfig } from '../api/types.js';
import type { BranchIdx, Element, StemIdx } from '../core/cycle.js';
import type { SeasonGroup } from './season.js';
export interface JohooTemplatePolicy {
    enabled: boolean;
    /** Additive bonus applied to the season-mandatory element (冬→火, 夏→水). */
    seasonMandatoryBoost: number;
    /** Additive bonus applied per preferred-stem-derived element (天干“互不离” heuristic). */
    stemPreferenceBoost: number;
    /** If true, also inject the classic “夏不离水 / 冬不离火” step rule even if seasonGroup is extended later. */
    enforceSummerWinter: boolean;
    /** Optional override mapping: stem hanja → list of preferred stem hanja(s). */
    stemPreferencesOverride?: Record<string, string[]>;
}
export interface JohooTemplateResult {
    enabled: true;
    seasonGroup: SeasonGroup;
    dayStem: StemIdx;
    monthBranch: BranchIdx;
    dayStemHanja: string;
    monthBranchHanja: string;
    /** Preferred helper stems (indices) derived from “互不离” mapping. */
    preferredStems: StemIdx[];
    preferredStemHanja: string[];
    preferredElements: Element[];
    /** Season-mandatory element(s). */
    mandatoryElements: Element[];
    /** Pure bonus vector (does NOT include climate dot-product scores). */
    bonus: Record<Element, number>;
    /** bonus + climateScores (for convenience / explainability). */
    combinedScores: Record<Element, number>;
    ranking: Array<{
        element: Element;
        score: number;
    }>;
    primary: Element;
    secondary: Element;
    reasons: string[];
}
export declare function computeJohooTemplate(config: EngineConfig, args: {
    dayStem: StemIdx;
    monthBranch: BranchIdx;
    climateScores: Record<Element, number>;
}): JohooTemplateResult | null;
