import type UserMenuItem from "./UserMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";

export default function (this: UserMenuItem) {
	return [MenuItemTemplate.call(this)];
}
