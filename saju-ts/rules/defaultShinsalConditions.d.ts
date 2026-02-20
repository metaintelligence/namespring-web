import type { RuleSet } from './dsl.js';
/**
 * Default “conditions” ruleset for shinsal detections.
 *
 * This ruleset does NOT decide whether a shinsal exists; it only computes
 * penalty parts (cond.penalty.*) based on chart relations around the detection target.
 *
 * Evaluation model
 * - This ruleset is evaluated **per detection** with an injected `det` object.
 * - It may add numeric contributions to `cond.penalty.<KEY>`.
 * - The engine will combine these parts into a single penalty in [0,1],
 *   then compute qualityWeight = 1 - penalty.
 *
 * Weights are supplied by the engine under:
 *   policy.shinsal.conditions.weights.{CHUNG|HAE|PA|WONJIN|HYEONG|GONGMANG}
 *
 * The engine injects:
 * - det.targetBranches: BranchIdx[] context for the detection target.
 *   - BRANCH target: [targetBranch]
 *   - STEM target: branches of matched pillars (seat branches)
 *   - NONE target: targetBranches if emitted
 */
export declare const DEFAULT_SHINSAL_CONDITIONS_RULESET: RuleSet;
