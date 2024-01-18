import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import NavigationMenu from "@ui5/webcomponents/dist/NavigationMenu.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
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
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/circle-task-2.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import type SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationTemplate from "./generated/templates/SideNavigationTemplate.lit.js";
import SideNavigationPopoverTemplate from "./generated/templates/SideNavigationPopoverTemplate.lit.js";

import {
	SIDE_NAVIGATION_POPOVER_HIDDEN_TEXT,
	SIDE_NAVIGATION_COLLAPSED_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_LIST_ARIA_ROLE_DESC,
	SIDE_NAVIGATION_OVERFLOW_ACCESSIBLE_NAME,
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

// used for the inner side navigation used in the SideNavigationPopoverTemplate
type NavigationMenuClickEventDetail = {
	item: {
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
 * @extends UI5Element
 * @since 1.0.0-rc.8
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
		Icon,
		NavigationMenu,
	],
})
/**
 * Fired when the selection has changed via user interaction
 *
 * @param {SideNavigationItemBase} item the clicked item.
 * @allowPreventDefault
 * @public
 */
@event<NavigationMenuClickEventDetail>("selection-change", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
class SideNavigation extends UI5Element {
	/**
	 * Defines whether the <code>ui5-side-navigation</code> is expanded or collapsed.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	collapsed!: boolean;

	/**
	 * Defines the main items of the <code>ui5-side-navigation</code>. Use the <code>ui5-side-navigation-item</code> component
	 * for the top-level items, and the <code>ui5-side-navigation-sub-item</code> component for second-level items, nested
	 * inside the items.
	 *
	 * @public
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
	 * @since 1.0.0-rc.11
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
	_isOverflow!: boolean;
	_flexibleItemNavigation: ItemNavigation;
	_fixedItemNavigation: ItemNavigation;

	@property({ type: Object, multiple: true })
	_menuPopoverItems!: Array<HTMLElement>;

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

		this._handleResizeBound = this.handleResize.bind(this);
		this._isOverflow = false;
	}

	_handleResizeBound: () => void;

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

	get overflowAccessibleName() {
		return SideNavigation.i18nBundle.getText(SIDE_NAVIGATION_OVERFLOW_ACCESSIBLE_NAME);
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

	handleOverflowItemClick(e: CustomEvent<NavigationMenuClickEventDetail>) {
		const associatedItem = e.detail?.item.associatedItem;

		associatedItem.fireEvent("click");
		if (associatedItem.selected) {
			this.closeMenu();
			return;
		}

		this._selectItem(associatedItem);

		// When subitem is selected in collapsed mode parent element should be focused
		if (associatedItem.nodeName.toLowerCase() === "ui5-side-navigation-sub-item") {
			const parent = associatedItem.parentElement as SideNavigationItem;
			this._flexibleItemNavigation.setCurrentItem(parent);
		} else {
			this._flexibleItemNavigation.setCurrentItem(associatedItem);
		}

		this.closeMenu();
	}

	async getOverflowPopover() {
		return (await this.getStaticAreaItemDomRef())!.querySelector<NavigationMenu>(".ui5-side-navigation-overflow-menu")!;
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef())!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async openPicker(opener: HTMLElement) {
		const responsivePopover = await this.getPicker();
		responsivePopover.showAt(opener);
	}

	async openOverflowMenu(opener: HTMLElement) {
		const menu = await this.getOverflowPopover();
		menu.showAt(opener);
		menu.opener = opener;
	}

	async closePicker() {
		const responsivePopover = await this.getPicker();
		responsivePopover.close();
	}

	async closeMenu() {
		const menu = await this.getOverflowPopover();
		menu.close();
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
		return this._inPopover ? "none" : undefined;
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
		if (!this._overflowDom) {
			return this.getEnabledItems(this.items);
		}
		this._overflowDom._tabIndex = "0";
		return [...this.getEnabledItems(this.items), this._overflowDom];
	}

	getEnabledItems(items: Array<SideNavigationItem>) : Array<ITabbable> {
		let result = new Array<ITabbable>();

		items.forEach(item => {
			if (item.getDomRef()?.classList.contains("ui5-sn-item-hidden")) {
				return;
			}

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
		if (this.collapsed) {
			this.handleResize();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	handleResize() {
		const domRef = this.getDomRef(),
			overflowItemRef = domRef?.querySelector(".ui5-sn-item-overflow");

		this._updateOverflowItems();

		if (this._getOverflowItems().length > 0 && this.collapsed) {
			overflowItemRef?.classList.remove("ui5-sn-item-hidden");
		} else {
			overflowItemRef?.classList.add("ui5-sn-item-hidden");
		}
	}

	_updateOverflowItems() {
		const domRef = this.getDomRef();
		if (!this.collapsed || !domRef) {
			return null;
		}

		const overflowItemRef:HTMLElement = domRef.querySelector(".ui5-sn-item-overflow")!;
		const flexibleContentDomRef:HTMLElement = domRef.querySelector(".ui5-sn-flexible")!;
		if (!overflowItemRef) {
			return null;
		}

		overflowItemRef.classList.add("ui5-sn-item-hidden");

		const itemsRefs = [...domRef.querySelectorAll<HTMLElement>(".ui5-sn-flexible .ui5-sn-item-level1:not(.ui5-sn-item-overflow)")];

		let itemsHeight = itemsRefs.reduce<number>((sum, itemRef) => {
			itemRef.classList.remove("ui5-sn-item-hidden");
			return sum + itemRef.offsetHeight;
		}, 0);

		const { paddingTop, paddingBottom } = window.getComputedStyle(flexibleContentDomRef);
		const listHeight = flexibleContentDomRef?.offsetHeight - parseInt(paddingTop) - parseInt(paddingBottom);

		overflowItemRef.classList.remove("ui5-sn-item-hidden");

		itemsHeight = overflowItemRef.offsetHeight;
		const oSelectedItemRef = domRef.querySelector(".ui5-sn-item-selected") as HTMLElement;
		if (oSelectedItemRef) {
			const { marginTop, marginBottom } = window.getComputedStyle(oSelectedItemRef);

			itemsHeight += oSelectedItemRef.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);
		}

		itemsRefs.forEach(itemRef => {
			if (itemRef === oSelectedItemRef) {
				return;
			}

			const { marginTop, marginBottom } = window.getComputedStyle(itemRef);
			itemsHeight += itemRef.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

			if (itemsHeight >= listHeight) {
				itemRef.classList.add("ui5-sn-item-hidden");
			}
		});
	}

	_findFocusedItem(items: Array<SideNavigationItem>) : SideNavigationItemBase | undefined {
		let focusedItem;

		if (this.collapsed) {
			focusedItem = items.find(item => item._tabIndex === "0");
		} else {
			focusedItem = this._getWithNestedItems(items, true).find(item => item._tabIndex === "0");
		}

		return focusedItem;
	}

	_getWithNestedItems(items: Array<SideNavigationItem>, expandedOnly = false): Array<SideNavigationItemBase> {
		let result = new Array<SideNavigationItemBase>();

		items.forEach(item => {
			result.push(item);

			if (!expandedOnly || item.expanded) {
				result = result.concat(item.items);
			}
		});

		return result;
	}

	_findSelectedItem(items: Array<SideNavigationItem>) : SideNavigationItemBase | undefined {
		let selectedItem;

		if (this.collapsed) {
			selectedItem = items.find(item => item._selected);
		} else {
			selectedItem = this._getWithNestedItems(items).find(current => current.selected);
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
			this._isOverflow = false;

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

	_handleOverflowClick() {
		this._isOverflow = true;
		this._menuPopoverItems = this._getOverflowItems();

		this.openOverflowMenu(this._overflowDom as HTMLElement);
	}

	_getOverflowItems(): Array<SideNavigationItem> {
		const overflowClass = "ui5-sn-item-hidden";
		const result: Array<SideNavigationItem> = [];

		this.items.forEach(item => {
			if (item.getDomRef().classList.contains(overflowClass)) {
				 result.push(item);
			}
		});
		return result;
	}

	async _afterMenuClose() {
		const selectedItem = this._findSelectedItem(this.items)!;

		await renderFinished();
		selectedItem.getDomRef().focus();
	}

	_selectItem(item: SideNavigationItemBase) {
		if (item.disabled) {
			return;
		}

		if (!this.fireEvent<SideNavigationSelectionChangeEventDetail>("selection-change", { item }, true)) {
			return;
		}

		let items = this._getWithNestedItems(this.items);
		items = items.concat(this._getWithNestedItems(this.fixedItems));

		items.forEach(current => {
			current.selected = false;
		});

		item.selected = true;

		if (this.collapsed && item.getDomRef()?.classList.contains("ui5-sn-item-hidden")) {
			item.getDomRef().classList.remove("ui5-sn-item-hidden");
		}
	}

	get _overflowDom() {
		return this.shadowRoot!.querySelector<SideNavigationItem>(".ui5-sn-item-overflow");
	}

	get isOverflow() {
		return this._isOverflow;
	}

	_onkeydownOverflow(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._handleOverflowClick();
		}
	}

	_onkeyupOverflow(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._handleOverflowClick();
		}
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
