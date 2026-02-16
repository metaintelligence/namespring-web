import { Ohaeng } from '../../domain/Ohaeng.js';
import { GyeokgukFormation } from '../../domain/Gyeokguk.js';
import type { FormationProfile } from './GyeokgukFormationProfile.js';
type ConditionalMessage = readonly [condition: boolean, message: string];
export type FormationPredicate = (profile: FormationProfile) => boolean;
export type FormationMessageRule = readonly [predicate: FormationPredicate, message: string];
export interface FormationRuleSpec {
    readonly patternName: string;
    readonly formationCondition: string;
    readonly breaking: readonly FormationMessageRule[];
    readonly rescue?: readonly FormationMessageRule[];
    readonly support: FormationPredicate;
}
export declare function collectMessages(rules: readonly ConditionalMessage[]): string[];
export declare function ohaengKorean(ohaeng: Ohaeng): string;
export declare function buildFormation(breaking: string[], rescue: string[], formationGood: boolean, patternName: string, formationCondition: string): GyeokgukFormation;
export declare function buildNotAssessedFormation(reasoning: string): GyeokgukFormation;
export declare function evaluateFormationRule(profile: FormationProfile, spec: FormationRuleSpec): GyeokgukFormation;
export declare function hasElementInStems(p: FormationProfile, element: Ohaeng): boolean;
export declare function hasElementInHidden(p: FormationProfile, element: Ohaeng): boolean;
export {};
//# sourceMappingURL=GyeokgukFormationShared.d.ts.map