import { SchoolPreset } from './CalculationConfig.js';
export interface ConfigOption {
    readonly key: string;
    readonly koreanName: string;
    readonly description: string;
    readonly defaultValue: string;
    readonly possibleValues: readonly string[];
    readonly affectedCalculation: string;
}
export interface ConfigDifference {
    readonly key: string;
    readonly koreanMainstreamValue: string;
    readonly presetValue: string;
    readonly reasoning: string;
}
export declare const ConfigDocumentation: {
    readonly allOptions: () => readonly ConfigOption[];
    readonly presetDifferences: (preset: SchoolPreset) => readonly ConfigDifference[];
};
//# sourceMappingURL=ConfigDocumentation.d.ts.map