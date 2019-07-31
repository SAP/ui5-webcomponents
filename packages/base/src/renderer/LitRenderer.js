import { render } from "lit-html/lib/shady-render";

const litRender = (templateResult, domNode, options) => {
	render(templateResult, domNode, options);
};

export { html, svg } from "lit-html";
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";

export default litRender;
