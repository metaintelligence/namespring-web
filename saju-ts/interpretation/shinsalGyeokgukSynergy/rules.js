import { GyeokgukCategory, GyeokgukType } from '../../domain/Gyeokguk.js';
import { ShinsalType } from '../../domain/Shinsal.js';
import { createEnumValueParser } from '../../domain/EnumValueParser.js';
import rawShinsalSynergyData from './data.json';
const SYNERGY_DATA = rawShinsalSynergyData;
const parseShinsalType = createEnumValueParser('ShinsalType', 'shinsal synergy data', ShinsalType);
const parseGyeokgukType = createEnumValueParser('GyeokgukType', 'shinsal synergy data', GyeokgukType);
const parseGyeokgukCategory = createEnumValueParser('GyeokgukCategory', 'shinsal synergy data', GyeokgukCategory);
function synergyKey(shinsal, gyeokgukType, category) {
    return `${shinsal}::${gyeokgukType}::${category}`;
}
const SHINSAL_GYEOKGUK_SYNERGY_MAP = new Map(SYNERGY_DATA.rows.map(([rawShinsal, rawType, rawCategory, narrative]) => [
    synergyKey(parseShinsalType(rawShinsal), parseGyeokgukType(rawType), parseGyeokgukCategory(rawCategory)),
    narrative,
]));
export const SHINSAL_TYPES_WITH_GYEOKGUK_SYNERGY = new Set(SYNERGY_DATA.rows.map(([rawShinsal]) => parseShinsalType(rawShinsal)));
export function shinsalGyeokgukSynergyLookup(shinsal, gyeokgukType, category) {
    return SHINSAL_GYEOKGUK_SYNERGY_MAP.get(synergyKey(shinsal, gyeokgukType, category)) ?? null;
}
//# sourceMappingURL=rules.js.map