import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { type HiddenStemEntry, HiddenStemDayAllocation, HiddenStemRole, HiddenStemVariant } from '../../domain/HiddenStem.js';
export interface SaryeongPhase {
    readonly stem: Cheongan;
    readonly role: HiddenStemRole;
    readonly startDay: number;
    readonly endDay: number;
    readonly isActive: boolean;
}
export interface SaryeongResult {
    readonly branch: Jiji;
    readonly dayInMonth: number;
    readonly commandingStem: Cheongan;
    readonly commandingRole: HiddenStemRole;
    readonly commandingEntry: HiddenStemEntry;
    readonly allStems: readonly SaryeongPhase[];
    readonly reasoning: string;
}
export declare const SaryeongDeterminer: {
    readonly determine: (branch: Jiji, dayInMonth: number, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation) => SaryeongResult;
    readonly phases: (branch: Jiji, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation) => readonly SaryeongPhase[];
    readonly commandingStem: (branch: Jiji, dayInMonth: number, variant?: HiddenStemVariant, allocation?: HiddenStemDayAllocation) => Cheongan;
};
//# sourceMappingURL=SaryeongDeterminer.d.ts.map