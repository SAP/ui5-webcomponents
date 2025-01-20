var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TableRowActionBase from "./TableRowActionBase.js";
import { TABLE_NAVIGATION } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
/**
 * @class
 * The `TableRowActionNavigation` class defines a navigation actio‚n for table rows.
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
let TableRowActionNavigation = class TableRowActionNavigation extends TableRowActionBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the interactive state of the navigation action.
         *
         * @default false
         * @public
         */
        this.interactive = false;
    }
    getRenderInfo() {
        return {
            text: this._i18nNavigation,
            icon: "navigation-right-arrow",
            interactive: this.interactive,
        };
    }
    isFixedAction() {
        return true;
    }
    get _i18nNavigation() {
        return TableRowActionBase.i18nBundle.getText(TABLE_NAVIGATION);
    }
};
__decorate([
    property({ type: Boolean })
], TableRowActionNavigation.prototype, "interactive", void 0);
TableRowActionNavigation = __decorate([
    customElement({ tag: "ui5-table-row-action-navigation" })
], TableRowActionNavigation);
TableRowActionNavigation.define();
export default TableRowActionNavigation;
//# sourceMappingURL=TableRowActionNavigation.js.map