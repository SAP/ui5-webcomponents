import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import GridTemplate from "./generated/templates/GridTemplate.lit.js";
import GridStyles from "./generated/themes/Grid.css.js";
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridHeaderCell from "./GridHeaderCell.js";
import GridExtension from "./GridExtension.js";
import GridSelection from "./GridSelection.js";
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
 * Fired when an interactive row is pressed.
 * @param {GridRow} row The pressed row instance
 * @public
 */
type GridRowPressEventDetail = {
	row: GridRow,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-grid` component provides a set of sophisticated features for displaying and dealing with vast amounts of data in a responsive manner.
 * To render the `ui5-grid`, you need to define the columns and rows. You can use the provided `ui5-grid-header-row` and `ui5-grid-row` components for this purpose.
 *
 * ### Features
 *
 * The `ui5-grid` can be enhanced in its functionalities by applying different features.
 * Features can be slotted into the `features` slot, to enable them in the component.
 *
 * The following features are currently available:
 *
 * * [GridSelection](../GridSelection) - adds selection capabilities to the table
 * * [GridGrowing](../GridGrowing) - provides growing capabilities to load more data
 *
 * ### Keyboard Handling
 *
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * Furthermore, you can interact with `ui5-grid` via the following keys:
 *
 * If the focus is on a row, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Navigates down
 * * <kbd>Up</kbd> - Navigates up
 * * <kbd>Right</kbd> - Selects the first cell of the row
 * * <kbd>Space</kbd> - Toggles the selection of the row
 * * <kbd>Ctrl/Cmd + A</kbd> - In multi selection mode, toggles the selection of all rows
 * * <kbd>Home</kbd> - Navigates to the first row, if the focus is on the first row, navigates to the header row
 * * <kbd>End</kbd> - Navigates to the last row, if the focus is on the last row, navigates to the growing button
 * * <kbd>Page Up</kbd> - Navigates one page up, if the focus is on the first row, navigates to the header row
 * * <kbd>Page Down</kbd> - Navigates one page down, if the focus is on the last row, navigates to the growing button
 * * <kbd>F2</kbd> - Focuses the first tabbable element in the row
 * * <kbd>F7</kbd> - If focus position is remembered, moves focus to the corresponding focus position row, otherwise to the first tabbable element within the row
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the grid

 *
 * If the focus is on a cell, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Navigates down
 * * <kbd>Up</kbd> - Navigates up
 * * <kbd>Right</kbd> - Navigates right
 * * <kbd>Left</kbd> - Navigates left, if the focus is on the first cell of the row, the focus is moved to the row.
 * * <kbd>Home</kbd> - Navigates to the first cell of the current row, if the focus is on the first cell, navigates to the corresponding row
 * * <kbd>End</kbd> - Navigates to the last cell of the current row, if the focus is on the last cell, navigates to the corresponding row
 * * <kbd>Page Up</kbd> - Navigates one page up while keeping the focus in same column
 * * <kbd>Page Down</kbd> - Navigates one page down while keeping the focus in same column
 * * <kbd>F2</kbd> - Toggles the focus between the first tabbable cell content and the cell
 * * <kbd>Enter</kbd> - Focuses the first tabbable cell content
 * * <kbd>F7</kbd> - If the focus is on an interactive element inside a row, moves focus to the corresponding row and remembers the focus position of the element within the row
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the grid

 *
 * If the focus is on an interactive cell content, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Move the focus to the interactive element in the same column of the previous row, unless the focused element prevents the default
 * * <kbd>Up</kbd> - Move the focus to the interactive element in the same column of the next row, unless the focused element prevents the default
 * * <kbd>[Shift]Tab</kbd> - Move the focus to the element in the tab chain
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Grid.js";`\
 * `import "@ui5/webcomponents/dist/GridRow.js";` (`ui5-grid-row`)\
 * `import "@ui5/webcomponents/dist/GridCell.js";` (`ui5-grid-cell`)\
 * `import "@ui5/webcomponents/dist/GridHeaderRow.js";` (`ui5-grid-header-row`)\
 * `import "@ui5/webcomponents/dist/GridHeaderCell.js";` (`ui5-grid-header-cell`)
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid",
	renderer: litRender,
	styles: GridStyles,
	template: GridTemplate,
	fastNavigation: true,
	dependencies: [],
})

/**
 * Fired when an interactive row is pressed.
 *
 * @param {GridRow} row The row instance
 * @public
 */
