import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import ResponsivePopover from "@ui5/webcomponents/ResponsivePopover.js";
import type UserProfile from "./UserProfile.js";
import type ProfileMenuItem from "./ProfileMenuItem.js";
import ProfileMenuTemplate from "./generated/templates/ProfileMenuTemplate.lit.js";
import ProfileMenuCss from "./generated/themes/ProfileMenu.css.js";

@customElement({
	tag: "ui5-profile-menu",
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
	 * @class
	 * Base class for the items that are accepted by the `ui5-profile-menu` component.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @public
	 */
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
	 * Defines, id of user setting menu which will be open
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	userSetting? = undefined;

	@slot({ type: HTMLElement })
	users!: Array<UserProfile>;

	@slot({
		type: HTMLElement,
		"default": true,
	})
	menuItems!: Array<ProfileMenuItem>;

	_selectedUser!: UserProfile;
	_otherUsers: UserProfile[] = [];

	onBeforeRendering() {
		this._selectedUser = this.users.find(user => user.selected) || this.users[0]; // zTODO: why || this.users[0] is needed. Without it lit template is complaining about possible undefined value
		this._otherUsers = this.users.filter(user => user !== this._selectedUser);
	}
	_avatarClicked() {
		this.fireDecoratorEvent("user-avatar-clicked");
	}

	_addAccountClicked() {
		this.fireDecoratorEvent("add-account-clicked");
	}

	_menuItemClicked() {
		this.fireDecoratorEvent("menu-item-clicked");
	}

	_accountSwitch() {
		this.fireDecoratorEvent("user-account-switch");
	}

	_openSettingDialog() {
		const rootNode = this.getRootNode();
		let userSettingDialog;
		if (rootNode instanceof Document && this.userSetting) {
			userSettingDialog = rootNode.getElementById(this.userSetting) as Dialog;
		}

		if (userSettingDialog) {
			userSettingDialog.open = true;
		}
	}
}

ProfileMenu.define();

export default ProfileMenu;
