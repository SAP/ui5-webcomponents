import { getCustomElementsScopingSuffix, shouldScopeCustomElement } from "../CustomElementsScopeUtils.js";
import type UI5Element from "../UI5Element.js";

type TemplateFunctionResult = object;
type TemplateFunction = (component: UI5Element, tagsToScope: Array<string>, scope: string | undefined) => TemplateFunctionResult;

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template: TemplateFunction, component: UI5Element): TemplateFunctionResult => {
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
const getTagsToScope = (component: UI5Element) => {
	const ctor = component.constructor as typeof UI5Element;

	const componentTag = ctor.getMetadata().getPureTag();
	const tagsToScope = ctor.getUniqueDependencies().map((dep: typeof UI5Element) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);

	if (shouldScopeCustomElement(componentTag)) {
		tagsToScope.push(componentTag);
	}

	return tagsToScope;
};

export default executeTemplate;
export type { TemplateFunction, TemplateFunctionResult };
