var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isUpShift, isShift, } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import TableSelectionMode from "./types/TableSelectionMode.js";
import { isSelectionCheckbox, isHeaderSelector, findRowInPath } from "./TableUtils.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-selection` component is used inside the `ui5-table` ti add key-based selection capabilities to the `ui5-table`.
 *
 * The component offers three selection modes:
 * * Single - select a single row.
 * * Multiple - select multiple rows.
 * * None - no selection active.
 *
 * As the selection is key-based, `ui5-table-row` components need to define a unique `key` property.
 *
 * ### Usage
 *
 * The `ui5-table-selection` component is only used inside the `ui5-table` component as a feature.
 * It has to be slotted inside the `ui5-table` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-selection mode="Multiple" slot="features"></ui5-table-selection>
 * </ui5-table>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableSelection.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableSelection = class TableSelection extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines the selection mode.
         *
         * @default "Multiple"
         * @public
         */
        this.mode = "Multiple";
        /**
         * Defines the selected rows separated by a space.
         *
         * @default ""
         * @public
         */
        this.selected = "";
    }
    onTableActivate(table) {
        this._table = table;
        this._invalidateTableAndRows();
    }
    onExitDOM() {
        this.mode = TableSelectionMode.None;
        this._invalidateTableAndRows();
        this._table = undefined;
    }
    onBeforeRendering() {
        this._invalidateTableAndRows();
    }
    isSelectable() {
        return this.mode !== TableSelectionMode.None;
    }
    isMultiSelect() {
        return this.mode === TableSelectionMode.Multiple;
    }
    hasRowSelector() {
        return this.mode !== TableSelectionMode.None;
    }
    getRowIdentifier(row) {
        return row.key;
    }
    isSelected(row) {
        if (!this._table || !this.isSelectable()) {
            return false;
        }
        if (row.isHeaderRow()) {
            return this.areAllRowsSelected();
        }
        const rowIdentifier = this.getRowIdentifier(row);
        return this.selectedAsArray.includes(rowIdentifier);
    }
    hasSelectedRow() {
        if (!this._table || !this.isSelectable()) {
            return false;
        }
        const selectedArray = this.selectedAsArray;
        return this._table.rows.some(row => {
            const rowIdentifier = this.getRowIdentifier(row);
            return selectedArray.includes(rowIdentifier);
        });
    }
    areAllRowsSelected() {
        if (!this._table || !this._table.rows.length || this.mode !== TableSelectionMode.Multiple) {
            return false;
        }
        const selectedArray = this.selectedAsArray;
        return this._table.rows.every(row => {
            const rowIdentifier = this.getRowIdentifier(row);
            return selectedArray.includes(rowIdentifier);
        });
    }
    informSelectionChange(row) {
        if (this._rangeSelection?.isMouse && this._rangeSelection.shiftPressed) {
            return;
        }
        if (row.isHeaderRow()) {
            this._informHeaderRowSelectionChange();
        }
        else {
            this._informRowSelectionChange(row);
        }
    }
    get selectedAsArray() {
        return this.selected.split(" ").filter(String);
    }
    set selectedAsArray(selectedArray) {
        this.selected = selectedArray.filter(String).join(" ");
    }
    get selectedAsSet() {
        return new Set(this.selectedAsArray);
    }
    set selectedAsSet(selectedSet) {
        this.selectedAsArray = [...selectedSet];
    }
    _selectRow(row, selected) {
        const rowIdentifier = this.getRowIdentifier(row);
        if (this.mode === TableSelectionMode.Multiple) {
            const selectedSet = this.selectedAsSet;
            selectedSet[selected ? "add" : "delete"](rowIdentifier);
            this.selectedAsSet = selectedSet;
        }
        else {
            this.selected = selected ? rowIdentifier : "";
        }
    }
    _informRowSelectionChange(row) {
        const isRowSelected = this.isMultiSelect() ? !this.isSelected(row) : true;
        this._selectRow(row, isRowSelected);
        this.fireEvent("change");
    }
    _informHeaderRowSelectionChange() {
        const isRowSelected = this.areAllRowsSelected();
        const selectedSet = this.selectedAsSet;
        this._table.rows.forEach(row => {
            const rowIdentifier = this.getRowIdentifier(row);
            selectedSet[isRowSelected ? "delete" : "add"](rowIdentifier);
        });
        this.selectedAsSet = selectedSet;
        this.fireEvent("change");
    }
    _invalidateTableAndRows() {
        if (!this._table) {
            return;
        }
        if (!this.isSelectable()) {
            this.selected = "";
        }
        else if (!this.isMultiSelect()) {
            this.selected = this.selectedAsArray.shift() || "";
        }
        this._table._invalidate++;
        this._table.headerRow[0]._invalidate++;
        this._table.rows.forEach(row => row._invalidate++);
    }
    _onkeydown(e) {
        if (!this.isMultiSelect() || !this._table || !e.shiftKey) {
            return;
        }
        const focusedElement = getActiveElement(); // Assumption: The focused element is always the "next" row after navigation.
        if (!(focusedElement?.hasAttribute("ui5-table-row") || this._rangeSelection?.isMouse || focusedElement?.hasAttribute("ui5-growing-row"))) {
            this._stopRangeSelection();
            return;
        }
        if (!this._rangeSelection) {
            // If no range selection is active, start one
            this._startRangeSelection(focusedElement);
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
        if (!eventOrigin.hasAttribute("ui5-table-row") || !this._rangeSelection || isShift(e) || !isSelectionCheckbox(e)) {
            // Stop range selection if a) Shift is relased or b) the event target is not a row or c) the event is not from the selection checkbox
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
            if (startIndex === -1 || endIndex === -1 || row.key === startRow.key || row.key === this._rangeSelection.rows[this._rangeSelection.rows.length - 1].key) {
                return;
            }
            const change = endIndex - startIndex;
            this._handleRangeSelection(row, change);
        }
        else if (row) {
            this._startRangeSelection(row, true);
        }
    }
    /**
     * Start the range selection and initialises the range selection state
     * @param row starting row
     * @private
     */
    _startRangeSelection(row, isMouse = false) {
        const selected = this.isSelected(row);
        if (isMouse && !selected) {
            // Do not initiate range selection if the row is not selected
            return;
        }
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
     * @param targetRow row that is currently focused
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
            selectionChanged = this._table?.rows.slice(startIndex, endIndex + 1).reduce((changed, row) => {
                const isRowNotInSelection = !this._rangeSelection?.rows.includes(row);
                const isRowSelectionDifferent = this.isSelected(row) !== this._rangeSelection.selected;
                if (isRowNotInSelection) {
                    this._rangeSelection?.rows.push(row);
                }
                this._selectRow(row, this._rangeSelection.selected);
                return changed || isRowSelectionDifferent;
            }, selectionChanged) || false;
        }
        selectionChanged && this._fireEvent("change");
    }
    _stopRangeSelection() {
        this._rangeSelection = null;
    }
    _reverseRangeSelection() {
        const row = this._rangeSelection?.rows.pop();
        if (row) {
            this._selectRow(row, false);
        }
        if (this._rangeSelection?.rows.length === 1) {
            this._rangeSelection.isUp = null;
        }
    }
};
__decorate([
    property()
], TableSelection.prototype, "mode", void 0);
__decorate([
    property()
], TableSelection.prototype, "selected", void 0);
TableSelection = __decorate([
    customElement({ tag: "ui5-table-selection" })
    /**
     * Fired when selection is changed by user interaction.
     *
     * @public
     */
    ,
    event("change")
], TableSelection);
TableSelection.define();
export default TableSelection;
//# sourceMappingURL=TableSelection.js.map