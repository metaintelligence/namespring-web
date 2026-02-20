import type { Rule } from './dsl.js';
import type { ShinsalBasedOn } from './shinsal.js';
/**
 * Shinsal ruleset “compiler” helpers.
 *
 * These helpers generate repetitive JSON-DSL boilerplate from compact meta-spec objects.
 * The goal is: adding a new shinsal == adding a small data entry, not duplicating rules.
 */
export type PillarName = 'year' | 'month' | 'day' | 'hour';
export type ScoreMode = 'const1' | 'count' | 'lenPresent';
export declare function buildRelationSalRules(defs: Array<{
    name: string;
    id?: string;
    explain?: string;
    scoreKey?: string;
    tags?: string[];
}>): Rule[];
export declare function buildBranchPresenceRules(defs: Array<{
    id: string;
    name: string;
    basedOn: ShinsalBasedOn;
    targetVar: string;
    explain?: string;
    score?: number;
    category?: string;
    tags?: string[];
}>): Rule[];
export declare function buildPillarBranchInListRules(args: {
    name: string;
    listVar: string;
    pillars: Array<{
        pillar: PillarName;
        id: string;
        explain?: string;
        basedOn?: ShinsalBasedOn;
        score?: number;
        category?: string;
        tags?: string[];
    }>;
    category?: string;
}): Rule[];
export declare function buildCatalogDayStemRules(defs: Array<{
    key: string;
    name?: string;
    id?: string;
    scoreMode?: ScoreMode;
    score?: number;
    explain?: string;
    category?: string;
    tags?: string[];
}>, which?: 'dayStem' | 'yearStem'): Rule[];
export declare function buildCatalogMonthBranchStemRules(defs: Array<{
    key: string;
    name?: string;
    id?: string;
    scoreMode?: ScoreMode;
    score?: number;
    emitPresentList?: boolean;
    explain?: string;
    category?: string;
    tags?: string[];
}>): Rule[];
export declare function buildCatalogMonthBranchBranchRules(defs: Array<{
    key: string;
    name?: string;
    id?: string;
    scoreMode?: ScoreMode;
    score?: number;
    emitPresentList?: boolean;
    explain?: string;
    category?: string;
    tags?: string[];
}>): Rule[];
export declare function buildCatalogDayPillarRules(defs: Array<{
    key: string;
    name?: string;
    id?: string;
    score?: number;
    explain?: string;
    category?: string;
    tags?: string[];
}>): Rule[];
