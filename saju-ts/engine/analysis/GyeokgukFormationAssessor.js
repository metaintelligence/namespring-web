import { GyeokgukCategory, } from '../../domain/Gyeokguk.js';
import { buildProfile } from './GyeokgukFormationProfile.js';
import { assessOegyeok } from './GyeokgukFormationOegyeokAssessors.js';
import { assessNaegyeok } from './GyeokgukFormationNaegyeokAssessors.js';
export const GyeokgukFormationAssessor = {
    assess(gyeokguk, pillars, strength) {
        const profile = buildProfile(pillars, strength);
        if (gyeokguk.category !== GyeokgukCategory.NAEGYEOK) {
            return assessOegyeok(gyeokguk, profile);
        }
        return assessNaegyeok(gyeokguk.type, profile);
    },
};
export const assessGyeokgukFormation = GyeokgukFormationAssessor.assess;
//# sourceMappingURL=GyeokgukFormationAssessor.js.map