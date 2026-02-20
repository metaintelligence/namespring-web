import type { EngineConfig } from '../api/types.js';
import type { SchoolPreset, SchoolPresetPack } from './packTypes.js';
export type { SchoolPreset, SchoolPresetPack } from './packTypes.js';
export declare function listSchoolPresets(): SchoolPreset[];
export declare function getSchoolPreset(id: string): SchoolPreset | null;
/**
 * Combine built-in pack with user-provided packs embedded in config.
 *
 * User packs can be provided (soft locations):
 * - config.extensions.presetPacks
 * - config.extensions.schoolPacks
 * - config.extensions.schools.packs
 */
export declare function resolveSchoolPresetPacks(config: EngineConfig): SchoolPresetPack[];
/**
 * Apply a preset overlay on top of a base config.
 *
 * - Uses deepMerge so nested config doesn't get erased
 * - Concatenates extensions.ruleSpecs buckets to allow composition ("a+b")
 */
export declare function applySchoolPreset(baseConfig: EngineConfig, presetId: string, packs?: SchoolPresetPack[]): EngineConfig;
/**
 * Utility: apply multiple presets in order.
 * (Used internally by config normalization, but kept exported for power-users.)
 */
export declare function applySchoolPresets(baseConfig: EngineConfig, presetIds: string[], packs?: SchoolPresetPack[]): EngineConfig;
