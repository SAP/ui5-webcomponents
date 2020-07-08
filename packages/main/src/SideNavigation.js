import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationItemPopoverContentTemplate from "./generated/templates/SideNavigationItemPopoverContentTemplate.lit.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";
import StandardListItem from "./StandardListItem.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-side-navigation",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
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
			multiple: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		/**
		 * Defines the items in the <code>ui5-side-navigation</code>.
		 *
		 * @public
		 * @slot
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},

		/**
		 * Defines the fixed items in the bottom of the <code>ui5-side-navigation</code>.
		 *
		 * @public
		 * @slot
		 */
		fixedItems: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SideNavigation.prototype */ {
		/**
		 * Fired when the selection has changed via user interaction
		 *
		 * @event sap.ui.webcomponents.main.SideNavigation#selection-change
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
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-side-navigation</code> is used as a standard menu in applications. In order to add menu items use <code>ui5-side-navigation-items</code>.
 *
 * For the <code>ui5-side-navigation</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SideNavigation.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SideNavigation
 * @extends UI5Element
 * @tagname ui5-side-navigation
 * @since 1.0.0-rc.8
 * @appenddocs SideNavigationItem
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
			ResponsivePopover.define(),
			List.define(),
			StandardListItem.define(),
		]);
	}

	onBeforeRendering() {
		this._currentItems = this.buildItems();
		this._currentFixedItems = this.buildItems(true);
	}

	buildItems(isFixedItems = false) {
		const currentItems = isFixedItems ? this.fixedItems : this.items;
		const result = [];

		currentItems.forEach(element => {
			const item = {
				treeItem: element,
				subItems: element.items,
				collapsed: this.collapsed,
			};

			result.push(item);
		});

		return result;
	}

	handleItemClick(event) {
		const item = event.detail.item;
		const currentTree = this._itemsTree === event.target ? this._itemsTree : this._fixedItemsTree; // Gets the tree which must not have selected items
		const otherTree = this._fixedItemsTree === event.target ? this._itemsTree : this._fixedItemsTree; // Gets the tree which must not have selected items
		otherTree._clearSelectedItems();

		this.fireSelectionChange(event);

		if (this.collapsed && item.treeItem.items.length) {
			this._popoverContent = this._generatePopoverContent(event.detail.item);
			this.openPicker(currentTree._getRealItemDomRef(item), item);
		}
	}

	fireSelectionChange(event) {
		const item = event.detail.item.treeItem // if event is fired when not collapsed
		|| event.detail.item.item; // if event is fired from the list in the popover

		this.fireEvent("selection-change", { item });
	}

	_resetSelectedItems(items) {
		items.forEach(item => {
			item.selected = false;

			if (item.subItems) {
				this._resetSelectedItems(item.subItems);
			}
		});
	}

	_generatePopoverContent(item) {
		const result = [{
			text: item.treeItem.text,
			item: item.treeItem,
		}];

		item.treeItem.items.forEach(element => result.push({
			text: element.text,
			item: element,
		}));

		return result;
	}

	getMiddleFocusHelper() {
		return this.getDomRef().querySelector(".ui5-sn-middle-focus-helper");
	}

	_focusOtherList() {
		this.getMiddleFocusHelper().focus();
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef()).querySelector("ui5-responsive-popover");
	}

	async openPicker(opener) {
		const responsivePopover = await this.getPicker();

		responsivePopover.open(opener);
	}

	get _itemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-items-tree");
	}

	get _fixedItemsTree() {
		return this.getDomRef().querySelector("#ui5-sn-fixed-items-tree");
	}

	get _shoudlShowSubItems() {
		return !this.collapsed;
	}
}

SideNavigation.define();

export default SideNavigation;
