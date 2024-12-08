import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { type ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type UserMenuAccount from "./UserMenuAccount.js";
import type UserMenuItem from "./UserMenuItem.js";
import "@ui5/webcomponents-icons/dist/add-employee.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";
import "@ui5/webcomponents-icons/dist/decline.js";
type UserMenuItemClickEventDetail = {
    item: UserMenuItem;
};
type UserMenuOtherAccountClickEventDetail = {
    prevSelectedAccount: UserMenuAccount;
    selectedAccount: UserMenuAccount;
};
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
declare class UserMenu extends UI5Element {
    eventDetails: {
        "avatar-click": void;
        "manage-account-click": void;
        "add-account-click": void;
        "change-account": UserMenuOtherAccountClickEventDetail;
        "item-click": UserMenuItemClickEventDetail;
        "sign-out-click": void;
    };
    /**
     * Defines if the User Menu is opened.
     *
     * @default false
     * @public
     */
    open: boolean;
    /**
     * Defines the ID or DOM Reference of the element at which the user menu is shown.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     */
    opener?: HTMLElement | string;
    /**
     * Defines if the User Menu shows the Manage Account option.
     *
     * @default false
     * @public
     */
    showManageAccount: boolean;
    /**
     * Defines if the User Menu shows the Other Accounts option.
     *
     * @default false
     * @public
     */
    showOtherAccounts: boolean;
    /**
     * Defines if the User Menu shows the Add Account option.
     *
     * @default false
     * @public
     */
    showAddAccount: boolean;
    /**
     * Defines the menu items.
     * @public
     */
    menuItems: Array<UserMenuItem>;
    /**
     * Defines the user accounts.
     *
     * **Note:** If one item is used, it will be shown as the selected one. If more than one item is used, the first one will be shown as selected unless
     * there is an item with `selected` property set to `true`.
     * @public
     */
    accounts: Array<UserMenuAccount>;
    static i18nBundle: I18nBundle;
    /**
     * @private
     */
    _selectedAccount: UserMenuAccount;
    onBeforeRendering(): void;
    get _isPhone(): boolean;
    _handleAvatarClick(): void;
    _handleManageAccountClick(): void;
    _handleAddAccountClick(): void;
    _handleAccountSwitch(e: CustomEvent<{
        item: ListItemClickEventDetail & {
            associatedAccount: UserMenuAccount;
        };
    }>): void;
    _handleSignOutClick(): void;
    _handleMenuItemClick(e: CustomEvent<UserMenuItemClickEventDetail>): void;
    _handleMenuItemClose(): void;
    _handlePopoverAfterClose(): void;
    _handleDeclineClick(): void;
    _openItemSubMenu(item: UserMenuItem): void;
    _closeItemSubMenu(item: UserMenuItem): void;
    _closeUserMenu(): void;
    get _otherAccounts(): UserMenuAccount[];
    get _declineButtonTooltip(): string;
    get _manageAccountButtonText(): string;
    get _otherAccountsButtonText(): string;
    get _signOutButtonText(): string;
    get _editAvatarTooltip(): string;
    get _addAccountTooltip(): string;
    get accessibleNameText(): string;
}
export default UserMenu;
export type { UserMenuItemClickEventDetail, UserMenuOtherAccountClickEventDetail, };
