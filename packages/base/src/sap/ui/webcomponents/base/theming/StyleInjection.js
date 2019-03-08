import createStyleInHead from "../util/createStyleInHead";

const injectedFor = [];

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 */
const injectThemeProperties = cssText => {

	// Needed for all browsers
	let styleElement = document.head.querySelector(`style[ui5-webcomponents-theme-properties]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		styleElement = createStyleInHead(cssText, {"ui5-webcomponents-theme-properties": ""});
	}

	// IE only
	if (window.CSSVarsPolyfill) {
		window.CSSVarsPolyfill.findCSSVars([styleElement]);
	}
};

/**
 * Creates a style element holding the CSS for a web component (and resolves CSS Custom Properties for IE)
 * @param tagName
 * @param cssText
 */
const injectWebComponentStyle = (tagName, cssText) => {
	if (!window.ShadyDOM) {
		return;
	}

	// Edge and IE
	if (injectedFor.indexOf(tagName) !== -1) {
		return;
	}
	const styleElement = createStyleInHead(cssText, {"data-sap-source": tagName});
	injectedFor.push(tagName);

	// IE only
	if (window.CSSVarsPolyfill) {
		window.CSSVarsPolyfill.resolveCSSVars([styleElement]);
	}
};

/**
 * Updates the style elements holding the CSS for all web components by resolving the CSS Custom properties
 */
const updateWebComponentStyles = () => {
	if (!window.CSSVarsPolyfill) {
		return;
	}

	// IE only
	injectedFor.forEach(tagName => {
		const styleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);
		window.CSSVarsPolyfill.resolveCSSVars([styleElement]);
	});
};


export {
	injectThemeProperties,
	injectWebComponentStyle,
	updateWebComponentStyles,
};
