import { getCustomElementsScopingSuffix, shouldScopeCustomElement } from "../CustomElementsScopeUtils.js";
/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template, component) => {
    const tagsToScope = getTagsToScope(component);
    const scope = getCustomElementsScopingSuffix();
    return template.call(component, component, tagsToScope, scope);
};
/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
const getTagsToScope = (component) => {
    const ctor = component.constructor;
    const componentTag = ctor.getMetadata().getPureTag();
    const tagsToScope = ctor.getUniqueDependencies().map((dep) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);
    if (shouldScopeCustomElement(componentTag)) {
        tagsToScope.push(componentTag);
    }
    return tagsToScope;
};
export default executeTemplate;
//# sourceMappingURL=executeTemplate.js.map