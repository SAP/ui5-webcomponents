const features = new Map();

const registerFeature = (name, feature) => {
	features.set(name, feature);
};

const deregisterFeature = name => {
	const destroyMethod = features.get(name).destroy();
	if (typeof destroyMethod === "function") {
		destroyMethod();
	}

	features.delete(name);
};

const getFeature = name => {
	return features.get(name);
};

export {
	registerFeature,
	getFeature,
	deregisterFeature,
};
