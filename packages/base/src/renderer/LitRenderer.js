import { html, svg, render } from "lit-html/lib/shady-render";

const litRender = (templateResult, domNode, styles, options) => {
	templateResult = html`${styles ? html`<style>${styles}</style>` : undefined} ${templateResult}`;
	render(templateResult, domNode, options);
};

export { html, svg };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";

export default litRender;
