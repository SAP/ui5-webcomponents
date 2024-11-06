import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import MenuItem from "@ui5/webcomponents/MenuItem.js";
import MenuSeparator from "@ui5/webcomponents/MenuSeparator.js";
import ProfileMenuItemTemplate from "./generated/templates/ProfileMenuItemTemplate.lit.js";

@customElement({
	tag: "ui5-profile-menu-item",
	renderer: litRender,
	template: ProfileMenuItemTemplate,
	dependencies: [
		MenuItem,
		MenuSeparator,
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
class ProfileMenuItem extends UI5Element {
	@property({ type: String })
	icon = "";

	@property({ type: String })
	text = "";

	@property({ type: Boolean })
	separator = false;
}

ProfileMenuItem.define();

export default ProfileMenuItem;
