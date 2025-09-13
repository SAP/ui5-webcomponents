var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import { toggleAttribute } from "./TableUtils.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./TableHeaderCellTemplate.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
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
 */
let TableHeaderCell = class TableHeaderCell extends TableCellBase {
    constructor() {
        super(...arguments);
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
        /**
         * Defines the sort indicator of the column.
         *
         * @default "None"
         * @since 2.8.0
         * @public
         */
        this.sortIndicator = "None";
        /**
         * Defines if the column is hidden in the popin.
         *
         * **Note:** Please be aware that hiding the column in the popin might lead to accessibility issues as
         * users might not be able to access the content of the column on small screens.
         *
         * @default false
         * @since 2.8.0
         * @public
         */
        this.popinHidden = false;
        this._popin = false;
        this.ariaRole = "columnheader";
        this._popinWidth = 0;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        if (this._individualSlot) {
            // overwrite setting of TableCellBase so that the TableHeaderCell always uses the slot variable
            this.style.justifyContent = `var(--horizontal-align-${this._individualSlot})`;
        }
        toggleAttribute(this, "aria-sort", this.sortIndicator !== SortOrder.None, this.sortIndicator.toLowerCase());
    }
};
__decorate([
    property()
], TableHeaderCell.prototype, "width", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number })
], TableHeaderCell.prototype, "importance", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "popinText", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "sortIndicator", void 0);
__decorate([
    property({ type: Boolean })
], TableHeaderCell.prototype, "popinHidden", void 0);
__decorate([
    slot()
], TableHeaderCell.prototype, "action", void 0);
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