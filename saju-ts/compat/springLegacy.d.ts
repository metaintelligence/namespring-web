import type { EngineConfig } from '../api/types.js';
export type LegacyGender = 'MALE' | 'FEMALE';
export interface LegacyBirthInput {
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    birthHour?: number;
    birthMinute?: number;
    gender?: LegacyGender;
    calendarType?: 'SOLAR' | 'LUNAR';
    isLeapMonth?: boolean;
    timezone?: string;
    latitude?: number;
    longitude?: number;
    name?: string;
}
export interface LegacySajuOptions {
    daeunCount?: number;
    saeunStartYear?: number | null;
    saeunYearCount?: number;
}
export type LegacyDayCutMode = 'MIDNIGHT_00' | 'YAZA_23_TO_01_NEXTDAY' | 'YAZA_23_30_TO_01_30_NEXTDAY' | 'JOJA_SPLIT';
export type LegacyYazaMode = Extract<LegacyDayCutMode, 'YAZA_23_TO_01_NEXTDAY' | 'YAZA_23_30_TO_01_30_NEXTDAY'>;
export interface LegacySajuConfig {
    /**
     * Master switch for true-solar-time correction.
     * Default: false
     */
    trueSolarTimeEnabled?: boolean;
    dayCutMode?: LegacyDayCutMode;
    /**
     * Legacy EoT toggle used when trueSolarTimeEnabled=true.
     * Default: true
     */
    includeEquationOfTime?: boolean;
    /**
     * Apply manseoryeok baseline-meridian correction to longitude.
     * Default: true
     */
    longitudeCorrectionEnabled?: boolean;
    /**
     * Convenience switch for YAZA day-cut behavior.
     * - false: MIDNIGHT_00
     * - true:  yazaMode/dayCutMode or default YAZA_23_30_TO_01_30_NEXTDAY
     * Default: false
     */
    yazaEnabled?: boolean;
    yazaMode?: LegacyYazaMode;
    lmtBaselineLongitude?: number;
    calendar?: Partial<EngineConfig['calendar']>;
    toggles?: Partial<EngineConfig['toggles']>;
    weights?: EngineConfig['weights'];
    strategies?: EngineConfig['strategies'];
    extensions?: EngineConfig['extensions'];
    school?: EngineConfig['school'];
    schemaVersion?: string;
}
export declare function createBirthInput(params: LegacyBirthInput): LegacyBirthInput;
export declare function configFromPreset(preset: string): LegacySajuConfig;
export declare function analyzeSaju(birthInput: LegacyBirthInput, rawConfig?: unknown, options?: LegacySajuOptions): {
    pillars: {
        year: {
            cheongan: string;
            jiji: string;
        };
        month: {
            cheongan: string;
            jiji: string;
        };
        day: {
            cheongan: string;
            jiji: string;
        };
        hour: {
            cheongan: string;
            jiji: string;
        };
    };
    coreResult: {
        standardYear: number;
        standardMonth: number;
        standardDay: number;
        standardHour: number;
        standardMinute: number;
        adjustedYear: number;
        adjustedMonth: number;
        adjustedDay: number;
        adjustedHour: number;
        adjustedMinute: number;
        dstCorrectionMinutes: number;
        longitudeCorrectionMinutes: number;
        equationOfTimeMinutes: number;
    };
    strengthResult: {
        dayMasterElement: string;
        level: string;
        isStrong: boolean;
        score: {
            totalSupport: number;
            totalOppose: number;
            deukryeong: number;
            deukji: number;
            deukse: number;
        };
        details: string[];
    };
    yongshinResult: {
        finalYongshin: string;
        finalHeesin: string | null;
        gisin: string | null;
        gusin: string | null;
        finalConfidence: number;
        agreement: string;
        recommendations: {
            type: string;
            primaryElement: string;
            secondaryElement: string;
            confidence: number;
            reasoning: string;
        }[];
    };
    gyeokgukResult: {
        type: string;
        category: string;
        baseSipseong: string | null;
        confidence: number;
        reasoning: string;
    };
    ohaengDistribution: {
        WOOD: number;
        FIRE: number;
        EARTH: number;
        METAL: number;
        WATER: number;
    };
    deficientElements: string[];
    excessiveElements: string[];
    cheonganRelations: {
        type: string;
        members: any;
        resultOhaeng: string | null;
        note: string;
    }[];
    scoredCheonganRelations: never[];
    jijiRelations: {
        type: string;
        members: any;
        note: string;
        outcome: string | null;
        reasoning: null;
    }[];
    resolvedJijiRelations: never[];
    tenGodAnalysis: {
        dayMaster: string;
        byPosition: Record<string, any>;
    };
    shinsalHits: {
        type: string;
        position: string;
        grade: string;
    }[];
    weightedShinsalHits: {
        hit: {
            type: string;
            position: string;
            grade: string;
        };
        baseWeight: number;
        positionMultiplier: number;
        weightedScore: number;
    }[];
    shinsalComposites: never[];
    gongmangVoidBranches: [] | [string, string];
    daeunInfo: {
        isForward: boolean;
        firstDaeunStartAge: number;
        firstDaeunStartMonths: number;
        boundaryMode: string;
        warnings: never[];
        daeunPillars: any;
    };
    saeunPillars: any;
    trace: {
        key: string;
        summary: string;
        evidence: any;
        citations: never[];
        reasoning: string[];
        confidence: null;
    }[];
};
