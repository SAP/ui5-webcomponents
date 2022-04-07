import { getTheme, isThemeFamily } from "./Theme.js";

const IconCollectionConfiguration = new Map();

const registerConfig = (theme, collectionName) => {
	IconCollectionConfiguration.set(theme, collectionName);
};

const getConfig = theme => {
	return IconCollectionConfiguration.get(theme);
};

/**
 * Sets the default icon collection (v4 or v5) per theme,
 * which will be applied in case icon collection is not specified.
 *
 * Note: by default SAP-icons-v5 is used in SAP Horizon and  SAP-icons-v4 for all the rest.
 * @param {String} theme
 * @param {String} collectionName
 */
const setDefaultIconCollection = (theme, collectionName) => {
	if (collectionName === "horizon") {
		collectionName = "SAP-icons-v5";
	}
	registerConfig(theme, collectionName);
};

/**
 * Returns the default icon collection (v4 or v5) for given theme,
 * that is configured.
 *
 * @param {String} theme
 * @returns {String}
 */
const getDefaultIconCollection = (theme) => {
	return getConfig(theme);
};

/**
 * Returns the effective icon collection that will be applied for icon web components
 * whenever namespace is not specified.
 *
 * @returns {String}
 */

const getActualEffectiveDefaulIconCollection = () => {
	const currentTheme = getTheme();

	if (getConfig(currentTheme)) {
		return getConfig(currentTheme);
	}
	
	return isThemeFamily("sap_horizon") ? "SAP-icons-v5" : "SAP-icons";
};

export {
	setDefaultIconCollection,
	getDefaultIconCollection,
	getActualEffectiveDefaulIconCollection,
};
