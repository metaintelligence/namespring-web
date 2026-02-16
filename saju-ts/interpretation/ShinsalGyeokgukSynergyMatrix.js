import { ShinsalType } from '../domain/Shinsal.js';
import { SHINSAL_TYPES_WITH_GYEOKGUK_SYNERGY, shinsalGyeokgukSynergyLookup as lookupShinsalGyeokgukSynergyRules, } from './shinsalGyeokgukSynergy/rules.js';
export function shinsalGyeokgukSynergyLookup(shinsal, gyeokgukType, category) {
    return lookupShinsalGyeokgukSynergyRules(shinsal, gyeokgukType, category);
}
const ALL_SHINSAL_TYPES = Object.values(ShinsalType);
export const SHINSAL_TYPES_WITH_SYNERGY = SHINSAL_TYPES_WITH_GYEOKGUK_SYNERGY;
export const SHINSAL_TYPES_WITHOUT_SYNERGY = new Set(ALL_SHINSAL_TYPES.filter((type) => !SHINSAL_TYPES_WITH_SYNERGY.has(type)));
//# sourceMappingURL=ShinsalGyeokgukSynergyMatrix.js.map