import { customElement, property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./generated/templates/TableHeaderCellTemplate.lit.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
import Icon from "./Icon.js";
import TableSortOrder from "./types/TableSortOrder.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
@customElement({
	tag: "ui5-table-header-cell",
	styles: [TableCellBase.styles, TableHeaderCellStyles],
	template: TableHeaderCellTemplate,
	dependencies: [Icon],
})
class TableHeaderCell extends TableCellBase {
	/**
	 * Defines the width of column.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	width = "auto";

	/**
 	 * Defines the minimum width of the column.
	 *
	 * If the table is in `Popin` mode and the minimum width does not fit anymore,
	 * the column will move into the popin.
	 *
	 * **Note:** If `minWidth` has the `auto` value, the table ensures that the column is wider than at least `3rem`.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	minWidth = "auto";

	/**
	 * Defines the maximum width of the column.
	 *
	 * @default "auto"
	 * @public
	 */
	@property()
	maxWidth = "auto";

	/**
	 * Defines the importance of the column.
	 *
	 * This property affects the popin behaviour.
	 * Columns with higher importance will move into the popin area later then less important
	 * columns.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	importance = 0;

	/**
	 * The text for the column when it pops in.
	 *
	 * @default undefined
	 * @since 2.7.0
	 * @public
	 */
	@property()
	popinText?: string;

	/**
	 * Defines the sort indicator of the column.
	 *
	 * @default "None"
	 * @since 2.8.0
	 * @public
	 */
	@property()
	sortIndicator: `${TableSortOrder}` = "None";

	/**
	 * Defines the action of the column.
	 *
	 * **Note:** While multiple actions are technically possible, this is not supported.
	 *
	 * @public
	 * @since 2.8.0
	 */
	@slot()
	action!: Array<TableHeaderCellActionBase>;

	@property({ type: Boolean, noAttribute: true })
	_popin = false;

	protected ariaRole: string = "columnheader";
	_popinWidth: number = 0;

	onEnterDOM() {
		super.onEnterDOM();
		this.style.minWidth = this.minWidth;
		this.style.maxWidth = this.maxWidth;
		this.style.width = this.width;
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		if (this._individualSlot) {
			// overwrite setting of TableCellBase so that the TableHeaderCell always uses the slot variable
			this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
		}
		if (this.sortIndicator !== TableSortOrder.None) {
			this.setAttribute("aria-sort", this.sortIndicator.toLowerCase());
		} else if (this.hasAttribute("aria-sort")) {
			this.removeAttribute("aria-sort");
		}
	}

	get _sortIcon() {
		if (this.sortIndicator !== TableSortOrder.None) {
			return `sort-${this.sortIndicator.toLowerCase()}`;
		}
	}
}

TableHeaderCell.define();

export default TableHeaderCell;
