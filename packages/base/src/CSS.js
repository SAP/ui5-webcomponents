import { getEffectiveStyle } from "./Theming.js";
import { getTheme } from "./config/Theme.js";

const styleMap = new Map();

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = ElementClass => {
	const tagName = ElementClass.getMetadata().getTag();
	const styleContent = getEffectiveStyle(ElementClass);
	const theme = getTheme();
	const key = theme + tagName;
	if (styleMap.has(key)) {
		return styleMap.get(key);
	}

	const style = new CSSStyleSheet();
	style.replaceSync(styleContent);

	styleMap.set(key, style);
	return style;
};

/**
 * Returns the CSS to be injected inside a web component shadow root, or undefined if not needed
 * Note: FF, Safari
 * @param ElementClass
 * @returns {string}
 */
const getShadowRootStyle = ElementClass => {
	// Chrome - empty
	if (document.adoptedStyleSheets) {
		return "";
	}

	// IE when ShadyCSS was not run, and FF/Safari
	const styleContent = getEffectiveStyle(ElementClass);
	return styleContent;
};

// eslint-disable-next-line
export { getConstructableStyle, getShadowRootStyle};
