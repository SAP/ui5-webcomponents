// import * as i18n from "./asset-registries/i18n.js";
// import * as LocaleData from "./asset-registries/LocaleData.js";
import * as Themes from "./asset-registries/Themes.js";

const registerThemeProperties = Themes.registerThemeProperties;
const getThemeProperties = Themes.getThemeProperties;

export { registerThemeProperties, getThemeProperties };

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
