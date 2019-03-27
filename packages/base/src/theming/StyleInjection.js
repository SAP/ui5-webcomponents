import createStyleInHead from "../util/createStyleInHead";

const injectedForTags = [];

const runPonyfill = () => {
	if (typeof window.cssVars !== "function") {
		return;
	}

	window.cssVars({
		rootElement: document.head,
		include: "style[ui5-webcomponents-theme-properties],style[data-sap-source]",
		silent: true,
	});
};

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

	runPonyfill();
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
	createStyleInHead(cssText, {
		"data-sap-source": tagName,
		"disabled": "disabled",
	});
	injectedForTags.push(tagName);

	runPonyfill();
};

/**
 * Updates the style elements holding the CSS for all web components by resolving the CSS Custom properties
 */
const updateWebComponentStyles = () => {
	runPonyfill();
};

export {
	injectThemeProperties,
	injectWebComponentStyle,
	updateWebComponentStyles,
};
