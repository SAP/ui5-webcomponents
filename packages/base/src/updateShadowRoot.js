import executeTemplate from "./renderer/executeTemplate.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import getEffectiveLinks from "./theming/getEffectiveLinks.js";
import isLegacyBrowser from "./isLegacyBrowser.js";
import { shouldUseLinks } from "./CSP.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
	let styleOrLinksToPrepend;
	const template = forStaticArea ? "staticAreaTemplate" : "template";
	const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(element.constructor[template], element);

	if (shouldUseLinks()) {
		styleOrLinksToPrepend = getEffectiveLinks(element.constructor, forStaticArea);
		if (styleOrLinksToPrepend === undefined && element.constructor[forStaticArea ? "staticAreaStyles" : "styles"]) {
			console.warn(`The ${element.constructor.getMetadata().getTag()} component does not provide links`); // eslint-disable-line
		}
	} else if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
	} else if (!isLegacyBrowser()) { // FF, Safari
		styleOrLinksToPrepend = getEffectiveStyle(element.constructor, forStaticArea);
	}

	element.constructor.render(renderResult, shadowRoot, styleOrLinksToPrepend, { host: element });
};

export default updateShadowRoot;
