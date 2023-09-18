import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import List from "@ui5/webcomponents/dist/List.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import Tree from "@ui5/webcomponents/dist/Tree.js";
import TreeItem from "@ui5/webcomponents/dist/TreeItem.js";
import type { TreeItemClickEventDetail } from "@ui5/webcomponents/dist/Tree.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationPopoverTemplate from "./generated/templates/SideNavigationPopoverTemplate.lit.js";
import {
	SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT,
	SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_COLLAPSED_LIST_ITEMS_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";
import SideNavigationPopoverCss from "./generated/themes/SideNavigationPopover.css.js";

type SideNavigationPopoverContents = {
	mainItem: SideNavigationItem,
	mainItemSelected: boolean,
	selectedSubItemIndex: number,
	subItems: Array<SideNavigationSubItem>,
};

type TSideNavigationItem = SideNavigationItem | SideNavigationSubItem;

type SideNavigationSelectionChangeEventDetail = {
	item: TSideNavigationItem;
};

type ItemHasAssociatedItemField = {
	item: {
		associatedItem: TSideNavigationItem
	}
};

// used for the inner side navigation used in the SideNavigationPopoverTemplate
type InnerSideNavigationSelectionChangeEventDetail = SideNavigationSelectionChangeEventDetail & ItemHasAssociatedItemField;
type InnerTreeClickEventDetail = TreeItemClickEventDetail & ItemHasAssociatedItemField;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>SideNavigation</code> is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 * <ul>
 * <li>The header is meant for displaying user related information - profile data, avatar, etc.</li>
 * <li>The main navigation section is related to the user’s current work context</li>
 * <li>The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on). </li>
 * </ul>
 *
 * <h3>Usage</h3>
 *
 * Use the available <code>ui5-side-navigation-item</code> and <code>ui5-side-navigation-sub-item</code> components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigation.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";</code> (for <code>ui5-side-navigation-item</code>)
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";</code> (for <code>ui5-side-navigation-sub-item</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.SideNavigation
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-side-navigation
 * @since 1.0.0-rc.8
 * @appenddocs sap.ui.webc.fiori.SideNavigationItem sap.ui.webc.fiori.SideNavigationSubItem
 * @public
 */

@customElement({
	tag: "ui5-side-navigation",
	fastNavigation: true,
	renderer: litRender,
	template: SideNavigationTemplate,
	staticAreaTemplate: SideNavigationPopoverTemplate,
	styles: SideNavigationCss,
	staticAreaStyles: SideNavigationPopoverCss,
	dependencies: [
		List,
		StandardListItem,
		Tree,
		TreeItem,
		ResponsivePopover,
		SideNavigationItem,
		SideNavigationSubItem,
	],
})
/**
 * Fired when the selection has changed via user interaction
 *
 * @event sap.ui.webc.fiori.SideNavigation#selection-change
 * @param {sap.ui.webc.fiori.ISideNavigationItem|sap.ui.webc.fiori.ISideNavigationSubItem} item the clicked item.
 * @allowPreventDefault
 * @public
 */
@event("selection-change", {
	detail: {
		item: { type: HTMLElement },
	},
})
class SideNavigation extends UI5Element {
	/**
	 * Defines whether the <code>ui5-side-navigation</code> is expanded or collapsed.
	 *
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.SideNavigation.prototype.collapsed
	 */
	@property({ type: Boolean })
	collapsed!: boolean;

	/**
	 * @private
	 */
	@property({ type: Object })
	_popoverContents!: SideNavigationPopoverContents;

