import { Ohaeng } from '../../domain/Ohaeng.js';
import { PillarSet } from '../../domain/PillarSet.js';
import { StrengthResult } from '../../domain/StrengthResult.js';
import { Sipseong } from '../../domain/Sipseong.js';
export interface FormationProfile {
    readonly dayMasterElement: Ohaeng;
    readonly hasBigyeop: boolean;
    readonly hasSiksang: boolean;
    readonly hasJae: boolean;
    readonly hasGwan: boolean;
    readonly hasInseong: boolean;
    readonly hasSangGwan: boolean;
    readonly hasSikSin: boolean;
    readonly hasPyeonIn: boolean;
    readonly hasPyeonGwan: boolean;
    readonly hasJeongGwan: boolean;
    readonly hasPyeonJae: boolean;
    readonly hasJeongJae: boolean;
    readonly hasGyeobJae: boolean;
    readonly bigyeopCount: number;
    readonly siksangCount: number;
    readonly jaeCount: number;
    readonly gwanCount: number;
    readonly inseongCount: number;
    readonly isStrong: boolean;
    readonly hiddenSipseongs: ReadonlySet<Sipseong>;
}
export declare function hasSikSinStrong(p: FormationProfile): boolean;
export declare function hasHiddenSangGwan(p: FormationProfile): boolean;
export declare function hasHiddenPyeonIn(p: FormationProfile): boolean;
export declare function hasHiddenGyeobJae(p: FormationProfile): boolean;
export declare function buildProfile(pillars: PillarSet, strength: StrengthResult): FormationProfile;
//# sourceMappingURL=GyeokgukFormationProfile.d.ts.map