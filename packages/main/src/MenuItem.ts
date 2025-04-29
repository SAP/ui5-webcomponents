import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { AccessibilityAttributes, AriaHasPopup, AriaRole } from "@ui5/webcomponents-base";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	isLeft,
	isRight,
	isEnter,
	isSpace,
	isTabNext,
	isTabPrevious,
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import type { ListItemAccessibilityAttributes } from "./ListItem.js";
import ListItem from "./ListItem.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type PopoverPlacement from "./types/PopoverPlacement.js";
import MenuItemTemplate from "./MenuItemTemplate.js";
import {
	MENU_BACK_BUTTON_ARIA_LABEL,
	MENU_CLOSE_BUTTON_ARIA_LABEL,
	MENU_POPOVER_ACCESSIBLE_NAME,
} from "./generated/i18n/i18n-defaults.js";
import type { IMenuItem } from "./Menu.js";

// Styles
import menuItemCss from "./generated/themes/MenuItem.css.js";

type MenuBeforeOpenEventDetail = { item?: MenuItem };
type MenuBeforeCloseEventDetail = { escPressed: boolean };

type MenuNavigateOutOfEndContentEventDetail = { shouldNavigateToNextItem: boolean };

type MenuItemAccessibilityAttributes = Pick<AccessibilityAttributes, "ariaKeyShortcuts" | "role"> & ListItemAccessibilityAttributes;

/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
 *
 * ### Usage
 *
 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends ListItem
 * @implements {IMenuItem}
 * @since 1.3.0
 * @public
 */
@customElement({
	tag: "ui5-menu-item",
	renderer: jsxRenderer,
	template: MenuItemTemplate,
	styles: [ListItem.styles, menuItemCss],
})

/**
 * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
 *
 * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
 * @public
 * @since 1.10.0
 * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
 */
@event("before-open", {
	cancelable: true,
})

/**
 * Fired after the menu is opened.
 * @public
 */
@event("open")

/**
 * Fired when the menu is being closed.
 * @private
 */
@event("close-menu", {
	bubbles: true,
})

/**
 * Fired when navigating out of end-content.
 * @private
 */
@event("exit-end-content", {
	bubbles: true,
})

/**
 * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing.
 * @public
 * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
 * @since 1.10.0
 */
@event("before-close", {
	cancelable: true,
})

/**
 * Fired after the menu is closed.
 * @public
 * @since 1.10.0
 */
@event("close")
class MenuItem extends ListItem implements IMenuItem {
	eventDetails!: ListItem["eventDetails"] & {
		"before-open": MenuBeforeOpenEventDetail
		"open": void
		"before-close": MenuBeforeCloseEventDetail
		"close": void
		"close-menu": void,
		"exit-end-content": MenuNavigateOutOfEndContentEventDetail,
	}
	/**
	 * Defines the text of the tree item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the `additionalText`, displayed in the end of the menu item.
	 *
	 * **Note:** The additional text will not be displayed if there are items added in `items` slot or there are
	 * components added to `endContent` slot.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @default undefined
	 * @public
	 * @since 1.8.0
	 */
	@property()
	additionalText?: string;

	/**
	 * Defines the icon to be displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * **Example:**
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines whether `ui5-menu-item` is in disabled state.
	 *
	 * **Note:** A disabled `ui5-menu-item` is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 *
	 * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
	 * @default false
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	 * @default 1000
	 * @public
	 * @since 1.13.0
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.7.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the additional accessibility attributes that will be applied to the component.
	 * The following fields are supported:
	 *
	 * - **ariaKeyShortcuts**: Indicated the availability of a keyboard shortcuts defined for the menu item.
	 *
	 * - **role**: Defines the role of the menu item. If not set, menu item will have default role="menuitem".
	 *
	 * @public
	 * @since 2.1.0
	 * @default {}
	 */
	@property({ type: Object })
	declare accessibilityAttributes: MenuItemAccessibilityAttributes;

