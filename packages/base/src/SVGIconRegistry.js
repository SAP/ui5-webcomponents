const registry = new Map();
const iconCollectionPromises = new Map();

const DEFAULT_COLLECTION = "SAP-icons";

const calcKey = (name, collection) => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
		[name, collection] = name.split("/").reverse();
	}
	collection = collection || DEFAULT_COLLECTION;
	return `${collection}:${name}`;
};

const registerIcon = (name, { pathData, accData, collection } = {}) => {
	const key = calcKey(name, collection);
	registry.set(key, { pathData, accData });
};

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);
	return registry.get(key);
};

const getIconData = async (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);

	if (!iconCollectionPromises.has(collection)) {
		iconCollectionPromises.set(collection, Promise.reject());
	}

	await iconCollectionPromises.get(collection);
	return registry.get(key);
};

const getRegisteredNames = async () => {
	if (iconCollectionPromises.has(DEFAULT_COLLECTION)) {
		await iconCollectionPromises.get(DEFAULT_COLLECTION);
	}
	return Array.from(registry.keys()).map(k => k.split(":")[1]);
};

const registerCollectionPromise = (collection, promise) => {
	iconCollectionPromises.set(collection, promise);
};

export {
	getIconData,
	getIconDataSync,
	registerIcon,
	getRegisteredNames,
	registerCollectionPromise,
};
