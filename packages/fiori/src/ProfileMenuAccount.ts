import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
	tag: "ui5-profile-menu-account",
})
/**
 * @class
 * ### Overview
 *
 * The `ui5-profile-menu-account` represents an account in the `ui5-profile-menu`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ProfileMenuAccount.js";`
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 */
class ProfileMenuAccount extends UI5Element {
	/**
	 * Defines, the avatar of the profile.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	avatar = "";

	/**
	 * Defines, the title text of the profile.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	text!: string;

	/**
	 * Defines, the subtitle1 of the profile.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	subtitle1?: string;

	/**
	 * Defines, the subtitle2 of the profile.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	subtitle2?: string;

	/**
	 * Defines, if the profile is selected
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

ProfileMenuAccount.define();

export default ProfileMenuAccount;
