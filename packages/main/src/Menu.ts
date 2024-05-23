import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
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
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import Button from "./Button.js";
import List from "./List.js";
import Icon from "./Icon.js";
import BusyIndicator from "./BusyIndicator.js";
import MenuItem from "./MenuItem.js";
import type {
	ListItemClickEventDetail,
} from "./List.js";
import menuTemplate from "./generated/templates/MenuTemplate.lit.js";
import {
	MENU_CLOSE_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import menuCss from "./generated/themes/Menu.css.js";

const MENU_OPEN_DELAY = 300;

type MenuItemClickEventDetail = {
	item: MenuItem,
	text: string,
}

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Usage
 *
 * `ui5-menu` contains `ui5-menu-item` components.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Keyboard Handling
 *
 * The `ui5-menu` provides advanced keyboard handling.
 * The user can use the following keyboard shortcuts in order to navigate trough the tree:
 *
 * - `Arrow Up` / `Arrow Down` - Navigates up and down the menu items that are currently visible.
 * - `Arrow Right`, `Space` or `Enter` - Opens a sub-menu if there are menu items nested
 * in the currently clicked menu item.
 * - `Arrow Left` or `Escape` - Closes the currently opened sub-menu.
 *
 * Note: if the text ditrection is set to Right-to-left (RTL), `Arrow Right` and `Arrow Left` functionality is swapped.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Menu.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu",
	renderer: litRender,
	styles: menuCss,
	template: menuTemplate,
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
 *
 * **Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
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
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening. **This event does not bubble.**
 *
 * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
 * @public
 * @allowPreventDefault
 * @since 1.10.0
 * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
 */
@event<MenuBeforeOpenEventDetail>("before-open", {
	detail: {
		/**
		 * @public
		 * @since 1.14.0
		 */
		item: {
			type: HTMLElement,
		},
	},
})

/**
 * Fired after the menu is opened. **This event does not bubble.**
 * @public
 * @since 1.10.0
 */
@event("open")

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing. **This event does not bubble.**
 * @public
 * @allowPreventDefault
 * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
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
 * Fired after the menu is closed. **This event does not bubble.**
 * @public
 * @since 1.10.0
 */
@event("close")

class Menu extends UI5Element {
	/**
	 * Defines the header text of the menu (displayed on mobile).
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Indicates if the menu is open
	 * @public
	 * @default false
	 * @since 1.10.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover..
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines the ID or DOM Reference of the element at which the menu is shown.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default ""
	 * @since 1.10.0
	 */
	@property({ converter: DOMReferenceConverter })
	opener?: HTMLElement | string;

	/**
	 * Defines the items of this component.
	 *
	 * **Note:** Use `ui5-menu-item` for the intended design.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<MenuItem>;

	static i18nBundle: I18nBundle;
	_timeout?: Timeout;

	static async onDefine() {
		Menu.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get labelClose() {
		return Menu.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get isPhone() {
		return isPhone();
	}

	get _popover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	onBeforeRendering() {
		const siblingsWithIcon = this.items.some(item => !!item.icon);

		this.items.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});
	}

	_close() {
		this.open = false;
	}

	_openItemSubMenu(item: MenuItem) {
		clearTimeout(this._timeout);

		if (!item._popover || item._popover.open) {
			return;
		}

		this.fireEvent<MenuBeforeOpenEventDetail>("before-open", {
			item,
		}, false, false);
		item._popover.opener = item;
		item._popover.open = true;
		item.selected = true;
	}

	_closeItemSubMenu(item: MenuItem) {
		if (item && item._popover) {
			const openedSibling = item.items.find(menuItem => menuItem._popover && menuItem._popover.open);
			if (openedSibling) {
				this._closeItemSubMenu(openedSibling);
			}

			item._popover.open = false;
			item.selected = false;
		}
	}

	_itemMouseOver(e: MouseEvent) {
		if (isDesktop()) {
			// respect mouseover only on desktop
			const item = e.target as MenuItem;

			item.focus();

			// Opens submenu with 300ms delay
			this._startOpenTimeout(item);
		}
	}

	_startOpenTimeout(item: MenuItem) {
		clearTimeout(this._timeout);

		this._timeout = setTimeout(() => {
			const opener = item.parentElement as MenuItem | Menu;
			const openedSibling = opener && opener.items.find(menuItem => menuItem._popover && menuItem._popover.open);
			if (openedSibling) {
				this._closeItemSubMenu(openedSibling);
			}

			this._openItemSubMenu(item);
		}, MENU_OPEN_DELAY);
	}

	_itemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const item = e.detail.item as MenuItem;

		if (!item._popover) {
			const prevented = !this.fireEvent<MenuItemClickEventDetail>("item-click", {
				"item": item,
				"text": item.text,
			}, true, false);

			if (!prevented && this._popover) {
				item.fireEvent("close-menu", {});
			}
		} else {
			this._openItemSubMenu(item);
		}
	}

	_itemKeyDown(e: KeyboardEvent) {
		const shouldCloseMenu = this.isRtl ? isRight(e) : isLeft(e);
		const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
		const item = e.target as MenuItem;
		const parentElement = item.parentElement as MenuItem;

		if (isEnter(e)) {
			e.preventDefault();
		}
		if (shouldOpenMenu) {
			this._openItemSubMenu(item);
		} else if (shouldCloseMenu && parentElement.hasAttribute("ui5-menu-item") && parentElement._popover) {
			parentElement._popover.open = false;
			parentElement.selected = false;
			(parentElement._popover.opener as HTMLElement)?.focus();
		}
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireEvent<MenuBeforeOpenEventDetail>("before-open", {}, true, true);

		if (prevented) {
			this.open = false;
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this.open = true;
		this.items[0]?.focus();
		this.fireEvent("open", {}, false, true);
	}

	_beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>) {
		const prevented = !this.fireEvent<MenuBeforeCloseEventDetail>("before-close", { escPressed: e.detail.escPressed }, true, true);

		if (prevented) {
			this.open = true;
			e.preventDefault();
		}
	}

	_afterPopoverClose() {
		this.open = false;
		this.fireEvent("close", {}, false, true);
	}
}

Menu.define();

export default Menu;
export type {
	MenuItemClickEventDetail,
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
};
