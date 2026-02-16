import { CHEONGAN_VALUES } from '../../domain/Cheongan.js';
import { OHAENG_VALUES } from '../../domain/Ohaeng.js';
import { createValueParser } from '../../domain/EnumValueParser.js';
import rawJohuCatalog from './data/johuCatalog.json';
const JOHU_CATALOG_DATA = rawJohuCatalog;
const toCheongan = createValueParser('Cheongan', 'JohuCatalog', CHEONGAN_VALUES);
const toOhaeng = createValueParser('Ohaeng', 'JohuCatalog', OHAENG_VALUES);
const JOHU_CATALOG_ROWS = JOHU_CATALOG_DATA.rows.map(([dayMaster, entries]) => [
    toCheongan(dayMaster),
    entries.map((entry) => ({
        primary: toOhaeng(entry.primary),
        secondary: entry.secondary == null ? null : toOhaeng(entry.secondary),
        note: entry.note,
    })),
]);
export function registerJohuCatalog(registerRow) {
    for (const [dayMaster, entries] of JOHU_CATALOG_ROWS) {
        registerRow(dayMaster, entries);
    }
}
//# sourceMappingURL=JohuCatalog.js.map