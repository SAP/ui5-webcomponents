import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
	tag: "ui5-user-menu-account",
})
/**
 * @class
 * ### Overview
 *
 * The `ui5-user-menu-account` represents an account in the `ui5-user-menu`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";`
 *
 * @constructor
 * @extends UI5Element
 * @experimental
 * @public
 */
class UserMenuAccount extends UI5Element {
	/**
	 * Defines, the avatar of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	avatar?: string;

	/**
	 * Defines, the avatar initials of the user.
	 *
	 * @default null
	 * @public
	 */
	@property({ type: String })
	initials = null;

	/**
	 * Defines, the title text of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	text = "";

	/**
	 * Defines, the subtitle1 of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	subtitle1 = "";

	/**
	 * Defines, the subtitle2 of the user.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	subtitle2 = "";

	/**
	 * Defines, if the user is selected
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;
}

UserMenuAccount.define();

export default UserMenuAccount;
