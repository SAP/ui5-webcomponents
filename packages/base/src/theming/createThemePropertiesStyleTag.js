import createStyleInHead from "../util/createStyleInHead.js";

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName) => {
	const styleElement = document.head.querySelector(`style[data-ui5-theme-properties="${packageName}"]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		const attributes = {
			"data-ui5-theme-properties": packageName,
		};
		createStyleInHead(cssText, attributes);
	}
};

export default createThemePropertiesStyleTag;
