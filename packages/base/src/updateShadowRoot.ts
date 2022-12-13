import executeTemplate from "./renderer/executeTemplate.js";
import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import getEffectiveLinksHrefs from "./theming/getEffectiveLinksHrefs.js";
import { shouldUseLinks } from "./CSP.js";
import type UI5Element from "./UI5Element.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element: UI5Element, forStaticArea = false) => {
	let styleStrOrHrefsArr;
	const ctor = element.constructor as typeof UI5Element;
	const propertyName = forStaticArea ? "staticAreaTemplate" : "template";
	const template = ctor[propertyName];
	const shadowRoot = forStaticArea ? element.staticAreaItem!.shadowRoot : element.shadowRoot;
	const renderResult = executeTemplate(template!, element); // this is checked before calling updateShadowRoot

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	if (shouldUseLinks()) {
		styleStrOrHrefsArr = getEffectiveLinksHrefs(ctor, forStaticArea);
	} else if (document.adoptedStyleSheets) { // Chrome
		shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
	} else { // FF, Safari
		styleStrOrHrefsArr = getEffectiveStyle(ctor, forStaticArea);
	}

	ctor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

export default updateShadowRoot;
