import "./shims/jquery-shim.js";
import ResourceBundle from "@ui5/webcomponents-core/dist/sap/base/i18n/ResourceBundle.js";
import { getLanguage } from "./LocaleProvider.js";
import { registerModuleContent } from "./ResourceLoaderOverrides.js";
import { fetchJsonOnce } from "./util/FetchHelper.js";

const bundleURLs = new Map();
const singletonPromises = new Map();

/**
 * Creates a new promise for the specified key (or returns a new one and stores it for next calls).
 * The same promise is always returned for multiple calls to this method for the same key.
 * This promise can also be resolved so that all usages that await its resolution can continue.
 * @param {key} key the unique key identifying the promise
 * @private
 */
const _getSingletonPromise = key => {
	const prevPromise = singletonPromises.get(key);
	if (prevPromise) {
		return prevPromise;
	}

	let resolveFn;
	const newPromise = new Promise(resolve => {
		resolveFn = resolve;
	});
	// private usage for making a deferred-like API to avoid storing resolve functions in a second map
	newPromise._deferredResolve = resolveFn;

	singletonPromises.set(key, newPromise);
	return newPromise;
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
	// depending on the module resolution order, the fetch might run before the bundle URLs are registered - sync them here
	await _getSingletonPromise(packageId);
	const bundlesForPackage = bundleURLs.get(packageId);

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
	_getSingletonPromise(packageId)._deferredResolve();
};

const getResourceBundle = library => {
	return ResourceBundle.create({
		url: `${library}.properties`,
	});
};

export { fetchResourceBundle, registerMessageBundles, getResourceBundle };
