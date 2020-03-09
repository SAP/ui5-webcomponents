import { getEffectiveStyle } from "../Theming.js";
import { injectWebComponentStyle } from "./StyleInjection.js";
import adaptCSSForIE from "./adaptCSSForIE.js";

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

export default createHeadStyle;
