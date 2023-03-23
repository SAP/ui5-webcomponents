import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import { reRenderAllUI5Elements } from "../Render.js";
import applyTheme from "../theming/applyTheme.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";

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
 * Returns if the current theme is part of given theme family.
 * @private
 * @param {string} theme the theme family
 * @returns {boolean}
 */
const isThemeFamily = (theme: string) => {
	return getTheme().startsWith(theme);
};

export {
	getTheme,
	setTheme,
	isTheme,
	isThemeFamily,
	getDefaultTheme,
};
