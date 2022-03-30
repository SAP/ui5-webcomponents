import {
	render,
	html,
	svg,
} from "lit-html";
import {
	html as staticHtml,
	svg as staticSvg,
	unsafeStatic,
} from "lit-html/static.js";
import { getCustomElementsScopingSuffix } from "../CustomElementsScope.js";

const effectiveHtml = (...args) => {
	const fn = getCustomElementsScopingSuffix() ? staticHtml : html;
	return fn(...args);
};

const effectiveSvg = (...args) => {
	const fn = getCustomElementsScopingSuffix() ? staticSvg : svg;
	return fn(...args);
};

const litRender = (templateResult, domNode, styleStrOrHrefsArr, { host } = {}) => {
	if (typeof styleStrOrHrefsArr === "string") {
		templateResult = effectiveHtml`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
	} else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
		templateResult = effectiveHtml`${styleStrOrHrefsArr.map(href => effectiveHtml`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
	}
	render(templateResult, domNode, { host });
};

const scopeTag = (tag, tags, suffix) => {
	const resultTag = (tags || []).includes(tag) ? `${tag}-${suffix}` : tag;
	return unsafeStatic(resultTag);
};

export {
	effectiveHtml as html,
	effectiveSvg as svg,
	unsafeStatic,
};
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
