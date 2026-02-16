import { Cheongan } from '../domain/Cheongan.js';
import { Pillar } from '../domain/Pillar.js';
export declare function fromSexagenaryIndex(sexagenaryIndex: number): Pillar;
export declare function dayPillarByJdn(year: number, month: number, day: number): Pillar;
export declare function yearPillarApprox(year: number): Pillar;
export declare function yearPillarByIpchunApprox(year: number, month: number, day: number): Pillar;
export declare function monthPillarApprox(yearStem: Cheongan, solarMonth: number): Pillar;
export declare function monthPillarBySajuMonthIndex(yearStem: Cheongan, monthIndex: number): Pillar;
export declare function monthPillarByJeolApprox(yearStem: Cheongan, year: number, month: number, day: number): Pillar;
export declare function sajuMonthIndexByJeolApprox(year: number, month: number, day: number): number;
export declare function hourPillar(dayStem: Cheongan, hour24: number): Pillar;
export declare const GanjiCycle: {
    readonly fromSexagenaryIndex: typeof fromSexagenaryIndex;
    readonly dayPillarByJdn: typeof dayPillarByJdn;
    readonly yearPillarApprox: typeof yearPillarApprox;
    readonly yearPillarByIpchunApprox: typeof yearPillarByIpchunApprox;
    readonly monthPillarApprox: typeof monthPillarApprox;
    readonly monthPillarBySajuMonthIndex: typeof monthPillarBySajuMonthIndex;
    readonly monthPillarByJeolApprox: typeof monthPillarByJeolApprox;
    readonly sajuMonthIndexByJeolApprox: typeof sajuMonthIndexByJeolApprox;
    readonly hourPillar: typeof hourPillar;
};
//# sourceMappingURL=GanjiCycle.d.ts.map