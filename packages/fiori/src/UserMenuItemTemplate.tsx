import type UserMenuItem from "./UserMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";

export default function UserMenuItemTemplate(this: UserMenuItem) {
	return [MenuItemTemplate.call(this)];
}
