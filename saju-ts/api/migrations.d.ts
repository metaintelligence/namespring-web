import type { EngineConfig } from './types.js';
/**
 * Config schema migration framework.
 *
 * Goal: keep the public API stable while allowing internal config schemas to evolve.
 * - `schemaVersion` is a coarse, user-facing version tag.
 * - `strategies` / `extensions` remain open-ended (data-first), so migrations
 *   only cover known top-level fields.
 */
export declare const CURRENT_CONFIG_SCHEMA_VERSION = "1";
export interface ConfigMigration {
    from: string;
    to: string;
    migrate: (config: any) => any;
}
/**
 * Apply sequential migrations until CURRENT_CONFIG_SCHEMA_VERSION.
 *
 * The engine is intentionally tolerant:
 * - Missing/invalid schemaVersion is treated as legacy '0'.
 * - Unknown older versions are "best-effort" stamped to current (without throwing).
 */
export declare function migrateConfig(input: unknown): EngineConfig;