	/**
	 * Defines the main items of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
	 * for the top-level items, and the <code>ui5-side-navigation-sub-item</code> component for second-level items, nested
	 * inside the items.
	 *
	 * @public
	 * @type {sap.ui.webc.fiori.ISideNavigationItem[]}
	 * @slot items
	 * @name sap.ui.webc.fiori.SideNavigation.prototype.default
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationItem>;

	/**
	 * Defines the header of the <code>ui5-side-navigation</code>.
	 *
	 * <br><br>
	 * <b>Note:</b> The header is displayed when the component is expanded - the property <code>collapsed</code> is false;
	 *
	 * @public
	 * @type {HTMLElement[]}
	 * @since 1.0.0-rc.11
	 * @slot header
	 * @name sap.ui.webc.fiori.SideNavigation.prototype.header
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * Defines the fixed items at the bottom of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
	 * for the fixed items, and optionally the <code>ui5-side-navigation-sub-item</code> component to provide second-level items inside them.
	 *
	 * <b>Note:</b> In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
	 *
	 * @public
	 * @type {sap.ui.webc.fiori.ISideNavigationItem[]}
	 * @slot fixedItems
	 * @name sap.ui.webc.fiori.SideNavigation.prototype.fixedItems
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	fixedItems!: Array<SideNavigationItem>;

	static i18nBundle: I18nBundle;

	get _items() {
		return this.items.map(this._createTreeItem);
	}

	get _fixedItems() {
		return this.fixedItems.map(this._createTreeItem);
	}

	_createTreeItem = (item: SideNavigationItem): { item: SideNavigationItem, selected: boolean } => {
		return {
			item,
			selected: (item.items.some(subItem => subItem.selected) && this.collapsed) || item.selected,
		};
	}

	_setSelectedItem(item: TSideNavigationItem) {
		if (!this.fireEvent<SideNavigationSelectionChangeEventDetail>("selection-change", { item }, true)) {
			return;
		}

		this._walk(current => {
			current.selected = false;
		});
		item.selected = true;
	}

	_buildPopoverContent(item: SideNavigationItem) {
		this._popoverContents = {
			mainItem: item,
			mainItemSelected: item.selected && !item.items.some(subItem => subItem.selected),
			// add one as the first item is the main item
			selectedSubItemIndex: item.items.findIndex(subItem => subItem.selected) + 1,
			subItems: item.items,
		};
	}

	async _onAfterOpen() {
		// as the tree/list inside the popover is never destroyed,
		// item navigation index should be managed, because items are
		// dynamically recreated and tabIndexes are not updated
		const tree = await this.getPickerTree();
		const index = this._popoverContents.selectedSubItemIndex;
		tree.focusItemByIndex(index);
	}

	get accSideNavigationPopoverHiddenText() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT);
	}

	get ariaRoleDescNavigationList() {
		let key = SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC;
		if (this.collapsed) {
			key = SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC;
		}

		return SideNavigation.i18nBundle.getText(key);
	}

	get ariaRoleDescNavigationListItem() {
		let key = SIDE_NAVIGATION_LIST_ITEMS_ARIA_ROLE_DESC;
		if (this.collapsed) {
			key = SIDE_NAVIGATION_COLLAPSED_LIST_ITEMS_ARIA_ROLE_DESC;
		}

		return SideNavigation.i18nBundle.getText(key);
	}

	handleTreeItemClick(e: CustomEvent<InnerTreeClickEventDetail>) {
		const treeItem = e.detail.item;
		const item = treeItem.associatedItem;

		if (item instanceof SideNavigationItem && !item.wholeItemToggleable) {
			item.fireEvent("click");
		} else if (item instanceof SideNavigationSubItem) {
			item.fireEvent("click");
		} else {
			item.expanded = !item.expanded;
		}

		if (item.selected && !this.collapsed) {
			return;
		}

		if (this.collapsed && item instanceof SideNavigationItem && item.items.length) {
			this._buildPopoverContent(item);

			let tree = this._itemsTree;
			if (tree !== e.target as Tree) {
				tree = this._fixedItemsTree;
			}

			this.openPicker(tree!._getListItemForTreeItem(treeItem)!);
		} else if (!item.selected) {
			this._setSelectedItem(item);
		}
	}

	handleInnerSelectionChange(e: CustomEvent<InnerSideNavigationSelectionChangeEventDetail>) {
		const item = e.detail.item;
		const { associatedItem } = item;

		associatedItem.fireEvent("click");
		if (associatedItem.selected) {
			return;
		}

		this._setSelectedItem(associatedItem);
		this.closePicker();
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef())!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async openPicker(opener: HTMLElement) {
		const responsivePopover = await this.getPicker();
		responsivePopover.showAt(opener);
	}

	async closePicker() {
		const responsivePopover = await this.getPicker();
		responsivePopover.close();
	}

	async getPickerTree() {
		const picker = await this.getPicker();
		const sideNav = picker.querySelector<SideNavigation>("[ui5-side-navigation]")!;
		return sideNav._itemsTree!;
	}

	get hasHeader() {
		return !!this.header.length;
	}

	get showHeader() {
		return this.hasHeader && !this.collapsed;
	}

	get _itemsTree() {
		return this.getDomRef()!.querySelector<Tree>("#ui5-sn-items-tree");
	}

	get _fixedItemsTree() {
		return this.getDomRef()!.querySelector<Tree>("#ui5-sn-fixed-items-tree");
	}

	_walk(callback: (current: TSideNavigationItem) => void) {
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

	static async onDefine() {
		[SideNavigation.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents-fiori"),
			super.onDefine(),
		]);
	}
}

SideNavigation.define();

export default SideNavigation;

export type {
	SideNavigationSelectionChangeEventDetail,
};
