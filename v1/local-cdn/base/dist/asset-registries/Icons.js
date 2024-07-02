import getSharedResource from "../getSharedResource.js";
import { getIconCollectionByAlias } from "./util/IconCollectionsAlias.js";
import { registerIconCollectionForTheme } from "./util/IconCollectionsByTheme.js";
import getEffectiveIconCollection from "./util/getIconCollectionByTheme.js";
import { getI18nBundle } from "../i18nBundle.js";
const DEFAULT_THEME_FAMILY = "legacy"; // includes sap_belize_* and sap_fiori_*
const loaders = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const registerIconLoader = (collectionName, loader) => {
    loaders.set(collectionName, loader);
};
const _loadIconCollectionOnce = async (collectionName) => {
    if (!iconCollectionPromises.has(collectionName)) {
        if (!loaders.has(collectionName)) {
            throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
        }
        const loadIcons = loaders.get(collectionName);
        iconCollectionPromises.set(collectionName, loadIcons(collectionName));
    }
    return iconCollectionPromises.get(collectionName);
};
const _fillRegistry = (bundleData) => {
    Object.keys(bundleData.data).forEach(iconName => {
        const iconData = bundleData.data[iconName];
        registerIcon(iconName, {
            pathData: (iconData.path || iconData.paths),
            ltr: iconData.ltr,
            accData: iconData.acc,
            collection: bundleData.collection,
            packageName: bundleData.packageName,
        });
    });
};
// set
const registerIcon = (name, iconData) => {
    const key = `${iconData.collection}/${name}`;
    registry.set(key, {
        pathData: iconData.pathData,
        ltr: iconData.ltr,
        accData: iconData.accData,
        packageName: iconData.packageName,
        customTemplate: iconData.customTemplate,
        viewBox: iconData.viewBox,
        collection: iconData.collection,
    });
};
/**
 * Processes the full icon name and splits it into - "name", "collection".
 * - removes legacy protocol ("sap-icon://")
 * - resolves aliases (f.e "SAP-icons-TNT/actor" => "tnt/actor")
 *
 * @param { string } name
 * @return { object }
 */
const processName = (name) => {
    // silently support ui5-compatible URIs
    if (name.startsWith("sap-icon://")) {
        name = name.replace("sap-icon://", "");
    }
    let collection;
    [name, collection] = name.split("/").reverse();
    name = name.replace("icon-", "");
    if (collection) {
        collection = getIconCollectionByAlias(collection);
    }
    return { name, collection };
};
const getIconDataSync = (iconName) => {
    const { name, collection } = processName(iconName);
    return getRegisteredIconData(collection, name);
};
const getIconData = async (iconName) => {
    const { name, collection } = processName(iconName);
    let iconData = ICON_NOT_FOUND;
    try {
        iconData = (await _loadIconCollectionOnce(getEffectiveIconCollection(collection)));
    }
    catch (error) {
        const e = error;
        console.error(e.message); /* eslint-disable-line */
    }
    if (iconData === ICON_NOT_FOUND) {
        return iconData;
    }
    const registeredIconData = getRegisteredIconData(collection, name);
    if (registeredIconData) {
        return registeredIconData;
    }
    // not filled by another await. many getters will await on the same loader, but fill only once
    if (Array.isArray(iconData)) {
        iconData.forEach(data => {
            _fillRegistry(data);
            registerIconCollectionForTheme(collection, { [data.themeFamily || DEFAULT_THEME_FAMILY]: data.collection });
        });
    }
    else {
        _fillRegistry(iconData);
    }
    return getRegisteredIconData(collection, name);
};
const getRegisteredIconData = (collection, name) => {
    const registryKey = `${getEffectiveIconCollection(collection)}/${name}`;
    return registry.get(registryKey);
};
/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
const getIconAccessibleName = async (name) => {
    if (!name) {
        return;
    }
    let iconData = getIconDataSync(name);
    if (!iconData) {
        iconData = await getIconData(name);
    }
    if (iconData && iconData !== ICON_NOT_FOUND && iconData.accData) {
        const i18nBundle = await getI18nBundle(iconData.packageName);
        return i18nBundle.getText(iconData.accData);
    }
};
// test page usage only
const _getRegisteredNames = async () => {
    // fetch one icon of each collection to trigger the bundle load
    await getIconData("edit");
    await getIconData("tnt/arrow");
    await getIconData("business-suite/3d");
    return Array.from(registry.keys());
};
export { registerIconLoader, getIconData, getIconDataSync, getIconAccessibleName, registerIcon, _getRegisteredNames, };
//# sourceMappingURL=Icons.js.map