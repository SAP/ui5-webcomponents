import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { IIcon } from "./Icon.js";
import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-help-2.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import WrappingType from "./types/WrappingType.js";
import BadgeDesign from "./types/BadgeDesign.js";
import BadgeSize from "./types/BadgeSize.js";
// Template
import BadgeTemplate from "./generated/templates/BadgeTemplate.lit.js";

import {
	BADGE_DESCRIPTION_BADGE,
	BADGE_DESCRIPTION_TAG,
	BADGE_ROLE_DESCRIPTION,
	BADGE_ERROR,
	BADGE_WARNING,
	BADGE_SUCCESS,
	BADGE_INFORMATION,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import badgeCss from "./generated/themes/Badge.css.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-badge` is a component which serves
 * the purpose to attract the user attention to some piece
 * of information (state, quantity, condition, etc.).
 * It can contain icon and text information, and its design can be chosen from specific design types.
 *
 * ### Usage Guidelines
 *
 * - If the text is longer than the width of the component, it can wrap, or it can show ellipsis, depending on the `wrappingType` property.
  * - Colors can be semantic or not semantic.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Badge.js";`
 * @constructor
 * @extends UI5Element
 * @since 0.12.0
 * @public
 */
@customElement({
	tag: "ui5-badge",
	languageAware: true,
	renderer: litRender,
	template: BadgeTemplate,
	styles: badgeCss,
	dependencies: [
		Icon,
	],
})

/**
 * Fired when the user clicks on an interactive badge.
 *
 * **Note:** The event will be fired if the `interactive` property is `true`
 * @public
 * @since 1.22.0
 */
@event("click")
class Badge extends UI5Element {
	/**
	 * Defines the design type of the component.
	 * @default "Set3"
	 * @public
	 * @since 1.22.0
	 */
	@property({ defaultValue: BadgeDesign.Set3 })
	design!: `${BadgeDesign}`;

	/**
	 * Defines the color scheme of the component.
	 * There are 10 predefined schemes.
	 * To use one you can set a number from `"1"` to `"10"`. The `colorScheme` `"1"` will be set by default.
	 *
	 * **Note:** Color schemes have no visual representation in High Contrast Black (sap_belize_hcb) theme.
	 * @default "1"
	 * @public
	 */
	@property({ defaultValue: "1" })
	colorScheme!: string;

	/**
	 * Defines if the default state icon is shown.
	 * @default false
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: Boolean })
	hideStateIcon!: boolean;

	/**
	 * Defines if the component is interactive (focusable and pressable).
	 *
	 * **Note:** The badge cannot be `interactive`
	 * when `design` property is `BadgeDesign.Set3`
	 * @default false
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: Boolean })
	interactive!: boolean;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 *
	 * **Note:** For option "Normal" the text will wrap and the
	 * words will not be broken based on hyphenation.
	 * @default "None"
	 * @public
	 * @since 1.22.0
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`;

	/**
	 * Defines predefined size of the component.
	 * @default "Standard"
	 * @public
	 * @since 2.0
	 */
	@property({ type: BadgeSize, defaultValue: BadgeSize.Standard })
	size!: `${BadgeSize}`;

	/**
	 * Defines if the badge has an icon.
	 * @private
	 */
	@property({ type: Boolean })
	_hasIcon!: boolean;

	/**
	 * Defines if the badge has only an icon (and no text).
	 * @private
	 */
	@property({ type: Boolean })
	_iconOnly!: boolean;

	/**
	 * Defines if the badge has "Tag" design type.
	 * @private
	 */
	@property({ type: Boolean })
	_isTagDesign!: boolean;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	/**
	 * Defines the icon to be displayed in the component.
	 * @public
	 */
	@slot()
	icon!: Array<IIcon>;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		Badge.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onBeforeRendering() {
		this._hasIcon = this.hasIcon || !!this._semanticIconName;
		this._iconOnly = this.iconOnly;
		this._isTagDesign = this.design !== BadgeDesign.Set3;
	}

	get _roleDescription() {
		return Badge.i18nBundle.getText(BADGE_ROLE_DESCRIPTION);
	}

	get _valueState() {
		switch (this.design) {
		case BadgeDesign.Positive:
			return Badge.i18nBundle.getText(BADGE_SUCCESS);
		case BadgeDesign.Negative:
			return Badge.i18nBundle.getText(BADGE_ERROR);
		case BadgeDesign.Critical:
			return Badge.i18nBundle.getText(BADGE_WARNING);
		case BadgeDesign.Information:
			return Badge.i18nBundle.getText(BADGE_INFORMATION);
		}

		return undefined;
	}

	get hasText() {
		return willShowContent(this.text);
	}

	get hasIcon() {
		return !!this.icon.length;
	}

	get iconOnly() {
		return this.hasIcon && !this.hasText;
	}

	get _title() {
		return this.title || undefined;
	}

	get badgeDescription() {
		if (this.interactive) {
			return undefined;
		}

		if (this.design === BadgeDesign.Set3) {
			return Badge.i18nBundle.getText(BADGE_DESCRIPTION_BADGE);
		}

		const valueState = this._valueState;
		let description = Badge.i18nBundle.getText(BADGE_DESCRIPTION_TAG);

		if (valueState) {
			description = `${description} ${valueState}`;
		}

		return description;
	}

	get _semanticIconName() {
		if (this.hideStateIcon || this.hasIcon) {
			return null;
		}

		switch (this.design) {
		case BadgeDesign.Neutral:
			return "sys-help-2";
		case BadgeDesign.Positive:
			return "sys-enter-2";
		case BadgeDesign.Negative:
			return "error";
		case BadgeDesign.Critical:
			return "alert";
		case BadgeDesign.Information:
			return "information";
		default:
			return null;
		}
	}

	_onclick() {
		this.fireEvent("click");
	}
}

Badge.define();

export default Badge;
