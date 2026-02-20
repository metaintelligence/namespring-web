/**
 * Tiny JSON-DSL for scoring/constraints.
 *
 * Goals:
 * - No string parsing
 * - Deterministic evaluation
 * - Traceable rule matches
 *
 * This is intentionally minimal; extend operators as needed.
 */
export type JsonPrimitive = null | boolean | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | {
    [k: string]: JsonValue;
};
export type ExprVar = {
    var: string;
};
export type ExprOp = {
    op: string;
    args?: Expr[];
};
/**
 * Expression / template node.
 *
 * Important: we allow Expr nodes to appear anywhere inside a JSON-like tree
 * (e.g. rule.emit templates that embed {var:"..."} at leaf positions).
 */
export type Expr = JsonPrimitive | ExprVar | ExprOp | Expr[] | {
    [k: string]: Expr;
};
export interface Rule {
    id: string;
    when?: Expr;
    score?: Record<string, Expr>;
    emit?: Expr;
    assert?: Expr;
    explain?: string;
    tags?: string[];
}
export interface RuleSet {
    id: string;
    version: string;
    description?: string;
    rules: Rule[];
}
export interface RuleMatch {
    ruleId: string;
    explain?: string;
    scores?: Record<string, number>;
    emit?: JsonValue;
    tags?: string[];
}
export interface RuleEvalResult {
    scores: Record<string, number>;
    emits: JsonValue[];
    assertionsFailed: Array<{
        ruleId: string;
        explain?: string;
    }>;
    matches: RuleMatch[];
}
export declare function evalExpr(expr: Expr, facts: any): any;
export declare function evalRuleSet(ruleSet: RuleSet, facts: any, initScores?: Record<string, number>): RuleEvalResult;
