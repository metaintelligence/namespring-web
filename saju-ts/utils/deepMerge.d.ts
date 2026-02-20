/**
 * A tiny deep-merge utility for config overlays.
 *
 * - Objects: merged recursively
 * - Arrays: replaced (overlay wins)
 * - Primitives: replaced (overlay wins)
 */
export declare function deepMerge<T>(base: T, overlay: any): T;
