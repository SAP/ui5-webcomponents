import getSharedResource from "./getSharedResource.js";

const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const DEFAULT_COLLECTION = "SAP-icons";

const parseName = name => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
	}

	let collection;
	[name, collection] = name.split("/").reverse();
	collection = collection || DEFAULT_COLLECTION;
	// hardcoded alias in case icon explorer is used, resolve `SAP-icons-TNT` to `tnt`
	// aliases can be made a feature in the future if more collections need it or more aliases are needed.
	if (collection === "SAP-icons-TNT") {
		collection = "tnt";
	}
	const registryKey = `${collection}/${name}`;
	return { name, collection, registryKey };
};


const registerIcon = (name, { pathData, ltr, accData, collection } = {}) => { // eslint-disable-line
	if (!collection) {
		collection = DEFAULT_COLLECTION;
	}

	const key = `${collection}/${name}`;
	registry.set(key, { pathData, ltr, accData });
};

const getIconDataSync = nameProp => {
	const { registryKey } = parseName(nameProp);
	return registry.get(registryKey);
};

const getIconData = async nameProp => {
	const { collection, registryKey } = parseName(nameProp);

	if (!iconCollectionPromises.has(collection)) {
		iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
	}

	const iconData = await iconCollectionPromises.get(collection);

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	return registry.get(registryKey);
};

const getRegisteredNames = async () => {
	await Promise.all(Array.from(iconCollectionPromises.values()));
	return Array.from(registry.keys());
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
