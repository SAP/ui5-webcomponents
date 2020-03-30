import { fetchJsonOnce } from "../util/FetchHelper.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";

const themeURLs = new Map();
const themeStyles = new Map();
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
 *  2) Pass the CSS Vars as an object directly
 *  registerThemeProperties("my-package", "my_theme", {"_": ":root{--var1: red;}"});
 *  3) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of three options: a string, an object with a "_" property or a URL to a JSON file with a "_" property
 */
const registerThemeProperties = (packageName, themeName, style) => {
	if (style._) {
		// JSON object like ({"_": ":root"})
		themeStyles.set(`${packageName}_${themeName}`, style._);
	} else if (style.includes(":root")) {
		// pure string
		themeStyles.set(`${packageName}_${themeName}`, style);
	} else {
		// url for fetching
		themeURLs.set(`${packageName}_${themeName}`, style);
	}
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_${DEFAULT_THEME}`);
	}

	const data = await fetchThemeProperties(packageName, themeName);
	themeStyles.set(`${packageName}_${themeName}`, data._);
	return data._;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
	}
	return fetchJsonOnce(url);
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

export {
	registerThemeProperties,
	getThemeProperties,
	getRegisteredPackages,
};
