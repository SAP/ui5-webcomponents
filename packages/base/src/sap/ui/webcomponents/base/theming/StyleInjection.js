import createStyleInHead from "../util/createStyleInHead";

const injectedForTags = [];

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
		styleElement = createStyleInHead(cssText, { "ui5-webcomponents-theme-properties": "" });
	}

	// IE only
	if (window.CSSVarsSimulation) {
		window.CSSVarsSimulation.findCSSVars(cssText);
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
	if (injectedForTags.indexOf(tagName) !== -1) {
		return;
	}
	createStyleInHead(cssText, { "data-sap-source": tagName });
	injectedForTags.push(tagName);

	// IE only
	if (window.CSSVarsSimulation) {
		const resolvedVarsCSS = window.CSSVarsSimulation.applyCSSVars(cssText);
		createStyleInHead(resolvedVarsCSS, { "data-sap-source-replaced-vars": tagName });
	}
};

/**
 * Updates the style elements holding the CSS for all web components by resolving the CSS Custom properties
 */
const updateWebComponentStyles = () => {
	if (!window.CSSVarsSimulation) {
		return;
	}

	// IE only
	injectedForTags.forEach(tagName => {
		const originalStyleElement = document.head.querySelector(`style[data-sap-source="${tagName}"]`);
		const replacedVarsStyleElement = document.head.querySelector(`style[data-sap-source-replaced-vars="${tagName}"]`);
		const resolvedVarsCSS = window.CSSVarsSimulation.applyCSSVars(originalStyleElement.textContent);
		replacedVarsStyleElement.textContent = resolvedVarsCSS;
	});
};

export {
	injectThemeProperties,
	injectWebComponentStyle,
	updateWebComponentStyles,
};
