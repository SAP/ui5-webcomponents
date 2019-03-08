import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";
import Locale from "@ui5/webcomponents-core/dist/sap/ui/core/Locale";
import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType";
import * as FormatSettings from "./FormatSettings";

let LocaleData;

const getDesigntimePropertyAsArray = sValue => {
	const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
	return (m && m[2]) ? m[2].split(/,/) : null;
};

const supportedLanguages = getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");

const detectLanguage = () => {
	const browserLanguages = navigator.languages;

	const navigatorLanguage = () => {
		if (Device.os.android) {
			// on Android, navigator.language is hardcoded to 'en', so check UserAgent string instead
			const match = navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);
			if (match) {
				return match[1];
			}
			// okay, we couldn't find a language setting. It might be better to fallback to 'en' instead of having no language
		}
		return navigator.language;
	};

	const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;

	return rawLocale || "en";
};

const language = detectLanguage();

const CONFIGURATION = {
	theme: "sap_fiori_3",
	rtl: null,
	language: new Locale(language),
	compactSize: false,
	supportedLanguages,
	calendarType: null,
	derivedRTL: null,
	"xx-wc-force-default-gestures": false,
	"xx-wc-no-conflict": false, // no URL
};

FormatSettings.setConfiguration(CONFIGURATION);

/* General settings */
const getTheme = () => {
	return CONFIGURATION.theme;
};

const getRTL = () => {
	return CONFIGURATION.rtl === null ? CONFIGURATION.derivedRTL : CONFIGURATION.rtl;
};

const getLanguage = () => {
	return CONFIGURATION.language.sLocaleId;
};

const getCompactSize = () => {
	return CONFIGURATION.compactSize;
};

const getSupportedLanguages = () => {
	return CONFIGURATION.supportedLanguages;
};

/* WC specifics */
const getWCForceDefaultGestures = () => {
	return CONFIGURATION["xx-wc-force-default-gestures"];
};

const getWCNoConflict = () => {
	return CONFIGURATION["xx-wc-no-conflict"];
};

/* Calendar stuff */
const getCalendarType = () => {
	if (CONFIGURATION.calendarType) {
		const type = Object.keys(CalendarType).filter(calType => calType === CONFIGURATION.calendarType)[0];

		if (type) {
			return type;
		}
	}

	/* In order to have a locale based calendar type - LocaleData should be injected to the configuration
		- check #injectLocaleData
	*/
	if (LocaleData) {
		return LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	return CalendarType.Gregorian;
};

const getOriginInfo = () => {};

const getLocale = () => {
	return CONFIGURATION.language;
};

const getFormatSettings = () => {
	return FormatSettings;
};

const _setTheme = themeName => {
	CONFIGURATION.theme = themeName;
};

const booleanMapping = new Map([
	["true", true],
	["false", false],
]);

let runtimeConfig = {};

const convertToLocaleOrNull = lang => {
	try {
		if (lang && typeof lang === "string") {
			return new Locale(lang);
		}
	} catch (e) {
		// ignore
	}
};

const check = (condition, sMessage) => {
	if (!condition) {
		throw new Error(sMessage);
	}
};

const getLanguageTag = () => {
	return CONFIGURATION.language.toString();
};

const setLanguage = newLanguage => {
	const locale = convertToLocaleOrNull(newLanguage);

	check(locale, "Configuration.setLanguage: newLanguage must be a valid BCP47 language tag");

	if (locale.toString() !== getLanguageTag()) {
		CONFIGURATION.language = locale;
		CONFIGURATION.derivedRTL = Locale._impliesRTL(locale);
	}

	return CONFIGURATION;
};

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-id='sap-ui-config']");
	let configJSON;

	if (configScript) {
		try {
			configJSON = JSON.parse(configScript.innerHTML);
		} catch (е) {
			console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
		}

		if (configJSON) {
			runtimeConfig = Object.assign({}, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(window.location.search);

	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		const lowerCaseValue = value.toLowerCase();

		const param = key.split("sap-ui-")[1];

		if (booleanMapping.has(value)) {
			value = booleanMapping.get(lowerCaseValue);
		}

		runtimeConfig[param] = value;
	});
};

const applyConfigurations = () => {
	Object.keys(runtimeConfig).forEach(key => {
		if (key === "language") {
			setLanguage(runtimeConfig[key]);
		} else {
			CONFIGURATION[key] = runtimeConfig[key];
		}
	});
};

const injectLocaleData = localeData => {
	LocaleData = localeData;
};

const initConfiguration = () => {
	parseConfigurationScript();
	parseURLParameters();
	applyConfigurations();
};

export {
	initConfiguration,
	getTheme,
	getRTL,
	getLanguage,
	getCompactSize,
	getWCForceDefaultGestures,
	getWCNoConflict,
	getCalendarType,
	getLocale,
	getFormatSettings,
	_setTheme,
	getSupportedLanguages,
	getOriginInfo,
	injectLocaleData,
};
