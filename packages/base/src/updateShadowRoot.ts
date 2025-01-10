import getConstructableStyle from "./theming/getConstructableStyle.js";
import type UI5Element from "./UI5Element.js";

/**
 * Updates the shadow root of a UI5Element (both CSS and HTML)
 * @param element
 */
const updateShadowRoot = (element: UI5Element, skipDOMUpdate = false) => {
	const ctor = element.constructor as typeof UI5Element;
	const shadowRoot = element.shadowRoot;

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor);
	if (!skipDOMUpdate) {
		ctor.renderer(element, shadowRoot);
	}
};

export default updateShadowRoot;
