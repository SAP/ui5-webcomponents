import getLocale from "../locale/getLocale.js";
import { attachLanguageChange } from "../locale/languageChange.js";
import normalizeLocale from "../locale/normalizeLocale.js";
import nextFallbackLocale from "../locale/nextFallbackLocale.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";
import { getFetchDefaultLanguage } from "../config/Language.js";

type I18nLoader = (localeId: string) => Promise<I18nData>;
type I18nData = Record<string, string>;

// contains package names for which the warning has been shown
const warningShown = new Set();
const reportedErrors = new Set();

const bundleData = new Map<string, I18nData | null>();
const bundlePromises = new Map<string, Promise<I18nData>>();
const loaders = new Map<string, I18nLoader>();

/**
 * Registers i18n loader function for given package and locale.
 *
 * @public
 * @param {string} packageName for which package this loader can fetch data
 * @param {string} localeId locale that this loader can handle
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 */
const registerI18nLoader = (packageName: string, localeId: string, loader: I18nLoader) => {
	// register loader by key
	const bundleKey = `${packageName}/${localeId}`;
	loaders.set(bundleKey, loader);
};

const _setI18nBundleData = (packageName: string, data: I18nData | null) => {
	bundleData.set(packageName, data);
};

const getI18nBundleData = (packageName: string) => {
	return bundleData.get(packageName);
};

const _hasLoader = (packageName: string, localeId: string) => {
	const bundleKey = `${packageName}/${localeId}`;
	return loaders.has(bundleKey);
};

// load bundle over the network once
const _loadMessageBundleOnce = (packageName: string, localeId: string) => {
	const bundleKey = `${packageName}/${localeId}`;
	const loadMessageBundle = loaders.get(bundleKey);

	if (loadMessageBundle && !bundlePromises.get(bundleKey)) {
		bundlePromises.set(bundleKey, loadMessageBundle(localeId));
	}

	return bundlePromises.get(bundleKey)!; // Investigate if i18n loader exists and this won't return undefined.
};

const _showAssetsWarningOnce = (packageName: string) => {
	if (!warningShown.has(packageName)) {
		console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */
		` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
		warningShown.add(packageName);
	}
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
const fetchI18nBundle = async (packageName: string) => {
	const language = getLocale().getLanguage();
	const region = getLocale().getRegion();
	let localeId = normalizeLocale(language + (region ? `-${region}` : ``));

	while (localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId)) {
		localeId = nextFallbackLocale(localeId);
	}

	// use default language unless configured to always fetch it from the network
	const fetchDefaultLanguage = getFetchDefaultLanguage();
	if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage) {
		_setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
		return;
	}

	if (!_hasLoader(packageName, localeId)) {
		_showAssetsWarningOnce(packageName);
		return;
	}

	try {
		const data = await _loadMessageBundleOnce(packageName, localeId);
		_setI18nBundleData(packageName, data);
	} catch (error: unknown) {
		const e = error as Error;
		if (!reportedErrors.has(e.message)) {
			reportedErrors.add(e.message);
			console.error(e.message); /* eslint-disable-line */
		}
	}
};

// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange((lang: string /* eslint-disable-line */) => {
	const allPackages = [...bundleData.keys()];
	return Promise.all(allPackages.map(fetchI18nBundle));
});

export {
	registerI18nLoader,
	fetchI18nBundle,
	getI18nBundleData,
};
