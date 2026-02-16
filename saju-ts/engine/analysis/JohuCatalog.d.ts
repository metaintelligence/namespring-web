import { Cheongan } from '../../domain/Cheongan.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
export interface JohuCatalogEntry {
    readonly primary: Ohaeng;
    readonly secondary: Ohaeng | null;
    readonly note: string;
}
export type JohuRowRegistrar = (dayMaster: Cheongan, entries: readonly JohuCatalogEntry[]) => void;
export declare function registerJohuCatalog(registerRow: JohuRowRegistrar): void;
//# sourceMappingURL=JohuCatalog.d.ts.map