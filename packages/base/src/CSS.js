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
 * @param ElementClass
 * @returns {string|undefined}
 */
const getShadowRootStyle = ElementClass => {
	// Chrome - empty
	if (document.adoptedStyleSheets) {
		return;
	}

	// IE, and FF/Safari
	return getEffectiveStyle(ElementClass);
};

// eslint-disable-next-line
export { getConstructableStyle, getShadowRootStyle};
