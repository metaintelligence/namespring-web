import type { BranchIdx } from './cycle.js';
export type RelationType = 'YUKHAP' | 'CHUNG' | 'HYEONG' | 'JA_HYEONG' | 'SAMHYEONG' | 'HAE' | 'PA' | 'WONJIN' | 'SAMHAP' | 'BANGHAP';
export interface DetectedRelation {
    type: RelationType;
    members: BranchIdx[];
}
export declare function chungPartner(i: BranchIdx): BranchIdx;
export declare function yukhapPartner(i: BranchIdx): BranchIdx;
export declare function haePartner(i: BranchIdx): BranchIdx;
export declare function paPartner(i: BranchIdx): BranchIdx;
export declare function wonjinPartner(i: BranchIdx): BranchIdx;
export declare function samhapGroup(i: BranchIdx): BranchIdx[];
export declare function banghapGroup(i: BranchIdx): BranchIdx[];
export declare function detectBranchRelations(branches: BranchIdx[]): DetectedRelation[];
