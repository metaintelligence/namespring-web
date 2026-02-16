import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { type HiddenStemEntry, HiddenStemDayAllocation, HiddenStemVariant } from '../../domain/HiddenStem.js';
export interface HiddenStemResolver {
    resolve(branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation): readonly HiddenStemEntry[];
    principalStem(branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation): Cheongan;
}
export declare class DefaultHiddenStemResolver implements HiddenStemResolver {
    resolve(branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation): readonly HiddenStemEntry[];
    principalStem(branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation): Cheongan;
}
//# sourceMappingURL=HiddenStemResolver.d.ts.map