export var YongshinType;
(function (YongshinType) {
    YongshinType["EOKBU"] = "EOKBU";
    YongshinType["JOHU"] = "JOHU";
    YongshinType["TONGGWAN"] = "TONGGWAN";
    YongshinType["GYEOKGUK"] = "GYEOKGUK";
    YongshinType["BYEONGYAK"] = "BYEONGYAK";
    YongshinType["JEONWANG"] = "JEONWANG";
    YongshinType["HAPWHA_YONGSHIN"] = "HAPWHA_YONGSHIN";
    YongshinType["ILHAENG_YONGSHIN"] = "ILHAENG_YONGSHIN";
})(YongshinType || (YongshinType = {}));
export const YONGSHIN_TYPE_INFO = {
    [YongshinType.EOKBU]: { koreanName: '억부용신' },
    [YongshinType.JOHU]: { koreanName: '조후용신' },
    [YongshinType.TONGGWAN]: { koreanName: '통관용신' },
    [YongshinType.GYEOKGUK]: { koreanName: '격국용신' },
    [YongshinType.BYEONGYAK]: { koreanName: '병약용신' },
    [YongshinType.JEONWANG]: { koreanName: '전왕용신' },
    [YongshinType.HAPWHA_YONGSHIN]: { koreanName: '합화용신' },
    [YongshinType.ILHAENG_YONGSHIN]: { koreanName: '일행득기용신' },
};
export var YongshinAgreement;
(function (YongshinAgreement) {
    YongshinAgreement["FULL_AGREE"] = "FULL_AGREE";
    YongshinAgreement["PARTIAL_AGREE"] = "PARTIAL_AGREE";
    YongshinAgreement["DISAGREE"] = "DISAGREE";
})(YongshinAgreement || (YongshinAgreement = {}));
export const YONGSHIN_AGREEMENT_INFO = {
    [YongshinAgreement.FULL_AGREE]: { confidence: 0.95, label: '완전 일치' },
    [YongshinAgreement.PARTIAL_AGREE]: { confidence: 0.75, label: '부분 일치' },
    [YongshinAgreement.DISAGREE]: { confidence: 0.55, label: '불일치' },
};
//# sourceMappingURL=YongshinResult.js.map