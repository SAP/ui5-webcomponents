import type { RenderOptions } from "lit-html";
import type UI5Element from "../UI5Element.js";
import type { TemplateFunction as Template, TemplateFunctionResult } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";

type Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: RenderOptions) => void;

/**
 * Returns a custom element class decorator.
 *
 * @param { CustomElementOptions } options
 * @returns { ClassDecorator }
 */
type CustomElementOptions = {
	tag?: string;
	languageAware?: boolean;
	fastNavigation?: boolean;
	dependencies?: Array<typeof UI5Element>;
	template?: Template;
	staticAreaTemplate?: Template;
	styles?: Styles;
	staticAreaStyles?: Styles;
	renderer?: Renderer;
}

const customElement2 = (options: CustomElementOptions): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		target.decoratorMetadata.tag = options.tag;
		target.decoratorMetadata.languageAware = !!options.languageAware;
		target.decoratorMetadata.fastNavigation = !!options.fastNavigation;

		if (options.template) {
			Object.defineProperty(target, "template", {
				get: () => options.template,
			});
		}

		if (options.staticAreaTemplate) {
			Object.defineProperty(target, "staticAreaTemplate", {
				get: () => options.staticAreaTemplate,
			});
		}

		if (options.renderer) {
			Object.defineProperty(target, "render", {
				get: () => options.renderer,
			});
		}

		if (options.styles) {
			Object.defineProperty(target, "styles", {
				get: () => options.styles,
			});
		}
		if (options.staticAreaStyles) {
			Object.defineProperty(target, "staticAreaStyles", {
				get: () => options.staticAreaStyles,
			});
		}
	};
};

export default customElement2;
