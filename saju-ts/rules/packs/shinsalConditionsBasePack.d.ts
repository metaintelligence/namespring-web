/**
 * Shinsal quality / attenuation model (조건부 약화/무효) base pack.
 *
 * Design
 * - Quality is represented as a multiplier in [0, 1].
 * - A value of 1 means “no attenuation”; 0 means “invalidated”.
 * - The model is intentionally generic: it does not enumerate each 신살.
 *   Schools can override weights / combine strategy / thresholds / exclusion list via config.
 */
export type ShinsalDamageKey = 'CHUNG' | 'HAE' | 'PA' | 'WONJIN' | 'HYEONG' | 'GONGMANG';
/** How to combine multiple penalties into a single penalty in [0,1]. */
export type ShinsalPenaltyCombine = 'max' | 'sum' | 'prob';
export interface ShinsalQualityModel {
    /** If false, condition attenuation is disabled (qualityWeight stays 1 unless explicitly set by ruleset). */
    enabled: boolean;
    /** If non-empty, apply condition attenuation only to these shinsal names. */
    applyToNames: string[];
    /** Category-level overrides (e.g., RELATION_SAL, VOID, TWELVE_SAL, ...). */
    categories?: Record<string, ShinsalQualityModelOverride>;
    /** Name-level overrides (highest priority). */
    names?: Record<string, ShinsalQualityModelOverride>;
    /** Per-condition penalty weight in [0,1]. Penalty is converted to qualityWeight = 1 - penalty. */
    weights: Record<ShinsalDamageKey, number>;
    /** Combine strategy when multiple conditions are present. */
    combine: ShinsalPenaltyCombine;
    /** If qualityWeight < weakThreshold, label the hit as WEAK. (Default: 1) */
    weakThreshold: number;
    /** If qualityWeight <= invalidateThreshold, mark the hit as invalidated. (Default: 0) */
    invalidateThreshold: number;
    /** Detection names that should skip condition attenuation entirely. */
    excludeNames: string[];
}
/**
 * Override shape for category/name entries.
 * - `weights` is partial: omitted keys inherit.
 * - all other fields are optional: omitted fields inherit.
 */
export interface ShinsalQualityModelOverride {
    enabled?: boolean;
    applyToNames?: string[];
    weights?: Partial<Record<ShinsalDamageKey, number>>;
    combine?: ShinsalPenaltyCombine;
    weakThreshold?: number;
    invalidateThreshold?: number;
    excludeNames?: string[];
}
export declare const DEFAULT_SHINSAL_QUALITY_MODEL: ShinsalQualityModel;
