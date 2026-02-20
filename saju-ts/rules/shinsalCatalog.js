import { branchIdxFromHanja, ganzhiIndex, pillar, stemIdxFromHanja } from '../core/cycle.js';
import { mod } from '../core/mod.js';
export function mergeRawShinsalCatalog(base, ext) {
    return {
        meta: { ...base.meta, ...ext.meta },
        dayStem: { ...(base.dayStem ?? {}), ...(ext.dayStem ?? {}) },
        monthBranchStem: { ...(base.monthBranchStem ?? {}), ...(ext.monthBranchStem ?? {}) },
        monthBranchBranch: { ...(base.monthBranchBranch ?? {}), ...(ext.monthBranchBranch ?? {}) },
        dayPillar: { ...(base.dayPillar ?? {}), ...(ext.dayPillar ?? {}) },
    };
}
function parseGanzhiHanjaPair(s) {
    if (typeof s !== 'string')
        return null;
    const t = s.trim();
    if (t.length < 2)
        return null;
    const stemH = t[0];
    const branchH = t[1];
    const stem = stemIdxFromHanja(stemH);
    const branch = branchIdxFromHanja(branchH);
    if (stem == null || branch == null)
        return null;
    return pillar(stem, branch);
}
function normalizeDayStemSpec(raw) {
    const byStem = Array.from({ length: 10 }, () => []);
    const branches = (raw?.branches ?? {});
    for (const [stemH, brs] of Object.entries(branches)) {
        const sIdx = stemIdxFromHanja(stemH);
        if (sIdx == null)
            continue;
        const targets = [];
        for (const bH of brs ?? []) {
            const bIdx = branchIdxFromHanja(String(bH));
            if (bIdx == null)
                continue;
            targets.push(bIdx);
        }
        // de-dup + normalize
        const uniq = Array.from(new Set(targets.map((x) => mod(x, 12))));
        byStem[sIdx] = uniq;
    }
    return { byStem, description: raw?.description };
}
function normalizeMonthBranchStemSpec(raw) {
    const byBranch = Array.from({ length: 12 }, () => []);
    const stems = (raw?.stems ?? {});
    for (const [monthBranchH, ss] of Object.entries(stems)) {
        const bIdx = branchIdxFromHanja(monthBranchH);
        if (bIdx == null)
            continue;
        const targets = [];
        for (const sH of ss ?? []) {
            const sIdx = stemIdxFromHanja(String(sH));
            if (sIdx == null)
                continue;
            targets.push(sIdx);
        }
        const uniq = Array.from(new Set(targets.map((x) => mod(x, 10))));
        byBranch[bIdx] = uniq;
    }
    return { byBranch, description: raw?.description };
}
function normalizeMonthBranchBranchSpec(raw) {
    const byBranch = Array.from({ length: 12 }, () => []);
    const branches = (raw?.branches ?? {});
    for (const [monthBranchH, bs] of Object.entries(branches)) {
        const bIdx = branchIdxFromHanja(monthBranchH);
        if (bIdx == null)
            continue;
        const targets = [];
        for (const bH of bs ?? []) {
            const tIdx = branchIdxFromHanja(String(bH));
            if (tIdx == null)
                continue;
            targets.push(tIdx);
        }
        const uniq = Array.from(new Set(targets.map((x) => mod(x, 12))));
        byBranch[bIdx] = uniq;
    }
    return { byBranch, description: raw?.description };
}
function normalizeDayPillarSpec(raw) {
    const primary = new Set();
    const extended = new Set();
    for (const s of raw?.primary ?? []) {
        const p = parseGanzhiHanjaPair(s);
        if (!p)
            continue;
        const idx = ganzhiIndex(p);
        if (idx != null)
            primary.add(mod(idx, 60));
    }
    for (const s of raw?.extended ?? []) {
        const p = parseGanzhiHanjaPair(s);
        if (!p)
            continue;
        const idx = ganzhiIndex(p);
        if (idx != null)
            extended.add(mod(idx, 60));
    }
    return {
        primary,
        extended,
        requiresDayPillar: raw?.requiresDayPillar ?? true,
        description: raw?.description,
    };
}
export function normalizeShinsalCatalog(raw) {
    const meta = {
        id: raw?.meta?.id ?? 'shinsal.catalog.unknown',
        version: raw?.meta?.version ?? '0',
        description: raw?.meta?.description,
    };
    const dayStem = {};
    for (const [k, spec] of Object.entries(raw?.dayStem ?? {})) {
        dayStem[k] = normalizeDayStemSpec(spec);
    }
    const monthBranchStem = {};
    for (const [k, spec] of Object.entries(raw?.monthBranchStem ?? {})) {
        monthBranchStem[k] = normalizeMonthBranchStemSpec(spec);
    }
    const monthBranchBranch = {};
    for (const [k, spec] of Object.entries(raw?.monthBranchBranch ?? {})) {
        monthBranchBranch[k] = normalizeMonthBranchBranchSpec(spec);
    }
    const dayPillar = {};
    for (const [k, spec] of Object.entries(raw?.dayPillar ?? {})) {
        dayPillar[k] = normalizeDayPillarSpec(spec);
    }
    return { meta, dayStem, monthBranchStem, monthBranchBranch, dayPillar };
}
