import getEffectiveStyle from "./getEffectiveStyle.js";
import { attachCustomCSSChange } from "./CustomStyle.js";
import type UI5Element from "../UI5Element.js";

const constructableStyleMap = new Map<string, Array<CSSStyleSheet>>();

attachCustomCSSChange((tag: string) => {
	constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});

/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass: typeof UI5Element) => {
	const tag = ElementClass.getMetadata().getTag();
	const key = `${tag}_normal`;

	if (!constructableStyleMap.has(key)) {
		const styleContent = getEffectiveStyle(ElementClass);
		const style = new CSSStyleSheet();
		style.replaceSync(styleContent);
		constructableStyleMap.set(key, [style]);
	}

	return constructableStyleMap.get(key)!;
};

export default getConstructableStyle;
