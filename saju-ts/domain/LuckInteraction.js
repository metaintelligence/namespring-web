export var LuckQuality;
(function (LuckQuality) {
    LuckQuality["VERY_FAVORABLE"] = "VERY_FAVORABLE";
    LuckQuality["FAVORABLE"] = "FAVORABLE";
    LuckQuality["NEUTRAL"] = "NEUTRAL";
    LuckQuality["UNFAVORABLE"] = "UNFAVORABLE";
    LuckQuality["VERY_UNFAVORABLE"] = "VERY_UNFAVORABLE";
})(LuckQuality || (LuckQuality = {}));
export const LUCK_QUALITY_INFO = {
    [LuckQuality.VERY_FAVORABLE]: { koreanName: '대길' },
    [LuckQuality.FAVORABLE]: { koreanName: '길' },
    [LuckQuality.NEUTRAL]: { koreanName: '평' },
    [LuckQuality.UNFAVORABLE]: { koreanName: '흉' },
    [LuckQuality.VERY_UNFAVORABLE]: { koreanName: '대흉' },
};
//# sourceMappingURL=LuckInteraction.js.map