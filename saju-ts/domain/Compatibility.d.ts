import { Cheongan } from './Cheongan.js';
import { Jiji } from './Jiji.js';
import { Sipseong } from './Sipseong.js';
export declare enum CompatibilityGrade {
    EXCELLENT = "EXCELLENT",
    GOOD = "GOOD",
    AVERAGE = "AVERAGE",
    BELOW_AVERAGE = "BELOW_AVERAGE",
    POOR = "POOR"
}
export declare const COMPATIBILITY_GRADE_INFO: Record<CompatibilityGrade, {
    koreanName: string;
    stars: string;
}>;
export interface DayMasterCompatibility {
    readonly stem1: Cheongan;
    readonly stem2: Cheongan;
    readonly relationType: string;
    readonly score: number;
    readonly interpretation: string;
}
export interface DayBranchCompatibility {
    readonly branch1: Jiji;
    readonly branch2: Jiji;
    readonly relationType: string;
    readonly score: number;
    readonly interpretation: string;
}
export interface OhaengComplementResult {
    readonly score: number;
    readonly combinedCompleteness: number;
    readonly details: readonly string[];
}
export interface SipseongCrossResult {
    readonly person2ToPerson1: Sipseong;
    readonly person1ToPerson2: Sipseong;
    readonly interpretation2to1: string;
    readonly interpretation1to2: string;
    readonly score: number;
}
export interface ShinsalMatchResult {
    readonly score: number;
    readonly details: readonly string[];
}
export interface CompatibilityResult {
    readonly totalScore: number;
    readonly grade: CompatibilityGrade;
    readonly dayMaster: DayMasterCompatibility;
    readonly dayBranch: DayBranchCompatibility;
    readonly ohaengComplement: OhaengComplementResult;
    readonly sipseongCross: SipseongCrossResult;
    readonly shinsalMatch: ShinsalMatchResult;
}
//# sourceMappingURL=Compatibility.d.ts.map