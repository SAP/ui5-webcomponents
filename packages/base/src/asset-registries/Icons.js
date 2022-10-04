import getSharedResource from "../getSharedResource.js";
import IconCollectionsAlias from "../assets-meta/IconCollectionsAlias.js";
import { getEffectiveDefaultIconCollection } from "../config/Icons.js";

const loaders = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

/**
 * @deprecated
 */
const registerIconBundle = async (collectionName, bundleData) => {
	throw new Error("This method has been removed. Use `registerIconLoader` instead.");
};

const registerIconLoader = async (collectionName, loader) => {
	loaders.set(collectionName, loader);
};

const _loadIconCollectionOnce = async collectionName => {
	if (!iconCollectionPromises.has(collectionName)) {
		if (!loaders.has(collectionName)) {
			throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
		}
		const loadIcons = loaders.get(collectionName);
		iconCollectionPromises.set(collectionName, loadIcons(collectionName));
	}

	return iconCollectionPromises.get(collectionName);
};

const _fillRegistry = bundleData => {
	Object.keys(bundleData.data).forEach(iconName => {
		const iconData = bundleData.data[iconName];

		registerIcon(iconName, {
			pathData: iconData.path || iconData.paths,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
			packageName: bundleData.packageName,
		 });
	});
};

// set
const registerIcon = (name, { pathData, ltr, accData, collection, packageName, customTemplate, viewBox } = {}) => { // eslint-disable-line
	if (!collection) {
		collection = getEffectiveDefaultIconCollection();
	}

	const key = `${collection}/${name}`;
	registry.set(key, {
		pathData,
		ltr,
		accData,
		packageName,
		customTemplate,
		viewBox,
	});
};

const _parseName = name => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
	}

	let collection;
	[name, collection] = name.split("/").reverse();
	collection = collection || getEffectiveDefaultIconCollection();

	// Normalize collection name.
	// - resolve `SAP-icons-TNT` to `tnt`.
	// - resolve `BusinessSuiteInAppSymbols` to `business-suite`.
	// - resolve `horizon` to `SAP-icons-v5`,
	// Note: aliases can be made as a feature, if more collections need it or more aliases are needed.
	collection = _normalizeCollection(collection);
	name = name.replace("icon-", "");

	const registryKey = `${collection}/${name}`;
	return { name, collection, registryKey };
};

const getIconDataSync = nameProp => {
	const { registryKey } = _parseName(nameProp);
	return registry.get(registryKey);
};

const getIconData = async nameProp => {
	const { collection, registryKey } = _parseName(nameProp);

	let iconData = ICON_NOT_FOUND;
	try {
		iconData = await _loadIconCollectionOnce(collection);
	} catch (e) {
		console.error(e.message); /* eslint-disable-line */
	}

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	if (!registry.has(registryKey)) {
		// not filled by another await. many getters will await on the same loader, but fill only once
		_fillRegistry(iconData);
	}
	return registry.get(registryKey);
};

// test page usage only
const _getRegisteredNames = async () => {
	// fetch one icon of each collection to trigger the bundle load
	await getIconData("edit");
	await getIconData("tnt/arrow");
	await getIconData("business-suite/3d");
	return Array.from(registry.keys());
};

const _normalizeCollection = collectionName => {
	if (IconCollectionsAlias[collectionName]) {
		return IconCollectionsAlias[collectionName];
	}

	return collectionName;
};

export {
	registerIconBundle,
	registerIconLoader,
	getIconData,
	getIconDataSync,
	registerIcon,
	_getRegisteredNames,
};
