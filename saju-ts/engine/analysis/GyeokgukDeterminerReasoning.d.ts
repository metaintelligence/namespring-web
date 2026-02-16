import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { GyeokgukType } from '../../domain/Gyeokguk.js';
import { HiddenStemRole } from '../../domain/HiddenStem.js';
import { Sipseong } from '../../domain/Sipseong.js';
export declare function buildTouchulReasoning(dayMaster: Cheongan, monthBranch: Jiji, revealedStem: Cheongan, role: HiddenStemRole, sipseong: Sipseong, type: GyeokgukType): string;
export declare function buildNaegyeokReasoning(dayMaster: Cheongan, monthBranch: Jiji, sipseong: Sipseong, type: GyeokgukType): string;
//# sourceMappingURL=GyeokgukDeterminerReasoning.d.ts.map