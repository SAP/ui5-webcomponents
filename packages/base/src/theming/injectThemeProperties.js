import createStyleInHead from "../util/createStyleInHead.js";

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
		const noRoot = cssText.match(/:root{(.*?)}/)[1];
		const pairs = noRoot.split(";");
		const vars = {};
		pairs.forEach(pair => {
			const [varName, varValue] = pair.split(/:\s*/);
			vars[varName] = varValue;
		});
		// window.ShadyCSS.styleDocument(vars);
		return vars;
	}
};

export default injectThemeProperties;
