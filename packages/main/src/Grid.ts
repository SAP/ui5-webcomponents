import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

import GridTemplate from "./generated/templates/GridTemplate.lit.js";
import GridCss from "./generated/themes/Grid.css.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridSelection from "./GridSelection.js";
import GridHeaderCell from "./GridHeaderCell.js";
import GridOverflowMode from "./types/GridOverflowMode.js";
import GridNavigation from "./GridNavigation.js";
import {
	GRID_NO_DATA,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Interface for components that can be slotted inside the <code>features</code> slot of the <code>ui5-grid</code>.
 *
 * @public
 */
interface IGridFeature extends UI5Element {
	/**
	 * Called when the grid is activated.
	 * @param grid grid instance
	 */
	onGridActivate(grid: Grid): void;
	/**
	 * Called when the grid finished rendering.
	 */
	onGridRendered?(): void;
}

/**
 * Interface for components that can be slotted inside the <code>features</code> slot of the <code>ui5-grid</code>
 * and provide growing/data loading functionality.
 * @public
 */
interface IGridGrowing extends IGridFeature {
	/**
	 * Called when the table needs to load more data.
	 */
	loadMore(): void;
	/**
	 * Determines whether the table has a growing control, that should be rendered in the grid.
	 */
	hasGrowingComponent(): boolean;
	_individualSlot?: string;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-grid` component provides a set of sophisticated features for displaying and dealing with vast amounts of data in a responsive manner.
 *
 * To render the `ui5-grid`, you need to define the columns and rows. You can use the provided `ui5-grid-row` and `ui5-grid-column` components for this purpose.
 * The `ui5-grid` can be enhanced in its functionality by applying different features selection (`ui5-grid-selection`) or growing (`ui5-grid-growing`).
 *
 * ### Keyboard Handling
 *
 * The `ui5-grid` distinguishes between row and cell navigation.
 *
 * If the focus is on a row, the following keyboard shortcuts are available:
 * * <kbd>ARROW_DOWN</kbd> - Navigates down
 * * <kbd>ARROW_UP</kbd> - Navigates up
 * * <kbd>ARROW_RIGHT</kbd> - Selects the first cell of the focused row
 * * <kbd>SPACE</kbd> - Selects/deselects the focused row
 * * <kbd>HOME</kbd> - Navigates to the first row
 * * <kbd>END</kbd> - Navigates to the last row
 * * <kbd>PAGE_UP</kbd> - Navigates one page up
 * * <kbd>PAGE_DOWN</kbd> - Navigates one page down
 *
 * If the focus is on a cell, the following keyboard shortcuts are available:
 * * <kbd>ARROW_DOWN</kbd> - Navigates down
 * * <kbd>ARROW_UP</kbd> - Navigates up
 * * <kbd>ARROW_RIGHT</kbd> - Navigates right
 * * <kbd>ARROW_LEFT</kbd> - Navigates left. If the focus is on the first cell of the row, the focus is moved to the row.
 * * <kbd>HOME</kbd> - Navigates to the first cell of the current row
 * * <kbd>END</kbd> - Navigates to the last cell of the current row
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Grid.js";`
 * `import "@ui5/webcomponents/dist/GridRow.js";` (`ui5-grid-row`)
 * `import "@ui5/webcomponents/dist/GridCell.js";` (`ui5-grid-cell`)
 * `import "@ui5/webcomponents/dist/GridHeaderRow.js";` (`ui5-grid-header-row`)
 * `import "@ui5/webcomponents/dist/GridHeaderCell.js";` (`ui5-grid-header-cell`)
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid",
	renderer: litRender,
	styles: GridCss,
	template: GridTemplate,
	dependencies: [],
})

