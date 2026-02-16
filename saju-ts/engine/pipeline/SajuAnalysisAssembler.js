import { ANALYSIS_KEYS } from '../../domain/SajuAnalysis.js';
export function buildAnalysisResults(context) {
    return new Map([
        [ANALYSIS_KEYS.STRENGTH, context.strength],
        [ANALYSIS_KEYS.YONGSHIN, context.yongshin],
        [ANALYSIS_KEYS.GYEOKGUK, context.gyeokguk],
        [ANALYSIS_KEYS.HAPWHA, context.hapHwaEvaluations],
        [ANALYSIS_KEYS.SIBI_UNSEONG, context.sibiUnseong],
        [ANALYSIS_KEYS.GONGMANG, context.gongmang],
        [ANALYSIS_KEYS.SHINSAL, context.shinsalHits],
        [ANALYSIS_KEYS.WEIGHTED_SHINSAL, context.weightedShinsalHits],
        [ANALYSIS_KEYS.SHINSAL_COMPOSITES, context.shinsalComposites],
        [ANALYSIS_KEYS.PALACE, context.palace],
        [ANALYSIS_KEYS.DAEUN, context.daeun],
        [ANALYSIS_KEYS.SAEUN, context.saeun],
        [ANALYSIS_KEYS.CHEONGAN_RELATIONS, context.cheonganRelations],
        [ANALYSIS_KEYS.RESOLVED_JIJI, context.resolvedJijiRelations],
        [ANALYSIS_KEYS.SCORED_CHEONGAN, context.scoredCheonganRelations],
        [ANALYSIS_KEYS.TRACE, context.trace],
        [ANALYSIS_KEYS.OHAENG_DISTRIBUTION, context.ohaengDistribution],
        [ANALYSIS_KEYS.TEN_GODS, context.tenGodAnalysis],
    ]);
}
export function buildSajuAnalysis(context) {
    const analysisResults = buildAnalysisResults(context);
    return {
        coreResult: context.coreResult,
        cheonganRelations: context.cheonganRelations,
        hapHwaEvaluations: context.hapHwaEvaluations,
        resolvedJijiRelations: context.resolvedJijiRelations,
        scoredCheonganRelations: context.scoredCheonganRelations,
        sibiUnseong: context.sibiUnseong,
        gongmangVoidBranches: context.gongmang.voidBranches,
        strengthResult: context.strength,
        yongshinResult: context.yongshin,
        gyeokgukResult: context.gyeokguk,
        shinsalHits: context.shinsalHits,
        weightedShinsalHits: context.weightedShinsalHits,
        shinsalComposites: context.shinsalComposites,
        palaceAnalysis: context.palace,
        daeunInfo: context.daeun,
        saeunPillars: context.saeun,
        ohaengDistribution: context.ohaengDistribution,
        trace: context.trace,
        tenGodAnalysis: context.tenGodAnalysis,
        analysisResults,
        pillars: context.coreResult.pillars,
        input: context.coreResult.input,
        jijiRelations: context.rawJijiRelations,
    };
}
//# sourceMappingURL=SajuAnalysisAssembler.js.map