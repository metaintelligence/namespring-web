export interface CompetitionResult {
    methods: string[];
    power: number;
    minKeep: number;
    /** The (clamped) signals actually used for share computation. */
    signals: Record<string, number>;
    shares: Record<string, number>;
    multipliers: Record<string, number>;
}
/**
 * Compute softmax-like shares and floor-multipliers for a set of competing methods.
 *
 * - signals are expected in [0,1] but we defensively clamp
 * - shares are computed from signal^power (winner-take-more when power>1)
 * - multipliers are computed as: minKeep + (1-minKeep)*share
 */
export declare function compete(methods: string[], signalsIn: Record<string, number>, opts: {
    power: number;
    minKeep: number;
}): CompetitionResult;
/**
 * Scale factor to preserve mass: scale = before/after.
 * Returned scale is always finite and positive.
 */
export declare function renormalizeScale(totalBefore: number, totalAfter: number): number;
