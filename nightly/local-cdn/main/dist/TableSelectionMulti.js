var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from "@ui5/webcomponents-base/dist/decorators.js";
import TableSelectionBase from "./TableSelectionBase.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { isSelectionCheckbox, isHeaderSelector, findRowInPath } from "./TableUtils.js";
import { isUpShift } from "@ui5/webcomponents-base/dist/Keys.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection-multi` component is used inside the `ui5-table` to add multi-selection capabilities to the `ui5-table`.
 * Since selection is key-based, each `ui5-table-row` must define a unique `row-key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection-multi` component is a feature designed exclusively for use within the `ui5-table` component.
 * It must be placed inside the `features` slot of `ui5-table`.
 * This component is not intended for standalone use.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection-multi slot="features" selected="Row1 Row3"></ui5-table-selection-multi>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelectionMulti.js";`
 *
 * @constructor
 * @extends TableSelectionBase
 * @since 2.8.0
 * @public
 */
let TableSelectionMulti = class TableSelectionMulti extends TableSelectionBase {
    constructor() {
        super(...arguments);
        this._rowsLength = 0;
    }
    onTableBeforeRendering() {
        if (this._table && this._table.headerRow[0] && this._rowsLength !== this._table.rows.length) {
            this._rowsLength = this._table.rows.length;
            this._table.headerRow[0]._invalidate++;
        }
    }
    isMultiSelectable() {
        return true;
    }
    isSelected(row) {
        if (row.isHeaderRow()) {
            return this.areAllRowsSelected();
        }
        const rowKey = this.getRowKey(row);
        return this.getSelectedAsSet().has(rowKey);
    }
    setSelected(row, selected, fireEvent = false) {
        if (this._rangeSelection?.isMouse && this._rangeSelection.shiftPressed) {
            return;
        }
        const tableRows = row.isHeaderRow() ? this._table.rows : [row];
        const selectedSet = this.getSelectedAsSet();
        tableRows.forEach(tableRow => {
            const rowKey = this.getRowKey(tableRow);
            selectedSet[selected ? "add" : "delete"](rowKey);
        });
        this.setSelectedAsSet(selectedSet);
        fireEvent && this.fireDecoratorEvent("change");
    }
    /**
     * Returns an array of the selected rows.
     *
     * @public
     */
    getSelectedRows() {
        return this._table ? this._table.rows.filter(row => this.isSelected(row)) : [];
    }
    /**
     * Determines whether all rows are selected.
     */
    areAllRowsSelected() {
        if (!this._table || !this._table.rows.length) {
            return false;
        }
        const selectedSet = this.getSelectedAsSet();
        return this._table.rows.every(row => {
            const rowKey = this.getRowKey(row);
            return selectedSet.has(rowKey);
        });
    }
    /**
     * Returns the `selected` property as a set of unique `row-key` values.
     *
     * @public
     */
    getSelectedAsSet() {
        const selected = this.selected || "";
        const selectedArray = selected.split(" ").filter(String);
        return new Set(selectedArray);
    }
    /**
     * Sets the `selected` property using the provided set of unique `row-key` values.
     *
     * @param selectedSet A set of `row-key` values
     * @public
     */
    setSelectedAsSet(selectedSet) {
        this.selected = [...selectedSet].join(" ");
    }
    _onkeydown(e) {
        if (!this._table || !e.shiftKey) {
            return;
        }
        const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.
        if (!(focusedElement?.hasAttribute("ui5-table-row") || this._rangeSelection?.isMouse || focusedElement?.hasAttribute("ui5-growing-row"))) {
            this._stopRangeSelection();
            return;
        }
        if (!this._rangeSelection) {
            // If no range selection is active, start one
            const row = focusedElement;
            this._startRangeSelection(row, this.isSelected(row));
        }
        else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const change = isUpShift(e) ? -1 : 1;
            this._handleRangeSelection(focusedElement, change);
        }
        if (this._rangeSelection) {
            this._rangeSelection.shiftPressed = e.shiftKey;
        }
    }
    _onkeyup(e, eventOrigin) {
        if (!this._table) {
            return;
        }
        if (!eventOrigin.hasAttribute("ui5-table-row") || !this._rangeSelection || !e.shiftKey) {
            // Stop range selection if a) Shift is relased or b) the event target is not a row
            this._stopRangeSelection();
        }
        if (this._rangeSelection) {
            this._rangeSelection.shiftPressed = e.shiftKey;
        }
    }
    _onclick(e) {
        if (!this._table) {
            return;
        }
        if (isHeaderSelector(e)) {
            this._stopRangeSelection();
            return;
        }
        if (!isSelectionCheckbox(e)) {
            this._stopRangeSelection();
            return;
        }
        const row = findRowInPath(e.composedPath());
        if (e.shiftKey && this._rangeSelection?.isMouse) {
            const startRow = this._rangeSelection.rows[0];
            const startIndex = this._table.rows.indexOf(startRow);
            const endIndex = this._table.rows.indexOf(row);
            // When doing a range selection and clicking on an already selected row, the checked status should not change
            // Therefore, we need to manually set the checked attribute again, as clicking it would deselect it and leads to
            // a visual inconsistency.
            row.shadowRoot?.querySelector("#selection-component")?.toggleAttribute("checked", true);
            e.stopImmediatePropagation();
            if (startIndex === -1 || endIndex === -1 || row.rowKey === startRow.rowKey || row.rowKey === this._rangeSelection.rows[this._rangeSelection.rows.length - 1].rowKey) {
                return;
            }
            const change = endIndex - startIndex;
            this._handleRangeSelection(row, change);
        }
        else if (row) {
            this._startRangeSelection(row, !this.isSelected(row), true);
        }
    }
    /**
     * Start the range selection and initialises the range selection state
     * @param row starting row
     * @private
     */
    _startRangeSelection(row, selected, isMouse = false) {
        this._rangeSelection = {
            selected,
            isUp: null,
            rows: [row],
            isMouse,
            shiftPressed: false,
        };
    }
    /**
     * Handles the range selection
     * @param targetRow Row that is currently focused
     * @param change indicates direction
     * @private
     */
    _handleRangeSelection(targetRow, change) {
        if (!this._rangeSelection) {
            return;
        }
        const isUp = change > 0;
        this._rangeSelection.isUp ??= isUp;
        const shouldReverseSelection = isUp !== this._rangeSelection.isUp && !this._rangeSelection.isMouse;
        let selectionChanged = shouldReverseSelection && this.isSelected(targetRow);
        if (shouldReverseSelection) {
            this._reverseRangeSelection();
        }
        else {
            const rowIndex = this._table.rows.indexOf(targetRow);
            const [startIndex, endIndex] = [rowIndex, rowIndex - change].sort((a, b) => a - b);
            const selectedSet = this.getSelectedAsSet();
            selectionChanged = this._table?.rows.slice(startIndex, endIndex + 1).reduce((changed, row) => {
                const isRowNotInSelection = !this._rangeSelection?.rows.includes(row);
                const isRowSelectionDifferent = this.isSelected(row) !== this._rangeSelection.selected;
                if (isRowNotInSelection) {
                    this._rangeSelection?.rows.push(row);
                }
                selectedSet[this._rangeSelection.selected ? "add" : "delete"](this.getRowKey(row));
                return changed || isRowSelectionDifferent;
            }, selectionChanged) || false;
            this.setSelectedAsSet(selectedSet);
        }
        selectionChanged && this.fireDecoratorEvent("change");
    }
    _stopRangeSelection() {
        this._rangeSelection = null;
    }
    _reverseRangeSelection() {
        const row = this._rangeSelection?.rows.pop();
        if (row) {
            this.setSelected(row, false);
        }
        if (this._rangeSelection?.rows.length === 1) {
            this._rangeSelection.isUp = null;
        }
    }
};
__decorate([
    property()
], TableSelectionMulti.prototype, "selected", void 0);
TableSelectionMulti = __decorate([
    customElement({ tag: "ui5-table-selection-multi" })
], TableSelectionMulti);
TableSelectionMulti.define();
export default TableSelectionMulti;
//# sourceMappingURL=TableSelectionMulti.js.map