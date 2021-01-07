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
	getCurrentRuntimeIndex,
	getRuntime,
	compareCurrentRuntimeWith,
	runtimeWarningsEnabled,
	logDisableRuntimeWarningsInstructions,
} from "../Runtimes.js";
import Logger from "../util/Logger.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theme-base";

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
	const policy = getSharedResourcePolicy(SharedResourceType.ThemeProperties); // shared resource policy for theme properties

	const styleElement = getThemePropertiesStyleTag(packageName);

	// No style element created yet -> apply
	if (!styleElement) {
		return true;
	}

	const styleElementTheme = styleElement.getAttribute("data-ui5-theme");
	const styleElementRuntimeIndex = styleElement.getAttribute("data-ui5-runtime-index");

	// There is a tag, but it does not have data-ui5-runtime-index, indicating that it was created before runtimeing and reuse policies were introduced - assume existing behavior (apply)
	if (!styleElementTheme || !styleElementRuntimeIndex) {
		return true;
	}

	// The tag is for a different theme -> apply
	if (styleElementTheme !== theme) {
		return true;
	}

	const comparison = compareCurrentRuntimeWith(styleElementRuntimeIndex);
	const logger = new Logger();
	const currentRuntime = getRuntime();
	const otherRuntime = getRuntime(styleElementRuntimeIndex);

	// Always reuse policy - reuse the existing theme properties, do not apply the new ones
	if (policy === SharedResourceReusePolicy.Always) {
		if (runtimeWarningsEnabled() && comparison > 0) {
			logger.append(`Runtime ${currentRuntime.descriptor} will not update theme properties for ${packageName} for ${theme} although they are created by an older runtime (${otherRuntime.descriptor}), because Shared resources reuse policy is set to "Always reuse"`);
			logger.line(`If not intended, consider changing the policy to OnlyNewer`);
			logDisableRuntimeWarningsInstructions(logger);
			logger.console("warn");
		}
		return false;
	}

	// Never reuse policy - apply the new theme properties
	if (policy === SharedResourceReusePolicy.Never) {
		if (runtimeWarningsEnabled() && comparison < 0) {
			logger.append(`Runtime ${currentRuntime.descriptor} will update theme properties for ${packageName} for ${theme} although they are created by a newer runtime (${otherRuntime.descriptor}), because Shared resources reuse policy is set to "Never reuse"`);
			logger.line(`If not intended, consider changing the policy to OnlyNewer`);
			logDisableRuntimeWarningsInstructions(logger);
			logger.console("warn");
		}

		return true;
	}

	// OnlyNewer reuse policy - apply the new theme properties only if of a newer runtime (comparison with the style's runtime returns a positive number).
	return comparison > 0;
};

const loadThemeBase = async theme => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	if (shouldApplyThemeProperties(BASE_THEME_PACKAGE, theme)) {
		const cssText = await getThemeProperties(BASE_THEME_PACKAGE, theme);
		createThemePropertiesStyleTag(cssText, BASE_THEME_PACKAGE, theme, getCurrentRuntimeIndex());
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
			createThemePropertiesStyleTag(cssText, packageName, theme, getCurrentRuntimeIndex());
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
