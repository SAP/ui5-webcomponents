var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-menu-item` is an abstract element, representing a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item (`ui5-li`) in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.3.0
 * @public
 */
let MenuItem = class MenuItem extends UI5Element {
    get hasSubmenu() {
        return !!(this.items.length || this.busy);
    }
    get hasDummyIcon() {
        return this._siblingsWithIcon && !this.icon;
    }
    get subMenuOpened() {
        return !!this._subMenu?._popover?.isOpen();
    }
    get _additionalText() {
        return this.hasSubmenu ? "" : this.additionalText;
    }
    get ariaLabelledByText() {
        return `${this.text} ${this.accessibleName}`.trim();
    }
};
__decorate([
    property()
], MenuItem.prototype, "text", void 0);
__decorate([
    property()
], MenuItem.prototype, "additionalText", void 0);
__decorate([
    property()
], MenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "startsSection", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "busy", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1000 })
], MenuItem.prototype, "busyDelay", void 0);
__decorate([
    property()
], MenuItem.prototype, "accessibleName", void 0);
__decorate([
    property({ type: String })
], MenuItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MenuItem.prototype, "_siblingsWithChildren", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MenuItem.prototype, "_siblingsWithIcon", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MenuItem.prototype, "_preventSubMenuClose", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], MenuItem.prototype, "_subMenu", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], MenuItem.prototype, "items", void 0);
MenuItem = __decorate([
    customElement("ui5-menu-item")
], MenuItem);
MenuItem.define();
export default MenuItem;
//# sourceMappingURL=MenuItem.js.map