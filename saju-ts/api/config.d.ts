import type { EngineConfig } from './types.js';
export declare const defaultConfig: EngineConfig;
/**
 * Minimal normalization:
 * - apply defaults
 * - apply school preset overlays (optional)
 * - preserve unknown fields
 *
 * In later versions, this is where schema migrations would live.
 */
export declare function normalizeConfig(input: Partial<EngineConfig> | unknown): EngineConfig;
