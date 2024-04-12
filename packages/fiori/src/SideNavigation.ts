import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import NavigationMenu from "@ui5/webcomponents/dist/NavigationMenu.js";
import type { MenuItemClickEventDetail } from "@ui5/webcomponents/dist/Menu.js";
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
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SideNavigationGroup from "./SideNavigationGroup.js";
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
	item: SideNavigationItemBase,
};

type PopupSideNavigationItem = SideNavigationItem & { associatedItem: SideNavigationSelectableItemBase };

// used for the inner side navigation used in the SideNavigationPopoverTemplate
type NavigationMenuClickEventDetail = MenuItemClickEventDetail & {
	item: Pick<MenuItemClickEventDetail, "item"> & {
		associatedItem: SideNavigationSelectableItemBase,
	}
};

/**
 * @class
 *
 * ### Overview
 *
 * The `SideNavigation` is used as a standard menu in applications.
 * It consists of three containers: header (top-aligned), main navigation section (top-aligned) and the secondary section (bottom-aligned).
 *
 *  - The header is meant for displaying user related information - profile data, avatar, etc.
 *  - The main navigation section is related to the user’s current work context
 *  - The secondary section is mostly used to link additional information that may be of interest (legal information, developer communities, external help, contact information and so on).
 *
 * ### Usage
 *
 * Use the available `ui5-side-navigation-group`, `ui5-side-navigation-item`
 * and `ui5-side-navigation-sub-item` components to build your menu.
 * The items can consist of text only or an icon with text. The use or non-use of icons must be consistent for all items on one level.
 * You must not combine entries with and without icons on the same level. We strongly recommend that you do not use icons on the second level.
 *
 * ### Keyboard Handling
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigation.js"`
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";` (for `ui5-side-navigation-group`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";` (for `ui5-side-navigation-item`)
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";` (for `ui5-side-navigation-sub-item`)
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
		SideNavigationGroup,
		SideNavigationItem,
		SideNavigationSubItem,
		NavigationMenu,
	],
})
/**
 * Fired when the selection has changed via user interaction
 *
 * @param {SideNavigationSelectableItemBase} item the clicked item.
 * @allowPreventDefault
 * @public
 */
@event<SideNavigationSelectionChangeEventDetail>("selection-change", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
})
class SideNavigation extends UI5Element {
	/**
	 * Defines whether the `ui5-side-navigation` is expanded or collapsed.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	collapsed!: boolean;

	/**
	 * Defines the main items of the `ui5-side-navigation`. Use the `ui5-side-navigation-item` component
	 * for the top-level items, and the `ui5-side-navigation-sub-item` component for second-level items, nested
	 * inside the items.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationItemBase>;

	/**
	 * Defines the fixed items at the bottom of the `ui5-side-navigation`. Use the `ui5-side-navigation-item` component
	 * for the fixed items, and optionally the `ui5-side-navigation-sub-item` component to provide second-level items inside them.
	 *
	 * **Note:** In order to achieve the best user experience, it is recommended that you keep the fixed items "flat" (do not pass sub-items)
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	fixedItems!: Array<SideNavigationItemBase>;

	/**
	 * Defines the header of the `ui5-side-navigation`.
	 *
	 * **Note:** The header is displayed when the component is expanded - the property `collapsed` is false;
	 *
	 * @public
	 * @since 1.0.0-rc.11
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * @private
	 */
	@property({ type: Object })
	_popoverContents!: SideNavigationPopoverContents;

	@property({ type: Boolean })
	inPopover!: boolean;
	_isOverflow!: boolean;
	_flexibleItemNavigation: ItemNavigation;
	_fixedItemNavigation: ItemNavigation;

	@property({ type: Object, multiple: true })
	_menuPopoverItems!: Array<HTMLElement>;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isTouchDevice!: boolean;

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

	onBeforeRendering() {
		super.onBeforeRendering();

		this._getAllItems(this.items as Array<SideNavigationItem | SideNavigationGroup>).concat(this._getAllItems(this.fixedItems as Array<SideNavigationItem | SideNavigationGroup>)).forEach(item => {
			item.sideNavCollapsed = this.collapsed;
			item.inPopover = this.inPopover;
			item.sideNavigation = this;
		});
	}

	async _onAfterPopoverOpen() {
		// as the tree/list inside the popover is never destroyed,
		// item navigation index should be managed, because items are
		// dynamically recreated and tabIndexes are not updated
		const tree = await this.getPickerTree();
		const selectedItem = tree._findSelectedItem(tree.items as Array<SideNavigationItem | SideNavigationGroup>);
		if (selectedItem) {
			selectedItem.focus();
		} else {
			tree.items[0]?.focus();
		}
	}

