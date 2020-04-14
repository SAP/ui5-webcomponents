import { fetchJsonOnce, fetchTextOnce } from "../util/FetchHelper.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import getFileExtension from "../util/getFileExtension.js";

const baseThemeURLs = new Map();
const baseThemeStyles = new Map();


const externalThemes = new Map();

const registerBaseTheme = (themeName, style) => {
	if (style._) {
		baseThemeStyles.set(themeName, style._);
	} else if (style.includes(":root")) {
		baseThemeStyles.set(themeName, style);
	} else {
		baseThemeURLs.set(themeName, style);
	}
	registeredThemes.add(themeName);
};

const getBaseThemeContent = async themeName => {
	const style = baseThemeStyles.get(themeName);
	if (style) {
		return style;
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

const registerExternalTheme = (themeName, baseThemeName, options) => {
	externalThemes.set(themeName, { baseThemeName, options });
};

const getExternalTheme = themeName => {
	return externalThemes.get(themeName);
};

const registerComponentPackage = (packageName, themeName, style) => {

};


const getComponentPackage = async themeName => {

};

const getRegisteredComponentPackages = () => {

};

export {
	registerBaseTheme,
	getBaseThemeContent,
	registerExternalTheme,
	getExternalTheme,
	registerComponentPackage,
	getComponentPackage,
	getRegisteredComponentPackages,
}
