import type { TraceNode } from '../api/types.js';
import type { Context, Graph } from './types.js';
export declare function evaluate(graph: Graph, ctx: Context, wanted: string[]): {
    results: Map<string, unknown>;
    trace: {
        nodes: TraceNode[];
        edges: Array<{
            from: string;
            to: string;
        }>;
    };
};
