export type Element = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';
export type YinYang = 'YANG' | 'YIN';
export type StemIdx = number;
export type BranchIdx = number;
export interface PillarIdx {
    stem: StemIdx;
    branch: BranchIdx;
}
export declare const STEM_HANJA: readonly ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
export declare const BRANCH_HANJA: readonly ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
export declare function stemHanja(idx: StemIdx): string;
export declare function branchHanja(idx: BranchIdx): string;
export declare function stemElement(idx: StemIdx): Element;
export declare function branchElement(idx: BranchIdx): Element;
export declare function stemYinYang(idx: StemIdx): YinYang;
export declare function branchYinYang(idx: BranchIdx): YinYang;
export declare function pillar(stem: StemIdx, branch: BranchIdx): PillarIdx;
export declare function ganzhiFromIndex(idx: number): PillarIdx;
/**
 * Inverse of `ganzhiFromIndex` for valid 60갑자 pairs.
 *
 * Returns null if (stem, branch) is not a valid sexagenary pair.
 *
 * Math:
 *   i ≡ stem (mod 10)
 *   i ≡ branch (mod 12)
 * gcd(10,12)=2 ⇒ solution exists iff stem≡branch (mod 2)
 */
export declare function ganzhiIndex(p: PillarIdx): number | null;
export declare function stemIdxFromHanja(hanja: string): StemIdx | null;
export declare function branchIdxFromHanja(hanja: string): BranchIdx | null;
