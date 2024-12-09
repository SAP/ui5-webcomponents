var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserMenu_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, slot, eventStrict as event, property, } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List, {} from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import UserMenuTemplate from "./generated/templates/UserMenuTemplate.lit.js";
import UserMenuCss from "./generated/themes/UserMenu.css.js";
// Icons
import "@ui5/webcomponents-icons/dist/add-employee.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";
import "@ui5/webcomponents-icons/dist/decline.js";
// Texts
import { USER_MENU_OTHER_ACCOUNT_BUTTON_TXT, USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT, USER_MENU_SIGN_OUT_BUTTON_TXT, USER_MENU_POPOVER_ACCESSIBLE_NAME, USER_MENU_EDIT_AVATAR_TXT, USER_MENU_ADD_ACCOUNT_TXT, USER_MENU_CLOSE_BUTTON_TXT, } from "./generated/i18n/i18n-defaults.js";
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-menu` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily see information and settings for the current user and all other logged in accounts.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserMenu.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";` (for `ui5-user-menu-item`)
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 * @since 2.5.0
 */
let UserMenu = UserMenu_1 = class UserMenu extends UI5Element {
    constructor() {
        super(...arguments);
        /**
         * Defines if the User Menu is opened.
         *
         * @default false
         * @public
         */
        this.open = false;
        /**
         * Defines if the User Menu shows the Manage Account option.
         *
         * @default false
         * @public
         */
        this.showManageAccount = false;
        /**
         * Defines if the User Menu shows the Other Accounts option.
         *
         * @default false
         * @public
         */
        this.showOtherAccounts = false;
        /**
         * Defines if the User Menu shows the Add Account option.
         *
         * @default false
         * @public
         */
        this.showAddAccount = false;
    }
    onBeforeRendering() {
        this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
    }
    get _isPhone() {
        return isPhone();
    }
    _handleAvatarClick() {
        this.fireDecoratorEvent("avatar-click");
    }
    _handleManageAccountClick() {
        this.fireDecoratorEvent("manage-account-click");
    }
    _handleAddAccountClick() {
        this.fireDecoratorEvent("add-account-click");
    }
    _handleAccountSwitch(e) {
        const eventPrevented = !this.fireDecoratorEvent("change-account", {
            prevSelectedAccount: this._selectedAccount,
            selectedAccount: e.detail.item.associatedAccount,
        });
        if (eventPrevented) {
            return;
        }
        this._selectedAccount.selected = false;
        e.detail.item.associatedAccount.selected = true;
    }
    _handleSignOutClick() {
        const eventPrevented = !this.fireDecoratorEvent("sign-out-click");
        if (eventPrevented) {
            return;
        }
        this._closeUserMenu();
    }
    _handleMenuItemClick(e) {
        const item = e.detail.item;
        if (!item._popover) {
            const eventPrevented = !this.fireDecoratorEvent("item-click", {
                "item": item,
            });
            if (!eventPrevented) {
                item.fireEvent("close-menu");
            }
        }
        else {
            this._openItemSubMenu(item);
        }
    }
    _handleMenuItemClose() {
        this._closeUserMenu();
    }
    _handlePopoverAfterClose() {
        this.open = false;
    }
    _handleDeclineClick() {
        this._closeUserMenu();
    }
    _openItemSubMenu(item) {
        if (!item._popover || item._popover.open) {
            return;
        }
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
    _closeUserMenu() {
        this.open = false;
    }
    get _otherAccounts() {
        return this.accounts.filter(account => account !== this._selectedAccount);
    }
    get _declineButtonTooltip() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_CLOSE_BUTTON_TXT);
    }
    get _manageAccountButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT);
    }
    get _otherAccountsButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_OTHER_ACCOUNT_BUTTON_TXT);
    }
    get _signOutButtonText() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_SIGN_OUT_BUTTON_TXT);
    }
    get _editAvatarTooltip() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_EDIT_AVATAR_TXT);
    }
    get _addAccountTooltip() {
        return UserMenu_1.i18nBundle.getText(USER_MENU_ADD_ACCOUNT_TXT);
    }
    get accessibleNameText() {
        if (!this._selectedAccount) {
            return "";
        }
        return `${UserMenu_1.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_NAME)} ${this._selectedAccount.titleText}`;
    }
};
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "open", void 0);
__decorate([
    property({ converter: DOMReferenceConverter })
], UserMenu.prototype, "opener", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showManageAccount", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showOtherAccounts", void 0);
__decorate([
    property({ type: Boolean })
], UserMenu.prototype, "showAddAccount", void 0);
__decorate([
    slot({
        type: HTMLElement,
        "default": true,
    })
], UserMenu.prototype, "menuItems", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: {
            properties: true,
            slots: false,
        },
    })
], UserMenu.prototype, "accounts", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], UserMenu, "i18nBundle", void 0);
UserMenu = UserMenu_1 = __decorate([
    customElement({
        tag: "ui5-user-menu",
        languageAware: true,
        renderer: litRender,
        template: UserMenuTemplate,
        styles: [UserMenuCss],
        dependencies: [
            ResponsivePopover,
            Avatar,
            Title,
            Text,
            Label,
            Button,
            Panel,
            Icon,
            List,
            ListItemCustom,
            Tag,
        ],
    })
    /**
     * Fired when the account avatar is selected.
     * @public
     */
    ,
    event("avatar-click")
    /**
     * Fired when the "Manage Account" button is selected.
     * @public
     */
    ,
    event("manage-account-click")
    /**
     * Fired when the "Add Account" button is selected.
     * @public
     */
    ,
    event("add-account-click")
    /**
     * Fired when the account is switched to a different one.
     * @param {UserMenuAccount} prevSelectedAccount The previously selected account.
     * @param {UserMenuAccount} selectedAccount The selected account.
     * @public
     */
    ,
    event("change-account", {
        cancelable: true,
    })
    /**
     * Fired when a menu item is selected.
     * @param {UserMenuItem} item The selected `user menu item`.
     * @public
     */
    ,
    event("item-click", {
        cancelable: true,
    })
    /**
     * Fired when the "Sign Out" button is selected.
     * @public
     */
    ,
    event("sign-out-click", {
        cancelable: true,
    })
], UserMenu);
UserMenu.define();
export default UserMenu;
//# sourceMappingURL=UserMenu.js.map