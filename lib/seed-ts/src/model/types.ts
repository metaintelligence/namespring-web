import type { HanjaEntry } from '../database/hanja-repository.js';

export interface BirthInfo {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly gender: 'male' | 'female';
  readonly isLunar?: boolean;
  readonly timezone?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly name?: string;
}

export interface NameCharInput {
  readonly hangul: string;
  readonly hanja?: string;
}

export interface SeedRequest {
  readonly birth: BirthInfo;
  readonly surname: NameCharInput[];
  readonly givenName?: NameCharInput[];
  readonly givenNameLength?: number;
  readonly mode?: 'auto' | 'evaluate' | 'recommend' | 'all';
  readonly options?: SeedOptions;
}

export interface SeedOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly schoolPreset?: 'korean' | 'chinese' | 'modern';
  readonly weights?: ScoreWeights;
  readonly sajuConfig?: Record<string, unknown>;
  readonly sajuOptions?: {
    readonly daeunCount?: number;
    readonly saeunStartYear?: number | null;
    readonly saeunYearCount?: number;
  };
}

export interface ScoreWeights {
  readonly hangul?: number;
  readonly hanja?: number;
  readonly fourFrame?: number;
  readonly saju?: number;
}

export interface SeedResponse {
  readonly request: SeedRequest;
  readonly mode: 'evaluate' | 'recommend' | 'all';
  readonly saju: SajuSummary;
  readonly candidates: SeedCandidate[];
  readonly totalCount: number;
  readonly meta: {
    readonly version: string;
    readonly timestamp: string;
  };
}

export interface SeedCandidate {
  readonly name: {
    readonly surname: CharDetail[];
    readonly givenName: CharDetail[];
    readonly fullHangul: string;
    readonly fullHanja: string;
  };
  readonly scores: {
    readonly total: number;
    readonly hangul: number;
    readonly hanja: number;
    readonly fourFrame: number;
    readonly saju: number;
  };
  readonly analysis: {
    readonly hangul: HangulAnalysis;
    readonly hanja: HanjaAnalysis;
    readonly fourFrame: FourFrameAnalysis;
    readonly saju: SajuCompatibility;
  };
  readonly interpretation: string;
  readonly rank: number;
}

export interface CharDetail {
  readonly hangul: string;
  readonly hanja: string;
  readonly meaning: string;
  readonly strokes: number;
  readonly element: string;
  readonly polarity: string;
}

export interface HangulAnalysis {
  readonly blocks: Array<{
    hangul: string;
    onset: string;
    nucleus: string;
    element: string;
    polarity: string;
  }>;
  readonly polarityScore: number;
  readonly elementScore: number;
}

export interface HanjaAnalysis {
  readonly blocks: Array<{
    hanja: string;
    hangul: string;
    strokes: number;
    resourceElement: string;
    strokeElement: string;
    polarity: string;
  }>;
  readonly polarityScore: number;
  readonly elementScore: number;
}

export interface FourFrameAnalysis {
  readonly frames: Array<{
    type: 'won' | 'hyung' | 'lee' | 'jung';
    strokeSum: number;
    element: string;
    polarity: string;
    luckyLevel: number;
  }>;
  readonly elementScore: number;
  readonly luckScore: number;
}

export interface SajuCompatibility {
  readonly yongshinElement: string;
  readonly heeshinElement: string | null;
  readonly gishinElement: string | null;
  readonly nameElements: string[];
  readonly yongshinMatchCount: number;
  readonly yongshinGeneratingCount: number;
  readonly gishinMatchCount: number;
  readonly gishinOvercomingCount: number;
  readonly deficiencyFillCount: number;
  readonly excessiveAvoidCount: number;
  readonly dayMasterSupportScore: number;
  readonly affinityScore: number;
}

