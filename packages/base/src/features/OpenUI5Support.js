import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";

const core = window.sap && window.sap.ui && typeof window.sap.ui.getCore === "function" && window.sap.ui.getCore();

const isLoaded = () => {
	return !!core;
};

const init = () => {
	if (!core) {
		return Promise.resolve();
	}

	return new Promise(resolve => {
		core.attachInit(resolve);
	});
};

const getConfigurationSettingsObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = sap.ui.requireSync("sap/ui/core/LocaleData");

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
	const LocaleData = sap.ui.requireSync("sap/ui/core/LocaleData");
	return LocaleData.getInstance(config.getLocale()).mData;
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
