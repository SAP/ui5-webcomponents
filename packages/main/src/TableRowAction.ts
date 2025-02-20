import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionBase from "./TableRowActionBase.js";

/**
 * @class
 * The `TableRowAction` class defines a row action for table rows.
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 * @experimental
 */
@customElement({ tag: "ui5-table-row-action" })

class TableRowAction extends TableRowActionBase {
	/**
	 * Defines the icon of the row action.
	 *
	 * **Note:** For row actions to work properly, this property is mandatory.
	 *
	 * **Note:** SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon = "";

	/**
	 * Defines the text of the row action.
	 *
	 * **Note:** For row actions to work properly, this property is mandatory.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text = "";

	/**
	 * Defines the disabled state of the row action.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	getRenderInfo() {
		return {
			text: this.text,
			icon: this.icon,
			interactive: true,
		};
	}
}

TableRowAction.define();

export default TableRowAction;
