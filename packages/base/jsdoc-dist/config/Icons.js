import { getTheme, isThemeFamily } from "./Theme.js";
const IconCollectionConfiguration = new Map();
var IconCollection;
(function (IconCollection) {
    IconCollection["v4"] = "SAP-icons";
    IconCollection["v5"] = "SAP-icons-v5";
})(IconCollection || (IconCollection = {}));
/**
 * Sets the default icon collection (SAP-icons font v4 or SAP-icons font v5) per theme,
 * which will be applied in case icon collection is not specified.
 *
 * Note: by default SAP-icons-v5 is used in SAP Horizon and SAP-icons-v4 for all the rest.
 * @public
 * @param {string} theme
 * @param {string} collectionName
 */
const setDefaultIconCollection = (theme, collectionName) => {
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
 * @returns {string}
 */
const getDefaultIconCollection = (theme) => {
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
export { setDefaultIconCollection, getDefaultIconCollection, getEffectiveDefaultIconCollection, };
//# sourceMappingURL=Icons.js.map