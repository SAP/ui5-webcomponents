import { html, render } from "lit-html";

const litRender = (templateResult, domNode, eventContext, styles) => {
	if (styles) {
		templateResult = html`<style data-ui5-shadow-root-styles>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { eventContext });
};

export { html, svg } from "lit-html";
export { repeat } from "lit-html/directives/repeat";
export { classMap } from "lit-html/directives/class-map";
export { styleMap } from "lit-html/directives/style-map";

export default litRender;
