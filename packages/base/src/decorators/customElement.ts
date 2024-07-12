import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";
import type { TemplateFunction as Template } from "../renderer/executeTemplate.js";
import type { ComponentStylesData as Styles } from "../types.js";
import { subscribeForFeatureLoad } from "../FeaturesRegistry.js";

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
	fastNavigation?: boolean,
	formAssociated?: boolean,
	shadowRootOptions?: Partial<ShadowRootInit>,
	features?: Array<string>,
} = {}): ClassDecorator => {
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
			formAssociated,
			shadowRootOptions,
			features
		 } = tagNameOrComponentSettings;

		target.metadata.tag = tag;
		if (languageAware) {
			target.metadata.languageAware = languageAware;
		}

		if (features) {
			features.forEach((feature) => {
				subscribeForFeatureLoad(feature, target)
			})
		}

		if (themeAware) {
			target.metadata.themeAware = themeAware;
		}
		if (fastNavigation) {
			target.metadata.fastNavigation = fastNavigation;
		}
		if (formAssociated) {
			target.metadata.formAssociated = formAssociated;
		}

		if (shadowRootOptions) {
			target.metadata.shadowRootOptions = shadowRootOptions;
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
