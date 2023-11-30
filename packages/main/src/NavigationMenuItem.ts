import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import MenuItem from "./MenuItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-navigation-menu-item</code> is the item to use inside a <code>ui5-navigation-menu</code>.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-navigation-menu-item</code> is an abstract element, representing a node in a <code>ui5-navigation-menu</code>. The navigation menu itself is rendered as a list,
 * and each <code>ui5-navigation-menu-item</code> is represented by a list item (<code>ui5-li</code>) in that list. Therefore, you should only use
 * <code>ui5-navigation-menu-item</code> directly in your apps. The <code>ui5-li</code> list item is internal for the list, and not intended for public use.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/NavigationMenuItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.NavigationMenuItem
 * @extends sap.ui.webc.main.MenuItem
 * @abstract
 * @tagname ui5-navigation-menu-item
 * @implements sap.ui.webc.main.INavigationMenuItem
 * @since
 * @public
 */
@customElement("ui5-navigation-menu-item")
class NavigationMenuItem extends MenuItem {
	/**
	 * Defines the link target URI. Supports standard hyperlink behavior.
	 * If a JavaScript action should be triggered,
	 * this should not be set, but instead an event handler
	 * for the <code>click</code> event should be registered.
	 *
	 * @public
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.NavigationMenu.prototype.href
	 * @since 1.19.0
	 */
	@property()
	href!: string;

	/**
	 * Defines the component target.
	 * <br><br>
	 * <b>Notes:</b>
	 *
	 * <ul>
	 * <li><code>_self</code></li>
	 * <li><code>_top</code></li>
	 * <li><code>_blank</code></li>
	 * <li><code>_parent</code></li>
	 * <li><code>_search</code></li>
	 * </ul>
	 *
	 * <b>This property must only be used when the <code>href</code> property is set.</b>
	 *
	 * @public
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.NavigationMenu.prototype.target
	 * @since 1.19.0
	 */
	@property()
	target!: string;
}

NavigationMenuItem.define();

export default NavigationMenuItem;
