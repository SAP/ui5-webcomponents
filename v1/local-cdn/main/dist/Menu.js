var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Menu_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import { isLeft, isRight, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone, isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import MenuListItem from "./MenuListItem.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import staticAreaMenuTemplate from "./generated/templates/MenuTemplate.lit.js";
import { MENU_BACK_BUTTON_ARIA_LABEL, MENU_CLOSE_BUTTON_ARIA_LABEL, } from "./generated/i18n/i18n-defaults.js";
// Styles
import staticAreaMenuCss from "./generated/themes/Menu.css.js";
const MENU_OPEN_DELAY = 300;
const MENU_CLOSE_DELAY = 400;
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Usage
 *
 * `ui5-menu` contains `ui5-menu-item` components.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-menu` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - `Arrow Up` / `Arrow Down` - Navigates up and down the menu items that are currently visible.
 * - `Arrow Right`, `Space` or `Enter` - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.
 * - `Arrow Left` or `Escape` - Closes the currently opened sub-menu.
 *
 * Note: if the text ditrection is set to Right-to-left (RTL), `Arrow Right` and `Arrow Left` functionality is swapped.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Menu.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.3.0
 * @public
 */
let Menu = Menu_1 = class Menu extends UI5Element {
    static async onDefine() {
        Menu_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get itemsWithChildren() {
        return !!this._currentItems.filter(item => item.item.items.length).length;
    }
    get itemsWithIcon() {
        return !!this._currentItems.filter(item => item.item.icon !== "").length;
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get placementType() {
        const placement = this.isRtl ? "Left" : "Right";
        return this._isSubMenu ? placement : "Bottom";
    }
    get verticalAlign() {
        return this._isSubMenu ? "Top" : "Bottom";
    }
    get labelBack() {
        return Menu_1.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
    }
    get labelClose() {
        return Menu_1.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
    }
    get isPhone() {
        return isPhone();
    }
    get isSubMenuOpened() {
        return this._parentMenuItem && this._popover?.isOpen();
    }
    get menuHeaderTextPhone() {
        return this._parentMenuItem ? this._parentMenuItem.text : this.headerText;
    }
    onBeforeRendering() {
        this._prepareCurrentItems(this.items);
        const itemsWithChildren = this.itemsWithChildren;
        const itemsWithIcon = this.itemsWithIcon;
        this._currentItems.forEach(item => {
            item.item._siblingsWithChildren = itemsWithChildren;
            item.item._siblingsWithIcon = itemsWithIcon;
            const subMenu = item.item._subMenu;
            const menuItem = item.item;
            if (subMenu && subMenu.busy) {
                subMenu.innerHTML = "";
                const fragment = this._clonedItemsFragment(menuItem);
                subMenu.appendChild(fragment);
            }
            if (subMenu) {
                subMenu.busy = item.item.busy;
                subMenu.busyDelay = item.item.busyDelay;
            }
        });
    }
    onAfterRendering() {
        if (!this.opener) {
            return;
        }
        if (this.open) {
            const opener = this.getOpener();
            if (opener && !this.isSubMenuOpened) {
                this.showAt(opener);
            }
        }
        else {
            this.close();
        }
    }
    /**
     * Shows the Menu near the opener element.
     * @param opener the element that the popover is shown at
     * @public
     */
    async showAt(opener) {
        if (!this._isSubMenu) {
            this._parentMenuItem = undefined;
            this._opener = undefined;
        }
        const busyWithoutItems = !this._parentMenuItem?.items.length && this._parentMenuItem?.busy;
        const popover = await this._createPopover();
        popover.initialFocus = `${this._id}-menu-item-0`;
        popover.showAt(opener, busyWithoutItems);
    }
    /**
     * Closes the Menu.
     * @public
     */
    close() {
        this._popover?.close(false, false, true);
    }
    async _createPopover() {
        if (!this._popover) {
            const staticAreaItemDomRef = await this.getStaticAreaItemDomRef();
            this._popover = staticAreaItemDomRef.querySelector("[ui5-responsive-popover]");
        }
        return this._popover;
    }
    getOpener() {
        const rootNode = this.getRootNode();
        return this.opener instanceof HTMLElement ? this.opener : rootNode?.getElementById?.(this.opener);
    }
    _navigateBack() {
        this._closeItemSubMenu(this._parentMenuItem, true);
    }
    _closeAll() {
        const mainMenu = this._findMainMenu(this);
        mainMenu?.close();
    }
    _prepareCurrentItems(items) {
        this._currentItems = items.map((item, index) => {
            return {
                item,
                position: index + 1,
                ariaHasPopup: item.hasSubmenu ? "menu" : undefined,
            };
        });
    }
    _createSubMenu(item, opener) {
        if (item._subMenu) {
            return;
        }
        const ctor = this.constructor;
        const subMenu = document.createElement(ctor.getMetadata().getTag());
        subMenu._isSubMenu = true;
        subMenu.setAttribute("id", `submenu-${opener.id}`);
        subMenu._parentMenuItem = item;
        subMenu._opener = opener;
        subMenu.busy = item.busy;
        subMenu.busyDelay = item.busyDelay;
        const fragment = this._clonedItemsFragment(item);
        subMenu.appendChild(fragment);
        this.staticAreaItem.shadowRoot.querySelector(".ui5-menu-submenus").appendChild(subMenu);
        item._subMenu = subMenu;
    }
    _clonedItemsFragment(item) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < item.items.length; ++i) {
            const clonedItem = item.items[i].cloneNode(true);
            fragment.appendChild(clonedItem);
        }
        return fragment;
    }
    _openItemSubMenu(item, opener) {
        const mainMenu = this._findMainMenu(item);
        mainMenu?.fireEvent("before-open", {
            item,
        }, false, false);
        item._subMenu.showAt(opener);
        item._preventSubMenuClose = true;
        this._openedSubMenuItem = item;
        this._subMenuOpenerId = opener.id;
    }
    _closeItemSubMenu(item, forceClose = false, keyboard = false) {
        if (item) {
            if (forceClose) {
                item._preventSubMenuClose = false;
                this._closeSubMenuPopover(item._subMenu, forceClose, keyboard);
            }
            else {
                setTimeout(() => this._closeSubMenuPopover(item._subMenu), 0);
            }
        }
    }
    _closeSubMenuPopover(subMenu, forceClose = false, keyboard = false) {
        if (subMenu) {
            const parentItem = subMenu._parentMenuItem;
            if (forceClose || !parentItem._preventSubMenuClose) {
                subMenu.close();
                if (keyboard) {
                    subMenu._opener?.focus();
                }
                this._openedSubMenuItem = undefined;
                this._subMenuOpenerId = "";
            }
        }
    }
    _prepareSubMenu(item, opener) {
        if (opener.id !== this._subMenuOpenerId || (item && item.hasSubmenu)) {
            // close opened sub-menu if there is any opened
            this._closeItemSubMenu(this._openedSubMenuItem, true);
        }
        if (item && item.hasSubmenu) {
            // create new sub-menu
            this._createSubMenu(item, opener);
            this._openItemSubMenu(item, opener);
        }
        if (this._parentMenuItem) {
            this._parentMenuItem._preventSubMenuClose = true;
        }
    }
    _onfocusin(e) {
        const target = e.target;
        const menuListItem = target.hasAttribute("ui5-menu-li")
            ? target
            : target.getRootNode().host;
        const item = menuListItem.associatedItem;
        const mainMenu = this._findMainMenu(item);
        mainMenu?.fireEvent("item-focus", { ref: menuListItem, item });
    }
    _startOpenTimeout(item, opener) {
        clearTimeout(this._timeout);
        // Sets the new timeout
        this._timeout = setTimeout(() => {
            this._prepareSubMenu(item, opener);
        }, MENU_OPEN_DELAY);
    }
    _startCloseTimeout(item) {
        clearTimeout(this._timeout);
        // Sets the new timeout
        this._timeout = setTimeout(() => {
            this._closeItemSubMenu(item);
        }, MENU_CLOSE_DELAY);
    }
    _itemMouseOver(e) {
        if (isDesktop()) {
            // respect mouseover only on desktop
            const opener = e.target;
            const item = opener.associatedItem;
            opener.focus();
            // Opens submenu with 300ms delay
            this._startOpenTimeout(item, opener);
        }
    }
    _busyMouseOver() {
        if (this._parentMenuItem) {
            this._parentMenuItem._preventSubMenuClose = true;
        }
    }
    _itemMouseOut(e) {
        if (isDesktop()) {
            const opener = e.target;
            const item = opener.associatedItem;
            clearTimeout(this._timeout);
            // Close submenu with 400ms delay
            if (item && item.hasSubmenu && item._subMenu) {
                // try to close the sub-menu
                item._preventSubMenuClose = false;
                this._startCloseTimeout(item);
            }
        }
    }
    _itemKeyDown(e) {
        const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
        const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
        if (isEnter(e)) {
            e.preventDefault();
        }
        if (shouldOpenMenu) {
            const opener = e.target;
            const item = opener.associatedItem;
            item.hasSubmenu && this._prepareSubMenu(item, opener);
        }
        else if (shouldCloseMenu && this._isSubMenu && this._parentMenuItem) {
            const parentMenuItemParent = this._parentMenuItem.parentElement;
            parentMenuItemParent._closeItemSubMenu(this._parentMenuItem, true, true);
        }
    }
    _itemClick(e) {
        const opener = e.detail.item;
        const item = opener.associatedItem;
        if (!item.hasSubmenu) {
            // click on an item that doesn't have sub-items fires an "item-click" event
            if (!this._isSubMenu) {
                // fire event if the click is on top-level menu item
                const prevented = !this.fireEvent("item-click", {
                    "item": item,
                    "text": item.text,
                }, true, false);
                if (!prevented) {
                    this._popover.close();
                }
            }
            else {
                const mainMenu = this._findMainMenu(item);
                const prevented = !mainMenu.fireEvent("item-click", {
                    "item": item,
                    "text": item.text,
                }, true, false);
                if (!prevented) {
                    let openerMenuItem = item;
                    let parentMenu = openerMenuItem.parentElement;
                    do {
                        openerMenuItem._preventSubMenuClose = false;
                        this._closeItemSubMenu(openerMenuItem);
                        parentMenu = openerMenuItem.parentElement;
                        openerMenuItem = parentMenu._parentMenuItem;
                    } while (parentMenu._parentMenuItem);
                    mainMenu._popover.close();
                }
            }
        }
        else {
            this._prepareSubMenu(item, opener);
        }
    }
    _findMainMenu(element) {
        let menu = this._isMenu(element) ? element : element.parentElement;
        while (menu && menu._parentMenuItem) {
            menu = menu._parentMenuItem.parentElement;
        }
        return menu;
    }
    _isMenu(element) {
        return element.hasAttribute("ui5-menu");
    }
    _beforePopoverOpen(e) {
        const prevented = !this.fireEvent("before-open", {}, true, false);
        if (prevented) {
            this.open = false;
            e.preventDefault();
        }
    }
    _afterPopoverOpen() {
        this.open = true;
        this.fireEvent("after-open", {}, false, false);
    }
    _beforePopoverClose(e) {
        const prevented = !this.fireEvent("before-close", { escPressed: e.detail.escPressed }, true, false);
        if (prevented) {
            this.open = true;
            e.preventDefault();
            return;
        }
        if (this._openedSubMenuItem) {
            this._openedSubMenuItem._preventSubMenuClose = false;
            this._closeItemSubMenu(this._openedSubMenuItem);
        }
    }
    _afterPopoverClose() {
        this.open = false;
        this.fireEvent("after-close", {}, false, false);
    }
};
__decorate([
    property()
], Menu.prototype, "headerText", void 0);
__decorate([
    property({ type: Boolean })
], Menu.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], Menu.prototype, "busy", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1000 })
], Menu.prototype, "busyDelay", void 0);
__decorate([
    property({ validator: DOMReference, defaultValue: "" })
], Menu.prototype, "opener", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Menu.prototype, "_isSubMenu", void 0);
__decorate([
    property()
], Menu.prototype, "_subMenuOpenerId", void 0);
__decorate([
    property({ type: Object, multiple: true })
], Menu.prototype, "_currentItems", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], Menu.prototype, "_popover", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], Menu.prototype, "_parentMenuItem", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], Menu.prototype, "_opener", void 0);
__decorate([
    property({ type: Object, defaultValue: undefined })
], Menu.prototype, "_openedSubMenuItem", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], Menu.prototype, "items", void 0);
Menu = Menu_1 = __decorate([
    customElement({
        tag: "ui5-menu",
        renderer: litRender,
        staticAreaStyles: staticAreaMenuCss,
        staticAreaTemplate: staticAreaMenuTemplate,
        dependencies: [
            ResponsivePopover,
            Button,
            List,
            StandardListItem,
            MenuListItem,
            Icon,
            BusyIndicator,
        ],
    })
    /**
     * Fired when an item is being clicked.
     *
     * **Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
     * @allowPreventDefault
     * @param { HTMLElement } item The currently clicked menu item.
     * @param { string } text The text of the currently clicked menu item.
     * @public
     */
    ,
    event("item-click", {
        detail: {
            /**
             * @public
             */
            item: {
                type: HTMLElement,
            },
            /**
             * @public
             */
            text: {
                type: String,
            },
        },
    })
    /**
     * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. **This event does not bubble.**
     *
     * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
     * @public
     * @allowPreventDefault
     * @since 1.10.0
     * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
     */
    ,
    event("before-open", {
        detail: {
            /**
             * @public
             * @since 1.14.0
             */
            item: {
                type: HTMLElement,
            },
        },
    })
    /**
     * Fired after the menu is opened. **This event does not bubble.**
     * @public
     * @since 1.10.0
     */
    ,
    event("after-open")
    /**
     * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. **This event does not bubble.**
     * @public
     * @allowPreventDefault
     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
     * @since 1.10.0
     */
    ,
    event("before-close", {
        detail: {
            /**
             * @public
             */
            escPressed: {
                type: Boolean,
            },
        },
    })
    /**
     * Fired after the menu is closed. **This event does not bubble.**
     * @public
     * @since 1.10.0
     */
    ,
    event("after-close")
    /**
     * Fired when a menu item receives focus.
     *
     * @public
     * @param { HTMLElement } ref The currently focused element representing a <code>ui5-menu-item</code>.
     * @param { HTMLElement } item The <code>ui5-menu-item</code> represented by the focused element.
     * @since 1.23.1
     */
    ,
    event("item-focus", {
        detail: {
            /**
             * @public
             */
            ref: {
                type: HTMLElement,
            },
            /**
             * @public
             */
            item: {
                type: HTMLElement,
            },
        },
    })
], Menu);
Menu.define();
export default Menu;
//# sourceMappingURL=Menu.js.map