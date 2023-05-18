import getSharedResource from "../getSharedResource.js";
import { getIconCollectionByAlias } from "../assets-meta/IconCollectionsAlias.js";
import { getEffectiveIconCollection } from "../config/Icons.js";
import { getI18nBundle } from "../i18nBundle.js";
import type { I18nText } from "../i18nBundle.js";
import type { TemplateFunction } from "../renderer/executeTemplate.js";

type IconLoader = (collectionName: string) => Promise<CollectionData>;

type CollectionData = {
	collection: string,
	packageName: string,
	version?: string,
	data: Record<string, {
		path?: string,
		paths?: Array<string>,
		ltr?: boolean,
		acc?: I18nText,
	}>,
};

type IconData = {
	collection: string,
	packageName: string,
	pathData: string | Array<string>,
	ltr?: boolean,
	accData?: I18nText,
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
			pathData: (iconData.path || iconData.paths)!,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
			packageName: bundleData.packageName,
		});
	});
};

// set
const registerIcon = (name: string, iconData: IconData) => { // eslint-disable-line
	const key = `${iconData.collection}/${name}`;

	registry.set(key, {
		pathData: iconData.pathData,
		ltr: iconData.ltr,
		accData: iconData.accData,
		packageName: iconData.packageName,
		customTemplate: iconData.customTemplate,
		viewBox: iconData.viewBox,
		collection: iconData.collection,
	});
};

/**
 * Processes the full icon name and splits it into - "name", "collection"
 * to form the proper registry key ("collection/name") under which the icon is registered:
 *
 * - removes legacy protocol ("sap-icon://")
 * - resolves aliases (f.e "SAP-icons-TNT/actor" => "tnt/actor")
 * - determines theme dependant icon collection (f.e "home" => "SAP-icons-v4/home" in Quartz | "SAP-icons-v5/home" in Horizon)
 *
 * @param { string } name
 * @return { object }
 */
const processName = (name: string) => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
	}

	let collection: string;
	[name, collection] = name.split("/").reverse();

	name = name.replace("icon-", "");

	if (collection) {
		collection = getIconCollectionByAlias(collection);
	}
	collection = getEffectiveIconCollection(collection);

	const registryKey = `${collection}/${name}`;
	return { name, collection, registryKey };
};

const getIconDataSync = (name: string) => {
	const { registryKey } = processName(name);
	return registry.get(registryKey);
};

const getIconData = async (name: string) => {
	const { collection, registryKey } = processName(name);

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

/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
const getIconAccessibleName = async (name: string): Promise<string | undefined> => {
	if (!name) {
		return;
	}

	let iconData: typeof ICON_NOT_FOUND | IconData | undefined = getIconDataSync(name);

	if (!iconData) {
		iconData = await getIconData(name);
	}

	if (iconData && iconData !== ICON_NOT_FOUND && iconData.accData) {
		const i18nBundle = await getI18nBundle(iconData.packageName);
		return i18nBundle.getText(iconData.accData);
	}
};

// test page usage only
const _getRegisteredNames = async () => {
	// fetch one icon of each collection to trigger the bundle load
	await getIconData("edit");
	await getIconData("tnt/arrow");
	await getIconData("business-suite/3d");
	return Array.from(registry.keys());
};

export {
	registerIconLoader,
	getIconData,
	getIconDataSync,
	getIconAccessibleName,
	registerIcon,
	_getRegisteredNames,
};

export type {
	IconData,
	CollectionData,
};
