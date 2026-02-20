/**
 * Shinsal quality / attenuation model (조건부 약화/무효) base pack.
 *
 * Design
 * - Quality is represented as a multiplier in [0, 1].
 * - A value of 1 means “no attenuation”; 0 means “invalidated”.
 * - The model is intentionally generic: it does not enumerate each 신살.
 *   Schools can override weights / combine strategy / thresholds / exclusion list via config.
 */
export const DEFAULT_SHINSAL_QUALITY_MODEL = {
    enabled: true,
    applyToNames: [],
    categories: {
        // Relation/void are typically used as “conditions”, so we skip attenuating them by default.
        RELATION_SAL: { enabled: false },
        VOID: { enabled: false },
    },
    weights: {
        CHUNG: 0.5,
        HAE: 0.5,
        PA: 0.5,
        WONJIN: 0.5,
        HYEONG: 0.5,
        GONGMANG: 0.5,
    },
    combine: 'max',
    weakThreshold: 1,
    invalidateThreshold: 0,
    excludeNames: ['CHUNG_SAL', 'HYEONG_SAL', 'HAE_SAL', 'PA_SAL', 'WONJIN_SAL', 'GONGMANG_SAL', 'GONGMANG'],
};
