export declare const DETERMINISTIC_TARGET = 95;
export declare const PREDICTIVE_TARGET = 70;
export declare const DETERMINISTIC_RULE_IDS: ReadonlySet<string>;
export declare const PREDICTIVE_RULE_IDS: ReadonlySet<string>;
export declare const CORE_CALCULATION_RULE_IDS: ReadonlySet<string>;
export interface ConfidenceViolation {
    readonly ruleId: string;
    readonly actual: number;
    readonly required: number;
    readonly reason: string;
}
export interface ConfidenceAuditResult {
    readonly strictCalculation95: boolean;
    readonly expectedRuleCount: number;
    readonly violationCount: number;
    readonly violations: readonly ConfidenceViolation[];
    readonly isPass: boolean;
}
export interface ConfidencePolicySummary {
    readonly totalRules: number;
    readonly minConfidence: number;
    readonly avgConfidence: number;
    readonly deterministicRuleCount: number;
    readonly deterministicAt95Count: number;
    readonly baselinePass: boolean;
    readonly strictCalculation95Pass: boolean;
    readonly strictViolationCount: number;
    readonly strictViolations: readonly string[];
}
export declare const RuleConfidencePolicy: {
    readonly baselineAudit: () => ConfidenceAuditResult;
    readonly strictCalculationAudit: () => ConfidenceAuditResult;
    readonly summary: () => ConfidencePolicySummary;
};
//# sourceMappingURL=RuleConfidencePolicy.d.ts.map