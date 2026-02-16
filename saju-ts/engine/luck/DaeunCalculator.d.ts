import { Cheongan } from '../../domain/Cheongan.js';
import { DaeunInfo } from '../../domain/DaeunInfo.js';
import { Gender } from '../../domain/Gender.js';
import { Pillar } from '../../domain/Pillar.js';
import { PillarSet } from '../../domain/PillarSet.js';
export declare function isForward(yearStem: Cheongan, gender: Gender): boolean;
export declare function sexagenaryIndex(pillar: Pillar): number;
export declare function calculate(pillars: PillarSet, gender: Gender, birthYear: number, birthMonth: number, birthDay: number, birthHour?: number, birthMinute?: number, daeunCount?: number): DaeunInfo;
export declare function calculateWithStartAge(pillars: PillarSet, gender: Gender, firstDaeunStartAge: number, daeunCount?: number): DaeunInfo;
export declare function calculateStartAge(birthYear: number, birthMonth: number, birthDay: number, birthHour: number, birthMinute: number, isForward: boolean): number;
export declare const DaeunCalculator: {
    readonly isForward: typeof isForward;
    readonly sexagenaryIndex: typeof sexagenaryIndex;
    readonly calculate: typeof calculate;
    readonly calculateWithStartAge: typeof calculateWithStartAge;
    readonly calculateStartAge: typeof calculateStartAge;
};
//# sourceMappingURL=DaeunCalculator.d.ts.map