var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import StandardListItem from "./StandardListItem.js";
import StandardListItemTemplate from "./generated/templates/StandardListItemTemplate.lit.js";
import "./MenuItem.js";
import HasPopup from "./types/HasPopup.js";
// Styles
import menuListItemCss from "./generated/themes/MenuListItem.css.js";
/**
 * @class
 * @constructor
 * @extends StandardListItem
 * @since 1.23.0
 * @private
 */
let MenuListItem = class MenuListItem extends StandardListItem {
    get _focusable() {
        return true;
    }
    get _accInfo() {
        const accInfoSettings = {
            role: "menuitem",
            ariaHaspopup: this.associatedItem?.hasSubmenu ? HasPopup.Menu.toLowerCase() : undefined,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
};
__decorate([
    property({ type: Object })
], MenuListItem.prototype, "associatedItem", void 0);
MenuListItem = __decorate([
    customElement({
        tag: "ui5-menu-li",
        template: StandardListItemTemplate,
        styles: [StandardListItem.styles, menuListItemCss],
    })
], MenuListItem);
MenuListItem.define();
export default MenuListItem;
//# sourceMappingURL=MenuListItem.js.map