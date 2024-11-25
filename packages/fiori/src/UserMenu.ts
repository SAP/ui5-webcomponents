import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot, event, property,
} from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List, { type ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import UserMenuAccount from "./UserMenuAccount.js";
import UserMenuItem from "./UserMenuItem.js";
import UserMenuTemplate from "./generated/templates/UserMenuTemplate.lit.js";
import UserMenuCss from "./generated/themes/UserMenu.css.js";

// Icons
import "@ui5/webcomponents-icons/dist/add-employee.js";
import "@ui5/webcomponents-icons/dist/person-placeholder.js";
import "@ui5/webcomponents-icons/dist/log.js";
import "@ui5/webcomponents-icons/dist/user-settings.js";

// Texts
import {
	USER_MENU_OTHER_ACCOUNT_BUTTON_TXT,
	USER_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	USER_MENU_SIGN_OUT_BUTTON_TXT,
	USER_MENU_POPOVER_ACCESSIBLE_NAME,
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
@event("avatar-click", {
	bubbles: false,
})

/**
 * Fired when the "Manage Account" button is selected.
 * @public
 */
@event("manage-account-click", {
	bubbles: false,
})

/**
 * Fired when the "Add Account" button is selected.
 * @public
 */
@event("add-account-click", {
	bubbles: false,
})

/**
 * Fired when the account is switched to a different one.
 * @param {UserMenuAccount} prevSelectedAccount The previously selected account.
 * @param {UserMenuAccount} selectedAccount The selected account.
 * @public
 */
@event<UserMenuOtherAccountClickEventDetail>("change-account", {
	detail: {
		prevSelectedAccount: { type: UserMenuAccount },
		selectedAccount: { type: UserMenuAccount },
	},
	bubbles: false,
	cancelable: true,
})

/**
 * Fired when a menu item is selected.
 * @param {UserMenuItem} item The selected `user menu item`.
 * @public
 */
@event<UserMenuItemClickEventDetail>("item-click", {
	detail: {
		item: { type: UserMenuItem },
	},
	bubbles: false,
	cancelable: true,
})

/**
 * Fired when the "Sign Out" button is selected.
 * @public
 */
@event("sign-out-click", {
	bubbles: false,
	cancelable: true,
})
class UserMenu extends UI5Element {
	/**
	 * Defines if the User Menu dialog is opened.
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
	 * @private
	 */
	_selectedAccount!: UserMenuAccount;

	onBeforeRendering() {
		this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
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

	_handleAccountSwitch(e: CustomEvent<{ item: ListItemClickEventDetail & { associatedAccount: UserMenuAccount } }>) {
		const eventPrevented = !this.fireDecoratorEvent<UserMenuOtherAccountClickEventDetail>("change-account", {
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

	_handleMenuItemClick(e: CustomEvent<UserMenuItemClickEventDetail>) {
		const item = e.detail.item;

		if (!item._popover) {
			const eventPrevented = !this.fireDecoratorEvent<UserMenuItemClickEventDetail>("item-click", {
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

	_handlePopoverAfterClose() {
		this.open = false;
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

	get _otherAccounts() {
		return this.accounts.filter(account => account !== this._selectedAccount);
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

	get accessibleNameText() {
		return UserMenu.i18nBundle.getText(USER_MENU_POPOVER_ACCESSIBLE_NAME);
	}
}

UserMenu.define();

export default UserMenu;
export type {
	UserMenuItemClickEventDetail,
	UserMenuOtherAccountClickEventDetail,
};
