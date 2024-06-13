import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import TableSelectionMode from "./types/TableSelectionMode.js";
import type Table from "./Table.js";
import type { ITableFeature } from "./Table.js";
import type TableRow from "./TableRow.js";
import type TableRowBase from "./TableRowBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection` component is used inside the `ui5-table` ti add key-based selection capabilities to the `ui5-table`.
 *
 * The component offers three selection modes:
 * * Single - select a single row.
 * * Multiple - select multiple rows.
 * * None - no selection active.
 *
 * As the selection is key-based, `ui5-table-row` components need to define a unique `key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection` component is only used inside the `ui5-table` component as a feature.
 * It has to be slotted inside the `ui5-table` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection mode="Multiple" slot="features"></ui5-table-selection>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelection.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({ tag: "ui5-table-selection" })

/**
 * Fired when selection is changed by user interaction.
 *
 * @public
 */
@event("change")

class TableSelection extends UI5Element implements ITableFeature {
	/**
	 * Defines the selection mode.
	 *
	 * @default "Multiple"
	 * @public
	 */
	@property()
	mode: `${TableSelectionMode}` = "Multiple";

	/**
	 * Defines the selected rows separated by a space.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	selected = "";

	_table?: Table;

	onTableActivate(table: Table) {
		this._table = table;
		this._invalidateTableAndRows();
	}

	onExitDOM() {
		this.mode = TableSelectionMode.None;
		this._invalidateTableAndRows();
		this._table = undefined;
	}

	onBeforeRendering() {
		this._invalidateTableAndRows();
	}

	isSelectable(): boolean {
		return this.mode !== TableSelectionMode.None;
	}

	isMultiSelect(): boolean {
		return this.mode === TableSelectionMode.Multiple;
	}

	hasRowSelector(): boolean {
		return this.mode !== TableSelectionMode.None;
	}

	getRowIdentifier(row: TableRow): string {
		return row.key;
	}

	isSelected(row: TableRowBase): boolean {
		if (!this._table || !this.isSelectable()) {
			return false;
		}

		if (row.isHeaderRow()) {
			return this.areAllRowsSelected();
		}

		const rowIdentifier = this.getRowIdentifier(row as TableRow);
		return this.selectedAsArray.includes(rowIdentifier);
	}

	hasSelectedRow(): boolean {
		if (!this._table || !this.isSelectable()) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._table.rows.some(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			return selectedArray.includes(rowIdentifier);
		});
	}

	areAllRowsSelected(): boolean {
		if (!this._table || !this._table.rows.length || this.mode !== TableSelectionMode.Multiple) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._table.rows.every(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			return selectedArray.includes(rowIdentifier);
		});
	}

	informSelectionChange(row: TableRowBase) {
		if (row.isHeaderRow()) {
			this._informHeaderRowSelectionChange();
		} else {
			this._informRowSelectionChange(row as TableRow);
		}
	}

	get selectedAsArray(): string[] {
		return this.selected.split(" ").filter(String);
	}

	set selectedAsArray(selectedArray: string[]) {
		this.selected = selectedArray.filter(String).join(" ");
	}

	get selectedAsSet(): Set<string> {
		return new Set(this.selectedAsArray);
	}

	set selectedAsSet(selectedSet: Set<string>) {
		this.selectedAsArray = [...selectedSet];
	}

	_informRowSelectionChange(row: TableRow) {
		const isRowSelected = this.isMultiSelect() ? this.isSelected(row) : true;
		const rowIdentifier = this.getRowIdentifier(row);
		if (this.selected && this.mode === TableSelectionMode.Multiple) {
			const selectedSet = this.selectedAsSet;
			selectedSet[isRowSelected ? "delete" : "add"](rowIdentifier);
			this.selectedAsSet = selectedSet;
		} else {
			this.selected = rowIdentifier;
		}
		this.fireEvent("change");
	}

	_informHeaderRowSelectionChange() {
		const isRowSelected = this.areAllRowsSelected();
		const selectedSet = this.selectedAsSet;
		this._table!.rows.forEach(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			selectedSet[isRowSelected ? "delete" : "add"](rowIdentifier);
		});
		this.selectedAsSet = selectedSet;
		this.fireEvent("change");
	}

	_invalidateTableAndRows() {
		if (!this._table) {
			return;
		}

		if (!this.isSelectable()) {
			this.selected = "";
		} else if (!this.isMultiSelect()) {
			this.selected = this.selectedAsArray.shift() || "";
		}

		this._table._invalidate++;
		this._table.headerRow[0]._invalidate++;
		this._table.rows.forEach(row => row._invalidate++);
	}
}

TableSelection.define();

export default TableSelection;
