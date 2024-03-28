import getConstructableStyle from "./theming/getConstructableStyle.js";
/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
    const ctor = element.constructor;
    const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
    let renderResult;
    if (forStaticArea) {
        renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
    }
    else {
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
//# sourceMappingURL=updateShadowRoot.js.map