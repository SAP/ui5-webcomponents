import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot, eventStrict as event, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type UserMenuAccount from "./UserMenuAccount.js";
import type UserMenuItem from "./UserMenuItem.js";
import UserMenuTemplate from "./UserMenuTemplate.js";
import UserMenuCss from "./generated/themes/UserMenu.css.js";

// Texts
import {
	USER_MENU_OTHER_ACCOUNT_BUTTON_TXT,
	USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	USER_MENU_SIGN_OUT_BUTTON_TXT,
	USER_MENU_POPOVER_ACCESSIBLE_NAME,
	USER_MENU_EDIT_AVATAR_TXT,
	USER_MENU_ADD_ACCOUNT_TXT,
	USER_MENU_CLOSE_BUTTON_TXT,
	USER_MENU_CLOSE_DIALOG_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

type UserMenuItemClickEventDetail = {
	item: UserMenuItem;
}

type UserMenuOtherAccountClickEventDetail = {
	prevSelectedAccount: UserMenuAccount;
	selectedAccount: UserMenuAccount;
}

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

@customElement({
	tag: "ui5-user-menu",
	languageAware: true,
	renderer: jsxRenderer,
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
		Bar,
		List,
		ListItemCustom,
		Tag,
	],
})

/**
 * Fired when the account avatar is selected.
 * @public
 */
@event("avatar-click")

/**
 * Fired when the "Manage Account" button is selected.
 * @public
 */
@event("manage-account-click")

/**
 * Fired when the "Add Account" button is selected.
 * @public
 */
@event("add-account-click")

/**
 * Fired when the account is switched to a different one.
 * @param {UserMenuAccount} prevSelectedAccount The previously selected account.
 * @param {UserMenuAccount} selectedAccount The selected account.
 * @public
 */
@event("change-account", {
	cancelable: true,
})

/**
 * Fired when a menu item is selected.
 * @param {UserMenuItem} item The selected `user menu item`.
 * @public
 */
@event("item-click", {
	cancelable: true,
})

/**
 * Fired when a user menu is open.
 * @public
 * @since 2.6.0
 */
@event("open")

/**
 * Fired when a user menu is close.
 * @public
 * @since 2.6.0
 */
@event("close")

/**
 * Fired when the "Sign Out" button is selected.
 * @public
 * @since 2.6.0
 */
@event("sign-out-click", {
	cancelable: true,
})
class UserMenu extends UI5Element {
	eventDetails!: {
		"avatar-click": void;
		"manage-account-click": void;
		"add-account-click": void;
		"change-account": UserMenuOtherAccountClickEventDetail;
		"item-click": UserMenuItemClickEventDetail;
		"sign-out-click": void;
		"open": void;
		"close": void;

	}
	/**
	 * Defines if the User Menu is opened.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the ID or DOM Reference of the element at which the user menu is shown.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default undefined
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string;

	/**
	 * Defines if the User Menu shows the Manage Account option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showManageAccount = false;

	/**
	 * Defines if the User Menu shows the Other Accounts option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showOtherAccounts = false;

	/**
	 * Defines if the User Menu shows the Add Account option.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showAddAccount = false;

	/**
	 * Defines the menu items.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
	})
	menuItems!: Array<UserMenuItem>;

	/**
	 * Defines the user accounts.
	 *
	 * **Note:** If one item is used, it will be shown as the selected one. If more than one item is used, the first one will be shown as selected unless
	 * there is an item with `selected` property set to `true`.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	accounts!: Array<UserMenuAccount>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_titleMovedToHeader = false;

	/**
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	_manageAccountMovedToHeader = false;

	/**
	 * @private
	 */
	_selectedAccount!: UserMenuAccount;

	/**
	 * @private
	 */
	_observer?: IntersectionObserver;

	/**
	 * @private
	 */
	@query("#user-menu-rp")
	_responsivePopover?: ResponsivePopover;

	/**
	 * @private
	 */
	@query("#selected-account-title")
	_selectedAccountTitleEl?: Title;

	/**
	 * @private
	 */
	@query("#selected-account-manage-btn")
	_selectedAccountManageBtn?: Button;

	onBeforeRendering() {
		this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
	}

	onAfterRendering(): void {
		if (this._isPhone && this._responsivePopover) {
			const observerOptions = {
				threshold: [0.15],
			};

			this._observer?.disconnect();
			this._observer = new IntersectionObserver(entries => this._handleIntersection(entries), observerOptions);

			if (this._selectedAccountTitleEl) {
				this._observer.observe(this._selectedAccountTitleEl);
			}

			if (this._selectedAccountManageBtn) {
				this._observer.observe(this._selectedAccountManageBtn);
			}
		}
	}

