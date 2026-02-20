/**
 * A tiny deep-merge utility for config overlays.
 *
 * - Objects: merged recursively
 * - Arrays: replaced (overlay wins)
 * - Primitives: replaced (overlay wins)
 */
function isPlainObject(x) {
    if (!x || typeof x !== 'object')
        return false;
    if (Array.isArray(x))
        return false;
    const proto = Object.getPrototypeOf(x);
    return proto === Object.prototype || proto === null;
}
export function deepMerge(base, overlay) {
    if (overlay == null)
        return base;
    // Array replacement
    if (Array.isArray(base) || Array.isArray(overlay)) {
        return (Array.isArray(overlay) ? overlay : base);
    }
    // Object merge
    if (isPlainObject(base) && isPlainObject(overlay)) {
        const out = { ...base };
        for (const [k, v] of Object.entries(overlay)) {
            if (k in out) {
                out[k] = deepMerge(out[k], v);
            }
            else {
                out[k] = v;
            }
        }
        return out;
    }
    // Primitive replacement
    return overlay;
}
