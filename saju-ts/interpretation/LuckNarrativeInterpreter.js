import { SIPSEONG_UN_THEMES, UNSEONG_ENERGY_THEMES, } from './LuckNarrativeThemes.js';
import { buildCombinedInterpretation, buildPracticalGuidance, buildRelationImpacts, buildTransitionWarning, buildWhySummary, buildYongshinExplanation, } from './LuckNarrativeBuilderHelpers.js';
export { SIPSEONG_UN_THEMES, UNSEONG_ENERGY_THEMES, };
export { buildCombinedInterpretation, buildPracticalGuidance, buildRelationImpacts, buildTransitionWarning, buildWhySummary, buildYongshinExplanation, } from './LuckNarrativeBuilderHelpers.js';
export function findCurrentDaeun(daeunInfo, year, birthYear) {
    const koreanAge = year - birthYear + 1;
    return daeunInfo.daeunPillars.find(dp => koreanAge >= dp.startAge && koreanAge <= dp.endAge) ?? null;
}
export function interpretDaeun(daeunAnalysis, dayMaster, yongshinElement, gisinElement) {
    const lpa = daeunAnalysis.analysis;
    const sipseongTheme = SIPSEONG_UN_THEMES.get(lpa.sipseong);
    const energyTheme = UNSEONG_ENERGY_THEMES.get(lpa.sibiUnseong);
    const yongshinExplanation = buildYongshinExplanation(lpa, yongshinElement, gisinElement);
    const relationImpacts = buildRelationImpacts(lpa);
    const transitionWarning = buildTransitionWarning(daeunAnalysis);
    const whySummary = buildWhySummary(lpa, sipseongTheme, energyTheme, yongshinExplanation, daeunAnalysis.isTransitionPeriod);
    const practicalGuidance = buildPracticalGuidance(lpa, sipseongTheme, energyTheme);
    return {
        daeunPillar: daeunAnalysis.daeunPillar,
        quality: lpa.quality,
        sipseongTheme,
        energyTheme,
        yongshinExplanation,
        relationImpacts,
        transitionWarning,
        whySummary,
        practicalGuidance,
    };
}
export function interpretSaeun(saeun, lpa, currentDaeun, dayMaster, yongshinElement, gisinElement) {
    const sipseongTheme = SIPSEONG_UN_THEMES.get(lpa.sipseong);
    const energyTheme = UNSEONG_ENERGY_THEMES.get(lpa.sibiUnseong);
    const combinedInterpretation = buildCombinedInterpretation(lpa, currentDaeun, sipseongTheme, yongshinElement, gisinElement);
    const whySummary = buildWhySummary(lpa, sipseongTheme, energyTheme, buildYongshinExplanation(lpa, yongshinElement, gisinElement), false);
    const practicalGuidance = buildPracticalGuidance(lpa, sipseongTheme, energyTheme);
    return {
        year: saeun.year,
        pillar: saeun.pillar,
        quality: lpa.quality,
        sipseongTheme,
        energyTheme,
        currentDaeunPillar: currentDaeun,
        combinedInterpretation,
        whySummary,
        practicalGuidance,
    };
}
export const LuckNarrativeInterpreter = {
    SIPSEONG_UN_THEMES,
    UNSEONG_ENERGY_THEMES,
    interpretDaeun,
    interpretSaeun,
    findCurrentDaeun,
    buildYongshinExplanation,
    buildRelationImpacts,
    buildTransitionWarning,
    buildWhySummary,
    buildPracticalGuidance,
    buildCombinedInterpretation,
};
//# sourceMappingURL=LuckNarrativeInterpreter.js.map