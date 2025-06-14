var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuItem_1;
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isLeft, isRight, isEnter, isSpace, isTabNext, isTabPrevious, isDown, isUp, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import ListItem from "./ListItem.js";
import MenuItemTemplate from "./MenuItemTemplate.js";
import { MENU_BACK_BUTTON_ARIA_LABEL, MENU_CLOSE_BUTTON_ARIA_LABEL, MENU_POPOVER_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";
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
 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends ListItem
 * @implements {IMenuItem}
 * @since 1.3.0
 * @public
 */
let MenuItem = MenuItem_1 = class MenuItem extends ListItem {
    constructor() {
        super();
        /**
         * Defines whether `ui5-menu-item` is in disabled state.
         *
         * **Note:** A disabled `ui5-menu-item` is noninteractive.
         * @default false
         * @public
         */
        this.disabled = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
         *
         * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
         * @default false
         * @public
         * @since 1.13.0
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
         * @default 1000
         * @public
         * @since 1.13.0
         */
        this.loadingDelay = 1000;
        /**
         * Indicates whether any of the element siblings have icon.
         */
        this._siblingsWithIcon = false;
        this._itemNavigation = new ItemNavigation(this, {
            navigationMode: NavigationMode.Horizontal,
            behavior: ItemNavigationBehavior.Static,
            getItemsCallback: () => this._navigableItems,
        });
    }
    get _navigableItems() {
        return [...this.endContent].filter(item => {
            return item.hasAttribute("ui5-button")
                || item.hasAttribute("ui5-link")
                || (item.hasAttribute("ui5-icon") && item.getAttribute("mode") === "Interactive");
        });
    }
    _navigateToEndContent(shouldNavigateToPreviousItem) {
        const navigatableItems = this._navigableItems;
        const item = shouldNavigateToPreviousItem
            ? navigatableItems[navigatableItems.length - 1]
            : navigatableItems[0];
        if (item) {
            this._itemNavigation.setCurrentItem(item);
            this._itemNavigation._focusCurrentItem();
        }
    }
    get placement() {
        return this.isRtl ? "Start" : "End";
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get hasSubmenu() {
        return !!(this.items.length || this.loading) && !this.disabled;
    }
    get hasEndContent() {
        return !!(this.endContent.length);
    }
    get hasIcon() {
        return !!this.icon;
    }
    get isSubMenuOpen() {
        return this._popover?.open;
    }
    get menuHeaderTextPhone() {
        return this.text;
    }
    get isPhone() {
        return isPhone();
    }
    get labelBack() {
        return MenuItem_1.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
    }
    get labelClose() {
        return MenuItem_1.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
    }
    get acessibleNameText() {
        return MenuItem_1.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
    }
    get isSeparator() {
        return false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);
        this._menuItems.forEach(item => {
            item._siblingsWithIcon = siblingsWithIcon;
        });
    }
    async focus(focusOptions) {
        await renderFinished();
        if (this.hasSubmenu && this.isSubMenuOpen) {
            return this._menuItems[0].focus(focusOptions);
        }
        return super.focus(focusOptions);
    }
    get _focusable() {
        return true;
    }
    get _accInfo() {
        const accInfoSettings = {
            role: this.accessibilityAttributes.role || "menuitem",
            ariaHaspopup: this.hasSubmenu ? "menu" : undefined,
            ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
            ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
    get _popover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get _menuItems() {
        return this.items.filter((item) => !item.isSeparator);
    }
    _closeOtherSubMenus(item) {
        const menuItems = this._menuItems;
        if (!menuItems.includes(item)) {
            return;
        }
        menuItems.forEach(menuItem => {
            if (menuItem !== item) {
                menuItem._close();
            }
        });
    }
    _itemMouseOver(e) {
        if (!isDesktop()) {
            return;
        }
        const item = e.target;
        if (!isInstanceOfMenuItem(item)) {
            return;
        }
        item.focus();
        this._closeOtherSubMenus(item);
    }
    _itemKeyDown(e) {
        const item = e.target;
        const itemInMenuItems = this._menuItems.includes(item);
        const isTabNextPrevious = isTabNext(e) || isTabPrevious(e);
        const isItemNavigation = isUp(e) || isDown(e);
        const isItemSelection = isSpace(e) || isEnter(e);
        const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
        const shouldCloseMenu = !(isItemNavigation || isItemSelection || shouldOpenMenu) || isTabNextPrevious;
        if (itemInMenuItems && shouldCloseMenu) {
            this._close();
            this.focus();
            e.stopPropagation();
        }
    }
    _endContentKeyDown(e) {
        const shouldNavigateOutOfEndContent = isUp(e) || isDown(e);
        if (shouldNavigateOutOfEndContent) {
            this.fireDecoratorEvent("exit-end-content", { shouldNavigateToNextItem: isDown(e) });
        }
    }
    _navigateOutOfEndContent(e) {
        const item = e.target;
        const shouldNavigateToNextItem = e.detail.shouldNavigateToNextItem;
        const menuItems = this._menuItems;
        const itemIndex = menuItems.indexOf(item);
        if (itemIndex > -1) {
            const nextItem = shouldNavigateToNextItem ? menuItems[itemIndex + 1] : menuItems[itemIndex - 1];
            const itemToFocus = nextItem || menuItems[itemIndex];
            itemToFocus?.focus();
            e.stopPropagation();
        }
    }
    _closeAll() {
        if (this._popover) {
            this._popover.open = false;
        }
        this.selected = false;
        this.fireDecoratorEvent("close-menu");
    }
    _close() {
        if (this._popover) {
            this._popover.open = false;
            this._menuItems.forEach(item => item._close());
        }
        this.selected = false;
    }
    _beforePopoverOpen(e) {
        const prevented = !this.fireDecoratorEvent("before-open", {});
        if (prevented) {
            e.preventDefault();
        }
    }
    _afterPopoverOpen() {
        this.items[0]?.focus();
        this.fireDecoratorEvent("open");
    }
    _beforePopoverClose(e) {
        const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });
        if (prevented) {
            e.preventDefault();
            return;
        }
        this.selected = false;
        if (e.detail.escPressed) {
            this.focus();
            if (isPhone()) {
                this.fireDecoratorEvent("close-menu");
            }
        }
    }
    _afterPopoverClose() {
        this.fireDecoratorEvent("close");
    }
    get isMenuItem() {
        return true;
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
], MenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MenuItem.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], MenuItem.prototype, "loadingDelay", void 0);
__decorate([
    property()
], MenuItem.prototype, "accessibleName", void 0);
__decorate([
    property()
], MenuItem.prototype, "tooltip", void 0);
__decorate([
    property({ type: Object })
], MenuItem.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MenuItem.prototype, "_siblingsWithIcon", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], MenuItem.prototype, "items", void 0);
__decorate([
    slot({ type: HTMLElement })
], MenuItem.prototype, "endContent", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], MenuItem, "i18nBundle", void 0);
MenuItem = MenuItem_1 = __decorate([
    customElement({
        tag: "ui5-menu-item",
        renderer: jsxRenderer,
        template: MenuItemTemplate,
        styles: [ListItem.styles, menuItemCss],
    })
    /**
     * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
     *
     * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
     * @public
     * @since 1.10.0
     * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
     */
    ,
    event("before-open", {
        cancelable: true,
    })
    /**
     * Fired after the menu is opened.
     * @public
     */
    ,
    event("open")
    /**
     * Fired when the menu is being closed.
     * @private
     */
    ,
    event("close-menu", {
        bubbles: true,
    })
    /**
     * Fired when navigating out of end-content.
     * @private
     */
    ,
    event("exit-end-content", {
        bubbles: true,
    })
    /**
     * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing.
     * @public
     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
     * @since 1.10.0
     */
    ,
    event("before-close", {
        cancelable: true,
    })
    /**
     * Fired after the menu is closed.
     * @public
     * @since 1.10.0
     */
    ,
    event("close")
], MenuItem);
MenuItem.define();
const isInstanceOfMenuItem = (object) => {
    return "isMenuItem" in object;
};
export default MenuItem;
export { isInstanceOfMenuItem, };
//# sourceMappingURL=MenuItem.js.map