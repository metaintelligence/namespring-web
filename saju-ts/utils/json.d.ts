export declare function stableStringify(value: unknown, space?: number): string;
/**
 * Canonical JSON string used for deterministic artifacts.
 *
 * We keep a stable key ordering and a fixed indentation.
 */
export declare function canonicalJson(value: unknown): string;
