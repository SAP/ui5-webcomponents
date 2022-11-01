const features = new Map<string, object>();

const registerFeature = (name: string, feature: object) => {
	features.set(name, feature);
};

const getFeature = (name: string) => {
	return features.get(name);
};

export {
	registerFeature,
	getFeature,
};
