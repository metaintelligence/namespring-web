import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import type { GyeokgukResult } from '../../domain/Gyeokguk.js';
import type { YongshinRecommendation } from '../../domain/YongshinResult.js';
import type { CalculationConfig } from '../../config/CalculationConfig.js';
import type { HapHwaEvaluation } from '../../domain/Relations.js';
export declare function eokbuYongshin(dayMasterOhaeng: Ohaeng, isStrong: boolean): YongshinRecommendation;
export declare function johuYongshin(dayMaster: Cheongan, monthBranch: Jiji): YongshinRecommendation;
export declare function tongwanYongshin(pillars: PillarSet, dayMasterOhaeng: Ohaeng, hapHwaEvaluations?: readonly HapHwaEvaluation[]): YongshinRecommendation | null;
export declare function jeonwangYongshin(_pillars: PillarSet, dayMasterOhaeng: Ohaeng, gyeokgukResult: GyeokgukResult, config: CalculationConfig): YongshinRecommendation | null;
export declare function gyeokgukYongshin(dayMasterOhaeng: Ohaeng, gyeokgukResult: GyeokgukResult): YongshinRecommendation | null;
export declare function byeongyakYongshin(pillars: PillarSet, dayMasterOhaeng: Ohaeng, isStrong: boolean, hapHwaEvaluations?: readonly HapHwaEvaluation[]): YongshinRecommendation | null;
export declare function hapwhaYongshin(gyeokgukResult: GyeokgukResult, hapHwaEvaluations: readonly HapHwaEvaluation[]): YongshinRecommendation | null;
export declare function ilhaengYongshin(_pillars: PillarSet, gyeokgukResult: GyeokgukResult): YongshinRecommendation | null;
//# sourceMappingURL=YongshinDeciderStrategies.d.ts.map