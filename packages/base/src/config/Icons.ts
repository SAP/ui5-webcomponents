import { getTheme, isThemeFamily } from "./Theme.js";
import { getCollectionByAlias } from "../asset-registries/Icons.js";

const IconCollectionConfiguration = new Map<string, string>();

enum IconCollectionVersions {
	SAPIconsV4 = "SAP-icons-v4",
	SAPIconsV5 = "SAP-icons-v5",
	SAPIconsTNTV2 = "tnt-v2",
	SAPIconsTNTV3 = "tnt-v3",
}

/**
 * Sets the default icon collection for a given theme.
 * By default when no collection is specified "SAP-icons-v5" is used in all SAP Horizon themes
 * and "SAP-icons-v4" - for all the rest.
 *
 * <b>Usage</b>
 * <br>
 * <b>For example</b> to force "SAP-icons" version 5.x in "sap_fiori_3":
 *
 * <pre>
 * setDefaultIconCollection("sap_fiori_3", "SAP-icons-v5");
 *
 * <ui5-icon name="home"></ui5-icon>
 * </pre>
 *
 * <b>For example</b> to set custom icon collection "my-custom-icons" as default in "sap_fiori_3":
 *
 * <pre>
 * setDefaultIconCollection("sap_fiori_3", "SAP-icons-v5");
 *
 * <ui5-icon name="my-custom-icon-name"></ui5-icon>
 * </pre>
 *
 * @public
 * @param { string } theme
 * @param { string } collectionName
 */
const setDefaultIconCollection = (theme: string, collectionName: IconCollectionVersions | string) => {
	if (collectionName === "horizon") {
		collectionName = IconCollectionVersions.SAPIconsV5;
	}

	IconCollectionConfiguration.set(theme, collectionName);
};

/**
 * Returns the configured default icon collection for a given theme.
 *
 * @param { string } theme
 * @public
 * @returns { string | undefined }
 */
const getDefaultIconCollection = (theme: string): string | undefined => {
	return IconCollectionConfiguration.get(theme);
};

/**
 * Returns the effective icon collection, based on the collection and current theme as follows:
 *
 * - "SAP-icons" resolves to "SAP-icons-v4" in "Quartz" and "Belize", and to "SAP-icons-v5" in "Horizon"
 * - "SAP-icons-v3" forces "v3" of "SAP-icons" in any theme and resolves to itself "SAP-icons-v3"
 * - "SAP-icons-v4" forces "v4" of "SAP-icons" in any theme and resolves to itself "SAP-icons-v4"
 * - "tnt" resolves to "tnt-v2" in "Quartz", "Belize", and resolves to "tnt-v3" in "Horizon"
 * - "tnt-v2" forces "v2" of TNT icons in any theme and resolves to itself "tnt-v2"
 * - "tnt-v3" forces "v3" of TNT icons in any theme and resolves to itself "tnt-v3"
 * - "business-suite" has no versioning and resolves to "business-suite"
 *
 * @param { string } collectionName
 * @returns { string } the effective collection name
 */
const getEffectiveIconCollection = (collectionName?: string): string => {
	const currentTheme = getTheme();
	const currentThemeConfiguration = IconCollectionConfiguration.get(currentTheme);

	// no collection - return default collection if configured
	if (!collectionName && currentThemeConfiguration) {
		return getCollectionByAlias(currentThemeConfiguration);
	}

	// collection exists - return theme dependant collection
	return getIconCollectionVersionByTheme(collectionName);
};

/**
 * Returns the icon theme dependant version collection, based on the collection and current theme as follows:
 *
 * - "SAP-icons" resolves to "SAP-icons-v4" in "Quartz" and "Belize", and to "SAP-icons-v5" in "Horizon"
 * - "no collection" resolves to "SAP-icons-v4" in "Quartz" and "Belize", and to "SAP-icons-v5" in "Horizon"
 * - "tnt" resolves to "tnt-v2" in "Quartz", "Belize", and resolves to "tnt-v3" in "Horizon"
 *
 * <b>Note:</b> "SAP-icons-v4", "SAP-icons-v5", "business-suite" are just returned
 * @param { string } collectionName
 * @returns { string } the effective collection name
 */
const getIconCollectionVersionByTheme = (collectionName?: string): string => {
	const horizonThemeFamily = isThemeFamily("sap_horizon");

	if (!collectionName) {
		return horizonThemeFamily ? IconCollectionVersions.SAPIconsV5 : IconCollectionVersions.SAPIconsV4;
	}

	if (collectionName === "tnt") {
		return horizonThemeFamily ? IconCollectionVersions.SAPIconsTNTV3 : IconCollectionVersions.SAPIconsTNTV2;
	}

	return collectionName;
};

export {
	setDefaultIconCollection,
	getDefaultIconCollection,
	getEffectiveIconCollection,
	IconCollectionVersions,
};
