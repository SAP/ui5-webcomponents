import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import GridSelectionMode from "./types/GridSelectionMode.js";
import Grid, { IGridFeature } from "./Grid.js";
import GridRow from "./GridRow.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-selection</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridSelection.js";</code>
 *
 * @constructor
 * @extends UI5Element
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
	 * @default "Multi"
	 * @public
	 */
	@property({ type: GridSelectionMode, defaultValue: GridSelectionMode.Multi })
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
		return this.mode === GridSelectionMode.Multi;
	}

	hasRowSelector(): boolean {
		return this.mode !== GridSelectionMode.None;
	}

	getRowIdentifier(row: GridRow): string {
		return row.key;
	}

	isSelected(row: GridRow): boolean {
		if (!this._grid || !this.isSelectable()) {
			return false;
		}

		const rowIdentifier = this.getRowIdentifier(row);
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
		if (!this._grid || !this._grid.rows.length || this.mode !== GridSelectionMode.Multi) {
			return false;
		}

		const selectedArray = this.selectedAsArray;
		return this._grid.rows.every(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			return selectedArray.includes(rowIdentifier);
		});
	}

	informRowSelectionChange(row: GridRow, selected: boolean) {
		const rowIdentifier = this.getRowIdentifier(row);
		if (this.selected && this.mode === GridSelectionMode.Multi) {
			const selectedSet = this.selectedAsSet;
			selectedSet[selected ? "add" : "delete"](rowIdentifier);
			this.selectedAsSet = selectedSet;
		} else {
			this.selected = rowIdentifier;
		}
		this.fireEvent("change");
	}

	informHeaderRowSelectionChange(selected: boolean) {
		const selectedSet = this.selectedAsSet;
		this._grid!.rows.forEach(row => {
			const rowIdentifier = this.getRowIdentifier(row);
			selectedSet[selected ? "add" : "delete"](rowIdentifier);
		});
		this.selectedAsSet = selectedSet;
		this.fireEvent("change");
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
		this._grid.headerRow._invalidate++;
		this._grid.rows.forEach(row => row._invalidate++);
	}
}

GridSelection.define();

export default GridSelection;
