import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { markEvent } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

import {
	isPhone,
	isTablet,
	isCombi,
	isDesktop,
	isSafari,
} from "@ui5/webcomponents-base/dist/Device.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import Icon from "./Icon.js";

let isGlobalHandlerAttached = false;
let activeButton: ButtonBase | null = null;

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
 * @abstract
 * @implements { IButton }
 * @public
 */
@customElement({
	languageAware: true,
	renderer: litRender,
	dependencies: [Icon],
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
@event("click")
/**
 * Fired whenever the active state of the component changes.
 * @private
 */
@event("_active-state-change")
class ButtonBase extends UI5Element implements IFormElement {
	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Used to switch the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * Defines if a content has been added to the default slot
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly!: boolean;

	/**
	 * Indicates if the elements is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Indicates if the elements has a slotted icon
	 * @private
	 */
	@property({ type: Boolean })
	hasIcon!: boolean;

	/**
	 * Indicates if the element if focusable
	 * @private
	 */
	@property({ type: Boolean })
	nonInteractive!: boolean;

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
	_iconSettings!: object;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ defaultValue: "0", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	_isTouch!: boolean;

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

		const handleTouchStartEvent = (e: TouchEvent) => {
			markEvent(e, "button");

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
		this._isTouch = (isPhone() || isTablet()) && !isCombi();
	}

	async onBeforeRendering() {
		this.iconOnly = this.isIconOnly;
		this.hasIcon = !!this.icon;

		this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
	}

	_onclick(e: MouseEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");

		if (isSafari()) {
			this.getDomRef()?.focus();
		}
	}

	_onmousedown(e: MouseEvent) {
		if (this.nonInteractive || this._isTouch) {
			return;
		}

		markEvent(e, "button");
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

	_onmouseup(e: MouseEvent) {
		markEvent(e, "button");
	}

	_onkeydown(e: KeyboardEvent) {
		markEvent(e, "button");

		if (isSpace(e) || isEnter(e)) {
			this._setActiveState(true);
		}
	}

	_onkeyup(e: KeyboardEvent) {
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

		if (isDesktop()) {
			this.focused = false;
		}
	}

	_onfocusin(e: FocusEvent) {
		if (this.nonInteractive) {
			return;
		}

		markEvent(e, "button");
		if (isDesktop()) {
			this.focused = true;
		}
	}

	_setActiveState(active: boolean) {
		const eventPrevented = !this.fireEvent("_active-state-change", null, true);

		if (eventPrevented) {
			return;
		}

		this.active = active;
	}

	get iconRole() {
		if (!this.icon) {
			return "";
		}

		return "presentation";
	}

	get isIconOnly() {
		return !willShowContent(this.text);
	}

	get tabIndexValue() {
		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonInteractive ? "-1" : this.forcedTabIndex;
	}

	get showIconTooltip() {
		return this.iconOnly && !this.tooltip;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	static async onDefine() {
		ButtonBase.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

ButtonBase.define();

export default ButtonBase;