	/**
	 * Indicates whether any of the element siblings have icon.
	 */
	@property({ type: Boolean, noAttribute: true })
	_siblingsWithIcon = false;

	/**
	 * Defines the items of this component.
	 *
	 * **Note:** The slot can hold `ui5-menu-item` and `ui5-menu-separator` items.
	 *
	 * If there are items added to this slot, an arrow will be displayed at the end
	 * of the item in order to indicate that there are items added. In that case components added
	 * to `endContent` slot or `additionalText` content will not be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IMenuItem>;

	/**
	 * Defines the components that should be displayed at the end of the menu item.
	 *
	 * **Note:** It is highly recommended to slot only components of type `ui5-button`,`ui5-link`
	 * or `ui5-icon` in order to preserve the intended design. If there are components added to this slot,
	 * and there is text set in `additionalText`, it will not be displayed. If there are items added to `items` slot,
	 * nether `additionalText` nor components added to this slot would be displayed.
	 *
	 * The priority of what will be displayed at the end of the menu item is as follows:
	 * sub-menu arrow (if there are items added in `items` slot) -> components added in `endContent` -> text set to `additionalText`.
	 * @public
	 * @since 2.0.0
	 */
	@slot({ type: HTMLElement })
	endContent!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			behavior: ItemNavigationBehavior.Static,
			getItemsCallback: () => this._navigableItems,
		});
	}

	get _navigableItems(): Array<HTMLElement> {
		return [...this.endContent].filter(item => {
			return item.hasAttribute("ui5-button")
			|| item.hasAttribute("ui5-link")
			|| (item.hasAttribute("ui5-icon") && item.getAttribute("mode") === "Interactive");
		});
	}

	_navigateToEndContent(shouldNavigateToPreviousItem: boolean) {
		const navigatableItems = this._navigableItems;
		const item = shouldNavigateToPreviousItem
			? navigatableItems[navigatableItems.length - 1]
			: navigatableItems[0];

		if (item) {
			this._itemNavigation.setCurrentItem(item);
			this._itemNavigation._focusCurrentItem();
		}
	}

	get placement(): `${PopoverPlacement}` {
		return this.isRtl ? "Start" : "End";
	}

	get isRtl() {
		return this.effectiveDir === "rtl";
	}

	get hasSubmenu() {
		return !!(this.items.length || this.loading) && !this.disabled;
	}

	get hasEndContent() {
		return !!(this.endContent.length);
	}

	get hasIcon() {
		return !!this.icon;
	}

	get isSubMenuOpen() {
		return this._popover?.open;
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}

	get menuHeaderTextPhone() {
		return this.text;
	}

	get isPhone() {
		return isPhone();
	}

	get labelBack() {
		return MenuItem.i18nBundle.getText(MENU_BACK_BUTTON_ARIA_LABEL);
	}

	get labelClose() {
		return MenuItem.i18nBundle.getText(MENU_CLOSE_BUTTON_ARIA_LABEL);
	}

	get acessibleNameText() {
		return MenuItem.i18nBundle.getText(MENU_POPOVER_ACCESSIBLE_NAME);
	}

	get isSeparator(): boolean {
		return false;
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);

		this._menuItems.forEach(item => {
			item._siblingsWithIcon = siblingsWithIcon;
		});
	}

	async focus(focusOptions?: FocusOptions): Promise<void> {
		await renderFinished();

		if (this.hasSubmenu && this.isSubMenuOpen) {
			return this._menuItems[0].focus(focusOptions);
		}

		return super.focus(focusOptions);
	}

	get _focusable() {
		return true;
	}

	get _accInfo() {
		const accInfoSettings: {
			role: AriaRole;
			ariaHaspopup?: `${AriaHasPopup}`;
			ariaKeyShortcuts?: string;
			ariaHidden?: boolean;
		} = {
			role: this.accessibilityAttributes.role || "menuitem",
			ariaHaspopup: this.hasSubmenu ? "menu" : undefined,
			ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
			ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
		};

		return { ...super._accInfo, ...accInfoSettings };
	}

	get _popover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get _menuItems() {
		return this.items.filter((item): item is MenuItem => !item.isSeparator);
	}

	_closeOtherSubMenus(item: MenuItem) {
		const menuItems = this._menuItems;
		if (!menuItems.includes(item)) {
			return;
		}

		menuItems.forEach(menuItem => {
			if (menuItem !== item) {
				menuItem._close();
			}
		});
	}

	_itemMouseOver(e: MouseEvent) {
		if (!isDesktop()) {
			return;
		}
		const item = e.target as MenuItem;

		if (!isInstanceOfMenuItem(item)) {
			return;
		}
		item.focus();

		this._closeOtherSubMenus(item);
	}

	_itemKeyDown(e: KeyboardEvent) {
		const item = e.target as MenuItem;
		const itemInMenuItems = this._menuItems.includes(item);
		const isTabNextPrevious = isTabNext(e) || isTabPrevious(e);
		const isItemNavigation = isUp(e) || isDown(e);
		const isItemSelection = isSpace(e) || isEnter(e);
		const shouldOpenMenu = this.isRtl ? isLeft(e) : isRight(e);
		const shouldCloseMenu = !(isItemNavigation || isItemSelection || shouldOpenMenu) || isTabNextPrevious;

		if (itemInMenuItems && shouldCloseMenu) {
			this._close();
			this.focus();
			e.stopPropagation();
		}
	}

	_endContentKeyDown(e: KeyboardEvent) {
		const shouldNavigateOutOfEndContent = isUp(e) || isDown(e);

		if (shouldNavigateOutOfEndContent) {
			this.fireDecoratorEvent("exit-end-content", { shouldNavigateToNextItem: isDown(e) });
		}
	}

	_navigateOutOfEndContent(e: CustomEvent) {
		const item = e.target as MenuItem;
		const shouldNavigateToNextItem = e.detail.shouldNavigateToNextItem;
		const menuItems = this._menuItems;
		const itemIndex = menuItems.indexOf(item);

		if (itemIndex > -1) {
			const nextItem = shouldNavigateToNextItem ? menuItems[itemIndex + 1] : menuItems[itemIndex - 1];
			const itemToFocus = nextItem || menuItems[itemIndex];
			itemToFocus?.focus();

			e.stopPropagation();
		}
	}

	_closeAll() {
		if (this._popover) {
			this._popover.open = false;
		}
		this.selected = false;
		this.fireDecoratorEvent("close-menu");
	}

	_close() {
		if (this._popover) {
			this._popover.open = false;
			this._menuItems.forEach(item => item._close());
		}
		this.selected = false;
	}

	_beforePopoverOpen(e: CustomEvent) {
		const prevented = !this.fireDecoratorEvent("before-open", {});

		if (prevented) {
			e.preventDefault();
		}
	}

	_afterPopoverOpen() {
		this.items[0]?.focus();
		this.fireDecoratorEvent("open");
	}

	_beforePopoverClose(e: CustomEvent) {
		const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });

		if (prevented) {
			e.preventDefault();
			return;
		}

		this.selected = false;
		if (e.detail.escPressed) {
			this.focus();
			if (isPhone()) {
				this.fireDecoratorEvent("close-menu");
			}
		}
	}

	_afterPopoverClose() {
		this.fireDecoratorEvent("close");
	}

	get isMenuItem(): boolean {
		return true;
	}
}

MenuItem.define();

const isInstanceOfMenuItem = (object: any): object is MenuItem => {
	return "isMenuItem" in object && object.isMenuItem;
};

export default MenuItem;

export type {
	MenuBeforeCloseEventDetail,
	MenuBeforeOpenEventDetail,
	MenuItemAccessibilityAttributes,
};

export {
	isInstanceOfMenuItem,
};
