export function createRegistryCitation(sources, topic, note = '', confidence = 0) {
    return {
        sources: Array.isArray(sources) ? sources : [sources],
        topic,
        note,
        confidence,
    };
}
//# sourceMappingURL=RuleCitationFactory.js.map