import { ANALYSIS_KEYS } from '../../domain/SajuAnalysis.js';
import { tracedStep } from './TraceHelpers.js';
function buildDaeunTraceEvidence(daeun) {
    return [
        `forward=${daeun.isForward}`,
        `startAge=${daeun.firstDaeunStartAge}`,
        `count=${daeun.daeunPillars.length}`,
        `boundaryMode=${daeun.boundaryMode}`,
        ...daeun.warnings,
    ];
}
function buildSaeunTraceEvidence(saeunStartYear, saeunCount) {
    return [`startYear=${saeunStartYear}`, `count=${saeunCount}`];
}
export function buildDaeunTraceStep(daeun, daeunReasoning) {
    return tracedStep(ANALYSIS_KEYS.DAEUN, `대운 산출 — ${daeun.isForward ? '순행(順行)' : '역행(逆行)'}, ` +
        `${daeun.firstDaeunStartAge}세 시작, ${daeun.daeunPillars.length}주기.`, buildDaeunTraceEvidence(daeun), daeunReasoning);
}
export function buildSaeunTraceStep(saeunStartYear, saeun, saeunReasoning) {
    return tracedStep(ANALYSIS_KEYS.SAEUN, `세운(歲運) 산출 — ${saeunStartYear}년부터 ${saeun.length}년간.`, buildSaeunTraceEvidence(saeunStartYear, saeun.length), saeunReasoning);
}
//# sourceMappingURL=LuckTraceBuilders.js.map