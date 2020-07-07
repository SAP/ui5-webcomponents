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

		currentItems.forEach((element, index) => {
			const item = {
				treeItem: element,
				level: 1,
				subItems: element.items,
				collapsed: this.collapsed,
				index,
			};

			result.push(item);

			// if (element.items && element.items.length) {
			// 	element.items.forEach(element => {
			// 		const item = {
			// 			treeItem: element,
			// 			level: 2,
			// 		};

			// 		result.push(item)
			// 	})
			// }
		});

		return result;
	}

	handleItemClick(event) {
		// if (event.target === this._itemsTree) {
		// 	// this._resetSelectedItems(this.items);
		// } else if (event.target === this._fixedItemsTree) {
		// 	// this._resetSelectedItems(this.fixedItems);
		// 	this._fixedItemsTree.fireEvent("")
		// }

		event.detail.item.fireEvent("reset-selected");

		this.fireSelectionChange(event);

		if (this.collapsed) {
			this.openPicker(event.target);
			this._popoverContent = event.target._generatePopoverContent();
		}
	}

	fireSelectionChange(event) {
		const item = (event.detail && event.detail.item && event.detail.item.item) || event.target;
		const isArrowClicked = event.detail && event.detail.isIconClicked;

		this.fireEvent("selection-change", {
			item,
			isArrowClicked,
		});
	}

	_resetSelectedItems(items) {
		items.forEach(item => {
			item.selected = false;

			if (item.subItems) {
				this._resetSelectedItems(item.subItems);
			}
		});
	}

	getMiddleFocusHelper() {
		return this.getDomRef().querySelector(".ui5-sn-middle-focus-helper");
	}

	_focusOtherList() {
		this.getMiddleFocusHelper().focus();
	}

	// focusNext(event) {
	// 	const eventTarget = event.target;
	// 	const isFixedItems = eventTarget.slot === "fixedItems";
	// 	let currentItems = Array.from(this.querySelectorAll(`ui5-side-navigation-item${isFixedItems ? "[slot='fixedItems']" : ":not([slot])"}`));

	// 	if (eventTarget.expandable && eventTarget.expanded) {
	// 		eventTarget.items[0].focus();
	// 	} else if (currentItems.indexOf(eventTarget) > -1 && currentItems.indexOf(eventTarget) < currentItems.length - 1) {
	// 		if (currentItems[currentItems.indexOf(eventTarget) + 1].getClientRects().length === 0) {
	// 			currentItems = isFixedItems ? this.fixedItems : this.items;
	// 		}
	// 		const nextItem = currentItems[currentItems.indexOf(eventTarget) + 1];

	// 		if (nextItem) {
	// 			nextItem.focus();
	// 		}
	// 	}
	// }

	// focusPrevious(event) {
	// 	const eventTarget = event.target;
	// 	const isFixedItems = eventTarget.slot === "fixedItems";
	// 	let currentItems = Array.from(this.querySelectorAll(`ui5-side-navigation-item${isFixedItems ? "[slot='fixedItems']" : ":not([slot])"}`));

	// 	if (eventTarget.expandable && eventTarget.expanded) {
	// 		const _prevItem = currentItems[currentItems.indexOf(eventTarget) - 1];

	// 		if (_prevItem) {
	// 			_prevItem.focus();
	// 		}
	// 	} else if (currentItems.indexOf(eventTarget) > 0) {
	// 		if (currentItems[currentItems.indexOf(eventTarget) - 1].getClientRects().length === 0) {
	// 			currentItems = isFixedItems ? this.fixedItems : this.items;
	// 		}

	// 		currentItems[currentItems.indexOf(eventTarget) - 1].focus();
	// 	}
	// }

	async getPicker() {
		return (await this.getStaticAreaItemDomRef()).querySelector("ui5-responsive-popover");
	}

	async openPicker(opener) {
		if (!opener.items.length) {
			return;
		}
		const responsivePopover = await this.getPicker();

		responsivePopover.open(opener);
	}

	async closePicker() {
		const responsivePopover = await this.getPicker();

		responsivePopover.close();
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
