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
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import MenuItem from "./MenuItem.js";
import type { ListItemClickEventDetail } from "./List.js";
import MenuTemplate from "./generated/templates/MenuTemplate.lit.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import menuCss from "./generated/themes/Menu.css.js";

const MENU_OPEN_DELAY = 300;
const MENU_CLOSE_DELAY = 400;

type MenuItemClickEventDetail = {
	item: MenuItem,
	text: string,
}

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

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
 * @extends UI5Element
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu",
	renderer: litRender,
	styles: menuCss,
	template: MenuTemplate,
	dependencies: [
		ResponsivePopover,
		Button,
		List,
		MenuItem,
		Icon,
		BusyIndicator,
	],
})

/**
 * Fired when an item is being clicked.
 * <br />
 * <b>Note:</b> Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
 *
 * @allowPreventDefault
 * @param { HTMLElement } item The currently clicked menu item.
 * @param { string } text The text of the currently clicked menu item.
 * @public
 */
@event<MenuItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		item: {
			type: HTMLElement,
		},
		/**
		 * @public
		 */
		text: {
			type: String,
		},
	},
})

/**
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. <b>This event does not bubble.</b>
 * <br />
 * <b>Note:</b> Since 1.14.0 the event is also fired before a sub-menu opens.
 *
 * @public
 * @allowPreventDefault
 * @since 1.10.0
 * @param { HTMLElement } item The <code>ui5-menu-item</code> that triggers opening of the sub-menu or undefined when fired upon root menu opening. <b>Note:</b> available since 1.14.0.
 */
@event<MenuBeforeOpenEventDetail>("before-open", {
	detail: {
		/**
		 * @public
		 */
		item: {
			type: HTMLElement,
		},
	},
})

/**
 * Fired after the menu is opened. <b>This event does not bubble.</b>
 *
 * @public
 * @since 1.10.0
 */
@event("after-open")

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. <b>This event does not bubble.</b>
 *
 * @public
 * @allowPreventDefault
 * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
 * @since 1.10.0
 */
@event<MenuBeforeCloseEventDetail>("before-close", {
	detail: {
		/**
		 * @public
		 */
		escPressed: {
			type: Boolean,
		},
	},
})

/**
 * Fired after the menu is closed. <b>This event does not bubble.</b>
 *
 * @public
 * @since 1.10.0
 */
@event("after-close")
class Menu extends UI5Element {
	/**
	 * Defines the header text of the menu (displayed on mobile).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	headerText!: string;

	/**
	 * Indicates if the menu is open
	 *
	 * @public
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	open!:boolean;

	/**
	 * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
	 *
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	busy!: boolean;

	/**
	 * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover..
	 *
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ validator: Integer, defaultValue: 1000 })
	busyDelay!: number;

	/**
	 * Defines the ID or DOM Reference of the element that the menu is shown at
	 *
	 * @public
	 * @default ""
	 * @since 1.10.0
	 */
	@property({ validator: DOMReference, defaultValue: "" })
	opener!: HTMLElement | string;

	/**
	 * Defines if the menu is sub-menu (not first-level).
	 * @default false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_isSubMenu!: boolean;

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
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	static i18nBundle: I18nBundle;
	_timeout?: Timeout;

	static async onDefine() {
		Menu.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get itemsWithIcon() {
		return !!this.items.filter(item => item.icon !== "").length;
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

	get isSubMenuOpen() {
		return this._popover && this._popover.isOpen();
	}

	get menuHeaderTextPhone() {
		return this._parentMenuItem ? this._parentMenuItem.text : this.headerText;
	}

	onBeforeRendering() {
		const itemsWithIcon = this.itemsWithIcon;

		this.items.forEach(item => {
			item._siblingsWithIcon = itemsWithIcon;
			const subMenu = item._subMenu;
			if (subMenu && subMenu.busy) {
				subMenu.innerHTML = "";
				const fragment = this._clonedItemsFragment(item);
				subMenu.appendChild(fragment);
			}

			if (subMenu) {
				subMenu.busy = item.busy;
				subMenu.busyDelay = item.busyDelay;
			}
		});
	}

	onAfterRendering() {
		if (!this.opener) {
			return;
		}

		if (this.open) {
			const opener = this.getOpener();
			if (opener && !this.isSubMenuOpen) {
				this.showAt(opener);
			}
		} else {
			this.close();
		}
	}

	/**
	 * Shows the Menu near the opener element.
	 *
	 * @param opener the element that the popover is shown at
	 * @public
	 */
	showAt(opener: HTMLElement): void {
		if (!this._isSubMenu) {
			this._parentMenuItem = undefined;
		}
		const popover = this._createPopover();
		popover.showAt(opener, true);

		this.items[0]?.focus();
	}

	/**
	 * Closes the Menu.
	 *
	 * @public
	 */
	close(): void {
		this._popover?.close(false, false, true);
	}

	_createPopover() {
		if (!this._popover) {
			this._popover = this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
		}
		return this._popover;
	}

	getOpener() {
		const rootNode = this.getRootNode() as Document;
		return this.opener instanceof HTMLElement ? this.opener : rootNode?.getElementById?.(this.opener);
	}

