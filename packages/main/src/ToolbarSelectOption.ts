import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toolbar-select-option</code> component defines the content of an option in the <code>ui5-toolbar-select</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarSelectOption
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @tagname ui5-toolbar-select-option
 * @implements sap.ui.webc.main.IToolbarSelectOption
 * @public
 * @since 1.17.0
 */
@customElement("ui5-toolbar-select-option")
class ToolbarSelectOption extends UI5Element {
	/**
	 * Defines the selected state of the component.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.ToolbarSelectOption.prototype.selected
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the text of the component.
	 * <br><br>
	 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.ToolbarSelectOption.prototype.default
	 * @slot
	 * @public
	 */
	@slot({ type: Node, "default": true, invalidateOnChildChange: true })
	text!: Array<Node>;
}

ToolbarSelectOption.define();

export default ToolbarSelectOption;
