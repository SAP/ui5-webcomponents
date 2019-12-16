import { fetchJsonOnce } from "../util/FetchHelper.js";

const themeURLs = new Map();
const themeStyles = new Map();
const registeredPackages = new Set();
const SUPPORTED_THEMES = ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb"];

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
};

const getThemeProperties = async (packageName, themeName) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style) {
		return style;
	}

	if (!SUPPORTED_THEMES.includes(themeName)) {
		console.warn(`You have requested non-existing theme - falling back to sap_fiori_3. The supported themes are: ${SUPPORTED_THEMES.join(", ")}.`); /* eslint-disable-line */
		return themeStyles.get(`${packageName}_sap_fiori_3`);
	}

	const data = await fetchThemeProperties(packageName, themeName);
	themeStyles.set(`${packageName}_${themeName}`, data._);
	return data._;
};

const fetchThemeProperties = async (packageName, themeName) => {
	let url = themeURLs.get(`${packageName}_${themeName}`);

	if (!url) {
		throw new Error(`You have to import @ui5/webcomponents/dist/json-imports/Themes module to use theme switching`);
	}
	if (!url.startsWith("/") && window.sap && window.sap.ui) {
		url = `${window.sap.ui.require.toUrl("")}/${url}`;
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
