// @ts-check
import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
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
};

export {
	getTheme,
	setTheme,
};
