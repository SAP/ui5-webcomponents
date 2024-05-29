import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import Grid, { IGridFeature } from "./Grid.js";
import GridRow from "./GridRow.js";
import GridRowBase from "./GridRowBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-grid-selection` component is used inside the `ui5-grid` ti add key-based selection capabilities to the `ui5-grid`.
 *
 * The component offers three selection modes:
 * * Single - select a single row.
 * * Multiple - select multiple rows.
 * * None - no selection active.
 *
 * As the selection is key-based, `ui5-grid-row` components need to define a unique `key` property.
 *
 * ### Usage
 *
 * The `ui5-grid-selection` component is only used inside the `ui5-grid` component as a feature.
 * It has to be slotted inside the `ui5-grid` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-grid>
 * 	<ui5-grid-selection mode="Multiple" slot="features"></ui5-grid-selection>
 * </ui5-grid>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/GridSelection.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({ tag: "ui5-grid-selection" })

/**
 * Fired when selection is changed by user interaction.
 *
 * @public
 */
@event("change")

class GridSelection extends UI5Element implements IGridFeature {
	/**
	 * Defines the selection mode.
	 *
	 * @default "Multiple"
	 * @public
	 */
	@property({ type: GridSelectionMode, defaultValue: GridSelectionMode.Multiple })
	mode!: `${GridSelectionMode}`;

	/**
	 * Defines the selected rows separated by a space.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	selected!: string;

	_grid?: Grid;

	onGridActivate(grid: Grid) {
		this._grid = grid;
		this._invalidateGridAndRows();
	}

	onExitDOM() {
		this.mode = GridSelectionMode.None;
		this._invalidateGridAndRows();
		this._grid = undefined;
	}

	onBeforeRendering() {
		this._invalidateGridAndRows();
	}

	isSelectable(): boolean {
		return this.mode !== GridSelectionMode.None;
	}

	isMultiSelect(): boolean {
		return this.mode === GridSelectionMode.Multiple;
	}

	hasRowSelector(): boolean {
		return this.mode !== GridSelectionMode.None;
	}

	getRowIdentifier(row: GridRow): string {
		return row.key;
	}

	isSelected(row: GridRowBase): boolean {
		if (!this._grid || !this.isSelectable()) {
			return false;
		}

		if (row.isHeaderRow()) {
			return this.areAllRowsSelected();
		}

		const rowIdentifier = this.getRowIdentifier(row as GridRow);
		return this.selectedAsArray.includes(rowIdentifier);
	}

	hasSelectedRow(): boolean {
		if (!this._grid || !this.isSelectable()) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._grid.rows.some(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			return selectedArray.includes(rowIdentifier);
		});
	}

	areAllRowsSelected(): boolean {
		if (!this._grid || !this._grid.rows.length || this.mode !== GridSelectionMode.Multiple) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._grid.rows.every(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			return selectedArray.includes(rowIdentifier);
		});
	}

	informSelectionChange(row: GridRowBase) {
		if (row.isHeaderRow()) {
			this._informHeaderRowSelectionChange();
		} else {
			this._informRowSelectionChange(row as GridRow);
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

	_informRowSelectionChange(row: GridRow) {
		const isRowSelected = this.isMultiSelect() ? this.isSelected(row) : true;
		const rowIdentifier = this.getRowIdentifier(row);
		if (this.selected && this.mode === GridSelectionMode.Multiple) {
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
		this._grid!.rows.forEach(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			selectedSet[isRowSelected ? "delete" : "add"](rowIdentifier);
		});
		this.selectedAsSet = selectedSet;
		this.fireEvent("change");
	}

	_invalidateGridAndRows() {
		if (!this._grid) {
			return;
		}

		if (!this.isSelectable()) {
			this.selected = "";
		} else if (!this.isMultiSelect()) {
			this.selected = this.selectedAsArray.shift() || "";
		}

		this._grid._invalidate++;
		this._grid.headerRow[0]._invalidate++;
		this._grid.rows.forEach(row => row._invalidate++);
	}
}

GridSelection.define();

export default GridSelection;
