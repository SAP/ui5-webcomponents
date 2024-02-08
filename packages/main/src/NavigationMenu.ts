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
import MenuItem from "./MenuItem.js";
import type NavigationMenuItem from "./NavigationMenuItem.js";
import AreaMenuTemplate from "./generated/templates/NavigationMenuTemplate.lit.js";

// Styles
import areaNavigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import areaMenuCss from "./generated/themes/Menu.css.js";

import {
	NAVIGATION_MENU_POPOVER_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

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
	styles: [areaMenuCss, areaNavigationMenuCss],
	template: AreaMenuTemplate,
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
			let item = e.target as MenuItem;

			if (item.tagName !== "ui5-menu-item") {
				// for nested <a>
				item = item.parentElement as MenuItem;
			}

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item);
		}
	}

	async _itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as MenuItem;
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
			await this._prepareSubMenuDesktopTablet(item);
		}
	}
	get accSideNavigationPopoverHiddenText() {
		return NavigationMenu.i18nBundle.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
	}
}

NavigationMenu.define();

export default NavigationMenu;
