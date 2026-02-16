import { RuleCitationRegistry, citationInlineDetailed } from './RuleCitationRegistry.js';
export function sentenceCite(ruleId) {
    const citation = RuleCitationRegistry.forSentence(ruleId);
    return citation ? citationInlineDetailed(citation) : '';
}
//# sourceMappingURL=NarrativeSentenceCite.js.map