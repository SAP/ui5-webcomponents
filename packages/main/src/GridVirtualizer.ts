import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Grid, { IGridFeature } from "./Grid.js";

/**
 * @class
 *
 * ### Overview
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/GridVirtualizer.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({ tag: "ui5-grid-virtualizer" })

/**
 * Fired when the virtualizer is changed by user interaction e.g. on scrolling.
 *
 * @public
 */
@event("rangechange")

class GridVirtualizer extends UI5Element implements IGridFeature {
	@property({ type: Integer, defaultValue: 44 })
	rowHeight!: number;

	@property({ type: Integer, defaultValue: 1000000 })
	rowCount!: number;

	_grid?: Grid;
	_virtualHeight: number = 0;
	_virutalFirstRowIndex: number = 0;
	_virtualLastRowIndex: number = 0;
	_scrollerHeight: number = 0;
	_scrollContainer?: HTMLElement;
	_handleRangeChange: boolean = false;
	_onScrollBound: () => void;

	constructor() {
		super();
		this._onScrollBound = this._onScroll.bind(this);
	}

	onGridActivate(grid: Grid): void {
		this._grid = grid;
		this._scrollContainer = this._grid._scrollContainer;
		this._scrollerHeight = this._scrollContainer.offsetHeight;
		this._virtualHeight = this.rowHeight * this.rowCount;
		this._grid.style.height = `${this._virtualHeight}px`;
		this._scrollContainer.addEventListener("scroll", this._onScroll.bind(this), { passive: true });
		this._onScroll();
	}

	onGridRendered(): void {
		if (!this._grid || !this._scrollContainer?.scrollTop || !this._handleRangeChange) {
			return;
		}

		const top = this._virutalFirstRowIndex * this.rowHeight - this.rowHeight;
		this._grid.rows.forEach(row => {
			row.style.transform = `translateY(${top}px)`;
		});
	}

	onExitDOM(): void {
		this._grid = undefined;
	}

	_onScroll(): void {
		const scrollTop = this._scrollContainer?.scrollTop || 0;
		this._virutalFirstRowIndex = Math.floor(scrollTop / this.rowHeight);
		this._virtualLastRowIndex = this._virutalFirstRowIndex + Math.ceil(this._scrollerHeight / this.rowHeight) + 1;
		this._virtualLastRowIndex = Math.max(this._virtualLastRowIndex - 5, 0);
		this._virtualLastRowIndex = Math.min(this._virtualLastRowIndex + 5, this.rowCount - 1);
		const top = Math.max(0, this._virutalFirstRowIndex * this.rowHeight - this.rowHeight);
		this._handleRangeChange = this.fireEvent("rangechange", { first: this._virutalFirstRowIndex, last: this._virtualLastRowIndex, top }, true);
	}
}

GridVirtualizer.define();

export default GridVirtualizer;
