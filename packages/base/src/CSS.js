import { getEffectiveStyle } from "./Theming.js";
import { injectWebComponentStyle } from "./theming/StyleInjection.js";
import adaptCSSForIE from "./util/CSSTransformUtils.js";

const constructableStyleMap = new Map();
const IEStyleSet = new Set();

/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */
const createHeadStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	if (IEStyleSet.has(tag)) {
		return;
	}

	let cssContent = getEffectiveStyle(ElementClass);
	cssContent = adaptCSSForIE(cssContent, tag);
	injectWebComponentStyle(tag, cssContent);
	IEStyleSet.add(tag);
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
	if (constructableStyleMap.has(tagName)) {
		return constructableStyleMap.get(tagName);
	}

	const style = new CSSStyleSheet();
	style.replaceSync(styleContent);

	constructableStyleMap.set(tagName, style);
	return style;
};

// eslint-disable-next-line
export { createHeadStyle, getConstructableStyle };
