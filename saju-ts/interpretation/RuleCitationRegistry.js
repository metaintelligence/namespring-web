import { CLASSICAL_SOURCE_INFO } from '../domain/ClassicalSource.js';
import { SENTENCE_REGISTRY } from './RuleCitationSentenceRegistryData.js';
import { REGISTRY } from './RuleCitationTraceRegistryData.js';
import { createRegistryCitation } from './RuleCitationFactory.js';
export const createRuleCitation = createRegistryCitation;
function sourceLabels(citation) {
    return citation.sources.map(source => CLASSICAL_SOURCE_INFO[source].shortLabel).join('+');
}
export function citationInline(citation) {
    const sourceNames = sourceLabels(citation);
    return `[출처: ${sourceNames} — ${citation.topic}]`;
}
export function citationInlineDetailed(citation) {
    if (citation.confidence <= 0)
        return citationInline(citation);
    const sourceNames = sourceLabels(citation);
    return `[근거: ${sourceNames} — ${citation.topic}, 신뢰도 ${citation.confidence}%]`;
}
export function citationTraceForm(citation) {
    const sourceNames = sourceLabels(citation);
    return `${sourceNames}:${citation.topic}`;
}
function buildCitationIndexBySource(registry) {
    const index = new Map();
    for (const [key, citation] of registry) {
        for (const source of citation.sources) {
            const bucket = index.get(source) ?? new Map();
            bucket.set(key, citation);
            index.set(source, bucket);
        }
    }
    return index;
}
const REGISTRY_BY_SOURCE = buildCitationIndexBySource(REGISTRY);
export const RuleCitationRegistry = {
    forKey(key) {
        return REGISTRY.get(key) ?? null;
    },
    forSentence(ruleId) {
        return SENTENCE_REGISTRY.get(ruleId) ?? null;
    },
    all() {
        return REGISTRY;
    },
    allSentence() {
        return SENTENCE_REGISTRY;
    },
    forSource(source) {
        return new Map(REGISTRY_BY_SOURCE.get(source) ?? []);
    },
};
//# sourceMappingURL=RuleCitationRegistry.js.map