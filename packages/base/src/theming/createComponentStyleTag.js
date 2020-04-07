import createStyleInHead from "../util/createStyleInHead.js";
import getEffectiveStyle from "./getEffectiveStyle.js";
import adaptCSSForIE from "./adaptCSSForIE.js";
import { ponyfillNeeded, schedulePonyfill } from "./CSSVarsPonyfill.js";

const IEStyleSet = new Set();

const getStaticStyle = ElementClass => {
	let componentStaticStyles = ElementClass.staticAreaStyles;
	if (Array.isArray(componentStaticStyles)) {
		componentStaticStyles = componentStaticStyles.join(" ");
	}

	return componentStaticStyles;
};

/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */
const createComponentStyleTag = ElementClass => {
	const tag = ElementClass.getMetadata().getTag();
	if (IEStyleSet.has(tag)) {
		return;
	}

	let cssContent = getEffectiveStyle(ElementClass);
	cssContent = adaptCSSForIE(cssContent, tag);

	// Append static CSS, if any, for IE
	let staticCssContent = getStaticStyle(ElementClass);
	if (staticCssContent) {
		staticCssContent = adaptCSSForIE(staticCssContent, "ui5-static-area-item");
		cssContent = `${cssContent} ${staticCssContent}`;
	}

	createStyleInHead(cssContent, {
		"data-ui5-element-styles": tag,
		"disabled": "disabled",
	});
	if (ponyfillNeeded()) {
		schedulePonyfill();
	}

	IEStyleSet.add(tag);
};

export default createComponentStyleTag;
