import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot, property, eventStrict, i18n,
} from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TableTemplate from "./generated/templates/TableTemplate.lit.js";
import TableStyles from "./generated/themes/Table.css.js";
import TableHeaderRow from "./TableHeaderRow.js";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";
import TableExtension from "./TableExtension.js";
import TableNavigation from "./TableNavigation.js";
import TableOverflowMode from "./types/TableOverflowMode.js";
import TableDragAndDrop from "./TableDragAndDrop.js";
import DropIndicator from "./DropIndicator.js";
import BusyIndicator from "./BusyIndicator.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { findVerticalScrollContainer, scrollElementIntoView, isFeature } from "./TableUtils.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { MoveEventDetail } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import type TableHeaderCell from "./TableHeaderCell.js";
import type TableSelection from "./TableSelection.js";
import type TableSelectionBase from "./TableSelectionBase.js";
import type TableRowActionBase from "./TableRowActionBase.js";
import type TableVirtualizer from "./TableVirtualizer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	TABLE_NO_DATA,
} from "./generated/i18n/i18n-defaults.js";

/**
 * Interface for components that can be slotted inside the `features` slot of the `ui5-table`.
 *
 * @public
 * @experimental
 */
interface ITableFeature extends UI5Element {
	readonly identifier: string;
	/**
	 * Called when the table is activated.
	 * @param table Table instance
	 */
	onTableActivate?(table: Table): void;
	/**
	 * Called every time before the table renders.
	 * @param table Table instance
	 */
	onTableBeforeRendering?(table?: Table): void;
	/**
	 * Called every time after the table renders.
	 * @param table Table instance
	 */
	onTableAfterRendering?(table?: Table): void;
}

/**
 * Interface for components that can be slotted inside the `features` slot of the `ui5-table`
 * and provide growing/data loading functionality.
 * @public
 * @experimental
 */
interface ITableGrowing extends ITableFeature {
	/**
	 * Called when the table needs to load more data.
	 */
	loadMore(): void;
	/**
	 * Determines whether the table has a growing control, that should be rendered in the table.
	 */
	hasGrowingComponent(): boolean;
	_individualSlot?: string;
}

/**
 * Fired when an interactive row is clicked.
 *
 * @param {TableRow} row The clicked row instance
 * @public
 */
type TableRowClickEventDetail = {
	row: TableRow,
};

type TableMoveEventDetail = MoveEventDetail;

/**
 * Fired when a row action is clicked.
 *
 * @param {TableRowActionBase} action The row action instance
 * @param {TableRow} row The row instance
 * @public
 */
