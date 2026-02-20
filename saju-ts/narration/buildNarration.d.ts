import type { AnalysisBundle } from '../api/types.js';
export type NarrationLanguage = 'ko' | 'en';
export interface NarrationOptions {
    language?: NarrationLanguage;
    /** Max number of shinsal hits to print in the markdown narrative. */
    maxShinsal?: number;
}
export interface NarrationArtifact {
    language: NarrationLanguage;
    markdown: string;
    meta: {
        engineName?: string;
        engineVersion?: string;
        createdAtUtc: string;
    };
}
export declare function buildNarrationArtifact(bundle: AnalysisBundle, opts?: NarrationOptions): NarrationArtifact;
