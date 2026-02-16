import { Jiji } from '../../domain/Jiji.js';
import { Ohaeng } from '../../domain/Ohaeng.js';
import { Sipseong } from '../../domain/Sipseong.js';
export declare enum SipseongCategory {
    BIGYEOP = "BIGYEOP",
    SIKSANG = "SIKSANG",
    JAE = "JAE",
    GWAN = "GWAN",
    INSEONG = "INSEONG"
}
export declare const BANGHAP_GROUPS: ReadonlyMap<Ohaeng, ReadonlySet<Jiji>>;
export declare function categorize(sipseong: Sipseong): SipseongCategory;
export declare function categorizeByOhaeng(dayMasterOhaeng: Ohaeng, targetOhaeng: Ohaeng): SipseongCategory;
//# sourceMappingURL=GyeokgukDeterminerHelpers.d.ts.map