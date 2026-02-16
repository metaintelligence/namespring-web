import { InteractionOutcome, JijiRelationType } from '../../domain/Relations.js';
const JIJI_RELATION_TYPE_KOREAN = {
    [JijiRelationType.SAMHAP]: '삼합',
    [JijiRelationType.BANGHAP]: '방합',
    [JijiRelationType.YUKHAP]: '육합',
    [JijiRelationType.BANHAP]: '반합',
    [JijiRelationType.CHUNG]: '충',
    [JijiRelationType.HYEONG]: '형',
    [JijiRelationType.PA]: '파',
    [JijiRelationType.HAE]: '해',
    [JijiRelationType.WONJIN]: '원진',
};
const INTERACTION_OUTCOME_KOREAN = {
    [InteractionOutcome.ACTIVE]: '정상',
    [InteractionOutcome.STRENGTHENED]: '강화',
    [InteractionOutcome.WEAKENED]: '약화',
    [InteractionOutcome.BROKEN]: '해소',
};
export function relationTypeKorean(type) {
    return JIJI_RELATION_TYPE_KOREAN[type];
}
export function interactionOutcomeKorean(outcome) {
    return INTERACTION_OUTCOME_KOREAN[outcome];
}
//# sourceMappingURL=RelationInteractionLabels.js.map