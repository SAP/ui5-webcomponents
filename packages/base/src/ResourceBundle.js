import "./shims/jquery-shim.js";
import "./shims/Core-shim.js";
import { getLanguage } from "./LocaleProvider.js";
import { registerModuleContent } from "./ResourceLoaderOverrides.js";
import { fetchJsonOnce } from "./util/FetchHelper.js";

let messagesKeys;
const bundleURLs = new Map();
const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;

/**
 * Map for old language names eor a few ISO639 codes ("iw" for "he", "ji" for "yi", "in" for "id" and "sh" for "sr").
 */
const M_ISO639_NEW_TO_OLD = {
	"he": "iw",
	"yi": "ji",
	"id": "in",
	"sr": "sh",
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

const registerMessagesKeys = messageBundleData => {
	messagesKeys = new Map(Object.entries(messageBundleData));
};

/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale or undefined if the locale can't be normalized
 */
const normalize = locale => {
	let m;

	if (typeof locale === 'string' && (m = localeRegEX.exec(locale.replace(/_/g, '-')))) {/* eslint-disable-line */ne
		let language = m[1].toLowerCase();
		let region = m[3] ? m[3].toUpperCase() : undefined;
		const script = m[2] ? m[2].toLowerCase() : undefined;
		const variants = m[4] ? m[4].slice(1) : undefined;
		const isPrivate = m[6];

		language = M_ISO639_NEW_TO_OLD[language] || language;

		// recognize and convert special SAP supportability locales (overwrites m[]!)
		if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */
			|| (variants && (m = SAPSupportabilityLocales.exec(variants)))) { /* eslint-disable-line */
			return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
		}

		// Chinese: when no region but a script is specified, use default region for each script
		if (language === "zh" && !region) {
			if (script === "hans") {
				region = "CN";
			} else if (script === "hant") {
				region = "TW";
			}
		}

		return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
	}
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string|null} Next fallback Locale or null if there is no more fallback
 */
const nextFallbackLocale = locale => {
	if (!locale) {
		return null;
	}

	if (locale === "zh_HK") {
		return "zh_TW";
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but 'en', fallback to 'en' first before falling back to the 'raw' language (empty string)
	return locale !== "en" ? "en" : "";
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

	let localeId = normalize(language);
	while (!bundlesForPackage[localeId]) {
		localeId = nextFallbackLocale(localeId);
	}

	const bundleURL = bundlesForPackage[localeId];

	if (typeof bundleURL === "object") {
		// inlined from build
		registerModuleContent(`${packageId}_${localeId}.properties`, bundleURL._);
		return bundleURL;
	}

	const data = await fetchJsonOnce(bundleURL);
	registerMessagesKeys(data);
	registerModuleContent(`${packageId}_${localeId}.properties`, data._);
};

const formatMessage = (text, values) => {
	values = values || [];

	return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
		if ($1) {
			return '\''; /* eslint-disable-line */
		}

		if ($2) {
			return $2.replace(/''/g, '\''); /* eslint-disable-line */
		}

		if ($3) {
			return String(values[parseInt($3)]);
		}

		throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
	});
};

class ResourceBundleWrapper {
	getText(textObj, ...params) {
		if (!messagesKeys.has(textObj.key)) {
			this.getTextFormatted(textObj.defaultText, params);
		}

		return this.getTextFormatted(messagesKeys.get(textObj.key), params);
	}

	getTextFormatted(text, values) {
		return formatMessage(text, values);
	}
}

const getResourceBundle = packageId => {
	return new ResourceBundleWrapper();
};

export { fetchResourceBundle, registerMessageBundles, getResourceBundle };
