import {
	render,
	html,
	svg,
	TemplateResult,
} from "lit-html";

import { getFeature } from "../FeaturesRegistry.js";
import type { LitStatic } from "../CustomElementsScope.js";
import type OpenUI5Enablement from "../features/OpenUI5Enablement.js";
import type UI5Element from "../UI5Element.js";
import { TemplateFunctionResult } from "./executeTemplate.js";

type Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: RenderOptions) => void;

type RenderOptions = {
	/**
	 * An object to use as the `this` value for event listeners. It's often
	 * useful to set this to the host component rendering a template.
	 */
	host?: object,

	/**
	 * A DOM node before which to render content in the container.
	 */
	renderBefore?: ChildNode | null,

	/**
	 * Node used for cloning the template (`importNode` will be called on this
	 * node). This controls the `ownerDocument` of the rendered DOM, along with
	 * any inherited context. Defaults to the global `document`.
	 */
	creationScope?: {
		importNode(node: Node, deep?: boolean): Node,
	},

	/**
	 * The initial connected state for the top-level part being rendered. If no
	 * `isConnected` option is set, `AsyncDirective`s will be connected by
	 * default. Set to `false` if the initial render occurs in a disconnected tree
	 * and `AsyncDirective`s should see `isConnected === false` for their initial
	 * render. The `part.setConnected()` method must be used subsequent to initial
	 * render to change the connected state of the part.
	 */
	isConnected?: boolean,
}

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

const litRender: Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: RenderOptions) => {
	const openUI5Enablement = getFeature<typeof OpenUI5Enablement>("OpenUI5Enablement");
	if (openUI5Enablement && !forStaticArea) {
		templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host as UI5Element, templateResult as TemplateResult);
	}

	if (typeof styleStrOrHrefsArr === "string") {
		templateResult = effectiveHtml`<style>${styleStrOrHrefsArr}</style>${templateResult}`;
	} else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
		templateResult = effectiveHtml`${styleStrOrHrefsArr.map(href => effectiveHtml`<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
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

export type {
	Renderer,
	RenderOptions,
};
