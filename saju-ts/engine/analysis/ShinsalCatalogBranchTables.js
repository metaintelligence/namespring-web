import { Cheongan, CHEONGAN_VALUES } from '../../domain/Cheongan.js';
import { Jiji, JIJI_VALUES } from '../../domain/Jiji.js';
import { createValueParser } from '../../domain/EnumValueParser.js';
import rawBranchTables from './data/shinsalBranchTables.json';
const BRANCH_TABLE_DATA = rawBranchTables;
const toCheongan = createValueParser('Cheongan', 'shinsalBranchTables.json', CHEONGAN_VALUES);
const toJiji = createValueParser('Jiji', 'shinsalBranchTables.json', JIJI_VALUES);
function symmetricPairMap(pairs) {
    const map = new Map();
    for (const [left, right] of pairs)
        map.set(left, right).set(right, left);
    return map;
}
function toStemOrBranch(value) {
    return value.kind === 'stem'
        ? { kind: 'stem', stem: toCheongan(value.stem) }
        : { kind: 'branch', branch: toJiji(value.branch) };
}
function toMonthMixedTable(rows) {
    return new Map(rows.map(([branch, target]) => [toJiji(branch), toStemOrBranch(target)]));
}
export const CHEONDEOK_TABLE = toMonthMixedTable(BRANCH_TABLE_DATA.cheondeok);
export const WOLDEOK_TABLE = toMonthMixedTable(BRANCH_TABLE_DATA.woldeok);
const STEM_HAP_MAP = symmetricPairMap([
    [Cheongan.GAP, Cheongan.GI],
    [Cheongan.EUL, Cheongan.GYEONG],
    [Cheongan.BYEONG, Cheongan.SIN],
    [Cheongan.JEONG, Cheongan.IM],
    [Cheongan.MU, Cheongan.GYE],
]);
const BRANCH_YUKHAP_MAP = symmetricPairMap([
    [Jiji.JA, Jiji.CHUK],
    [Jiji.IN, Jiji.HAE],
    [Jiji.MYO, Jiji.SUL],
    [Jiji.JIN, Jiji.YU],
    [Jiji.SA, Jiji.SIN],
    [Jiji.O, Jiji.MI],
]);
function buildHapTable(base) {
    const result = new Map();
    for (const [key, target] of base) {
        result.set(key, target.kind === 'stem'
            ? { kind: 'stem', stem: STEM_HAP_MAP.get(target.stem) }
            : { kind: 'branch', branch: BRANCH_YUKHAP_MAP.get(target.branch) });
    }
    return result;
}
export const CHEONDEOK_HAP_TABLE = buildHapTable(CHEONDEOK_TABLE);
export const WOLDEOK_HAP_TABLE = buildHapTable(WOLDEOK_TABLE);
export const YUKHAE_PAIRS = BRANCH_TABLE_DATA.yukhaePairs.map(([left, right]) => [toJiji(left), toJiji(right)]);
//# sourceMappingURL=ShinsalCatalogBranchTables.js.map