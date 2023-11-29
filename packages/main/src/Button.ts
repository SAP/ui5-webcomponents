import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";
import Icon from "./Icon.js";

import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_REJECT, BUTTON_ARIA_TYPE_EMPHASIZED } from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";

let isGlobalHandlerAttached = false;
let activeButton: Button | null = null;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-button</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>button - Used to style the native button element</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Button
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-button
 * @implements sap.ui.webc.main.IButton
 * @public
 */
@customElement({
	tag: "ui5-button",
	languageAware: true,
	renderer: litRender,
	template: ButtonTemplate,
	styles: buttonCss,
	dependencies: [Icon],
})
/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 * <br><br>
 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
 * property is set to <code>true</code>.
 *
 * @event sap.ui.webc.main.Button#click
 * @public
 * @native
 */
@event("click")
/**
 * Fired whenever the active state of the component changes.
 * @private
 */
@event("_active-state-change")
class Button extends UI5Element implements IFormElement {
	/**
	 * Defines the component design.
	 *
	 * @type {sap.ui.webc.main.types.ButtonDesign}
	 * @name sap.ui.webc.main.Button.prototype.design
	 * @defaultvalue "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: `${ButtonDesign}`;

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Button.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 * <br><br>
	 * Example:
	 *
	 * See all the available icons within the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Button.prototype.icon
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether the icon should be displayed after the component text.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Button.prototype.iconEnd
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * When set to <code>true</code>, the component will
	 * automatically submit the nearest HTML form element on <code>press</code>.
	 * <br><br>
	 * <b>Note:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
	 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.Button.prototype.submits
	 * @defaultvalue false
	 * @public
	 * @deprecated Set the "type" property to "Submit" to achieve the same result. The "submits" property is ignored if "type" is set to any value other than "Button".
	 */
	@property({ type: Boolean })
	submits!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * <br>
	 * <b>Note:</b> A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @type {string}
	 * @name sap.ui.webc.main.Button.prototype.tooltip
	 * @defaultvalue ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Button.prototype.accessibleName
	 * @defaultvalue undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Button.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * <ul>
	 * 		<li><code>expanded</code>: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *			<ul>
	 *				<li><code>true</code></li>
	 *				<li><code>false</code></li>
	 *			</ul>
	 * 		</li>
	 * 		<li><code>hasPopup</code>: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values:
	 * 			<ul>
	 *				<li><code>Dialog</code></li>
	 *				<li><code>Grid</code></li>
	 *				<li><code>ListBox</code></li>
	 *				<li><code>Menu</code></li>
	 *				<li><code>Tree</code></li>
	 * 			</ul>
	 * 		</li>
	 * 		<li><code>controls</code>: Identifies the element (or elements) whose contents or presence are controlled by the button element. Accepts a string value.</li>
	 * </ul>
	 * @type {object}
	 * @name sap.ui.webc.main.Button.prototype.accessibilityAttributes
	 * @public
	 * @since 1.2.0
	 */
	@property({ type: Object })
	accessibilityAttributes!: { expanded: "true" | "false", hasPopup: "Dialog" | "Grid" | "ListBox" | "Menu" | "Tree", controls: string};

	/**
	 * Defines whether the button has special form-related functionality.
	 *
	 * <br><br>
	 * <b>Note:</b> For the <code>type</code> property to have effect, you must add the following import to your project:
	 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
	 *
	 * @type {sap.ui.webc.main.types.ButtonType}
	 * @name sap.ui.webc.main.Button.prototype.type
	 * @defaultvalue "Button"
	 * @public
	 * @since 1.15.0
	 */
	@property({ type: ButtonType, defaultValue: ButtonType.Button })
	type!: `${ButtonType}`;

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

	@property({ type: Object })
	_iconSettings!: object;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ defaultValue: "0", noAttribute: true })
	_tabIndex!: string;

	/**
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	_isTouch!: boolean;

	/**
	 * Defines the text of the component.
	 * <br><br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.Button.prototype.default
	 * @slot
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

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
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

	get tabIndexValue() {
		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.nonInteractive ? "-1" : this._tabIndex;
	}

	get showIconTooltip() {
		return this.iconOnly && !this.tooltip;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
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
