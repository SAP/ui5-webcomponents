import { render } from "lit-html";
import {
	html,
	svg,
	unsafeStatic,
} from "lit-html/static.js";
import { getFeature } from "../FeaturesRegistry.js";

const litRender = (templateResult, domNode, styleStrOrHrefsArr, forStaticArea, { host } = {}) => {
	if (typeof styleStrOrHrefsArr === "string") {
		templateResult = html`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
	} else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
		templateResult = html`${styleStrOrHrefsArr.map(href => html`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
	}

	const OpenUI5Enablement = getFeature("OpenUI5Enablement");
	if (OpenUI5Enablement && !forStaticArea) {
		templateResult = OpenUI5Enablement.wrapTemplateResultInBusyMarkup(html, host, templateResult);
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
