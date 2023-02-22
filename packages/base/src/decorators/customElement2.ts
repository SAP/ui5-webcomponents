import type UI5Element from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
import type { Renderer } from "../renderer/LitRenderer.js";

/**
 * Returns a custom element class decorator.
 *
 * @param { CustomElementOptions } options
 * @returns { ClassDecorator }
 */
type CustomElementOptions = {
	tag?: string,
	languageAware?: boolean,
	fastNavigation?: boolean,
	dependencies?: Array<typeof UI5Element>,
	template?: Template,
	staticAreaTemplate?: Template,
	styles?: Styles,
	staticAreaStyles?: Styles,
	renderer?: Renderer,
}

const customElement2 = ({
	tag,
	languageAware = false,
	fastNavigation = false,
	renderer,
	template,
	staticAreaTemplate,
	styles,
	staticAreaStyles,
	dependencies = [],
} : CustomElementOptions): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		target.decoratorMetadata.tag = tag;
		target.decoratorMetadata.languageAware = !!languageAware;
		target.decoratorMetadata.fastNavigation = !!fastNavigation;

		if (template) {
			Object.defineProperty(target, "template", {
				get: () => template,
			});
		}

		if (dependencies.length) {
			Object.defineProperty(target, "dependencies", {
				get: () => {
					return dependencies;
				},
			});
		}

		if (staticAreaTemplate) {
			Object.defineProperty(target, "staticAreaTemplate", {
				get: () => staticAreaTemplate,
			});
		}

		if (renderer) {
			Object.defineProperty(target, "render", {
				get: () => renderer,
			});
			Object.defineProperty(target, "renderer", {
				get: () => renderer,
			});
		}

		if (styles) {
			Object.defineProperty(target, "styles", {
				get: () => styles,
			});
		}
		if (staticAreaStyles) {
			Object.defineProperty(target, "staticAreaStyles", {
				get: () => staticAreaStyles,
			});
		}
	};
};

export default customElement2;
