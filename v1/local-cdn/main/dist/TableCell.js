var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableCell_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import TableCellTemplate from "./generated/templates/TableCellTemplate.lit.js";
// Styles
import tableCellStyles from "./generated/themes/TableCell.css.js";
// Texts
import { ARIA_LABEL_EMPTY_CELL, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` component defines the structure of the data in a single `ui5-table` cell.
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart cell - Used to style the native `td` element
 */
let TableCell = TableCell_1 = class TableCell extends UI5Element {
    static async onDefine() {
        TableCell_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get cellContent() {
        return this.getSlottedNodes("content");
    }
    get ariaLabelEmptyCellText() {
        return TableCell_1.i18nBundle.getText(ARIA_LABEL_EMPTY_CELL);
    }
};
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "lastInRow", void 0);
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "popined", void 0);
__decorate([
    property({ type: Boolean })
], TableCell.prototype, "_popinedInline", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], TableCell.prototype, "content", void 0);
TableCell = TableCell_1 = __decorate([
    customElement({
        tag: "ui5-table-cell",
        renderer: litRender,
        template: TableCellTemplate,
        styles: tableCellStyles,
    })
], TableCell);
TableCell.define();
export default TableCell;
//# sourceMappingURL=TableCell.js.map