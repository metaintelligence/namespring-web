import { Sipseong } from '../domain/Sipseong.js';
import { SibiUnseong } from '../domain/SibiUnseong.js';
import { Gender } from '../domain/Gender.js';
import type { DaeunPillar } from '../domain/DaeunInfo.js';
import type { Pillar } from '../domain/Pillar.js';
export declare function monthLabel(sajuMonthIndex: number): string;
export declare function buildOverview(year: number, sipseong: Sipseong, isYongshinElement: boolean, isGisinElement: boolean, currentDaeun: DaeunPillar | null): string;
export declare function buildWealthForecast(sipseong: Sipseong, isStrong: boolean): string;
export declare function buildCareerForecast(sipseong: Sipseong): string;
export declare function buildHealthForecast(saeunPillar: Pillar, sibiUnseong: SibiUnseong): string;
export declare function buildLoveForecast(sipseong: Sipseong, gender: Gender): string;
//# sourceMappingURL=YearlyFortuneNarrativeBuilders.d.ts.map