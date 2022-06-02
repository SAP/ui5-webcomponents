import { getCustomElementsScopingSuffix, shouldScopeCustomElement } from "../CustomElementsScopeUtils.js";

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 * @returns {*}
 */
const executeTemplate = (template, component) => {
	const tagsToScope = getTagsToScope(component);
	const scope = getCustomElementsScopingSuffix();
	return template(component, tagsToScope, scope);
};

/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
const getTagsToScope = component => {
	const componentTag = component.constructor.getMetadata().getPureTag();
	const tagsToScope = component.constructor.getUniqueDependencies().map(dep => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);

	if (shouldScopeCustomElement(componentTag)) {
		tagsToScope.push(componentTag);
	}

	return tagsToScope;
};

export default executeTemplate;