	_navigateBack() {
		this._closeItemSubMenu(this._parentMenuItem as MenuItem, true);
	}

	_closeAll() {
		const mainMenu = this._findMainMenu(this);
		mainMenu.close();
	}

	async _createSubMenu(item: MenuItem): Promise<void> {
		if (item._subMenu) {
			return;
		}

		const ctor = this.constructor as typeof Menu;
		const subMenu = document.createElement(ctor.getMetadata().getTag()) as Menu;

		subMenu._isSubMenu = true;
		subMenu._parentMenuItem = item;
		subMenu.busy = item.busy;
		subMenu.busyDelay = item.busyDelay;
		item._subMenu = subMenu;
		const fragment = this._clonedItemsFragment(item);
		subMenu.appendChild(fragment);
		this.shadowRoot!.querySelector(".ui5-menu-submenus")!.appendChild(subMenu);
		await renderFinished();
	}

	_clonedItemsFragment(item: MenuItem) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < item.items.length; ++i) {
			const clonedItem = item.items[i].cloneNode(true);
			fragment.appendChild(clonedItem);
		}

		return fragment;
	}

	_openItemSubMenu(item: MenuItem) {
		const mainMenu = this._findMainMenu(item);
		mainMenu.fireEvent<MenuBeforeOpenEventDetail>("before-open", {
			item,
		}, false, false);
		item._subMenu!.showAt(item);
		item.selected = true;
		item._preventSubMenuClose = true;
		this._openedSubMenuItem = item;
	}

	_closeItemSubMenu(item: MenuItem, forceClose = false, keyboard = false) {
		if (item) {
			if (forceClose) {
				item._preventSubMenuClose = false;
				this._closeSubMenuPopover(item._subMenu!, forceClose, keyboard);
			} else {
				setTimeout(() => this._closeSubMenuPopover(item._subMenu!), 0);
			}
		}
	}

	_closeSubMenuPopover(subMenu: Menu, forceClose = false, keyboard = false) {
		if (subMenu) {
			const parentItem = subMenu._parentMenuItem!;

			if (forceClose || !parentItem._preventSubMenuClose) {
				subMenu.close();
				parentItem.selected = false;
				if (keyboard) {
					parentItem.focus();
				}
				this._openedSubMenuItem = undefined;
			}
		}
	}

	async _prepareSubMenuDesktopTablet(item: MenuItem): Promise<void> {
		this._closeItemSubMenu(this._openedSubMenuItem!, true);

		if (item && item.hasSubmenu) {
			// create new sub-menu
			await this._createSubMenu(item);
			this._openItemSubMenu(item);
		}
		if (this._parentMenuItem) {
			this._parentMenuItem._preventSubMenuClose = true;
		}
	}

	_startOpenTimeout(item: MenuItem) {
		// If theres already a timeout, clears it
		clearTimeout(this._timeout);

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._prepareSubMenuDesktopTablet(item);
		}, MENU_OPEN_DELAY);
	}

	_startCloseTimeout(item: MenuItem) {
		// If theres already a timeout, clears it
		clearTimeout(this._timeout);

		// Sets the new timeout
		this._timeout = setTimeout(() => {
			this._closeItemSubMenu(item);
		}, MENU_CLOSE_DELAY);
	}

	_itemMouseOver(e: MouseEvent) {
		this._busyMouseOver();

		if (isDesktop()) {
			// respect mouseover only on desktop
			const item = e.target as MenuItem;

			item.focus();

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item);
		}
	}

	_busyMouseOver() {
		if (this._parentMenuItem) {
			this._parentMenuItem._preventSubMenuClose = true;
		}
	}

	_itemMouseOut(e: MouseEvent) {
		if (isDesktop()) {
			const item = e.target as MenuItem;

			// Close submenu with 400ms delay
			if (item && item.hasSubmenu && item._subMenu) {
				// try to close the sub-menu
				item._preventSubMenuClose = false;
				this._startCloseTimeout(item);
			}
		}
	}

	async _itemKeyDown(e: KeyboardEvent): Promise<void> {
		const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
		const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);

		if (isEnter(e)) {
			e.preventDefault();
		}
		if (shouldOpenMenu) {
			const item = e.target as MenuItem;
			item.hasSubmenu && await this._prepareSubMenuDesktopTablet(item);
		} else if (shouldCloseMenu && this._isSubMenu && this._parentMenuItem) {
			const parentItemMenu = this._parentMenuItem.parentElement as Menu;
			parentItemMenu._closeItemSubMenu(this._parentMenuItem, true, true);
		}
	}

	async _itemClick(e: CustomEvent<ListItemClickEventDetail>): Promise<void> {
		const item = e.detail.item as MenuItem;

		if (!item.hasSubmenu) {
			// click on an item that doesn't have sub-items fires an "item-click" event
			if (!this._isSubMenu) {
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
		} else {
			await this._prepareSubMenuDesktopTablet(item);
		}
	}

	_findMainMenu(element: MenuItem | Menu) {
		let parentMenu = element instanceof Menu ? element : element.parentElement as Menu;
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
