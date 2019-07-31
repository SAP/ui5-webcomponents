import createStyleInHead from "../util/createStyleInHead.js";

const injectedForTags = [];
let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
	ponyfillTimer = undefined;

	window.CSSVarsPonyfill.resetCssVars();
	window.CSSVarsPonyfill.cssVars({
		rootElement: document.head,
		include: "style[data-ui5-theme-properties]",
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
		window.ShadyCSS.styleDocument(vars);
	}
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
		"data-ui5-element-styles": tagName,
		"disabled": "disabled",
	});
	injectedForTags.push(tagName);

	// When injecting component styles, more might come in the same tick, so run the ponyfill async (to avoid double work)
	if (ponyfillNeeded()) {
		schedulePonyfill();
	}
};

export {
	injectThemeProperties,
	injectWebComponentStyle,
};
