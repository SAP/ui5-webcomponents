import getConstructableStyle from "./theming/getConstructableStyle.js";
import type UI5Element from "./UI5Element.js";

interface OwnDefinedRendering extends UI5Element {
	render(): object
}

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 */
const updateShadowRoot = (element: UI5Element) => {
	const ctor = element.constructor as typeof UI5Element;
	const shadowRoot = element.shadowRoot;
	const renderResult = "render" in ctor.prototype ? (element as OwnDefinedRendering).render() : element._originalRender(); // this is checked before calling updateShadowRoot

	if (!shadowRoot) {
		console.warn(`There is no shadow root to update`); // eslint-disable-line
		return;
	}

	shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor);

	ctor.renderer(renderResult, shadowRoot, { host: element });
};

export default updateShadowRoot;
