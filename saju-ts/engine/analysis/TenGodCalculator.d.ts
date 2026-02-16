import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { HiddenStemVariant } from '../../domain/HiddenStem.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { Sipseong } from '../../domain/Sipseong.js';
import type { TenGodAnalysis } from '../../domain/TenGodAnalysis.js';
export declare const TenGodCalculator: {
    readonly calculate: (dayMaster: Cheongan, target: Cheongan) => Sipseong;
    readonly calculateForBranch: (dayMaster: Cheongan, branch: Jiji, variant?: HiddenStemVariant) => Sipseong;
    readonly analyzePillars: (dayMaster: Cheongan, pillars: PillarSet, variant?: HiddenStemVariant) => TenGodAnalysis;
};
export declare const calculateTenGod: (dayMaster: Cheongan, target: Cheongan) => Sipseong;
export declare const calculateTenGodForBranch: (dayMaster: Cheongan, branch: Jiji, variant?: HiddenStemVariant) => Sipseong;
export declare const analyzeTenGodPillars: (dayMaster: Cheongan, pillars: PillarSet, variant?: HiddenStemVariant) => TenGodAnalysis;
//# sourceMappingURL=TenGodCalculator.d.ts.map