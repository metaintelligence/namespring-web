import { PillarPosition } from '../domain/PillarPosition.js';
import { SIGNIFICANCE_TABLE, tableKey, } from './RelationSignificanceData.js';
import { inferPositionPairFromMembers } from './PositionPairResolver.js';
export { POSITION_PAIR_INFO, PositionPair } from './RelationSignificanceData.js';
export function inferPositionPair(members, pillars) {
    return inferPositionPairFromMembers(members, [
        [PillarPosition.YEAR, pillars.year.jiji],
        [PillarPosition.MONTH, pillars.month.jiji],
        [PillarPosition.DAY, pillars.day.jiji],
        [PillarPosition.HOUR, pillars.hour.jiji],
    ]);
}
function lookupSignificance(type, posPair) {
    const significance = SIGNIFICANCE_TABLE.get(tableKey(type, posPair));
    if (!significance) {
        throw new Error(`Missing RelationSignificance entry: ${type}+${posPair}`);
    }
    return significance;
}
export function interpretRelationSignificance(relationType, members, pillars) {
    const posPair = inferPositionPair(members, pillars);
    if (posPair === null)
        return null;
    return lookupSignificance(relationType, posPair);
}
export function interpretRelationSignificanceWithPair(relationType, posPair) {
    return lookupSignificance(relationType, posPair);
}
export const RelationSignificanceInterpreter = {
    interpret: interpretRelationSignificance,
    interpretWithPair: interpretRelationSignificanceWithPair,
};
//# sourceMappingURL=RelationSignificanceInterpreter.js.map