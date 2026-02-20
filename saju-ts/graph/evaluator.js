export function evaluate(graph, ctx, wanted) {
    const cache = new Map();
    const visiting = new Set();
    const traceNodes = [];
    const edges = [];
    const uniqEdge = (from, to) => `${from}→${to}`;
    const seenEdges = new Set();
    const get = (id) => {
        if (cache.has(id))
            return cache.get(id);
        if (visiting.has(id))
            throw new Error(`Cycle detected at node: ${id}`);
        const node = graph.get(id);
        if (!node)
            throw new Error(`Unknown node id: ${id}`);
        visiting.add(id);
        const input = {};
        for (const dep of node.deps) {
            const v = get(dep);
            input[dep] = v;
            const k = uniqEdge(dep, id);
            if (!seenEdges.has(k)) {
                seenEdges.add(k);
                edges.push({ from: dep, to: id });
            }
        }
        const output = node.compute(ctx, get);
        cache.set(id, output);
        traceNodes.push({
            id: node.id,
            deps: [...node.deps],
            formula: node.formula,
            explain: node.explain,
            input,
            output,
        });
        visiting.delete(id);
        return output;
    };
    for (const id of wanted)
        get(id);
    return {
        results: cache,
        trace: {
            nodes: traceNodes,
            edges,
        },
    };
}
