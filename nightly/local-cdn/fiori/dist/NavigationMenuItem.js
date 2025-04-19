var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";
import NavigationMenu from "./NavigationMenu.js";
// Templates
import NavigationMenuItemTemplate from "./NavigationMenuItemTemplate.js";
// Styles
import navigationMenuItemCss from "./generated/themes/NavigationMenuItem.css.js";
import { NAVIGATION_MENU_POPOVER_HIDDEN_TEXT, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-navigation-menu-item` is the item to use inside a `ui5-navigation-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * ### Usage
 *
 * `ui5-navigation-menu-item` represents a node in a `ui5-navigation-menu`. The navigation menu itself is rendered as a list,
 * and each `ui5-navigation-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-navigation-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @since 1.22.0
 * @private
 */
let NavigationMenuItem = class NavigationMenuItem extends MenuItem {
    constructor() {
        super(...arguments);
        this.design = "Default";
    }
    get isExternalLink() {
        return this.href && this.target === "_blank";
    }
    get _href() {
        return (!this.disabled && this.href) ? this.href : undefined;
    }
    get _accInfo() {
        const accInfo = super._accInfo;
        accInfo.role = this.href ? "none" : "treeitem";
        if (!accInfo.ariaHaspopup) {
            accInfo.ariaHaspopup = this.accessibilityAttributes.hasPopup;
        }
        return accInfo;
    }
    get classes() {
        const result = super.classes;
        result.main["ui5-navigation-menu-item-root"] = true;
        return result;
    }
    get acessibleNameText() {
        return NavigationMenu.i18nBundle.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
    }
};
__decorate([
    property()
], NavigationMenuItem.prototype, "href", void 0);
__decorate([
    property()
], NavigationMenuItem.prototype, "target", void 0);
__decorate([
    property()
], NavigationMenuItem.prototype, "design", void 0);
NavigationMenuItem = __decorate([
    customElement({
        renderer: jsxRenderer,
        tag: "ui5-navigation-menu-item",
        template: NavigationMenuItemTemplate,
        styles: [MenuItem.styles, navigationMenuItemCss],
    })
], NavigationMenuItem);
NavigationMenuItem.define();
export default NavigationMenuItem;
//# sourceMappingURL=NavigationMenuItem.js.map