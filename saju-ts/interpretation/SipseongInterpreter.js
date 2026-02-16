import { registerSipseongInterpretationCatalog } from './SipseongInterpretationCatalog.js';
function key(s, p) {
    return `${s}:${p}`;
}
const TABLE = new Map();
function put(sipseong, position, keyword, shortDescription, positiveTraits, negativeTraits, careerHint) {
    TABLE.set(key(sipseong, position), {
        sipseong,
        position,
        keyword,
        shortDescription,
        positiveTraits,
        negativeTraits,
        careerHint,
    });
}
registerSipseongInterpretationCatalog(put);
export function interpretSipseong(sipseong, position) {
    const result = TABLE.get(key(sipseong, position));
    if (!result) {
        throw new Error(`Missing SipseongInterpreter entry: ${sipseong}+${position}`);
    }
    return result;
}
export const SipseongInterpreter = {
    interpret: interpretSipseong,
};
//# sourceMappingURL=SipseongInterpreter.js.map