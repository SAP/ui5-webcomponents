var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TableCellBase_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableCellBaseStyles from "./generated/themes/TableCellBase.css.js";
/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
let TableCellBase = TableCellBase_1 = class TableCellBase extends UI5Element {
    constructor() {
        super(...arguments);
        this._popin = false;
        this.ariaRole = "gridcell";
    }
    static async onDefine() {
        TableCellBase_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    onEnterDOM() {
        this.toggleAttribute("ui5-table-cell-base", true);
    }
    onBeforeRendering() {
        if (this._popin) {
            this.removeAttribute("role");
        }
        else {
            this.setAttribute("role", this.ariaRole);
        }
    }
    getFocusDomRef() {
        return this;
    }
    isTableCellBase() {
        return true;
    }
};
__decorate([
    slot({ type: Node, "default": true })
], TableCellBase.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], TableCellBase.prototype, "_popin", void 0);
TableCellBase = TableCellBase_1 = __decorate([
    customElement({
        renderer: litRender,
        styles: TableCellBaseStyles,
    })
], TableCellBase);
export default TableCellBase;
//# sourceMappingURL=TableCellBase.js.map