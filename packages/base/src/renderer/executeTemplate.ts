import type UI5Element from "../UI5Element.js";

type TemplateFunction = () => object;

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template: TemplateFunction, component: UI5Element) => {
	return template.call(component);
};

export default executeTemplate;
export type { TemplateFunction };