/**
 * saju-ts 분석 결과의 구조화된 요약.
 *
 * **설계 원칙 — serialize-first, transform-as-needed:**
 * - `serialize(SajuAnalysis)`로 saju-ts 전체 필드가 자동 포함됨
 * - seed-ts가 값을 보강/변환하는 필드만 아래에 명시적으로 타입 선언
 * - saju-ts에 새 필드가 추가되면 자동으로 이 객체에 포함됨 (코드 변경 불필요)
 * - 명시된 필드는 원본 대비 보강된 버전 (hangul/hanja, element 파생 등)
 * - 원본 saju-ts 필드는 원래 이름으로도 접근 가능 (예: strengthResult, yongshinResult)
 */
export interface SajuSummary {
  // ── seed-ts가 보강/변환하는 필드 (stable contract) ──

  /** 사주 기둥 — hangul/hanja 보강 */
  readonly pillars: {
    readonly year: PillarSummary;
    readonly month: PillarSummary;
    readonly day: PillarSummary;
    readonly hour: PillarSummary;
  };
  /** 시간 보정 — 보정 전(standard*) + 보정 후(adjusted*) */
  readonly timeCorrection: TimeCorrectionSummary;
  /** 일주 — element/polarity를 stem 코드에서 파생 */
  readonly dayMaster: { readonly stem: string; readonly element: string; readonly polarity: string };
  /** 신강/신약 — strengthResult에서 score 평탄화 */
  readonly strength: StrengthSummary;
  /** 용신 — yongshinResult에서 필드명 정규화 */
  readonly yongshin: YongshinSummary;
  /** 격국 — gyeokgukResult에서 필드명 정규화 */
  readonly gyeokguk: GyeokgukSummary;
  /** 오행 분포 — Map에서 Record로 변환됨 */
  readonly ohaengDistribution: Record<string, number>;
  /** seed-ts가 계산한 부족/과잉 오행 */
  readonly deficientElements: string[];
  readonly excessiveElements: string[];
  /** 천간 관계 — scoredCheonganRelations의 점수 병합 */
  readonly cheonganRelations: CheonganRelationSummary[];
  /** 지지 관계 — resolvedJijiRelations 우선 사용 */
  readonly jijiRelations: JijiRelationSummary[];
  /** 십신 — hiddenStems element 파생, hiddenStemSipseong stem 추출 */
  readonly tenGodAnalysis: TenGodSummary | null;
  /** 신살 — weightedShinsalHits 우선, grade 파생 */
  readonly shinsalHits: ShinsalHitSummary[];
  /** 공망 — gongmangVoidBranches에서 rename */
  readonly gongmang: [string, string] | null;

  // ── saju-ts 자동 패스스루 (index signature) ──
  // saju-ts에 새 필드 추가 시 자동 포함, 코드 변경 불필요
  readonly [key: string]: unknown;
}

export interface PillarSummary {
  readonly stem: { readonly code: string; readonly hangul: string; readonly hanja: string };
  readonly branch: { readonly code: string; readonly hangul: string; readonly hanja: string };
}

export interface TimeCorrectionSummary {
  readonly standardYear: number;
  readonly standardMonth: number;
  readonly standardDay: number;
  readonly standardHour: number;
  readonly standardMinute: number;
  readonly adjustedYear: number;
  readonly adjustedMonth: number;
  readonly adjustedDay: number;
  readonly adjustedHour: number;
  readonly adjustedMinute: number;
  readonly dstCorrectionMinutes: number;
  readonly longitudeCorrectionMinutes: number;
  readonly equationOfTimeMinutes: number;
}

export interface StrengthSummary {
  readonly level: string;
  readonly isStrong: boolean;
  readonly totalSupport: number;
  readonly totalOppose: number;
  readonly deukryeong: number;
  readonly deukji: number;
  readonly deukse: number;
  readonly details: string[];
}

export interface YongshinSummary {
  readonly element: string;
  readonly heeshin: string | null;
  readonly gishin: string | null;
  readonly gushin: string | null;
  readonly confidence: number;
  readonly agreement: string;
  readonly recommendations: YongshinRecommendationSummary[];
}

