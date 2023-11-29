import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { IOption } from "./Interfaces.js";
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-option</code> component defines the content of an option in the <code>ui5-select</code>.
 *
 * @constructor
 * @extends UI5Element
 * @implements {ISelectOption}
 * @public
 */
@customElement("ui5-option")
class Option extends UI5Element implements IOption {
	/**
	 * Defines the selected state of the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is hidden.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.12
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * @default ""
	 * @private
	 * @since 1.1.0
	 */
	@property()
	title!: string;

	/**
	 * Defines the <code>icon</code> source URI.
	 * <br><br>
	 * <b>Note:</b>
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 * @default null
	 * @public
	 */
	@property({ defaultValue: null })
	icon?: string | null;

	/**
	 * Defines the value of the <code>ui5-select</code> inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the <code>name</code> property of <code>ui5-select</code>.
	 *
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
	additionalText!: string;

	/**
	 * Defines the focused state of the component.
	 * @default false
	 * @since 1.0.0-rc.13
	 * @private
	 */
	@property({ type: Boolean })
	_focused!: boolean;

	/**
	 * Defines the text of the component.
	 * <br><br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
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
