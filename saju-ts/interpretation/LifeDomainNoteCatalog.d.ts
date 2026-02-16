interface LifeDomainNoteCatalogData {
    readonly career: {
        readonly gyeokgukNotes: Readonly<Record<string, string>>;
        readonly monthNotes: Readonly<Record<string, string>>;
        readonly shinsalNotes: Readonly<Record<string, string>>;
    };
    readonly health: {
        readonly excessNotes: Readonly<Record<string, string>>;
        readonly absentNotes: Readonly<Record<string, string>>;
        readonly dayMasterNotes: Readonly<Record<string, string>>;
        readonly shinsalNotes: Readonly<Record<string, string>>;
    };
    readonly love: {
        readonly shinsalNotes: Readonly<Record<string, string>>;
    };
    readonly wealth: {
        readonly shinsalNotes: Readonly<Record<string, string>>;
    };
}
export declare const LIFE_DOMAIN_NOTE_CATALOG: LifeDomainNoteCatalogData;
export {};
//# sourceMappingURL=LifeDomainNoteCatalog.d.ts.map