export interface YongshinRecommendationSummary {
  readonly type: string;
  readonly primaryElement: string;
  readonly secondaryElement: string | null;
  readonly confidence: number;
  readonly reasoning: string;
}

export interface GyeokgukSummary {
  readonly type: string;
  readonly category: string;
  readonly baseSipseong: string | null;
  readonly confidence: number;
  readonly reasoning: string;
}

export interface CheonganRelationSummary {
  readonly type: string;
  readonly stems: string[];
  readonly resultElement: string | null;
  readonly note: string;
  readonly score: CheonganRelationScoreSummary | null;
}

export interface CheonganRelationScoreSummary {
  readonly baseScore: number;
  readonly adjacencyBonus: number;
  readonly outcomeMultiplier: number;
  readonly finalScore: number;
  readonly rationale: string;
}

export interface HapHwaEvaluationSummary {
  readonly stem1: string;
  readonly stem2: string;
  readonly position1: string;
  readonly position2: string;
  readonly resultElement: string;
  readonly state: string;
  readonly confidence: number;
  readonly reasoning: string;
  readonly dayMasterInvolved: boolean;
}

export interface JijiRelationSummary {
  readonly type: string;
  readonly branches: string[];
  readonly note: string;
  readonly outcome: string | null;
  readonly reasoning: string | null;
}

export interface TenGodSummary {
  readonly dayMaster: string;
  readonly byPosition: Record<string, TenGodPositionSummary>;
}

export interface TenGodPositionSummary {
  readonly cheonganSipseong: string;
  readonly jijiPrincipalSipseong: string;
  readonly hiddenStems: Array<{ readonly stem: string; readonly element: string; readonly ratio: number }>;
  readonly hiddenStemSipseong: Array<{ readonly stem: string; readonly sipseong: string }>;
}

export interface ShinsalHitSummary {
  readonly type: string;
  readonly position: string;
  readonly grade: string;
  readonly baseWeight: number;
  readonly positionMultiplier: number;
  readonly weightedScore: number;
}

export interface ShinsalCompositeSummary {
  readonly patternName: string;
  readonly interactionType: string;
  readonly interpretation: string;
  readonly bonusScore: number;
}

export interface PalaceSummary {
  readonly position: string;
  readonly koreanName: string;
  readonly domain: string;
  readonly agePeriod: string;
  readonly bodyPart: string;
  readonly sipseong: string | null;
  readonly familyRelation: string | null;
}

export interface DaeunSummary {
  readonly isForward: boolean;
  readonly firstDaeunStartAge: number;
  readonly firstDaeunStartMonths: number;
  readonly boundaryMode: string;
  readonly warnings: string[];
  readonly pillars: DaeunPillarSummary[];
}

export interface DaeunPillarSummary {
  readonly stem: string;
  readonly branch: string;
  readonly startAge: number;
  readonly endAge: number;
  readonly order: number;
}

export interface SaeunPillarSummary {
  readonly year: number;
  readonly stem: string;
  readonly branch: string;
}

export interface TraceSummary {
  readonly key: string;
  readonly summary: string;
  readonly evidence: string[];
  readonly citations: string[];
  readonly reasoning: string[];
  readonly confidence: number | null;
}

export type Gender = 'male' | 'female';

export interface BirthDateTime {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
}
export interface UserInfo {
  readonly lastName: HanjaEntry[];
  readonly firstName: HanjaEntry[];
  readonly birthDateTime: BirthDateTime;
  readonly gender: Gender;
}
export interface NamingResult {
  readonly lastName: HanjaEntry[];
  readonly firstName: HanjaEntry[];
  readonly totalScore: number;
  readonly hanja: unknown;
  readonly hangul: unknown;
  readonly fourFrames: unknown;
  readonly interpretation: string;
}
export interface SeedResult {
  readonly candidates: NamingResult[];
  readonly totalCount: number;
}
