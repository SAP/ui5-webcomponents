import getConstructableStyle from "./theming/getConstructableStyle.js";
import type UI5Element from "./UI5Element.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 */
const updateShadowRoot = (element: UI5Element, forChildren = false) => {
	const ctor = element.constructor as typeof UI5Element;
	const shadowRoot = forChildren ? element : element.shadowRoot;
	const renderResult = forChildren ? element.renderChildren() : element.render(); // this is checked before calling updateShadowRoot

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	if (shadowRoot instanceof ShadowRoot) {
		shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor);
	}

	ctor.renderer(renderResult, shadowRoot, { host: element });
};

export default updateShadowRoot;
