import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import {
	isLeft,
	isRight,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import {
	isPhone,
	isTablet,
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import type MenuItem from "./MenuItem.js";
import type { ListItemClickEventDetail } from "./List.js";
import staticAreaMenuTemplate from "./generated/templates/MenuTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import staticAreaMenuCss from "./generated/themes/Menu.css.js";

type CurrentItem = {
	item: MenuItem,
	position: number,
	ariaHasPopup: string | undefined,
}

const MENU_OPEN_DELAY = 300;
const MENU_CLOSE_DELAY = 400;

type MenuItemClickEventDetail = {
	item: MenuItem,
	text: string,
}

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

type OpenerStandardListItem = StandardListItem & { associatedItem: MenuItem };

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-menu</code> component represents a hierarchical menu structure.
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-menu</code> contains <code>ui5-menu-item</code> components.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * <h3>Keyboard Handling</h3>
 *
 * The <code>ui5-menu</code> provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 * <ul>
 * <li><code>Arrow Up</code> / <code>Arrow Down</code> - Navigates up and down the menu items that are currently visible.</li>
 * <li><code>Arrow Right</code>, <code>Space</code> or <code>Enter</code> - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.</li>
 * <li><code>Arrow Left</code> or <code>Escape</code> - Closes the currently opened sub-menu.</li>
 * </ul>
 * Note: if the text ditrection is set to Right-to-left (RTL), <code>Arrow Right</code> and <code>Arrow Left</code> functionality is swapped.
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Menu.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Menu
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-menu
 * @appenddocs sap.ui.webc.main.MenuItem
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu",
	renderer: litRender,
	staticAreaStyles: staticAreaMenuCss,
	staticAreaTemplate: staticAreaMenuTemplate,
	dependencies: [
		ResponsivePopover,
		Button,
		List,
		StandardListItem,
		Icon,
		BusyIndicator,
	],
})

/**
 * Fired when an item is being clicked.
 * <b>Note:</b> Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
 *
 * @event sap.ui.webc.main.Menu#item-click
 * @allowPreventDefault
 * @param { HTMLElement } item The currently clicked menu item.
 * @param { string } text The text of the currently clicked menu item.
 * @public
 */
@event("item-click", {
	detail: {
		item: {
			type: HTMLElement,
		},
		text: {
			type: String,
		},
	},
})

/**
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. <b>This event does not bubble.</b>
 * <b>Note:</b> Since 1.14.0 the event is also fired before a sub-menu opens.
 *
 * @public
 * @event sap.ui.webc.main.Menu#before-open
 * @allowPreventDefault
 * @since 1.10.0
 * @param { HTMLElement } item The <code>ui5-menu-item</code> that triggers opening of the sub-menu or undefined when fired upon root menu opening. <b>Note:</b> available since 1.14.0.
 */
@event("before-open", {
	detail: {
		item: {
			type: HTMLElement,
		},
	},
})

/**
 * Fired after the menu is opened. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Menu#after-open
 * @since 1.10.0
 */
@event("after-open")

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Menu#before-close
 * @allowPreventDefault
 * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
 * @since 1.10.0
 */
@event("before-close", {
	detail: {
		escPressed: { type: Boolean },
	},
})

/**
 * Fired after the menu is closed. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Menu#after-close
 * @since 1.10.0
 */
@event("after-close")
class Menu extends UI5Element {
	/**
	 * Defines the header text of the menu (displayed on mobile).
	 *
	 * @name sap.ui.webc.main.Menu.prototype.headerText
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Indicates if the menu is open
	 *
	 * @name sap.ui.webc.main.Menu.prototype.open
	 * @public
	 * @type {boolean}
	 * @defaultvalue false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	open!:boolean;

	/**
	 * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
	 *
	 * @name sap.ui.webc.main.Menu.prototype.busy
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover..
	 *
	 * @name sap.ui.webc.main.Menu.prototype.busyDelay
	 * @type {sap.ui.webc.base.types.Integer}
	 * @defaultValue 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the ID or DOM Reference of the element that the menu is shown at
	 *
	 * @name sap.ui.webc.main.Menu.prototype.opener
	 * @public
	 * @type {sap.ui.webc.base.types.DOMReference}
	 * @defaultvalue ""
	 * @since 1.10.0
	 */
	@property({ validator: DOMReference, defaultValue: "" })
	opener!: HTMLElement | string;

