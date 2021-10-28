import executeTemplate from "./renderer/executeTemplate.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import isLegacyBrowser from "./isLegacyBrowser.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
	let styleToPrepend;
	const template = forStaticArea ? "staticAreaTemplate" : "template";
	const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(element.constructor[template], element);

	if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(element.constructor, forStaticArea);
	} else if (!isLegacyBrowser()) { // FF, Safari
		styleToPrepend = getEffectiveStyle(element.constructor, forStaticArea);
	}

	element.constructor.render(renderResult, shadowRoot, styleToPrepend, { host: element });
};

export default updateShadowRoot;
