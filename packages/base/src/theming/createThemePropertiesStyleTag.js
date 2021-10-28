import { hasStyle, createStyle, updateStyle } from "../ManagedStyles.js";

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const createThemePropertiesStyleTag = (cssText, packageName) => {
	if (hasStyle("data-ui5-theme-properties", packageName)) {
		updateStyle(cssText, "data-ui5-theme-properties", packageName);
	} else {
		createStyle(cssText, "data-ui5-theme-properties", packageName);
	}
};

export default createThemePropertiesStyleTag;
