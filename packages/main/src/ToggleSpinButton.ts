import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";

// Template
import ToggleSpinButtonTemplate from "./generated/templates/ToggleSpinButtonTemplate.lit.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-toggle-spin-button` is explicitly used in the new design of `ui5-time-picker`.
 * It extends `ui5-toggle-button` with some specific accessibility-related properties in order to
 * have spin button look and feel from accessibility point of view. This component should not be used separately.
 * @constructor
 * @extends ToggleButton
 * @since 1.15.0
 * @private
 */
@customElement({
	tag: "ui5-toggle-spin-button",
	renderer: litRender,
	styles: [Button.styles, ToggleButton.styles],
	template: ToggleSpinButtonTemplate,
})

class ToggleSpinButton extends ToggleButton {
	/**
	 * Defines the ARIA valuemin of the component.
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueMin!: number;

	/**
	 * Defines the ARIA valuemax of the component.
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueMax!: number;

	/**
	 * Defines the ARIA valuenow of the component.
	 * @default -1
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueNow!: number;

	/**
	 * Defines the ARIA valuetext of the component.
	 * @default ""
	 */
	@property()
	valueText?: string;

	/**
	 * Override of the handler in order to prevent button toggle functionality
	 */
	_onclick() {}

	/**
	 * Override of the getter in order to set proper role to the button
	 */
	get buttonAccessibleRole() {
		return "spinbutton";
	}
}

ToggleSpinButton.define();

export default ToggleSpinButton;
