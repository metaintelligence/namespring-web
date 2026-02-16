import { GyeokgukType } from '../../domain/Gyeokguk.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
export declare enum SipseongCategory {
    BIGYEOP = "BIGYEOP",
    SIKSANG = "SIKSANG",
    JAE = "JAE",
    GWAN = "GWAN",
    INSEONG = "INSEONG"
}
export interface GyeokgukYongshinRule {
    readonly primaryCategory: SipseongCategory;
    readonly secondaryCategory: SipseongCategory | null;
    readonly reasoning: string;
}
export declare const GYEOKGUK_YONGSHIN_TABLE: ReadonlyMap<GyeokgukType, GyeokgukYongshinRule>;
export declare const ILHAENG_TYPE_TO_OHAENG: ReadonlyMap<GyeokgukType, Ohaeng>;
//# sourceMappingURL=YongshinRuleCatalog.d.ts.map