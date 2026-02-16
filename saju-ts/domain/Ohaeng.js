export var Ohaeng;
(function (Ohaeng) {
    Ohaeng["WOOD"] = "WOOD";
    Ohaeng["FIRE"] = "FIRE";
    Ohaeng["EARTH"] = "EARTH";
    Ohaeng["METAL"] = "METAL";
    Ohaeng["WATER"] = "WATER";
})(Ohaeng || (Ohaeng = {}));
export const OHAENG_VALUES = [
    Ohaeng.WOOD, Ohaeng.FIRE, Ohaeng.EARTH, Ohaeng.METAL, Ohaeng.WATER,
];
export const OHAENG_KOREAN_LABELS = {
    [Ohaeng.WOOD]: '목(木)',
    [Ohaeng.FIRE]: '화(火)',
    [Ohaeng.EARTH]: '토(土)',
    [Ohaeng.METAL]: '금(金)',
    [Ohaeng.WATER]: '수(水)',
};
export function ohaengKoreanLabel(ohaeng) {
    return OHAENG_KOREAN_LABELS[ohaeng];
}
export function ohaengOrdinal(o) {
    return OHAENG_VALUES.indexOf(o);
}
export var OhaengRelation;
(function (OhaengRelation) {
    OhaengRelation["SANGSAENG"] = "SANGSAENG";
    OhaengRelation["SANGGEUK"] = "SANGGEUK";
    OhaengRelation["BIHWA"] = "BIHWA";
    OhaengRelation["YEOKSAENG"] = "YEOKSAENG";
    OhaengRelation["YEOKGEUK"] = "YEOKGEUK";
})(OhaengRelation || (OhaengRelation = {}));
const CYCLE_SIZE = 5;
const OFFSET_TO_RELATION = [
    OhaengRelation.BIHWA, // d=0: same
    OhaengRelation.YEOKSAENG, // d=1: I generate
    OhaengRelation.SANGGEUK, // d=2: I control
    OhaengRelation.YEOKGEUK, // d=3: other controls me
    OhaengRelation.SANGSAENG, // d=4: other generates me
];
export const OhaengRelations = {
    relation(from, to) {
        const offset = ((ohaengOrdinal(to) - ohaengOrdinal(from)) + CYCLE_SIZE) % CYCLE_SIZE;
        return OFFSET_TO_RELATION[offset];
    },
    generates(element) {
        return OHAENG_VALUES[(ohaengOrdinal(element) + 1) % CYCLE_SIZE];
    },
    generatedBy(element) {
        return OHAENG_VALUES[(ohaengOrdinal(element) - 1 + CYCLE_SIZE) % CYCLE_SIZE];
    },
    controls(element) {
        return OHAENG_VALUES[(ohaengOrdinal(element) + 2) % CYCLE_SIZE];
    },
    controlledBy(element) {
        return OHAENG_VALUES[(ohaengOrdinal(element) - 2 + CYCLE_SIZE) % CYCLE_SIZE];
    },
    isSangsaeng(a, b) {
        return OhaengRelations.generates(a) === b;
    },
    isSanggeuk(a, b) {
        return OhaengRelations.controls(a) === b;
    },
};
//# sourceMappingURL=Ohaeng.js.map