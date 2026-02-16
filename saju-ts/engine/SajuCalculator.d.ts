import { PillarSet } from '../domain/PillarSet.js';
import { BirthInput } from '../domain/types.js';
import { type SolarTimeAdjustment } from '../calendar/time/SolarTimeAdjuster.js';
import { CalculationConfig } from '../config/CalculationConfig.js';
export interface SajuPillarResult extends SolarTimeAdjustment {
    readonly input: BirthInput;
    readonly pillars: PillarSet;
}
export declare function calculatePillars(input: BirthInput, config?: CalculationConfig): SajuPillarResult;
//# sourceMappingURL=SajuCalculator.d.ts.map