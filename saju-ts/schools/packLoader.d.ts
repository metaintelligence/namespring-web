import type { EngineConfig } from '../api/types.js';
import type { SchoolPreset, SchoolPresetPack, SchoolPresetDefinition } from './packTypes.js';
export declare function concatRuleSpecs(baseRuleSpecs: any, overlayRuleSpecs: any): any;
/**
 * Expand a preset definition into a canonical SchoolPreset with a **materialized** overlay.
 *
 * - include.overlayBlocks are deep-merged (in order) into preset.overlay
 * - include.ruleSpecBlocks are attached under overlay.extensions.ruleSpecs.{target}
 */
export declare function materializePreset(def: SchoolPresetDefinition, pack: SchoolPresetPack): SchoolPreset;
export declare function buildPresetIndex(packs: SchoolPresetPack[]): Record<string, {
    preset: SchoolPreset;
    packId: string;
}>;
/**
 * Heuristic extraction for user-provided packs stored in config (data-first).
 *
 * Supported locations (soft, future-proof):
 * - config.extensions.presetPacks
 * - config.extensions.schoolPacks
 * - config.extensions.schools.packs
 */
export declare function extractUserPresetPacks(config: EngineConfig): SchoolPresetPack[];
