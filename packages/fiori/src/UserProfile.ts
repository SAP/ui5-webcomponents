import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Title from "@ui5/webcomponents/Title.js";
import Label from "@ui5/webcomponents/Label.js";
import Avatar from "@ui5/webcomponents/Avatar.js";
import UserProfileTemplate from "./generated/templates/UserProfileTemplate.lit.js";

@customElement({
	tag: "ui5-user-profile",
	renderer: litRender,
	template: UserProfileTemplate,
	dependencies: [
		Label,
		Avatar,
		Title,
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
class UserProfile extends UI5Element {
	@property({ type: String })
	avatar = "";

	@property({ type: String })
	firstName!: string;

	@property({ type: String })
	lastName!: string;

	@property({ type: String })
	subtitle1 = "";

	@property({ type: String })
	subtitle2 = "";
}

UserProfile.define();

export default UserProfile;
