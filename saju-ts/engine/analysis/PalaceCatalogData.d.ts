import { Gender } from '../../domain/Gender.js';
import { FamilyRelation, PalaceInfo, PalaceInterpretation } from '../../domain/Palace.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { Sipseong } from '../../domain/Sipseong.js';
export declare function palaceInfo(position: PillarPosition): PalaceInfo;
export declare function familyRelation(sipseong: Sipseong, gender: Gender): FamilyRelation;
export declare function familyMember(sipseong: Sipseong, gender: Gender): string;
export declare function interpretation(sipseong: Sipseong, position: PillarPosition): PalaceInterpretation | null;
//# sourceMappingURL=PalaceCatalogData.d.ts.map