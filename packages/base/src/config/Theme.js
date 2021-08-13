import { getTheme as getConfiguredTheme } from "../InitialConfiguration.js";
import applyTheme from "../theming/applyTheme.js";

let theme;

/**
 *
 * @return {string} currently applied theme
 */
const getTheme = () => {
	if (theme === undefined) {
		theme = getConfiguredTheme();
	}

	return theme;
};

/**
 * Sets the new theme
 * @param {"sap_fiori_3"|"sap_fiori_3_dark"|"sap_belize"|"sap_belize_hcb"|"sap_belize_hcw"|"sap_fiori_3_hcb"|"sap_fiori_3_hcw"} newTheme
 * @return {Promise<void>}
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
