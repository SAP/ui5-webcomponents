import { registerI18nBundle } from "./asset-registries/i18n.js";
import { registerCldr } from "./asset-registries/LocaleData.js";
import { registerThemeProperties } from "./asset-registries/Themes.js";

export {
	registerCldr,
	registerThemeProperties,
	registerI18nBundle,
};

/**
 * Theme Registry
 *
 * (public) [sync] registerThemeProperties = (packageName, themeName, styles)
 * #For Example (data): registerThemeProperties("main", "sap_fiori3", ":root{ --sapBackground: black;}")
 * #For Example (URL): registerThemeProperties("main", "sap_fiori3", "path/myprops.css.json")
 *
 * (public?) [async] getThemeProperties = (packageName, themeName) (internally performs async fetchThemeProperties)
*/

/**
 * I18n Registry
 *
 * (public) [sync] registerI18nBundle = (packageName, bundle)
 * #For Example (URL): registerI18nBundle("main", {"en" : url, "de" : url})
 * #For Example (data): registerI18nBundle("main", {"en" : {EMPHASIZED: "Emphasized", ...}, "de" : {EMPHASIZED: "Hervorgehoben", ...}})
 *
 * (public?) [async] fetchI18nBundle = (packageName)
 * (private) [sync] setI18nBundleData = (packageName, data)
 * (private) [sync] getI18nBundleData = (packageName)
*/

/**
 * LocalData Registry
 *
 * (public) [sync] registerCldr = (locale, url)
 * #For Example (URL): registerCldr("de", "path/de.json");
 *
 * (public?) [async] fetchCldr = (language, region, script)
 * (private) [sync] setCldrData = (locale, data)
 * (private) [sync] getCldrData = (locale)
*/

/*
API

data (sync) (private)
    set [PRIVATE, called by components]
    get [PRIVATE, called by components]

URL
    configure(data or URL) (PUBLIC: called by json-imports and apps)
    async get (preload if return is ignored) [PRIVATE, called by components]
        fetch
        data.set(data)
        return data

key: {
    assetType,
    assetKey: {
        packageId?,
        assetId
    }
}
*/
