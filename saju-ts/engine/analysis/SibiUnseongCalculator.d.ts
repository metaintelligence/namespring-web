import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { SibiUnseong } from '../../domain/SibiUnseong.js';
import { type CalculationConfig } from '../../config/CalculationConfig.js';
export declare function calculateSibiUnseong(stem: Cheongan, branch: Jiji, config?: CalculationConfig): SibiUnseong;
export declare function analyzeAllPillars(dayMaster: Cheongan, pillars: PillarSet, config?: CalculationConfig): Map<PillarPosition, SibiUnseong>;
//# sourceMappingURL=SibiUnseongCalculator.d.ts.map