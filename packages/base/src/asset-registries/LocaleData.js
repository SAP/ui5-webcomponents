import { attachLanguageChange } from "../locale/languageChange.js";
import getLocale from "../locale/getLocale.js";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../generated/AssetParameters.js";

const resources = new Map();
const loaders = new Map();
const cldrPromises = new Map();

// externally configurable mapping function for resolving (localeId -> URL)
// default implementation - ui5 CDN
// TODO loop SUPPORTED_LOCALES and add loader
let cldrMappingFn = locale => `https://ui5.sap.com/1.60.2/resources/sap/ui/core/cldr/${locale}.json`;

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
	"in": "id",
	"sh": "sr",
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
	if (!SUPPORTED_LOCALES.includes(localeId)) {
		// fallback to language only
		localeId = language;
	}
	if (!SUPPORTED_LOCALES.includes(localeId)) {
		// fallback to english
		localeId = DEFAULT_LOCALE;
	}

	return localeId;
};

// internal set data
const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

// external getSync
const getModuleContent = moduleName => {
	const moduleContent = resources.get(moduleName);
	if (moduleContent) {
		return moduleContent;
	}

	const missingModule = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
	if (missingModule) {
		throw new Error(`CLDR data for locale ${missingModule[1]} is not loaded!`);
	}

	throw new Error(`Unknown module ${moduleName}`);
};

// load bundle over the network once
const _loadCldrOnce = async (localeId) => {
	const loadCldr = loaders.get(localeId);

	if (!cldrPromises.get(localeId)) {
		cldrPromises.set(localeId, loadCldr(localeId));
	}

	return cldrPromises.get(localeId);
};

// external getAsync
const fetchCldr = async (language, region, script) => {
	const localeId = calcLocale(language, region, script);

	// TODO make loader
	// const OpenUI5Support = getFeature("OpenUI5Support");
	// if (!cldrObj && OpenUI5Support) {
	// 	cldrObj = OpenUI5Support.getLocaleDataObject();
	// }

	// fetch it
	const cldrContent = await _loadCldrOnce(localeId);
	registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrContent);
};

const registerLoader = (localeId, loader) => {
	loaders.set(localeId, loader);
}

// When the language changes dynamically (the user calls setLanguage),
// re-fetch the required CDRD data.
attachLanguageChange(() => {
	const locale = getLocale();
	return fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
});

export {
	registerLoader,
	fetchCldr,
	getModuleContent,
};
