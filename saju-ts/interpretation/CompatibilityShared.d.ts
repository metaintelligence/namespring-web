import { Cheongan } from '../domain/Cheongan.js';
import { Gender } from '../domain/Gender.js';
import { Jiji } from '../domain/Jiji.js';
import { Ohaeng } from '../domain/Ohaeng.js';
import { type PillarSet } from '../domain/PillarSet.js';
import { Sipseong } from '../domain/Sipseong.js';
export declare function stemKr(c: Cheongan): string;
export declare function branchKr(j: Jiji): string;
export declare function ohaengKr(oh: Ohaeng): string;
export declare function computeSipseong(dayMaster: Cheongan, targetStem: Cheongan): Sipseong;
export declare function countOhaeng(ps: PillarSet): Map<Ohaeng, number>;
export declare function sipseongPartnerMeaning(ss: Sipseong, myGender: Gender): string;
export declare function sipseongRelScore(ss: Sipseong): number;
//# sourceMappingURL=CompatibilityShared.d.ts.map