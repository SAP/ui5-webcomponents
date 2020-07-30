import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Tree from "@ui5/webcomponents/dist/Tree.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationItemPopoverContentTemplate from "./generated/templates/SideNavigationItemPopoverContentTemplate.lit.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.SideNavigation.prototype */ {
		/**
		 * Defines whether the <code>ui5-side-navigation</code> is expanded or collapsed.
		 *
		 * @public
		 * @type {boolean}
		 * @defaultvalue false
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_popoverContent: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.SideNavigation.prototype */ {
		/**
		 * Defines the main items of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
		 * for the top-level items, and the <code>ui5-side-navigation-subitem</code> component for second-level items, nested
		 * inside the items.
		 *
		 * @public
		 * @slot
		 */
		"default": {
			propertyName: "items",
			invalidateParent: true,
			type: HTMLElement,
		},

		/**
		 * Defines the fixed items at the bottom of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
		 * for the fixed items, and optionally the <code>ui5-side-navigation-subitem</code> component to provide second-level items inside them.
		 *
		 * <b>Note:</b> In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
		 *
		 * @public
		 * @slot
		 */
		fixedItems: {
			type: HTMLElement,
			invalidateParent: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.SideNavigation.prototype */ {
		/**
		 * Fired when the selection has changed via user interaction
		 *
		 * @event sap.ui.webcomponents.fiori.SideNavigation#selection-change
		 * @param {HTMLElement} item the clicked item.
		 * @public
		 */
		"selection-change": {
			item: {
				type: HTMLElement,
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>SideNavigation</code> is used as a standard menu in applications.
 * It consists of two containers: the main navigation section (top-aligned) and the secondary section (bottom-aligned).
 * Usually the main navigation section is related to the user’s current work context,
 * whereas the secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).

 * <h3>Usage</h3>
 *
 * Use the available <code>ui5-side-navigation-item</code> and <code>ui5-side-navigation-sub-item</code> components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigation.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.SideNavigation
 * @extends UI5Element
 * @tagname ui5-side-navigation
 * @since 1.0.0-rc.8
 * @appenddocs SideNavigationItem SideNavigationSubItem
 * @public
 */
class SideNavigation extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SideNavigationCss;
	}

	static get template() {
		return SideNavigationTemplate;
	}

	static get staticAreaTemplate() {
		return SideNavigationItemPopoverContentTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Tree.define(),
			ResponsivePopover.define(),
		]);
	}

	onBeforeRendering() {
		this._items = this.items.map(item => {
			return {
				item,
				selected: ((item.items.some(subItem => subItem.selected) && this.collapsed) || item.selected),
			};
		});

		this._fixedItems = this.fixedItems.map(item => {
			return {
				item,
				selected: ((item.items.some(subItem => subItem.selected) && this.collapsed) || item.selected),
			};
		});
	}

	_setSelectedItem(item) {
		this._walk(current => {
			current.selected = false;
		});
		item.selected = true;

		this.fireEvent("selection-change", { item });
	}

	_buildPopoverContent(item) {
		this._popoverContent = {
			mainItem: item,
			mainItemSelected: item.selected && !item.items.some(subItem => subItem.selected),
			subItems: item.items,
		};
	}

	handleTreeItemClick(event) {
		const treeItem = event.detail.item;
		const item = treeItem.associatedItem;

		if (item.selected && !this.collapsed) {
			return;
		}

		if (this.collapsed && item.items.length) {
			this._buildPopoverContent(item);
			const currentTree = this._itemsTree === event.target ? this._itemsTree : this._fixedItemsTree;
			this.openPicker(currentTree._getListItemForTreeItem(treeItem));
		} else {
			this._setSelectedItem(item);
		}
	}

	handleListItemClick(event) {
		const listItem = event.detail.item;
		const item = listItem.associatedItem;

		if (item.selected) {
			return;
		}

		this._setSelectedItem(item);
		this.closePicker();
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef()).querySelector("ui5-responsive-popover");
	}

	async openPicker(opener) {
		const responsivePopover = await this.getPicker();
		responsivePopover.open(opener);
	}

	async closePicker(opener) {
		const responsivePopover = await this.getPicker();
		responsivePopover.close();
	}

	get _itemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-items-tree");
	}

	get _fixedItemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-fixed-items-tree");
	}

	_walk(callback) {
		this.items.forEach(current => {
			callback(current);

			current.items.forEach(currentSubitem => {
				callback(currentSubitem);
			});
		});

		this.fixedItems.forEach(current => {
			callback(current);

			current.items.forEach(currentSubitem => {
				callback(currentSubitem);
			});
		});
	}
}

SideNavigation.define();

export default SideNavigation;
