import { DaeunBoundaryMode } from '../../domain/DaeunInfo.js';
export interface BoundaryDistance {
    readonly totalMinutes: number;
    readonly mode: DaeunBoundaryMode;
    readonly warning?: string;
}
export declare function minutesBetween(y1: number, mo1: number, d1: number, h1: number, mi1: number, y2: number, mo2: number, d2: number, h2: number, mi2: number): number;
export declare function daysInMonth(year: number, month: number): number;
export declare function minutesToBoundaryExact(year: number, month: number, day: number, hour: number, minute: number, isForward: boolean): number | undefined;
export declare function minutesToBoundaryApprox(year: number, month: number, day: number, hour: number, minute: number, isForward: boolean): number;
export declare function boundaryDistance(year: number, month: number, day: number, hour: number, minute: number, isForward: boolean): BoundaryDistance;
//# sourceMappingURL=DaeunBoundaryHelpers.d.ts.map