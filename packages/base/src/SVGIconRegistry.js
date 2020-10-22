import { getSharedResource, getSharedResourcePolicy } from "./SharedResources.js";
import SharedResourceType from "./types/SharedResourceType.js";
import SharedResourceReusePolicy from "./types/SharedResourceReusePolicy.js";

const policy = getSharedResourcePolicy(SharedResourceType.SVGIcons); // shared resource policy for SVG Icons
let registry = new Map();
let iconCollectionPromises = new Map();

const SVGIcons = getSharedResource("SVGIcons", {
	registry: new Map(),
	promises: new Map(),
});

if (policy !== SharedResourceReusePolicy.Never) {
	registry = SVGIcons.registry;
	iconCollectionPromises = SVGIcons.promises;
}

const ICON_NOT_FOUND = "ICON_NOT_FOUND";
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

const registerIcon = (name, { pathData, ltr, accData, collection } = {}) => { // eslint-disable-line
	const key = calcKey(name, collection);
	registry.set(key, { pathData, ltr, accData });
};

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);
	return registry.get(key);
};

const getIconData = async (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);

	if (!iconCollectionPromises.has(collection)) {
		iconCollectionPromises.set(collection, Promise.resolve(ICON_NOT_FOUND));
	}

	const iconData = await iconCollectionPromises.get(collection);

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

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
