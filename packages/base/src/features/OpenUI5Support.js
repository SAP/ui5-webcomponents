import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";

const sap = window.sap;
const core = sap && sap.ui && typeof sap.ui.getCore === "function" && sap.ui.getCore();

const isLoaded = () => {
	return !!core;
};

const init = () => {
	if (!core) {
		return Promise.resolve();
	}

	return new Promise(resolve => {
		core.attachInit(() => {
			sap.ui.require(["sap/ui/core/LocaleData"], resolve);
		});
	});
};

const getConfigurationSettingsObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = sap.ui.require("sap/ui/core/LocaleData");

	return {
		animationMode: config.getAnimationMode(),
		language: config.getLanguage(),
		theme: config.getTheme(),
		rtl: config.getRTL(),
		calendarType: config.getCalendarType(),
		formatSettings: {
			firstDayOfWeek: LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek(),
		},
	};
};

const getLocaleDataObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = sap.ui.require("sap/ui/core/LocaleData");
	return LocaleData.getInstance(config.getLocale())._get();
};

const listenForThemeChange = () => {
	const config = core.getConfiguration();
	core.attachThemeChanged(async () => {
		await setTheme(config.getTheme());
	});
};

const attachListeners = () => {
	if (!core) {
		return;
	}

	listenForThemeChange();
};

const OpenUI5Support = {
	isLoaded,
	init,
	getConfigurationSettingsObject,
	getLocaleDataObject,
	attachListeners,
};

registerFeature("OpenUI5Support", OpenUI5Support);
