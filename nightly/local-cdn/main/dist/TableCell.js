var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TableCellTemplate from "./generated/templates/TableCellTemplate.lit.js";
import TableCellStyles from "./generated/themes/TableCell.css.js";
import TableCellBase from "./TableCellBase.js";
import { LABEL_COLON } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` represents a cell inside of a `ui5-table`.
 * It is tightly coupled to the `ui5-table` and thus should only be used in the table component.
 *
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/TableCell.js;`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableCell = class TableCell extends TableCellBase {
    onBeforeRendering() {
        super.onBeforeRendering();
        if (this.horizontalAlign) {
            this.style.justifyContent = this.horizontalAlign;
        }
        else {
            this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
        }
    }
    get _popinHeader() {
        const row = this.parentElement;
        const table = row.parentElement;
        const index = row.cells.indexOf(this);
        const headerCell = table.headerRow[0].cells[index];
        return headerCell.content[0]?.cloneNode(true);
    }
    get _i18nPopinColon() {
        return TableCellBase.i18nBundle.getText(LABEL_COLON);
    }
};
TableCell = __decorate([
    customElement({
        tag: "ui5-table-cell",
        styles: [TableCellBase.styles, TableCellStyles],
        template: TableCellTemplate,
    })
], TableCell);
TableCell.define();
export default TableCell;
//# sourceMappingURL=TableCell.js.map