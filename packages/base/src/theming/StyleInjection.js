import createStyleInHead from "../util/createStyleInHead";

const injectedForTags = [];

const runPonyfill = () => {
	if (typeof window.CSSVarsPonyfill === "undefined") {
		return;
	}

	window.CSSVarsPonyfill.resetCssVars();
	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		include: "style[data-ui5-webcomponents-theme-properties],style[data-ui5-webcomponent-styles]",
		silent: true,
	});
};

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 */
const injectThemeProperties = cssText => {
	// Needed for all browsers
	const styleElement = document.head.querySelector(`style[data-ui5-webcomponents-theme-properties]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		createStyleInHead(cssText, { "data-ui5-webcomponents-theme-properties": "" });
	}

	runPonyfill();
};

/**
 * Creates a style element holding the CSS for a web component (and resolves CSS Custom Properties for IE)
 * @param tagName
 * @param cssText
 */
const injectWebComponentStyle = (tagName, cssText) => {
	// Edge and IE
	if (injectedForTags.indexOf(tagName) !== -1) {
		return;
	}
	createStyleInHead(cssText, {
		"data-ui5-webcomponent-styles": tagName,
		"disabled": "disabled",
	});
	injectedForTags.push(tagName);

	runPonyfill();
};

export {
	injectThemeProperties,
	injectWebComponentStyle,
};
