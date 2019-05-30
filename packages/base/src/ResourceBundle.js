import "./shims/jquery-shim.js";
import ResourceBundle from "@ui5/webcomponents-core/dist/sap/base/i18n/ResourceBundle.js";
import formatMessage from "@ui5/webcomponents-core/dist/sap/base/strings/formatMessage.js";
import { getLanguage } from "./LocaleProvider.js";
import { registerModuleContent } from "./ResourceLoaderOverrides.js";
import { fetchJsonOnce } from "./util/FetchHelper.js";

const bundleURLs = new Map();

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
		console.warn(`Message bundle assets are not configured. Falling back to english texts.`,
		` You need to import @ui5/webcomponents/dist/MessageBundleAssets.js with a build tool that supports JSON imports.`);
		return;
	}

	const language = getLanguage();

	let localeId = ResourceBundle.__normalize(language);
	while (!bundlesForPackage[localeId]) {
		localeId = ResourceBundle.__nextFallbackLocale(localeId);
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") {
		// inlined from build
		registerModuleContent(`${packageId}_${localeId}.properties`, bundleURL._);
		return bundleURL;
	}

	const data = await fetchJsonOnce(bundleURL);
	registerModuleContent(`${packageId}_${localeId}.properties`, data._);
};

/**
 * Registers a map of locale/url information to be used by the <code>fetchResourceBundle</code> method.
 * @param {string} packageId the node project id of the prohject that provides text resources
 * @param {Object} bundlesMap an object with string locales as keys and the URLs of where the corresponding locale can be fetched from.
 * @public
 */
const registerMessageBundles = (packageId, bundlesMap) => {
	bundleURLs.set(packageId, bundlesMap);
};

class ResourceBundleFallback {

	getText(textObj, ...params) {
		return formatMessage(textObj.defaultText, params);
	}
}

class ResourceBundleWrapper {
	constructor(resouceBundle) {
		this._resourceBundle = resouceBundle;
	}

	getText(textObj, ...params) {
		return this._resourceBundle.getText(textObj.key, ...params);
	}
}

const getResourceBundle = packageId => {
	const bundleLoaded = bundleURLs.has(packageId);

	if (bundleLoaded) {
		return new ResourceBundleWrapper(ResourceBundle.create({
			url: `${packageId}.properties`,
		}));
	} else {
		return new ResourceBundleFallback();
	}
};

export { fetchResourceBundle, registerMessageBundles, getResourceBundle };
