import type UI5Element from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
import type { Renderer } from "../renderer/LitRenderer.js";

/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings: string | {
	tag?: string,
	languageAware?: boolean,
	themeAware?: boolean,
	fastNavigation?: boolean,
	renderer?: Renderer,
	styles?: Styles,
	template?: Template,
	dependencies?: Array<typeof UI5Element>,
	staticAreaStyles?: Styles,
	staticAreaTemplate?: Template,
}): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "decoratorMetadata")) {
			target.decoratorMetadata = {};
		}

		if (typeof tagNameOrComponentSettings === "string") {
			target.decoratorMetadata.tag = tagNameOrComponentSettings;
			return;
		}

		const {
			tag,
			languageAware = false,
			themeAware = false,
			fastNavigation = false,
		 } = tagNameOrComponentSettings;

		target.decoratorMetadata.tag = tag;
		target.decoratorMetadata.languageAware = languageAware;
		target.decoratorMetadata.themeAware = themeAware;
		target.decoratorMetadata.fastNavigation = fastNavigation;

		["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((customElementEntity: string) => {
			const _customElementEntity = customElementEntity === "render" ? "renderer" : customElementEntity;
			const customElementEntityValue = tagNameOrComponentSettings[_customElementEntity as keyof typeof tag];

			customElementEntityValue && Object.defineProperty(target, customElementEntity, {
				get: () => customElementEntityValue,
			});
		});
	};
};

export default customElement;
