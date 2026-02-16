import { JijiRelationType } from '../../domain/Relations.js';
import { addPairHits as addPairRelationHits, addTripleHits as addTripleRelationHits, } from './RelationHitHelpers.js';
import { BANHAP_DEFS, BANGHAP_TRIPLES, CHUNG_PAIRS, HAE_PAIRS, HYEONG_PAIRS, HYEONG_TRIPLES, PA_PAIRS, SAMHAP_TRIPLES, SELF_HYEONG_BRANCHES, WONJIN_PAIRS, YUKHAP_PAIRS, } from './RelationCatalog.js';
const SELF_PENALTY_NOTE = '\uC790\uD615';
export function analyzeBranchRelations(pillars) {
    const { counts, present } = buildBranchPresence(pillars);
    const hits = [];
    const addHit = createHitCollector(hits);
    addPairRelationHits(JijiRelationType.YUKHAP, YUKHAP_PAIRS, present, addHit);
    addTripleRelationHits(JijiRelationType.SAMHAP, SAMHAP_TRIPLES, present, addHit);
    for (const banhap of BANHAP_DEFS) {
        if (present.has(banhap.a) && present.has(banhap.b) && !present.has(banhap.missing)) {
            addHit(JijiRelationType.BANHAP, new Set([banhap.a, banhap.b]), banhap.note);
        }
    }
    addTripleRelationHits(JijiRelationType.BANGHAP, BANGHAP_TRIPLES, present, addHit);
    addPairRelationHits(JijiRelationType.CHUNG, CHUNG_PAIRS, present, addHit);
    addTripleRelationHits(JijiRelationType.HYEONG, HYEONG_TRIPLES, present, addHit);
    addPairRelationHits(JijiRelationType.HYEONG, HYEONG_PAIRS, present, addHit);
    for (const self of SELF_HYEONG_BRANCHES) {
        if ((counts.get(self) ?? 0) >= 2) {
            addHit(JijiRelationType.HYEONG, new Set([self]), SELF_PENALTY_NOTE);
        }
    }
    addPairRelationHits(JijiRelationType.PA, PA_PAIRS, present, addHit);
    addPairRelationHits(JijiRelationType.HAE, HAE_PAIRS, present, addHit);
    addPairRelationHits(JijiRelationType.WONJIN, WONJIN_PAIRS, present, addHit);
    return hits;
}
export class RelationAnalyzer {
    analyze(pillars) {
        return analyzeBranchRelations(pillars);
    }
}
function buildBranchPresence(pillars) {
    const counts = new Map();
    const branches = [pillars.year.jiji, pillars.month.jiji, pillars.day.jiji, pillars.hour.jiji];
    for (const branch of branches) {
        counts.set(branch, (counts.get(branch) ?? 0) + 1);
    }
    return { counts, present: new Set(counts.keys()) };
}
function createHitCollector(hits) {
    const seen = new Set();
    return (type, members, note = '') => {
        const key = `${type}|${[...members].map((member) => member).sort().join('-')}|${note}`;
        if (!seen.has(key)) {
            seen.add(key);
            hits.push({ type, members, note });
        }
    };
}
//# sourceMappingURL=RelationAnalyzerCore.js.map