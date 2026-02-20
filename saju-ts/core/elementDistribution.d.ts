import type { PillarIdx } from './cycle.js';
import type { ElementVector } from './elementVector.js';
import type { HiddenStemWeightPolicy } from './hiddenStems.js';
export interface ElementDistribution {
    heaven: ElementVector;
    hidden: ElementVector;
    total: ElementVector;
}
export interface ElementDistributionOptions {
    heavenStemWeight?: number;
    branchTotalWeight?: number;
    hiddenStemWeights?: HiddenStemWeightPolicy;
}
export declare const DEFAULT_ELEMENT_DISTRIBUTION_OPTIONS: Required<Omit<ElementDistributionOptions, 'hiddenStemWeights'>>;
export declare function elementDistributionFromPillars(pillars: [PillarIdx, PillarIdx, PillarIdx, PillarIdx], opts?: ElementDistributionOptions): ElementDistribution;