	get _isPhone() {
		return isPhone();
	}

	_handleIntersection(entries: IntersectionObserverEntry[]) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (entry.target.id === "selected-account-title") {
					this._titleMovedToHeader = false;
				} else if (entry.target.id === "selected-account-manage-btn") {
					this._manageAccountMovedToHeader = false;
				}

				return;
			}

			if (entry.target.id === "selected-account-title") {
				this._titleMovedToHeader = true;
			} else if (entry.target.id === "selected-account-manage-btn") {
				this._manageAccountMovedToHeader = true;
			}
		}, this);
	}

	_handleAvatarClick(e: CustomEvent) {
		if (e.type === "click") {
			// TOFIX: Discuss this check: Fire the custom UserMenu#avatar-click only for Avatar#click (not for Avatar#ui5-click as well).
			this.fireDecoratorEvent("avatar-click");
		}
	}

	_handleManageAccountClick() {
		this.fireDecoratorEvent("manage-account-click");
	}

	_handleAddAccountClick() {
		this.fireDecoratorEvent("add-account-click");
	}

	_handleAccountSwitch(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as ListItemBase & { associatedAccount: UserMenuAccount };
		const eventPrevented = !this.fireDecoratorEvent("change-account", {
			prevSelectedAccount: this._selectedAccount,
			selectedAccount: item.associatedAccount,
		});
		if (eventPrevented) {
			return;
		}
		this._selectedAccount.selected = false;
		item.associatedAccount.selected = true;
	}

	_handleSignOutClick() {
		const eventPrevented = !this.fireDecoratorEvent("sign-out-click");

		if (eventPrevented) {
			return;
		}

		 this._closeUserMenu();
	}

	_handleMenuItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as UserMenuItem; // imrove: improve this ideally without "as" cating

		if (!item._popover) {
			const eventPrevented = !this.fireDecoratorEvent("item-click", {
				"item": item,
			});

			if (!eventPrevented) {
				item.fireEvent("close-menu");
			}
		} else {
			this._openItemSubMenu(item);
		}
	}

	_handleMenuItemClose() {
		this._closeUserMenu();
	}

	_handlePopoverAfterOpen() {
		this.fireDecoratorEvent("open");
	}

	_handlePopoverAfterClose() {
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	_handleDeclineClick() {
		this._closeUserMenu();
	}

	_openItemSubMenu(item: UserMenuItem) {
		if (!item._popover || item._popover.open) {
			return;
		}

		item._popover.opener = item;
		item._popover.open = true;
		item.selected = true;
	}

	_closeItemSubMenu(item: UserMenuItem) {
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

	get _manageAccountVisibleInHeader() {
		return this.showManageAccount && this._manageAccountMovedToHeader;
	}

	get _otherAccounts() {
		return this.accounts.filter(account => account !== this._selectedAccount);
	}

	get _declineButtonTooltip() {
		return UserMenu.i18nBundle.getText(USER_MENU_CLOSE_BUTTON_TXT);
	}

	get _manageAccountButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT);
	}

	get _otherAccountsButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_OTHER_ACCOUNT_BUTTON_TXT);
	}

	get _signOutButtonText() {
		return UserMenu.i18nBundle.getText(USER_MENU_SIGN_OUT_BUTTON_TXT);
	}

	get _editAvatarTooltip() {
		return UserMenu.i18nBundle.getText(USER_MENU_EDIT_AVATAR_TXT);
	}

	get _addAccountTooltip() {
		return UserMenu.i18nBundle.getText(USER_MENU_ADD_ACCOUNT_TXT);
	}

	get _closeDialogAriaLabel() {
		return UserMenu.i18nBundle.getText(USER_MENU_CLOSE_DIALOG_BUTTON);
	}

	get accessibleNameText() {
		if (!this._selectedAccount) {
			return "";
		}
		return `${UserMenu.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_NAME)} ${this._selectedAccount.titleText}`;
	}

	getAccountByRefId(refId: string) {
		return this.accounts.find(account => account._id === refId)!;
	}

	captureRef(ref: HTMLElement & { associatedAccount?: UI5Element} | null) {
		if (ref) {
			ref.associatedAccount = this;
		}
	}
}

UserMenu.define();

export default UserMenu;
export type {
	UserMenuItemClickEventDetail,
	UserMenuOtherAccountClickEventDetail,
};
