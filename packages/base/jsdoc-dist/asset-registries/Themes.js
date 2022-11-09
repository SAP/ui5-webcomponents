// @ts-ignore
import { DEFAULT_THEME } from "../generated/AssetParameters.js";
const themeStyles = new Map();
const loaders = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const registerThemePropertiesLoader = (packageName, themeName, loader) => {
    loaders.set(`${packageName}/${themeName}`, loader);
    registeredPackages.add(packageName);
    registeredThemes.add(themeName);
};
const getThemeProperties = async (packageName, themeName) => {
    const style = themeStyles.get(`${packageName}_${themeName}`);
    if (style !== undefined) { // it's valid for style to be an empty string
        return style;
    }
    if (!registeredThemes.has(themeName)) {
        const regThemesStr = [...registeredThemes.values()].join(", ");
        console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
        return _getThemeProperties(packageName, DEFAULT_THEME);
    }
    return _getThemeProperties(packageName, themeName);
};
const _getThemeProperties = async (packageName, themeName) => {
    const loader = loaders.get(`${packageName}/${themeName}`);
    if (!loader) {
        // no themes for package
        console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
        return;
    }
    let data;
    try {
        data = await loader(themeName);
    }
    catch (e) {
        console.error(packageName, e.message); /* eslint-disable-line */
        return;
    }
    const themeProps = data._ || data; // todo remove _ everywhere
    themeStyles.set(`${packageName}_${themeName}`, themeProps);
    return themeProps;
};
const getRegisteredPackages = () => {
    return registeredPackages;
};
const isThemeRegistered = (theme) => {
    return registeredThemes.has(theme);
};
export { registerThemePropertiesLoader, getThemeProperties, getRegisteredPackages, isThemeRegistered, };
//# sourceMappingURL=Themes.js.map