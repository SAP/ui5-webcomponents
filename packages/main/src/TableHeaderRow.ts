import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowBase from "./TableRowBase.js";
import TableHeaderRowTemplate from "./generated/templates/TableHeaderRowTemplate.lit.js";
import TableHeaderRowStyles from "./generated/themes/TableHeaderRow.css.js";
import TableHeaderCell from "./TableHeaderCell.js";
import {
	TABLE_SELECTION,
	TABLE_ROW_POPIN,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row` component represents the table headers of a `ui5-table`.
 *
 * It is tightly coupled to the `ui5-table` and should therefore be used in the `ui5-table` only.
 * The header row is placed in the `headerRow` slot of the table.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
@customElement({
	tag: "ui5-table-header-row",
	languageAware: true,
	styles: [TableRowBase.styles, TableHeaderRowStyles],
	template: TableHeaderRowTemplate,
	dependencies: [...TableRowBase.dependencies, TableHeaderCell],
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
class TableHeaderRow extends TableRowBase {
	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-table-header-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: {
			properties: ["width", "_popin"],
			slots: false,
		},
		individualSlots: true,
	})
	cells!: Array<TableHeaderCell>;

	/**
	 * Sticks the `ui5-table-header-row` to the top of a table.
	 *
	 * Note: If used in combination with overflowMode "Scroll", the table needs a defined height for the sticky header to work as expected.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	sticky = false;

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this._table) {
			this.style.top = this._table.stickyTop;
		}
	}

	isHeaderRow(): boolean {
		return true;
	}

	get _isSelectable() {
		return this._isMultiSelect;
	}

	get _isSelected() {
		return this._tableSelection?.areAllRowsSelected();
	}

	get _i18nSelection() {
		return TableRowBase.i18nBundle.getText(TABLE_SELECTION);
	}

	get _i18nRowPopin() {
		return TableRowBase.i18nBundle.getText(TABLE_ROW_POPIN);
	}
}

TableHeaderRow.define();

export default TableHeaderRow;
