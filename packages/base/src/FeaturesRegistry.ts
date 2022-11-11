const features = new Map<string, any>();

const registerFeature = (name: string, feature: object) => {
	features.set(name, feature);
};

const getFeature = <T>(name: string): T => {
	return features.get(name) as T;
};

export {
	registerFeature,
	getFeature,
};
