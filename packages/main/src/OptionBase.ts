import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

import OptionBaseTemplate from "./generated/templates/OptionBaseTemplate.lit.js";

/**
 * @class
 *
 * ### Overview
 *
 * The base of the `ui5-option` and `ui5-option-custom` components defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
@customElement({
	template: OptionBaseTemplate,
	renderer: litRender,
})
class OptionBase extends UI5Element {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the text of the tooltip that would be displayed for the option component.
	 * @default ""
	 * @public
	 * @since 2.0.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the focused state of the component.
	 * @default false
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}

	get isCustom() {
		return false;
	}
}

export default OptionBase;
