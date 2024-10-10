var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowBase from "./TableRowBase.js";
import TableHeaderRowTemplate from "./generated/templates/TableHeaderRowTemplate.lit.js";
import TableHeaderRowStyles from "./generated/themes/TableHeaderRow.css.js";
import TableHeaderCell from "./TableHeaderCell.js";
import { TABLE_SELECTION, TABLE_ROW_POPIN, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-row` component represents the table headers of a `ui5-table`.
 *
 * It is tightly coupled to the `ui5-table` and should therefore be used in the `ui5-table` only.
 * The header row is placed in the `headerRow` slot of the table.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderRow.js";`
 *
 * @constructor
 * @extends TableRowBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableHeaderRow = 
/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @public
 */
class TableHeaderRow extends TableRowBase {
    constructor() {
        super(...arguments);
        /**
         * Sticks the `ui5-table-header-row` to the top of a table.
         *
         * Note: If used in combination with overflowMode "Scroll", the table needs a defined height for the sticky header to work as expected.
         *
         * @default false
         * @public
         */
        this.sticky = false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        if (this._table) {
            this.style.top = this._table.stickyTop;
        }
    }
    isHeaderRow() {
        return true;
    }
    get _isSelectable() {
        return this._isMultiSelect;
    }
    get _isSelected() {
        return this._tableSelection?.areAllRowsSelected();
    }
    get _i18nSelection() {
        return TableRowBase.i18nBundle.getText(TABLE_SELECTION);
    }
    get _i18nRowPopin() {
        return TableRowBase.i18nBundle.getText(TABLE_ROW_POPIN);
    }
};
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
        invalidateOnChildChange: {
            properties: ["width", "_popin", "horizontalAlign"],
            slots: false,
        },
        individualSlots: true,
    })
], TableHeaderRow.prototype, "cells", void 0);
__decorate([
    property({ type: Boolean })
], TableHeaderRow.prototype, "sticky", void 0);
TableHeaderRow = __decorate([
    customElement({
        tag: "ui5-table-header-row",
        languageAware: true,
        styles: [TableRowBase.styles, TableHeaderRowStyles],
        template: TableHeaderRowTemplate,
        dependencies: [...TableRowBase.dependencies, TableHeaderCell],
    })
    /**
     * Example custom event.
     * Please keep in mind that all public events should be documented in the API Reference as shown below.
     *
     * @public
     */
], TableHeaderRow);
TableHeaderRow.define();
export default TableHeaderRow;
//# sourceMappingURL=TableHeaderRow.js.map