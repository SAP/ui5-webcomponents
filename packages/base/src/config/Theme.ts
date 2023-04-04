import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import { reRenderAllUI5Elements } from "../Render.js";
import applyTheme from "../theming/applyTheme.js";
import getThemeDesignerTheme from "../theming/getThemeDesignerTheme.js";
import { DEFAULT_THEME, SUPPORTED_THEMES } from "../generated/AssetParameters.js";

let curTheme: string;

/**
 * Returns the current theme.
 * @public
 * @returns {string} the current theme name
 */
const getTheme = (): string => {
	if (curTheme === undefined) {
		curTheme = getConfiguredTheme();
	}

	return curTheme;
};

/**
 * Applies a new theme after fetching its assets from the network.
 * @public
 * @param {string} theme the name of the new theme
 * @returns {Promise<void>} a promise that is resolved when the new theme assets have been fetched and applied to the DOM
 */
const setTheme = async (theme: string): Promise<void> => {
	if (curTheme === theme) {
		return;
	}

	curTheme = theme;

	// Update CSS Custom Properties
	await applyTheme(curTheme);
	await reRenderAllUI5Elements({ themeAware: true });
};

/**
 * Returns the default theme.
 *
 * Note: Default theme might be different than the configurated one.
 *
 * @public
 * @returns {string}
 */
const getDefaultTheme = (): string => {
	return DEFAULT_THEME;
};

/**
 * Returns if the given theme name is the one currently applied.
 * @private
 * @param {string} theme
 * @returns {boolean}
 */
const isTheme = (theme: string) => {
	const currentTheme = getTheme();
	return currentTheme === theme || currentTheme === `${theme}_exp`;
};

/**
 * Returns if the currently set theme is part of legacy theme families ("sap_belize" or "sap_fiori_3").
 * <b>Note</b>: in addition, the method checks the base theme of a custom theme, built via the ThemeDesigner.
 *
 * @private
 * @returns { boolean }
 */
const isLegacyThemeFamily = () => {
	const currentTheme = getTheme();

	if (!isKnownTheme(currentTheme)) {
		return !getThemeDesignerTheme()?.baseThemeName?.startsWith("sap_horizon");
	}

	return !currentTheme.startsWith("sap_horizon");
};

const isKnownTheme = (theme: string) => SUPPORTED_THEMES.includes(theme);

export {
	getTheme,
	setTheme,
	isTheme,
	isLegacyThemeFamily,
	getDefaultTheme,
};
