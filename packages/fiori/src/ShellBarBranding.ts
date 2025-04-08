import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ShellBarBrandingTemplate from "./ShellbarBrandingTemplate.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import type {
	AriaRole,
} from "@ui5/webcomponents-base";

// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarBrandingCss from "./generated/themes/ShellBarBranding.css.js";

type ShellBarLogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "button" | "link">,
	name?: string,
}

type ShellBarAccessibilityAttributes = {
	logo?: ShellBarLogoAccessibilityAttributes
};

/**
 * @class
 *
 * @constructor
 * @extends UI5Element
 * @since
 * @public
 */
@customElement({
	tag: "ui5-shellbar-branding",
	languageAware: true,
	renderer: jsxRenderer,
	template: ShellBarBrandingTemplate,
	styles: [shellBarStyles, ShellBarBrandingCss],
})

class ShellBarBranding extends UI5Element {
	/**
	 * Defines the component href.
	 *
	 * **Note:** Standard hyperlink behavior is supported.
	 * @default undefined
	 * @public
	 */
    @property()
    href?: string;

	/**
	 * Defines the component target.
	 *
	 * **Notes:**
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **This property must only be used when the `href` property is set.**
	 * @default undefined
	 * @public
	 */
	@property()
	target?: string;

	/**
	 * Defines the title for the ui5-shellbar-branding component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	brandingTitle?: string;

	/**
	 * Defines additional accessibility attributes to the component.
	 *
	 * The accessibilityAttributes object has the following fields,
	 * where each field is an object supporting one or more accessibility attributes:
	 *
	 * - **logo** - `logo.role`
	 *
	 * The accessibility attributes support the following values:
	 *
	 * - **role**: Defines the accessible ARIA role of the logo area.
	 * Accepts the following string values: `button` or `link`.
	 *
	 *
	 * @default {}
	 * @public
	 * @since
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarAccessibilityAttributes = {};

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @since
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	logo!: Array<HTMLElement>;

	get parsedRef() {
		return (this.href && this.href.length > 0) ? this.href : undefined;
	}

	get _logoAreaText() {
		return this.brandingTitle ?? "";
	}

	get accLogoRole() {
		return this.accessibilityAttributes.logo?.role || "link";
	}
}

ShellBarBranding.define();

export default ShellBarBranding;
