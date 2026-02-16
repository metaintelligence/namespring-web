import { CHEONGAN_VALUES } from '../../domain/Cheongan.js';
import { JIJI_VALUES } from '../../domain/Jiji.js';
import { createValueParser } from '../../domain/EnumValueParser.js';
import rawStemTables from './data/shinsalStemTables.json';
const STEM_TABLES_DATA = rawStemTables;
const toJiji = createValueParser('Jiji', 'shinsalStemTables.json', JIJI_VALUES);
function toPairRows(rows) {
    return rows.map(([left, right]) => [toJiji(left), toJiji(right)]);
}
function mapByStems(values) {
    if (values.length !== CHEONGAN_VALUES.length) {
        throw new Error(`Expected ${CHEONGAN_VALUES.length} entries, got ${values.length}`);
    }
    return new Map(CHEONGAN_VALUES.map((stem, index) => [stem, values[index]]));
}
function mapPairsByStems(values) {
    return mapByStems(values.map(([left, right]) => [left, right]));
}
export const CHEONUL_GWIIN_TABLE_KOREAN = mapPairsByStems(toPairRows(STEM_TABLES_DATA.cheonulGwiinKorean));
export const CHEONUL_GWIIN_TABLE_CHINESE = mapPairsByStems(toPairRows(STEM_TABLES_DATA.cheonulGwiinChinese));
export const TAEGUK_GWIIN_TABLE = mapPairsByStems(toPairRows(STEM_TABLES_DATA.taegukGwiin));
export const WONJIN_PAIRS = toPairRows(STEM_TABLES_DATA.wonjinPairs);
const SINGLE_STEM_TABLE_KEYS = {
    MUNCHANG_TABLE: 'munchang',
    YANGIN_TABLE: 'yangin',
    HAKDANG_TABLE: 'hakdang',
    GEUMYEO_TABLE: 'geumyeo',
    BAEKHO_TABLE: 'baekho',
    HONGYEOM_TABLE: 'hongyeom',
    AMNOK_TABLE: 'amnok',
    CHEONGWAN_TABLE: 'cheongwan',
    MUNGOK_TABLE: 'mungok',
    GUGIN_TABLE: 'gugin',
    CHEONBOK_GWIIN_TABLE: 'cheonbokGwiin',
    HYEOLINSAL_TABLE: 'hyeolinsal',
    CHEONJU_GWIIN_TABLE: 'cheonjuGwiin',
};
const SINGLE_STEM_TABLES = Object.fromEntries(Object.entries(SINGLE_STEM_TABLE_KEYS).map(([exportName, sourceKey]) => [
    exportName,
    mapByStems((STEM_TABLES_DATA.singleStemTables[sourceKey] ?? []).map(toJiji)),
]));
export const { MUNCHANG_TABLE, YANGIN_TABLE, HAKDANG_TABLE, GEUMYEO_TABLE, BAEKHO_TABLE, HONGYEOM_TABLE, AMNOK_TABLE, CHEONGWAN_TABLE, MUNGOK_TABLE, GUGIN_TABLE, CHEONBOK_GWIIN_TABLE, HYEOLINSAL_TABLE, CHEONJU_GWIIN_TABLE, } = SINGLE_STEM_TABLES;
export const BOKSEONG_TABLE = mapByStems(STEM_TABLES_DATA.bokseong.map((branches) => new Set(branches.map(toJiji))));
//# sourceMappingURL=ShinsalCatalogStemTables.js.map