import "../shims/jquery-shim.js";
import "../shims/Core-shim.js";
import { getLanguage } from "../LocaleProvider.js";
import { fetchJsonOnce } from "../util/FetchHelper.js";
import { normalizeLocale, nextFallbackLocale } from "../util/normalizeLocale.js";

const bundleData = new Map();
const bundleURLs = new Map();

/**
 * Registers a map of locale/url information to be used by the <code>fetchI18nBundle</code> method.
 * @param {string} bundleId the i18n bundle ID that the texts will be related to
 * @param {Object} bundlesMap an object with string locales as keys and the URLs of where the corresponding locale can be fetched from
 * @public
 */
const registerI18nBundle = (bundleId, bundlesMap) => {
	bundleURLs.set(bundleId, bundlesMap);
};

/**
 * Sets a map with texts and ID the are related to.
 * @param {string} bundleId the i18n bundle ID that the texts will be related to
 * @param {Object} data an object holding the text keys and the text translataions
 * @public
 */
const setI18nBundleData = (bundleId, data) => {
	bundleData.set(bundleId, data);
};

const getI18nBundleData = bundleId => {
	return bundleData.get(bundleId);
};

/**
 * This method preforms the asyncronous task of fething the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {bundleId} bundleId the node project package id
 * @public
 */
const fetchI18nBundle = async bundleId => {
	const bundlesForPackage = bundleURLs.get(bundleId);

	if (!bundlesForPackage) {
		console.warn(`Message bundle assets are not configured. Falling back to english texts.`, /* eslint-disable-line */
		` You need to import @ui5/webcomponents/dist/json-imports/i18n.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
		return;
	}

	const language = getLanguage();

	let localeId = normalizeLocale(language);
	while (!bundlesForPackage[localeId]) {
		localeId = nextFallbackLocale(localeId);
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") { // inlined from build
		return bundleURL;
	}

	const data = await fetchJsonOnce(bundleURL);
	setI18nBundleData(bundleId, data);
};

export {
	fetchI18nBundle,
	registerI18nBundle,
	setI18nBundleData,
	getI18nBundleData,
};
