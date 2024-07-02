var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import TableColumnTemplate from "./generated/templates/TableColumnTemplate.lit.js";
import TableColumnPopinDisplay from "./types/TableColumnPopinDisplay.js";
// Styles
import tableColumnStyles from "./generated/themes/TableColumn.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-column` component allows to define column specific properties that are applied
 * when rendering the `ui5-table` component.
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Node[]} default - Defines the content of the column header
 * @csspart column - Used to style the native `th` element
 */
let TableColumn = class TableColumn extends UI5Element {
};
__decorate([
    property({ validator: Integer, defaultValue: Infinity })
], TableColumn.prototype, "minWidth", void 0);
__decorate([
    property()
], TableColumn.prototype, "popinText", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "demandPopin", void 0);
__decorate([
    property({ type: TableColumnPopinDisplay, defaultValue: TableColumnPopinDisplay.Block })
], TableColumn.prototype, "popinDisplay", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "first", void 0);
__decorate([
    property({ type: Boolean })
], TableColumn.prototype, "last", void 0);
TableColumn = __decorate([
    customElement({
        tag: "ui5-table-column",
        styles: tableColumnStyles,
        renderer: litRender,
        template: TableColumnTemplate,
    })
], TableColumn);
TableColumn.define();
export default TableColumn;
//# sourceMappingURL=TableColumn.js.map