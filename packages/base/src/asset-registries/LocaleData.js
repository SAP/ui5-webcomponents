import { fetchJsonOnce } from "../util/FetchHelper.js";
import { getFeature } from "../FeaturesRegistry.js";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../generated/AssetParameters.js";

const resources = new Map();
const cldrData = {};
const cldrUrls = {};

// externally configurable mapping function for resolving (localeId -> URL)
// default implementation - ui5 CDN
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


const resolveMissingMappings = () => {
	if (!cldrMappingFn) {
		return;
	}

	const missingLocales = SUPPORTED_LOCALES.filter(locale => !cldrData[locale] && !cldrUrls[locale]);
	missingLocales.forEach(locale => {
		cldrUrls[locale] = cldrMappingFn(locale);
	});
};

const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

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

const fetchCldr = async (language, region, script) => {
	resolveMissingMappings();
	const localeId = calcLocale(language, region, script);

	let cldrObj = cldrData[localeId];
	const url = cldrUrls[localeId];

	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!cldrObj && OpenUI5Support) {
		cldrObj = OpenUI5Support.getLocaleDataObject();
	}

	if (cldrObj) {
		// inlined from build or fetched independently
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrObj);
	} else if (url) {
		// fetch it
		const cldrContent = await fetchJsonOnce(url);
		registerModuleContent(`sap/ui/core/cldr/${localeId}.json`, cldrContent);
	}
};

const registerCldr = (locale, url) => {
	cldrUrls[locale] = url;
};

const setCldrData = (locale, data) => {
	cldrData[locale] = data;
};

const getCldrData = locale => {
	return cldrData[locale];
};

const _registerMappingFunction = mappingFn => {
	cldrMappingFn = mappingFn;
};

export {
	fetchCldr,
	registerCldr,
	setCldrData,
	getCldrData,
	getModuleContent,
	_registerMappingFunction,
};
