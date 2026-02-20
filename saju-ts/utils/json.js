export function stableStringify(value, space) {
    return JSON.stringify(stableClone(value), null, space);
}
/**
 * Canonical JSON string used for deterministic artifacts.
 *
 * We keep a stable key ordering and a fixed indentation.
 */
export function canonicalJson(value) {
    return stableStringify(value, 2);
}
function stableClone(value) {
    if (value === null)
        return null;
    const t = typeof value;
    if (t === 'number' || t === 'string' || t === 'boolean')
        return value;
    if (t !== 'object')
        return value;
    if (Array.isArray(value))
        return value.map(stableClone);
    const out = {};
    const keys = Object.keys(value).sort();
    for (const k of keys) {
        out[k] = stableClone(value[k]);
    }
    return out;
}
