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
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Button from "./Button.js";

import {
	SPLIT_BUTTON_DESCRIPTION,
	SPLIT_BUTTON_KEYBOARD_HINT,
	// @ts-ignore
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
 * <li><code>Arrow Down</code>, <code>Arrow Up</code>, <code>Alt</code>+<code>Arrow Down</code>, <code>Alt</code>+<code>Arrow Up</code>, or <code>F4</code> - triggers the arrow action
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
@customElement("ui5-split-button")
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
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
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
	 * Defines the component design.
	 *
	 * <br><br>
	 * <b>The available values are:</b>
	 *
	 * <ul>
	 * <li><code>Default</code></li>
	 * <li><code>Emphasized</code></li>
	 * <li><code>Positive</code></li>
	 * <li><code>Negative</code></li>
	 * <li><code>Transparent</code></li>
	 * <li><code>Attention</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.main.types.ButtonDesign}
	 * @name sap.ui.webc.main.SplitButton.prototype.design
	 * @defaultvalue "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: ButtonDesign;

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
	 * Defines the active state of the arrow button
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_arrowButtonActive!: boolean;

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

	static i18nBundle: I18nBundle;

	static get render() {
		return litRender;
	}

	static get styles() {
		return SplitButtonCss;
	}

	static get template() {
		return SplitButtonTemplate;
	}

	static get dependencies() {
		return [Button];
	}

	static async onDefine() {
		SplitButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		const handleTouchStartEvent = () => {
			this._textButtonActive = true;
			this.focused = false;
			this._setTabIndexValue();
		};

		this._textButtonPress = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	onBeforeRendering() {
		this._textButtonIcon = this.textButton && this.activeIcon !== "" && (this._textButtonActive) && !this._shiftOrEscapePressed ? this.activeIcon : this.icon;
		if (this.disabled) {
			this._tabIndex = "-1";
		}
	}

	_onFocusOut(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}
		this._shiftOrEscapePressed = false;
		this.focused = false;
		this._setTabIndexValue();
	}

	_onFocusIn(e: FocusEvent) {
		if (this.disabled || getEventMark(e)) {
			return;
		}
		this._shiftOrEscapePressed = false;
		this.focused = true;
	}

	_onKeyDown(e: KeyboardEvent) {
		if (isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e)) {
			e.preventDefault();
			this._arrowButtonActive = true;
			this._fireArrowClick();
		} else if (isSpace(e) || isEnter(e)) {
			e.preventDefault();
			this._textButtonActive = true;
			if (isEnter(e)) {
				this._fireClick();
			} else {
				this._spacePressed = true;
			}
		}
		if (this._spacePressed && (isEscape(e) || isShift(e))) {
			this._shiftOrEscapePressed = true;
			this._textButtonActive = false;
		}

		this._setTabIndexValue();
	}

	_onKeyUp(e: KeyboardEvent) {
		if (isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e)) {
			this._arrowButtonActive = false;
		} else if (isSpace(e) || isEnter(e)) {
			this._textButtonActive = false;
			if (isSpace(e)) {
				e.preventDefault();
				e.stopPropagation();
				this._fireClick();
				this._spacePressed = false;
			}
		}

		this._setTabIndexValue();
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
		this._setTabIndexValue();
	}

	_setTabIndexValue() {
		const textButton = this.textButton,
			arrowButton = this.arrowButton,
			buttonsAction = (textButton && (textButton.focused || textButton.active))
						 || (arrowButton && (arrowButton.focused || arrowButton.active));

		this._tabIndex = this.disabled || buttonsAction ? "-1" : "0";
	}

	get textButtonAccText() {
		return this.textContent;
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
			description: SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION as I18nText),
			keyboardHint: SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT as I18nText),
		};
	}

	get ariaLabelText() {
		return [SplitButton.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION as I18nText), SplitButton.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT as I18nText)].join(" ");
	}
}

SplitButton.define();

export default SplitButton;
