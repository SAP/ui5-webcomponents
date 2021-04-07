import { render } from "lit-html";
import {
	html,
	svg,
	withStatic,
	unsafeStatic,
} from "lit-html/static.js";

const litRender = (templateResult, domNode, styles, { host } = {}) => {
	if (styles) {
		templateResult = withStatic(html`<style>${styles}</style>${templateResult}`);
	}
	render(templateResult, domNode, { host });
};

const setTags = t => {

};
const setSuffix = s => {

};

export {
	html,
	svg,
	withStatic,
	unsafeStatic,
};
export { setTags, setSuffix };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