class Grid extends UI5Element {
	/**
	 * Defines the rows of the component.
	 *
	 * Note: Use <code>ui5-grid-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	rows!: Array<GridRow>;

	/**
	 * Defines the header row of the component.
	 *
	 * Note: Use <code>ui5-grid-header-row</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: { properties: false, slots: true } })
	"header-row"!: Array<GridHeaderRow>;
	get headerRow() { return this["header-row"][0]; }

	/**
	 * Defines the custom visualization if there is no data available.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	nodata!: Array<HTMLElement>;

	/**
	 * Defines the features of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	features!: Array<IGridFeature>;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleName!: string;

	/**
	 * Identifies the element (or elements) that labels the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the text to be displayed when there are no rows in the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * Defines the mode of the <code>ui5-grid</code> overflow behavior.
	 *
	 * Available options are:
	 * * <code>Popin</code> - Columns are shown as pop-ins instead of regular columns.
	 * * <code>Scroll</code> - Columns are shown as regular columns and horizontal scrolling is enabled.
	 *
	 * @default GridOverflowMode.Popin
	 * @public
	 */
	@property({ type: GridOverflowMode, defaultValue: GridOverflowMode.Popin })
	overflowMode!: `${GridOverflowMode}`;

	/**
	 * Defines if the component is in busy state.
	 *
	 * <b>Note:</b> When the component is in busy state, it is non-interactive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean, defaultValue: false })
	busy!: boolean;

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	_poppedIn: Array<{col: GridHeaderCell, width: float}>;
	_containerWidth: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		Grid.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_onResizeBound: ResizeObserverCallback;
	_gridNavigation?: GridNavigation;

	constructor() {
		super();
		this._poppedIn = [];
		this._containerWidth = 0;
		this._onResizeBound = this._onResize.bind(this);
	}

	onEnterDOM() {
		if (this.overflowMode === GridOverflowMode.Popin) {
			ResizeHandler.register(this, this._onResizeBound);
		}
		this.features.forEach(feature => feature.onGridActivate(this));
		this._gridNavigation = new GridNavigation(this);
	}

	onExitDOM() {
		this._gridNavigation = undefined;
		if (this.overflowMode === GridOverflowMode.Popin) {
			ResizeHandler.deregister(this, this._onResizeBound);
		}
	}

	onBeforeRendering(): void {
		this._refreshPopinState();
	}

	onAfterRendering(): void {
		this.features.forEach(feature => feature.onGridRendered?.());
	}

	_getFeature<Klass>(klass: any): Klass | undefined {
		return this.features.find(feature => feature instanceof klass) as Klass;
	}

	_getSelection(): GridSelection | undefined {
		return this._getFeature(GridSelection);
	}

	_onResize() {
		const { clientWidth, scrollWidth } = this._gridElement;

		if (scrollWidth > clientWidth) {
			// Overflow Handling: Move columns into the popin until overflow is resolved
			const overflow = scrollWidth - clientWidth;
			const headers = this._getPopinOrderedColumns(false);
			const poppedInWidth = headers.reduce((totalPoppedInWidth, headerCell) => {
				if (totalPoppedInWidth <= overflow && !headerCell._popin) {
					const headerWidth = Math.ceil(headerCell.getBoundingClientRect().width);
					totalPoppedInWidth += headerWidth;
					this._setHeaderPopinState(headerCell, true, headerWidth);
				}
				return totalPoppedInWidth;
			}, 0);
			// Calculate container width considering popped-in columns
			const columnOverflow = poppedInWidth - overflow;
			this._containerWidth = clientWidth - columnOverflow;
		} else {
			// Underflow Handling: Restore columns from popin until container width is met
			const headers = this._getPopinOrderedColumns(true).filter(it => it._popin);

			headers.every(headerCell => {
				const underflow = clientWidth - this._containerWidth;
				if (underflow >= headerCell._popinWidth) {
					this._containerWidth += headerCell._popinWidth;
					this._setHeaderPopinState(headerCell, false, 0);
					return true;
				}
				return false;
			});
		}
	}

	/**
	 * Refreshes the popin state of the columns.
	 * Syncs the popin state of the columns with the popin state of the header cells.
	 * This is needed when additional rows are manually added and no resize happens.
	 * @private
	 */
	_refreshPopinState() {
		this.headerRow.cells.forEach((header, index) => {
			this.rows.forEach(row => {
				const cell = row.cells[index];
				if (cell && cell._popin !== header._popin) {
					cell._popin = header._popin;
				}
			});
		});
	}

