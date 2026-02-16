import { RuleCitationRegistry } from '../../interpretation/RuleCitationRegistry.js';
function citationList(ruleCitation) {
    return ruleCitation ? [formatCitation(ruleCitation)] : [];
}
function confidenceForKey(key, ruleCitation) {
    const sentenceConfidence = maxSentenceConfidenceForKey(key);
    if (sentenceConfidence !== undefined)
        return sentenceConfidence;
    return ruleCitation && ruleCitation.confidence > 0 ? ruleCitation.confidence : null;
}
export function formatCitation(citation) {
    const sourceList = citation.sources.join(', ');
    return `[근거: ${sourceList} — ${citation.topic}, 신뢰도 ${Math.round(citation.confidence * 100)}%]`;
}
export function tracedStep(key, summary, evidence = [], reasoning = []) {
    const ruleCitation = RuleCitationRegistry.forKey(key);
    const citations = citationList(ruleCitation);
    const confidence = confidenceForKey(key, ruleCitation);
    return { key, summary, evidence: [...evidence], citations, reasoning: [...reasoning], confidence };
}
function maxSentenceConfidenceForKey(key) {
    const keyPrefix = `${key}.`;
    let maxSentenceConfidence;
    for (const [sentenceKey, sentenceCitation] of RuleCitationRegistry.allSentence()) {
        if (!sentenceKey.startsWith(keyPrefix))
            continue;
        if (maxSentenceConfidence === undefined || sentenceCitation.confidence > maxSentenceConfidence) {
            maxSentenceConfidence = sentenceCitation.confidence;
        }
    }
    return maxSentenceConfidence;
}
export function detectAndTrace(trace, detector, buildTraceStep) {
    const detected = detector();
    trace.push(buildTraceStep(detected));
    return detected;
}
//# sourceMappingURL=TraceHelpers.js.map