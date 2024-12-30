import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionTemplate from "./generated/templates/TableRowActionTemplate.lit.js";
import TableRowActionBase from "./TableRowActionBase.js";
import Button from "./Button.js";

/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends TableRowActionBase
 * @since 2.6.0
 * @public
 */
@customElement({
	tag: "ui5-table-row-action",
	dependencies: [Button],
})

class TableRowAction extends TableRowActionBase {
	/**
	 * Defines the icon of the row action.
	 *
	 * **Note:** SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string

	/**
	 * Defines the text of the row action.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string

	/**
	 * Defines the disabled state of the row action.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	static get actionTemplate() {
		return TableRowActionTemplate;
	}

	getOverflowInfo() {
		return {
			text: this.text,
			icon: this.icon,
			disabled: this.disabled,
		};
	}
}

TableRowAction.define();

export default TableRowAction;
