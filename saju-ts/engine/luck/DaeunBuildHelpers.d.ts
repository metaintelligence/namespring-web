import { DaeunBoundaryMode, DaeunInfo } from '../../domain/DaeunInfo.js';
import { Pillar } from '../../domain/Pillar.js';
export declare function mod(a: number, n: number): number;
export declare function toTotalDaeunMonths(totalMinutes: number): number;
export declare function buildDaeunInfo(monthPillar: Pillar, isForward: boolean, firstDaeunStartAge: number, daeunCount: number, sexagenaryIndex: (pillar: Pillar) => number, boundaryMode?: DaeunBoundaryMode, warnings?: readonly string[], firstDaeunStartMonths?: number): DaeunInfo;
//# sourceMappingURL=DaeunBuildHelpers.d.ts.map