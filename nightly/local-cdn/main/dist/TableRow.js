var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableRow_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isF7, isTabNext, isTabPrevious, } from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import { getLastTabbableElement } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import CheckBox from "./CheckBox.js";
import TableMode from "./types/TableMode.js";
import TableRowType from "./types/TableRowType.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
import TableRowTemplate from "./generated/templates/TableRowTemplate.lit.js";
import { ARIA_LABEL_ROW_SELECTION, LIST_ITEM_NOT_SELECTED, LIST_ITEM_SELECTED, } from "./generated/i18n/i18n-defaults.js";
// Styles
import tableRowStyles from "./generated/themes/TableRow.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-row` component represents a row in the `ui5-table`.
 * @constructor
 * @extends UI5Element
 * @implements {ITableRow}
 * @public
 * @csspart row - Used to style the native `tr` element
 * @csspart popin-row - Used to style the `tr` element when a row pops in
 */
let TableRow = TableRow_1 = class TableRow extends UI5Element {
    constructor() {
        super();
        this.visibleCells = [];
        this.popinCells = [];
        // Properties, set and handled by the Table
        this.tabbableElements = [];
        this._columnsInfoString = "";
        const handleToushStartEvent = () => {
            this.activate();
        };
        this._ontouchstart = {
            handleEvent: handleToushStartEvent,
            passive: true,
        };
    }
    _onmouseup() {
        this.deactivate();
    }
    _onkeydown(e) {
        const activeElement = getActiveElement();
        const itemActive = this.type === TableRowType.Active;
        const isSingleSelect = this.isSingleSelect;
        const itemSelectable = isSingleSelect || this.isMultiSelect;
        const isRowFocused = this._activeElementHasAttribute("ui5-table-row");
        const target = e.target;
        const checkboxPressed = target.classList.contains("ui5-multi-select-checkbox");
        const rowElements = Array.from(this.shadowRoot.querySelectorAll("tr") || []);
        const elements = rowElements.map(getLastTabbableElement);
        const lastFocusableElement = elements.pop();
        if (isTabNext(e) && activeElement === (lastFocusableElement || this.root)) {
            this.fireEvent("_forward-after", { target: activeElement });
        }
        if (isTabPrevious(e) && activeElement === this.root) {
            this.fireEvent("_forward-before", { target: activeElement });
        }
        if (isSpace(e) && target.tagName.toLowerCase() === "tr") {
            e.preventDefault();
        }
        if (isRowFocused && !checkboxPressed) {
            if ((isSpace(e) && itemSelectable) || (isEnter(e) && isSingleSelect)) {
                this.fireEvent("selection-requested", { row: this });
            }
            if (isEnter(e) && itemActive) {
                this.fireEvent("row-click", { row: this });
                if (!isSingleSelect) {
                    this.activate();
                }
            }
        }
        if (isF7(e)) {
            e.preventDefault();
            this.fireEvent("f7-pressed", { row: this });
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
            this.deactivate();
        }
    }
    _ontouchend() {
        this.deactivate();
    }
    _onfocusout() {
        this.deactivate();
    }
    _onfocusin(e, forceSelfFocus = false) {
        if (forceSelfFocus || this._activeElementHasAttribute("ui5-table-cell")) {
            this.root.focus();
            this.activate();
        }
        this.fireEvent("_focused");
    }
    _onrowclick(e) {
        const checkboxPressed = e.target.classList.contains("ui5-multi-select-checkbox");
        // If the user tab over a button on IOS device, the document.activeElement
        // is the ui5-table-row. The check below ensure that, if a button within the row is pressed,
        // the row will not be selected.
        if (getEventMark(e) === "button") {
            return;
        }
        const activeElement = this.getRootNode().activeElement;
        if (!this.contains(activeElement)) {
            // If the user clickes on non-focusable element within the ui5-table-cell,
            // the focus goes to the body, se we have to bring it back to the row.
            // If the user clicks on input, button or similar clickable element,
            // the focus remains on that element.
            this._onfocusin(e, true /* force row focus */);
            this.deactivate();
        }
        if (this._activeElementHasAttribute("ui5-table-row")) {
            if (this.isSingleSelect) {
                this._handleSelection();
            }
            if (this.type === TableRowType.Active && !checkboxPressed) {
                this.fireEvent("row-click", { row: this });
            }
        }
    }
    _handleSelection() {
        this.fireEvent("selection-requested", { row: this });
    }
    _activeElementHasAttribute(attr) {
        return !!(this.getRootNode().activeElement?.hasAttribute(attr));
    }
    get _ariaCurrent() {
        return this.navigated ? true : undefined;
    }
    activate() {
        if (this.type === TableRowType.Active) {
            this.active = true;
        }
    }
    deactivate() {
        if (this.active) {
            this.active = false;
        }
    }
    get shouldPopin() {
        return this._columnsInfo.filter(el => {
            return el.demandPopin || !el.visible;
        }).length;
    }
    get allColumnsPoppedIn() {
        return this._columnsInfo.every(el => el.demandPopin && !el.visible);
    }
    onBeforeRendering() {
        if (!this.shouldPopin) {
            return;
        }
        this.visibleCells = [];
        this.popinCells = [];
        if (this.cells.length === 0) {
            return;
        }
        const allColumnsPoppedInClass = this.allColumnsPoppedIn ? "all-columns-popped-in" : "";
        this._columnsInfo.forEach((info, index) => {
            const cell = this.cells[index];
            const popinDisplay = info.popinDisplay === TableColumnPopinDisplay.Inline;
            if (!cell) {
                return;
            }
            if (info.visible) {
                this.visibleCells.push(cell);
                cell.popined = false;
                cell._popinedInline = false;
            }
            else if (info.demandPopin) {
                const popinHeaderClass = this.popinCells.length === 0 ? "popin-header" : "";
                this.popinCells.push({
                    cell,
                    popinText: info.popinText,
                    classes: `ui5-table-popin-row ${allColumnsPoppedInClass} ${popinHeaderClass}`,
                    popinDisplayInline: popinDisplay,
                });
                cell.popined = true;
                if (info.popinDisplay === TableColumnPopinDisplay.Inline) {
                    cell._popinedInline = true;
                }
            }
            else {
                cell.popined = false;
                cell._popinedInline = false;
            }
        });
        const lastVisibleCell = this.visibleCells[this.visibleCells.length - 1];
        if (lastVisibleCell) {
            lastVisibleCell.lastInRow = true;
        }
    }
    get visibleCellsCount() {
        let visibleCellsCount = this.visibleCells.length;
        if (this.isMultiSelect) {
            visibleCellsCount += 1;
        }
        return visibleCellsCount;
    }
    get ariaLabelText() {
        const isSelected = this.selected ? TableRow_1.i18nBundle.getText(LIST_ITEM_SELECTED) : TableRow_1.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
        const isRowSelectable = this.isSingleSelect || this.isMultiSelect;
        const ariaLabel = this.cells.map((cell, index) => {
            const columText = this.getColumnTextByIdx(index);
            const cellText = cell.cellContent.length ? this.getCellText(cell) : cell.ariaLabelEmptyCellText;
            return `${columText} ${cellText}`;
        }).join(" ");
        if (isRowSelectable) {
            return `${ariaLabel}. ${this.forcedAriaPosition}. ${isSelected}`;
        }
        return `${ariaLabel}. ${this.forcedAriaPosition}`;
    }
    get ariaLabelRowSelection() {
        return TableRow_1.i18nBundle.getText(ARIA_LABEL_ROW_SELECTION);
    }
    get isSingleSelect() {
        return this.mode === TableMode.SingleSelect;
    }
    get isMultiSelect() {
        return this.mode === TableMode.MultiSelect;
    }
    get root() {
        return this.shadowRoot.querySelector(".ui5-table-row-root");
    }
    getCellText(cell) {
        const cellTextContent = cell.textContent;
        return cellTextContent ? this.getNormilzedTextContent(cellTextContent) : "";
    }
    getColumnTextByIdx(index) {
        const columnInfo = this._columnsInfo[index];
        if (!columnInfo) {
            return "";
        }
        return columnInfo.text ? this.getNormilzedTextContent(columnInfo.text) : "";
    }
    getNormilzedTextContent(textContent) {
        return textContent.replace(/[\n\r\t]/g, "").trim();
    }
    static async onDefine() {
        TableRow_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: TableRowType, defaultValue: TableRowType.Inactive })
], TableRow.prototype, "type", void 0);
__decorate([
    property({ type: Boolean })
], TableRow.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean })
], TableRow.prototype, "navigated", void 0);
__decorate([
    property({ type: TableMode, defaultValue: TableMode.None })
], TableRow.prototype, "mode", void 0);
__decorate([
    property({ type: Boolean })
], TableRow.prototype, "active", void 0);
__decorate([
    property({ type: Object, multiple: true })
], TableRow.prototype, "_columnsInfo", void 0);
__decorate([
    property({ defaultValue: "-1" })
], TableRow.prototype, "forcedTabIndex", void 0);
__decorate([
    property({ type: Boolean })
], TableRow.prototype, "forcedBusy", void 0);
__decorate([
    property({ defaultValue: "", noAttribute: true })
], TableRow.prototype, "forcedAriaPosition", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true, individualSlots: true })
], TableRow.prototype, "cells", void 0);
TableRow = TableRow_1 = __decorate([
    customElement({
        tag: "ui5-table-row",
        styles: tableRowStyles,
        renderer: litRender,
        template: TableRowTemplate,
        dependencies: [CheckBox],
    })
    /**
     * Fired when a row in `Active` mode is clicked or `Enter` key is pressed.
     * @since 1.0.0-rc.15
     * @private
     */
    ,
    event("row-click"),
    event("_focused")
    /**
     * Fired on selection change of an active row.
     * @since 1.0.0-rc.15
     * @private
     */
    ,
    event("selection-requested")
    /**
     * Fired when F7 is pressed.
     * @since 1.2.0
     * @private
     */
    ,
    event("f7-pressed")
], TableRow);
TableRow.define();
export default TableRow;
//# sourceMappingURL=TableRow.js.map