	_onGrow() {
		this._growing?.loadMore();
	}

	_getPopinOrderedColumns(reverse: boolean) {
		let headers = [...this.headerRow.cells];
		headers = headers.reverse(); // reverse the "visual" order
		headers = headers.sort((a, b) => a.importance - b.importance); // sort by importance (asc)
		headers.pop(); // remove the most important column, as it will not be popped in

		if (reverse) {
			headers = headers.reverse();
		}

		return headers;
	}

	_setHeaderPopinState(headerCell: GridHeaderCell, inPopin: boolean, popinWidth: number) {
		const headerIndex = this.headerRow.cells.indexOf(headerCell);
		headerCell._popin = inPopin;
		headerCell._popinWidth = popinWidth;
		this.rows.forEach(row => {
			row.cells[headerIndex]._popin = inPopin;
		});
	}

	_isFeature(feature: any) {
		return Boolean(feature.onGridActivate && feature.onGridRendered);
	}

	_isGrowingFeature(feature: any) {
		return Boolean(feature.loadMore && feature.hasGrowingComponent && this._isFeature(feature));
	}

	get styles() {
		return {
			grid: {
				"grid-template-columns": this._gridTemplateColumns,
				"overflow-x": this._gridOverflowX,
				"overflow-y": this._gridOverflowY,
			},
		};
	}

	get _gridTemplateColumns() {
		const widths = [];
		if (this._getSelection()?.hasRowSelector()) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...this.headerRow._visibleCells.map(cell => {
			const minWidth = cell.minWidth === "auto" ? "3rem" : cell.minWidth;
			if (cell.width === "auto" || cell.width.includes("%") || cell.width.includes("fr") || cell.width.includes("vw")) {
				return `minmax(${minWidth}, ${cell.maxWidth})`;
			}
			return `minmax(${cell.width}, ${cell.width})`;
		}));
		return widths.join(" ");
	}

	get _gridOverflowX() {
		return (this.overflowMode === GridOverflowMode.Popin) ? "hidden" : "auto";
	}

	get _gridOverflowY() {
		return "auto";
	}

	get _nodataRow() {
		return this.shadowRoot!.getElementById("nodata-row") as GridRow;
	}

	get _beforeElement() {
		return this.shadowRoot!.getElementById("before") as HTMLElement;
	}

	get _afterElement() {
		return this.shadowRoot!.getElementById("after") as HTMLElement;
	}

	get _gridElement() {
		return this.shadowRoot!.getElementById("grid") as HTMLElement;
	}

	get _effectiveNoDataText() {
		return this.noDataText || Grid.i18nBundle.getText(GRID_NO_DATA);
	}

	get _ariaLabel() {
		return getEffectiveAriaLabelText(this) || undefined;
	}

	get _ariaMultiSelectable() {
		const selection = this._getSelection();
		return (selection?.isSelectable() && this.rows.length) ? selection.isMultiSelect() : undefined;
	}

	get _shouldRenderGrowing() {
		return this.rows.length && this._growing?.hasGrowingComponent();
	}

	get _growing() {
		return this.features.find(feature => this._isGrowingFeature(feature)) as IGridGrowing;
	}

	get _scrollContainer() {
		let element = this as HTMLElement;
		while (element.scrollHeight <= element.clientHeight) {
			element = element.parentElement as HTMLElement;
			if (!element) {
				break;
			}
		}
		return element;
	}
}

Grid.define();

export default Grid;

export type {
	IGridFeature,
	IGridGrowing,
};
