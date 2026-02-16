import { GyeokgukCategory } from '../../domain/Gyeokguk.js';
import { DEFAULT_CONFIG } from '../../config/CalculationConfig.js';
import { assessAgreement, deriveGisin, deriveGusin, resolveAll, resolveHeesin, } from './YongshinDecisionSupport.js';
import { byeongyakYongshin, eokbuYongshin, gyeokgukYongshin, hapwhaYongshin, ilhaengYongshin, jeonwangYongshin, johuYongshin, tongwanYongshin, } from './YongshinDeciderStrategies.js';
function pushRecommendation(recommendations, recommendation) {
    if (recommendation != null) {
        recommendations.push(recommendation);
    }
}
function resolveCategoryRecommendation(pillars, dayMasterOhaeng, config, gyeokgukResult, hapHwaEvaluations) {
    if (gyeokgukResult == null) {
        return null;
    }
    switch (gyeokgukResult.category) {
        case GyeokgukCategory.NAEGYEOK:
            return gyeokgukYongshin(dayMasterOhaeng, gyeokgukResult);
        case GyeokgukCategory.JONGGYEOK:
            return jeonwangYongshin(pillars, dayMasterOhaeng, gyeokgukResult, config);
        case GyeokgukCategory.HWAGYEOK:
            return hapwhaYongshin(gyeokgukResult, hapHwaEvaluations);
        case GyeokgukCategory.ILHAENG:
            return ilhaengYongshin(pillars, gyeokgukResult);
    }
}
export function decide(pillars, isStrong, dayMasterOhaeng, config = DEFAULT_CONFIG, gyeokgukResult = null, hapHwaEvaluations = []) {
    const dayMaster = pillars.day.cheongan;
    const monthBranch = pillars.month.jiji;
    const eokbu = eokbuYongshin(dayMasterOhaeng, isStrong);
    const johu = johuYongshin(dayMaster, monthBranch);
    const recommendations = [eokbu, johu];
    pushRecommendation(recommendations, tongwanYongshin(pillars, dayMasterOhaeng, hapHwaEvaluations));
    pushRecommendation(recommendations, resolveCategoryRecommendation(pillars, dayMasterOhaeng, config, gyeokgukResult, hapHwaEvaluations));
    pushRecommendation(recommendations, byeongyakYongshin(pillars, dayMasterOhaeng, isStrong, hapHwaEvaluations));
    const [finalYongshin, resolvedConfidence] = resolveAll(eokbu, johu, recommendations, config, gyeokgukResult);
    const finalHeesin = resolveHeesin(finalYongshin, eokbu, johu);
    const gisin = deriveGisin(finalYongshin);
    const gusin = deriveGusin(gisin);
    const agreement = assessAgreement(eokbu, johu);
    return {
        recommendations,
        finalYongshin,
        finalHeesin,
        gisin,
        gusin,
        agreement,
        finalConfidence: resolvedConfidence,
    };
}
export const YongshinDecider = {
    eokbuYongshin,
    johuYongshin,
    tongwanYongshin,
    jeonwangYongshin,
    gyeokgukYongshin,
    byeongyakYongshin,
    hapwhaYongshin,
    ilhaengYongshin,
    decide,
};
//# sourceMappingURL=YongshinDecider.js.map