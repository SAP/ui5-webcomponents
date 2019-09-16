import { getEffectiveStyle } from "./Theming.js";
import { getTheme } from "./config/Theme.js";
import { injectWebComponentStyle } from "./theming/StyleInjection.js";
import replaceSelectors from "./util/CSSTransformUtils.js";

const styleMap = new Map();

/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */
const createHeadStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	let cssContent = getEffectiveStyle(ElementClass);
	cssContent = adaptCSSForIE(cssContent, tag);
	injectWebComponentStyle(tag, cssContent);
};

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
	if (document.adoptedStyleSheets || window.ShadyDOM) {
		return;
	}

	const styleContent = getEffectiveStyle(ElementClass);
	return styleContent;
};

const adaptCSSForIE = (css, tag) => {
	css = css.replace(/([{}])/g, `$1\n`);
	css = replaceSelectors(css, ":host", tag);
	css = replaceSelectors(css, "::slotted", ``);
	return css;
};


// eslint-disable-next-line
export { createHeadStyle, getConstructableStyle, getShadowRootStyle};
