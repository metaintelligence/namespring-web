import { Cheongan } from '../domain/Cheongan.js';
import { type DaeunInfo, type DaeunPillar } from '../domain/DaeunInfo.js';
import { type DaeunAnalysis, type LuckPillarAnalysis, LuckQuality } from '../domain/LuckInteraction.js';
import { Ohaeng } from '../domain/Ohaeng.js';
import { type Pillar } from '../domain/Pillar.js';
import { type SaeunPillar } from '../domain/SaeunInfo.js';
import { SIPSEONG_UN_THEMES, UNSEONG_ENERGY_THEMES, type SipseongUnTheme, type UnseongEnergyTheme } from './LuckNarrativeThemes.js';
import { buildCombinedInterpretation, buildPracticalGuidance, buildRelationImpacts, buildTransitionWarning, buildWhySummary, buildYongshinExplanation } from './LuckNarrativeBuilderHelpers.js';
export { SIPSEONG_UN_THEMES, UNSEONG_ENERGY_THEMES, };
export type { SipseongUnTheme, UnseongEnergyTheme, };
export { buildCombinedInterpretation, buildPracticalGuidance, buildRelationImpacts, buildTransitionWarning, buildWhySummary, buildYongshinExplanation, } from './LuckNarrativeBuilderHelpers.js';
export interface DaeunNarrative {
    readonly daeunPillar: DaeunPillar;
    readonly quality: LuckQuality;
    readonly sipseongTheme: SipseongUnTheme;
    readonly energyTheme: UnseongEnergyTheme;
    readonly yongshinExplanation: string;
    readonly relationImpacts: readonly string[];
    readonly transitionWarning: string;
    readonly whySummary: string;
    readonly practicalGuidance: string;
}
export interface SaeunNarrative {
    readonly year: number;
    readonly pillar: Pillar;
    readonly quality: LuckQuality;
    readonly sipseongTheme: SipseongUnTheme;
    readonly energyTheme: UnseongEnergyTheme;
    readonly currentDaeunPillar: DaeunPillar | null;
    readonly combinedInterpretation: string;
    readonly whySummary: string;
    readonly practicalGuidance: string;
}
export interface LuckNarrative {
    readonly daeunNarratives: readonly DaeunNarrative[];
    readonly saeunNarratives: readonly SaeunNarrative[];
}
export declare function findCurrentDaeun(daeunInfo: DaeunInfo, year: number, birthYear: number): DaeunPillar | null;
export declare function interpretDaeun(daeunAnalysis: DaeunAnalysis, dayMaster: Cheongan, yongshinElement: Ohaeng | null | undefined, gisinElement: Ohaeng | null | undefined): DaeunNarrative;
export declare function interpretSaeun(saeun: SaeunPillar, lpa: LuckPillarAnalysis, currentDaeun: DaeunPillar | null, dayMaster: Cheongan, yongshinElement: Ohaeng | null | undefined, gisinElement: Ohaeng | null | undefined): SaeunNarrative;
export declare const LuckNarrativeInterpreter: {
    readonly SIPSEONG_UN_THEMES: ReadonlyMap<import("../index.js").Sipseong, SipseongUnTheme>;
    readonly UNSEONG_ENERGY_THEMES: ReadonlyMap<import("../index.js").SibiUnseong, UnseongEnergyTheme>;
    readonly interpretDaeun: typeof interpretDaeun;
    readonly interpretSaeun: typeof interpretSaeun;
    readonly findCurrentDaeun: typeof findCurrentDaeun;
    readonly buildYongshinExplanation: typeof buildYongshinExplanation;
    readonly buildRelationImpacts: typeof buildRelationImpacts;
    readonly buildTransitionWarning: typeof buildTransitionWarning;
    readonly buildWhySummary: typeof buildWhySummary;
    readonly buildPracticalGuidance: typeof buildPracticalGuidance;
    readonly buildCombinedInterpretation: typeof buildCombinedInterpretation;
};
//# sourceMappingURL=LuckNarrativeInterpreter.d.ts.map