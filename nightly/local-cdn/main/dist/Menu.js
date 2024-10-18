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
import { isLeft, isRight, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone, isDesktop, } from "@ui5/webcomponents-base/dist/Device.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import BusyIndicator from "./BusyIndicator.js";
import MenuItem from "./MenuItem.js";
import MenuSeparator from "./MenuSeparator.js";
import menuTemplate from "./generated/templates/MenuTemplate.lit.js";
import { MENU_CLOSE_BUTTON_ARIA_LABEL, MENU_POPOVER_ACCESSIBLE_NAME, } from "./generated/i18n/i18n-defaults.js";
// Styles
import menuCss from "./generated/themes/Menu.css.js";
const MENU_OPEN_DELAY = 300;
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Structure
 *
 * The `ui5-menu` can hold two types of entities:
 *
 * - `ui5-menu-item` components
 * - `ui5-menu-separator` - used to separate menu items with a line
 *
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
    constructor() {
        super(...arguments);
        /**
         * Indicates if the menu is open
         * @public
         * @default false
         * @since 1.10.0
         */
        this.open = false;
        /**
         * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
         * @default false
         * @public
         * @since 1.13.0
         */
        this.loading = false;
        /**
         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover..
         * @default 1000
         * @public
         * @since 1.13.0
         */
        this.loadingDelay = 1000;
    }
    get isRtl() {
        return this.effectiveDir === "rtl";
    }
    get labelClose() {
        return Menu_1.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
    }
    get isPhone() {
        return isPhone();
    }
    get _popover() {
        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
    }
    get _menuItems() {
        return this.items.filter((item) => !item.isSeparator);
    }
    get acessibleNameText() {
        return Menu_1.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
    }
    onBeforeRendering() {
        const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);
        this._menuItems.forEach(item => {
            item._siblingsWithIcon = siblingsWithIcon;
        });
    }
    _close() {
        this.open = false;
    }
    _openItemSubMenu(item) {
        clearTimeout(this._timeout);
        if (!item._popover || item._popover.open) {
            return;
        }
        this.fireEvent("before-open", {
            item,
        }, false, false);
        item._popover.opener = item;
        item._popover.open = true;
        item.selected = true;
    }
    _closeItemSubMenu(item) {
        if (item && item._popover) {
            const openedSibling = item._menuItems.find(menuItem => menuItem._popover && menuItem._popover.open);
            if (openedSibling) {
                this._closeItemSubMenu(openedSibling);
            }
            item._popover.open = false;
            item.selected = false;
        }
    }
    _itemMouseOver(e) {
        if (isDesktop()) {
            // respect mouseover only on desktop
            const item = e.target;
            if (item.hasAttribute("ui5-menu-item")) {
                item.focus();
                // Opens submenu with 300ms delay
                this._startOpenTimeout(item);
            }
        }
    }
    _startOpenTimeout(item) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            const opener = item.parentElement;
            const openedSibling = opener && opener._menuItems.find(menuItem => menuItem._popover && menuItem._popover.open);
            if (openedSibling) {
                this._closeItemSubMenu(openedSibling);
            }
            this._openItemSubMenu(item);
        }, MENU_OPEN_DELAY);
    }
    _itemClick(e) {
        const item = e.detail.item;
        if (!item._popover) {
            const prevented = !this.fireEvent("item-click", {
                "item": item,
                "text": item.text || "",
            }, true, false);
            if (!prevented && this._popover) {
                item.fireEvent("close-menu", {});
            }
        }
        else {
            this._openItemSubMenu(item);
        }
    }
    _itemKeyDown(e) {
        if (!isLeft(e) && !isRight(e)) {
            return;
        }
        const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
        const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
        const item = e.target;
        const parentElement = item.parentElement;
        if (isEnter(e)) {
            e.preventDefault();
        }
        if (shouldOpenMenu) {
            this._openItemSubMenu(item);
        }
        else if (shouldCloseMenu && parentElement.hasAttribute("ui5-menu-item") && parentElement._popover) {
            parentElement._popover.open = false;
            parentElement.selected = false;
            parentElement._popover.opener?.focus();
        }
    }
    _beforePopoverOpen(e) {
        const prevented = !this.fireEvent("before-open", {}, true, true);
        if (prevented) {
            this.open = false;
            e.preventDefault();
        }
    }
    _afterPopoverOpen() {
        this._menuItems[0]?.focus();
        this.fireEvent("open", {}, false, true);
    }
    _beforePopoverClose(e) {
        const prevented = !this.fireEvent("before-close", { escPressed: e.detail.escPressed }, true, true);
        if (prevented) {
            this.open = true;
            e.preventDefault();
        }
    }
    _afterPopoverClose() {
        this.open = false;
        this.fireEvent("close", {}, false, true);
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
], Menu.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], Menu.prototype, "loadingDelay", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], Menu.prototype, "opener", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
], Menu.prototype, "items", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Menu, "i18nBundle", void 0);
Menu = Menu_1 = __decorate([
    customElement({
        tag: "ui5-menu",
        renderer: litRender,
        styles: menuCss,
        template: menuTemplate,
        dependencies: [
            ResponsivePopover,
            Button,
            List,
            MenuItem,
            MenuSeparator,
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
    event("open")
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
    event("close")
], Menu);
Menu.define();
export default Menu;
//# sourceMappingURL=Menu.js.map