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
	languageAware?: boolean,
	themeAware?: boolean,
	cldr?: boolean,
	fastNavigation?: boolean,
	formAssociated?: boolean,
	shadowRootOptions?: Partial<ShadowRootInit>,
	features?: Array<string>,
} = {}) => {
	return (target: ClassDecorator | object, ctx?: ClassDecoratorContext | undefined) => {
		if (ctx && "name" in ctx) {
			console.log(ctx.name);
		}
		if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
			(target as typeof UI5Element).metadata = {};
		}

		if (typeof tagNameOrComponentSettings === "string") {
			(target as typeof UI5Element).metadata.tag = tagNameOrComponentSettings;
			return;
		}

		const {
			tag,
			languageAware,
			themeAware,
			cldr,
			fastNavigation,
			formAssociated,
			shadowRootOptions,
			features,
		 } = tagNameOrComponentSettings;

		(target as typeof UI5Element).metadata.tag = tag;
		if (languageAware) {
			(target as typeof UI5Element).metadata.languageAware = languageAware;
		}
		if (cldr) {
			(target as typeof UI5Element).metadata.cldr = cldr;
		}

		if (features) {
			(target as typeof UI5Element).metadata.features = features;
		}

		if (themeAware) {
			(target as typeof UI5Element).metadata.themeAware = themeAware;
		}
		if (fastNavigation) {
			(target as typeof UI5Element).metadata.fastNavigation = fastNavigation;
		}
		if (formAssociated) {
			(target as typeof UI5Element).metadata.formAssociated = formAssociated;
		}

		if (shadowRootOptions) {
			(target as typeof UI5Element).metadata.shadowRootOptions = shadowRootOptions;
		}

		["renderer", "template", "styles", "dependencies"].forEach((customElementEntity: string) => {
			const customElementEntityValue = tagNameOrComponentSettings[customElementEntity as keyof typeof tag];

			customElementEntityValue && Object.defineProperty(target, customElementEntity, {
				get: () => tagNameOrComponentSettings[customElementEntity as keyof typeof tag],
			});
		});
	};
};

export default customElement;
