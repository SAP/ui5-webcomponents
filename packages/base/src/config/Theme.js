import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import applyTheme from "../theming/applyTheme.js";

let theme;

/**
 * Gets the current theme
 * @returns {String} the current theme name
 */
const getTheme = () => {
	if (theme === undefined) {
		theme = getConfiguredTheme();
	}

	return theme;
};

/**
 * Applies a new theme after fetching its assets from the network
 * @param {String} newTheme the name of the new theme
 * @returns {Promise} a promise that is resolved when the new theme assets have been fetched and applied to the DOM
 */
const setTheme = async newTheme => {
	if (theme === newTheme) {
		return;
	}

	theme = newTheme;

	// Update CSS Custom Properties
	await applyTheme(theme);
};

export {
	getTheme,
	setTheme,
};
