import { PillarSet } from '../../domain/PillarSet.js';
import { ShinsalGrade, ShinsalHit } from '../../domain/Shinsal.js';
import { type CalculationConfig } from '../../config/CalculationConfig.js';
declare function runDetectors(pillars: PillarSet, grade?: ShinsalGrade | null, config?: CalculationConfig): ShinsalHit[];
export declare const ShinsalDetector: {
    readonly detect: typeof runDetectors;
    readonly detectAll: (pillars: PillarSet, config?: CalculationConfig) => ShinsalHit[];
};
export {};
//# sourceMappingURL=ShinsalDetector.d.ts.map