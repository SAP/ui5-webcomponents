import { attachLanguageChange } from "../locale/languageChange.js";
import getLocale from "../locale/getLocale.js";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../generated/AssetParameters.js";
import { getFeature } from "../FeaturesRegistry.js";

const localeDataMap = new Map();
const loaders = new Map();
const cldrPromises = new Map();
const reportedErrors = new Set();
let warningShown = false;

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
};

const _showAssetsWarningOnce = localeId => {
	if (!warningShown) {
		console.warn(`[LocaleData] Supported locale "${localeId}" not configured, import the "Assets.js" module from the webcomponents package you are using.`); /* eslint-disable-line */
		warningShown = true;
	}
};

const calcLocale = (language, region, script) => {
	// normalize language and handle special cases
	language = (language && M_ISO639_OLD_TO_NEW[language]) || language;
	// Special case 1: in an SAP context, the inclusive language code "no" always means Norwegian Bokmal ("nb")
	if (language === "no") {
		language = "nb";
	}
	// Special case 2: for Chinese, derive a default region from the script (this behavior is inherited from Java)
	if (language === "zh" && !region) {
		if (script === "Hans") {
			region = "CN";
		} else if (script === "Hant") {
			region = "TW";
		}
	}

	// try language + region
	let localeId = `${language}_${region}`;
	if (SUPPORTED_LOCALES.includes(localeId)) {
		if (loaders.has(localeId)) {
			// supported and has loader
			return localeId;
		}

		// supported, no loader - fallback to default and warn
		_showAssetsWarningOnce(localeId);
		return DEFAULT_LOCALE;
	}

	// not supported, try language only
	localeId = language;
	if (SUPPORTED_LOCALES.includes(localeId)) {
		if (loaders.has(localeId)) {
			// supported and has loader
			return localeId;
		}

		// supported, no loader - fallback to default and warn
		_showAssetsWarningOnce(localeId);
		return DEFAULT_LOCALE;
	}

	// not supported - fallback to default locale
	return DEFAULT_LOCALE;
};

// internal set data
const setLocaleData = (localeId, content) => {
	localeDataMap.set(localeId, content);
};

// external getSync
const getLocaleData = localeId => {
	// if there is no loader, the default fallback was fetched and a warning was given - use default locale instead
	if (!loaders.has(localeId)) {
		localeId = DEFAULT_LOCALE;
	}

	const content = localeDataMap.get(localeId);
	if (!content) {
		throw new Error(`CLDR data for locale ${localeId} is not loaded!`);
	}

	return content;
};

// load bundle over the network once
const _loadCldrOnce = localeId => {
	const loadCldr = loaders.get(localeId);

	if (!cldrPromises.get(localeId)) {
		cldrPromises.set(localeId, loadCldr(localeId));
	}

	return cldrPromises.get(localeId);
};

// external getAsync
const fetchCldr = async (language, region, script) => {
	const localeId = calcLocale(language, region, script);

	// reuse OpenUI5 CLDR if present
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		const cldrContent = OpenUI5Support.getLocaleDataObject();
		if (cldrContent) {
			// only if openui5 actually returned valid content
			setLocaleData(localeId, cldrContent);
			return;
		}
	}

	// fetch it
	try {
		const cldrContent = await _loadCldrOnce(localeId);
		setLocaleData(localeId, cldrContent);
	} catch (e) {
		if (!reportedErrors.has(e.message)) {
			reportedErrors.add(e.message);
			console.error(e.message); /* eslint-disable-line */
		}
	}
};

const registerLocaleDataLoader = (localeId, loader) => {
	loaders.set(localeId, loader);
};

// register default loader for "en" from ui5 CDN (dev workflow without assets)
registerLocaleDataLoader("en", async runtimeLocaleId => {
	return (await fetch(`https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/en.json`)).json();
});

// When the language changes dynamically (the user calls setLanguage),
// re-fetch the required CDRD data.
attachLanguageChange(() => {
	const locale = getLocale();
	return fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
});

export {
	registerLocaleDataLoader,
	fetchCldr,
	getLocaleData,
};
