import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";

/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings: string | {
	tag?: string,
	renderer?: Renderer,
	styles?: Styles,
	template?: Template,
	dependencies?: Array<typeof UI5Element>,
	staticAreaStyles?: Styles,
	staticAreaTemplate?: Template,
	languageAware?: boolean,
	themeAware?: boolean,
	fastNavigation?: boolean,
}): ClassDecorator => {
	return (target: any) => {
		if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
			target.metadata = {};
		}

		if (typeof tagNameOrComponentSettings === "string") {
			target.metadata.tag = tagNameOrComponentSettings;
			return;
		}

		const {
			tag,
			languageAware,
			themeAware,
			fastNavigation,
		 } = tagNameOrComponentSettings;

		target.metadata.tag = tag;
		if (languageAware) {
			target.metadata.languageAware = languageAware;
		}
		if (themeAware) {
			target.metadata.themeAware = themeAware;
		}
		if (fastNavigation) {
			target.metadata.fastNavigation = fastNavigation;
		}

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
