export interface TraceEntry {
    readonly step: string;
    readonly category: TraceCategory;
    readonly decision: string;
    readonly reasoning: string;
    readonly rule: string;
    readonly alternatives: readonly AlternativeDecision[];
    readonly configKey: string | null;
    readonly confidence: number;
}
export interface AlternativeDecision {
    readonly schoolName: string;
    readonly decision: string;
    readonly reasoning: string;
}
export declare enum TraceCategory {
    TIME_ADJUSTMENT = "TIME_ADJUSTMENT",
    YEAR_PILLAR = "YEAR_PILLAR",
    MONTH_PILLAR = "MONTH_PILLAR",
    DAY_PILLAR = "DAY_PILLAR",
    HOUR_PILLAR = "HOUR_PILLAR",
    HIDDEN_STEMS = "HIDDEN_STEMS",
    TEN_GODS = "TEN_GODS",
    TWELVE_STAGES = "TWELVE_STAGES",
    RELATIONS = "RELATIONS",
    STRENGTH = "STRENGTH",
    YONGSHIN = "YONGSHIN",
    GYEOKGUK = "GYEOKGUK",
    GONGMANG = "GONGMANG",
    SHINSAL = "SHINSAL",
    LUCK_CYCLE = "LUCK_CYCLE"
}
export declare const TRACE_CATEGORY_INFO: Record<TraceCategory, {
    koreanName: string;
}>;
export declare function createTraceEntry(params: {
    step: string;
    category: TraceCategory;
    decision: string;
    reasoning: string;
    rule: string;
    alternatives?: readonly AlternativeDecision[];
    configKey?: string | null;
    confidence?: number;
}): TraceEntry;
export declare class CalculationTracer {
    private readonly _entries;
    get entries(): readonly TraceEntry[];
    get size(): number;
    add(entry: TraceEntry): void;
    addEntry(params: {
        step: string;
        category: TraceCategory;
        decision: string;
        reasoning: string;
        rule: string;
        alternatives?: readonly AlternativeDecision[];
        configKey?: string | null;
        confidence?: number;
    }): void;
    byCategory(category: TraceCategory): readonly TraceEntry[];
    disagreements(): readonly TraceEntry[];
    uncertain(threshold?: number): readonly TraceEntry[];
    toKoreanSummary(): string;
    merge(other: CalculationTracer): void;
    clear(): void;
}
//# sourceMappingURL=CalculationTrace.d.ts.map