	/**
	 * Defines if the menu is sub-menu (not first-level).
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isSubMenu!: boolean;

	/**
	 * Stores id of a list item that opened sub-menu.
	 * @type {string}
	 * @private
	 */
	@property()
	_subMenuOpenerId!: string;

	/**
	 * Defines the currently available menu items.
	 * (in case of non-phone devices these are the items of the menu,
	 * but for phone devices the items of the currently opened sub-menu
	 * will be populated here)
	 * @type {array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_currentItems!: Array<CurrentItem>;

	/**
	 * Stores a list of parent menu items for each sub-menu (on phone).
	 * @type {array}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	_parentItemsStack!: Array<MenuItem>;

	/**
	 * Stores the ResponsivePopover instance
	 */
	@property({ type: Object, defaultValue: undefined })
	_popover?: ResponsivePopover;

	/**
	 * Stores parent menu item (if there is such).
	 */
	@property({ type: Object, defaultValue: undefined })
	_parentMenuItem?: MenuItem;

	/**
	 * Stores menu item that have sub-menu opened.
	 */
	@property({ type: Object, defaultValue: undefined })
	_openedSubMenuItem?: MenuItem;

	/**
	 * Defines the items of this component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-menu-item</code> for the intended design.
	 *
	 * @name sap.ui.webc.main.Menu.prototype.default
	 * @type {sap.ui.webc.main.IMenuItem[]}
	 * @slot items
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	static i18nBundle: I18nBundle;
	_timeout?: Timeout;

	static async onDefine() {
		Menu.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get itemsWithChildren() {
		return !!this._currentItems.filter(item => item.item.items.length).length;
	}

	get itemsWithIcon() {
		return !!this._currentItems.filter(item => item.item.icon !== "").length;
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get placementType() {
		const placement = this.isRtl ? "Left" : "Right";
		return this._isSubMenu ? placement : "Bottom";
	}

	get verticalAlign() {
		return this._isSubMenu ? "Top" : "Bottom";
	}

	get labelBack() {
		return Menu.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelClose() {
		return Menu.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get isPhone() {
		return isPhone();
	}

	get isSubMenuOpened() {
		return !!this._parentMenuItem;
	}

	get menuHeaderTextPhone() {
		return this._parentMenuItem ? this._parentMenuItem.text : this.headerText;
	}

	onBeforeRendering() {
		!isPhone() && this._prepareCurrentItems(this.items);

		const itemsWithChildren = this.itemsWithChildren;
		const itemsWithIcon = this.itemsWithIcon;

		this._currentItems.forEach(item => {
			item.item._siblingsWithChildren = itemsWithChildren;
			item.item._siblingsWithIcon = itemsWithIcon;
			const subMenu = item.item._subMenu;
			const menuItem = item.item;
			if (subMenu && subMenu.busy) {
				subMenu.innerHTML = "";
				const fragment = this._clonedItemsFragment(menuItem);
				subMenu.appendChild(fragment);
			}

			if (subMenu) {
				subMenu.busy = item.item.busy;
				subMenu.busyDelay = item.item.busyDelay;
			}
		});
	}

	onAfterRendering() {
		if (!this.opener) {
			return;
		}
		if (this.open) {
			const rootNode = this.getRootNode() as Document;
			const opener = this.opener instanceof HTMLElement ? this.opener : rootNode && rootNode.getElementById(this.opener);

			if (opener) {
				this.showAt(opener);
			}
		} else {
			this.close();
		}
	}

	/**
	 * Shows the Menu near the opener element.
	 * @param {HTMLElement} opener the element that the popover is shown at
	 * @public
	 * @method
	 * @name sap.ui.webc.main.Menu#showAt
	 */
	async showAt(opener: HTMLElement) {
		if (isPhone()) {
			this._prepareCurrentItems(this.items);
			this._parentItemsStack = [];
		}
		if (!this._isSubMenu) {
			this._parentMenuItem = undefined;
		}
		const popover = await this._createPopover();
		popover.initialFocus = "";
		for (let index = 0; index < this._currentItems.length; index++) {
			if (!this._currentItems[index].item.disabled) {
				popover.initialFocus = `${this._id}-menu-item-${index}`;
				break;
			}
		}
		popover.showAt(opener);
	}

	/**
	 * Closes the Menu.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.Menu#close
	 */
	close() {
		if (this._popover) {
			if (isPhone()) {
				this._parentItemsStack = [];
			}
			this._popover.close();
			this._popover.resetFocus();
		}
	}

