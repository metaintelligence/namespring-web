import type { RuleSet } from '../dsl.js';
import type { ShinsalConditionsRuleSpec } from './shinsalConditionsSpec.js';
/**
 * Compile a JSON macro spec into a concrete shinsal-conditions ruleset.
 */
export declare function compileShinsalConditionsRuleSpec(specInput: ShinsalConditionsRuleSpec | ShinsalConditionsRuleSpec[]): RuleSet;
