export var TraceCategory;
(function (TraceCategory) {
    TraceCategory["TIME_ADJUSTMENT"] = "TIME_ADJUSTMENT";
    TraceCategory["YEAR_PILLAR"] = "YEAR_PILLAR";
    TraceCategory["MONTH_PILLAR"] = "MONTH_PILLAR";
    TraceCategory["DAY_PILLAR"] = "DAY_PILLAR";
    TraceCategory["HOUR_PILLAR"] = "HOUR_PILLAR";
    TraceCategory["HIDDEN_STEMS"] = "HIDDEN_STEMS";
    TraceCategory["TEN_GODS"] = "TEN_GODS";
    TraceCategory["TWELVE_STAGES"] = "TWELVE_STAGES";
    TraceCategory["RELATIONS"] = "RELATIONS";
    TraceCategory["STRENGTH"] = "STRENGTH";
    TraceCategory["YONGSHIN"] = "YONGSHIN";
    TraceCategory["GYEOKGUK"] = "GYEOKGUK";
    TraceCategory["GONGMANG"] = "GONGMANG";
    TraceCategory["SHINSAL"] = "SHINSAL";
    TraceCategory["LUCK_CYCLE"] = "LUCK_CYCLE";
})(TraceCategory || (TraceCategory = {}));
export const TRACE_CATEGORY_INFO = {
    [TraceCategory.TIME_ADJUSTMENT]: { koreanName: '시간 보정' },
    [TraceCategory.YEAR_PILLAR]: { koreanName: '년주 계산' },
    [TraceCategory.MONTH_PILLAR]: { koreanName: '월주 계산' },
    [TraceCategory.DAY_PILLAR]: { koreanName: '일주 계산' },
    [TraceCategory.HOUR_PILLAR]: { koreanName: '시주 계산' },
    [TraceCategory.HIDDEN_STEMS]: { koreanName: '지장간 분석' },
    [TraceCategory.TEN_GODS]: { koreanName: '십성 분석' },
    [TraceCategory.TWELVE_STAGES]: { koreanName: '십이운성' },
    [TraceCategory.RELATIONS]: { koreanName: '합충형파해' },
    [TraceCategory.STRENGTH]: { koreanName: '신강신약 분석' },
    [TraceCategory.YONGSHIN]: { koreanName: '용신 결정' },
    [TraceCategory.GYEOKGUK]: { koreanName: '격국 판단' },
    [TraceCategory.GONGMANG]: { koreanName: '공망 분석' },
    [TraceCategory.SHINSAL]: { koreanName: '신살 탐지' },
    [TraceCategory.LUCK_CYCLE]: { koreanName: '운세 계산' },
};
export function createTraceEntry(params) {
    const confidence = params.confidence ?? 1.0;
    if (confidence < 0.0 || confidence > 1.0) {
        throw new Error(`confidence must be in [0.0, 1.0], was ${confidence}`);
    }
    return {
        step: params.step,
        category: params.category,
        decision: params.decision,
        reasoning: params.reasoning,
        rule: params.rule,
        alternatives: params.alternatives ?? [],
        configKey: params.configKey ?? null,
        confidence,
    };
}
export class CalculationTracer {
    _entries = [];
    get entries() {
        return [...this._entries];
    }
    get size() {
        return this._entries.length;
    }
    add(entry) {
        this._entries.push(entry);
    }
    addEntry(params) {
        this.add(createTraceEntry(params));
    }
    byCategory(category) {
        return this._entries.filter(e => e.category === category);
    }
    disagreements() {
        return this._entries.filter(e => e.alternatives.length > 0);
    }
    uncertain(threshold = 0.9) {
        return this._entries.filter(e => e.confidence < threshold);
    }
    toKoreanSummary() {
        const lines = [];
        let currentCategory = null;
        for (const entry of this._entries) {
            if (entry.category !== currentCategory) {
                currentCategory = entry.category;
                lines.push('');
                lines.push(`=== ${TRACE_CATEGORY_INFO[currentCategory].koreanName} ===`);
            }
            lines.push(`  [${entry.step}] ${entry.decision}`);
            lines.push(`    근거: ${entry.reasoning}`);
            if (entry.rule) {
                lines.push(`    규칙: ${entry.rule}`);
            }
            if (entry.alternatives.length > 0) {
                lines.push('    ※ 유파별 차이:');
                for (const alt of entry.alternatives) {
                    lines.push(`      - ${alt.schoolName}: ${alt.decision} (${alt.reasoning})`);
                }
            }
            if (entry.confidence < 1.0) {
                lines.push(`    확신도: ${Math.round(entry.confidence * 100)}%`);
            }
        }
        return lines.join('\n');
    }
    merge(other) {
        for (const entry of other.entries) {
            this._entries.push(entry);
        }
    }
    clear() {
        this._entries.length = 0;
    }
}
//# sourceMappingURL=CalculationTrace.js.map