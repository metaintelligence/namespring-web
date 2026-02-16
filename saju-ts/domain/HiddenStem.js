import { Cheongan } from './Cheongan.js';
import { Jiji } from './Jiji.js';
export var HiddenStemRole;
(function (HiddenStemRole) {
    HiddenStemRole["YEOGI"] = "YEOGI";
    HiddenStemRole["JUNGGI"] = "JUNGGI";
    HiddenStemRole["JEONGGI"] = "JEONGGI";
})(HiddenStemRole || (HiddenStemRole = {}));
export var HiddenStemVariant;
(function (HiddenStemVariant) {
    HiddenStemVariant["STANDARD"] = "STANDARD";
    HiddenStemVariant["NO_RESIDUAL_EARTH"] = "NO_RESIDUAL_EARTH";
})(HiddenStemVariant || (HiddenStemVariant = {}));
export var HiddenStemDayAllocation;
(function (HiddenStemDayAllocation) {
    HiddenStemDayAllocation["YEONHAE_JAPYEONG"] = "YEONHAE_JAPYEONG";
    HiddenStemDayAllocation["SAMMYEONG_TONGHOE"] = "SAMMYEONG_TONGHOE";
})(HiddenStemDayAllocation || (HiddenStemDayAllocation = {}));
function e(stem, role, days) {
    return { stem, role, days };
}
const Y = HiddenStemRole.YEOGI;
const J = HiddenStemRole.JUNGGI;
const JG = HiddenStemRole.JEONGGI;
const YEONHAE_JAPYEONG = {
    [Jiji.JA]: [e(Cheongan.IM, Y, 10), e(Cheongan.GYE, JG, 20)],
    [Jiji.CHUK]: [e(Cheongan.GYE, Y, 9), e(Cheongan.SIN, J, 3), e(Cheongan.GI, JG, 18)],
    [Jiji.IN]: [e(Cheongan.MU, Y, 7), e(Cheongan.BYEONG, J, 7), e(Cheongan.GAP, JG, 16)],
    [Jiji.MYO]: [e(Cheongan.GAP, Y, 10), e(Cheongan.EUL, JG, 20)],
    [Jiji.JIN]: [e(Cheongan.EUL, Y, 9), e(Cheongan.GYE, J, 3), e(Cheongan.MU, JG, 18)],
    [Jiji.SA]: [e(Cheongan.MU, Y, 7), e(Cheongan.GYEONG, J, 7), e(Cheongan.BYEONG, JG, 16)],
    [Jiji.O]: [e(Cheongan.BYEONG, Y, 10), e(Cheongan.GI, J, 9), e(Cheongan.JEONG, JG, 11)],
    [Jiji.MI]: [e(Cheongan.JEONG, Y, 9), e(Cheongan.EUL, J, 3), e(Cheongan.GI, JG, 18)],
    [Jiji.SIN]: [e(Cheongan.MU, Y, 7), e(Cheongan.IM, J, 7), e(Cheongan.GYEONG, JG, 16)],
    [Jiji.YU]: [e(Cheongan.GYEONG, Y, 10), e(Cheongan.SIN, JG, 20)],
    [Jiji.SUL]: [e(Cheongan.SIN, Y, 9), e(Cheongan.JEONG, J, 3), e(Cheongan.MU, JG, 18)],
    [Jiji.HAE]: [e(Cheongan.MU, Y, 7), e(Cheongan.GAP, J, 7), e(Cheongan.IM, JG, 16)],
};
const SAMMYEONG_TONGHOE = {
    [Jiji.JA]: [e(Cheongan.IM, Y, 7), e(Cheongan.GYE, JG, 23)],
    [Jiji.CHUK]: [e(Cheongan.GYE, Y, 7), e(Cheongan.GYEONG, J, 5), e(Cheongan.GI, JG, 18)],
    [Jiji.IN]: [e(Cheongan.MU, Y, 5), e(Cheongan.BYEONG, J, 5), e(Cheongan.GAP, JG, 20)],
    [Jiji.MYO]: [e(Cheongan.GAP, Y, 7), e(Cheongan.EUL, JG, 23)],
    [Jiji.JIN]: [e(Cheongan.EUL, Y, 7), e(Cheongan.IM, J, 5), e(Cheongan.MU, JG, 18)],
    [Jiji.SA]: [e(Cheongan.MU, Y, 7), e(Cheongan.GYEONG, J, 5), e(Cheongan.BYEONG, JG, 18)],
    [Jiji.O]: [e(Cheongan.BYEONG, Y, 7), e(Cheongan.JEONG, JG, 23)],
    [Jiji.MI]: [e(Cheongan.JEONG, Y, 7), e(Cheongan.GAP, J, 5), e(Cheongan.GI, JG, 18)],
    [Jiji.SIN]: [e(Cheongan.GI, Y, 5), e(Cheongan.IM, J, 5), e(Cheongan.GYEONG, JG, 20)],
    [Jiji.YU]: [e(Cheongan.GYEONG, Y, 7), e(Cheongan.SIN, JG, 23)],
    [Jiji.SUL]: [e(Cheongan.SIN, Y, 7), e(Cheongan.BYEONG, J, 5), e(Cheongan.MU, JG, 18)],
    [Jiji.HAE]: [e(Cheongan.MU, Y, 5), e(Cheongan.GAP, J, 5), e(Cheongan.IM, JG, 20)],
};
const SAENGJI = new Set([Jiji.IN, Jiji.SA, Jiji.SIN, Jiji.HAE]);
export const HiddenStemTable = {
    getHiddenStems(branch, variant = HiddenStemVariant.STANDARD, allocation = HiddenStemDayAllocation.YEONHAE_JAPYEONG) {
        const baseTable = allocation === HiddenStemDayAllocation.YEONHAE_JAPYEONG
            ? YEONHAE_JAPYEONG
            : SAMMYEONG_TONGHOE;
        const stems = baseTable[branch];
        if (variant === HiddenStemVariant.STANDARD) {
            return stems;
        }
        return stems.filter(entry => !(entry.role === HiddenStemRole.YEOGI &&
            entry.stem === Cheongan.MU &&
            SAENGJI.has(branch)));
    },
    getPrincipalStem(branch, variant = HiddenStemVariant.STANDARD, allocation = HiddenStemDayAllocation.YEONHAE_JAPYEONG) {
        const stems = HiddenStemTable.getHiddenStems(branch, variant, allocation);
        const jeonggi = stems.find(s => s.role === HiddenStemRole.JEONGGI);
        return jeonggi ? jeonggi.stem : stems[0].stem;
    },
};
//# sourceMappingURL=HiddenStem.js.map