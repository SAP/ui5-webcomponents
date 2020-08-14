import getEffectiveStyle from "./getEffectiveStyle.js";
import { attachCustomCSSChange } from "./CustomStyle.js";

const constructableStyleMap = new Map();

attachCustomCSSChange(tag => {
	constructableStyleMap.delete(tag);
});

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();

	if (!constructableStyleMap.has(tag)) {
		const styleContent = getEffectiveStyle(ElementClass);
		const style = new CSSStyleSheet();
		style.replaceSync(styleContent);
		constructableStyleMap.set(tag, [style]);
	}

	return constructableStyleMap.get(tag);
};

export default getConstructableStyle;
