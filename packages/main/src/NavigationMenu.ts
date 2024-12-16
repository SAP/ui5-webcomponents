import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isDesktop,
} from "@ui5/webcomponents-base/dist/Device.js";
import Menu from "./Menu.js";
import type MenuItem from "./MenuItem.js";
import type NavigationMenuItem from "./NavigationMenuItem.js";
import NavigationMenuTemplate from "./NavigationMenuTemplate.js";

// Styles
import navigationMenuCss from "./generated/themes/NavigationMenu.css.js";
import menuCss from "./generated/themes/Menu.css.js";

import {
	NAVIGATION_MENU_POPOVER_HIDDEN_TEXT,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-navigation-menu` component represents a hierarchical menu structure, inherits all the functionality of `ui5-menu`.
 *
 * ### Usage
 *
 * `ui5-navigation-menu` contains `ui5-navigation-menu-item` components.
 * An arbitrary hierarchy structure can be represented by recursively nesting navigation menu items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/NavigationMenu.js";`
 * @constructor
 * @extends Menu
 * @since 1.22.0
 * @private
 */
@customElement({
	tag: "ui5-navigation-menu",
	renderer: jsxRenderer,
	styles: [menuCss, navigationMenuCss],
	template: NavigationMenuTemplate,
})

class NavigationMenu extends Menu {
	/**
	 * Defines the items of this component.
	 *
	 * **Note:** Use `ui5-navigation-menu-item` for the intended design.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	declare items: Array<NavigationMenuItem>;

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const item = e.target as MenuItem;

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item);
		}
	}

	get accSideNavigationPopoverHiddenText() {
		return NavigationMenu.i18nBundle.getText(NAVIGATION_MENU_POPOVER_HIDDEN_TEXT);
	}
}

NavigationMenu.define();

export default NavigationMenu;
