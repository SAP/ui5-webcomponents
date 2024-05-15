import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import MenuItem from "./MenuItem.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-navigation-menu-item` is the item to use inside a `ui5-navigation-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * ### Usage
 *
 * `ui5-navigation-menu-item` is an abstract element, representing a node in a `ui5-navigation-menu`. The navigation menu itself is rendered as a list,
 * and each `ui5-navigation-menu-item` is represented by a list item (`ui5-li`) in that list. Therefore, you should only use
 * `ui5-navigation-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NavigationMenuItem.js";`
 * @constructor
 * @extends MenuItem
 * @abstract
 * @since 1.22.0
 * @private
 */
@customElement("ui5-navigation-menu-item")
class NavigationMenuItem extends MenuItem {
	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the `click` event should be registered.
	 * @public
	 * @default undefined
	 * @since 1.22.0
	 */
	@property()
	href?: string;

	/**
	 * Defines the component target.
	 *
	 * **Notes:**
	 *
	 * - `_self`
	 * - `_top`
	 * - `_blank`
	 * - `_parent`
	 * - `_search`
	 *
	 * **This property must only be used when the `href` property is set.**
	 * @public
	 * @default undefined
	 * @since 1.22.0
	 */
	@property()
	target?: string;

	get isExternalLink() {
		return this.href && this.target === "_blank";
	}
}

NavigationMenuItem.define();

export default NavigationMenuItem;
