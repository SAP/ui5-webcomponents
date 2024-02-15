import getConstructableStyle from "./theming/getConstructableStyle.js";
import getEffectiveStyle from "./theming/getEffectiveStyle.js";
import getEffectiveLinksHrefs from "./theming/getEffectiveLinksHrefs.js";
import { shouldUseLinks } from "./CSP.js";
import type UI5Element from "./UI5Element.js";
import { isSafari } from "./Device.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element: UI5Element, forStaticArea = false, forChildren = false) => {
	let styleStrOrHrefsArr;
	const ctor = element.constructor as typeof UI5Element;
	let shadowRoot: ShadowRoot | HTMLElement | null = forStaticArea ? element.staticAreaItem!.shadowRoot : element.shadowRoot;
	if (forChildren) {
		shadowRoot = element;
	}
	let renderResult;
	if (forStaticArea) {
		renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
	} else if (forChildren) {
		renderResult = element.renderChildren();
	} else {
		renderResult = element.render(); // this is checked before calling updateShadowRoot
	}

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	if (shadowRoot instanceof ShadowRoot) {
		if (shouldUseLinks()) {
			styleStrOrHrefsArr = getEffectiveLinksHrefs(ctor, forStaticArea);
		} else if (document.adoptedStyleSheets && !isSafari()) { // Chrome
			shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
		} else { // FF, Safari
			styleStrOrHrefsArr = getEffectiveStyle(ctor, forStaticArea);
		}
	}

	if (ctor.renderer) {
		ctor.renderer(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
		return;
	}

	ctor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

export default updateShadowRoot;
