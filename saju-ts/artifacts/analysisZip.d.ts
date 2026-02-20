import type { AnalysisBundle, Artifact } from '../api/types.js';
import type { NarrationOptions } from '../narration/buildNarration.js';
export type AnalysisZipInclude = 'bundle' | 'summary' | 'report' | 'facts' | 'trace' | 'diagnostics' | 'config' | 'narration';
export interface AnalysisZipOptions {
    /** Artifact key name to store the zip under. (Engine default: 'analysis.zip') */
    key?: string;
    /** If true, JSON files are pretty-printed (space=2). (default: false) */
    prettyJson?: boolean;
    /** Which parts to include. (default: ['summary','report','facts','trace','diagnostics','config','narration']) */
    include?: AnalysisZipInclude[];
    /** Zip compression level (0..9). (default: 6) */
    level?: number;
    /** Options for narration generation (narration.md / narration.json). */
    narration?: NarrationOptions;
}
export interface AnalysisZipManifest {
    kind: 'saju.analysis.zip';
    createdAt: string;
    schemaVersion: string;
    configDigest: string;
    files: Array<{
        path: string;
        bytes: number;
        sha256: string;
    }>;
}
/**
 * Pack the analysis bundle into a single ZIP artifact.
 *
 * This is intentionally "API-stability" focused:
 * - your top-level API can stay stable
 * - internal data can expand inside the zip without changing the contract
 */
export declare function packAnalysisBundleZip(bundle: AnalysisBundle, opts?: AnalysisZipOptions): Artifact;
/**
 * Unpack a ZIP artifact produced by `packAnalysisBundleZip`.
 *
 * Returns raw bytes and a best-effort JSON parse for `*.json` files.
 */
export declare function unpackAnalysisBundleZip(artifact: Artifact): {
    files: Record<string, Uint8Array>;
    text: Record<string, string>;
    json: Record<string, unknown>;
    manifest?: AnalysisZipManifest;
};
