import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import {
	isSafari,
} from "@ui5/webcomponents-base/dist/Device.js";
import ButtonBase from "./ButtonBase.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import HasPopup from "./types/HasPopup.js";

import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";

type AccessibilityAttributes = {
	expanded?: "true" | "false" | boolean,
	hasPopup?: `${HasPopup}`,
	controls?: string
};

/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
	nonInteractive: boolean;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-button` component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the `ui5-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-button` UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 *
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 *
 * You can set the `ui5-button` as enabled or disabled. An enabled
 * `ui5-button` can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-button` appears inactive and cannot be pressed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Button.js";`
 * @csspart button - Used to style the native button element
 * @constructor
 * @extends UI5Element
 * @implements { IButton }
 * @public
 */
@customElement({
	tag: "ui5-button",
	languageAware: true,
	renderer: litRender,
	template: ButtonTemplate,
	styles: buttonCss,
})
class Button extends ButtonBase implements IFormElement, IButton {
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: `${ButtonDesign}`;

	/**
	 * Defines whether the icon should be displayed after the component text.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * When set to `true`, the component will
	 * automatically submit the nearest HTML form element on `press`.
	 *
	 * **Note:** For the `submits` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 * @default false
	 * @public
	 * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
	 */
	@property({ type: Boolean })
	submits!: boolean;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * - `expanded`: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *	- `true`
	 *	- `false`
	 *
	 * - `hasPopup`: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values:
	 *	- `Dialog`
	 *	- `Grid`
	 *	- `ListBox`
	 *	- `Menu`
	 *	- `Tree`
	 *
	 * - `controls`: Identifies the element (or elements) whose contents or presence are controlled by the button element. Accepts a string value.
	 * @public
	 * @since 1.2.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * Defines whether the button has special form-related functionality.
	 *
	 * **Note:** For the `type` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 * @default "Button"
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: ButtonType, defaultValue: ButtonType.Button })
	type!: `${ButtonType}`;

	/**
	 * Describes the accessibility role of the button.
	 *
	 * **Note:** Use link role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
	 *
	 * @default "Button"
	 * @public
	 * @since 1.23
	 */
	@property({ type: ButtonAccessibleRole, defaultValue: ButtonAccessibleRole.Button })
	accessibleRole!: `${ButtonAccessibleRole}`;

	constructor() {
		super();
	}

	async onBeforeRendering() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (this.type !== ButtonType.Button && !formSupport) {
			console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
		if (this.submits && !formSupport) {
			console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		this.iconOnly = this.isIconOnly;
		this.hasIcon = !!this.icon;

		this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
	}

	_onclick(e: MouseEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport && this._isSubmit) {
			formSupport.triggerFormSubmit(this);
		}
		if (formSupport && this._isReset) {
			formSupport.triggerFormReset(this);
		}

		if (isSafari()) {
			this.getDomRef()?.focus();
		}
	}

	get _hasPopup() {
		return this.accessibilityAttributes.hasPopup?.toLowerCase();
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	get buttonTypeText() {
		return Button.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get buttonAccessibleRole() {
		return this.accessibleRole.toLowerCase();
	}

	get _isSubmit() {
		return this.type === ButtonType.Submit || this.submits;
	}

	get _isReset() {
		return this.type === ButtonType.Reset;
	}

	static async onDefine() {
		Button.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Button.define();

export default Button;
export type {
	AccessibilityAttributes,
	IButton,
};
