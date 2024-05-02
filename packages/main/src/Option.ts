import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import type { IOption } from "./Select.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-option` component defines the content of an option in the `ui5-select`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Option.js";`
 * @constructor
 * @extends UI5Element
 * @implements {IOption}
 * @public
 * @abstract
 */
@customElement("ui5-option")
class Option extends UI5Element implements IOption {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines the text of the tooltip that would be displayed for the option component.
	 * @default ""
	 * @public
	 * @since 2.0.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default null
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the `name` property of `ui5-select`.
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the additional text displayed at the end of the option element.
	 * @default ""
	 * @public
	 * @since 1.3.0
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the focused state of the component.
	 * @default false
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	text!: Array<Node>;

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

Option.define();

export default Option;
