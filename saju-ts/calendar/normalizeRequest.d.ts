import type { SajuRequest } from '../api/types.js';
import { type ParsedInstant } from './iso.js';
export interface NormalizedRequestInternal {
    request: SajuRequest;
    parsed: ParsedInstant;
}
export declare function normalizeRequest(input: SajuRequest): NormalizedRequestInternal;
