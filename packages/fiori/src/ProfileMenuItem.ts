import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import MenuItem from "@ui5/webcomponents/MenuItem.js";
import ResponsivePopover from "@ui5/webcomponents/ResponsivePopover.js";
import List from "@ui5/webcomponents/List.js";
import Icon from "@ui5/webcomponents/Icon.js";

@customElement({
	tag: "ui5-profile-menu-item",
	renderer: litRender,
	dependencies: [
		MenuItem,
		ResponsivePopover,
		Icon,
		List,
	],
})

/**
	 * @class
	 * Base class for the items that are accepted by the `ui5-profile-menu-item` component.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @public
	 */
class ProfileMenuItem extends MenuItem {

}

ProfileMenuItem.define();

export default ProfileMenuItem;
