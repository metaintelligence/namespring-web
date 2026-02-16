import { type SajuAnalysis } from '../domain/SajuAnalysis.js';
import type { YearlyFortune } from './YearlyFortuneInterpreter.js';
export interface PopularFortuneScope {
    readonly yearQualityLabel: string | null;
    readonly monthQualityLabel: string | null;
    readonly dayQualityLabel: string | null;
}
export declare function buildPopularFortuneHighlights(analysis: SajuAnalysis, yearlyFortune: YearlyFortune | null, scope: PopularFortuneScope): string[];
//# sourceMappingURL=NarrativePopularFortuneSection.d.ts.map