	async _createPopover() {
		const staticAreaItemDomRef = await this.getStaticAreaItemDomRef();
		this._popover = staticAreaItemDomRef!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
		return this._popover;
	}

	_navigateBack() {
		const parentMenuItem = this._parentItemsStack.pop();

		this.focus();
		if (parentMenuItem) {
			const parentMenuItemParent = parentMenuItem.parentElement as MenuItem;
			this._prepareCurrentItems(parentMenuItemParent.items);
			this._parentMenuItem = this._parentItemsStack.length ? this._parentItemsStack[this._parentItemsStack.length - 1] : undefined;
		}
	}

	_prepareCurrentItems(items: Array<MenuItem>) {
		this._currentItems = items.map((item, index) => {
			return {
				item,
				position: index + 1,
				ariaHasPopup: item.hasSubmenu ? "menu" : undefined,
			};
		});
	}

	_createSubMenu(item: MenuItem, openerId: string) {
		const ctor = this.constructor as typeof Menu;
		const subMenu = document.createElement(ctor.getMetadata().getTag()) as Menu;

		subMenu._isSubMenu = true;
		subMenu.setAttribute("id", `submenu-${openerId}`);
		subMenu._parentMenuItem = item;
		subMenu.busy = item.busy;
		subMenu.busyDelay = item.busyDelay;
		const fragment = this._clonedItemsFragment(item);
		subMenu.appendChild(fragment);
		this.staticAreaItem!.shadowRoot!.querySelector(".ui5-menu-submenus")!.appendChild(subMenu);
		item._subMenu = subMenu;
	}

