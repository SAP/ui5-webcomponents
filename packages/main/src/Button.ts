import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isEnter,
	isEscape,
	isShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type { AccessibilityAttributes, PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import {
	isDesktop,
	isSafari,
} from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import { submitForm, resetForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/config/Tooltips.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import type ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import Icon from "./Icon.js";
import IconMode from "./types/IconMode.js";

import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";

/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
	nonInteractive: boolean;
}

let isGlobalHandlerAttached = false;
let activeButton: Button | null = null;

type ButtonAccessibilityAttributes = Pick<AccessibilityAttributes, "expanded" | "hasPopup" | "controls">;

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
	formAssociated: true,
	languageAware: true,
	renderer: litRender,
	template: ButtonTemplate,
	styles: buttonCss,
	dependencies: [Icon],
	shadowRootOptions: { delegatesFocus: true },
})
/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @public
 * @native
 */
@event("click", {
	bubbles: true,
})
/**
 * Fired whenever the active state of the component changes.
 * @private
 */
@event("_active-state-change", {
	bubbles: true,
	cancelable: true,
})
class Button extends UI5Element implements IButton {
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property()
	design: `${ButtonDesign}` = "Default";

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the icon, displayed as graphical element within the component after the button text.
	 *
	 * **Note:** It is highly recommended to use `endIcon` property only together with `icon` and/or `text` properties.
	 * Usage of `endIcon` only should be avoided.
	 *
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	endIcon?: string;

	/**
	 * When set to `true`, the component will
	 * automatically submit the nearest HTML form element on `press`.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.`
	 * @default false
	 * @public
	 * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
	 */
	@property({ type: Boolean })
	submits = false;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default undefined
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
	 * Accepts the following string values: `true` or `false`
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 *
	 * - **controls**: Identifies the element (or elements) whose contents or presence are controlled by the button element.
	 * Accepts a lowercase string value.
	 *
	 * @public
	 * @since 1.2.0
	 * @default {}
	 */
	@property({ type: Object })
	accessibilityAttributes: ButtonAccessibilityAttributes = {};

	/**
	 * Defines the accessible description of the component.
	 * @default undefined
	 * @public
	 * @since 2.5.0
	 */
	@property()
	accessibleDescription?: string;

	/**
	 * Defines whether the button has special form-related functionality.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default "Button"
	 * @public
	 * @since 1.15.0
	 */
	@property()
	type: `${ButtonType}` = "Button";

	/**
	 * Describes the accessibility role of the button.
	 *
	 * **Note:** Use <code>ButtonAccessibleRole.Link</code> role only with a press handler, which performs a navigation. In all other scenarios the default button semantics are recommended.
	 *
	 * @default "Button"
	 * @public
	 * @since 1.23
	 */
	@property()
	accessibleRole: `${ButtonAccessibleRole}` = "Button";

	/**
	 * Used to switch the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	active = false;

	/**
	 * Defines if a content has been added to the default slot
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly = false;

	/**
	 * Indicates if the elements has a slotted icon
	 * @private
	 */
	@property({ type: Boolean })
	hasIcon = false;

	/**
	 * Indicates if the elements has a slotted end icon
	 * @private
	 */
	@property({ type: Boolean })
	hasEndIcon = false;

	/**
	 * Indicates if the element is focusable
	 * @private
	 */
	@property({ type: Boolean })
	nonInteractive = false;

	/**
	 * The current title of the button, either the tooltip property or the icons tooltip. The tooltip property with higher prio.
	 * @private
	 */
	@property({ noAttribute: true })
	buttonTitle?: string;

	/**
	 * @private
	 */
	@property({ type: Object })
	_iconSettings: object = {};

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedTabIndex = "0";

	/**
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	_isTouch = false;

	@property({ type: Boolean, noAttribute: true })
	_cancelAction = false;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	_deactivate: () => void;

	_ontouchstart: PassiveEventListenerObject;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._deactivate = () => {
			if (activeButton) {
				activeButton._setActiveState(false);
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);

			isGlobalHandlerAttached = true;
		}

		const handleTouchStartEvent = () => {
			if (this.nonInteractive) {
				return;
			}

			this._setActiveState(true);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	async onBeforeRendering() {
		this.hasIcon = !!this.icon;
		this.hasEndIcon = !!this.endIcon;
		this.iconOnly = this.isIconOnly;

		this.buttonTitle = this.tooltip || await this.getDefaultTooltip();
	}

	_onclick() {
		if (this.nonInteractive) {
			return;
		}

		if (this._isSubmit) {
			submitForm(this);
		}

		if (this._isReset) {
			resetForm(this);
		}

		if (isSafari()) {
			this.getDomRef()?.focus();
		}
	}

	_onmousedown() {
		if (this.nonInteractive) {
			return;
		}

		this._setActiveState(true);
		activeButton = this; // eslint-disable-line
	}

	_ontouchend(e: TouchEvent) {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (this.active) {
			this._setActiveState(false);
		}

		if (activeButton) {
			activeButton._setActiveState(false);
		}
	}

	_onkeydown(e: KeyboardEvent) {
		this._cancelAction = isShift(e) || isEscape(e);

		if (isSpace(e) || isEnter(e)) {
			this._setActiveState(true);
		} else if (this._cancelAction) {
			this._setActiveState(false);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this._cancelAction) {
			e.preventDefault();
		}

		if (isSpace(e) || isEnter(e)) {
			if (this.active) {
				this._setActiveState(false);
			}
		}
	}

	_onfocusout() {
		if (this.nonInteractive) {
			return;
		}

		if (this.active) {
			this._setActiveState(false);
		}
	}

	_setActiveState(active: boolean) {
		const eventPrevented = !this.fireDecoratorEvent("_active-state-change");

		if (eventPrevented) {
			return;
		}

		this.active = active;
	}

	get _hasPopup() {
		return this.accessibilityAttributes.hasPopup;
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	get iconMode() {
		if (!this.icon) {
			return "";
		}

		return IconMode.Decorative;
	}

	get endIconMode() {
		if (!this.endIcon) {
			return "";
		}

		return IconMode.Decorative;
	}

	get isIconOnly() {
		return !willShowContent(this.text);
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	getDefaultTooltip() {
		if (!getEnableDefaultTooltips()) {
			return;
		}

		return getIconAccessibleName(this.icon);
	}

	get buttonTypeText() {
		return Button.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get effectiveAccRole() {
		return this.accessibleRole.toLowerCase();
	}

	get tabIndexValue() {
		if (this.disabled) {
			return;
		}

		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonInteractive ? "-1" : this.forcedTabIndex;
	}

	get showIconTooltip() {
		return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaDescribedbyText() {
		return this.hasButtonType ? "ui5-button-hiddenText-type" : undefined;
	}

	get ariaDescriptionText() {
		return this.accessibleDescription === "" ? undefined : this.accessibleDescription;
	}

	get _isSubmit() {
		return this.type === ButtonType.Submit || this.submits;
	}

	get _isReset() {
		return this.type === ButtonType.Reset;
	}
}

Button.define();

export default Button;
export type {
	ButtonAccessibilityAttributes,
	IButton,
};
