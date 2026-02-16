import { ohaengKoreanLabel } from '../domain/Ohaeng.js';
import { PILLAR_POSITION_VALUES } from '../domain/PillarPosition.js';
import { Sipseong } from '../domain/Sipseong.js';
export const WEALTH_STARS = new Set([Sipseong.PYEON_JAE, Sipseong.JEONG_JAE]);
export const OFFICIAL_STARS = new Set([Sipseong.PYEON_GWAN, Sipseong.JEONG_GWAN]);
export const EXPRESSION_STARS = new Set([Sipseong.SIK_SIN, Sipseong.SANG_GWAN]);
export function ohaengKr(oh) {
    return ohaengKoreanLabel(oh);
}
export function collectSipseongHits(analysis, targetSet) {
    const tga = analysis.tenGodAnalysis;
    if (!tga)
        return [];
    const hits = [];
    for (const pos of PILLAR_POSITION_VALUES) {
        const pg = tga.byPosition[pos];
        if (!pg)
            continue;
        if (targetSet.has(pg.cheonganSipseong)) {
            hits.push({ position: pos, sipseong: pg.cheonganSipseong });
        }
        if (targetSet.has(pg.jijiPrincipalSipseong)) {
            hits.push({ position: pos, sipseong: pg.jijiPrincipalSipseong });
        }
    }
    return hits;
}
export function deduplicateByType(hits, types) {
    const seen = new Set();
    return hits.filter(h => {
        if (!types.has(h.hit.type))
            return false;
        if (seen.has(h.hit.type))
            return false;
        seen.add(h.hit.type);
        return true;
    });
}
export function appendShinsalNotes(details, hits, noteByType) {
    for (const hit of hits) {
        const noteTemplate = noteByType[hit.hit.type];
        if (!noteTemplate)
            continue;
        details.push(typeof noteTemplate === 'function' ? noteTemplate(hit) : noteTemplate);
    }
}
//# sourceMappingURL=LifeDomainShared.js.map