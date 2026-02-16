import { RuleCitationRegistry } from './RuleCitationRegistry.js';
export const DETERMINISTIC_TARGET = 95;
export const PREDICTIVE_TARGET = 70;
export const DETERMINISTIC_RULE_IDS = new Set([
    'gongmang.detection',
    'relation.cheongan.hap',
    'relation.cheongan.chung',
    'relation.jiji.samhap',
    'relation.jiji.chung',
    'shinsal.detection',
    'daeun.direction',
    'ohaeng.distribution',
    'strength.deukryeong',
]);
export const PREDICTIVE_RULE_IDS = new Set([
    'daeun.interpretation',
    'saeun.interpretation',
]);
export const CORE_CALCULATION_RULE_IDS = new Set([
    'strength.deukryeong',
    'strength.deukji',
    'strength.level',
    'relation.cheongan.hap',
    'relation.cheongan.chung',
    'relation.jiji.samhap',
    'relation.jiji.chung',
    'relation.jiji.hyeong',
    'relation.hapwha',
    'gongmang.detection',
    'shinsal.detection',
    'daeun.direction',
    'yongshin.johu',
    'ohaeng.distribution',
]);
const EXPECTED_RULE_IDS = new Set([
    ...DETERMINISTIC_RULE_IDS,
    ...PREDICTIVE_RULE_IDS,
    ...CORE_CALCULATION_RULE_IDS,
]);
const SORTED_EXPECTED_RULE_IDS = [...EXPECTED_RULE_IDS].sort();
const UNREGISTERED_RULE_REASON = 'Rule not registered in sentence citation registry';
const FALLBACK_THRESHOLD_REASON = 'Confidence below policy threshold';
const PREDICTIVE_REQUIREMENT_REASON = `Predictive rule must be >= ${PREDICTIVE_TARGET}`;
const DETERMINISTIC_REQUIREMENT_REASON = `Deterministic rule must be >= ${DETERMINISTIC_TARGET}`;
const STRICT_CORE_REQUIREMENT_REASON = `Strict mode requires all core calculation rules >= ${DETERMINISTIC_TARGET}`;
function requirementFor(ruleId, strictCalculation95) {
    return PREDICTIVE_RULE_IDS.has(ruleId)
        ? { required: PREDICTIVE_TARGET, reason: PREDICTIVE_REQUIREMENT_REASON }
        : DETERMINISTIC_RULE_IDS.has(ruleId)
            ? { required: DETERMINISTIC_TARGET, reason: DETERMINISTIC_REQUIREMENT_REASON }
            : strictCalculation95 && CORE_CALCULATION_RULE_IDS.has(ruleId)
                ? { required: DETERMINISTIC_TARGET, reason: STRICT_CORE_REQUIREMENT_REASON }
                : { required: 1, reason: FALLBACK_THRESHOLD_REASON };
}
function auditCitations(all, strictCalculation95) {
    const violations = [];
    for (const ruleId of SORTED_EXPECTED_RULE_IDS) {
        const requirement = requirementFor(ruleId, strictCalculation95);
        const citation = all.get(ruleId);
        if (citation == null) {
            violations.push({
                ruleId,
                actual: -1,
                required: requirement.required,
                reason: UNREGISTERED_RULE_REASON,
            });
            continue;
        }
        if (citation.confidence < requirement.required) {
            violations.push({
                ruleId,
                actual: citation.confidence,
                required: requirement.required,
                reason: requirement.reason,
            });
        }
    }
    return {
        strictCalculation95,
        expectedRuleCount: EXPECTED_RULE_IDS.size,
        violationCount: violations.length,
        violations,
        isPass: violations.length === 0,
    };
}
function auditFromRegistry(strictCalculation95) {
    return auditCitations(RuleCitationRegistry.allSentence(), strictCalculation95);
}
function roundToOneDecimal(value) {
    return Math.round(value * 10) / 10;
}
function average(values) {
    if (values.length === 0)
        return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function countDeterministicAtTarget(all) {
    let count = 0;
    for (const ruleId of DETERMINISTIC_RULE_IDS) {
        const citation = all.get(ruleId);
        if (citation != null && citation.confidence >= DETERMINISTIC_TARGET)
            count++;
    }
    return count;
}
export const RuleConfidencePolicy = {
    baselineAudit() {
        return auditFromRegistry(false);
    },
    strictCalculationAudit() {
        return auditFromRegistry(true);
    },
    summary() {
        const all = RuleCitationRegistry.allSentence();
        const baseline = auditCitations(all, false);
        const strict = auditCitations(all, true);
        const confidences = [...all.values()].map((citation) => citation.confidence);
        return {
            totalRules: all.size,
            minConfidence: confidences.length > 0 ? Math.min(...confidences) : 0,
            avgConfidence: roundToOneDecimal(average(confidences)),
            deterministicRuleCount: DETERMINISTIC_RULE_IDS.size,
            deterministicAt95Count: countDeterministicAtTarget(all),
            baselinePass: baseline.isPass,
            strictCalculation95Pass: strict.isPass,
            strictViolationCount: strict.violations.length,
            strictViolations: strict.violations.map((violation) => violation.ruleId),
        };
    },
};
//# sourceMappingURL=RuleConfidencePolicy.js.map