import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	SIDE_NAVIGATION_POPOVER_LIST_ITEMS_ARIA_ROLE,
	SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.SideNavigationItem.prototype */ {
		/**
		 * Defines the text of the item.
		 *
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		text: {
			type: String,
		},

		/**
		 * Defines the icon of the item.
		 * <br><br>
		 *
		 * The SAP-icons font provides numerous options.
		 * <br>
		 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @public
		 * @type {string}
		 * @defaultvalue ""
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines if the item is expanded
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		expanded: {
			type: Boolean,
		},

		/**
		 * Defines whether the subitem is selected
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines whether pressing the whole item or only pressing the icon will show/hide the items's sub items(if present).
		 * If set to true, pressing the whole item will toggle the sub items, and it won't fire the <code>click</code> event.
		 * By default, only pressing the arrow icon will toggle the sub items & the click event will be fired if the item is pressed outside of the icon.
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.11
		 */
		wholeItemToggleable: {
			type: Boolean,
		},

		/**
		 * Defines the tooltip of the component.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.16
		 */
		 title: {
			type: String,
		},
	},

	events: /** @lends sap.ui.webcomponents.fiori.SideNavigationItem.prototype */ {
	},

	slots: /** @lends sap.ui.webcomponents.fiori.SideNavigationItem.prototype */ {
		/**
		 * If you wish to nest menus, you can pass inner menu items to the default slot.
		 *
		 * @type {sap.ui.webcomponents.fiori.ISideNavigationSubItem[]}
		 * @public
		 * @slot items
		 */
		"default": {
			propertyName: "items",
			invalidateOnChildChange: true,
			type: HTMLElement,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-item</code> is used within <code>ui5-side-navigation</code> only.
 * Via the <code>ui5-side-navigation-item</code> you control the content of the <code>SideNavigation</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.SideNavigationItem
 * @extends UI5Element
 * @tagname ui5-side-navigation-item
 * @public
 * @since 1.0.0-rc.8
 * @implements sap.ui.webcomponents.fiori.ISideNavigationItem
 */
class SideNavigationItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	get _tooltip() {
		return this.title || this.text;
	}

	get ariaRoleDescNavigationListItem() {
		return this.collapsed ? SideNavigationItem.i18nBundle.getText(SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE) : SideNavigationItem.i18nBundle.getText(SIDE_NAVIGATION_POPOVER_LIST_ITEMS_ARIA_ROLE);
	}

	static async onDefine() {
		[SideNavigationItem.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			super.onDefine(),
		]);
	}
}

SideNavigationItem.define();

export default SideNavigationItem;
