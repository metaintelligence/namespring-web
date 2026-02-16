import { SibiUnseong } from '../domain/SibiUnseong.js';
import { Sipseong } from '../domain/Sipseong.js';
import { createEnumValueParser } from '../domain/EnumValueParser.js';
import rawLuckNarrativeThemes from './data/luckNarrativeThemes.json';
const LUCK_NARRATIVE_THEMES = rawLuckNarrativeThemes;
const toSipseong = createEnumValueParser('Sipseong', 'LuckNarrativeThemes', Sipseong);
const toSibiUnseong = createEnumValueParser('SibiUnseong', 'LuckNarrativeThemes', SibiUnseong);
export const SIPSEONG_UN_THEMES = new Map(LUCK_NARRATIVE_THEMES.sipseongThemes.map(([sipseong, theme]) => {
    const parsed = toSipseong(sipseong);
    return [parsed, { ...theme, sipseong: parsed }];
}));
export const UNSEONG_ENERGY_THEMES = new Map(LUCK_NARRATIVE_THEMES.unseongThemes.map(([sibiUnseong, theme]) => {
    const parsed = toSibiUnseong(sibiUnseong);
    return [parsed, { ...theme, sibiUnseong: parsed }];
}));
//# sourceMappingURL=LuckNarrativeThemes.js.map