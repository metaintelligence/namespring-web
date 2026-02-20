import { stemYinYang } from './cycle.js';
import { mod } from './mod.js';
export const LIFE_STAGE_VALUES = [
    'JANG_SAENG',
    'MOK_YOK',
    'GWAN_DAE',
    'GEON_ROK',
    'JE_WANG',
    'SWOE',
    'BYEONG',
    'SA',
    'MYO',
    'JEOL',
    'TAE',
    'YANG',
];
const START_FOLLOW_FIRE = [
    11, // 甲: 亥
    6, // 乙: 午
    2, // 丙: 寅
    9, // 丁: 酉
    2, // 戊: 寅 (follows 丙)
    9, // 己: 酉 (follows 丁)
    5, // 庚: 巳
    0, // 辛: 子
    8, // 壬: 申
    3, // 癸: 卯
];
const START_FOLLOW_WATER = [
    11, // 甲: 亥
    6, // 乙: 午
    2, // 丙: 寅
    9, // 丁: 酉
    8, // 戊: 申 (follows 壬)
    3, // 己: 卯 (follows 癸)
    5, // 庚: 巳
    0, // 辛: 子
    8, // 壬: 申
    3, // 癸: 卯
];
function startBranchForChangSaeng(stem, policy) {
    const s = mod(stem, 10);
    if (policy.earthRule === 'FOLLOW_WATER')
        return START_FOLLOW_WATER[s] ?? 0;
    // INDEPENDENT defaults to FOLLOW_FIRE for now.
    return START_FOLLOW_FIRE[s] ?? 0;
}
/**
 * Compute 十二運星 (십이운성) of `branch` relative to `stem` (usually day stem).
 */
export function lifeStageOf(stem, branch, policy) {
    const start = startBranchForChangSaeng(stem, policy);
    const target = mod(branch, 12);
    let index;
    if (policy.yinReversalEnabled && stemYinYang(stem) === 'YIN') {
        index = mod(start - target, 12);
    }
    else {
        index = mod(target - start, 12);
    }
    return {
        stage: LIFE_STAGE_VALUES[index],
        index,
        startBranch: start,
    };
}