	_clonedItemsFragment(item: MenuItem) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < item.items.length; ++i) {
			const clonedItem = item.items[i].cloneNode(true);
			fragment.appendChild(clonedItem);
		}

		return fragment;
	}

	_openItemSubMenu(item: MenuItem, opener: HTMLElement, actionId: string) {
		const mainMenu = this._findMainMenu(item);
		mainMenu.fireEvent<MenuBeforeOpenEventDetail>("before-open", {
			item,
		}, false, false);
		item._subMenu!.showAt(opener);
		item._preventSubMenuClose = true;
		this._openedSubMenuItem = item;
		this._subMenuOpenerId = actionId;
	}

	_closeItemSubMenu(item: MenuItem, forceClose = false) {
		if (item) {
			if (forceClose) {
				item._preventSubMenuClose = false;
				this._closeSubMenuPopover(item._subMenu!, true);
			} else {
				setTimeout(() => this._closeSubMenuPopover(item._subMenu!), 0);
			}
		}
	}

	_closeSubMenuPopover(subMenu: Menu, forceClose = false) {
		if (subMenu) {
			const parentItem = subMenu._parentMenuItem!;

			if (forceClose || !parentItem._preventSubMenuClose) {
				subMenu.close();
				subMenu.remove();
				parentItem._subMenu = undefined;
				this._openedSubMenuItem = undefined;
				this._subMenuOpenerId = "";
			}
		}
	}

	_prepareSubMenuDesktopTablet(item: MenuItem, opener: HTMLElement, actionId: string) {
		if (actionId !== this._subMenuOpenerId || (item && item.hasSubmenu)) {
			// close opened sub-menu if there is any opened
			this._closeItemSubMenu(this._openedSubMenuItem!, true);
		}
		if (item && item.hasSubmenu) {
			// create new sub-menu
			this._createSubMenu(item, actionId);
			this._openItemSubMenu(item, opener, actionId);
		}
		if (this._parentMenuItem) {
			this._parentMenuItem._preventSubMenuClose = true;
		}
	}

	_prepareSubMenuPhone(item: MenuItem) {
		this._prepareCurrentItems(item.items);
		this._parentMenuItem = item;
		this._parentItemsStack.push(item);
	}

	_startOpenTimeout(item: MenuItem, opener: OpenerStandardListItem, hoverId: string) {
		// If theres already a timeout, clears it
		this._clearTimeout();

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._prepareSubMenuDesktopTablet(item, opener, hoverId);
		}, MENU_OPEN_DELAY);
	}

	_startCloseTimeout(item: MenuItem) {
		// If theres already a timeout, clears it
		this._clearTimeout();

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._closeItemSubMenu(item);
		}, MENU_CLOSE_DELAY);
	}

	_clearTimeout() {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
	}

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const opener = e.target as OpenerStandardListItem;
			const item = opener.associatedItem;
			const hoverId = opener.getAttribute("id")!;

			opener.focus();

			// If there is a pending close operation, cancel it
			this._clearTimeout();

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item, opener, hoverId);
		}
	}

	_busyMouseOver() {
		if (this._parentMenuItem) {
			this._parentMenuItem._preventSubMenuClose = true;
		}
	}

	_itemMouseOut(e: MouseEvent) {
		if (isDesktop()) {
			const opener = e.target as OpenerStandardListItem;
			const item = opener.associatedItem;

			// If there is a pending open operation, cancel it
			this._clearTimeout();

			// Close submenu with 400ms delay
			if (item && item.hasSubmenu && item._subMenu) {
				// try to close the sub-menu
				item._preventSubMenuClose = false;
				this._startCloseTimeout(item);
			}
		}
	}

	_itemKeyDown(e: KeyboardEvent) {
		const isMenuClose = this.isRtl ? isRight(e) : isLeft(e);
		const isMenuOpen = this.isRtl ? isLeft(e) : isRight(e);

		if (isEnter(e)) {
			e.preventDefault();
		}
		if (isMenuOpen) {
			const opener = e.target as OpenerStandardListItem;
			const item = opener.associatedItem;
			const hoverId = opener.getAttribute("id")!;

			item.hasSubmenu && this._prepareSubMenuDesktopTablet(item, opener, hoverId);
		} else if (isMenuClose && this._isSubMenu && this._parentMenuItem) {
			const parentMenuItemParent = this._parentMenuItem.parentElement as Menu;
			parentMenuItemParent._closeItemSubMenu(this._parentMenuItem, true);
		}
	}

	_itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const opener = e.detail.item as OpenerStandardListItem;
		const item = opener.associatedItem;
		const actionId = opener.getAttribute("id")!;

		if (!item.hasSubmenu) {
			// click on an item that doesn't have sub-items fires an "item-click" event
			if (!this._isSubMenu) {
				if (isPhone()) {
					this._parentMenuItem = undefined;
				}
				// fire event if the click is on top-level menu item
				const prevented = !this.fireEvent<MenuItemClickEventDetail>("item-click", {
					"item": item,
					"text": item.text,
				}, true, false);

				if (!prevented) {
					this._popover!.close();
				}
			} else {
				const mainMenu = this._findMainMenu(item);
				const prevented = !mainMenu.fireEvent<MenuItemClickEventDetail>("item-click", {
					"item": item,
					"text": item.text,
				}, true, false);

				if (!prevented) {
					let openerMenuItem = item;
					let parentMenu = openerMenuItem.parentElement as Menu;
					do {
						openerMenuItem._preventSubMenuClose = false;
						this._closeItemSubMenu(openerMenuItem);
						parentMenu = openerMenuItem.parentElement as Menu;
						openerMenuItem = parentMenu._parentMenuItem as MenuItem;
					} while (parentMenu._parentMenuItem);

					mainMenu._popover!.close();
				}
			}
		} else if (isPhone()) {
			// prepares and opens sub-menu on phone
			this._prepareSubMenuPhone(item);
		} else if (isTablet()) {
			// prepares and opens sub-menu on tablet
			this._prepareSubMenuDesktopTablet(item, opener, actionId);
		}
	}

	_findMainMenu(item: MenuItem) {
		let parentMenu = item.parentElement as Menu;
		while (parentMenu._parentMenuItem) {
			parentMenu = parentMenu._parentMenuItem.parentElement as Menu;
		}

		return parentMenu;
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireEvent<MenuBeforeOpenEventDetail>("before-open", {}, true, false);

		if (prevented) {
			this.open = false;
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this.open = true;
		this.fireEvent("after-open", {}, false, false);
	}

	_beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>) {
		const prevented = !this.fireEvent<MenuBeforeCloseEventDetail>("before-close", { escPressed: e.detail.escPressed }, true, false);

		if (prevented) {
			this.open = true;
			e.preventDefault();
			return;
		}

		if (this._openedSubMenuItem) {
			this._openedSubMenuItem._preventSubMenuClose = false;
			this._closeItemSubMenu(this._openedSubMenuItem);
		}
	}

	_afterPopoverClose() {
		this.open = false;
		this.fireEvent("after-close", {}, false, false);
	}
}

Menu.define();

export default Menu;
export type {
	MenuItemClickEventDetail,
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
};