	async _onBeforePopoverOpen() {
		const popover = await this.getPicker();
		(popover?.opener as HTMLElement)?.classList.add("ui5-sn-item-active");
	}

	async _onBeforePopoverClose() {
		const popover = await this.getPicker();
		(popover?.opener as HTMLElement)?.classList.remove("ui5-sn-item-active");
	}

	async _onBeforeMenuOpen() {
		const popover = await this.getOverflowPopover();
		(popover?.opener as HTMLElement)?.classList.add("ui5-sn-item-active");
	}

	async _onBeforeMenuClose() {
		const popover = await this.getOverflowPopover();
		(popover?.opener as HTMLElement)?.classList.remove("ui5-sn-item-active");
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

	async handlePopupItemClick(e: KeyboardEvent | PointerEvent) {
		const associatedItem = (e.target as PopupSideNavigationItem).associatedItem;

		associatedItem.fireEvent("click");
		if (associatedItem.selected) {
			this.closePicker();
			return;
		}

		this._selectItem(associatedItem);
		this.closePicker();

		await renderFinished();
		this._popoverContents.item.getDomRef()!.classList.add("ui5-sn-item-no-hover-effect");
	}

	async handleOverflowItemClick(e: CustomEvent<NavigationMenuClickEventDetail>) {
		const associatedItem = e.detail?.item.associatedItem;

		associatedItem.fireEvent("click");
		if (associatedItem.selected) {
			this.closeMenu();
			return;
		}

		this._selectItem(associatedItem);

		this.closeMenu();
		await renderFinished();

		// When subitem is selected in collapsed mode parent element should be focused
		if (associatedItem.nodeName.toLowerCase() === "ui5-side-navigation-sub-item") {
			const parent = associatedItem.parentElement as SideNavigationItem;
			this.focusItem(parent);
			parent?.focus();
		} else {
			this.focusItem(associatedItem);
			associatedItem?.focus();
		}
	}

	async getOverflowPopover() {
		return (await this.getStaticAreaItemDomRef())!.querySelector<NavigationMenu>(".ui5-side-navigation-overflow-menu")!;
	}

	async getPicker() {
		return (await this.getStaticAreaItemDomRef())!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async openPicker(opener: HTMLElement) {
		opener.classList.add("ui5-sn-item-active");

		const responsivePopover = await this.getPicker();
		responsivePopover.opener = opener;
		responsivePopover.showAt(opener);
	}

	async openOverflowMenu(opener: HTMLElement) {
		opener.classList.add("ui5-sn-item-active");

		const menu = await this.getOverflowPopover();
		menu.opener = opener;
		menu.showAt(opener);
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
		return this.inPopover ? "none" : undefined;
	}

	get classes() {
		return {
			root: {
				"ui5-sn-collapsed": this.collapsed,
			},
		};
	}

	getEnabledFixedItems() : Array<ITabbable> {
		return this.getEnabledItems(this.fixedItems as Array<SideNavigationItem | SideNavigationGroup>);
	}

	getEnabledFlexibleItems() : Array<ITabbable> {
		const items = this.getEnabledItems(this.items as Array<SideNavigationItem | SideNavigationGroup>);

		if (this._overflowItem) {
			items.push(this._overflowItem);
		}

		return items;
	}

	getEnabledItems(items: Array<SideNavigationItem | SideNavigationGroup>) : Array<ITabbable> {
		const result = new Array<ITabbable>();

		this._getFocusableItems(items).forEach(item => {
			if (item.classList.contains("ui5-sn-item-hidden")) {
				return;
			}

			if (!item.disabled) {
				result.push(item);
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
		if (!this.getDomRef()?.matches(":focus-within")) {
			let selectedItem = this._findSelectedItem(this.items as Array<SideNavigationItem | SideNavigationGroup>);
			if (selectedItem) {
				this._flexibleItemNavigation.setCurrentItem(selectedItem);
			}

			selectedItem = this._findSelectedItem(this.fixedItems as Array<SideNavigationItem | SideNavigationGroup>);
			if (selectedItem) {
				this._fixedItemNavigation.setCurrentItem(selectedItem);
			}
		}

		if (this.collapsed) {
			this.handleResize();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);

		this.isTouchDevice = isPhone() || (isTablet() && !isCombi());
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	handleResize() {
		this._updateOverflowItems();
	}

	_updateOverflowItems() {
		const domRef = this.getDomRef();
		if (!this.collapsed || !domRef) {
			return null;
		}

		const overflowItem = this._overflowItem!;
		const flexibleContentDomRef : HTMLElement = domRef.querySelector(".ui5-sn-flexible")!;
		if (!overflowItem) {
			return null;
		}

		overflowItem.classList.add("ui5-sn-item-hidden");

		const overflowItems = this.overflowItems;

		let itemsHeight = overflowItems.reduce<number>((sum, itemRef) => {
			itemRef.classList.remove("ui5-sn-item-hidden");
			return sum + itemRef.offsetHeight;
		}, 0);

		const { paddingTop, paddingBottom } = window.getComputedStyle(flexibleContentDomRef);
		const listHeight = flexibleContentDomRef?.offsetHeight - parseInt(paddingTop) - parseInt(paddingBottom);

		if (itemsHeight <= listHeight) {
			return;
		}

		overflowItem.classList.remove("ui5-sn-item-hidden");

		itemsHeight = overflowItem.offsetHeight;

		const selectedItem = overflowItems.find(item => {
			return item instanceof SideNavigationSelectableItemBase && item._selected;
		});

		if (selectedItem && selectedItem instanceof SideNavigationItemBase) {
			const selectedItemDomRef = selectedItem.getDomRef();
			const { marginTop, marginBottom } = window.getComputedStyle(selectedItemDomRef!);

			itemsHeight += selectedItemDomRef!.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);
		}

		overflowItems.forEach(item => {
			if (item === selectedItem) {
				return;
			}

			let itemDomRef;

			if (item instanceof SideNavigationItemBase) {
				itemDomRef = item.getDomRef()!;
			} else {
				itemDomRef = item;
			}

			const { marginTop, marginBottom } = window.getComputedStyle(itemDomRef);
			itemsHeight += itemDomRef.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom);

			if (itemsHeight > listHeight) {
				item.classList.add("ui5-sn-item-hidden");
			}
		});

		this._flexibleItemNavigation._init();
	}

	_findFocusedItem(items: Array<SideNavigationItem | SideNavigationGroup>) : SideNavigationItemBase | undefined {
		return this._getFocusableItems(items).find(item => item.forcedTabIndex === "0");
	}

	_getSelectableItems(items: Array<SideNavigationItem | SideNavigationGroup>) : Array<SideNavigationSelectableItemBase> {
		return items.reduce((result, item) => {
			return result.concat(item.selectableItems);
		}, new Array<SideNavigationSelectableItemBase>());
	}

	_getFocusableItems(items: Array<SideNavigationItem | SideNavigationGroup>) : Array<SideNavigationItemBase> {
		return items.reduce((result, item) => {
			return result.concat(item.focusableItems);
		}, new Array<SideNavigationItemBase>());
	}

	_getAllItems(items: Array<SideNavigationItem | SideNavigationGroup>) : Array<SideNavigationItemBase> {
		return items.reduce((result, item) => {
			return result.concat(item.allItems);
		}, new Array<SideNavigationItemBase>());
	}

	_findSelectedItem(items: Array<SideNavigationItem | SideNavigationGroup>) : SideNavigationSelectableItemBase | undefined {
		return this._getSelectableItems(items).find(item => item._selected);
	}

	get overflowItems() : Array<HTMLElement> {
		return (this.items as Array<SideNavigationItem | SideNavigationGroup>).reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<HTMLElement>());
	}

	_handleItemClick(e: KeyboardEvent | PointerEvent, item: SideNavigationSelectableItemBase) {
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

		this.openOverflowMenu(this._overflowItem!.getFocusDomRef() as HTMLElement);
	}

	_getOverflowItems(): Array<SideNavigationSelectableItemBase> {
		const overflowClass = "ui5-sn-item-hidden";
		const result: Array<SideNavigationSelectableItemBase> = [];

		this.overflowItems.forEach(item => {
			if (item instanceof SideNavigationSelectableItemBase
				&& item.classList.contains(overflowClass)) {
				 result.push(item);
			}
		});

		return result;
	}

	_selectItem(item: SideNavigationSelectableItemBase) {
		if (item.disabled) {
			return;
		}

		if (!this.fireEvent<SideNavigationSelectionChangeEventDetail>("selection-change", { item }, true)) {
			return;
		}

		let items = this._getSelectableItems(this.items as Array<SideNavigationItem | SideNavigationGroup>);
		items = items.concat(this._getSelectableItems(this.fixedItems as Array<SideNavigationItem | SideNavigationGroup>));

		items.forEach(current => {
			current.selected = false;
		});

		item.selected = true;
	}

	get _overflowItem() {
		const overflowItem = this.shadowRoot!.querySelector<SideNavigationItem>(".ui5-sn-item-overflow");
		if (overflowItem) {
			overflowItem.sideNavigation = this;
		}

		return overflowItem;
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
