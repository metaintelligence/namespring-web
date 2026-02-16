import { CHEONGAN_INFO, cheonganOrdinal } from '../../domain/Cheongan.js';
import { Eumyang } from '../../domain/Eumyang.js';
import { Jiji, jijiOrdinal } from '../../domain/Jiji.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { SIBI_UNSEONG_VALUES } from '../../domain/SibiUnseong.js';
import { DEFAULT_CONFIG, EarthLifeStageRule, } from '../../config/CalculationConfig.js';
const BRANCH_COUNT = 12;
const JANGSAENG_FOLLOW_FIRE = [
    Jiji.HAE,
    Jiji.O,
    Jiji.IN,
    Jiji.YU,
    Jiji.IN, // follows BYEONG
    Jiji.YU, // follows JEONG
    Jiji.SA,
    Jiji.JA,
    Jiji.SIN,
    Jiji.MYO,
];
const JANGSAENG_FOLLOW_WATER = [
    Jiji.HAE,
    Jiji.O,
    Jiji.IN,
    Jiji.YU,
    Jiji.SIN, // follows IM
    Jiji.MYO, // follows GYE
    Jiji.SA,
    Jiji.JA,
    Jiji.SIN,
    Jiji.MYO,
];
function jangSaengTable(rule) {
    switch (rule) {
        case EarthLifeStageRule.FOLLOW_FIRE:
            return JANGSAENG_FOLLOW_FIRE;
        case EarthLifeStageRule.FOLLOW_WATER:
            return JANGSAENG_FOLLOW_WATER;
        case EarthLifeStageRule.INDEPENDENT:
            return JANGSAENG_FOLLOW_FIRE;
    }
}
export function calculateSibiUnseong(stem, branch, config = DEFAULT_CONFIG) {
    const table = jangSaengTable(config.earthLifeStageRule);
    const stemOrd = cheonganOrdinal(stem);
    const startBranch = table[stemOrd];
    const start = jijiOrdinal(startBranch);
    const target = jijiOrdinal(branch);
    let index;
    if (config.yinReversalEnabled) {
        const eumyang = CHEONGAN_INFO[stem].eumyang;
        if (eumyang === Eumyang.YANG) {
            index = (target - start + BRANCH_COUNT) % BRANCH_COUNT;
        }
        else {
            index = (start - target + BRANCH_COUNT) % BRANCH_COUNT;
        }
    }
    else {
        index = (target - start + BRANCH_COUNT) % BRANCH_COUNT;
    }
    return SIBI_UNSEONG_VALUES[index];
}
export function analyzeAllPillars(dayMaster, pillars, config = DEFAULT_CONFIG) {
    return new Map([
        [PillarPosition.YEAR, calculateSibiUnseong(dayMaster, pillars.year.jiji, config)],
        [PillarPosition.MONTH, calculateSibiUnseong(dayMaster, pillars.month.jiji, config)],
        [PillarPosition.DAY, calculateSibiUnseong(dayMaster, pillars.day.jiji, config)],
        [PillarPosition.HOUR, calculateSibiUnseong(dayMaster, pillars.hour.jiji, config)],
    ]);
}
//# sourceMappingURL=SibiUnseongCalculator.js.map