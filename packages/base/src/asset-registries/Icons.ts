import getSharedResource from "../getSharedResource.js";
import IconCollectionsAlias from "../assets-meta/IconCollectionsAlias.js";
import { getEffectiveDefaultIconCollection } from "../config/Icons.js";
import { I18nText } from "../i18nBundle.js";
import { TemplateFunction } from "../renderer/executeTemplate.js";

type IconLoader = (collectionName: string) => Promise<CollectionData>;

type CollectionData = {
	collection: string,
	packageName: string,
	version?: string,
	data: Record<string, {
		path: string,
		paths: Array<string>,
		ltr: boolean,
		acc: I18nText,
	}>,
};

type IconData = {
	collection?: string,
	packageName: string,
	pathData: string | Array<string>,
	ltr: boolean,
	accData: I18nText,
	customTemplate?: TemplateFunction,
	viewBox?: string,
};

const loaders = new Map<string, IconLoader>();
const registry = getSharedResource<Map<string, IconData>>("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource<Map<string, Promise<CollectionData>>>("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

const registerIconLoader = (collectionName: string, loader: IconLoader) => {
	loaders.set(collectionName, loader);
};

const _loadIconCollectionOnce = async (collectionName: string) => {
	if (!iconCollectionPromises.has(collectionName)) {
		if (!loaders.has(collectionName)) {
			throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
		}

		const loadIcons = loaders.get(collectionName)!;
		iconCollectionPromises.set(collectionName, loadIcons(collectionName));
	}

	return iconCollectionPromises.get(collectionName);
};

const _fillRegistry = (bundleData: CollectionData) => {
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
const registerIcon = (name: string, iconData: IconData) => { // eslint-disable-line
	if (!iconData.collection) {
		iconData.collection = getEffectiveDefaultIconCollection();
	}

	const key = `${iconData.collection}/${name}`;
	registry.set(key, {
		pathData: iconData.pathData,
		ltr: iconData.ltr,
		accData: iconData.accData,
		packageName: iconData.packageName,
		customTemplate: iconData.customTemplate,
		viewBox: iconData.viewBox,
	});
};

const _parseName = (name: string) => {
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

const getIconDataSync = (name: string) => {
	const { registryKey } = _parseName(name);
	return registry.get(registryKey);
};

const getIconData = async (name: string) => {
	const { collection, registryKey } = _parseName(name);

	let iconData: string | CollectionData = ICON_NOT_FOUND;
	try {
		iconData = (await _loadIconCollectionOnce(collection))!;
	} catch (error: unknown) {
		const e = error as Error;
		console.error(e.message); /* eslint-disable-line */
	}

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	if (!registry.has(registryKey)) {
		// not filled by another await. many getters will await on the same loader, but fill only once
		_fillRegistry(iconData as CollectionData);
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

const _normalizeCollection = (collectionName: string) => {
	if (IconCollectionsAlias[collectionName as keyof typeof IconCollectionsAlias]) {
		return IconCollectionsAlias[collectionName as keyof typeof IconCollectionsAlias];
	}

	return collectionName;
};

export {
	registerIconLoader,
	getIconData,
	getIconDataSync,
	registerIcon,
	_getRegisteredNames,
};

export type {
	IconData,
	CollectionData,
};
