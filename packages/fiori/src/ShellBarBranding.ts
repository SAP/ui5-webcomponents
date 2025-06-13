import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ShellBar from "./ShellBar.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

import type {
	AriaRole,
} from "@ui5/webcomponents-base";

// Template
import ShellBarBrandingTemplate from "./ShellBarBrandingTemplate.js";

// Styles
import shellBarBrandingCss from "./generated/themes/ShellBarBranding.css.js";

import {
	SHELLBAR_LOGO,

} from "./generated/i18n/i18n-defaults.js";

type ShellBarLogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "link" | "button">,
	name?: string,
}

type ShellBarBrandingAccessibilityAttributes = {
	logo?: ShellBarLogoAccessibilityAttributes
};

type ShellBarLogoClickEventDetail = {
	targetRef: HTMLElement;
};

/**
 * @class
 *
 * ### Overview
 * The `ui5-shellbar-branding` component is intended to be placed inside the branding slot of the
 * `ui5-shellbar` component. Its content has higher priority than the `primaryTitle` property
 * and the `logo` slot of `ui5-shellbar`.
 *
 * @constructor
 * @extends UI5Element
 * @since 2.10.0
 * @public
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-branding",
	languageAware: true,
	renderer: jsxRenderer,
	template: ShellBarBrandingTemplate,
	styles: shellBarBrandingCss,
})

/**
 * Fired, when the logo is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event("logo-click", {
	bubbles: true,
})

class ShellBarBranding extends UI5Element {
	eventDetails!: {
		"logo-click": ShellBarLogoClickEventDetail,
	}

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
	 * Accepts the following string values: `link` or `button`.
	 *
	 *
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarBrandingAccessibilityAttributes = {};

	/**
     * Defines if the branding is shown on an S breakpoint.
     * @default false
     * @public
     */
	@property({ type: Boolean })
	isSBreakPoint = false;

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @public
	 */
	@slot({ type: HTMLElement })
	logo!: Array<HTMLElement>;

	get parsedRef() {
		return (this.href && this.href.length > 0) ? this.href : undefined;
	}

	get _logoAreaText() {
		return this.brandingTitle;
	}

	get _logoText() {
		return this.accessibilityAttributes.logo?.name || ShellBar.i18nBundle.getText(SHELLBAR_LOGO);
	}

	get accBrandingRole() {
		return this.accessibilityAttributes.logo?.role || "link";
	}

	_logoKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._logoPress();
		}
	}

	_logoKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this._logoPress();
		}
	}

	_logoPress() {
		this.fireDecoratorEvent("logo-click", {
			targetRef: this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-logo")!,
		});
	}
}

ShellBarBranding.define();

export default ShellBarBranding;
export type {
	ShellBarBrandingAccessibilityAttributes,
	ShellBarLogoClickEventDetail,
};
