import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js";
import getDesigntimePropertyAsArray from "./util/getDesigntimePropertyAsArray.js";

let initialized = false;

const InitialConfiguration = {
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
const _getTheme = () => {
	initConfiguration();
	return InitialConfiguration.theme;
};

const _getRTL = () => {
	initConfiguration();
	return InitialConfiguration.rtl;
};

const getLanguage = () => {
	initConfiguration();
	return InitialConfiguration.language;
};

const _getCompactSize = () => {
	initConfiguration();
	return InitialConfiguration.compactSize;
};

const getSupportedLanguages = () => {
	return getDesigntimePropertyAsArray("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
};

const _getWCNoConflict = () => {
	initConfiguration();
	return InitialConfiguration["xx-wc-no-conflict"];
};

/* Calendar stuff */
const getCalendarType = () => {
	initConfiguration();
	if (InitialConfiguration.calendarType) {
		const type = Object.keys(CalendarType).filter(calType => calType === InitialConfiguration.calendarType)[0];

		if (type) {
			return type;
		}
	}

	return CalendarType.Gregorian;
};

const getOriginInfo = () => {};

const getLocale = () => {
	initConfiguration();
	return InitialConfiguration.language;
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
		} catch (err) {
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
		InitialConfiguration[key] = runtimeConfig[key];
	});
};

const initConfiguration = () => {
	if (initialized) {
		return;
	}

	parseConfigurationScript();
	parseURLParameters();
	applyConfigurations();

	initialized = true;
};

export {
	_getTheme,
	_getRTL,
	getLanguage,
	_getCompactSize,
	_getWCNoConflict,
	getCalendarType,
	getLocale,
	getSupportedLanguages,
	getOriginInfo,
};
