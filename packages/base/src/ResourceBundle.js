import "./shims/jquery-shim.js";
import "./shims/Core-shim.js";
import { getLanguage } from "./LocaleProvider.js";
import { fetchJsonOnce } from "./util/FetchHelper.js";
import { normalizeLocale, nextFallbackLocale } from "./util/normalizeLocale.js";
import formatMessage from "./util/formatMessage";

const bundleData = new Map();
const bundleURLs = new Map();

/**
 * Registers a map of locale/url information to be used by the <code>fetchResourceBundle</code> method.
 * @param {string} packageId the node project id of the project that provides text resources
 * @param {Object} bundlesMap an object with string locales as keys and the URLs of where the corresponding locale can be fetched from
 * @public
 */
const registerMessageBundles = (packageId, bundlesMap) => {
	bundleURLs.set(packageId, bundlesMap);
};

/**
 * Registers a map with the loaded messages.
 * @param {Object} data the loaded messagebundle_*.json file
 * @public
 */
const registerBundleData = (packageId, data) => {
	bundleData.set(packageId, data);
};

/**
 * This method preforms the asyncronous task of fething the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the ResourceBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerMessageBundles</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>packageId</code>
 * @param {packageId} packageId the node project package id
 * @public
 */
const fetchResourceBundle = async packageId => {
	const bundlesForPackage = bundleURLs.get(packageId);

	if (!bundlesForPackage) {
		console.warn(`Message bundle assets are not configured. Falling back to english texts.`, /* eslint-disable-line */
		` You need to import @ui5/webcomponents/dist/MessageBundleAssets.js with a build tool that supports JSON imports.`); /* eslint-disable-line */
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
	registerBundleData(packageId, data);
};

class ResourceBundle {
	constructor(packageId) {
		this.packageId = packageId;
	}

	getText(textObj, ...params) {
		const messages = bundleData.get(this.packageId);

		if (!messages || !messages[textObj.key]) {
			return formatMessage(textObj.defaultText, params);
		}

		return formatMessage(messages[textObj.key], params);
	}
}

const getResourceBundle = packageId => {
	return new ResourceBundle(packageId);
};

export { fetchResourceBundle, registerMessageBundles, getResourceBundle };
