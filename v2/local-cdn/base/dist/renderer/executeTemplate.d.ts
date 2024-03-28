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
declare const executeTemplate: (template: TemplateFunction, component: UI5Element) => TemplateFunctionResult;
export default executeTemplate;
export type { TemplateFunction, TemplateFunctionResult };
