import type UI5Element from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
import type { Renderer } from "../renderer/LitRenderer.js";

/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagName
 * @returns { ClassDecorator }
 */
const customElement = (tagName: string | {
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
}): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		if (typeof tagName === "string") {
			target.decoratorMetadata.tag = tagName;
			return;
		}

		const {
			tag,
			languageAware = false,
			themeAware = false,
			fastNavigation = false,
		 } = tagName;

		target.decoratorMetadata.tag = tag;
		target.decoratorMetadata.languageAware = languageAware;
		target.decoratorMetadata.themeAware = themeAware;
		target.decoratorMetadata.fastNavigation = fastNavigation;

		["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((customElementEntity: string) => {
			const _customElementEntity = customElementEntity === "render" ? "renderer" : customElementEntity;
			const customElementEntityValue = tagName[_customElementEntity as keyof typeof tag];

			customElementEntityValue && Object.defineProperty(target, customElementEntity, {
				get: () => customElementEntityValue,
			});
		});
	};
};

export default customElement;
