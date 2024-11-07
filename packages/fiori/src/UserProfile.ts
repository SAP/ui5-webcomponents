import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
	tag: "ui5-user-profile",
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
	text?: string;

	@property({ type: String })
	subtitle1?: string;

	@property({ type: String })
	subtitle2?: string;

	@property({ type: Boolean })
	selected = false;
}

UserProfile.define();

export default UserProfile;
