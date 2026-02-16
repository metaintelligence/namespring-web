import { CHEONGAN_VALUES } from '../../domain/Cheongan.js';
import { JIJI_VALUES } from '../../domain/Jiji.js';
import { createValueParser } from '../../domain/EnumValueParser.js';
import rawShinsalCoreCatalog from './data/shinsalCoreCatalog.json';
const SAMHAP_FIELD_KEYS = ['yeokma', 'dohwa', 'hwagae', 'jangseong', 'geopsal', 'jaesal', 'cheonsal', 'jisal', 'mangsin', 'banan'];
const SHINSAL_CORE_CATALOG = rawShinsalCoreCatalog;
const toCheongan = createValueParser('Cheongan', 'shinsalCoreCatalog.json', CHEONGAN_VALUES);
const toJiji = createValueParser('Jiji', 'shinsalCoreCatalog.json', JIJI_VALUES);
function indexByMember(entries) {
    const map = new Map();
    for (const entry of entries) {
        for (const member of entry.members) {
            map.set(member, entry.value);
        }
    }
    return map;
}
function toJijiSet(values) {
    return new Set(values.map(toJiji));
}
function toSamhapGroup(raw) {
    const parsedFields = Object.fromEntries(SAMHAP_FIELD_KEYS.map((key) => [key, toJiji(raw[key])]));
    return {
        members: toJijiSet(raw.members),
        ...parsedFields,
    };
}
const SAMHAP_GROUPS = SHINSAL_CORE_CATALOG.samhapGroups.map(toSamhapGroup);
const SAMHAP_GROUP_BY_MEMBER = indexByMember(SAMHAP_GROUPS.map(group => ({ members: group.members, value: group })));
export function samhapGroupOf(branch) {
    return SAMHAP_GROUP_BY_MEMBER.get(branch);
}
const BANGHAP_GOSIN_GWASUK = SHINSAL_CORE_CATALOG.banghapEntries
    .map((entry) => ({
    members: toJijiSet(entry.members),
    value: { gosin: toJiji(entry.gosin), gwasuk: toJiji(entry.gwasuk) },
}));
const BANGHAP_ENTRY_BY_MEMBER = indexByMember(BANGHAP_GOSIN_GWASUK);
export function banghapGroupOf(branch) {
    return BANGHAP_ENTRY_BY_MEMBER.get(branch);
}
export function pillarKey(stem, branch) {
    return `${stem}:${branch}`;
}
function buildPillarSet(pairs) {
    return new Set(pairs.map(([rawStem, rawBranch]) => pillarKey(toCheongan(rawStem), toJiji(rawBranch))));
}
export const GOEGANG_PILLARS = buildPillarSet(SHINSAL_CORE_CATALOG.goegangPillars);
export const GORANSAL_PILLARS = buildPillarSet(SHINSAL_CORE_CATALOG.goransalPillars);
//# sourceMappingURL=ShinsalCatalogCore.js.map