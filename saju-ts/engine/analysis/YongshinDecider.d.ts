import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import type { GyeokgukResult } from '../../domain/Gyeokguk.js';
import type { YongshinResult } from '../../domain/YongshinResult.js';
import type { CalculationConfig } from '../../config/CalculationConfig.js';
import type { HapHwaEvaluation } from '../../domain/Relations.js';
import { byeongyakYongshin, eokbuYongshin, gyeokgukYongshin, hapwhaYongshin, ilhaengYongshin, jeonwangYongshin, johuYongshin, tongwanYongshin } from './YongshinDeciderStrategies.js';
export declare function decide(pillars: PillarSet, isStrong: boolean, dayMasterOhaeng: Ohaeng, config?: CalculationConfig, gyeokgukResult?: GyeokgukResult | null, hapHwaEvaluations?: readonly HapHwaEvaluation[]): YongshinResult;
export declare const YongshinDecider: {
    readonly eokbuYongshin: typeof eokbuYongshin;
    readonly johuYongshin: typeof johuYongshin;
    readonly tongwanYongshin: typeof tongwanYongshin;
    readonly jeonwangYongshin: typeof jeonwangYongshin;
    readonly gyeokgukYongshin: typeof gyeokgukYongshin;
    readonly byeongyakYongshin: typeof byeongyakYongshin;
    readonly hapwhaYongshin: typeof hapwhaYongshin;
    readonly ilhaengYongshin: typeof ilhaengYongshin;
    readonly decide: typeof decide;
};
//# sourceMappingURL=YongshinDecider.d.ts.map