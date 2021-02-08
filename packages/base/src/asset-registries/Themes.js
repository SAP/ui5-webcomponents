import { fetchJsonOnce, fetchTextOnce } from "../util/FetchHelper.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import getFileExtension from "../util/getFileExtension.js";
import { getEffectiveAssetPath } from "../util/EffectiveAssetPath.js";

const themeURLs = new Map();
const themeStyles = new Map();
const loaders = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();

/**
 * Used to provide CSS Vars for a specific theme for a specific package.
 * The CSS Vars can be passed directly as a string (containing them), as an object with a "_" property(containing them in the "_" property), or as a URL.
 * This URL must point to a JSON file, containing a "_" property.
 *
 * Example usage:
 *  1) Pass the CSS Vars as a string directly.
 *  registerThemeProperties("my-package", "my_theme", ":root{--var1: red;}");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - the style content directly
 */
const registerThemeProperties = (packageName, themeName, style) => {
	// pure string, including empty string
	themeStyles.set(`${packageName}_${themeName}`, style);
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
};

const registerThemePropertiesLoader = (packageName, themeName, loader) => {
	loaders.set(packageName, loader);
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
}

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style !== undefined) { // it's valid for style to be an empty string
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_${DEFAULT_THEME}`);
	}

	const loader = loaders.get(packageName);
	if (!loader) {
		// no themes for package
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (e) {
		console.error(packageName, e.message);
		return;
	}
	const themeProps = data._ || data;

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
	}

	return getFileExtension(url) === ".css" ? fetchTextOnce(url) : fetchJsonOnce(getEffectiveAssetPath(url));
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = theme => {
	return registeredThemes.has(theme);
};

export {
	registerThemePropertiesLoader,
	registerThemeProperties,
	getThemeProperties,
	getRegisteredPackages,
	isThemeRegistered,
};
