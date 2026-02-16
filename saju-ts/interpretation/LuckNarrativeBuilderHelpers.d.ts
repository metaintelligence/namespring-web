import { type DaeunPillar } from '../domain/DaeunInfo.js';
import { type DaeunAnalysis, type LuckPillarAnalysis } from '../domain/LuckInteraction.js';
import { Ohaeng } from '../domain/Ohaeng.js';
import { type SipseongUnTheme, type UnseongEnergyTheme } from './LuckNarrativeThemes.js';
export declare function buildYongshinExplanation(lpa: LuckPillarAnalysis, yongshinElement: Ohaeng | null | undefined, gisinElement: Ohaeng | null | undefined): string;
export declare function buildRelationImpacts(lpa: LuckPillarAnalysis): string[];
export declare function buildTransitionWarning(daeunAnalysis: DaeunAnalysis): string;
export declare function buildWhySummary(lpa: LuckPillarAnalysis, sipseongTheme: SipseongUnTheme, energyTheme: UnseongEnergyTheme, yongshinExplanation: string, isTransition: boolean): string;
export declare function buildPracticalGuidance(lpa: LuckPillarAnalysis, sipseongTheme: SipseongUnTheme, energyTheme: UnseongEnergyTheme): string;
export declare function buildCombinedInterpretation(lpa: LuckPillarAnalysis, currentDaeun: DaeunPillar | null, sipseongTheme: SipseongUnTheme, yongshinElement: Ohaeng | null | undefined, gisinElement: Ohaeng | null | undefined): string;
//# sourceMappingURL=LuckNarrativeBuilderHelpers.d.ts.map