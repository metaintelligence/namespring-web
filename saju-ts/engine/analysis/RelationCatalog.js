import { JIJI_VALUES } from '../../domain/Jiji.js';
import { createValueParser } from '../../domain/EnumValueParser.js';
import rawRelationCatalog from './data/relationCatalog.json';
const RELATION_CATALOG_DATA = rawRelationCatalog;
const toJiji = createValueParser('Jiji', 'RelationCatalog', JIJI_VALUES);
function toPairDef(raw) {
    return { a: toJiji(raw.a), b: toJiji(raw.b), note: raw.note };
}
function toTripleDef(raw) {
    return { a: toJiji(raw.a), b: toJiji(raw.b), c: toJiji(raw.c), note: raw.note };
}
function toBanhapDef(raw) {
    return {
        a: toJiji(raw.a),
        b: toJiji(raw.b),
        missing: toJiji(raw.missing),
        note: raw.note,
    };
}
export const YUKHAP_PAIRS = RELATION_CATALOG_DATA.yukhapPairs.map(toPairDef);
export const SAMHAP_TRIPLES = RELATION_CATALOG_DATA.samhapTriples.map(toTripleDef);
export const BANGHAP_TRIPLES = RELATION_CATALOG_DATA.banghapTriples.map(toTripleDef);
export const CHUNG_PAIRS = RELATION_CATALOG_DATA.chungPairs.map(toPairDef);
export const HYEONG_TRIPLES = RELATION_CATALOG_DATA.hyeongTriples.map(toTripleDef);
export const HYEONG_PAIRS = RELATION_CATALOG_DATA.hyeongPairs.map(toPairDef);
export const BANHAP_DEFS = RELATION_CATALOG_DATA.banhapDefs.map(toBanhapDef);
export const SELF_HYEONG_BRANCHES = new Set(RELATION_CATALOG_DATA.selfHyeongBranches.map(toJiji));
export const PA_PAIRS = RELATION_CATALOG_DATA.paPairs.map(toPairDef);
export const HAE_PAIRS = RELATION_CATALOG_DATA.haePairs.map(toPairDef);
export const WONJIN_PAIRS = RELATION_CATALOG_DATA.wonjinPairs.map(toPairDef);
//# sourceMappingURL=RelationCatalog.js.map