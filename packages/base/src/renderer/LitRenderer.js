import { render } from "lit-html";
import {
	html,
	svg,
	unsafeStatic,
} from "lit-html/static.js";

const litRender = (templateResult, domNode, styles, { host } = {}) => {
	if (styles) {
		templateResult = html`<style>${styles}</style>${templateResult}`;
	}
	render(templateResult, domNode, { host });
};

const scopeTag = (tag, tags, suffix) => {
	const resultTag = suffix && (tags || []).includes(tag) ? `${tag}-${suffix}` : tag;
	return unsafeStatic(resultTag);
};

export {
	html,
	svg,
	unsafeStatic,
};
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "lit-html/directives/style-map.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
