import { render } from "lit-html";
import {
	html,
	svg,
	unsafeStatic,
} from "lit-html/static.js";

const litRender = (templateResult, domNode, styleStringOrLinksHrefs, { host } = {}) => {
	if (typeof styleStringOrLinksHrefs === "string") {
		templateResult = html`<style>${styleStringOrLinksHrefs}</style>${templateResult}`;
	} else if (Array.isArray(styleStringOrLinksHrefs) && styleStringOrLinksHrefs.length) {
		templateResult = html`${styleStringOrLinksHrefs.map(link => html`<link type="text/css" rel="stylesheet" href="${link}">`)}${templateResult}`;
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
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
