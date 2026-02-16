export declare enum SibiUnseong {
    JANG_SAENG = "JANG_SAENG",
    MOK_YOK = "MOK_YOK",
    GWAN_DAE = "GWAN_DAE",
    GEON_ROK = "GEON_ROK",
    JE_WANG = "JE_WANG",
    SWOE = "SWOE",
    BYEONG = "BYEONG",
    SA = "SA",
    MYO = "MYO",
    JEOL = "JEOL",
    TAE = "TAE",
    YANG = "YANG"
}
export interface SibiUnseongInfo {
    readonly koreanName: string;
    readonly hanja: string;
    readonly stage: number;
}
export declare const SIBI_UNSEONG_INFO: Record<SibiUnseong, SibiUnseongInfo>;
export declare const SIBI_UNSEONG_VALUES: readonly SibiUnseong[];
//# sourceMappingURL=SibiUnseong.d.ts.map