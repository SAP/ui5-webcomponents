import createStyleInHead from "../util/createStyleInHead.js";

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName, themeName, versionIndex) => {
	const styleElement = getThemePropertiesStyleTag(packageName);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
		styleElement.setAttribute("data-ui5-package", packageName);
		styleElement.setAttribute("data-ui5-theme", themeName);
		styleElement.setAttribute("data-ui5-version-index", versionIndex);
	} else {
		const attributes = {
			"data-ui5-theme-properties": packageName, // for compatibility
			"data-ui5-package": packageName,
			"data-ui5-theme": themeName,
			"data-ui5-version-index": versionIndex,
		};
		createStyleInHead(cssText, attributes);
	}
};

const getThemePropertiesStyleTag = packageName => {
	return document.head.querySelector(`style[data-ui5-theme-properties="${packageName}"]`);
};

const removeThemePropertiesStyleTag = packageName => {
	const styleElement = getThemePropertiesStyleTag(packageName);
	if (styleElement) {
		styleElement.parentElement.removeChild(styleElement);
	}
};

export {
	createThemePropertiesStyleTag,
	getThemePropertiesStyleTag,
	removeThemePropertiesStyleTag,
};
