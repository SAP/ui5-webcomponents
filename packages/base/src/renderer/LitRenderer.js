import { html, render } from "lit-html";

const litRender = (templateResult, domNode, styles, { eventContext } = {}) => {
	if (styles) {
		templateResult = html`<style>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { eventContext });
};

export { html, svg } from "lit-html";
export { repeat } from "lit-html/directives/repeat";
export { classMap } from "lit-html/directives/class-map";
export { styleMap } from "lit-html/directives/style-map";

export default litRender;
