import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { removeStyle, createOrUpdateStyle } from "../ManagedStyles.js";
import { removeLink, createOrUpdateLink } from "../ManagedLinks.js";
import { shouldUseLinks, getUrl } from "../CSP.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { getFeature } from "../FeaturesRegistry.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	if (shouldUseLinks()) {
		const href = getUrl(BASE_THEME_PACKAGE, `themes/${theme}/parameters-bundle.css`);
		createOrUpdateLink(href, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
	} else {
		const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
		createOrUpdateStyle(cssText, "data-ui5-theme-properties", BASE_THEME_PACKAGE);
	}
};

const deleteThemeBase = () => {
	if (shouldUseLinks()) {
		removeLink("data-ui5-theme-properties", BASE_THEME_PACKAGE);
	} else {
		removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
	}
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		if (shouldUseLinks()) {
			const href = getUrl(packageName, `themes/${theme}/parameters-bundle.css`);
			createOrUpdateLink(href, "data-ui5-theme-properties", packageName);
		} else {
			const cssText = await getThemeProperties(packageName, theme);
			createOrUpdateStyle(cssText, "data-ui5-theme-properties", packageName);
		}
	});
};

const detectExternalTheme = () => {
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
	}
};

const applyTheme = async theme => {
	const extTheme = detectExternalTheme();

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
