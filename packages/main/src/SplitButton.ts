import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
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
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Button from "./Button.js";

import {
	SPLIT_BUTTON_DESCRIPTION,
	SPLIT_BUTTON_KEYBOARD_HINT,
} from "./generated/i18n/i18n-defaults.js";

// Template
import SplitButtonTemplate from "./generated/templates/SplitButtonTemplate.lit.js";

// Styles
import SplitButtonCss from "./generated/themes/SplitButton.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-split-button</code> enables users to trigger actions. It is constructed of two separate actions -
 * default action and arrow action that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - <code>Space</code> or <code>Enter</code> for default action,
 * and <code>Arrow Down</code> or <code>Arrow Up</code> for arrow action.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-split-button</code> consists two separate buttons:
 * <ul>
 * <li>for the first one (default action) you can define some <code>text</code> or an <code>icon</code>, or both.
 * Also, it is possible to define different icon for active state of this button - <code>activeIcon</code>.</li>
 * <li>the second one (arrow action) contains only <code>slim-arrow-down</code> icon.</li>
 * </ul>
 * You can choose a <code>design</code> from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow actions have the same design.
 * <br><br>
 * You can set the <code>ui5-split-button</code> as enabled or disabled. Both parts of an enabled
 * <code>ui5-split-button</code> can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-split-button</code> appears inactive and any of the two buttons
 * cannot be pressed.
 *
 * <h3>Keyboard Handling</h3>
 * <ul>
 * <li><code>Space</code> or <code>Enter</code> - triggers the default action</li>
 * <li><code>Shift</code> or <code>Escape</code> - if <code>Space</code> is pressed, releases the default action button without triggering the click event.</li>
 * <li><code>Arrow Down</code>, <code>Arrow Up</code>, <code>Alt</code>+<code>Arrow Down</code>, <code>Alt</code>+<code>Arrow Up</code>, or <code>F4</code> - triggers the arrow action</li>
 * There are separate events that are fired on activating of <code>ui5-split-button</code> parts:
 * <ul>
 * <li><code>click</code> for the first button (default action)</li>
 * <li><code>arrow-click</code> for the second button (arrow action)</li>
 * </ul>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SplitButton.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SplitButton
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-split-button
 * @public
 * @since 1.1.0
 */
@customElement({
	tag: "ui5-split-button",
	renderer: litRender,
	styles: SplitButtonCss,
	template: SplitButtonTemplate,
	dependencies: [Button],
})
/**
 * Fired when the user clicks on the default action.
 * @event sap.ui.webc.main.SplitButton#click
 * @public
 */
@event("click")

/**
 * Fired when the user clicks on the arrow action.
 * @event sap.ui.webc.main.SplitButton#arrow-click
 * @public
 */
@event("arrow-click")
class SplitButton extends UI5Element {
	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 * <br><br>
	 * Example:
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SplitButton.prototype.icon
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the icon to be displayed in active state as graphical element within the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SplitButton.prototype.activeIcon
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	activeIcon!: string;

	/**
	 * Defines whether the arrow button should have the active state styles or not.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.SplitButton.prototype.activeArrowButton
	 * @defaultvalue false
	 * @public
	 * @since 1.20.0
	 */
	@property({ type: Boolean })
	activeArrowButton!: boolean;

	/**
	 * Defines the component design.
	 *
	 * @type {sap.ui.webc.main.types.ButtonDesign}
	 * @name sap.ui.webc.main.SplitButton.prototype.design
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
	 * @name sap.ui.webc.main.SplitButton.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.SplitButton.prototype.accessibleName
	 * @defaultvalue: ""
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Indicates if the elements is on focus
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Accessibility-related properties for inner elements of the Split Button
	 *
	 * @type {object}
	 * @private
	 */
	@property({ type: Object })
	_splitButtonAccInfo!: Record<string, boolean>;

	/**
	 * Defines the tabIndex of the component.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 */
	@property({ defaultValue: "0", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Indicates if there is Space key pressed
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_spacePressed!: boolean;

	/**
	 * Indicates if there is SHIFT or ESCAPE key pressed
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_shiftOrEscapePressed!: boolean;

	/**
	 * Defines the active state of the text button
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_textButtonActive!: boolean;

	/**
	 * Defines the icon of the text button
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 */
	@property({ noAttribute: true })
	_textButtonIcon!: string;

	/**
	 * Defines the state of the internal Button used for the Arrow button of the SplitButton.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_activeArrowButton!: boolean;

	/**
	 * Defines the text of the component.
	 * <br><br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.SplitButton.prototype.default
	 * @slot
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	_textButtonPress: { handleEvent: () => void, passive: boolean };
	_isDefaultActionPressed = false;
	_isKeyDownOperation = false;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		SplitButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		const handleTouchStartEvent = () => {
			this._textButtonActive = true;
			this.focused = false;
			this._tabIndex = "-1";
		};

		this._textButtonPress = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	/**
	 * Function that makes sure the focus is properly managed.
	 * @private
	 */
	_manageFocus(button?: Button | SplitButton) {
		const buttons: Array<Button | SplitButton> = [this.textButton!, this.arrowButton!, this];

		buttons.forEach(btn => {
			btn.focused = btn === button;
		});
	}

	onBeforeRendering() {
		this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
		if (this.disabled) {
			this._tabIndex = "-1";
		}
	}

	_handleMouseClick(e: MouseEvent) {
		const target = e.target as Button;

		this._manageFocus(target);
		this._fireClick(e);
	}

	_onFocusOut(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}

		this._shiftOrEscapePressed = false;
		this._setTabIndexValue();
		this._manageFocus();
	}

	_onFocusIn(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}
		this._shiftOrEscapePressed = false;
		this._manageFocus(this);
	}

