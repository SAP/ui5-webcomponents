import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import Button from "./Button.js";
import TableRowActionBase from "./TableRowActionBase.js";

import TableRowActionTemplate from "./generated/templates/TableRowActionTemplate.lit.js";
import MenuItem from "./MenuItem.js";
import Menu from "./Menu.js";

@event("row-action-click")

/**
 * @class
 * A class to serve as a foundation for the `TableRow` and `TableHeaderRow` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-table-row-action",
	template: TableRowActionTemplate,
	renderer: litRender,
	dependencies: [Button, MenuItem, Menu],
})

class TableRowAction extends TableRowActionBase {	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:** SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** A text attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string

	/**
	 * Defines the type of the action.
	 * @default undefined
	 * @public
	 */
	@property()
	type?: string

	/**
	 * Defines if RowAction is stored in Menu.
	 * @default false
	 * @public
	 */
	@property({ noAttribute: true })
	menuItem?: boolean = false

	_onTableRowActionClick(e: MouseEvent) {
		e?.stopImmediatePropagation();

		this._table?._onTableRowActionPress(this);
	}

	get _getMenuItem() {
		return this.menuItem;
	}
}

TableRowAction.define();

export default TableRowAction;
