import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List, { type ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ProfileMenuAccount from "./ProfileMenuAccount.js";
import ProfileMenuItem from "./ProfileMenuItem.js";
import ProfileMenuTemplate from "./generated/templates/ProfileMenuTemplate.lit.js";
import ProfileMenuCss from "./generated/themes/ProfileMenu.css.js";

// Texts
import {
	PROFILE_MENU_OTHER_ACCOUNT_BUTTON_TXT,
	PROFILE_MENU_MANAGE_ACCOUNT_BUTTON_TXT,
	PROFILE_MENU_SIGN_OUT_BUTTON_TXT,
	PROFILE_MENU_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";

type ProfileMenuItemClickEventDetail = {
	item: ProfileMenuItem;
}

type ProfileMenuOtherAccountClickEventDetail = {
	prevSelectedAccount: ProfileMenuAccount;
	selectedAccount: ProfileMenuAccount;
}

/**
 * @class
 * ### Overview
 *
 * The `ui5-profile-menu` is an SAP Fiori specific web component that is used in `ui5-shellbar`
 * and allows the user to easily see information and settings for the current profile and all other logged in accounts.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProfileMenu.js";`
 *
 * `import "@ui5/webcomponents-fiori/dist/ProfileMenuItem.js";` (for `ui5-profile-menu-item`)
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 */

@customElement({
	tag: "ui5-profile-menu",
	languageAware: true,
	renderer: litRender,
	template: ProfileMenuTemplate,
	styles: [ProfileMenuCss],
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
		ListItemStandard,
		Tag,
	],
})

/**
 * Fired when selected account avatar is clicked.
 * @public
 */
@event("avatar-click")

/**
 * Fired when the "Manage Account" button is clicked.
 * @public
 */
@event("manage-account-click")

/**
 * Fired when the "Add Account" button is clicked.
 * @public
 */
@event("add-account-click")

/**
 * Fired when account is switched.
 * @param {ProfileMenuAccount} prevSelectedAccount The previously selected account.
 * @param {ProfileMenuAccount} selectedAccount The selected account.
 * @public
 */
@event<ProfileMenuOtherAccountClickEventDetail>("change-account", {
	detail: {
		prevSelectedAccount: { type: ProfileMenuAccount },
		selectedAccount: { type: ProfileMenuAccount },
	},
	cancelable: true,
})

/**
 * Fired when a menu item is clicked.
 * @param {ProfileMenuItem} item The selected `profile menu item`.
 * @public
 */
@event<ProfileMenuItemClickEventDetail>("item-click", {
	detail: {
		item: { type: ProfileMenuItem },
	},
	cancelable: true,
})

/**
 * Fired when the "Sign Out" button is clicked.
 * @public
 */
@event("sign-out-click", {
	cancelable: true,
})
class ProfileMenu extends UI5Element {
	/**
	 * Defines, if the Profile menu dialog is opened.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the ID or DOM Reference of the element at which the profile menu is shown.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default undefined
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string;

	/**
	 * Defines, if the Profile menu will show manage accounts.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showManageAccount = false;

	/**
	 * Defines, if the Profile menu will show other accounts.
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
	menuItems!: Array<ProfileMenuItem>;

	/**
	 * Defines the profile accounts.
	 *
	 * **Note:** If one item is used, it will be shown as selected one. If more than one item is used, the first one will be shown as selected unless
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
	accounts!: Array<ProfileMenuAccount>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * @private
	 */
	_selectedAccount!: ProfileMenuAccount;

	/**
	 * @private
	 */
	_otherAccounts: ProfileMenuAccount[] = [];

	onBeforeRendering() {
		this._selectedAccount = this.accounts.find(account => account.selected) || this.accounts[0];
		this._otherAccounts = this.accounts.filter(account => account !== this._selectedAccount);
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

	_handleAccountSwitch(e: CustomEvent<{ item: ListItemClickEventDetail & { associatedAccount: ProfileMenuAccount } }>) {
		const eventPrevented = !this.fireDecoratorEvent<ProfileMenuOtherAccountClickEventDetail>("change-account", {
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

		 this._closeProfileMenu();
	}

	_handleMenuItemClick(e: CustomEvent<ProfileMenuItemClickEventDetail>) {
		const item = e.detail.item;

		if (!item._popover) {
			const eventPrevented = !this.fireDecoratorEvent<ProfileMenuItemClickEventDetail>("item-click", {
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
		this._closeProfileMenu();
	}

	_handlePopoverAfterClose() {
		this.open = false;
	}

	_openItemSubMenu(item: ProfileMenuItem) {
		if (!item._popover || item._popover.open) {
			return;
		}

		item._popover.opener = item;
		item._popover.open = true;
		item.selected = true;
	}

	_closeItemSubMenu(item: ProfileMenuItem) {
		if (item && item._popover) {
			const openedSibling = item._menuItems.find(menuItem => menuItem._popover && menuItem._popover.open);
			if (openedSibling) {
				this._closeItemSubMenu(openedSibling);
			}

			item._popover.open = false;
			item.selected = false;
		}
	}

	_closeProfileMenu() {
		this.open = false;
	}

	get _manageAccountButtonText() {
		return ProfileMenu.i18nBundle.getText(PROFILE_MENU_MANAGE_ACCOUNT_BUTTON_TXT);
	}

	get _otherAccountsButtonText() {
		return ProfileMenu.i18nBundle.getText(PROFILE_MENU_OTHER_ACCOUNT_BUTTON_TXT);
	}

	get _signOutButtonText() {
		return ProfileMenu.i18nBundle.getText(PROFILE_MENU_SIGN_OUT_BUTTON_TXT);
	}

	get accessibleNameText() {
		return ProfileMenu.i18nBundle.getText(PROFILE_MENU_POPOVER_ACCESSIBLE_NAME);
	}
}

ProfileMenu.define();

export default ProfileMenu;
export type {
	ProfileMenuItemClickEventDetail,
	ProfileMenuOtherAccountClickEventDetail,
};
