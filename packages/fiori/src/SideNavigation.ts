import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import {
	isPhone,
	isTablet,
	isCombi,
} from "@ui5/webcomponents-base/dist/Device.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationPopoverTemplate from "./generated/templates/SideNavigationPopoverTemplate.lit.js";
import {
	SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT,
	SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationCss from "./generated/themes/SideNavigation.css.js";
import SideNavigationPopoverCss from "./generated/themes/SideNavigationPopover.css.js";

const PAGE_UP_DOWN_SIZE = 10;

type SideNavigationPopoverContents = {
	item: SideNavigationItem,
	subItems: Array<SideNavigationSubItem>,
};

type SideNavigationSelectionChangeEventDetail = {
	item: SideNavigationItemBase;
};

// used for the inner side navigation used in the SideNavigationPopoverTemplate
type PopupClickEventDetail = {
	target: {
		associatedItem: SideNavigationItemBase
	}
};

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
		ResponsivePopover,
		SideNavigationItem,
		SideNavigationSubItem,
	],
})
/**
 * Fired when the selection has changed via user interaction
 *
 * @event sap.ui.webc.fiori.SideNavigation#selection-change
 * @param {sap.ui.webc.fiori.SideNavigationItemBase} item the clicked item.
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
	 * Defines the main items of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
	 * for the top-level items, and the <code>ui5-side-navigation-sub-item</code> component for second-level items, nested
	 * inside the items.
	 *
	 * @public
	 * @type {sap.ui.webc.fiori.SideNavigationItem[]}
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
	 * @type {sap.ui.webc.fiori.SideNavigationItem[]}
	 * @slot fixedItems
	 * @name sap.ui.webc.fiori.SideNavigation.prototype.fixedItems
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	fixedItems!: Array<SideNavigationItem>;

	/**
	 * @private
	 */
	@property({ type: Object })
	_popoverContents!: SideNavigationPopoverContents;

	@property({ type: Boolean })
	_inPopover!: boolean;

	_flexibleItemNavigation: ItemNavigation;
	_fixedItemNavigation: ItemNavigation;

	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._flexibleItemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledFlexibleItems(),
		});

		this._fixedItemNavigation = new ItemNavigation(this, {
			skipItemsSize: PAGE_UP_DOWN_SIZE, // PAGE_UP and PAGE_DOWN will skip trough 10 items
			navigationMode: NavigationMode.Vertical,
			getItemsCallback: () => this.getEnabledFixedItems(),
		});
	}

	async _onAfterOpen() {
		// as the tree/list inside the popover is never destroyed,
		// item navigation index should be managed, because items are
		// dynamically recreated and tabIndexes are not updated
		const tree = await this.getPickerTree();
		const selectedItem = tree._findSelectedItem(tree.items);
		if (selectedItem) {
			selectedItem.focus();
		} else {
			tree.items[0]?.focus();
		}
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

	handlePopupItemClick(e: PopupClickEventDetail) {
		const associatedItem = e.target.associatedItem;

		associatedItem.fireEvent("click");
		if (associatedItem.selected) {
			this.closePicker();
			return;
		}

		this._selectItem(associatedItem);
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
		return picker.querySelector<SideNavigation>("[ui5-side-navigation]")!;
	}

	get hasHeader() {
		return !!this.header.length;
	}

	get showHeader() {
		return this.hasHeader && !this.collapsed;
	}

	get hasFixedItems() {
		return !!this.fixedItems.length;
	}

	get _rootRole() {
		return this._inPopover ? "None" : undefined;
	}

	get classes() {
		return {
			root: {
				"ui5-sn-phone": isPhone(),
				"ui5-sn-tablet": isTablet(),
				"ui5-sn-combi": isCombi(),
				"ui5-sn-collapsed": this.collapsed,
				"ui5-sn-in-popover": this._inPopover,
			},
		};
	}

	getEnabledFixedItems() : Array<ITabbable> {
		return this.getEnabledItems(this.fixedItems);
	}

	getEnabledFlexibleItems() : Array<ITabbable> {
		return this.getEnabledItems(this.items);
	}

	getEnabledItems(items: Array<SideNavigationItem>) : Array<ITabbable> {
		let result = new Array<ITabbable>();

		items.forEach(item => {
			if (!item.disabled) {
				result.push(item);
			}

			if (!this.collapsed && item.expanded) {
				result = result.concat(item.items.filter(el => !el.disabled));
			}
		});

		return result;
	}

	focusItem(item: SideNavigationItemBase) {
		if (item.isFixedItem) {
			this._fixedItemNavigation.setCurrentItem(item);
		} else {
			this._flexibleItemNavigation.setCurrentItem(item);
		}
	}

	onAfterRendering() {
		const activeElement = this.shadowRoot!.activeElement;
		const flexibleDom = this.shadowRoot!.querySelector(".ui5-sn-flexible")!;
		if (!flexibleDom.contains(activeElement)) {
			const selectedItem = this._findSelectedItem(this.items);
			if (selectedItem) {
				this._flexibleItemNavigation.setCurrentItem(selectedItem);
			} else {
				const focusedItem = this._findFocusedItem(this.items);
				if (!focusedItem) {
					this._flexibleItemNavigation.setCurrentItem(this.items[0]);
				}
			}
		}

		const fixedDom = this.shadowRoot!.querySelector(".ui5-sn-fixed");
		if (!fixedDom?.contains(activeElement)) {
			const selectedItem = this._findSelectedItem(this.fixedItems);
			if (selectedItem) {
				this._fixedItemNavigation.setCurrentItem(selectedItem);
			} else {
				const focusedItem = this._findFocusedItem(this.fixedItems);
				if (!focusedItem) {
					this._fixedItemNavigation.setCurrentItem(this.fixedItems[0]);
				}
			}
		}
	}

	_findFocusedItem(items: Array<SideNavigationItem>) : SideNavigationItemBase | null {
		let focusedItem = null;

		if (this.collapsed) {
			items.forEach(item => {
				if (item._tabIndex === "0") {
					focusedItem = item;
				}
			});
		} else {
			items.forEach(item => {
				if (item._tabIndex === "0") {
					focusedItem = item;
					return;
				}

				if (item.expanded) {
					item.items.forEach(subItem => {
						if (subItem._tabIndex === "0") {
							focusedItem = subItem;
						}
					});
				}
			});
		}

		return focusedItem;
	}

	_findSelectedItem(items: Array<SideNavigationItem>) : SideNavigationItemBase | null {
		let selectedItem = null;

		if (this.collapsed) {
			items.forEach(item => {
				if (item._selected) {
					selectedItem = item;
				}
			});
		} else {
			this._walkItems(items, current => {
				if (current.selected) {
					selectedItem = current;
				}
			});
		}

		return selectedItem;
	}

	_handleItemClick(e: KeyboardEvent | PointerEvent, item: SideNavigationItemBase) {
		if (item.selected && !this.collapsed) {
			item.fireEvent("click");
			return;
		}

		if (this.collapsed && item instanceof SideNavigationItem && item.items.length) {
			e.preventDefault();

			this._popoverContents = {
				item,
				subItems: item.items,
			};

			this.openPicker(item.getFocusDomRef() as HTMLElement);
		} else {
			item.fireEvent("click");

			if (!item.selected) {
				this._selectItem(item);
			}
		}
	}

	_selectItem(item: SideNavigationItemBase) {
		if (item.disabled) {
			return;
		}

		if (!this.fireEvent<SideNavigationSelectionChangeEventDetail>("selection-change", { item }, true)) {
			return;
		}

		this._walk(current => {
			current.selected = false;
		});

		item.selected = true;
	}

	_walk(callback: (current: SideNavigationItemBase) => void) {
		this._walkItems(this.items, callback);
		this._walkItems(this.fixedItems, callback);
	}

	_walkItems(items: Array<SideNavigationItem>, callback: (current: SideNavigationItemBase) => void) {
		items.forEach(current => {
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
