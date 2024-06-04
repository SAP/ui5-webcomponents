import {
	isUpShift,
	isShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
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
	_rangeSelection?: {state: boolean, isUp: boolean | null, rows: GridRow[], isMouse: boolean} | null;

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

	_selectRow(row: GridRow, state: boolean) {
		const rowIdentifier = this.getRowIdentifier(row);
		if (this.mode === GridSelectionMode.Multiple) {
			const selectedSet = this.selectedAsSet;
			selectedSet[state ? "add" : "delete"](rowIdentifier);
			this.selectedAsSet = selectedSet;
		} else {
			this.selected = state ? rowIdentifier : "";
		}
	}

	_informRowSelectionChange(row: GridRow) {
		const isRowSelected = this.isMultiSelect() ? this.isSelected(row) : true;
		this._selectRow(row, !isRowSelected);
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

	_onkeydown(e: KeyboardEvent) {
		if (!this.isMultiSelect() || !this._grid || !e.shiftKey) {
			return;
		}

		const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.

		if (focusedElement === null) {
			this._stopRangeSelection();
			return;
		}

		if (!(focusedElement instanceof GridRow) && !this._rangeSelection?.isMouse) {
			this._stopRangeSelection();
			return;
		}

		if (!this._rangeSelection) {
			// If no range selection is active, start one
			this._startRangeSelection(focusedElement as GridRow);
		} else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			e.preventDefault();
			this._handleRangeSelection(e, focusedElement as GridRow, isUpShift(e));
		}
	}

	_onkeyup(e: KeyboardEvent, eventTarget: HTMLElement) {
		if (!this.isMultiSelect() || !this._grid) {
			return;
		}

		if (!(eventTarget instanceof GridRow) || !this._rangeSelection || isShift(e)) {
			// Stop range selection if a) Shift is relased or b) the event target is not a row or c) the event is not from the selection checkbox
			!this._isSelectionCheckbox(e) && this._stopRangeSelection();
		}
	}

	_onclick(e: MouseEvent) {
		if (!this._grid) {
			return;
		}

		if (!this._isSelectionCheckbox(e) || !this.isMultiSelect()) {
			this._stopRangeSelection();
			return;
		}

		if (e.shiftKey) {
			if (!this._rangeSelection) {
				return;
			}

			const startRow = this._rangeSelection.rows[0];
			const endRow = this._findRowInPath(e.composedPath());
			const startIndex = this._grid?.rows.indexOf(startRow);
			const endIndex = this._grid?.rows.indexOf(endRow);

			if (startIndex === -1 || endIndex === -1 || startIndex === undefined || endIndex === undefined
				|| endRow.key === startRow.key || endRow.key === this._rangeSelection.rows[this._rangeSelection.rows.length - 1].key) {
				return;
			}

			this._grid?.rows.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).forEach(row => {
				if (!this._rangeSelection?.rows.includes(row)) {
					this._rangeSelection?.rows.push(row);
				}
				// Workaround required due to bug, where the checkbox stays unchecked, but the row is selected.
				// Even invalidation does not change the state of the checkbox. Maybe an issue with lit's 'intelligent' rendering?
				row.shadowRoot?.querySelector("#selection-component")?.setAttribute("checked", "");
				this._selectRow(row, this._rangeSelection!.state);
			});
			this.fireEvent("change");
		} else {
			const row = this._findRowInPath(e.composedPath());
			if (row) {
				this._startRangeSelection(row, true);
			}
		}
	}

	/**
	 * Start the range selection and initialises the range selection state
	 * @param row starting row
	 * @private
	 */
	_startRangeSelection(row: GridRow, isMouse = false) {
		const state = this.isSelected(row);
		if (isMouse && !state) {
			// Do not initiate range selection if the row is not selected
			return;
		}

		this._rangeSelection = {
			state,
			isUp: null,
			rows: [row],
			isMouse,
		};
	}

	/**
	 * Handles the keyboard range selection.
	 * @param e keyboard event
	 * @param row focused row
	 */
	_handleRangeSelection(e: KeyboardEvent, row: GridRow, isUp: boolean) {
		if (!this._rangeSelection) {
			return;
		}

		this._rangeSelection.isUp ??= isUp;
		if (isUp !== this._rangeSelection.isUp) {
			// Changing direction "reverse" the selection
			this._reverseRangeSelection();
		} else {
			this._rangeSelection.rows.push(row);
			this._selectRow(row, this._rangeSelection.state);
			this._fireEvent("change");
		}
	}

	_stopRangeSelection() {
		this._rangeSelection = null;
	}

	_reverseRangeSelection() {
		const row = this._rangeSelection?.rows.pop();
		if (row) {
			this._selectRow(row, false);
			this._fireEvent("change");
		}

		if (this._rangeSelection?.rows.length === 1) {
			this._rangeSelection.isUp = null;
		}
	}

	_isSelectionCheckbox(e: Event) {
		return e.composedPath().some((el: EventTarget) => (el as HTMLElement).id === "selection-component");
	}

	_findRowInPath(composedPath: Array<EventTarget>) {
		return composedPath.find((el: EventTarget) => el instanceof GridRow) as GridRow;
	}
}

GridSelection.define();

export default GridSelection;
