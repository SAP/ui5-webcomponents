let initialized = false;

const initialConfig = {
	animationMode: "full",
	theme: "sap_fiori_3",
	rtl: null,
	language: null,
	contentDensity: false,
	calendarType: null,
	noConflict: false, // no URL
	formatSettings: {},
};

/* General settings */
const getAnimationMode = () => {
	initConfiguration();
	return initialConfig.animationMode;
};

const getTheme = () => {
	initConfiguration();
	return initialConfig.theme;
};

const getRTL = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

const getContentDensity = () => {
	initConfiguration();
	return initialConfig.contentDensity;
};

const getNoConflict = () => {
	initConfiguration();
	return initialConfig.noConflict;
};

const getCalendarType = () => {
	initConfiguration();
	return initialConfig.calendarType;
};

const getFormatSettings = () => {
	initConfiguration();
	return initialConfig.formatSettings;
};

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

let runtimeConfig = {};

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

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
	getAnimationMode,
	getTheme,
	getRTL,
	getLanguage,
	getContentDensity,
	getNoConflict,
	getCalendarType,
	getFormatSettings,
};
