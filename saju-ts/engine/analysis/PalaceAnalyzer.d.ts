import { Cheongan } from '../../domain/Cheongan.js';
import { Gender } from '../../domain/Gender.js';
import { FamilyRelation, PalaceAnalysis, PalaceInfo, PalaceInterpretation } from '../../domain/Palace.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { Sipseong } from '../../domain/Sipseong.js';
export declare const PalaceAnalyzer: {
    readonly palaceInfo: (position: PillarPosition) => PalaceInfo;
    readonly familyRelation: (sipseong: Sipseong, gender: Gender) => FamilyRelation;
    readonly familyMember: (sipseong: Sipseong, gender: Gender) => string;
    readonly interpret: (sipseong: Sipseong, position: PillarPosition) => PalaceInterpretation | null;
    readonly analyze: (pillars: PillarSet, dayMaster: Cheongan, gender: Gender) => Record<PillarPosition, PalaceAnalysis>;
};
//# sourceMappingURL=PalaceAnalyzer.d.ts.map