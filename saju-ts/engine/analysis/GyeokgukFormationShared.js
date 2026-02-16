import { OhaengRelation, OhaengRelations, ohaengKoreanLabel } from '../../domain/Ohaeng.js';
import { GyeokgukQuality } from '../../domain/Gyeokguk.js';
import { Sipseong } from '../../domain/Sipseong.js';
export function collectMessages(rules) {
    const messages = [];
    for (const [condition, message] of rules) {
        if (condition)
            messages.push(message);
    }
    return messages;
}
export function ohaengKorean(ohaeng) {
    return ohaengKoreanLabel(ohaeng);
}
export function buildFormation(breaking, rescue, formationGood, patternName, formationCondition) {
    let quality;
    if (breaking.length === 0 && formationGood) {
        quality = GyeokgukQuality.WELL_FORMED;
    }
    else if (breaking.length > 0 && rescue.length > 0) {
        quality = GyeokgukQuality.RESCUED;
    }
    else if (breaking.length > 0) {
        quality = GyeokgukQuality.BROKEN;
    }
    else {
        quality = GyeokgukQuality.WELL_FORMED; // no breaking factors found
    }
    let reasoning;
    if (quality === GyeokgukQuality.WELL_FORMED) {
        reasoning = `${patternName} 성격(成格): ${formationCondition} 조건이 충족되어 격국이 잘 형성됨.`;
    }
    else if (quality === GyeokgukQuality.BROKEN) {
        reasoning = `${patternName} 파격(破格): ${breaking[0].split(':')[0]}. 격국의 핵심 기능이 손상됨.`;
    }
    else if (quality === GyeokgukQuality.RESCUED) {
        reasoning = `${patternName} 파격 구원(救應): ${breaking[0].split(':')[0]}이 발생했으나, ` +
            `${rescue[0].split('(')[0]}으로 구원됨.`;
    }
    else {
        reasoning = `${patternName} 성격/파격 미평가.`;
    }
    return {
        quality,
        breakingFactors: breaking,
        rescueFactors: rescue,
        reasoning,
    };
}
export function buildNotAssessedFormation(reasoning) {
    return {
        quality: GyeokgukQuality.NOT_ASSESSED,
        breakingFactors: [],
        rescueFactors: [],
        reasoning,
    };
}
function evaluateRules(profile, rules) {
    return collectMessages(rules.map(([predicate, message]) => [predicate(profile), message]));
}
export function evaluateFormationRule(profile, spec) {
    const breaking = evaluateRules(profile, spec.breaking);
    const rescue = evaluateRules(profile, spec.rescue ?? []);
    const formationGood = spec.support(profile) && breaking.length === 0;
    return buildFormation(breaking, rescue, formationGood, spec.patternName, spec.formationCondition);
}
export function hasElementInStems(p, element) {
    const relation = OhaengRelations.relation(p.dayMasterElement, element);
    switch (relation) {
        case OhaengRelation.BIHWA: return p.hasBigyeop;
        case OhaengRelation.YEOKSAENG: return p.hasSiksang;
        case OhaengRelation.SANGGEUK: return p.hasJae;
        case OhaengRelation.YEOKGEUK: return p.hasGwan;
        case OhaengRelation.SANGSAENG: return p.hasInseong;
    }
}
export function hasElementInHidden(p, element) {
    const relation = OhaengRelations.relation(p.dayMasterElement, element);
    switch (relation) {
        case OhaengRelation.BIHWA:
            return p.hiddenSipseongs.has(Sipseong.BI_GYEON) || p.hiddenSipseongs.has(Sipseong.GYEOB_JAE);
        case OhaengRelation.YEOKSAENG:
            return p.hiddenSipseongs.has(Sipseong.SIK_SIN) || p.hiddenSipseongs.has(Sipseong.SANG_GWAN);
        case OhaengRelation.SANGGEUK:
            return p.hiddenSipseongs.has(Sipseong.PYEON_JAE) || p.hiddenSipseongs.has(Sipseong.JEONG_JAE);
        case OhaengRelation.YEOKGEUK:
            return p.hiddenSipseongs.has(Sipseong.PYEON_GWAN) || p.hiddenSipseongs.has(Sipseong.JEONG_GWAN);
        case OhaengRelation.SANGSAENG:
            return p.hiddenSipseongs.has(Sipseong.PYEON_IN) || p.hiddenSipseongs.has(Sipseong.JEONG_IN);
    }
}
//# sourceMappingURL=GyeokgukFormationShared.js.map