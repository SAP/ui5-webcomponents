import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";

import UserMenuItemTemplate from "./generated/templates/UserMenuItemTemplate.lit.js";

// Styles
import userMenuItemCss from "./generated/themes/UserMenuItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-user-menu-item` is the item to use inside a `ui5-user-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-user-menu-item` represents a node in a `ui5-user-menu`. The user menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-user-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @experimental
 * @public
 * @since 2.5.0
 */
@customElement({
	tag: "ui5-user-menu-item",
	template: UserMenuItemTemplate,
	styles: [MenuItem.styles, userMenuItemCss],
	dependencies: [...MenuItem.dependencies],
})
class UserMenuItem extends MenuItem {

}

UserMenuItem.define();

export default UserMenuItem;
