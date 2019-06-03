import { html, render } from "lit-html";

class LitRenderer {
	/**
	 * Renders "templateResult" by replacing the content of "domNode", and optionally prepends a style tag containing "styles"
	 * @param templateResult - lit template result object
	 * @param domNode - the node whose content will be replaced
	 * @param eventContext - the context of events, bound via the template
	 * @param styles - if given, will be prepended in a style tag
	 */
	static render(templateResult, domNode, eventContext, styles) {
		if (styles) {
			templateResult = html`<style data-ui5-shadow-root-styles>${styles}</style>${templateResult}`;
		}
		render(templateResult, domNode, { eventContext });
	}
}

export { html, svg } from "lit-html";
export { repeat } from "lit-html/directives/repeat";
export { classMap } from "lit-html/directives/class-map";
export { styleMap } from "lit-html/directives/style-map";

export default LitRenderer;
