import getLocale from "../locale/getLocale.js";
import { attachLanguageChange } from "../locale/languageChange.js";
import normalizeLocale from "../locale/normalizeLocale.js";
import nextFallbackLocale from "../locale/nextFallbackLocale.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";
import { getUseDefaultLanguage } from "../config/Language.js";

const bundleData = new Map();
const bundlePromises = new Map();
const loaders = new Map();
const availableLocales = new Map();

/**
 *
 * @param {string} packageName for which package this loader can fetch data
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 * @param {Set} localeIds Set of locale IDs that this loader can handle
 */
const registerLoader = (packageName, loader, localeIds) => {
	// register loader by key
	for (let localeId of localeIds.values()) {
		const bundleKey = `${packageName}/${localeId}`;
		loaders.set(bundleKey, loader);
	}
	availableLocales.set(packageName, localeIds);
};

/**
 * Sets a map with texts and ID the are related to.
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} data an object with string locales as keys and text translataions as values
 * @public
 */
const setI18nBundleData = (packageName, data) => {
	bundleData.set(packageName, data);
};

const getI18nBundleData = packageName => {
	return bundleData.get(packageName);
};

/**
 * Registers a map of locale/url information, to be used by the <code>fetchI18nBundle</code> method.
 * Note: In order to be able to register ".properties" files, you must import the following module:
 * import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
 *
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} bundle an object with string locales as keys and the URLs (in .json or .properties format - see the note above) where the corresponding locale can be fetched from, f.e {"en": "path/en.json", ...}
 *
 * @public
 */
const registerI18nBundle = (packageName, bundle) => {
	// const oldBundle = bundleURLs.get(packageName) || {};
	// bundleURLs.set(packageName, Object.assign({}, oldBundle, bundle));
};

// load bundle over the network once
const loadMessageBundleOnce = async (packageName, localeId) => {
	const bundleKey = `${packageName}/${localeId}`;
	const loadMessageBundle = loaders.get(bundleKey);

	if (!bundlePromises.get(bundleKey)) {
		bundlePromises.set(bundleKey, loadMessageBundle(localeId));
	}

	return bundlePromises.get(bundleKey);
};

/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async packageName => {
	// if (!loaders.has(packageName)) {
	// 	console.warn(`Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
	// 	` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
	// 	return;
	// }

	const language = getLocale().getLanguage();
	const region = getLocale().getRegion();
	let localeId = normalizeLocale(language + (region ? `-${region}` : ``));

	while (localeId !== DEFAULT_LANGUAGE && !availableLocales.get(packageName).has(localeId)) {
		localeId = nextFallbackLocale(localeId);
	}

	const useDefaultLanguage = getUseDefaultLanguage();
	if (useDefaultLanguage && localeId === DEFAULT_LANGUAGE) {
		setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
		return;
	}

	const data = await loadMessageBundleOnce(packageName, localeId);
	setI18nBundleData(packageName, data);

	// const bundleURL = bundlesForPackage[localeId];

	// if (typeof bundleURL === "object") { // inlined from build
	// 	setI18nBundleData(packageName, bundleURL);
	// 	return;
	// }

	// const content = await fetchTextOnce(getEffectiveAssetPath(bundleURL));
	// let parser;
	// if (content.startsWith("{")) {
	// 	parser = JSON.parse;
	// } else {
	// 	const PropertiesFormatSupport = getFeature("PropertiesFormatSupport");
	// 	if (!PropertiesFormatSupport) {
	// 		throw new Error(`In order to support .properties files, please: import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";`);
	// 	}
	// 	parser = PropertiesFormatSupport.parser;
	// }

	// const data = parser(content);

	// setI18nBundleData(packageName, data);
};

// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange(() => {
	const allPackages = [...bundleData.keys()];
	return Promise.all(allPackages.map(fetchI18nBundle));
});

export {
	registerLoader,
	fetchI18nBundle,
	registerI18nBundle,
	getI18nBundleData,
};
