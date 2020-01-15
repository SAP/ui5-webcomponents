import { registerFeature } from "../FeaturesRegistry.js";
import { setTheme } from "../config/Theme.js";

const core = window.sap && window.sap.ui && typeof window.sap.ui.getCore === "function" && window.sap.ui.getCore();

const getConfigurationSettingsObject = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	return {
		theme: config.getTheme(),
	};
};

const listenForThemeChange = () => {
	if (!core) {
		return;
	}

	const config = core.getConfiguration();
	core.attachThemeChanged(async () => {
		await setTheme(config.getTheme());
	});
};

const attachListeners = () => {
	listenForThemeChange();
};

const OpenUI5Support = {
	getConfigurationSettingsObject,
	attachListeners,
};

registerFeature("OpenUI5Support", OpenUI5Support);
