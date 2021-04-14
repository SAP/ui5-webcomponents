import { html, svg, render } from "lit-html/lit-html.js";
import scopeHTML from "./scopeHTML.js";

let tags;
let	suffix;

const setTags = t => {
	tags = t;
};
const setSuffix = s => {
	suffix = s;
};

const litRender = (templateResult, domNode, styles, { eventContext } = {}) => {
	if (styles) {
		templateResult = html`<style>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { eventContext });
};

const scopedHtml = (strings, ...values) => html(scopeHTML(strings, tags, suffix), ...values);
const scopedSvg = (strings, ...values) => svg(scopeHTML(strings, tags, suffix), ...values);

export { setTags, setSuffix };
export { scopedHtml as html, scopedSvg as svg };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
