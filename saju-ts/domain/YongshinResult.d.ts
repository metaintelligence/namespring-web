import { Ohaeng } from './Ohaeng.js';
export declare enum YongshinType {
    EOKBU = "EOKBU",
    JOHU = "JOHU",
    TONGGWAN = "TONGGWAN",
    GYEOKGUK = "GYEOKGUK",
    BYEONGYAK = "BYEONGYAK",
    JEONWANG = "JEONWANG",
    HAPWHA_YONGSHIN = "HAPWHA_YONGSHIN",
    ILHAENG_YONGSHIN = "ILHAENG_YONGSHIN"
}
export declare const YONGSHIN_TYPE_INFO: Record<YongshinType, {
    koreanName: string;
}>;
export interface YongshinRecommendation {
    readonly type: YongshinType;
    readonly primaryElement: Ohaeng;
    readonly secondaryElement: Ohaeng | null;
    readonly confidence: number;
    readonly reasoning: string;
}
export declare enum YongshinAgreement {
    FULL_AGREE = "FULL_AGREE",
    PARTIAL_AGREE = "PARTIAL_AGREE",
    DISAGREE = "DISAGREE"
}
export declare const YONGSHIN_AGREEMENT_INFO: Record<YongshinAgreement, {
    confidence: number;
    label: string;
}>;
export interface YongshinResult {
    readonly recommendations: readonly YongshinRecommendation[];
    readonly finalYongshin: Ohaeng;
    readonly finalHeesin: Ohaeng | null;
    readonly gisin: Ohaeng | null;
    readonly gusin: Ohaeng | null;
    readonly agreement: YongshinAgreement;
    readonly finalConfidence: number;
}
//# sourceMappingURL=YongshinResult.d.ts.map