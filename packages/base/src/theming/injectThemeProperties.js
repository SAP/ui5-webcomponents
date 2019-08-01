import createStyleInHead from "../util/createStyleInHead.js";
import extractCSSVars from "./extractCSSVars.js";

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 */
const injectThemeProperties = cssText => {
	// Needed for all browsers
	const styleElement = document.head.querySelector(`style[data-ui5-theme-properties]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		createStyleInHead(cssText, { "data-ui5-theme-properties": "" });
	}

	if (window.ShadyCSS && cssText) {
		return extractCSSVars(cssText);
	}
};

export default injectThemeProperties;
