import { getTheme, isThemeFamily } from "./Theme.js";

const IconCollectionConfiguration = {
	defualtCollection: null,
	theme: null,
};

/**
 * Sets the default icon collection (v4 or v5) per theme,
 * which will be applied in case icon collection is not specified.
 *
 * Note: by default SAP-icons-v5 is used in SAP Horizon and  SAP-icons-v4 for all the rest.
 * @param {String} collectionName the icon collection
 * @param {String} theme
 */
const setDefaultIconCollection = (collectionName, theme) => {
	if (collectionName === "horizon") {
		collectionName = "SAP-icons-v5";
	}

	IconCollectionConfiguration.defualtCollection = collectionName;
	IconCollectionConfiguration.theme = theme;
};

const getDefaultIconCollection = () => {
	if (getTheme() === IconCollectionConfiguration.theme) {
		return IconCollectionConfiguration.defualtCollection;
	}

	return isThemeFamily("sap_horizon") ? "SAP-icons-v5" : "SAP-icons";
};

export {
	setDefaultIconCollection,
	getDefaultIconCollection,
};
