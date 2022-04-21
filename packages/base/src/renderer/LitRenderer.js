import {
	render,
	html,
	svg,
} from "lit-html";
import { getFeature } from "../FeaturesRegistry.js";

const effectiveHtml = (...args) => {
	const LitStatic = getFeature("LitStatic");
	const fn = LitStatic ? LitStatic.html : html;
	return fn(...args);
};

const effectiveSvg = (...args) => {
	const LitStatic = getFeature("LitStatic");
	const fn = LitStatic ? LitStatic.svg : svg;
	return fn(...args);
};

const litRender = (templateResult, domNode, styleStrOrHrefsArr, forStaticArea, { host } = {}) => {
	const OpenUI5Enablement = getFeature("OpenUI5Enablement");
	if (OpenUI5Enablement && !forStaticArea) {
		templateResult = OpenUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, host, templateResult);
	}

	if (typeof styleStrOrHrefsArr === "string") {
		templateResult = effectiveHtml`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
	} else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
		templateResult = effectiveHtml`${styleStrOrHrefsArr.map(href => effectiveHtml`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
	}
	render(templateResult, domNode, { host });
};

const scopeTag = (tag, tags, suffix) => {
	const LitStatic = getFeature("LitStatic");
	if (LitStatic) {
		return LitStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
	}
};

export {
	effectiveHtml as html,
	effectiveSvg as svg,
};
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
