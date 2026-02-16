import { Gender } from './Gender.js';
export interface BirthInput {
    readonly birthYear: number;
    readonly birthMonth: number;
    readonly birthDay: number;
    readonly birthHour: number;
    readonly birthMinute: number;
    readonly gender: Gender;
    readonly timezone: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly name?: string;
}
export declare function createBirthInput(params: {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour: number;
    birthMinute: number;
    gender: Gender;
    timezone?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
}): BirthInput;
export interface AnalysisTraceStep {
    readonly key: string;
    readonly summary: string;
    readonly evidence: readonly string[];
    readonly citations: readonly string[];
    readonly reasoning: readonly string[];
    readonly confidence: number | null;
}
//# sourceMappingURL=types.d.ts.map