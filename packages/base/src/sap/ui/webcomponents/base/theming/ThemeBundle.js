import { fetchJsonOnce } from "../util/FetchHelper";

const themes = new Map();
const themeBundles = new Map();
const styles = new Map();

const registerThemeBundleUrl = (packageName, themeName, url) => {
	themes.set(`${packageName}_${themeName}`, url);
};

const fetchThemeBundle = async (packageName, themeName) => {
	const url = themes.get(`${packageName}_${themeName}`);
	const bundle = await fetchJsonOnce(url);
	themeBundles.set(`${packageName}_${themeName}`, bundle);
	return bundle;
};

const registerStyle = (theme, styleName, styleObj) => {
	if (typeof (styleObj) === "object" && styleObj._) {
		if (!styles.has(theme)) {
			styles.set(theme, {});
		}
		styles.get(theme)[styleName] = styleObj._;
	}
};

const getStyle = (theme, styleName) => {
	if (!styles.has(theme)) {
		styles.set(theme, {});
	}

	const themeMap = styles.get(theme);

	if (themeMap[styleName]) {
		return themeMap[styleName];
	}
};

const getStyles = async (theme, styleNames) => {
	// styles inlined from build or allready fetched
	const stylesPopulated = styleNames.every(styleName => getStyle(theme, styleName));

	if (!stylesPopulated) {
		// use bundle to fetch the styles efficiently
		const themeData = await fetchThemeBundle("@ui5/webcomponents", theme);

		Object.entries(themeData).forEach(([key, value]) => {
			registerStyle(theme, key, { _: value });
		});
	}

	return styleNames.map(styleName => getStyle(theme, styleName));
};

export { registerThemeBundleUrl as registerThemeBundle, registerStyle, getStyles };
