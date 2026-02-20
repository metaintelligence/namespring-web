import type { BranchView, HiddenStemTenGodView, HiddenStemView, PillarView, StemRelationView, StemView, TenGod } from './types.js';
import type { BranchIdx, PillarIdx, StemIdx } from '../core/cycle.js';
import type { HiddenStemRole } from '../core/hiddenStems.js';
import type { StemRelation } from '../core/stemRelations.js';
export declare function toStemView(idx: StemIdx): StemView;
export declare function toBranchView(idx: BranchIdx): BranchView;
export declare function toPillarView(pillar: PillarIdx): PillarView;
export declare function toHiddenStemView(h: {
    stem: StemIdx;
    role: HiddenStemRole;
    weight: number;
}): HiddenStemView;
export declare function toHiddenStemTenGodView(h: {
    stem: StemIdx;
    role: HiddenStemRole;
    weight: number;
    tenGod: TenGod;
}): HiddenStemTenGodView;
export declare function toStemRelationView(rel: StemRelation): StemRelationView;
