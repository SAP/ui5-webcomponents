import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import {
	isEscape,
	isSpace,
	isEnter,
	isDown,
	isUp,
	isDownAlt,
	isUpAlt,
	isF4,
	isShift,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { AriaHasPopup } from "@ui5/webcomponents-base";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ButtonDesign from "./types/ButtonDesign.js";
import type Button from "./Button.js";

import {
	SPLIT_BUTTON_DESCRIPTION,
	SPLIT_BUTTON_KEYBOARD_HINT,
	SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import SplitButtonTemplate from "./SplitButtonTemplate.js";

// Styles
import SplitButtonCss from "./generated/themes/SplitButton.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-split-button` enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - `Space` or `Enter` for default action,
 * and `Arrow Down` or `Arrow Up` for arrow action.
 *
 * ### Usage
 *
 * `ui5-split-button` consists two separate buttons:
 *
 * - for the first one (default action) you can define some `text` or an `icon`, or both.
 * - the second one (arrow action) contains only `slim-arrow-down` icon.
 *
 * You can choose a `design` from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 *
 * You can set the `ui5-split-button` as enabled or disabled. Both parts of an enabled
 * `ui5-split-button` can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled `ui5-split-button` appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * ### Keyboard Handling
 *
 * - `Space` or `Enter` - triggers the default action
 * - `Shift` or `Escape` - if `Space` is pressed, releases the default action button without triggering the click event.
 * - `Arrow Down`, `Arrow Up`, `Alt`+`Arrow Down`, `Alt`+`Arrow Up`, or `F4` - triggers the arrow action
 * There are separate events that are fired on activating of `ui5-split-button` parts:
 *
 * - `click` for the first button (default action)
 * - `arrow-click` for the second button (arrow action)
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SplitButton.js";`
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.1.0
 */
@customElement({
	tag: "ui5-split-button",
	renderer: jsxRenderer,
	styles: SplitButtonCss,
	template: SplitButtonTemplate,
})
/**
 * Fired when the user clicks on the default action.
 * @public
 */
@event("click", {
	bubbles: true,
})

/**
 * Fired when the user clicks on the arrow action.
 * @public
 */
@event("arrow-click", {
	bubbles: true,
})
class SplitButton extends UI5Element {
	eventDetails!: {
		click: void;
		"arrow-click": void;
	}
	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 *
	 * See all available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether the arrow button should have the active state styles or not.
	 * @default false
	 * @public
	 * @since 1.21.0
	 */
	@property({ type: Boolean })
	activeArrowButton = false;

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
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the tabIndex of the component.
	 * @default "0"
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	_tabIndex = 0

	/**
	 * Indicates if there is Space key pressed
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_spacePressed = false;

	/**
	 * Indicates if there is Shift key pressed while Space key is down.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_shiftOrEscapePressedDuringSpace = false;

	/**
	 * Defines the active state of the text button
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_textButtonActive = false;

	/**
	 * Defines the state of the internal Button used for the Arrow button of the SplitButton.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_activeArrowButton = false;

	/**
	 * Defines the display of the end icon as a graphical element within the default action of the component after the button text.
	 * The SAP-icons font provides different options.
	 *
	 * Example:
	 *
	 * See all available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @private
	 */
	@property({ type: String })
	_endIcon?: string;

	/**
	 * Defines the visibility of the arrow button of the component.
	 *
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_hideArrowButton = false;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		if (this.disabled) {
			this._tabIndex = -1;
		}
	}

	_handleMouseClick(e: MouseEvent) {
		this._fireClick(e);
	}

	_onFocusOut() {
		if (this.disabled || this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		this._resetActionButtonStates();
		this._setTabIndexValue();
	}

	handleTouchStart(e: TouchEvent | MouseEvent) {
		e.stopPropagation();
		this._textButtonActive = true;
		this._tabIndex = -1;
	}

	_onInnerButtonFocusIn(e: FocusEvent) {
		e.stopPropagation();
		this._setTabIndexValue(true);
		const target = e.target as Button;
		target.focus();
	}

	_onKeyDown(e: KeyboardEvent) {
		if (this._isArrowKeyAction(e)) {
			this._handleArrowButtonAction(e);
			this._activeArrowButton = true;
			return;
		}

		if (this._isDefaultAction(e)) {
			this._handleDefaultAction(e);
			return;
		}

		if (isSpace(e)) {
			this._spacePressed = true;
			this._shiftOrEscapePressedDuringSpace = false; // Reset whenever new Space action starts
			return;
		}

		if ((isShift(e) || isEscape(e)) && this._spacePressed) {
			e.preventDefault();
			this._shiftOrEscapePressedDuringSpace = true;
		}

		if (isEscape(e)) {
			this._resetActionButtonStates();
		}

		this._tabIndex = -1;
	}

	_onKeyUp(e: KeyboardEvent) {
		const target = e.target as Button;
		if (this._isArrowKeyAction(e)) {
			e.preventDefault();
			this._activeArrowButton = false;
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
			e.stopPropagation();
			this._textButtonActive = false;
			if (!this._shiftOrEscapePressedDuringSpace && target !== this.arrowButton) { // Do not fire click if Arrow button is focused by mouse and Space is pressed afterwards
				this._fireClick();
			}

			this._spacePressed = false;
			return;
		}

		if (isEnter(e)) {
			this._textButtonActive = false;
			return;
		}

		if (isShift(e) && this._textButtonActive) {
			this._textButtonActive = false;
		}
	}

	_resetActionButtonStates() {
		this._activeArrowButton = false;
		this._textButtonActive = false;
	}

	_fireClick(e?: Event) {
		e?.stopPropagation();
		this.fireDecoratorEvent("click");
	}

	_fireArrowClick(e?: Event) {
		e?.stopPropagation();

		this.fireDecoratorEvent("arrow-click");
	}

	_textButtonRelease() {
		this._textButtonActive = false;
		this._tabIndex = -1;
	}

	_arrowButtonPress(e: MouseEvent) {
		e.stopPropagation();

		this._tabIndex = -1;
	}

	_arrowButtonRelease(e: MouseEvent) {
		e.preventDefault();

		this._tabIndex = -1;
	}

	_setTabIndexValue(innerButtonPressed?: boolean) {
		this._tabIndex = this.disabled ? -1 : 0;

		if (this._tabIndex === -1 && innerButtonPressed) {
			this._tabIndex = 0;
		}
	}

	_onArrowButtonActiveStateChange(e: CustomEvent) {
		if (this.activeArrowButton) {
			e.preventDefault();
		}
	}

	/**
	 * Checks if the pressed key is an arrow key.
	 * @param e - keyboard event
	 * @private
	 */
	_isArrowKeyAction(e: KeyboardEvent): boolean {
		return isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e);
	}

	/**
	 * Checks if the pressed key is a default action key (Space or Enter).
	 * @param e - keyboard event
	 * @private
	 */
	_isDefaultAction(e: KeyboardEvent): boolean {
		return isSpace(e) || isEnter(e);
	}

	/**
	 * Handles the click event and the focus on the arrow button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleArrowButtonAction(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();

		this._fireArrowClick(e);
	}

	/**
	 * Handles the default action and the active state of the respective button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleDefaultAction(e: KeyboardEvent) {
		e.preventDefault();
		const target = e.target as Button;

		if (this.arrowButton && target === this.arrowButton) {
			this._activeArrowButton = true;
			this._fireArrowClick();
			return;
		}

		this._textButtonActive = true;

		if (isSpace(e)) {
			this._spacePressed = true;
			this._shiftOrEscapePressedDuringSpace = false;
			return;
		}

		if (isEnter(e)) {
			this._fireClick(e);
			return;
		}

		if (isTabPrevious(e) || isTabNext(e)) {
			this._resetActionButtonStates();
		}
	}

	get effectiveActiveArrowButton() {
		return this.activeArrowButton || this._activeArrowButton;
	}

	get textButtonAccText() {
		return this.textContent;
	}

	get isTextButton() {
		return !!this.textContent;
	}

	get textButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-text-button");
	}

	get arrowButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-arrow-button");
	}

	get accInfo() {
		return {
			root: {
				"description": SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION),
				"keyboardHint": SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT),
			},
			arrowButton: {
				"title": this.arrowButtonTooltip,
				"accessibilityAttributes": {
					"hasPopup": "menu" as AriaHasPopup,
					"expanded": this.effectiveActiveArrowButton,
				},
			},
		};
	}

	get arrowButtonTooltip() {
		return SplitButton.i18nBundle.getText(SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP);
	}

	get ariaLabelText() {
		return [SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION), SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT)].join(" ");
	}
}

SplitButton.define();

export default SplitButton;
