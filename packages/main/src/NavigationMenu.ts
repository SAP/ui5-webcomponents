import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isDesktop,
	isPhone,
	isTablet,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { ListItemClickEventDetail } from "./List.js";
import Menu from "./Menu.js";
import StandardListItem from "./StandardListItem.js";
import MenuItem from "./MenuItem.js";
import type NavigationMenuItem from "./NavigationMenuItem.js";
import staticAreaMenuTemplate from "./generated/templates/NavigationMenuTemplate.lit.js";

// Styles
import staticAreaNavigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import staticAreaMenuCss from "./generated/themes/Menu.css.js";

import {
	NAVIGATION_MENU_POPOVER_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

type OpenerStandardListItem = StandardListItem & { associatedItem: MenuItem };
type MenuItemClickEventDetail = {
	item: MenuItem,
	text: string,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-navigation-menu</code> component represents a hierarchical menu structure, inherits all the functionality of <code>ui5-menu<code>.
 *
 *
 * <h3>Usage</h3>
 *
 * <code>ui5-navigation-menu</code> contains <code>ui5-navigation-menu-item</code> components.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/NavigationMenu.js";</code>
 *
 * @constructor
 * @extends Menu
 * @since 1.22.0
 * @private
 */
@customElement({
	tag: "ui5-navigation-menu",
	renderer: litRender,
	staticAreaStyles: [staticAreaMenuCss, staticAreaNavigationMenuCss],
	staticAreaTemplate: staticAreaMenuTemplate,
})

class NavigationMenu extends Menu {
	/**
	 * Defines the items of this component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-navigation-menu-item</code> for the intended design.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	declare items: Array<NavigationMenuItem>;

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const opener = e.target as OpenerStandardListItem;
			let item = opener.associatedItem;
			const hoverId = opener.getAttribute("id")!;

			if (!item) {
				// for nested <a>
				const test = opener.parentElement as any;
				if (opener.parentElement) {
					item = test.associatedItem;
				}
			}

			// If there is a pending close operation, cancel it
			this._clearTimeout();

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item, opener, hoverId);
		}
	}

	_clonedItemsFragment(item: MenuItem) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < item.items.length; ++i) {
			const subItem = item.items[i] as any;

			const clonedItem = item.items[i].cloneNode(true) as any;
			if (subItem.associatedItem) {
				clonedItem.associatedItem = subItem.associatedItem;
			}
			fragment.appendChild(clonedItem);
		}

		return fragment;
	}

	_itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const opener = e.detail.item as OpenerStandardListItem;
		const item = opener.associatedItem;
		const actionId = opener.getAttribute("id")!;
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

		if (isPhone()) {
			// prepares and opens sub-menu on phone
			this._prepareSubMenuPhone(item);
		} else if (isTablet()) {
			// prepares and opens sub-menu on tablet
			this._prepareSubMenuDesktopTablet(item, opener, actionId);
		}
	}
	get accSideNavigationPopoverHiddenText() {
		return NavigationMenu.i18nBundle.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
	}
}

NavigationMenu.define();

export default NavigationMenu;
