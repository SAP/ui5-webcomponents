import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { removeStyle, createOrUpdateStyle } from "../ManagedStyles.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { getFeature } from "../FeaturesRegistry.js";
import { attachCustomThemeStylesToHead, getThemeRoot } from "../config/ThemeRoots.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	if (cssData) {
		createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
	}
};

const deleteThemeBase = () => {
	removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		const cssData = await getThemeProperties(packageName, theme);
		if (cssData) {
			createOrUpdateStyle(cssData, "data-ui5-theme-properties", packageName);
		}
	});
};

const detectExternalTheme = async theme => {
	// If theme designer theme is detected, use this
	const extTheme = getThemeDesignerTheme();
	if (extTheme) {
		return extTheme;
	}

	// If OpenUI5Support is enabled, try to find out if it loaded variables
	const OpenUI5Support = getFeature("OpenUI5Support");
	if (OpenUI5Support) {
		const varsLoaded = OpenUI5Support.cssVariablesLoaded();
		if (varsLoaded) {
			return {
				themeName: OpenUI5Support.getConfigurationSettingsObject().theme, // just themeName, baseThemeName is only relevant for custom themes
			};
		}
	} else if (getThemeRoot()) {
		await attachCustomThemeStylesToHead(theme);

		return getThemeDesignerTheme();
	}
};

const applyTheme = async theme => {
	const extTheme = await detectExternalTheme(theme);

	// Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
	if (!extTheme || theme !== extTheme.themeName) {
		await loadThemeBase(theme);
	} else {
		deleteThemeBase();
	}

	// Always load component packages properties. For non-registered themes, try with the base theme, if any
	const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
	await loadComponentPackages(packagesTheme);

	fireThemeLoaded(theme);
};

export default applyTheme;
