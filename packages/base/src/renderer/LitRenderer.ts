import {
	render,
	html,
	svg,
} from "lit-html";

import type { TemplateResult } from "lit-html";

import { getFeature } from "../FeaturesRegistry.js";
import type { LitStatic } from "../CustomElementsScope.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import type UI5Element from "../UI5Element.js";
import type { Renderer, RendererOptions } from "../UI5Element.js";
import type { TemplateFunctionResult } from "./executeTemplate.js";

const effectiveHtml = (strings: TemplateStringsArray, ...values: Array<unknown>) => {
	const litStatic = getFeature<typeof LitStatic>("LitStatic");
	const fn = litStatic ? litStatic.html : html;
	return fn(strings, ...values);
};

const effectiveSvg = (strings: TemplateStringsArray, ...values: Array<unknown>) => {
	const litStatic = getFeature<typeof LitStatic>("LitStatic");
	const fn = litStatic ? litStatic.svg : svg;
	return fn(strings, ...values);
};

const litRender: Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, options: RendererOptions) => {
	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");
	if (openUI5Enablement) {
		templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host as UI5Element, templateResult as TemplateResult);
	}

	render(templateResult as TemplateResult, container, options);
};

const scopeTag = (tag: string, tags: Array<string>, suffix: string) => {
	const litStatic = getFeature<typeof LitStatic>("LitStatic");
	if (litStatic) {
		return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
	}
};

export {
	effectiveHtml as html,
	effectiveSvg as svg,
};
export { scopeTag };
export { repeat } from "lit-html/directives/repeat.js";
export { classMap } from "lit-html/directives/class-map.js";
// @ts-ignore style-map is a JS file
export { styleMap } from "./directives/style-map.js";
export { ifDefined } from "lit-html/directives/if-defined.js";
export { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default litRender;
