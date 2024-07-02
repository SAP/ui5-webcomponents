var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Table_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableTemplate from "./generated/templates/TableTemplate.lit.js";
import TableStyles from "./generated/themes/Table.css.js";
import TableRow from "./TableRow.js";
import TableExtension from "./TableExtension.js";
import TableSelection from "./TableSelection.js";
import TableOverflowMode from "./types/TableOverflowMode.js";
import TableNavigation from "./TableNavigation.js";
import { TABLE_NO_DATA, } from "./generated/i18n/i18n-defaults.js";
import BusyIndicator from "./BusyIndicator.js";
import TableCell from "./TableCell.js";
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
 * @since 2.0
 * @public
 * @experimental This Table web component is available since 2.0 and has been newly implemented to provide better screen reader and keyboard handling support.
 * Currently, it's considered experimental as its API is subject to change.
 * This Table replaces the previous Table web component, that has been part of **@ui5/webcomponents** version 1.x.
 * For compatibility reasons, we moved the previous Tabple implementation to the **@ui5/webcomponents-compat** package
 * and will be maintained until the new Table is experimental.
 */
let Table = Table_1 = class Table extends UI5Element {
    static async onDefine() {
        Table_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
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
        this.overflowMode = "Scroll";
        /**
         * Defines if the loading indicator should be shown.
         *
         * <b>Note:</b> When the component is loading, it is non-interactive.
         * @default false
         * @public
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
         * @default 1000
         * @public
         */
        this.loadingDelay = 1000;
        /**
         * Defines the sticky top offset of the table, if other sticky elements outside of the table exist.
         */
        this.stickyTop = "0";
        this._invalidate = 0;
        this._renderNavigated = false;
        this._events = ["keydown", "keyup", "click", "focusin", "focusout"];
        this._poppedIn = [];
        this._containerWidth = 0;
        this._onResizeBound = this._onResize.bind(this);
        this._onEventBound = this._onEvent.bind(this);
    }
    onEnterDOM() {
        if (this.overflowMode === TableOverflowMode.Popin) {
            ResizeHandler.register(this, this._onResizeBound);
        }
        this._events.forEach(eventType => this.addEventListener(eventType, this._onEventBound));
        this.features.forEach(feature => feature.onTableActivate(this));
        this._tableNavigation = new TableNavigation(this);
    }
    onExitDOM() {
        this._tableNavigation = undefined;
        this._events.forEach(eventType => this.addEventListener(eventType, this._onEventBound));
        if (this.overflowMode === TableOverflowMode.Popin) {
            ResizeHandler.deregister(this, this._onResizeBound);
        }
    }
    onBeforeRendering() {
        const renderNavigated = this._renderNavigated;
        this._renderNavigated = this.rows.some(row => row.navigated);
        if (renderNavigated !== this._renderNavigated) {
            this.rows.forEach(row => {
                row._renderNavigated = this._renderNavigated;
            });
        }
        this.style.setProperty(getScopedVarName("--ui5_grid_sticky_top"), this.stickyTop);
        this._refreshPopinState();
    }
    onAfterRendering() {
        this.features.forEach(feature => feature.onTableRendered?.());
    }
    _getFeature(klass) {
        return this.features.find(feature => feature instanceof klass);
    }
    _getSelection() {
        return this._getFeature(TableSelection);
    }
    _onEvent(e) {
        const composedPath = e.composedPath();
        const eventOrigin = composedPath[0];
        const elements = [this._tableNavigation, ...composedPath, ...this.features];
        elements.forEach(element => {
            if (element instanceof TableExtension || (element instanceof HTMLElement && element.localName.includes("ui5-table"))) {
                const eventHandlerName = `_on${e.type}`;
                const eventHandler = element[eventHandlerName];
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
        }
        else {
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
    _onfocusin(e) {
        // Handles focus that is below sticky element
        const stickyElements = this._stickyElements;
        if (stickyElements.length === 0) {
            return;
        }
        // Find the sticky element that is closest to the focused element
        const target = e.target;
        const element = target.closest("ui5-table-cell, ui5-table-row") ?? target;
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
    _getPopinOrderedColumns(reverse) {
        let headers = [...this.headerRow[0].cells];
        headers = headers.reverse(); // reverse the "visual" order
        headers = headers.sort((a, b) => a.importance - b.importance); // sort by importance (asc)
        headers.pop(); // remove the most important column, as it will not be popped in
        if (reverse) {
            headers = headers.reverse();
        }
        return headers;
    }
    _setHeaderPopinState(headerCell, inPopin, popinWidth) {
        const headerIndex = this.headerRow[0].cells.indexOf(headerCell);
        headerCell._popin = inPopin;
        headerCell._popinWidth = popinWidth;
        this.rows.forEach(row => {
            row.cells[headerIndex]._popin = inPopin;
        });
    }
    _isFeature(feature) {
        return Boolean(feature.onTableActivate && feature.onTableRendered);
    }
    _isGrowingFeature(feature) {
        return Boolean(feature.loadMore && feature.hasGrowingComponent && this._isFeature(feature));
    }
    _onRowPress(row) {
        this.fireEvent("row-click", { row });
    }
    get styles() {
        return {
            table: {
                "grid-template-columns": this._gridTemplateColumns,
            },
        };
    }
    get _gridTemplateColumns() {
        const widths = [];
        const visibleHeaderCells = this.headerRow[0]._visibleCells;
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
        if (this._renderNavigated) {
            widths.push(`var(${getScopedVarName("--_ui5_table_navigated_cell_width")})`);
        }
        return widths.join(" ");
    }
    get _tableOverflowX() {
        return (this.overflowMode === TableOverflowMode.Popin) ? "hidden" : "auto";
    }
    get _tableOverflowY() {
        return "auto";
    }
    get _nodataRow() {
        return this.shadowRoot.getElementById("nodata-row");
    }
    get _beforeElement() {
        return this.shadowRoot.getElementById("before");
    }
    get _afterElement() {
        return this.shadowRoot.getElementById("after");
    }
    get _tableElement() {
        return this.shadowRoot.getElementById("table");
    }
    get _loadingElement() {
        return this.shadowRoot.getElementById("loading");
    }
    get _effectiveNoDataText() {
        return this.noDataText || Table_1.i18nBundle.getText(TABLE_NO_DATA);
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
        return this.features.find(feature => this._isGrowingFeature(feature));
    }
    // TODO: Could be moved to UI5Element. TBD
    get _scrollContainer() {
        let element = this;
        while (element) {
            const { overflowY } = window.getComputedStyle(element);
            if (overflowY === "auto" || overflowY === "scroll") {
                return element;
            }
            element = element.parentElement;
        }
        return document.scrollingElement || document.documentElement;
    }
    get _stickyElements() {
        return [this.headerRow[0]].filter(row => row.sticky);
    }
    get isTable() {
        return true;
    }
};
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        invalidateOnChildChange: {
            properties: ["navigated"],
            slots: false,
        },
    })
], Table.prototype, "rows", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: { properties: false, slots: true } })
], Table.prototype, "headerRow", void 0);
__decorate([
    slot()
], Table.prototype, "nodata", void 0);
__decorate([
    slot({ type: HTMLElement, individualSlots: true })
], Table.prototype, "features", void 0);
__decorate([
    property()
], Table.prototype, "accessibleName", void 0);
__decorate([
    property()
], Table.prototype, "accessibleNameRef", void 0);
__decorate([
    property()
], Table.prototype, "noDataText", void 0);
__decorate([
    property()
], Table.prototype, "overflowMode", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], Table.prototype, "loadingDelay", void 0);
__decorate([
    property()
], Table.prototype, "stickyTop", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], Table.prototype, "_invalidate", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Table.prototype, "_renderNavigated", void 0);
Table = Table_1 = __decorate([
    customElement({
        tag: "ui5-table",
        renderer: litRender,
        styles: TableStyles,
        template: TableTemplate,
        fastNavigation: true,
        dependencies: [
            BusyIndicator,
            TableCell,
            TableRow,
        ],
    })
    /**
     * Fired when an interactive row is clicked.
     *
     * @param {TableRow} row The row instance
     * @public
     */
    ,
    event("row-click", {
        detail: {
            /**
             * @public
             */
            row: { type: TableRow },
        },
    })
], Table);
Table.define();
export default Table;
//# sourceMappingURL=Table.js.map