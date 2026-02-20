import { stemElement } from './cycle.js';
import { addElement, addVectors, cloneElementVector, zeroElementVector } from './elementVector.js';
import { hiddenStemsOfBranch } from './hiddenStems.js';
export const DEFAULT_ELEMENT_DISTRIBUTION_OPTIONS = {
    heavenStemWeight: 1,
    branchTotalWeight: 1,
};
export function elementDistributionFromPillars(pillars, opts = {}) {
    const heavenStemWeight = opts.heavenStemWeight ?? DEFAULT_ELEMENT_DISTRIBUTION_OPTIONS.heavenStemWeight;
    const branchTotalWeight = opts.branchTotalWeight ?? DEFAULT_ELEMENT_DISTRIBUTION_OPTIONS.branchTotalWeight;
    const hsPolicy = opts.hiddenStemWeights ?? { scheme: 'standard' };
    const heaven = zeroElementVector();
    const hidden = zeroElementVector();
    for (const p of pillars) {
        // --- Heaven stem
        addElement(heaven, stemElement(p.stem), heavenStemWeight);
        // --- Hidden stems in branch
        for (const h of hiddenStemsOfBranch(p.branch, hsPolicy)) {
            addElement(hidden, stemElement(h.stem), branchTotalWeight * h.weight);
        }
    }
    const total = addVectors(cloneElementVector(heaven), hidden);
    return { heaven, hidden, total };
}
