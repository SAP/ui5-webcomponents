import createStyleInHead from "../util/createStyleInHead.js";

let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		include: "style[data-ui5-theme-properties],style[data-ui5-element-styles]",
		silent: true,
	});
};

const schedulePonyfill = () => {
	if (!ponyfillTimer) {
		ponyfillTimer = window.setTimeout(runPonyfill, 0);
	}
};

/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 * @param packageName
 */
const injectThemeProperties = (cssText, packageName) => {
	packageName = packageName.replace(/[@/]/g, "-");
	const identifier = `data-ui5-theme-properties-${packageName}`;

	// Needed for all browsers
	const styleElement = document.head.querySelector(`style[${identifier}]`);
	if (styleElement) {
		styleElement.textContent = cssText || "";	// in case of undefined
	} else {
		const attributes = {
			"data-ui5-theme-properties": "",
			[identifier]: "",
		};
		createStyleInHead(cssText, attributes);
	}

	// When changing the theme, run the ponyfill immediately
	if (ponyfillNeeded()) {
		runPonyfill();
	}
};

/**
 * Creates a style element holding the CSS for a web component (and resolves CSS Custom Properties for IE)
 * @param tagName
 * @param cssText
 */
const injectWebComponentStyle = (tagName, cssText) => {
	// Edge and IE
	createStyleInHead(cssText, {
		"data-ui5-element-styles": tagName,
		"disabled": "disabled",
	});

	// When injecting component styles, more might come in the same tick, so run the ponyfill async (to avoid double work)
	if (ponyfillNeeded()) {
		schedulePonyfill();
	}
};

export {
	injectThemeProperties,
	injectWebComponentStyle,
};
