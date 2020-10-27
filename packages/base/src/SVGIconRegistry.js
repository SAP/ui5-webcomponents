import { getSharedResource, getSharedResourcePolicy } from "./SharedResources.js";
import SharedResourceType from "./types/SharedResourceType.js";
import SharedResourceReusePolicy from "./types/SharedResourceReusePolicy.js";
import {
	getCurrentRuntimeIndex,
	compareCurrentRuntimeWith,
} from "./Runtimes.js";

const policy = getSharedResourcePolicy(SharedResourceType.SVGIcons); // shared resource policy for SVG Icons
const iconKeysCache = new Map();
let registry;
let iconCollectionPromises;

// Never reuse policy - have local resources, emulate exactly the same behavior as before reuse policies were created
if (policy === SharedResourceReusePolicy.Never) {
	registry = new Map();
	iconCollectionPromises = new Map();
// Always reuse or OnlyNewer - use the shared resources
} else {
	const SVGIcons = getSharedResource("SVGIcons", {
		registry: new Map(),
		promises: new Map(),
	});
	registry = SVGIcons.registry;
	iconCollectionPromises = SVGIcons.promises;
}

const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const DEFAULT_COLLECTION = "SAP-icons";

const calcKey = (name, collection) => {
	const cacheId = `${name} ${collection}`;

	if (!iconKeysCache.has(cacheId)) {
		// silently support ui5-compatible URIs
		if (name.startsWith("sap-icon://")) {
			name = name.replace("sap-icon://", "");
			[name, collection] = name.split("/").reverse();
		}
		collection = collection || DEFAULT_COLLECTION;
		iconKeysCache.set(cacheId, `${collection}:${name}`);
	}

	return iconKeysCache.get(cacheId);
};

const registerIcon = (name, { pathData, ltr, accData, collection } = {}) => { // eslint-disable-line
	const key = calcKey(name, collection);

	// Never reuse policy - update the local registry
	if (policy === SharedResourceReusePolicy.Never) {
		registry.set(key, { pathData, ltr, accData });
		return;
	}

	// Policy is Always or OnlyNewer - look for the icon in the shared registry
	const iconData = registry.get(key); // check if the icon is already in the shared registry

	// Update the shared registry only if the icon is not there, or it is there, but the current runtime is newer than the icon's runtime, and the reuse policy is OnlyNewer
	if (!iconData || (policy === SharedResourceReusePolicy.OnlyNewer && compareCurrentRuntimeWith(iconData.runtimeIndex) > 0)) {
		const runtimeIndex = getCurrentRuntimeIndex();
		registry.set(key, {
			pathData,
			ltr,
			accData,
			runtimeIndex,
		});
	}
};

const getIconDataSync = (name, collection = DEFAULT_COLLECTION) => {
	const key = calcKey(name, collection);
	const iconData = registry.get(key);

	// Icon not found in the registry - must fetch it
	if (!iconData) {
		return;
	}

	// Never reuse policy - act as before, return the icon from the local registry
	if (policy === SharedResourceReusePolicy.Never) {
		return iconData;
	}

	// Return the icon if policy is Always reuse (no matter what version) or policy is OnlyNewer and the current runtime is the same version or older than the icon's runtime
	if (policy === SharedResourceReusePolicy.Always || (policy === SharedResourceReusePolicy.OnlyNewer && compareCurrentRuntimeWith(iconData.runtimeIndex) <= 0)) {
		return iconData;
	}
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
	// Never reuse policy - use the local registry
	if (policy === SharedResourceReusePolicy.Never) {
		iconCollectionPromises.set(collection, promise);
		return;
	}

	// Always or OnlyNewer - look for the promise in the shared registry
	const registeredPromise = iconCollectionPromises.get(collection);

	// If promise not found, or found, but reuse policy is OnlyNewer and the current runtime is newer than the promise's runtime
	if (!registeredPromise || (policy === SharedResourceReusePolicy.OnlyNewer && compareCurrentRuntimeWith(registeredPromise.runtimeIndex) > 0)) {
		promise.runtimeIndex = getCurrentRuntimeIndex(); // save the version of the runtime that registered this promise for future comparisons
		iconCollectionPromises.set(collection, promise);
	}
};

const fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		const iconData = bundleData.data[iconName];

		registerIcon(iconName, {
			pathData: iconData.path,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
		});
	});
};

export {
	getIconData,
	getIconDataSync,
	registerIcon,
	getRegisteredNames,
	registerCollectionPromise,
	fillRegistry,
};
