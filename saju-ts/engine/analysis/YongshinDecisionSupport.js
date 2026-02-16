import { CHEONGAN_INFO } from '../../domain/Cheongan.js';
import { OhaengRelations, ohaengKoreanLabel } from '../../domain/Ohaeng.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { HiddenStemTable } from '../../domain/HiddenStem.js';
import { GyeokgukCategory } from '../../domain/Gyeokguk.js';
import { YongshinType, YongshinAgreement, YONGSHIN_AGREEMENT_INFO } from '../../domain/YongshinResult.js';
import { YongshinPriority } from '../../config/CalculationConfig.js';
import { HapState } from '../../domain/Relations.js';
import { SipseongCategory } from './YongshinRuleCatalog.js';
const CATEGORY_TO_OHAENG = {
    [SipseongCategory.BIGYEOP]: dayMaster => dayMaster,
    [SipseongCategory.SIKSANG]: OhaengRelations.generates,
    [SipseongCategory.JAE]: OhaengRelations.controls,
    [SipseongCategory.GWAN]: OhaengRelations.controlledBy,
    [SipseongCategory.INSEONG]: OhaengRelations.generatedBy,
};
export function categoryToOhaeng(category, dayMasterOhaeng) {
    return CATEGORY_TO_OHAENG[category](dayMasterOhaeng);
}
export function ohaengKorean(ohaeng) {
    return ohaengKoreanLabel(ohaeng);
}
function incrementCount(counts, element) {
    counts.set(element, (counts.get(element) ?? 0) + 1);
}
export function countChartElements(pillars, hapHwaEvaluations = []) {
    const counts = new Map();
    const activeHapByPosition = new Map();
    for (const evalItem of hapHwaEvaluations) {
        if (evalItem.state !== HapState.NOT_ESTABLISHED) {
            activeHapByPosition.set(evalItem.position1, evalItem);
            activeHapByPosition.set(evalItem.position2, evalItem);
        }
    }
    const stemPositions = [
        [PillarPosition.YEAR, pillars.year.cheongan],
        [PillarPosition.MONTH, pillars.month.cheongan],
        [PillarPosition.HOUR, pillars.hour.cheongan],
    ];
    for (const [pos, stem] of stemPositions) {
        const activeHap = activeHapByPosition.get(pos);
        if (activeHap?.state === HapState.HAPWHA) {
            incrementCount(counts, activeHap.resultOhaeng);
            continue;
        }
        if (activeHap?.state !== HapState.HAPGEO)
            incrementCount(counts, CHEONGAN_INFO[stem].ohaeng);
    }
    const branchOrder = [pillars.year.jiji, pillars.month.jiji, pillars.day.jiji, pillars.hour.jiji];
    for (const branch of branchOrder) {
        incrementCount(counts, CHEONGAN_INFO[HiddenStemTable.getPrincipalStem(branch)].ohaeng);
    }
    return counts;
}
export function assessAgreement(eokbu, johu) {
    if (eokbu.primaryElement === johu.primaryElement) {
        return YongshinAgreement.FULL_AGREE;
    }
    if (eokbu.secondaryElement === johu.primaryElement ||
        johu.secondaryElement === eokbu.primaryElement) {
        return YongshinAgreement.PARTIAL_AGREE;
    }
    return YongshinAgreement.DISAGREE;
}
export function resolveFinal(eokbu, johu, priority = YongshinPriority.JOHU_FIRST) {
    if (eokbu.primaryElement === johu.primaryElement) {
        return eokbu.primaryElement;
    }
    if (eokbu.secondaryElement === johu.primaryElement) {
        return johu.primaryElement;
    }
    if (johu.secondaryElement === eokbu.primaryElement) {
        return eokbu.primaryElement;
    }
    switch (priority) {
        case YongshinPriority.JOHU_FIRST:
            return johu.primaryElement;
        case YongshinPriority.EOKBU_FIRST:
            return eokbu.primaryElement;
        case YongshinPriority.EQUAL_WEIGHT:
            return johu.confidence >= eokbu.confidence
                ? johu.primaryElement
                : eokbu.primaryElement;
    }
}
function agreementBonus(specialElement, eokbu, johu) {
    if (specialElement === eokbu.primaryElement || specialElement === johu.primaryElement)
        return 0.15;
    if (specialElement === eokbu.secondaryElement || specialElement === johu.secondaryElement)
        return 0.05;
    return 0.0;
}
const GYEOKGUK_OVERRIDE_RULES = [
    [YongshinType.HAPWHA_YONGSHIN, GyeokgukCategory.HWAGYEOK],
    [YongshinType.ILHAENG_YONGSHIN, GyeokgukCategory.ILHAENG],
    [YongshinType.JEONWANG, GyeokgukCategory.JONGGYEOK],
];
export function resolveAll(eokbu, johu, recommendations, config, gyeokgukResult) {
    const recommendationsByType = new Map();
    for (const recommendation of recommendations) {
        if (!recommendationsByType.has(recommendation.type))
            recommendationsByType.set(recommendation.type, recommendation);
    }
    if (gyeokgukResult) {
        for (const [recommendationType, category] of GYEOKGUK_OVERRIDE_RULES) {
            if (category !== gyeokgukResult.category)
                continue;
            const recommendation = recommendationsByType.get(recommendationType);
            if (!recommendation)
                continue;
            const bonus = agreementBonus(recommendation.primaryElement, eokbu, johu);
            return [recommendation.primaryElement, Math.min(recommendation.confidence + bonus, 0.95)];
        }
    }
    const tongwanRec = recommendationsByType.get(YongshinType.TONGGWAN);
    if (tongwanRec && eokbu.primaryElement !== johu.primaryElement) {
        return [tongwanRec.primaryElement, tongwanRec.confidence];
    }
    const baseAgreement = assessAgreement(eokbu, johu);
    const gyeokgukRec = recommendationsByType.get(YongshinType.GYEOKGUK);
    if (gyeokgukRec && eokbu.primaryElement !== johu.primaryElement) {
        if (gyeokgukRec.primaryElement === eokbu.primaryElement) {
            return [eokbu.primaryElement, 0.70];
        }
        if (gyeokgukRec.primaryElement === johu.primaryElement) {
            return [johu.primaryElement, 0.70];
        }
    }
    const baseResult = resolveFinal(eokbu, johu, config.yongshinPriority);
    return [baseResult, YONGSHIN_AGREEMENT_INFO[baseAgreement].confidence];
}
export function resolveHeesin(finalYongshin, eokbu, johu) {
    for (const candidate of new Set([johu.secondaryElement, eokbu.secondaryElement])) {
        if (candidate != null && candidate !== finalYongshin)
            return candidate;
    }
    const otherPrimary = finalYongshin === johu.primaryElement
        ? eokbu.primaryElement
        : johu.primaryElement;
    if (otherPrimary !== finalYongshin) {
        return otherPrimary;
    }
    return OhaengRelations.generatedBy(finalYongshin);
}
export function deriveGisin(yongshin) {
    return OhaengRelations.controlledBy(yongshin);
}
export function deriveGusin(gisin) {
    return OhaengRelations.generatedBy(gisin);
}
//# sourceMappingURL=YongshinDecisionSupport.js.map