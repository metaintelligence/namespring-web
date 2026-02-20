import { deepMerge } from '../utils/deepMerge.js';
function asArray(x) {
    return Array.isArray(x) ? x : [x];
}
export function concatRuleSpecs(baseRuleSpecs, overlayRuleSpecs) {
    if (!baseRuleSpecs && !overlayRuleSpecs)
        return undefined;
    if (!baseRuleSpecs)
        return overlayRuleSpecs;
    if (!overlayRuleSpecs)
        return baseRuleSpecs;
    const out = { ...baseRuleSpecs };
    const keys = new Set([...Object.keys(baseRuleSpecs ?? {}), ...Object.keys(overlayRuleSpecs ?? {})]);
    for (const k of keys) {
        const b = baseRuleSpecs[k];
        const o = overlayRuleSpecs[k];
        if (b == null) {
            out[k] = o;
            continue;
        }
        if (o == null) {
            out[k] = b;
            continue;
        }
        // Both present: concat as spec array (compiler already supports spec | spec[]).
        out[k] = [...asArray(b), ...asArray(o)];
    }
    return out;
}
function safeOverlayBlock(pack, id) {
    const b = pack?.overlayBlocks?.[id];
    if (!b || typeof b !== 'object')
        return null;
    return b;
}
function safeRuleSpecBlock(pack, id) {
    const b = pack?.ruleSpecBlocks?.[id];
    if (!b || typeof b !== 'object')
        return null;
    if (typeof b.target !== 'string')
        return null;
    if (!('spec' in b))
        return null;
    return b;
}
function mergeInclude(parent, child) {
    const p = parent ?? {};
    const c = child ?? {};
    const overlayBlocks = [...(p.overlayBlocks ?? []), ...(c.overlayBlocks ?? [])];
    const ruleSpecBlocks = [...(p.ruleSpecBlocks ?? []), ...(c.ruleSpecBlocks ?? [])];
    const out = {};
    if (overlayBlocks.length)
        out.overlayBlocks = overlayBlocks;
    if (ruleSpecBlocks.length)
        out.ruleSpecBlocks = ruleSpecBlocks;
    return Object.keys(out).length ? out : undefined;
}
function uniq(xs) {
    const seen = new Set();
    const out = [];
    for (const x of xs) {
        if (seen.has(x))
            continue;
        seen.add(x);
        out.push(x);
    }
    return out;
}
function resolveExtends(def, pack, stack = []) {
    const parentId = def.extends;
    if (!parentId)
        return def;
    if (stack.includes(def.id)) {
        // Cycle guard: return child as-is.
        return def;
    }
    const parent = (pack.presets ?? []).find((p) => p?.id === parentId);
    if (!parent)
        return def;
    const parentResolved = resolveExtends(parent, pack, [...stack, def.id]);
    const mergedOverlay = deepMerge(parentResolved.overlay ?? {}, def.overlay ?? {});
    const mergedInclude = mergeInclude(parentResolved.include, def.include);
    const mergedAliases = uniq([...(parentResolved.aliases ?? []), ...(def.aliases ?? [])]);
    const mergedSources = uniq([...(parentResolved.sources ?? []), ...(def.sources ?? [])]);
    return {
        ...def,
        overlay: Object.keys(mergedOverlay ?? {}).length ? mergedOverlay : def.overlay,
        include: mergedInclude,
        aliases: mergedAliases.length ? mergedAliases : def.aliases,
        sources: mergedSources.length ? mergedSources : def.sources,
    };
}
/**
 * Expand a preset definition into a canonical SchoolPreset with a **materialized** overlay.
 *
 * - include.overlayBlocks are deep-merged (in order) into preset.overlay
 * - include.ruleSpecBlocks are attached under overlay.extensions.ruleSpecs.{target}
 */
export function materializePreset(def, pack) {
    const resolved = resolveExtends(def, pack);
    // 1) Overlay blocks
    let overlay = {};
    for (const bid of resolved.include?.overlayBlocks ?? []) {
        const b = safeOverlayBlock(pack, bid);
        if (!b)
            continue;
        overlay = deepMerge(overlay, b);
    }
    // 2) Preset overlay
    if (resolved.overlay)
        overlay = deepMerge(overlay, resolved.overlay);
    // 3) RuleSpec blocks → overlay.extensions.ruleSpecs
    const blocks = resolved.include?.ruleSpecBlocks ?? [];
    if (blocks.length) {
        const ruleSpecs = {};
        for (const rid of blocks) {
            const b = safeRuleSpecBlock(pack, rid);
            if (!b)
                continue;
            const tgt = b.target;
            const prev = ruleSpecs[tgt];
            const next = b.spec;
            ruleSpecs[tgt] = prev == null ? next : [...asArray(prev), ...asArray(next)];
        }
        // Attach (and concatenate if preset.overlay already had ruleSpecs).
        const ext = overlay.extensions ?? {};
        overlay.extensions = ext;
        ext.ruleSpecs = concatRuleSpecs(ext.ruleSpecs, ruleSpecs);
    }
    return {
        id: resolved.id,
        name: resolved.name,
        description: resolved.description,
        aliases: resolved.aliases,
        sources: resolved.sources,
        overlay: overlay,
    };
}
export function buildPresetIndex(packs) {
    const out = {};
    // Later packs override earlier ones.
    for (const pack of packs) {
        for (const def of pack.presets ?? []) {
            if (!def || typeof def.id !== 'string')
                continue;
            const p = materializePreset(def, pack);
            out[p.id] = { preset: p, packId: pack.id };
            for (const a of p.aliases ?? [])
                out[a] = { preset: p, packId: pack.id };
        }
    }
    return out;
}
/**
 * Heuristic extraction for user-provided packs stored in config (data-first).
 *
 * Supported locations (soft, future-proof):
 * - config.extensions.presetPacks
 * - config.extensions.schoolPacks
 * - config.extensions.schools.packs
 */
export function extractUserPresetPacks(config) {
    const ext = config.extensions ?? {};
    const raw = ext.presetPacks ?? ext.schoolPacks ?? ext?.schools?.packs;
    if (!raw)
        return [];
    const arr = Array.isArray(raw) ? raw : [raw];
    const packs = [];
    for (const p of arr) {
        if (!p || typeof p !== 'object')
            continue;
        if (typeof p.schemaVersion !== 'string')
            continue;
        if (typeof p.id !== 'string')
            continue;
        if (!Array.isArray(p.presets))
            continue;
        packs.push(p);
    }
    return packs;
}
