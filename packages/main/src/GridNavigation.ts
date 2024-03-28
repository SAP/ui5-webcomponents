import ItemNavigation, { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Grid from "./Grid.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";

interface ITababbleElement extends HTMLElement, ITabbable {}

/**
 * Handles the keyboard navigation for the ui5-grid.
 *
 * @class
 * @private
 */
class GridNavigation {
	_grid: Grid;
	_itemNavigation: ItemNavigation;
	_onfocusinBound: (e: FocusEvent) => void;
	_lastFocusedItem?: ITababbleElement;

	constructor(grid: Grid) {
		this._grid = grid;
		this._onfocusinBound = this._onfocusin.bind(this);
		grid.addEventListener("focusin", this._onfocusinBound);
		this._itemNavigation = new ItemNavigation(grid, {
			getItemsCallback: () => this._getNavigationItemsOfGrid(),
			skipItemsSize: 20,
		});
	}

	_getNavigationItemsOfRow(row: GridRow | GridHeaderRow) : ITababbleElement[] {
		return [row, ...row.shadowRoot!.children].map(element => {
			return element.localName === "slot" ? (element as HTMLSlotElement).assignedElements() : element;
		}).flat().filter(element => {
			return element.localName.includes("ui5-grid") && !element.hasAttribute("excluded-from-navigation");
		}) as unknown as ITababbleElement[];
	}

	_getNavigationItemsOfGrid() {
		const items: Array<ITababbleElement> = [];
		items.push(...this._getNavigationItemsOfRow(this._grid.headerRow));
		this._itemNavigation.setRowSize(items.length + (this._grid.headerRow._popinCells.length ? 1 : 0));

		if (this._grid.rows.length) {
			this._grid.rows.forEach(row => {
				items.push(...this._getNavigationItemsOfRow(row));
			});
		} else {
			const noDataRow = this._getNoDataRow();
			noDataRow && items.push(noDataRow);
		}
		return items;
	}

	_getNoDataRow(): GridRow {
		return this._grid.shadowRoot!.getElementById("nodata-row") as GridRow;
	}

	_onfocusin(e: FocusEvent) {
		let currentItem: ITababbleElement | undefined;

		if ((e.composedPath()[0] as HTMLElement).hasAttribute("ui5-grid-dummy-focus-area")) {
			if (this._lastFocusedItem && this._getNavigationItemsOfGrid().includes(this._lastFocusedItem)) {
				currentItem = this._lastFocusedItem;
			} else {
				currentItem = this._grid.rows.length ? this._grid.rows[0] : this._getNoDataRow();
			}
			currentItem.focus();
		} else {
			const gridItem = e.composedPath().find(target => {
				const element = target as ITababbleElement;
				return element.localName?.includes("ui5-grid") && !(element as any)?._popin;
			});
			currentItem = this._getNavigationItemsOfGrid().findLast(item => item === gridItem);
		}

		if (currentItem) {
			this._itemNavigation.setCurrentItem(currentItem);
			this._lastFocusedItem = currentItem;
		}
	}
}

export default GridNavigation;
