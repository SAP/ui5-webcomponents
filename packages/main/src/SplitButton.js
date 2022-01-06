import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isTabNext,
	isTabPrevious,
	isEscape,
	isSpace,
	isEnter,
	isDown,
	isUp,
	checkModifierKeys,
} from "@ui5/webcomponents-base/dist/Keys.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SplitButtonTemplate from "./generated/templates/SplitButtonTemplate.lit.js";
import ButtonDesign from "./types/ButtonDesign.js";

// Styles
import SplitButtonCss from "./generated/themes/SplitButton.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-split-button",
	properties: /** @lends sap.ui.webcomponents.main.SplitButton.prototype */ {
		/**
		 * Defines the text of the button.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the icon to be displayed as graphical element within the component.
		 * The SAP-icons font provides numerous options.
		 * <br><br>
		 * Example:
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the icon to be displayed in active state as graphical element within the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		activeIcon: {
			type: String,
		},

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
		 * @type {ButtonDesign}
		 * @defaultvalue "Default"
		 * @public
		 */
		design: {
			type: ButtonDesign,
			defaultValue: ButtonDesign.Default,
		},

		/**
		 * Defines whether the component is disabled.
		 * A disabled component can't be pressed or
		 * focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Indicates if the elements is on focus
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * Defines the tabIndex of the component.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "0",
			noAttribute: true,
		},

		/**
		 * Indicates if an update of the tabIndex of the component must be performed
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_tabIndexUpdate: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Indicates if there is SPACE key pressed
		 * @private
		 */
		_spacePressed: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Indicates if there is SHIFT or ESCAPE key pressed
		 * @private
		 */
		_shiftOrEscapePressed: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SplitButton.prototype */ {
		/**
		 * Fired when the user clicks on the text button.
		 */
		"click": {},

		/**
		 * Fired when the user clicks on the arrow button.
		 */
		"arrow-click": {},
	 },
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-split-button</code> enables users to trigger actions. It is constructed of two separate buttons
 * <code>text button</code> and <code>arrow button</code> that can be activated by clicking or tapping, or by
 * pressing certain keyboard keys - <code>Space</code> or <code>Enter</code> for text button,
 * and <code>Arrow Down</code> or <code>Arrow Up</code> for arrow button.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-split-button</code> consists two separate buttons:
 * <ul>
 * <li>for the first one (text button) you can define some <code>text</code> or an <code>icon</code>, or both.
 * Also, it is possible to define different icon for active state of this button - <code>activeIcon</code>.</li>
 * <li>the second one (arrow button) consists only <code>slim-arrow-down</code> icon.</li>
 * </ul>
 * You can choose a <code>design</code> from a set of predefined types (the same as for ui5-button) that offer
 * different styling to correspond to the triggered action. Both text and arrow buttons have the same design.
 * <br><br>
 * You can set the <code>ui5-split-button</code> as enabled or disabled. Both parts of an enabled
 * <code>ui5-split-button</code> can be pressed by clicking or tapping it, or by certain keys, which changes
 * the style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-split-button</code> appears inactive and any of the two buttons
 * cannot be pressed.
 * <br><br>
 * There are separate events that are fired on activating of <code>ui5-split-button</code> parts:
 * <ul>
 * <li><code>click</code> for the first button (text button)</li>
 * <li><code>arrow-click</code> for the second button (arrow button)</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SplitButton.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SplitButton
 * @extends UI5Element
 * @tagname ui5-split-button
 * @public
 */
class SplitButton extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SplitButtonCss;
	}

	static get template() {
		return SplitButtonTemplate;
	}

	onAfterRendering() {
		this.textButton.icon = this.buttonIcon;
	}

	_onFocusOut(event) {
		if (this.disabled || event.isMarked) {
			return;
		}

		this._focusedState(false);
	}

	_onFocusIn(event) {
		if (this.disabled || event.isMarked) {
			return;
		}

		this._focusedState(true);
	}

	_onMouseDownArrow(event) {
		this._focusedState(false);
	}

	_onMouseTouchDownText(event) {
		this._focusedState(false);
		this._textButtonActiveState(true);
	}

	_onMouseUpText() {
		this._textButtonActiveState(false);
	}

	_onKeyDown(event) {
		if (isTabNext(event) || isTabPrevious(event)) {
			this._tabIndexUpdate = true;
		} else if (isDown(event) || isUp(event)) {
			this.arrowButton.active = true;
			this._fireArrowClick();
		} else if (isSpace(event) || isEnter(event)) {
			this.arrowButton.active = false;
			this._updateIcon = true;
			this._textButtonActiveState(true);
			if (isEnter(event)) {
				event.preventDefault();
				this._fireClick();
			} else {
				this._spacePressed = true;
			}
		}

		if (this._spacePressed && (isEscape(event) || checkModifierKeys(event, false, false, true))) {
			this._shiftOrEscapePressed = true;
			this._textButtonActiveState(false);
		}
	}

	_onKeyUp(event) {
		if (isDown(event) || isUp(event)) {
			this.arrowButton.active = false;
		} else if (isSpace(event) || isEnter(event)) {
			this._textButtonActiveState(false);
			if (isSpace(event)) {
				if (!this._shiftOrEscapePressed) {
					event.preventDefault();
					event.stopPropagation();
					this._fireClick();
				} else {
					this._shiftOrEscapePressed = false;
				}
				this._spacePressed = false;
			}
		}
	}

	_focusedState(state) {
		this._tabIndexUpdate = true;
		this.focused = state;
	}

	_textButtonActiveState(state) {
		this.textButton.active = state;
		this.textButton.icon = this.buttonIcon;
	}

	_fireClick(event) {
		event && event.stopPropagation();
		this.fireEvent("click");
	}

	_fireArrowClick(event) {
		event && event.stopPropagation();
		this.fireEvent("arrow-click");
	}

	get buttonIcon() {
		return this.textButton && this.activeIcon !== "" && this.textButton.active ? this.activeIcon : this.icon;
	}

	get textButton() {
		return this.shadowRoot.querySelector(".ui5-split-text-button");
	}

	get arrowButton() {
		return this.shadowRoot.querySelector(".ui5-split-arrow-button");
	}

	get tabIndexValue() {
		const tabIndex = this.getAttribute("tabindex"),
			textButton = this.textButton,
			arrowButton = this.arrowButton,
			buttonsAction = (textButton && (textButton.focused || textButton.active))
						 || (arrowButton && (arrowButton.focused || arrowButton.active));

		this._tabIndexUpdate = false;

		if (tabIndex) {
			return tabIndex;
		}

		if (buttonsAction && !this._spacePressed) {
			this.focused = false;
		}

		return this.disabled || buttonsAction ? "-1" : this._tabIndex;
	}
}

SplitButton.define();

export default SplitButton;
