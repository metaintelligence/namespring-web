/**
 * Minimal base64 helpers for both Node and browser-ish runtimes.
 *
 * - In Node: uses Buffer.
 * - In browsers: falls back to btoa/atob with chunking.
 */
export declare function toBase64(bytes: Uint8Array): string;
export declare function fromBase64(b64: string): Uint8Array;
