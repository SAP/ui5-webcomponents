import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";

const core = window.sap && window.sap.ui && typeof window.sap.ui.getCore === "function" && window.sap.ui.getCore();

const getConfigurationSettingsObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = window.sap.ui.core.LocaleData;

	return {
		animationMode: config.getAnimationMode(),
		language: config.getLanguage(),
		theme: config.getTheme(),
		rtl: config.getRTL(),
		calendarType: config.getCalendarType(),
		firstDayOfWeek: LocaleData.getInstance(config.getLocale()).getFirstDayOfWeek(),
	};
};

const getLocaleDataObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	const LocaleData = window.sap.ui.core.LocaleData;
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
	getConfigurationSettingsObject,
	getLocaleDataObject,
	attachListeners,
};

registerFeature("OpenUI5Support", OpenUI5Support);
