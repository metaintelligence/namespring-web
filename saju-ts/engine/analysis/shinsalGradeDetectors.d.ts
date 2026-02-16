import { PillarSet } from '../../domain/PillarSet.js';
import { ShinsalGrade, ShinsalHit } from '../../domain/Shinsal.js';
import { GwiiinTableVariant, ShinsalReferenceBranch } from '../../config/CalculationConfig.js';
export type DetectorFn = (pillars: PillarSet, hits: ShinsalHit[]) => void;
export declare function detectorsForGrade(grade: ShinsalGrade, gwiiinVariant: GwiiinTableVariant, refBranch: ShinsalReferenceBranch): DetectorFn[];
export declare function detectorsForScope(grade: ShinsalGrade | null, gwiiinVariant: GwiiinTableVariant, refBranch: ShinsalReferenceBranch): DetectorFn[];
//# sourceMappingURL=shinsalGradeDetectors.d.ts.map