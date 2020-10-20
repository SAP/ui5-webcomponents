import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { createThemePropertiesStyleTag, getThemePropertiesStyleTag, removeThemePropertiesStyleTag } from "./ThemePropertiesStyleTag.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { ponyfillNeeded, runPonyfill } from "./CSSVarsPonyfill.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { getFeature } from "../FeaturesRegistry.js";
import { getSharedResourcePolicy } from "../SharedResources.js";
import SharedResourceType from "../types/SharedResourceType.js";
import SharedResourceReusePolicy from "../types/SharedResourceReusePolicy.js";
import { getVersionIndex, compareWithVersion } from "../Version.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";
const policy = getSharedResourcePolicy(SharedResourceType.ThemeProperties); // shared resource policy for theme properties

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

/**
 * Determines whether the content of a style tag with CSS variables should be reused.
 *
 * @param packageName
 * @param theme
 * @returns {boolean}
 */
const shouldReuseStyleTag = (packageName, theme) => {
	const styleElement = getThemePropertiesStyleTag(packageName);

	// No style element created yet -> update
	if (!styleElement) {
		return false;
	}

	const styleElementTheme = styleElement.getAttribute("data-ui5-theme");
	const styleElementVersionIndex = styleElement.getAttribute("data-ui5-version-index");

	// The tag is created by an older version -> update
	if (!styleElementTheme || !styleElementVersionIndex) {
		return false;
	}

	// The tag is for a different theme -> update
	if (styleElementTheme !== theme) {
		return false;
	}

	// Always reuse policy - do not update the style
	if (policy === SharedResourceReusePolicy.Always) {
		return true;
	}

	if (policy === SharedResourceReusePolicy.Never) {
		return false;
	}

	return compareWithVersion(styleElementVersionIndex) === -1;
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	if (shouldReuseStyleTag(BASE_THEME_PACKAGE, theme)) {
		return;
	}

	const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE, theme, getVersionIndex());
};

const deleteThemeBase = () => {
	removeThemePropertiesStyleTag(BASE_THEME_PACKAGE);
};

const loadComponentPackages = async theme => {
	const registeredPackages = getRegisteredPackages();
	registeredPackages.forEach(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		if (shouldReuseStyleTag(packageName, theme)) {
			return;
		}

		const cssText = await getThemeProperties(packageName, theme);
		createThemePropertiesStyleTag(cssText, packageName, theme, getVersionIndex());
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

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}

	fireThemeLoaded(theme);
};

export default applyTheme;
