import { ClassicalSource } from '../domain/ClassicalSource.js';
import { createRegistryCitation } from './RuleCitationFactory.js';
export interface RuleCitation {
    readonly sources: readonly ClassicalSource[];
    readonly topic: string;
    readonly note: string;
    readonly confidence: number;
}
export declare const createRuleCitation: typeof createRegistryCitation;
export declare function citationInline(citation: RuleCitation): string;
export declare function citationInlineDetailed(citation: RuleCitation): string;
export declare function citationTraceForm(citation: RuleCitation): string;
export declare const RuleCitationRegistry: {
    readonly forKey: (key: string) => RuleCitation | null;
    readonly forSentence: (ruleId: string) => RuleCitation | null;
    readonly all: () => ReadonlyMap<string, RuleCitation>;
    readonly allSentence: () => ReadonlyMap<string, RuleCitation>;
    readonly forSource: (source: ClassicalSource) => Map<string, RuleCitation>;
};
//# sourceMappingURL=RuleCitationRegistry.d.ts.map