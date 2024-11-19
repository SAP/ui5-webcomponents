import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
// import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import MenuItem from "@ui5/webcomponents/dist/MenuItem.js";

import ProfileMenuItemTemplate from "./generated/templates/ProfileMenuItemTemplate.lit.js";

// Styles
import profileMenuItemCss from "./generated/themes/ProfileMenuItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-profile-menu-item` is the item to use inside a `ui5-profile-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-profile-menu-item` represents a node in a `ui5-profile-menu`. The profile menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-profile-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ProfileMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @experimental
 * @public
 */
@customElement({
	tag: "ui5-profile-menu-item",
	template: ProfileMenuItemTemplate,
	styles: [MenuItem.styles, profileMenuItemCss],
	dependencies: [Icon, List, ResponsivePopover],
})
class ProfileMenuItem extends MenuItem {

}

ProfileMenuItem.define();

export default ProfileMenuItem;
