import { fetchJsonOnce } from "../util/FetchHelper.js";

const themeURLs = new Map();
const themeStyles = new Map();

const registerThemeProperties = (packageName, themeName, style) => {
	if (style.includes(":root")) {
		// inlined content
		themeStyles.set(`${packageName}_${themeName}`, style);
	} else {
		// url for fetching
		themeURLs.set(`${packageName}_${themeName}`, style);
	}
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	const data = await fetchThemeProperties(packageName, themeName);
	themeStyles.set(`${packageName}_${themeName}`, data._);
	return data._;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import @ui5/webcomponents/dist/json-imports/Themes module to use theme switching`);
	}
	return fetchJsonOnce(url);
};

export { registerThemeProperties, getThemeProperties };