@event<GridRowPressEventDetail>("row-click", {
	detail: {
		/**
		 * @public
		 */
		row: { type: GridRow },
	},
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
	headerRow!: Array<GridHeaderRow>;

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
	 * * <code>Scroll</code> - Columns are shown as regular columns and horizontal scrolling is enabled.
	 * * <code>Popin</code> - Columns are shown as pop-ins instead of regular columns.
	 *
	 * @default GridOverflowMode.Scroll
	 * @public
	 */
	@property({ type: GridOverflowMode, defaultValue: GridOverflowMode.Scroll })
	overflowMode!: `${GridOverflowMode}`;

	/**
	 * Defines if the loading indicator should be shown.
	 *
	 * <b>Note:</b> When the component is loading, it is non-interactive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean, defaultValue: false })
	loading!: boolean;

	/**
	 * Defines the sticky top offset of the table, if other sticky elements outside of the table exist.
	 */
	@property({ type: String, defaultValue: "0" })
	stickyTop!: string;

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	static i18nBundle: I18nBundle;
	static async onDefine() {
		Grid.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	_events = ["keydown", "keyup", "click", "focusin", "focusout"];
	_onEventBound: (e: Event) => void;
	_onResizeBound: ResizeObserverCallback;
	_gridNavigation?: GridNavigation;
	_poppedIn: Array<{col: GridHeaderCell, width: float}>;
	_containerWidth: number;

	constructor() {
		super();
		this._poppedIn = [];
		this._containerWidth = 0;
		this._onResizeBound = this._onResize.bind(this);
		this._onEventBound = this._onEvent.bind(this);
	}

	onEnterDOM() {
		if (this.overflowMode === GridOverflowMode.Popin) {
			ResizeHandler.register(this, this._onResizeBound);
		}
		this._events.forEach(eventType => this.addEventListener(eventType, this._onEventBound));
		this.features.forEach(feature => feature.onGridActivate(this));
		this._gridNavigation = new GridNavigation(this);
	}

	onExitDOM() {
		this._gridNavigation = undefined;
		this._events.forEach(eventType => this.addEventListener(eventType, this._onEventBound));
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

	_onEvent(e: Event) {
		const composedPath = e.composedPath();
		const eventOrigin = composedPath[0] as HTMLElement;
		const elements = [this._gridNavigation, ...composedPath, ...this.features];
		elements.forEach(element => {
			if (element instanceof GridExtension || (element instanceof HTMLElement && element.localName.includes("ui5-grid"))) {
				const eventHandlerName = `_on${e.type}` as keyof typeof element;
				const eventHandler = element[eventHandlerName] as (e?: Event, eventOrigin?: HTMLElement) => void;
				if (typeof eventHandler === "function") {
					eventHandler.call(element, e, eventOrigin);
				}
			}
		});
	}

	_onResize() {
		const { clientWidth, scrollWidth } = this._gridElement;

		if (scrollWidth > clientWidth) {
			// Overflow Handling: Move columns into the popin until overflow is resolved
			const overflow = scrollWidth - clientWidth;
			const headers = this._getPopinOrderedColumns(false);
			const poppedInWidth = headers.reduce((totalPoppedInWidth, headerCell) => {
				if (totalPoppedInWidth < overflow && !headerCell._popin) {
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

	_onfocusin(e: FocusEvent) {
		// Handles focus that is below sticky element
		const stickyElements = this._stickyElements;

		if (stickyElements.length === 0) {
			return;
		}

		// Find the sticky element that is closest to the focused element
		const target = e.target as HTMLElement;
		const element = target.closest("ui5-grid-cell, ui5-grid-row") as HTMLElement ?? target;
		const elementRect = element.getBoundingClientRect();
		const stickyBottom = stickyElements.reduce((min, stickyElement) => {
			const stickyRect = stickyElement.getBoundingClientRect();

			if (stickyRect.bottom > elementRect.top) {
				return Math.max(min, stickyRect.bottom);
			}
			return min;
		}, -Infinity);

		// If the focused element is not behind any sticky element, do nothing
		if (stickyBottom === -Infinity) {
			return;
		}

		// Scroll the focused element into view
		const scrollContainer = this._scrollContainer;
		scrollContainer.scrollBy({
			top: elementRect.top - stickyBottom,
		});
	}

	/**
	 * Refreshes the popin state of the columns.
	 * Syncs the popin state of the columns with the popin state of the header cells.
	 * This is needed when additional rows are manually added and no resize happens.
	 * @private
	 */
	_refreshPopinState() {
		this.headerRow[0].cells.forEach((header, index) => {
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
		let headers = [...this.headerRow[0].cells];
		headers = headers.reverse(); // reverse the "visual" order
		headers = headers.sort((a, b) => a.importance - b.importance); // sort by importance (asc)
		headers.pop(); // remove the most important column, as it will not be popped in

		if (reverse) {
			headers = headers.reverse();
		}

		return headers;
	}

	_setHeaderPopinState(headerCell: GridHeaderCell, inPopin: boolean, popinWidth: number) {
		const headerIndex = this.headerRow[0].cells.indexOf(headerCell);
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

	_onRowPress(row: GridRow) {
		this.fireEvent<GridRowPressEventDetail>("row-click", { row });
	}

	get styles() {
		return {
			grid: {
				"grid-template-columns": this._gridTemplateColumns,
			},
		};
	}

	get _gridTemplateColumns() {
		const widths = [];
		const visibleHeaderCells = this.headerRow[0]._visibleCells as GridHeaderCell[];
		if (this._getSelection()?.hasRowSelector()) {
			widths.push(`var(${getScopedVarName("--_ui5_checkbox_width_height")})`);
		}
		widths.push(...visibleHeaderCells.map(cell => {
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

	// TODO: Could be moved to UI5Element. TBD
	get _scrollContainer() {
		let element: HTMLElement = this as HTMLElement;
		while (element) {
			const { overflowY } = window.getComputedStyle(element);
			if (overflowY === "auto" || overflowY === "scroll") {
				return element;
			}
			element = element.parentElement as HTMLElement;
		}

		return document.scrollingElement as HTMLElement || document.documentElement;
	}

	get _stickyElements() {
		return [this.headerRow[0]].filter(row => row.sticky);
	}
}

Grid.define();

export default Grid;

export type {
	IGridFeature,
	IGridGrowing,
	GridRowPressEventDetail,
};
