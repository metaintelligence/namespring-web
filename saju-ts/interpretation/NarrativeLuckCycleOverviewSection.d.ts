import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
type LifetimeTone = 'upward' | 'mixed' | 'defensive';
export interface LifetimeLuckSnapshot {
    readonly referenceYear: number;
    readonly totalCycles: number;
    readonly favorableCycles: number;
    readonly neutralCycles: number;
    readonly cautionCycles: number;
    readonly dominantTone: LifetimeTone;
    readonly opportunityWindows: readonly string[];
    readonly cautionWindows: readonly string[];
    readonly currentCycle: string | null;
    readonly currentCycleQuality: string | null;
}
export declare function summarizeLifetimeLuck(a: SajuAnalysis, referenceYear: number): LifetimeLuckSnapshot | null;
export declare function buildLuckCycleOverview(a: SajuAnalysis): string;
export {};
//# sourceMappingURL=NarrativeLuckCycleOverviewSection.d.ts.map