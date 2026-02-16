import { Cheongan } from '../../domain/Cheongan.js';
import { Pillar } from '../../domain/Pillar.js';
import { CalculationConfig } from '../../config/CalculationConfig.js';
import { CalculationTracer } from './CalculationTrace.js';
export declare const TraceAwarePillarCalculator: {
    readonly traceYearPillar: (year: number, month: number, day: number, hour: number, minute: number, tracer: CalculationTracer) => Pillar;
    readonly traceMonthPillar: (yearStem: Cheongan, year: number, month: number, day: number, hour: number, minute: number, tracer: CalculationTracer) => Pillar;
    readonly traceDayPillar: (year: number, month: number, day: number, hour: number, config: CalculationConfig, tracer: CalculationTracer) => Pillar;
    readonly traceHourPillar: (dayStem: Cheongan, hour: number, tracer: CalculationTracer) => Pillar;
    readonly traceTimeAdjustment: (originalHour: number, adjustedHour: number, dstMinutes: number, lmtMinutes: number, eotMinutes: number, tracer: CalculationTracer) => void;
};
export declare const traceYearPillar: (year: number, month: number, day: number, hour: number, minute: number, tracer: CalculationTracer) => Pillar;
export declare const traceMonthPillar: (yearStem: Cheongan, year: number, month: number, day: number, hour: number, minute: number, tracer: CalculationTracer) => Pillar;
export declare const traceDayPillar: (year: number, month: number, day: number, hour: number, config: CalculationConfig, tracer: CalculationTracer) => Pillar;
export declare const traceHourPillar: (dayStem: Cheongan, hour: number, tracer: CalculationTracer) => Pillar;
export declare const traceTimeAdjustment: (originalHour: number, adjustedHour: number, dstMinutes: number, lmtMinutes: number, eotMinutes: number, tracer: CalculationTracer) => void;
//# sourceMappingURL=TraceAwarePillarCalculator.d.ts.map