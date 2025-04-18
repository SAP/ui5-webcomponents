type LowercaseEnum<T> = T extends string ? Lowercase<T> : never;

export default function toLowercaseEnumValue<T extends string>(value: T): LowercaseEnum<T> {
	return value.toLowerCase() as LowercaseEnum<T>;
}
