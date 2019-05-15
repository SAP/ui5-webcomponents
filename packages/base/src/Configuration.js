import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js";
import getDesigntimePropertyAsArray from "./util/getDesigntimePropertyAsArray.js";

const CONFIGURATION = {
	theme: "sap_fiori_3",
	rtl: null,
	language: null,
	compactSize: false,
	supportedLanguages: null,
	calendarType: null,
	derivedRTL: null,
	"xx-wc-no-conflict": false, // no URL
};

/* General settings */
const getTheme = () => {
	return CONFIGURATION.theme;
};

const getRTL = () => {
	return CONFIGURATION.rtl;
};

const getLanguage = () => {
	return CONFIGURATION.language;
};

const getCompactSize = () => {
	return CONFIGURATION.compactSize;
};

const getSupportedLanguages = () => {
	return getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
};

const getWCNoConflict = () => {
	return CONFIGURATION["xx-wc-no-conflict"];
};

const _setWCNoConflict = value => {
	CONFIGURATION["xx-wc-no-conflict"] = value;
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

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

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
	getRTL,
	getLanguage,
	getCompactSize,
	getWCNoConflict,
	getCalendarType,
	getLocale,
	_setTheme,
	_setWCNoConflict,
	getSupportedLanguages,
	getOriginInfo,
};