	_textButtonFocusIn(e?: FocusEvent) {
		e?.stopPropagation();
		this._manageFocus(this.textButton!);

		this._setTabIndexValue();
	}

	_onKeyDown(e: KeyboardEvent) {
		this._isKeyDownOperation = true;
		if (this._isArrowKeyAction(e)) {
			this._handleArrowButtonAction(e);
			this._activeArrowButton = true;
		} else if (this._isDefaultAction(e)) {
			this._handleDefaultAction(e);
			this._isDefaultActionPressed = true;
		}

		if (this._spacePressed && this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		// Handles button freeze issue when pressing Enter/Space and navigating with Tab/Shift+Tab simultaneously.
		if (this._isDefaultActionPressed && (isTabNext(e) || isTabPrevious(e))) {
			this._activeArrowButton = false;
			this._textButtonActive = false;
		}

		this._tabIndex = "-1";
	}

	_onKeyUp(e: KeyboardEvent) {
		this._isKeyDownOperation = false;
		if (this._isArrowKeyAction(e)) {
			e.preventDefault();
			this._activeArrowButton = false;
			this._textButtonActive = false;
		} else if (this._isDefaultAction(e)) {
			this._isDefaultActionPressed = false;
			this._textButtonActive = false;
			if (isSpace(e)) {
				e.preventDefault();
				e.stopPropagation();
				this._fireClick();
				this._spacePressed = false;
				this._textButtonActive = false;
			}
		}

		if (this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		this._tabIndex = "-1";
	}

	_fireClick(e?: Event) {
		e?.stopPropagation();
		if (!this._shiftOrEscapePressed) {
			this.fireEvent("click");
		}
		this._shiftOrEscapePressed = false;
	}

	_fireArrowClick(e?: Event) {
		e?.stopPropagation();

		this.fireEvent("arrow-click");
	}

	_textButtonRelease() {
		this._textButtonActive = false;
		this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
		this._tabIndex = "-1";
	}

	_arrowButtonPress(e: MouseEvent) {
		e.preventDefault();
		this.arrowButton!.focus();

		this._tabIndex = "-1";
	}

	_arrowButtonRelease(e: MouseEvent) {
		e.preventDefault();

		this._tabIndex = "-1";
	}

	_setTabIndexValue() {
		this._tabIndex = this.disabled ? "-1" : "0";

		if (this._tabIndex === "-1" && (this.textButton?.focused || this.arrowButton?.focused)) {
			this._tabIndex = "0";
		}
	}

	_onArrowButtonActiveStateChange(e: CustomEvent) {
		if (this.activeArrowButton) {
			e.preventDefault();
		}
	}

	/**
	 * Checks if the pressed key is an arrow key.
	 *
	 * @param {KeyboardEvent} e - keyboard event
	 * @returns {boolean}
	 * @private
	 */
	_isArrowKeyAction(e: KeyboardEvent): boolean {
		return isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e);
	}

	/**
	 * Checks if the pressed key is a default action key (Space or Enter).
	 *
	 * @param {KeyboardEvent} e - keyboard event
	 * @returns {boolean}
	 * @private
	 */
	_isDefaultAction(e: KeyboardEvent): boolean {
		return isSpace(e) || isEnter(e);
	}

	/**
	 * Checks if the pressed key is an escape key or shift key.
	 *
	 * @param {KeyboardEvent} e - keyboard event
	 * @returns {boolean}
	 * @private
	 */
	_isShiftOrEscape(e: KeyboardEvent): boolean {
		return isEscape(e) || isShift(e);
	}

	/**
	 * Handles the click event and the focus on the arrow button.
	 * @param {KeyboardEvent} e - keyboard event
	 * @private
	 */
	_handleArrowButtonAction(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();

		this._fireArrowClick(e);

		if (isSpace((e as KeyboardEvent))) {
			this._spacePressed = true;
		}
	}

	/**
	 * Handles the default action and the active state of the respective button.
	 * @param {KeyboardEvent} e - keyboard event
	 * @private
	 */
	_handleDefaultAction(e: KeyboardEvent) {
		e.preventDefault();
		const wasSpacePressed = isSpace(e);

		if (this.focused || this.textButton?.focused) {
			this._textButtonActive = true;
			this._fireClick();
			if (wasSpacePressed) {
				this._spacePressed = true;
			}
		} else if (this.arrowButton && this.arrowButton.focused) {
			this._activeArrowButton = true;
			this._fireArrowClick();
			if (wasSpacePressed) {
				this._spacePressed = true;
				this._textButtonActive = false;
			}
		}
	}

	_handleShiftOrEscapePressed() {
		this._shiftOrEscapePressed = true;
		this._textButtonActive = false;
		this._isKeyDownOperation = false;
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

	get accessibilityInfo() {
		return {
			// affects arrow button
			ariaExpanded: this._splitButtonAccInfo && this._splitButtonAccInfo.ariaExpanded,
			ariaHaspopup: this._splitButtonAccInfo && this._splitButtonAccInfo.ariaHaspopup,
			// affects root element
			description: SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION),
			keyboardHint: SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT),
		};
	}

	get ariaLabelText() {
		return [SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION), SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT)].join(" ");
	}
}

SplitButton.define();

export default SplitButton;
