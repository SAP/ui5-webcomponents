import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-toggle-spin-button</code> is...
 *
 * <h3>Usage</h3>y
 *
 * <code>ui5-toggle-spin-button</code>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ToggleSpinButton.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToggleSpinButton
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-toggle-spin-button
 * @since 1.??.??
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
	 *
	 * @name sap.ui.webc.main.ToggleSpinButton.prototype.valueMin
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueMin!: number;

	/**
	 * Defines the ARIA valuemax of the component.
	 *
	 * @name sap.ui.webc.main.ToggleSpinButton.prototype.valueMax
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueMax!: number;

	/**
	 * Defines the ARIA valuenow of the component.
	 *
	 * @name sap.ui.webc.main.ToggleSpinButton.prototype.valueNow
	 * @type {Integer}
	 * @defaultvalue -1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: -1 })
	valueNow!: number;

	/**
	 * Defines the ARIA valuetext of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.ToggleSpinButton.prototype.valueText
	 * @public
	 */
	@property()
	valueText?: string;

	_onclick() {
	}

}

ToggleSpinButton.define();

export default ToggleSpinButton;
