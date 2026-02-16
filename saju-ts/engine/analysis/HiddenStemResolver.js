import { HiddenStemDayAllocation, HiddenStemTable, HiddenStemVariant, } from '../../domain/HiddenStem.js';
const DEFAULT_HIDDEN_STEM_VARIANT = HiddenStemVariant.STANDARD;
const DEFAULT_HIDDEN_STEM_ALLOCATION = HiddenStemDayAllocation.YEONHAE_JAPYEONG;
export class DefaultHiddenStemResolver {
    resolve(branch, variant = DEFAULT_HIDDEN_STEM_VARIANT, allocation = DEFAULT_HIDDEN_STEM_ALLOCATION) {
        return HiddenStemTable.getHiddenStems(branch, variant, allocation);
    }
    principalStem(branch, variant = DEFAULT_HIDDEN_STEM_VARIANT, allocation = DEFAULT_HIDDEN_STEM_ALLOCATION) {
        return HiddenStemTable.getPrincipalStem(branch, variant, allocation);
    }
}
//# sourceMappingURL=HiddenStemResolver.js.map