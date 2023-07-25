import { isLegacyThemeFamily } from "../../config/Theme.js";

enum RegisteredIconCollection {
	SAPIconsV4 = "SAP-icons-v4",
	SAPIconsV5 = "SAP-icons-v5",
	SAPIconsTNTV2 = "tnt-v2",
	SAPIconsTNTV3 = "tnt-v3",
	SAPBSIconsV1 = "business-suite-v1",
	SAPBSIconsV2 = "business-suite-v2",
}

type ThemeToCollectionMap = {[x: string]: string; };

const iconCollections = new Map<string, ThemeToCollectionMap>();
iconCollections.set("SAP-icons", {
	"legacy": RegisteredIconCollection.SAPIconsV4,
	"sap_horizon": RegisteredIconCollection.SAPIconsV5,
});
iconCollections.set("tnt", {
	"legacy": RegisteredIconCollection.SAPIconsTNTV2,
	"sap_horizon": RegisteredIconCollection.SAPIconsTNTV3,
});
iconCollections.set("business-suite", {
	"legacy": RegisteredIconCollection.SAPBSIconsV1,
	"sap_horizon": RegisteredIconCollection.SAPBSIconsV2,
});

/**
 * Registers collection version per theme.
 * </b>For exmaple:</b> registerIconCollectionForTheme("my-custom-icons", {"sap_horizon": "my-custom-icons-v5"})
 * @param { string } collectionName
 * @param { ThemeToCollectionMap } themeCollectionMap
 */
const registerIconCollectionForTheme = (collectionName: string, themeCollectionMap: ThemeToCollectionMap) => {
	if (iconCollections.has(collectionName)) {
		iconCollections.set(collectionName, { ...themeCollectionMap, ...iconCollections.get(collectionName) });
		return;
	}
	iconCollections.set(collectionName, themeCollectionMap);
};

const getIconCollectionForTheme = (collectionName: string) => {
	const themeFamily = isLegacyThemeFamily() ? "legacy" : "sap_horizon";
	return iconCollections.has(collectionName) ? iconCollections.get(collectionName)![themeFamily] : collectionName;
};

export {
	registerIconCollectionForTheme,
	getIconCollectionForTheme,
	RegisteredIconCollection,
};
