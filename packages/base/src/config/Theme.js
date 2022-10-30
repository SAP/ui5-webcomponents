import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import { reRenderAllUI5Elements } from "../Render.js";
import applyTheme from "../theming/applyTheme.js";

/**
 * @type {String}
 */
let curTheme;

/**
 * Gets the current theme
 * @returns {String} the current theme name
 * @public
 */
const getTheme = () => {
	if (curTheme === undefined) {
		curTheme = getConfiguredTheme();
	}

	return curTheme;
};

/**
 * Applies a new theme after fetching its assets from the network
 * @param {String} theme the name of the new theme
 * @returns {Promise} a promise that is resolved when the new theme assets have been fetched and applied to the DOM
 * @public
 */
const setTheme = async theme => {
	if (curTheme === theme) {
		return;
	}

	curTheme = theme;

	// Update CSS Custom Properties
	await applyTheme(curTheme);
	await reRenderAllUI5Elements({ themeAware: true });
};

/**
 * Returns if the given theme name is the one currently applied.
 * @private
 * @param {String} _theme
 * @returns {boolean}
 */
const isTheme = _theme => {
	const currentTheme = getTheme();
	return currentTheme === _theme || currentTheme === `${_theme}_exp`;
};

/**
 * Returns if the current theme is part of given theme family
 * @private
 * @param {String} _theme the theme family
 * @returns {boolean}
 */
const isThemeFamily = _theme => {
	return getTheme().startsWith(_theme);
};

export {
	getTheme,
	setTheme,
	isTheme,
	isThemeFamily,
};
