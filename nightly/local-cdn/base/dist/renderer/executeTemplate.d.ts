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
/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
declare const getTagsToScope: (component: UI5Element) => string[];
export default executeTemplate;
export { getTagsToScope };
export type { TemplateFunction, TemplateFunctionResult };
