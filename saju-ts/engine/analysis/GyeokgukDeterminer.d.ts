import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { GyeokgukResult } from '../../domain/Gyeokguk.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { StrengthResult } from '../../domain/StrengthResult.js';
import { Sipseong } from '../../domain/Sipseong.js';
import { HapHwaEvaluation } from '../../domain/Relations.js';
import { CalculationConfig } from '../../config/CalculationConfig.js';
export declare const GyeokgukDeterminer: {
    readonly determine: (pillars: PillarSet, strengthResult?: StrengthResult | null, hapHwaEvaluations?: readonly HapHwaEvaluation[], config?: CalculationConfig) => GyeokgukResult;
    readonly monthBranchSipseong: (dayMaster: Cheongan, monthBranch: Jiji) => Sipseong;
};
export declare const determineGyeokguk: (pillars: PillarSet, strengthResult?: StrengthResult | null, hapHwaEvaluations?: readonly HapHwaEvaluation[], config?: CalculationConfig) => GyeokgukResult;
export declare const monthBranchSipseong: (dayMaster: Cheongan, monthBranch: Jiji) => Sipseong;
//# sourceMappingURL=GyeokgukDeterminer.d.ts.map