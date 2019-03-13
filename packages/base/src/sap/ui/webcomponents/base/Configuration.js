import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType";

const getDesigntimePropertyAsArray = sValue => {
	const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
	return (m && m[2]) ? m[2].split(/,/) : null;
};

const supportedLanguages = getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");

const CONFIGURATION = {
	defaultTheme: "sap_fiori_3", // read-only
	theme: null, // can be set explicitly, otherwise the default theme will be used
	rtl: null,
	language: null,
	compactSize: false,
	supportedLanguages,
	calendarType: null,
	derivedRTL: null,
	"xx-wc-force-default-gestures": false,
	"xx-wc-no-conflict": false, // no URL
};

/* General settings */
const getDefaultTheme = () => {
	return CONFIGURATION.defaultTheme;
};

const getTheme = () => {
	return CONFIGURATION.theme || getDefaultTheme();
};

const getRTL = () => {
	return CONFIGURATION.rtl === null ? CONFIGURATION.derivedRTL : CONFIGURATION.rtl;
};

const getLanguage = () => {
	return CONFIGURATION.language;
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

	return CalendarType.Gregorian;
};

const getOriginInfo = () => {};

const getLocale = () => {
	return CONFIGURATION.language;
};

const _setTheme = themeName => {
	CONFIGURATION.theme = themeName;
};

const booleanMapping = new Map([
	["true", true],
	["false", false],
]);

let runtimeConfig = {};

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
		CONFIGURATION[key] = runtimeConfig[key];
	});
};

const initConfiguration = () => {
	parseConfigurationScript();
	parseURLParameters();
	applyConfigurations();
};

export {
	initConfiguration,
	getTheme,
	getDefaultTheme,
	getRTL,
	getLanguage,
	getCompactSize,
	getWCForceDefaultGestures,
	getWCNoConflict,
	getCalendarType,
	getLocale,
	_setTheme,
	getSupportedLanguages,
	getOriginInfo,
};
