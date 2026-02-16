import type { GyeokgukResult } from '../domain/Gyeokguk.js';
import { SibiUnseong } from '../domain/SibiUnseong.js';
import { Sipseong } from '../domain/Sipseong.js';
import type { StrengthResult } from '../domain/StrengthResult.js';
import type { YongshinResult } from '../domain/YongshinResult.js';
import type { SajuAnalysis } from '../domain/SajuAnalysis.js';
export declare function buildCausalChain(a: SajuAnalysis): string;
export declare function buildStrengthToGyeokgukTransition(sr: StrengthResult | null, gr: GyeokgukResult): string;
export declare function buildMultiMethodYongshinBasis(yr: YongshinResult, sr: StrengthResult | null): string;
export declare function daeunBriefAssessment(sipseong: Sipseong, unseong: SibiUnseong): string;
export declare function buildLifePathSynthesis(a: SajuAnalysis): string;
//# sourceMappingURL=NarrativeOverallSynthesisHelpers.d.ts.map