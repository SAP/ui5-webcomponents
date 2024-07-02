var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShellBar_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import AriaHasPopup from "@ui5/webcomponents-base/dist/types/AriaHasPopup.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/grid.js";
// Templates
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";
// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";
import { SHELLBAR_LABEL, SHELLBAR_LOGO, SHELLBAR_NOTIFICATIONS, SHELLBAR_CANCEL, SHELLBAR_PROFILE, SHELLBAR_PRODUCTS, SHELLBAR_SEARCH, SHELLBAR_OVERFLOW, } from "./generated/i18n/i18n-defaults.js";
const HANDLE_RESIZE_DEBOUNCE_RATE = 200; // ms
/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * ### Stable DOM Refs
 *
 * You can use the following stable DOM refs for the `ui5-shellbar`:
 *
 * - logo
 * - notifications
 * - overflow
 * - profile
 * - product-switch
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
let ShellBar = ShellBar_1 = class ShellBar extends UI5Element {
    static get FIORI_3_BREAKPOINTS() {
        return [
            599,
            1023,
            1439,
            1919,
            10000,
        ];
    }
    static get FIORI_3_BREAKPOINTS_MAP() {
        return {
            "599": "S",
            "1023": "M",
            "1439": "L",
            "1919": "XL",
            "10000": "XXL",
        };
    }
    constructor() {
        super();
        /**
         * Defines, if the notification icon would be displayed.
         * @default false
         * @public
         */
        this.showNotifications = false;
        /**
         * Defines, if the product switch icon would be displayed.
         * @default false
         * @public
         */
        this.showProductSwitch = false;
        /**
         * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
         *
         * **Note:** By default the Search Field is not displayed.
         * @default false
         * @public
         */
        this.showSearchField = false;
        /**
         * Defines additional accessibility attributes on different areas of the component.
         *
         * The accessibilityAttributes object has the following fields,
         * where each field is an object supporting one or more accessibility attributes:
         *
         * - **logo** - `logo.role` and `logo.name`.
         * - **notifications** - `notifications.expanded` and `notifications.hasPopup`.
         * - **profile** - `profile.expanded`, `profile.hasPopup` and `profile.name`.
         * - **product** - `product.expanded` and `product.hasPopup`.
         * - **search** - `search.expanded` and `search.hasPopup`.
         * - **overflow** - `overflow.expanded` and `overflow.hasPopup`.
         *
         * The accessibility attributes support the following values:
         *
         * - **role**: Defines the accessible ARIA role of the logo area.
         * Accepts the following string values: `button` or `link`.
         *
         * - **expanded**: Indicates whether the button, or another grouping element it controls,
         * is currently expanded or collapsed.
         * Accepts the following string values: `true` or `false`.
         *
         * - **hasPopup**: Indicates the availability and type of interactive popup element,
         * such as menu or dialog, that can be triggered by the button.
         *
         * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
         * - **name**: Defines the accessible ARIA name of the area.
         * Accepts any string.
         *
         * @default {}
         * @public
         * @since 1.10.0
         */
        this.accessibilityAttributes = {};
        /**
         * @private
         */
        this.withLogo = false;
        this._menuPopoverItems = [];
        this._menuPopoverExpanded = false;
        this._overflowPopoverExpanded = false;
        this._fullWidthSearch = false;
        this._isXXLBreakpoint = false;
        this._menuPopoverItems = [];
        this._hiddenIcons = [];
        this._itemsInfo = [];
        this._isInitialRendering = true;
        // marks if preventDefault() is called in item's press handler
        this._defaultItemPressPrevented = false;
        this.menuItemsObserver = new MutationObserver(() => {
            this._updateClonedMenuItems();
        });
        this._headerPress = () => {
            this._updateClonedMenuItems();
            if (this.hasMenuItems) {
                const menuPopover = this._getMenuPopover();
                menuPopover.opener = this.shadowRoot.querySelector(".ui5-shellbar-menu-button");
                menuPopover.open = true;
            }
        };
        this._handleResize = () => {
            this._debounce(() => {
                this.menuPopover = this._getMenuPopover();
                this.overflowPopover = this._getOverflowPopover();
                this.overflowPopover.open = false;
                this._overflowActions();
            }, HANDLE_RESIZE_DEBOUNCE_RATE);
        };
    }
    _debounce(fn, delay) {
        clearTimeout(this._debounceInterval);
        this._debounceInterval = setTimeout(() => {
            this._debounceInterval = null;
            fn();
        }, delay);
    }
    _menuItemPress(e) {
        const shouldContinue = this.fireEvent("menu-item-click", {
            item: e.detail.selectedItems[0],
        }, true);
        if (shouldContinue) {
            this.menuPopover.open = false;
        }
    }
    _logoPress() {
        this.fireEvent("logo-click", {
            targetRef: this.shadowRoot.querySelector(".ui5-shellbar-logo"),
        });
    }
    _menuPopoverBeforeOpen() {
        this._menuPopoverExpanded = true;
        if (this.menuPopover.content && this.menuPopover.content.length) {
            this.menuPopover.content[0].focusFirstItem();
        }
    }
    _menuPopoverAfterClose() {
        this._menuPopoverExpanded = false;
    }
    _overflowPopoverBeforeOpen() {
        this._overflowPopoverExpanded = true;
        if (this.overflowPopover.content && this.overflowPopover.content.length) {
            this.overflowPopover.content[0].focusFirstItem();
        }
    }
    _overflowPopoverAfterClose() {
        this._overflowPopoverExpanded = false;
    }
    _logoKeyup(e) {
        if (isSpace(e)) {
            this._logoPress();
        }
    }
    _logoKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            return;
        }
        if (isEnter(e)) {
            this._logoPress();
        }
    }
    onBeforeRendering() {
        this.withLogo = this.hasLogo;
        this._hiddenIcons = this._itemsInfo.filter(info => {
            const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
            const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
            const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
            const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
            const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);
            return isHidden && isSet && !shouldStayOnScreen;
        });
        this._observeMenuItems();
    }
    onAfterRendering() {
        this._overflowActions();
        this._fullWidthSearch = this._showFullWidthSearch;
    }
    /**
     * Closes the overflow area.
     * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
     * @public
     */
    closeOverflow() {
        if (this.overflowPopover) {
            this.overflowPopover.open = false;
        }
    }
    _handleBarBreakpoints() {
        const width = this.getBoundingClientRect().width;
        const breakpoints = ShellBar_1.FIORI_3_BREAKPOINTS;
        const size = breakpoints.find(bp1 => width <= bp1) || ShellBar_1.FIORI_3_BREAKPOINTS[ShellBar_1.FIORI_3_BREAKPOINTS.length - 1];
        const mappedSize = ShellBar_1.FIORI_3_BREAKPOINTS_MAP[size];
        if (this.breakpointSize !== mappedSize) {
            this.breakpointSize = mappedSize;
        }
        this._isXXLBreakpoint = this.breakpointSize === "XXL";
        return mappedSize;
    }
    _handleSizeS() {
        const hasIcons = this.showNotifications || this.showProductSwitch || !!this.searchField.length || !!this.items.length;
        const newItems = this._getAllItems(hasIcons).map((info) => {
            const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
            const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
            const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);
            return {
                ...info,
                classes: `${info.classes} ${shouldStayOnScreen ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-button`,
                styles: {
                    order: shouldStayOnScreen ? 1 : -1,
                },
            };
        });
        this._updateItemsInfo(newItems);
    }
    _handleActionsOverflow() {
        const rightContainerRect = this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right").getBoundingClientRect();
        let overflowSelector = ".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button)";
        if (this.showSearchField) {
            overflowSelector += ",.ui5-shellbar-search-field";
        }
        const elementsToOverflow = this.shadowRoot.querySelectorAll(overflowSelector);
        const isRTL = this.effectiveDir === "rtl";
        const overflowButtons = [...elementsToOverflow].filter(icon => {
            const iconRect = (icon).getBoundingClientRect();
            if (isRTL) {
                return (iconRect.left + iconRect.width) > (rightContainerRect.left + rightContainerRect.width);
            }
            return iconRect.left < rightContainerRect.left;
        });
        const showOverflowButton = !!overflowButtons.length;
        const items = this._getAllItems(showOverflowButton).filter(item => item.show);
        const itemsByPriority = items.sort((item1, item2) => {
            if (item1.priority > item2.priority) {
                return 1;
            }
            if (item1.priority < item2.priority) {
                return -1;
            }
            return 0;
        });
        for (let i = 0; i < itemsByPriority.length; i++) {
            if (i < overflowButtons.length) {
                itemsByPriority[i].classes = `${itemsByPriority[i].classes} ui5-shellbar-hidden-button`;
                itemsByPriority[i].styles = {
                    order: -1,
                };
            }
        }
        return itemsByPriority;
    }
    _overflowActions() {
        const size = this._handleBarBreakpoints();
        if (size === "S") {
            return this._handleSizeS();
        }
        const newItems = this._handleActionsOverflow();
        this._updateItemsInfo(newItems);
    }
    _toggleActionPopover() {
        const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
        const overflowPopover = this._getOverflowPopover();
        overflowPopover.opener = overflowButton;
        overflowPopover.open = true;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize);
        if (isDesktop()) {
            this.setAttribute("desktop", "");
        }
    }
    onExitDOM() {
        this.menuItemsObserver.disconnect();
        ResizeHandler.deregister(this, this._handleResize);
        clearTimeout(this._debounceInterval);
        this._debounceInterval = null;
    }
    _handleSearchIconPress() {
        const searchButtonRef = this.shadowRoot.querySelector(".ui5-shellbar-search-button");
        const defaultPrevented = !this.fireEvent("search-button-click", {
            targetRef: searchButtonRef,
            searchFieldVisible: this.showSearchField,
        }, true);
        if (defaultPrevented) {
            return;
        }
        this.showSearchField = !this.showSearchField;
        if (!this.showSearchField) {
            return;
        }
        const input = this.searchField[0];
        // update the state immediately
        if (input) {
            input.focused = true;
        }
        // move the focus later
        setTimeout(() => {
            if (input) {
                input.focus();
            }
        }, 100);
    }
    async _handleActionListClick() {
        if (!this._defaultItemPressPrevented) {
            this.closeOverflow();
            // wait for DOM to be updated when ui5-popover is closed, otherwise if Enter key is hold
            // there will be no visual indication that this has happened
            await renderFinished();
        }
        this._defaultItemPressPrevented = false;
    }
    _handleCustomActionPress(e) {
        const target = e.target;
        const refItemId = target.getAttribute("data-ui5-external-action-item-id");
        if (refItemId) {
            const shellbarItem = this.items.find(item => {
                return item._id === refItemId;
            });
            const prevented = shellbarItem.fireClickEvent(e);
            this._defaultItemPressPrevented = prevented;
        }
    }
    _handleOverflowPress() {
        this._toggleActionPopover();
    }
    _handleNotificationsPress(e) {
        const notificationIconRef = this.shadowRoot.querySelector(".ui5-shellbar-bell-button"), target = e.target;
        this._defaultItemPressPrevented = !this.fireEvent("notifications-click", {
            targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
        }, true);
    }
    _handleProfilePress() {
        this.fireEvent("profile-click", {
            targetRef: this.shadowRoot.querySelector(".ui5-shellbar-image-button"),
        });
    }
    _handleCancelButtonPress() {
        this.showSearchField = false;
    }
    _handleProductSwitchPress(e) {
        const buttonRef = this.shadowRoot.querySelector(".ui5-shellbar-button-product-switch"), target = e.target;
        this._defaultItemPressPrevented = !this.fireEvent("product-switch-click", {
            targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? target : buttonRef,
        }, true);
    }
    /**
     * Returns the `logo` DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get logoDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="logo"]`);
    }
    /**
     * Returns the `notifications` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get notificationsDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="notifications"]`);
    }
    /**
     * Returns the `overflow` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get overflowDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="overflow"]`);
    }
    /**
     * Returns the `profile` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get profileDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="profile"]`);
    }
    /**
     * Returns the `product-switch` icon DOM ref.
     * @public
     * @default null
     * @since 1.0.0-rc.16
     */
    get productSwitchDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="product-switch"]`);
    }
    /**
     * Returns all items that will be placed in the right of the bar as icons / dom elements.
     * @param showOverflowButton Determines if overflow button should be visible (not overflowing)
     */
    _getAllItems(showOverflowButton) {
        let domOrder = -1;
        const search = {
            icon: "search",
            text: this._searchText,
            classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
            priority: 4,
            domOrder: this.searchField.length ? (++domOrder) : -1,
            styles: {
                order: this.searchField.length ? 1 : -10,
            },
            id: `${this._id}-item-${1}`,
            press: this._handleSearchIconPress.bind(this),
            show: !!this.searchField.length,
        };
        const items = [
            ...this.items.map((item) => {
                item._getRealDomRef = () => this.getDomRef().querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
                return {
                    icon: item.icon,
                    id: item._id,
                    count: item.count || undefined,
                    refItemid: item._id,
                    text: item.text,
                    classes: "ui5-shellbar-custom-item ui5-shellbar-button",
                    priority: 1,
                    domOrder: (++domOrder),
                    styles: {
                        order: 2,
                    },
                    show: true,
                    press: this._handleCustomActionPress.bind(this),
                    custom: true,
                    title: item.title,
                    stableDomRef: item.stableDomRef,
                };
            }),
            {
                icon: "bell",
                text: this._notificationsText,
                classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
                priority: 3,
                styles: {
                    order: this.showNotifications ? 3 : -10,
                },
                id: `${this._id}-item-${2}`,
                show: this.showNotifications,
                domOrder: this.showNotifications ? (++domOrder) : -1,
                press: this._handleNotificationsPress.bind(this),
            },
            {
                icon: "overflow",
                text: "Overflow",
                classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button ui5-shellbar-button`,
                priority: 5,
                order: 4,
                styles: {
                    order: showOverflowButton ? 4 : -1,
                },
                domOrder: showOverflowButton ? (++domOrder) : -1,
                id: `${this.id}-item-${5}`,
                press: this._handleOverflowPress.bind(this),
                show: true,
            },
            {
                text: "Person",
                classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,
                priority: 4,
                styles: {
                    order: this.hasProfile ? 5 : -10,
                },
                profile: true,
                id: `${this._id}-item-${3}`,
                domOrder: this.hasProfile ? (++domOrder) : -1,
                show: this.hasProfile,
                press: this._handleProfilePress.bind(this),
            },
            {
                icon: "grid",
                text: this._productsText,
                classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button ui5-shellbar-button-product-switch`,
                priority: 2,
                styles: {
                    order: this.showProductSwitch ? 6 : -10,
                },
                id: `${this._id}-item-${4}`,
                show: this.showProductSwitch,
                domOrder: this.showProductSwitch ? (++domOrder) : -1,
                press: this._handleProductSwitchPress.bind(this),
            },
        ];
        if (this.midContent.length < 1 && items[0].text !== this._searchText) {
            items.unshift(search);
        }
        return items;
    }
    _updateItemsInfo(newItems) {
        const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItems);
        if (isDifferent) {
            this._itemsInfo = newItems;
        }
    }
    _updateClonedMenuItems() {
        this._menuPopoverItems = [];
        this.menuItems.forEach(item => {
            // clone the menuItem and remove the slot="menuItems",
            // otherwise would not be slotted in the internal ui5-li
            const clonedItem = item.cloneNode(true);
            clonedItem.removeAttribute("slot");
            this._menuPopoverItems.push(clonedItem);
        });
    }
    _observeMenuItems() {
        this.menuItems.forEach(item => {
            this.menuItemsObserver.observe(item, {
                characterData: true,
                childList: true,
                subtree: true,
                attributes: true,
            });
        });
    }
    _getOverflowPopover() {
        return this.shadowRoot.querySelector(".ui5-shellbar-overflow-popover");
    }
    _getMenuPopover() {
        return this.shadowRoot.querySelector(".ui5-shellbar-menu-popover");
    }
    isIconHidden(name) {
        const itemInfo = this._itemsInfo.find(item => item.icon === name);
        if (!itemInfo) {
            return false;
        }
        return itemInfo.classes.indexOf("ui5-shellbar-hidden-button") !== -1;
    }
    get classes() {
        return {
            wrapper: {
                "ui5-shellbar-root": true,
                "ui5-shellbar-with-searchfield": this.hasSearchField,
            },
            button: {
                "ui5-shellbar-menu-button--interactive": this.hasMenuItems,
                "ui5-shellbar-menu-button": true,
            },
            items: {
                notification: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("bell"),
                },
                product: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("grid"),
                },
                search: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("search"),
                },
                overflow: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("overflow"),
                },
            },
        };
    }
    get styles() {
        return {
            items: {
                notification: {
                    "order": this.isIconHidden("bell") ? "-1" : "3",
                },
                overflow: {
                    "order": this.isIconHidden("overflow") ? "-1" : "4",
                },
                profile: {
                    "order": this.hasProfile ? "5" : "-1",
                },
                product: {
                    "order": this.isIconHidden("grid") ? "-1" : "6",
                },
            },
            searchField: {
                "display": this.correctSearchFieldStyles,
            },
        };
    }
    get correctSearchFieldStyles() {
        if (this.showSearchField) {
            return "flex";
        }
        return "none";
    }
    get customItemsInfo() {
        return this._itemsInfo.filter(itemInfo => !!itemInfo.custom);
    }
    get hasLogo() {
        return !!this.logo.length;
    }
    get showLogoInMenuButton() {
        return this.hasLogo && this.breakpointSize === "S";
    }
    get showTitleInMenuButton() {
        return this.primaryTitle && !(this.showLogoInMenuButton);
    }
    get showMenuButton() {
        return this.primaryTitle || this.showLogoInMenuButton;
    }
    get popoverHorizontalAlign() {
        return this.effectiveDir === "rtl" ? "Start" : "End";
    }
    get hasAssistant() {
        return !!this.assistant.length;
    }
    get hasSearchField() {
        return !!this.searchField.length;
    }
    get hasMidContent() {
        return !!this.midContent.length;
    }
    get hasProfile() {
        return !!this.profile.length;
    }
    get hasMenuItems() {
        return this.menuItems.length > 0;
    }
    get _shellbarText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_LABEL);
    }
    get _logoText() {
        return this.accessibilityAttributes.logo?.name || ShellBar_1.i18nBundle.getText(SHELLBAR_LOGO);
    }
    get _notificationsText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0);
    }
    get _cancelBtnText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_CANCEL);
    }
    get _showFullWidthSearch() {
        const size = this._handleBarBreakpoints();
        const searchBtnHidden = !!this.shadowRoot.querySelector(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");
        return ((size === "S") || searchBtnHidden);
    }
    get _profileText() {
        return this.accessibilityAttributes.profile?.name || ShellBar_1.i18nBundle.getText(SHELLBAR_PROFILE);
    }
    get _productsText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_PRODUCTS);
    }
    get _searchText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_SEARCH);
    }
    get _overflowText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_OVERFLOW);
    }
    get accInfo() {
        const searchExpanded = this.accessibilityAttributes.search?.expanded;
        const overflowExpanded = this.accessibilityAttributes.overflow?.expanded;
        return {
            notifications: {
                "title": this._notificationsText,
                "accessibilityAttributes": {
                    expanded: this.accessibilityAttributes.notifications?.expanded,
                    hasPopup: this.accessibilityAttributes.notifications?.hasPopup,
                },
            },
            profile: {
                "title": this._profileText,
                "accessibilityAttributes": {
                    hasPopup: this.accessibilityAttributes.profile?.hasPopup,
                    expanded: this.accessibilityAttributes.profile?.expanded,
                },
            },
            products: {
                "title": this._productsText,
                "accessibilityAttributes": {
                    hasPopup: this.accessibilityAttributes.product?.hasPopup,
                    expanded: this.accessibilityAttributes.product?.expanded,
                },
            },
            search: {
                "title": this._searchText,
                "accessibilityAttributes": {
                    hasPopup: this.accessibilityAttributes.search?.hasPopup,
                    expanded: searchExpanded === undefined ? this.showSearchField : searchExpanded,
                },
            },
            overflow: {
                "title": this._overflowText,
                "accessibilityAttributes": {
                    hasPopup: this.accessibilityAttributes.overflow?.hasPopup || AriaHasPopup.Menu.toLowerCase(),
                    expanded: overflowExpanded === undefined ? this._overflowPopoverExpanded : overflowExpanded,
                },
            },
        };
    }
    get accLogoRole() {
        return this.accessibilityAttributes.logo?.role || "button";
    }
    static async onDefine() {
        ShellBar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
};
__decorate([
    property()
], ShellBar.prototype, "primaryTitle", void 0);
__decorate([
    property()
], ShellBar.prototype, "secondaryTitle", void 0);
__decorate([
    property()
], ShellBar.prototype, "notificationsCount", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showNotifications", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showProductSwitch", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "showSearchField", void 0);
__decorate([
    property({ type: Object })
], ShellBar.prototype, "accessibilityAttributes", void 0);
__decorate([
    property()
], ShellBar.prototype, "breakpointSize", void 0);
__decorate([
    property({ type: Boolean })
], ShellBar.prototype, "withLogo", void 0);
__decorate([
    property({ type: Object })
], ShellBar.prototype, "_itemsInfo", void 0);
__decorate([
    property({ type: Array, noAttribute: true })
], ShellBar.prototype, "_menuPopoverItems", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_menuPopoverExpanded", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_overflowPopoverExpanded", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_fullWidthSearch", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_isXXLBreakpoint", void 0);
__decorate([
    slot()
], ShellBar.prototype, "assistant", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
], ShellBar.prototype, "items", void 0);
__decorate([
    slot()
], ShellBar.prototype, "profile", void 0);
__decorate([
    slot()
], ShellBar.prototype, "logo", void 0);
__decorate([
    slot()
], ShellBar.prototype, "menuItems", void 0);
__decorate([
    slot()
], ShellBar.prototype, "searchField", void 0);
__decorate([
    slot()
], ShellBar.prototype, "startButton", void 0);
__decorate([
    slot()
], ShellBar.prototype, "midContent", void 0);
ShellBar = ShellBar_1 = __decorate([
    customElement({
        tag: "ui5-shellbar",
        fastNavigation: true,
        languageAware: true,
        renderer: litRender,
        template: ShellBarTemplate,
        styles: [shellBarStyles, ShellBarPopoverCss],
        dependencies: [
            Button,
            Icon,
            List,
            Popover,
            ListItemStandard,
        ],
    })
    /**
     *
     * Fired, when the notification icon is activated.
     * @allowPreventDefault
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("notifications-click", {
        detail: {
            /**
             * @public
             */
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the profile slot is present.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("profile-click", {
        detail: {
            /**
             * @public
             */
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the product switch icon is activated.
     *
     * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
     * @allowPreventDefault
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("product-switch-click", {
        detail: {
            /**
             * @public
             */
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the logo is activated.
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @since 0.10
     * @public
     */
    ,
    event("logo-click", {
        detail: {
            /**
             * @public
             */
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when a menu item is activated
     *
     * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
     * @param {HTMLElement} item DOM ref of the activated list item
     * @since 0.10
     * @public
     */
    ,
    event("menu-item-click", {
        detail: {
            /**
             * @public
             */
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the search button is activated.
     *
     * **Note:** You can prevent expanding/collapsing of the search field by calling `event.preventDefault()`.
     * @allowPreventDefault
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @param {Boolean} searchFieldVisible whether the search field is visible
     * @public
     */
    ,
    event("search-button-click", {
        detail: {
            targetRef: { type: HTMLElement },
            searchFieldVisible: { type: Boolean },
        },
    })
], ShellBar);
ShellBar.define();
export default ShellBar;
//# sourceMappingURL=ShellBar.js.map