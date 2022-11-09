const getEffectiveAriaLabelText = (el) => {
    const accessibleEl = el;
    if (!accessibleEl.accessibleNameRef) {
        if (accessibleEl.accessibleName) {
            return accessibleEl.accessibleName;
        }
        return undefined;
    }
    return getAriaLabelledByTexts(el);
};
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAriaLabelledByTexts = (el) => {
    const ids = el.accessibleNameRef.split(" ");
    const owner = el.getRootNode();
    let result = "";
    ids.forEach((elementId, index) => {
        const element = owner.querySelector(`[id='${elementId}']`);
        result += `${element ? element.textContent : ""}`;
        if (index < ids.length - 1) {
            result += " ";
        }
    });
    return result;
};
/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el) => {
    const results = [];
    const labels = el.getRootNode().querySelectorAll(`[ui5-label][for="${el.id}"],label[for="${el.id}"]`);
    labels.forEach((label) => {
        const labelText = label.textContent;
        labelText && results.push(labelText);
    });
    if (results.length) {
        return results.join(" ");
    }
    return undefined;
};
export { getEffectiveAriaLabelText, getAriaLabelledByTexts, getAssociatedLabelForTexts, };
//# sourceMappingURL=AriaLabelHelper.js.map