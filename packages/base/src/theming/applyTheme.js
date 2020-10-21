import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { createThemePropertiesStyleTag, getThemePropertiesStyleTag, removeThemePropertiesStyleTag } from "./ThemePropertiesStyleTag.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { ponyfillNeeded, runPonyfill } from "./CSSVarsPonyfill.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { getFeature } from "../FeaturesRegistry.js";
import { getSharedResourcePolicy } from "../SharedResources.js";
import SharedResourceType from "../types/SharedResourceType.js";
import SharedResourceReusePolicy from "../types/SharedResourceReusePolicy.js";
import {
	getVersionIndex,
	getVersionInfo,
	compareWithVersion,
	versionWarningsEnabled,
	logDisableVersionWarningsInstructions,
} from "../Version.js";
import Logger from "../util/Logger.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";
const policy = getSharedResourcePolicy(SharedResourceType.ThemeProperties); // shared resource policy for theme properties

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

/**
 * Determines whether the theme properties for this package/theme combination should be inserted in DOM.
 *
 * @param packageName
 * @param theme
 * @returns {boolean}
 */
const shouldApplyThemeProperties = (packageName, theme) => {
	const styleElement = getThemePropertiesStyleTag(packageName);

	// No style element created yet -> apply
	if (!styleElement) {
		return true;
	}

	const styleElementTheme = styleElement.getAttribute("data-ui5-theme");
	const styleElementVersionIndex = styleElement.getAttribute("data-ui5-version-index");

	// There is a tag, but it does not have data-ui5-version-index, indicating that it was created before versioning and reuse policies were introduced - assume existing behavior (apply)
	if (!styleElementTheme || !styleElementVersionIndex) {
		return true;
	}

	// The tag is for a different theme -> apply
	if (styleElementTheme !== theme) {
		return true;
	}

	const comparison = compareWithVersion(styleElementVersionIndex);
	const logger = new Logger();
	const versionInfo = getVersionInfo();
	const otherVersionInfo = getVersionInfo(styleElementVersionIndex);

	// Always reuse policy - reuse the existing theme properties, do not apply the new ones
	if (policy === SharedResourceReusePolicy.Always) {
		if (versionWarningsEnabled() && comparison > 0) {
			logger.append(`Version ${versionInfo.version} will not update theme properties for ${packageName} for ${theme} although they are created by an older version (${otherVersionInfo.version}), because Shared resources reuse policy is set to "Always reuse"`);
			logger.line(`If not intended, consider changing the policy to OnlyNewer`);
			logDisableVersionWarningsInstructions(logger);
			logger.console("warn");
		}
		return false;
	}

	// Never reuse policy - apply the new theme properties
	if (policy === SharedResourceReusePolicy.Never) {
		if (versionWarningsEnabled() && comparison < 0) {
			logger.append(`Version ${versionInfo.version} will update theme properties for ${packageName} for ${theme} although they are created by a newer version (${otherVersionInfo.version}), because Shared resources reuse policy is set to "Never reuse"`);
			logger.line(`If not intended, consider changing the policy to OnlyNewer`);
			logDisableVersionWarningsInstructions(logger);
			logger.console("warn");
		}
		return true;
	}

	// OnlyNewer reuse policy - apply the new theme properties only if of a newer version (comparison with the style's version returns a positive number).
	return comparison > 0;
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	if (shouldApplyThemeProperties(BASE_THEME_PACKAGE, theme)) {
		const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
		createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE, theme, getVersionIndex());
	}
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

		if (shouldApplyThemeProperties(packageName, theme)) {
			const cssText = await getThemeProperties(packageName, theme);
			createThemePropertiesStyleTag(cssText, packageName, theme, getVersionIndex());
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

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}

	fireThemeLoaded(theme);
};

export default applyTheme;
