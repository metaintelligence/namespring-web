import { Cheongan } from '../../domain/Cheongan.js';
import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng, ohaengKoreanLabel } from '../../domain/Ohaeng.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
export function stemPairKey(a, b) {
    return [a, b].sort().join('-');
}
export const HAP_TABLE = new Map([
    [stemPairKey(Cheongan.GAP, Cheongan.GI), { resultOhaeng: Ohaeng.EARTH, hapName: '갑기합화토' }],
    [stemPairKey(Cheongan.EUL, Cheongan.GYEONG), { resultOhaeng: Ohaeng.METAL, hapName: '을경합화금' }],
    [stemPairKey(Cheongan.BYEONG, Cheongan.SIN), { resultOhaeng: Ohaeng.WATER, hapName: '병신합화수' }],
    [stemPairKey(Cheongan.JEONG, Cheongan.IM), { resultOhaeng: Ohaeng.WOOD, hapName: '정임합화목' }],
    [stemPairKey(Cheongan.MU, Cheongan.GYE), { resultOhaeng: Ohaeng.FIRE, hapName: '무계합화화' }],
]);
export const SEASON_SUPPORT = new Map([
    [Ohaeng.WOOD, new Set([Jiji.IN, Jiji.MYO])],
    [Ohaeng.FIRE, new Set([Jiji.SA, Jiji.O])],
    [Ohaeng.EARTH, new Set([Jiji.JIN, Jiji.SUL, Jiji.CHUK, Jiji.MI])],
    [Ohaeng.METAL, new Set([Jiji.SIN, Jiji.YU])],
    [Ohaeng.WATER, new Set([Jiji.HAE, Jiji.JA])],
]);
export function pillarKoreanLabel(pos) {
    switch (pos) {
        case PillarPosition.YEAR: return '년간';
        case PillarPosition.MONTH: return '월간';
        case PillarPosition.DAY: return '일간';
        case PillarPosition.HOUR: return '시간';
    }
}
export function ohaengKoreanName(o) {
    return ohaengKoreanLabel(o);
}
//# sourceMappingURL=HapHwaCatalog.js.map