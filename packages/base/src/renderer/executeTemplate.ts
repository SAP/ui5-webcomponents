import type UI5Element from "../UI5Element.js";

type TemplateFunctionResult = object;
type TemplateFunction = () => TemplateFunctionResult;

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template: TemplateFunction, component: UI5Element): TemplateFunctionResult => {
	return template.call(component);
};

export default executeTemplate;
export type { TemplateFunction, TemplateFunctionResult };
