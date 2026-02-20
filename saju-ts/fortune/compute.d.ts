import type { EngineConfig, SajuRequest } from '../api/types.js';
import type { JieBoundariesAround, SolarTermMethod } from '../calendar/solarTerms.js';
import type { LocalDateTime } from '../calendar/iso.js';
import type { PillarIdx } from '../core/cycle.js';
import type { FortunePolicy, FortuneTimeline } from './types.js';
export declare function computeFortuneTimeline(args: {
    request: SajuRequest;
    parsedUtcMs: number;
    birthLocalDateTime: LocalDateTime;
    localYear: number;
    calendar: EngineConfig['calendar'];
    solarTermMethod: SolarTermMethod;
    jieBoundariesAround: JieBoundariesAround | null;
    natalYearPillar: PillarIdx;
    natalMonthPillar: PillarIdx;
    policy: FortunePolicy;
}): FortuneTimeline;
