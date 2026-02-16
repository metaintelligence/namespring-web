import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import type { GyeokgukResult } from '../../domain/Gyeokguk.js';
import { YongshinAgreement } from '../../domain/YongshinResult.js';
import type { YongshinRecommendation } from '../../domain/YongshinResult.js';
import { YongshinPriority } from '../../config/CalculationConfig.js';
import type { CalculationConfig } from '../../config/CalculationConfig.js';
import type { HapHwaEvaluation } from '../../domain/Relations.js';
import { SipseongCategory } from './YongshinRuleCatalog.js';
export declare function categoryToOhaeng(category: SipseongCategory, dayMasterOhaeng: Ohaeng): Ohaeng;
export declare function ohaengKorean(ohaeng: Ohaeng): string;
export declare function countChartElements(pillars: PillarSet, hapHwaEvaluations?: readonly HapHwaEvaluation[]): Map<Ohaeng, number>;
export declare function assessAgreement(eokbu: YongshinRecommendation, johu: YongshinRecommendation): YongshinAgreement;
export declare function resolveFinal(eokbu: YongshinRecommendation, johu: YongshinRecommendation, priority?: YongshinPriority): Ohaeng;
export declare function resolveAll(eokbu: YongshinRecommendation, johu: YongshinRecommendation, recommendations: readonly YongshinRecommendation[], config: CalculationConfig, gyeokgukResult: GyeokgukResult | null): [Ohaeng, number];
export declare function resolveHeesin(finalYongshin: Ohaeng, eokbu: YongshinRecommendation, johu: YongshinRecommendation): Ohaeng | null;
export declare function deriveGisin(yongshin: Ohaeng): Ohaeng;
export declare function deriveGusin(gisin: Ohaeng): Ohaeng;
//# sourceMappingURL=YongshinDecisionSupport.d.ts.map