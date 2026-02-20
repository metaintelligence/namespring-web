import type { RuleSet } from '../dsl.js';
import type { ShinsalRuleSpec } from './shinsalSpec.js';
/**
 * Compile a JSON macro spec into a concrete shinsal ruleset.
 *
 * This is intended for configuration-driven extensibility:
 * - keep the public API stable
 * - avoid repetitive JSON-DSL boilerplate
 */
export declare function compileShinsalRuleSpec(specInput: ShinsalRuleSpec | ShinsalRuleSpec[]): RuleSet;
