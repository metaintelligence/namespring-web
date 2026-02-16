export declare enum ClassicalSource {
    JEOKCHEONSU = "JEOKCHEONSU",
    GUNGTONGBOGAM = "GUNGTONGBOGAM",
    JAPYEONGJINJEON = "JAPYEONGJINJEON",
    SAMMYEONGTTONGHOE = "SAMMYEONGTTONGHOE",
    YEONHAEJAYPYEONG = "YEONHAEJAYPYEONG",
    MYEONGLIJEONGJON = "MYEONGLIJEONGJON",
    KOREAN_MODERN_PRACTICE = "KOREAN_MODERN_PRACTICE"
}
export interface ClassicalSourceInfo {
    readonly koreanName: string;
    readonly hanja: string;
    readonly shortLabel: string;
    readonly era: string;
    readonly description: string;
}
export declare const CLASSICAL_SOURCE_INFO: Record<ClassicalSource, ClassicalSourceInfo>;
export declare function inlineCitation(source: ClassicalSource): string;
//# sourceMappingURL=ClassicalSource.d.ts.map