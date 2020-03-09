import getEffectiveStyle from "./getEffectiveStyle.js";

const constructableStyleMap = new Map();

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

export default getConstructableStyle;
