import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { property, eventStrict } from "@ui5/webcomponents-base/dist/decorators.js";
import { isInstanceOfTable } from "./TableUtils.js";
import type Table from "./Table.js";
import type TableRowBase from "./TableRowBase.js";
import type TableRow from "./TableRow.js";
import type { ITableFeature } from "./Table.js";

/**
 * Fired when selection is changed by user interaction.
 *
 * @public
 */
type TableSelectionBaseChangeEventDetail = void;

/**
 * Fired when the selection is changed by user interaction.
 *
 * @public
 */
@eventStrict("change", {
	bubbles: false,
})

/**
 * @class
 * The `TableSelectionBase` class serves as a foundation for table selections.
 * @constructor
 * @extends UI5Element
 * @since 2.8.0
 * @public
 */
abstract class TableSelectionBase extends UI5Element implements ITableFeature {
	eventDetails!: {
		change: TableSelectionBaseChangeEventDetail,
	}

	/**
	 * Defines the selected elements of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	selected?: string;

	readonly identifier = "TableSelection";
	protected _table?: Table;

	onTableActivate(table: Table) {
		this._table = table;
		this._invalidateTableAndRows();
	}

	onExitDOM() {
		this._invalidateTableAndRows();
		this._table = undefined;
	}

	onBeforeRendering() {
		if (!this._table && this.parentElement && isInstanceOfTable(this.parentElement)) {
			this._table = this.parentElement;
		}
		this._invalidateTableAndRows();
	}

	// this will be removed when the legacy selection component is removed
	isSelectable(): boolean {
		return true;
	}

	/**
	 * Determines if the component allows multiple selection.
	 */
	isMultiSelectable(): boolean {
		return false;
	}

	/**
	 * Determines whether a row selector (for example, `radiobutton` or `checkbox`) is rendered.
	 */
	isRowSelectorRequired(): boolean {
		return true;
	}

	/**
	 * Returns the unique key associated with the table row.
	 *
	 * @param row The row instance
	 * @public
	 */
	getRowKey(row: TableRow): string {
		return row.rowKey || "";
	}

	/**
	 * Returns the table row instance for the given row key.
	 *
	 * @param rowKey The row key
	 * @public
	 */
	getRowByKey(rowKey: string): TableRow | undefined {
		if (this._table && rowKey) {
			return this._table.rows.find(row => this.getRowKey(row) === rowKey);
		}
	}

	/**
	 * Determines whether the specified table row is currently selected.
	 *
	 * @param row The row instance
	 * @public
	 */
	abstract isSelected(row: TableRowBase): boolean;

	/**
	 * Sets the selected state of the specified table row.
	 *
	 * @param row The row instance
	 * @param selected Whether the row is selected
	 * @public
	 */
	abstract setSelected(row: TableRowBase, selected: boolean, _fireEvent: boolean): void;

	/**
	 * Invalidates the table and its rows to re-evaluate the selection.
	 *
	 * @protected
	 */
	protected _invalidateTableAndRows() {
		if (this._table) {
			this._table._invalidate++;
			this._table.rows.forEach(row => row._invalidate++);
		}
	}
}

export default TableSelectionBase;

export type {
	TableSelectionBaseChangeEventDetail,
};
