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
 * ### Overview
 *
 * The `ui5-toggle-button` component is an enhanced `ui5-button`
 * that can be toggled between pressed and normal states.
 * Users can use the `ui5-toggle-button` as a switch to turn a setting on or off.
 * It can also be used to represent an independent choice similar to a check box.
 *
 * Clicking or tapping on a `ui5-toggle-button` changes its state to `pressed`. The button returns to
 * its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any `ui5-toggle-button`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ToggleButton.js";`
 * @constructor
 * @extends Button
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
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	pressed = false;

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
