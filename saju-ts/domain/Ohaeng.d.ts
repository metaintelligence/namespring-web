export declare enum Ohaeng {
    WOOD = "WOOD",
    FIRE = "FIRE",
    EARTH = "EARTH",
    METAL = "METAL",
    WATER = "WATER"
}
export declare const OHAENG_VALUES: readonly Ohaeng[];
export declare const OHAENG_KOREAN_LABELS: Readonly<Record<Ohaeng, string>>;
export declare function ohaengKoreanLabel(ohaeng: Ohaeng): string;
export declare function ohaengOrdinal(o: Ohaeng): number;
export declare enum OhaengRelation {
    SANGSAENG = "SANGSAENG",
    SANGGEUK = "SANGGEUK",
    BIHWA = "BIHWA",
    YEOKSAENG = "YEOKSAENG",
    YEOKGEUK = "YEOKGEUK"
}
export declare const OhaengRelations: {
    readonly relation: (from: Ohaeng, to: Ohaeng) => OhaengRelation;
    readonly generates: (element: Ohaeng) => Ohaeng;
    readonly generatedBy: (element: Ohaeng) => Ohaeng;
    readonly controls: (element: Ohaeng) => Ohaeng;
    readonly controlledBy: (element: Ohaeng) => Ohaeng;
    readonly isSangsaeng: (a: Ohaeng, b: Ohaeng) => boolean;
    readonly isSanggeuk: (a: Ohaeng, b: Ohaeng) => boolean;
};
//# sourceMappingURL=Ohaeng.d.ts.map