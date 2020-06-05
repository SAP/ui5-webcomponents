import getLocale from "../locale/getLocale.js";
import { fetchTextOnce } from "../util/FetchHelper.js";
import parseProperties from "../util/parseProperties.js";
import normalizeLocale from "../locale/normalizeLocale.js";
import nextFallbackLocale from "../locale/nextFallbackLocale.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";

const bundleData = new Map();
const bundleURLs = new Map();

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
 * @param {string} packageName package ID that the i18n bundle will be related to
 * @param {Object} bundle an object with string locales as keys and the URLs (in .json or .properties format) where the corresponding locale can be fetched from, f.e {"en": "path/en.json", ...}
 * @public
 */
const registerI18nBundle = (packageName, bundle) => {
	const oldBundle = bundleURLs.get(packageName) || {};
	bundleURLs.set(packageName, Object.assign({}, oldBundle, bundle));
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
	const bundlesForPackage = bundleURLs.get(packageName);

	if (!bundlesForPackage) {
		console.warn(`Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` You need to import ${packageName}/dist/Assets.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
		return;
	}

	const language = getLocale().getLanguage();

	let localeId = normalizeLocale(language);
	while (localeId !== DEFAULT_LANGUAGE && !bundlesForPackage[localeId]) {
		localeId = nextFallbackLocale(localeId);
	}

	if (!bundlesForPackage[localeId]) {
		return;
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") { // inlined from build
		setI18nBundleData(packageName, bundleURL);
		return;
	}

	const content = await fetchTextOnce(bundleURL);
	const parser = content.startsWith("{") ? JSON.parse : parseProperties;
	const data = parser(content);

	setI18nBundleData(packageName, data);
};

export {
	fetchI18nBundle,
	registerI18nBundle,
	setI18nBundleData,
	getI18nBundleData,
};
