import getSharedResource from "../getSharedResource.js";
import type { I18nText } from "../i18nBundle.js";
import { getTheme } from "../config/Theme.js";

type IllustrationLoader = (illustrationName: string) => Promise<IllustrationData>;

type IllustrationProperties = {
	dialogSvg: string,
	sceneSvg: string,
	spotSvg: string,
	title: I18nText,
	subtitle: I18nText,
};

type IllustrationData = IllustrationProperties & {
	set: string,
	collection: string,
};

const IllustrationCollections = new Map([
	["sap_horizon", "V5"],
	["sap_horizon_dark", "V5"],
	["sap_horizon_hcb", "V5/HC"],
	["sap_horizon_hcw", "V5/HC"],
]);

const FALLBACK_COLLECTION = "V4";

const loaders = new Map<string, IllustrationLoader>();
const registry = getSharedResource<Map<string, IllustrationProperties>>("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource<Map<string, Promise<IllustrationData>>>("SVGIllustration.promises", new Map());

const getCollection = () => {
	const theme = getTheme();

	if (IllustrationCollections.has(theme)) {
		return IllustrationCollections.get(theme);
	}

	return FALLBACK_COLLECTION;
};

/**
 * Processes the name of the illustration
 * The name is used to generate the registry key and the loader key
 * The registry key is used to store and get the illustration data from the registry
 * The loader key is used to store and get the illustration loader from the loaders map
 * The function generates the correct registry key and loader key based on whether an loader exists for the illustration
 * If there is no loader registered for the collection, it falls back to the default collection
 */
const processName = (name: string) => {
	let collection = getCollection();
	const isTnt = name.startsWith("Tnt");
	const set = isTnt ? "tnt" : "fiori";

	let registryKey = `${set}/${collection}/${name}`;
	let loaderKey = `${collection}/${name}`;

	if (!loaders.has(loaderKey) && collection !== FALLBACK_COLLECTION) {
		collection = FALLBACK_COLLECTION;
		loaderKey = `${collection}/${name}`;
		registryKey = `${set}/${collection}/${name}`;
	}

	if (isTnt) {
		name = name.replace(/^Tnt/, "");
		registryKey = `${set}/${collection}/${name}`;
	}

	return {
		registryKey,
		loaderKey,
		collection,
	};
};

const registerIllustration = (name: string, data: IllustrationData) => {
	const collection = data.collection || FALLBACK_COLLECTION;
	registry.set(`${data.set}/${collection}/${name}`, {
		dialogSvg: data.dialogSvg,
		sceneSvg: data.sceneSvg,
		spotSvg: data.spotSvg,
		title: data.title,
		subtitle: data.subtitle,
	});
};

const registerIllustrationLoader = (illustrationName: string, loader: IllustrationLoader) => {
	loaders.set(illustrationName, loader);
};

const _loadIllustrationOnce = (illustrationName: string) => {
	const { loaderKey } = processName(illustrationName);

	if (!illustrationPromises.has(loaderKey)) {
		if (!loaders.has(loaderKey)) {
			const illustrationPath = illustrationName.startsWith("Tnt") ? `tnt/${illustrationName.replace(/^Tnt/, "")}` : illustrationName;
			throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/${illustrationPath}.js" module. Or you can import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module that will make all illustrations available, but fetch only the ones used.`);
		}

		const loadIllustrations = loaders.get(loaderKey)!;
		illustrationPromises.set(loaderKey, loadIllustrations(loaderKey));
	}
	return illustrationPromises.get(loaderKey);
};

const getIllustrationDataSync = (illustrationName: string) => {
	const { registryKey } = processName(illustrationName);
	return registry.get(registryKey);
};

const getIllustrationData = async (illustrationName: string) => {
	const { registryKey } = processName(illustrationName);

	await _loadIllustrationOnce(illustrationName);
	return registry.get(registryKey);
};

export {
	getIllustrationDataSync,
	registerIllustration,
	registerIllustrationLoader,
	getIllustrationData,
};
