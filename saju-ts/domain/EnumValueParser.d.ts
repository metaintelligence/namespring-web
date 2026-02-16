export declare function createEnumValueParser<T extends string>(enumName: string, sourceName: string, enumObject: Record<string, T>): (raw: string) => T;
export declare function createValueParser<T extends string>(valueName: string, sourceName: string, values: readonly T[]): (raw: string) => T;
//# sourceMappingURL=EnumValueParser.d.ts.map