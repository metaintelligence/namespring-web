import { JijiRelationType } from '../domain/Relations.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import rawRelationSignificanceCatalog from './data/relationSignificanceCatalog.json';
export var PositionPair;
(function (PositionPair) {
    PositionPair["YEAR_MONTH"] = "YEAR_MONTH";
    PositionPair["YEAR_DAY"] = "YEAR_DAY";
    PositionPair["YEAR_HOUR"] = "YEAR_HOUR";
    PositionPair["MONTH_DAY"] = "MONTH_DAY";
    PositionPair["MONTH_HOUR"] = "MONTH_HOUR";
    PositionPair["DAY_HOUR"] = "DAY_HOUR";
})(PositionPair || (PositionPair = {}));
const RELATION_SIGNIFICANCE_CATALOG = rawRelationSignificanceCatalog;
const toPositionPair = createEnumValueParser('PositionPair', 'relationSignificanceCatalog.json', PositionPair);
const toJijiRelationType = createEnumValueParser('JijiRelationType', 'relationSignificanceCatalog.json', JijiRelationType);
export function tableKey(type, pair) {
    return `${type}:${pair}`;
}
export function normalizeCatalogPairKey(rawKey, sourceName, toLeft, toRight, keyBuilder) {
    const [rawLeft, rawRight, ...rest] = rawKey.split(':');
    if (!rawLeft || !rawRight || rest.length > 0) {
        throw new Error(`Invalid ${sourceName} key: ${rawKey}`);
    }
    return keyBuilder(toLeft(rawLeft), toRight(rawRight));
}
function normalizeTableKey(rawKey) {
    return normalizeCatalogPairKey(rawKey, 'relation significance', toJijiRelationType, toPositionPair, tableKey);
}
export const POSITION_PAIR_INFO = Object.fromEntries(RELATION_SIGNIFICANCE_CATALOG.pairInfoEntries.map(([rawPair, info]) => {
    const pair = toPositionPair(rawPair);
    return [pair, info];
}));
export const SIGNIFICANCE_TABLE = new Map(RELATION_SIGNIFICANCE_CATALOG.entries.map(([rawKey, entry]) => [normalizeTableKey(rawKey), entry]));
//# sourceMappingURL=RelationSignificanceData.js.map