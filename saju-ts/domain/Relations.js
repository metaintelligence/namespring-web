export var CheonganRelationType;
(function (CheonganRelationType) {
    CheonganRelationType["HAP"] = "HAP";
    CheonganRelationType["CHUNG"] = "CHUNG";
})(CheonganRelationType || (CheonganRelationType = {}));
export var JijiRelationType;
(function (JijiRelationType) {
    JijiRelationType["YUKHAP"] = "YUKHAP";
    JijiRelationType["SAMHAP"] = "SAMHAP";
    JijiRelationType["BANGHAP"] = "BANGHAP";
    JijiRelationType["BANHAP"] = "BANHAP";
    JijiRelationType["CHUNG"] = "CHUNG";
    JijiRelationType["HYEONG"] = "HYEONG";
    JijiRelationType["PA"] = "PA";
    JijiRelationType["HAE"] = "HAE";
    JijiRelationType["WONJIN"] = "WONJIN";
})(JijiRelationType || (JijiRelationType = {}));
export var HapState;
(function (HapState) {
    HapState["HAPWHA"] = "HAPWHA";
    HapState["HAPGEO"] = "HAPGEO";
    HapState["NOT_ESTABLISHED"] = "NOT_ESTABLISHED";
})(HapState || (HapState = {}));
export const HAP_STATE_INFO = {
    [HapState.HAPWHA]: { koreanName: '합화' },
    [HapState.HAPGEO]: { koreanName: '합거' },
    [HapState.NOT_ESTABLISHED]: { koreanName: '불성립' },
};
export var InteractionOutcome;
(function (InteractionOutcome) {
    InteractionOutcome["ACTIVE"] = "ACTIVE";
    InteractionOutcome["WEAKENED"] = "WEAKENED";
    InteractionOutcome["BROKEN"] = "BROKEN";
    InteractionOutcome["STRENGTHENED"] = "STRENGTHENED";
})(InteractionOutcome || (InteractionOutcome = {}));
export var CompositeInteractionType;
(function (CompositeInteractionType) {
    CompositeInteractionType["SYNERGY"] = "SYNERGY";
    CompositeInteractionType["AMPLIFY"] = "AMPLIFY";
    CompositeInteractionType["AMPLIFY_NEGATIVE"] = "AMPLIFY_NEGATIVE";
    CompositeInteractionType["TEMPER"] = "TEMPER";
    CompositeInteractionType["TRANSFORM"] = "TRANSFORM";
})(CompositeInteractionType || (CompositeInteractionType = {}));
export const COMPOSITE_INTERACTION_INFO = {
    [CompositeInteractionType.SYNERGY]: { koreanName: '시너지' },
    [CompositeInteractionType.AMPLIFY]: { koreanName: '증폭' },
    [CompositeInteractionType.AMPLIFY_NEGATIVE]: { koreanName: '부정증폭' },
    [CompositeInteractionType.TEMPER]: { koreanName: '완화' },
    [CompositeInteractionType.TRANSFORM]: { koreanName: '변환' },
};
//# sourceMappingURL=Relations.js.map