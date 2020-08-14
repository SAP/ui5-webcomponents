import { getScope } from "../Scope.js";

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 * @returns {*}
 */
const executeTemplate = (template, component) => {
	const tagsToScope = component.constructor.dependencies.map(dep => dep.getMetadata().getPureTag());
	const scope = getScope();
	return template(component, tagsToScope, scope);
};

export default executeTemplate;
