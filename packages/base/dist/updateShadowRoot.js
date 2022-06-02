import executeTemplate from "./renderer/executeTemplate.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import getEffectiveLinksHrefs from "./theming/getEffectiveLinksHrefs.js";
import isLegacyBrowser from "./isLegacyBrowser.js";
import { shouldUseLinks } from "./CSP.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
	let styleStrOrHrefsArr;
	const template = forStaticArea ? "staticAreaTemplate" : "template";
	const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(element.constructor[template], element);

	if (shouldUseLinks()) {
		styleStrOrHrefsArr = getEffectiveLinksHrefs(element.constructor, forStaticArea);
	} else if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
	} else if (!isLegacyBrowser()) { // FF, Safari
		styleStrOrHrefsArr = getEffectiveStyle(element.constructor, forStaticArea);
	}

	element.constructor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

export default updateShadowRoot;
