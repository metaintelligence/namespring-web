import { Gender } from '../../domain/Gender.js';
import { PalaceFavor, } from '../../domain/Palace.js';
import { PillarPosition } from '../../domain/PillarPosition.js';
import { Sipseong } from '../../domain/Sipseong.js';
import { createEnumValueParser } from '../../domain/EnumValueParser.js';
import rawPalaceCatalog from './data/palaceCatalog.json';
const PALACE_CATALOG_DATA = rawPalaceCatalog;
const toPillarPosition = createEnumValueParser('PillarPosition', 'PalaceCatalog', PillarPosition);
const toSipseong = createEnumValueParser('Sipseong', 'PalaceCatalog', Sipseong);
const toPalaceFavor = createEnumValueParser('PalaceFavor', 'PalaceCatalog', PalaceFavor);
function interpKey(sipseong, position) {
    return `${sipseong}:${position}`;
}
const PALACE_TABLE = new Map(PALACE_CATALOG_DATA.palaceTable.map(([position, info]) => {
    const parsed = toPillarPosition(position);
    return [parsed, { ...info, position: parsed }];
}));
function buildFamilyTable(rows) {
    const table = {};
    for (const [sipseong, value] of rows) {
        table[toSipseong(sipseong)] = [value.member, value.hanja];
    }
    return table;
}
const MALE_FAMILY = buildFamilyTable(PALACE_CATALOG_DATA.maleFamily);
const FEMALE_FAMILY = buildFamilyTable(PALACE_CATALOG_DATA.femaleFamily);
const INTERPRETATION_TABLE = new Map(PALACE_CATALOG_DATA.interpretationRows.map(([sipseong, position, interpretation]) => [
    interpKey(toSipseong(sipseong), toPillarPosition(position)),
    {
        favor: toPalaceFavor(interpretation.favor),
        summary: interpretation.summary,
        detail: interpretation.detail,
    },
]));
function familyTable(gender) {
    return gender === Gender.MALE ? MALE_FAMILY : FEMALE_FAMILY;
}
export function palaceInfo(position) {
    return PALACE_TABLE.get(position);
}
export function familyRelation(sipseong, gender) {
    const [familyMember, hanja] = familyTable(gender)[sipseong];
    return {
        sipseong,
        gender,
        familyMember,
        hanja,
    };
}
export function familyMember(sipseong, gender) {
    return familyTable(gender)[sipseong][0];
}
export function interpretation(sipseong, position) {
    if (position === PillarPosition.DAY)
        return null;
    return INTERPRETATION_TABLE.get(interpKey(sipseong, position)) ?? null;
}
//# sourceMappingURL=PalaceCatalogData.js.map