type TableRowActionClickEventDetail = {
	action: TableRowActionBase,
	row: TableRow,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table` component provides a set of sophisticated features for displaying and dealing with vast amounts of data in a responsive manner.
 * To render the `ui5-table`, you need to define the columns and rows. You can use the provided `ui5-table-header-row` and `ui5-table-row` components for this purpose.
 *
 * ### Features
 *
 * The `ui5-table` can be enhanced in its functionalities by applying different features.
 * Features can be slotted into the `features` slot, to enable them in the component.
 * Features need to be imported separately, as they are not enabled by default.
 *
 * The following features are currently available:
 *
 * * [TableSelection](../TableSelection) - adds selection capabilities to the table
 * * [TableGrowing](../TableGrowing) - provides growing capabilities to load more data
 *
 * ### Keyboard Handling
 *
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * Furthermore, you can interact with `ui5-table` via the following keys:
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
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the table

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
 * * <kbd>[Shift]Tab</kbd> - Move focus to the element in the tab chain outside the table

 *
 * If the focus is on an interactive cell content, the following keyboard shortcuts are available:
 * * <kbd>Down</kbd> - Move the focus to the interactive element in the same column of the previous row, unless the focused element prevents the default
 * * <kbd>Up</kbd> - Move the focus to the interactive element in the same column of the next row, unless the focused element prevents the default
 * * <kbd>[Shift]Tab</kbd> - Move the focus to the element in the tab chain
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Table.js";`\
 * `import "@ui5/webcomponents/dist/TableRow.js";` (`ui5-table-row`)\
 * `import "@ui5/webcomponents/dist/TableCell.js";` (`ui5-table-cell`)\
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";` (`ui5-table-header-row`)\
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";` (`ui5-table-header-cell`)
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @experimental This Table web component is available since 2.0 and has been newly implemented to provide better screen reader and keyboard handling support.
 * Currently, it's considered experimental as its API is subject to change.
 * This Table replaces the previous Table web component, that has been part of **@ui5/webcomponents** version 1.x.
 * For compatibility reasons, we moved the previous Table implementation to the **@ui5/webcomponents-compat** package
 * and will be maintained until the new Table is experimental.
 * Keep in mind that you can use either the compat/Table, or the main/Table - you can't use them both as they both define the `ui5-table` tag name.
 */
@customElement({
	tag: "ui5-table",
	renderer: litRender,
	styles: TableStyles,
	template: TableTemplate,
	fastNavigation: true,
	dependencies: [
		BusyIndicator,
		TableHeaderRow,
		TableCell,
		TableRow,
		DropIndicator,
	],
})

/**
 * Fired when an interactive row is clicked.
 *
 * @param {TableRow} row The row instance
 * @public
 */
@eventStrict("row-click", {
	bubbles: false,
})

/**
 * Fired when a movable item is moved over a potential drop target during a dragging operation.
 *
 * If the new position is valid, prevent the default action of the event using `preventDefault()`.
 *
 * **Note:** If the dragging operation is a cross-browser operation or files are moved to a potential drop target,
 * the `source` parameter will be `null`.
 *
 * @param {Event} originalEvent The original `dragover` event
 * @param {object} source The source object
 * @param {object} destination The destination object
 * @public
 */
@eventStrict("move-over", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired when a movable list item is dropped onto a drop target.
 *
 * **Notes:**
 *
 * The `move` event is fired only if there was a preceding `move-over` with prevented default action.
 *
 * If the dragging operation is a cross-browser operation or files are moved to a potential drop target,
 * the `source` parameter will be `null`.
 *
 * @param {Event} originalEvent The original `drop` event
 * @param {object} source The source object
 * @param {object} destination The destination object
 * @public
 */
@eventStrict("move", {
	bubbles: true,
})

/**
 * Fired when a row action is clicked.
 *
 * @param {TableRowActionBase} action The row action instance
 * @param {TableRow} row The row instance
 * @since 2.6.0
 * @public
 */
@eventStrict("row-action-click", {
	bubbles: false,
})

class Table extends UI5Element {
	eventDetails!: {
		"row-click": TableRowClickEventDetail;
		"move-over": TableMoveEventDetail;
		"move": TableMoveEventDetail;
		"row-action-click": TableRowActionClickEventDetail;
	}
	/**
	 * Defines the rows of the component.
	 *
	 * **Note:** Use `ui5-table-row` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		invalidateOnChildChange: {
			properties: ["navigated", "position"],
			slots: false,
		},
	})
	rows!: Array<TableRow>;

	/**
	 * Defines the header row of the component.
	 *
	 * **Note:** Use `ui5-table-header-row` for the intended design.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: { properties: false, slots: true } })
	headerRow!: Array<TableHeaderRow>;

	/**
	 * Defines the custom visualization if there is no data available.
	 *
	 * @public
	 */
	@slot()
	nodata!: Array<HTMLElement>;

	/**
	 * Defines the features of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	features!: Array<ITableFeature>;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Identifies the element (or elements) that labels the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	/**
	 * Defines the text to be displayed when there are no rows in the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	noDataText?: string;

	/**
	 * Defines the mode of the <code>ui5-table</code> overflow behavior.
	 *
	 * Available options are:
	 *
	 * <code>Scroll</code> - Columns are shown as regular columns and horizontal scrolling is enabled.
	 *
	 * <code>Popin</code> - Columns are shown as pop-ins instead of regular columns.
	 *
	 * @default "Scroll"
	 * @public
	 */
	@property()
	overflowMode: `${TableOverflowMode}` = "Scroll";

	/**
	 * Defines if the loading indicator should be shown.
	 *
	 * **Note:** When the component is loading, it is not interactive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
     * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
	 *
     * @default 1000
     * @public
     */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines the sticky top offset of the table, if other sticky elements outside of the table exist.
	 */
	@property()
	stickyTop = "0";

	/**
	 * Defines the maximum number of row actions that is displayed, which determines the width of the row action column.
	 *
	 * **Note:** It is recommended to use a maximum of 3 row actions, as exceeding this limit may take up too much space on smaller screens.
	 *
	 * @default 0
	 * @since 2.7.0
	 * @public
	 */
	@property({ type: Number })
	rowActionCount = 0;

	@property({ type: Number, noAttribute: true })
	_invalidate = 0;

	@property({ type: Boolean, noAttribute: true })
	_renderNavigated = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_events = ["keydown", "keyup", "click", "focusin", "focusout", "dragenter", "dragleave", "dragover", "drop"];
	_onEventBound: (e: Event) => void;
	_onResizeBound: ResizeObserverCallback;
	_tableNavigation?: TableNavigation;
	_tableDragAndDrop?: TableDragAndDrop;
	_poppedIn: Array<{col: TableHeaderCell, width: float}> = [];
	_containerWidth = 0;

	constructor() {
		super();
		this._onResizeBound = this._onResize.bind(this);
		this._onEventBound = this._onEvent.bind(this);
	}

	onEnterDOM() {
		if (this.overflowMode === TableOverflowMode.Popin) {
			ResizeHandler.register(this, this._onResizeBound);
		}
		this._events.forEach(eventType => this.addEventListener(eventType, this._onEventBound));
		this.features.forEach(feature => feature.onTableActivate?.(this));
		this._tableNavigation = new TableNavigation(this);
		this._tableDragAndDrop = new TableDragAndDrop(this);
	}

	onExitDOM() {
		this._tableNavigation = undefined;
		this._tableDragAndDrop = undefined;
		this._events.forEach(eventType => this.removeEventListener(eventType, this._onEventBound));
		if (this.overflowMode === TableOverflowMode.Popin) {
			ResizeHandler.deregister(this, this._onResizeBound);
		}
	}

	onBeforeRendering(): void {
		this._renderNavigated = this.rows.some(row => row.navigated);
		if (this.headerRow[0]) {
			this.headerRow[0]._rowActionCount = this.rowActionCount;
		}
		this.rows.forEach(row => {
			row._renderNavigated = this._renderNavigated;
			row._rowActionCount = this.rowActionCount;
		});

		this.style.setProperty(getScopedVarName("--ui5_grid_sticky_top"), this.stickyTop);
		this._refreshPopinState();
		this.features.forEach(feature => feature.onTableBeforeRendering?.(this));
	}

	onAfterRendering(): void {
		this.features.forEach(feature => feature.onTableAfterRendering?.(this));
	}

	_findFeature<T>(featureName: string): T {
		return this.features.find(feature => isFeature<T>(feature, featureName)) as T;
	}

	_getSelection(): TableSelectionBase | TableSelection | undefined {
		return this._findFeature<TableSelectionBase>("TableSelectionBase") || this._findFeature<TableSelection>("TableSelection");
	}

	_getVirtualizer(): TableVirtualizer | undefined {
		return this._findFeature<TableVirtualizer>("TableVirtualizer");
	}

	_onEvent(e: Event) {
		const composedPath = e.composedPath();
		const eventOrigin = composedPath[0] as HTMLElement;
		const elements = [this._tableNavigation, this._tableDragAndDrop, ...composedPath, ...this.features];
		elements.forEach(element => {
			if (element instanceof TableExtension || (element instanceof HTMLElement && element.localName.includes("ui5-table"))) {
				const eventHandlerName = `_on${e.type}` as keyof typeof element;
				const eventHandler = element[eventHandlerName] as (e?: Event, eventOrigin?: HTMLElement) => void;
				if (typeof eventHandler === "function") {
					eventHandler.call(element, e, eventOrigin);
				}
			}
		});
	}

	_onResize() {
		const { clientWidth, scrollWidth } = this._tableElement;

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
		if (e.target === this) {
			return;
		}

		// Handles focus in the table, when the focus is below a sticky element
		scrollElementIntoView(this._scrollContainer, e.target as HTMLElement, this._stickyElements, this.effectiveDir === "rtl");
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

	/**
	 * Refreshes the popin state of the columns.
	 * Syncs the popin state of the columns with the popin state of the header cells.
	 * This is needed when additional rows are manually added and no resize happens.
	 * @private
	 */
	_refreshPopinState() {
		this.headerRow[0]?.cells.forEach((header, index) => {
			this.rows.forEach(row => {
				const cell = row.cells[index];
				if (cell) {
					cell._popinHidden = header.popinHidden;
					cell._popin = header._popin;
				}
			});
		});
	}

	_setHeaderPopinState(headerCell: TableHeaderCell, inPopin: boolean, popinWidth: number) {
		const headerIndex = this.headerRow[0].cells.indexOf(headerCell);
		headerCell._popin = inPopin;
		headerCell._popinWidth = popinWidth;
		this.rows.forEach(row => {
			row.cells[headerIndex]._popinHidden = headerCell.popinHidden;
			row.cells[headerIndex]._popin = inPopin;
		});
	}

	_isGrowingFeature(feature: any) {
		return Boolean(feature.loadMore && feature.hasGrowingComponent && isFeature<ITableGrowing>(feature, "TableGrowing"));
	}

	_onRowClick(row: TableRow) {
		this.fireDecoratorEvent("row-click", { row });
	}

	_onRowActionClick(action: TableRowActionBase) {
		const row = action.parentElement as TableRow;
		this.fireDecoratorEvent("row-action-click", { action, row });
	}

	get styles() {
		const virtualizer = this._getVirtualizer();
		const headerStyleMap = this.headerRow?.[0]?.cells?.reduce((headerStyles, headerCell) => {
			if (headerCell.horizontalAlign !== undefined && !headerCell._popin) {
				headerStyles[`--horizontal-align-${headerCell._individualSlot}`] = headerCell.horizontalAlign;
			}
			return headerStyles;
		}, {} as { [key: string]: string });
		return {
			table: {
				"grid-template-columns": this._gridTemplateColumns,
				"--row-height": virtualizer ? `${virtualizer.rowHeight}px` : "auto",
				...headerStyleMap,
			},
			spacer: {
				"transform": virtualizer?._getTransform(),
				"will-change": virtualizer && "transform",
			},
		};
	}

	get _gridTemplateColumns() {
		if (!this.headerRow[0]) {
			return;
		}

		const widths = [];
		const visibleHeaderCells = this.headerRow[0]._visibleCells as TableHeaderCell[];
		if (this._getSelection()?.isRowSelectorRequired()) {
			widths.push("min-content");
		}
		widths.push(...visibleHeaderCells.map(cell => {
			const minWidth = cell.minWidth === "auto" ? "3rem" : cell.minWidth;
			if (cell.width === "auto" || cell.width.includes("%") || cell.width.includes("fr") || cell.width.includes("vw")) {
				return `minmax(${minWidth}, ${cell.maxWidth})`;
			}
			return `minmax(${cell.width}, ${cell.width})`;
		}));

		if (this.rowActionCount > 0) {
			widths.push(`calc(var(${getScopedVarName("--_ui5_button_base_min_width")}) * ${this.rowActionCount} + var(${getScopedVarName("--_ui5_table_row_actions_gap")}) * ${this.rowActionCount - 1} + var(${getScopedVarName("--_ui5_table_cell_horizontal_padding")}) * 2)`);
		}

		if (this._renderNavigated) {
			widths.push(`var(${getScopedVarName("--_ui5_table_navigated_cell_width")})`);
		}

		return widths.join(" ");
	}

	get _tableOverflowX() {
		return (this.overflowMode === TableOverflowMode.Popin) ? "clip" : "auto";
	}

	get _tableOverflowY() {
		return "auto";
	}

	get _nodataRow() {
		return this.shadowRoot!.getElementById("nodata-row") as TableRow;
	}

	get _beforeElement() {
		return this.shadowRoot!.getElementById("before") as HTMLElement;
	}

	get _afterElement() {
		return this.shadowRoot!.getElementById("after") as HTMLElement;
	}

	get _tableElement() {
		return this.shadowRoot!.getElementById("table") as HTMLElement;
	}

	get _loadingElement() {
		return this.shadowRoot!.getElementById("loading") as HTMLElement;
	}

	get _effectiveNoDataText() {
		return this.noDataText || Table.i18nBundle.getText(TABLE_NO_DATA);
	}

	get _ariaLabel() {
		return getEffectiveAriaLabelText(this) || undefined;
	}

	get _ariaRowCount() {
		return this._getVirtualizer()?.rowCount || undefined;
	}

	get _ariaMultiSelectable() {
		const selection = this._getSelection();
		return (selection?.isSelectable() && this.rows.length) ? selection.isMultiSelectable() : undefined;
	}

	get _shouldRenderGrowing() {
		return this.rows.length && this._growing?.hasGrowingComponent();
	}

	get _growing() {
		return this._findFeature<ITableGrowing>("TableGrowing");
	}

	get _stickyElements() {
		const stickyRows = this.headerRow.filter(row => row.sticky);
		const stickyColumns = this.headerRow[0]._stickyCells as TableHeaderCell[];

		return [...stickyRows, ...stickyColumns];
	}

	get _scrollContainer() {
		return this._getVirtualizer() ? this._tableElement : findVerticalScrollContainer(this);
	}

	get isTable() {
		return true;
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	get _hasRowActions() {
		return this.rowActionCount > 0;
	}
}

Table.define();

export default Table;

export type {
	ITableFeature,
	ITableGrowing,
	TableRowClickEventDetail,
	TableMoveEventDetail,
	TableRowActionClickEventDetail,
};
