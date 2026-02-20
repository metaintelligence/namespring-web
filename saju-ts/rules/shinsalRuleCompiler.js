function v(path) {
    return { var: path };
}
function lenOf(path) {
    return { op: 'len', args: [v(path)] };
}
function scoreExprFromCatalog(basePath, mode, presentProp = 'present') {
    if (mode === 'count')
        return v(`${basePath}.count`);
    if (mode === 'lenPresent')
        return lenOf(`${basePath}.${presentProp}`);
    return 1;
}
// ---------------------------------------------------------------------------
// Relation-based sal (facts.shinsal.relationSal.* already returns payload arrays)
// ---------------------------------------------------------------------------
export function buildRelationSalRules(defs) {
    return defs.map((d) => {
        const arrVar = `shinsal.relationSal.${d.name}`;
        const ruleId = d.id ?? `REL_${d.name}`;
        const scoreKey = d.scoreKey ?? `shinsal.${d.name}`;
        return {
            id: ruleId,
            when: { op: 'gt', args: [{ op: 'len', args: [v(arrVar)] }, 0] },
            score: { [scoreKey]: { op: 'len', args: [v(arrVar)] } },
            emit: v(arrVar),
            explain: d.explain,
            tags: d.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Derived: single branch presence in chart
// ---------------------------------------------------------------------------
export function buildBranchPresenceRules(defs) {
    return defs.map((d) => {
        return {
            id: d.id,
            when: { op: 'in', args: [v(d.targetVar), v('chart.branches')] },
            score: { [`shinsal.${d.name}`]: typeof d.score === 'number' ? d.score : 1 },
            emit: {
                name: d.name,
                category: d.category ?? null,
                basedOn: d.basedOn,
                targetBranch: v(d.targetVar),
            },
            explain: d.explain,
            tags: d.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Derived: pillar-branch membership in list
// ---------------------------------------------------------------------------
export function buildPillarBranchInListRules(args) {
    return args.pillars.map((p) => {
        const bVar = `chart.pillars.${p.pillar}.branch`;
        return {
            id: p.id,
            when: { op: 'in', args: [v(bVar), v(args.listVar)] },
            score: { [`shinsal.${args.name}`]: typeof p.score === 'number' ? p.score : 1 },
            emit: {
                name: args.name,
                category: (p.category ?? args.category) ?? null,
                basedOn: p.basedOn ?? 'OTHER',
                targetBranch: v(bVar),
                matchedPillars: [p.pillar],
                details: { pillar: p.pillar },
            },
            explain: p.explain,
            tags: p.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Catalog: dayStem/yearStem → branches
// ---------------------------------------------------------------------------
export function buildCatalogDayStemRules(defs, which = 'dayStem') {
    return defs.map((d) => {
        const basePath = `shinsal.catalog.${which}.${d.key}`;
        const ruleId = d.id ?? `${which.toUpperCase()}_${d.key}`;
        const name = d.name ?? d.key;
        const scoreExpr = typeof d.score === 'number'
            ? d.score
            : scoreExprFromCatalog(basePath, d.scoreMode ?? 'const1', 'present');
        return {
            id: ruleId,
            when: { op: 'gt', args: [v(`${basePath}.count`), 0] },
            score: { [`shinsal.${name}`]: scoreExpr },
            emit: {
                name,
                category: d.category ?? null,
                basedOn: 'OTHER',
                targetBranches: v(`${basePath}.present`),
                matchedPillars: v(`${basePath}.matchedPillars`),
            },
            explain: d.explain,
            tags: d.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Catalog: monthBranch → stems
// ---------------------------------------------------------------------------
export function buildCatalogMonthBranchStemRules(defs) {
    return defs.map((d) => {
        const basePath = `shinsal.catalog.monthBranchStem.${d.key}`;
        const ruleId = d.id ?? `MONTH_STEM_${d.key}`;
        const name = d.name ?? d.key;
        const scoreExpr = typeof d.score === 'number'
            ? d.score
            : scoreExprFromCatalog(basePath, d.scoreMode ?? 'count', 'present');
        const targetPart = d.emitPresentList
            ? { targetStems: v(`${basePath}.present`) }
            : { targetStem: v(`${basePath}.target`) };
        return {
            id: ruleId,
            when: { op: 'gt', args: [v(`${basePath}.count`), 0] },
            score: { [`shinsal.${name}`]: scoreExpr },
            emit: {
                name,
                category: d.category,
                basedOn: 'MONTH_BRANCH',
                matchedPillars: v(`${basePath}.matchedPillars`),
                ...targetPart,
            },
            explain: d.explain,
            tags: d.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Catalog: monthBranch → branches
// ---------------------------------------------------------------------------
export function buildCatalogMonthBranchBranchRules(defs) {
    return defs.map((d) => {
        const basePath = `shinsal.catalog.monthBranchBranch.${d.key}`;
        const ruleId = d.id ?? `MONTH_BRANCH_${d.key}`;
        const name = d.name ?? d.key;
        const scoreExpr = typeof d.score === 'number'
            ? d.score
            : scoreExprFromCatalog(basePath, d.scoreMode ?? 'count', 'present');
        const targetPart = d.emitPresentList
            ? { targetBranches: v(`${basePath}.present`) }
            : { targetBranch: v(`${basePath}.target`) };
        return {
            id: ruleId,
            when: { op: 'gt', args: [v(`${basePath}.count`), 0] },
            score: { [`shinsal.${name}`]: scoreExpr },
            emit: {
                name,
                category: d.category,
                basedOn: 'MONTH_BRANCH',
                matchedPillars: v(`${basePath}.matchedPillars`),
                ...targetPart,
            },
            explain: d.explain,
            tags: d.tags,
        };
    });
}
// ---------------------------------------------------------------------------
// Catalog: dayPillar → set membership (boolean)
// ---------------------------------------------------------------------------
export function buildCatalogDayPillarRules(defs) {
    return defs.map((d) => {
        const basePath = `shinsal.catalog.dayPillar.${d.key}`;
        const ruleId = d.id ?? `DAY_PILLAR_${d.key}`;
        const name = d.name ?? d.key;
        return {
            id: ruleId,
            when: { op: 'eq', args: [v(`${basePath}.active`), true] },
            score: { [`shinsal.${name}`]: typeof d.score === 'number' ? d.score : 1 },
            emit: {
                name,
                category: d.category,
                basedOn: 'OTHER',
                targetKind: 'NONE',
                matchedPillars: v(`${basePath}.matchedPillars`),
            },
            explain: d.explain,
            tags: d.tags,
        };
    });
}
