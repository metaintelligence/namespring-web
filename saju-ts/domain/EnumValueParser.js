export function createEnumValueParser(enumName, sourceName, enumObject) {
    return createValueParser(enumName, sourceName, Object.values(enumObject));
}
export function createValueParser(valueName, sourceName, values) {
    const allowedValues = new Set(values);
    return (raw) => {
        if (allowedValues.has(raw))
            return raw;
        throw new Error(`Invalid ${valueName} in ${sourceName}: ${raw}`);
    };
}
//# sourceMappingURL=EnumValueParser.js.map