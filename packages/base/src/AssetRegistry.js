import { registerI18nBundle } from "./asset-registries/i18n.js";
import { registerCldr } from "./asset-registries/LocaleData.js";
import { registerThemeProperties } from "./asset-registries/Themes.js";

export {
	registerCldr,
	registerThemeProperties,
	registerI18nBundle,
};

/*
discuss name

API high level
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
