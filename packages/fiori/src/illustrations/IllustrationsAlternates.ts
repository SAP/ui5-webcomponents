import tntMappings from "./tnt/theme-mappings.json";
import baseMappings from "./theme-mappings.json";

type MappingFn = (theme: string, key: string) => string;

const mappings: Map<string, MappingFn> = new Map();

const registerMapping = (set: string, mappingFn: MappingFn) => {
	mappings.set(mappingFn.name, mappingFn);
};

const getIllustrationAlternateType = (theme: string, key: string): string => {
	const set = getSet(key);
	const mappingFn = mappings.get(set);

	if (mappingFn) {
		return mappingFn(theme, key);
	}
	return key;
};

const getSet = (key: string): string => {
	if (key.startsWith("Tnt")) {
		return "tnt";
	}
	return "base";
};

const tntMappingsFn: MappingFn = (theme: string, key: string) => {
	const type = key.substring(3);
	const mapping = tntMappings.find(m => m.theme === theme);

	if (!mapping) {
		return key;
	}

	const alternateType = mapping.mappings[type as keyof typeof mapping.mappings];
	return `Tnt${alternateType || type}`;
};

const baseMappingsFn: MappingFn = (theme: string, key: string) => {
	const type = key;
	const mapping = baseMappings.find(m => m.theme === theme);

	if (!mapping) {
		return key;
	}

	const alternateType = mapping.mappings[type as keyof typeof mapping.mappings];
	return alternateType || type;
};

registerMapping("base", baseMappingsFn);
registerMapping("tnt", tntMappingsFn);

export {
	registerMapping,
	getIllustrationAlternateType,
};
