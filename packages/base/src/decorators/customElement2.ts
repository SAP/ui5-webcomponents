import type UI5Element from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
import type { Renderer } from "../renderer/LitRenderer.js";

type CustomElementOptions = {
	tag?: string,
	languageAware?: boolean,
	themeAware?: boolean,
	fastNavigation?: boolean,
	dependencies?: Array<typeof UI5Element>,
	template?: Template,
	staticAreaTemplate?: Template,
	styles?: Styles,
	staticAreaStyles?: Styles,
	renderer?: Renderer,
}

/**
 * Returns a custom element class decorator.
 *
 * @param { CustomElementOptions } options
 * @returns { ClassDecorator }
 */
const customElement2 = ({
	tag,
	languageAware = false,
	themeAware = false,
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
		target.decoratorMetadata.languageAware = languageAware;
		target.decoratorMetadata.languageAware = themeAware;
		target.decoratorMetadata.fastNavigation = fastNavigation;

		// Renderer
		if (renderer) {
			Object.defineProperty(target, "render", {
				get: () => renderer,
			});
			Object.defineProperty(target, "renderer", {
				get: () => renderer,
			});
		}

		// Templates
		if (template) {
			Object.defineProperty(target, "template", {
				get: () => template,
			});
		}

		if (staticAreaTemplate) {
			Object.defineProperty(target, "staticAreaTemplate", {
				get: () => staticAreaTemplate,
			});
		}

		// Styles
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

		// Dependencies
		if (dependencies.length) {
			Object.defineProperty(target, "dependencies", {
				get: () => {
					return dependencies;
				},
			});
		}
	};
};

export default customElement2;
