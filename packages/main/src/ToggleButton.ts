import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import { isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import { isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "./Button.js";
import ToggleButtonTemplate from "./generated/templates/ToggleButtonTemplate.lit.js";

// Styles
import toggleBtnCss from "./generated/themes/ToggleButton.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toggle-button</code> component is an enhanced <code>ui5-button</code>
 * that can be toggled between pressed and normal states.
 * Users can use the <code>ui5-toggle-button</code> as a switch to turn a setting on or off.
 * It can also be used to represent an independent choice similar to a check box.
 * <br><br>
 * Clicking or tapping on a <code>ui5-toggle-button</code> changes its state to <code>pressed</code>. The button returns to
 * its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any <code>ui5-toggle-button</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ToggleButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToggleButton
 * @extends sap.ui.webc.main.Button
 * @tagname ui5-toggle-button
 * @public
 */
@customElement({
	tag: "ui5-toggle-button",
	template: ToggleButtonTemplate,
	styles: [Button.styles, toggleBtnCss],
})
class ToggleButton extends Button {
	/**
	 * Determines whether the component is displayed as pressed.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.ToggleButton.prototype.pressed
	 * @public
	 */
	@property({ type: Boolean })
	pressed!: boolean;

	_onclick() {
		this.pressed = !this.pressed;

		if (isSafari()) {
			this.getDomRef()!.focus();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpaceShift(e)) {
			e.preventDefault();
			return;
		}

		super._onkeyup(e);
	}
}

ToggleButton.define();

export default ToggleButton;
