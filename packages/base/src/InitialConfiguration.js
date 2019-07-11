let initialized = false;

const initialConfig = {
	theme: "sap_fiori_3",
	rtl: null,
	language: null,
	compactSize: false,
	calendarType: null,
	"xx-wc-no-conflict": false, // no URL
};

/* General settings */
const _getTheme = () => {
	initConfiguration();
	return initialConfig.theme;
};

const _getRTL = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const _getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

const _getCompactSize = () => {
	initConfiguration();
	return initialConfig.compactSize;
};

const _getWCNoConflict = () => {
	initConfiguration();
	return initialConfig["xx-wc-no-conflict"];
};

const _getCalendarType = () => {
	initConfiguration();
	return initialConfig.calendarType;
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
		initialConfig[key] = runtimeConfig[key];
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
	_getLanguage,
	_getCompactSize,
	_getWCNoConflict,
	_getCalendarType,
};
