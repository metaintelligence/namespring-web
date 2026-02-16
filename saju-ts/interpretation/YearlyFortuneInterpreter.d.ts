import { Sipseong } from '../domain/Sipseong.js';
import { LuckQuality } from '../domain/LuckInteraction.js';
import type { LuckPillarAnalysis } from '../domain/LuckInteraction.js';
import type { Pillar } from '../domain/Pillar.js';
import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
export interface MonthlyHighlight {
    readonly monthLabel: string;
    readonly sajuMonthIndex: number;
    readonly pillar: Pillar;
    readonly quality: LuckQuality;
    readonly highlight: string;
}
export interface YearlyFortune {
    readonly targetYear: number;
    readonly saeunPillar: Pillar;
    readonly quality: LuckQuality;
    readonly sipseong: Sipseong;
    readonly overview: string;
    readonly wealthForecast: string;
    readonly careerForecast: string;
    readonly healthForecast: string;
    readonly loveForecast: string;
    readonly monthlyHighlights: readonly MonthlyHighlight[];
    readonly bestMonths: readonly string[];
    readonly cautionMonths: readonly string[];
}
export declare function yearlyFortuneToNarrative(fortune: YearlyFortune): string;
export declare function buildYearlyFortune(analysis: SajuAnalysis, targetYear: number, saeunPillar: Pillar, lpa: LuckPillarAnalysis, monthlyAnalyses: ReadonlyArray<{
    sajuMonthIndex: number;
    pillar: Pillar;
    analysis: LuckPillarAnalysis;
}>): YearlyFortune;
//# sourceMappingURL=YearlyFortuneInterpreter.d.ts.map