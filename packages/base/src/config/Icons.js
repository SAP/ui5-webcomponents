import { getTheme, isThemeFamily } from "./Theme.js";

const defaultCollectionPerTheme = {
	collection: null,
	theme: null,
};

/**
 * Sets the default icon collection (v4 or v5) per theme,
 * which will be applied in case icon collection is not specified.
 *
 * Note: by default SAP-icons-v5 is used in SAP Horizon and  SAP-icons-v4 for all the rest.
 * @param {String} collectionName 
 * @param {String} theme 
 */
const setDefaultIconCollection = (collectionName, theme) => {
	if (collectionName === "horizon") {
		collectionName = "SAP-icons-v5";
	}

	defaultCollectionPerTheme.collection = collectionName;
	defaultCollectionPerTheme.theme = theme;
};

const getDefaultIconCollection = () => {
	if (getTheme() === defaultCollectionPerTheme.theme) {
		return defaultCollectionPerTheme.collection
	}

	return isThemeFamily("sap_horizon") ? "SAP-icons-v5" : "SAP-icons";
};

export {
	setDefaultIconCollection,
	getDefaultIconCollection,
};
