import { fetchJsonOnce, fetchTextOnce } from "../util/FetchHelper.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import getFileExtension from "../util/getFileExtension.js";

const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const customThemes = new Map();

const registerCustomTheme = (name, baseName, content) => {
	customThemes.set(name, { baseName, content });
	registeredPackages.add("@ui5/webcomponents-theme-base");
};

const getCustomTheme = name => customThemes.get(name);

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
 *  3) Pass a URL to a CSS file, containing the CSS Vars. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.css");
 *  4) Pass a URL to a JSON file, containing the CSS Vars in its "_" property. Will be fetched on demand, not upon registration.
 *  registerThemeProperties("my-package", "my_theme", "http://url/to/my/theme.json");
 *
 * @public
 * @param packageName - the NPM package for which CSS Vars are registered
 * @param themeName - the theme which the CSS Vars implement
 * @param style - can be one of four options: a string, an object with a "_" property, URL to a CSS file, or URL to a JSON file with a "_" property
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

const getThemeProperties = async (packageName, themeName, fallbackThemeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	if (fallbackThemeName && !registeredThemes.has(themeName)) {
		themeName = fallbackThemeName;
		const style2 = themeStyles.get(`${packageName}_${themeName}`);
		if (style2) {
			return style2;
		}
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_${DEFAULT_THEME}`);
	}

	const data = await fetchThemeProperties(packageName, themeName);
	const themeProps = data._ || data;

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import the ${packageName}/dist/Assets.js module to switch to additional themes`);
	}

	return getFileExtension(url) === ".css" ? fetchTextOnce(url) : fetchJsonOnce(url);
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

export {
	registerThemeProperties,
	getThemeProperties,
	getRegisteredPackages,
	registerCustomTheme,
	getCustomTheme,
};
