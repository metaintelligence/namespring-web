export declare enum Sipseong {
    BI_GYEON = "BI_GYEON",
    GYEOB_JAE = "GYEOB_JAE",
    SIK_SIN = "SIK_SIN",
    SANG_GWAN = "SANG_GWAN",
    PYEON_JAE = "PYEON_JAE",
    JEONG_JAE = "JEONG_JAE",
    PYEON_GWAN = "PYEON_GWAN",
    JEONG_GWAN = "JEONG_GWAN",
    PYEON_IN = "PYEON_IN",
    JEONG_IN = "JEONG_IN"
}
export interface SipseongInfo {
    readonly koreanName: string;
    readonly hanja: string;
}
export declare const SIPSEONG_INFO: Record<Sipseong, SipseongInfo>;
export declare const SIPSEONG_VALUES: readonly Sipseong[];
//# sourceMappingURL=Sipseong.d.ts.map