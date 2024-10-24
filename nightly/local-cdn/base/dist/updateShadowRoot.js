import getConstructableStyle from "./theming/getConstructableStyle.js";
/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 */
const updateShadowRoot = (element) => {
    const ctor = element.constructor;
    const shadowRoot = element.shadowRoot;
    const renderResult = element.render(); // this is checked before calling updateShadowRoot
    if (!shadowRoot) {
        console.warn(`There is no shadow root to update`); // eslint-disable-line
        return;
    }
    shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor);
    ctor.renderer(renderResult, shadowRoot, { host: element });
};
export default updateShadowRoot;
//# sourceMappingURL=updateShadowRoot.js.map