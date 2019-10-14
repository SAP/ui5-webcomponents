const kebabToCamelCase = string => toCamelCase(string.split("-"));

const camelToKebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const toCamelCase = parts => {
	return parts.map((string, index) => {
		return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}).join("");
};

export { kebabToCamelCase, camelToKebabCase };
