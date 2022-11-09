const kebabToCamelMap = new Map<string, string>();
const camelToKebabMap = new Map<string, string>();

const kebabToCamelCase = (string: string) => {
	if (!kebabToCamelMap.has(string)) {
		const result = toCamelCase(string.split("-"));
		kebabToCamelMap.set(string, result);
	}
	return kebabToCamelMap.get(string)!;
};

const camelToKebabCase = (string: string) => {
	if (!camelToKebabMap.has(string)) {
		const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		camelToKebabMap.set(string, result);
	}
	return camelToKebabMap.get(string)!;
};

const toCamelCase = (parts: Array<string>) => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};

export { kebabToCamelCase, camelToKebabCase };
