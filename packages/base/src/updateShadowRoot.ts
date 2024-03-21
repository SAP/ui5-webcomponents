import getConstructableStyle from "./theming/getConstructableStyle.js";
import type UI5Element from "./UI5Element.js";

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element: UI5Element, forStaticArea = false) => {
	const ctor = element.constructor as typeof UI5Element;
	const shadowRoot = forStaticArea ? element.staticAreaItem!.shadowRoot : element.shadowRoot;
	let renderResult;
	if (forStaticArea) {
		renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
	} else {
		renderResult = element.render(); // this is checked before calling updateShadowRoot
	}

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);

	ctor.renderer(renderResult, shadowRoot, forStaticArea, { host: element });
};

export default updateShadowRoot;
