import { render } from "lit-html";

class LitRenderer {
	static render(renderResult, domNode, options) {
		render(renderResult, domNode, options);
	}
}

export { html, svg } from "lit-html";
export { repeat } from "lit-html/directives/repeat";
export { classMap } from "lit-html/directives/class-map";
export { styleMap } from "lit-html/directives/style-map";

export default LitRenderer;
