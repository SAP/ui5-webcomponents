import { fetchJsonOnce } from "../util/FetchHelper.js";

const themeURLs = new Map();
const propertiesStyles = new Map();

const registerThemeProperties = (packageName, themeName, data) => {
	if (data.includes(":root")) {
		// inlined content
		propertiesStyles.set(`${packageName}_${themeName}`, data);
	} else {
		// url for fetching
		themeURLs.set(`${packageName}_${themeName}`, data);
	}
};

const getThemeProperties = async (packageName, themeName) => {
	const style = propertiesStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	const data = await fetchThemeProperties(packageName, themeName);
	propertiesStyles.set(`${packageName}_${themeName}`, data._);
	return data._;
};

const fetchThemeProperties = async (packageName, themeName) => {
	const url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import @ui5/webcomponents/dist/ThemePropertiesProvider module to use theme switching`);
	}
	return fetchJsonOnce(url);
};

export { registerThemeProperties, getThemeProperties };
