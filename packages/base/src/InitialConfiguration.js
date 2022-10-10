import merge from "./thirdparty/merge.js";
import { getFeature } from "./FeaturesRegistry.js";
import { DEFAULT_THEME } from "./generated/AssetParameters.js";
import validateThemeRoot from "./validateThemeRoot.js";

let initialized = false;

let initialConfig = {
	animationMode: "full",
	theme: DEFAULT_THEME,
	themeRoot: null,
	rtl: null,
	language: null,
	calendarType: null,
	noConflict: false, // no URL
	formatSettings: {},
	fetchDefaultLanguage: false,
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

const getThemeRoot = () => {
	initConfiguration();
	return initialConfig.themeRoot;
};

const getRTL = () => {
	initConfiguration();
	return initialConfig.rtl;
};

const getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage = () => {
	initConfiguration();
	return initialConfig.fetchDefaultLanguage;
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
			initialConfig = merge(initialConfig, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(window.location.search);

	// Process "sap-*" params first
	params.forEach((value, key) => {
		const parts = key.split("sap-").length;
		if (parts === 0 || parts === key.split("sap-ui-").length) {
			return;
		}

		applyURLParam(key, value, "sap");
	});

	// Process "sap-ui-*" params
	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		applyURLParam(key, value, "sap-ui");
	});
};

const normalizeThemeRootParamValue = value => {
	const themeRoot = value.split("@")[1];

	return validateThemeRoot(themeRoot);
};

const normalizeThemeParamValue = (param, value) => {
	if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
		return value.split("@")[0];
	}

	return value;
};

const applyURLParam = (key, value, paramType) => {
	const lowerCaseValue = value.toLowerCase();
	const param = key.split(`${paramType}-`)[1];

	if (booleanMapping.has(value)) {
		value = booleanMapping.get(lowerCaseValue);
	}

	if (param === "theme") {
		initialConfig.theme = normalizeThemeParamValue(param, value);

		if (value && value.includes("@")) {
			initialConfig.themeRoot = normalizeThemeRootParamValue(value);
		}
	} else {
		initialConfig[param] = value;
	}
};

const applyOpenUI5Configuration = () => {
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (!OpenUI5Support || !OpenUI5Support.isLoaded()) {
		return;
	}

	const OpenUI5Config = OpenUI5Support.getConfigurationSettingsObject();
	initialConfig = merge(initialConfig, OpenUI5Config);
};

const initConfiguration = () => {
	if (initialized) {
		return;
	}

	// 1. Lowest priority - configuration script
	parseConfigurationScript();

	// 2. URL parameters overwrite configuration script parameters
	parseURLParameters();

	// 3. If OpenUI5 is detected, it has the highest priority
	applyOpenUI5Configuration();

	initialized = true;
};

export {
	getAnimationMode,
	getTheme,
	getThemeRoot,
	getRTL,
	getLanguage,
	getFetchDefaultLanguage,
	getNoConflict,
	getCalendarType,
	getFormatSettings,
};
