import getLocale from "../locale/getLocale.js";
import { attachLanguageChange } from "../locale/languageChange.js";
import normalizeLocale from "../locale/normalizeLocale.js";
import nextFallbackLocale from "../locale/nextFallbackLocale.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";
import { getUseDefaultLanguage } from "../config/Language.js";

// contains package names for which the warning has been shown
let warningShown = new Set();

const bundleData = new Map();
const bundlePromises = new Map();
const loaders = new Map();

/**
 *
 * @param {string} packageName for which package this loader can fetch data
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 * @param {Array} localeIds Array of locale IDs that this loader can handle
 */
const registerLoader = (packageName, localeId, loader) => {
	// register loader by key
	const bundleKey = `${packageName}/${localeId}`;
	loaders.set(bundleKey, loader);
};

const _setI18nBundleData = (packageName, data) => {
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
	throw new Error("This method has been removed. Use `registerLoader` instead.");
};

const _hasLoader = (packageName, localeId) => {
	const bundleKey = `${packageName}/${localeId}`;
	return loaders.has(bundleKey);
}

// load bundle over the network once
const _loadMessageBundleOnce = async (packageName, localeId) => {
	const bundleKey = `${packageName}/${localeId}`;
	const loadMessageBundle = loaders.get(bundleKey);

	if (!bundlePromises.get(bundleKey)) {
		bundlePromises.set(bundleKey, loadMessageBundle(localeId));
	}

	return bundlePromises.get(bundleKey);
};

const _showAssetsWarningOnce = (packageName) => {
	if (!warningShown.has(packageName)) {
		console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` Add \`import "${packageName}/dist/Assets-dynamic.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
		warningShown.add(packageName);
	}
}

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
	if (!loaders.size) {
		_showAssetsWarningOnce(packageName);
		return;
	}

	const language = getLocale().getLanguage();
	const region = getLocale().getRegion();
	let localeId = normalizeLocale(language + (region ? `-${region}` : ``));

	while (localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId)) {
		localeId = nextFallbackLocale(localeId);
	}

	const useDefaultLanguage = getUseDefaultLanguage();
	if (useDefaultLanguage && localeId === DEFAULT_LANGUAGE) {
		_setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
		return;
	}

	const data = await _loadMessageBundleOnce(packageName, localeId);
	_setI18nBundleData(packageName, data);
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
