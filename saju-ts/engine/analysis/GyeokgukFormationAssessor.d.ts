import { GyeokgukFormation, GyeokgukResult } from '../../domain/Gyeokguk.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { StrengthResult } from '../../domain/StrengthResult.js';
export declare const GyeokgukFormationAssessor: {
    readonly assess: (gyeokguk: GyeokgukResult, pillars: PillarSet, strength: StrengthResult) => GyeokgukFormation;
};
export declare const assessGyeokgukFormation: (gyeokguk: GyeokgukResult, pillars: PillarSet, strength: StrengthResult) => GyeokgukFormation;
//# sourceMappingURL=GyeokgukFormationAssessor.d.ts.map