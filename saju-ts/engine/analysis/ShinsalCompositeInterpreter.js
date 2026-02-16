import { CompositeInteractionType, } from '../../domain/Relations.js';
import { ShinsalType } from '../../domain/Shinsal.js';
import { createEnumValueParser } from '../../domain/EnumValueParser.js';
import rawCompositeRules from './data/shinsalCompositeRules.json';
const PROXIMITY_BONUS = 5;
const parseShinsalType = createEnumValueParser('ShinsalType', 'shinsal composite rule', ShinsalType);
const parseInteractionType = createEnumValueParser('CompositeInteractionType', 'shinsal composite rule', CompositeInteractionType);
function loadCompositeRules() {
    const rules = rawCompositeRules;
    return rules.map((rule) => ({
        type1: parseShinsalType(rule.type1),
        type2: parseShinsalType(rule.type2),
        patternName: rule.patternName,
        interactionType: parseInteractionType(rule.interactionType),
        interpretation: rule.interpretation,
        baseBonusScore: rule.baseBonusScore,
    }));
}
export const COMPOSITE_RULES = loadCompositeRules();
function hasSamePillarHits(hits1, hits2) {
    const positions1 = new Set(hits1.map((hit) => hit.position));
    return hits2.some((hit) => positions1.has(hit.position));
}
function indexHitsByType(hits) {
    const indexed = new Map();
    for (const hit of hits) {
        const bucket = indexed.get(hit.type) ?? [];
        bucket.push(hit);
        indexed.set(hit.type, bucket);
    }
    return indexed;
}
export const ShinsalCompositeInterpreter = {
    detect(hits) {
        if (hits.length < 2)
            return [];
        const hitsByType = indexHitsByType(hits);
        const composites = [];
        for (const rule of COMPOSITE_RULES) {
            const hits1 = hitsByType.get(rule.type1);
            const hits2 = hitsByType.get(rule.type2);
            if (!hits1 || !hits2)
                continue;
            const samePillarBonus = hasSamePillarHits(hits1, hits2) ? PROXIMITY_BONUS : 0;
            composites.push({
                patternName: rule.patternName,
                interactionType: rule.interactionType,
                involvedHits: [...hits1, ...hits2],
                interpretation: rule.interpretation,
                bonusScore: rule.baseBonusScore + samePillarBonus,
            });
        }
        return composites;
    },
};
//# sourceMappingURL=ShinsalCompositeInterpreter.js.map