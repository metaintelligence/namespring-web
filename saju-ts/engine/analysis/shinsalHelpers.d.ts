import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Pillar } from '../../domain/Pillar.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { ShinsalHit, ShinsalType } from '../../domain/Shinsal.js';
import { ShinsalReferenceBranch } from '../../config/CalculationConfig.js';
import { type SamhapGroup, type StemOrBranch } from './ShinsalCatalog.js';
export type IndexedPillar = [PillarPosition, Pillar];
export declare function indexedPillars(ps: PillarSet): IndexedPillar[];
export declare function hangul(c: Cheongan): string;
export declare function branchHangul(j: Jiji): string;
export declare function koreanName(type: ShinsalType): string;
export declare function detectByStemTable(pillars: PillarSet, hits: ShinsalHit[], type: ShinsalType, table: ReadonlyMap<Cheongan, Jiji>): void;
export declare function detectSamhapShinsal(pillars: PillarSet, hits: ShinsalHit[], type: ShinsalType, targetExtractor: (g: SamhapGroup) => Jiji, refBranch?: ShinsalReferenceBranch): void;
export declare function detectByMonthMixed(pillars: PillarSet, hits: ShinsalHit[], type: ShinsalType, table: ReadonlyMap<Jiji, StemOrBranch>): void;
export declare function detectByYearBranchOffset(pillars: PillarSet, hits: ShinsalHit[], type: ShinsalType, offset: number): void;
export declare function detectBidirectionalPairs(pillars: PillarSet, hits: ShinsalHit[], type: ShinsalType, pairs: readonly [Jiji, Jiji][], notePrefix: string): void;
//# sourceMappingURL=shinsalHelpers.d.ts.map