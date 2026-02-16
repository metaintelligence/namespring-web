import { PillarPosition } from '../domain/PillarPosition.js';
import { CheonganRelationType } from '../domain/Relations.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import { normalizeCatalogPairKey, PositionPair, } from './RelationSignificanceData.js';
import { inferPositionPairFromMembers } from './PositionPairResolver.js';
import rawCheonganSignificanceCatalog from './data/cheonganSignificanceCatalog.json';
export { PositionPair } from './RelationSignificanceData.js';
const CHEONGAN_SIGNIFICANCE_CATALOG = rawCheonganSignificanceCatalog;
const toCheonganRelationType = createEnumValueParser('CheonganRelationType', 'cheonganSignificanceCatalog.json', CheonganRelationType);
const toPositionPair = createEnumValueParser('PositionPair', 'cheonganSignificanceCatalog.json', PositionPair);
function tkey(type, pair) {
    return `${type}:${pair}`;
}
function normalizeTableKey(rawKey) {
    return normalizeCatalogPairKey(rawKey, 'cheongan significance', toCheonganRelationType, toPositionPair, tkey);
}
const TABLE = new Map(CHEONGAN_SIGNIFICANCE_CATALOG.entries.map(([rawKey, significance]) => [
    normalizeTableKey(rawKey),
    significance,
]));
function inferPositionPair(members, pillars) {
    return inferPositionPairFromMembers(members, [
        [PillarPosition.YEAR, pillars.year.cheongan],
        [PillarPosition.MONTH, pillars.month.cheongan],
        [PillarPosition.DAY, pillars.day.cheongan],
        [PillarPosition.HOUR, pillars.hour.cheongan],
    ]);
}
function lookupSignificance(type, posPair) {
    const significance = TABLE.get(tkey(type, posPair));
    if (!significance) {
        throw new Error(`Missing CheonganSignificance entry: ${type}+${posPair}`);
    }
    return significance;
}
export function interpretCheonganSignificance(relationType, membersOrPosPair, pillars) {
    if (typeof membersOrPosPair === 'string') {
        return lookupSignificance(relationType, membersOrPosPair);
    }
    const posPair = inferPositionPair(membersOrPosPair, pillars);
    if (!posPair)
        return null;
    return lookupSignificance(relationType, posPair);
}
export const CheonganSignificanceInterpreter = {
    interpret: interpretCheonganSignificance,
    inferPositionPair,
};
//# sourceMappingURL=CheonganSignificanceInterpreter.js.map