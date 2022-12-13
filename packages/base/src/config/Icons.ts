import { getTheme, isThemeFamily } from "./Theme.js";

const IconCollectionConfiguration = new Map<string, string>();

enum IconCollection {
	v4 = "SAP-icons",
	v5 = "SAP-icons-v5",
}

/**
 * Sets the default icon collection (SAP-icons font v4 or SAP-icons font v5) per theme,
 * which will be applied in case icon collection is not specified.
 *
 * Note: by default SAP-icons-v5 is used in all SAP Horizon variants and SAP-icons-v4 for all the rest.
 * @public
 * @param {string} theme
 * @param {IconCollection} collectionName
 */
const setDefaultIconCollection = (theme: string, collectionName: "horizon" | IconCollection) => {
	if (collectionName === "horizon") {
		collectionName = IconCollection.v5;
	}

	IconCollectionConfiguration.set(theme, collectionName);
};

/**
 * Returns the default icon collection (v4 or v5) for given theme,
 * that is configured.
 *
 * @param {string} theme
 * @public
 * @returns {string | undefined}
 */
const getDefaultIconCollection = (theme: string): string | undefined => {
	return IconCollectionConfiguration.get(theme);
};

/**
 * Returns the effective icon collection that will be applied for icon web components
 * whenever namespace is not specified.
 * @returns {string}
 */
const getEffectiveDefaultIconCollection = () => {
	const currentTheme = getTheme();
	const currentThemeConfiguration = IconCollectionConfiguration.get(currentTheme);

	if (currentThemeConfiguration) {
		return currentThemeConfiguration;
	}

	return isThemeFamily("sap_horizon") ? IconCollection.v5 : IconCollection.v4;
};

export {
	setDefaultIconCollection,
	getDefaultIconCollection,
	getEffectiveDefaultIconCollection,
};
