import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UserProfile from "./UserProfile.js";
import type ProfileMenuItem from "./ProfileMenuItem.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/ListItemStandard.js";
import ProfileMenuTemplate from "./generated/templates/ProfileMenuTemplate.lit.js";

@customElement({
	tag: "ui5-profile-menu",
	renderer: litRender,
	template: ProfileMenuTemplate,
	dependencies: [
		Dialog,
		UserProfile,
		Avatar,
		Title,
		Label,
		Button,
		Panel,
		Icon,
		List,
		ListItemStandard,
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

	@slot({ type: HTMLElement })
	user!: UserProfile;

	@slot({ type: HTMLElement })
	otherUsers!: Array<UserProfile>;

	@slot({ type: HTMLElement })
	menuItems!: Array<ProfileMenuItem>;

	get userProfile() {
		// TODO: why retun array in case that the propery is defined as object
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.user[0];
	}
}

ProfileMenu.define();

export default ProfileMenu;
