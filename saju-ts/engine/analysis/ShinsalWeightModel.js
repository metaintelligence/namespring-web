import { PillarPosition } from '../../domain/PillarPosition.js';
import { CompositeInteractionType, COMPOSITE_INTERACTION_INFO, } from '../../domain/Relations.js';
import { ShinsalType } from '../../domain/Shinsal.js';
import rawWeightTable from './data/shinsalWeightTable.json';
export { CompositeInteractionType };
export const COMPOSITE_INTERACTION_KOREAN = Object.fromEntries(Object.entries(COMPOSITE_INTERACTION_INFO).map(([type, info]) => [type, info.koreanName]));
function loadBaseWeightTable() {
    const raw = rawWeightTable;
    const table = {};
    for (const shinsalType of Object.values(ShinsalType)) {
        const weight = raw[shinsalType];
        if (weight == null) {
            throw new Error(`Missing shinsal base weight: ${shinsalType}`);
        }
        table[shinsalType] = weight;
    }
    return table;
}
const BASE_WEIGHT_TABLE = loadBaseWeightTable();
function positionMultiplierFor(position) {
    switch (position) {
        case PillarPosition.DAY: return 1.0;
        case PillarPosition.MONTH: return 0.85;
        case PillarPosition.YEAR: return 0.7;
        case PillarPosition.HOUR: return 0.6;
    }
}
export const ShinsalWeightCalculator = {
    weight(hit) {
        const base = baseShinsalWeightFor(hit.type);
        const multiplier = shinsalPositionMultiplierFor(hit.position);
        return {
            hit,
            baseWeight: base,
            positionMultiplier: multiplier,
            weightedScore: Math.round(base * multiplier),
        };
    },
    weightAll(hits) {
        return hits
            .map((hit) => weightShinsalHit(hit))
            .sort((left, right) => right.weightedScore - left.weightedScore);
    },
    baseWeightFor(type) {
        return BASE_WEIGHT_TABLE[type];
    },
    positionMultiplierFor,
};
export const weightShinsalHit = ShinsalWeightCalculator.weight;
export const weightAllShinsalHits = ShinsalWeightCalculator.weightAll;
export const baseShinsalWeightFor = ShinsalWeightCalculator.baseWeightFor;
export const shinsalPositionMultiplierFor = ShinsalWeightCalculator.positionMultiplierFor;
//# sourceMappingURL=ShinsalWeightModel.js.map