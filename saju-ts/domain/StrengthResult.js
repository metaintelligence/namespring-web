export var StrengthLevel;
(function (StrengthLevel) {
    StrengthLevel["VERY_STRONG"] = "VERY_STRONG";
    StrengthLevel["STRONG"] = "STRONG";
    StrengthLevel["SLIGHTLY_STRONG"] = "SLIGHTLY_STRONG";
    StrengthLevel["SLIGHTLY_WEAK"] = "SLIGHTLY_WEAK";
    StrengthLevel["WEAK"] = "WEAK";
    StrengthLevel["VERY_WEAK"] = "VERY_WEAK";
})(StrengthLevel || (StrengthLevel = {}));
export const STRENGTH_LEVEL_INFO = {
    [StrengthLevel.VERY_STRONG]: { koreanName: '극신강' },
    [StrengthLevel.STRONG]: { koreanName: '신강' },
    [StrengthLevel.SLIGHTLY_STRONG]: { koreanName: '중강' },
    [StrengthLevel.SLIGHTLY_WEAK]: { koreanName: '중약' },
    [StrengthLevel.WEAK]: { koreanName: '신약' },
    [StrengthLevel.VERY_WEAK]: { koreanName: '극신약' },
};
export function isStrongSide(level) {
    return level === StrengthLevel.VERY_STRONG ||
        level === StrengthLevel.STRONG ||
        level === StrengthLevel.SLIGHTLY_STRONG;
}
//# sourceMappingURL=StrengthResult.js.map