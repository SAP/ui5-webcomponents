var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./generated/templates/TableHeaderCellTemplate.lit.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 * @experimental This web component is available since 2.0 with an experimental flag and its API and behavior are subject to change.
 */
let TableHeaderCell = class TableHeaderCell extends TableCellBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the width of column.
         *
         * @default "auto"
         * @public
         */
        this.width = "auto";
        /**
         * Defines the minimum width of the column.
         *
         * If the table is in `Popin` mode, the column will move into the popin when
         * when the minimum width does not fit anymore.
         *
         * @default "auto"
         * @public
         */
        this.minWidth = "auto";
        /**
         * Defines the maximum width of the column.
         *
         * @default "auto"
         * @public
         */
        this.maxWidth = "auto";
        /**
         * Defines the importance of the column.
         *
         * This property affects the popin behaviour.
         * Columns with higher importance will move into the popin area later then less important
         * columns.
         *
         * @default 0
         * @public
         */
        this.importance = 0;
        this._popin = false;
        this.ariaRole = "columnheader";
        this._popinWidth = 0;
    }
    onEnterDOM() {
        super.onEnterDOM();
        this.style.minWidth = this.minWidth;
        this.style.maxWidth = this.maxWidth;
        this.style.width = this.width;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        // overwrite setting of TableCellBase so that the TableHeaderCell always uses the slot variable
        this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
    }
};
__decorate([
    property()
], TableHeaderCell.prototype, "width", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "minWidth", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "maxWidth", void 0);
__decorate([
    property({ type: Number })
], TableHeaderCell.prototype, "importance", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TableHeaderCell.prototype, "_popin", void 0);
TableHeaderCell = __decorate([
    customElement({
        tag: "ui5-table-header-cell",
        styles: [TableCellBase.styles, TableHeaderCellStyles],
        template: TableHeaderCellTemplate,
    })
], TableHeaderCell);
TableHeaderCell.define();
export default TableHeaderCell;
//# sourceMappingURL=TableHeaderCell.js.map