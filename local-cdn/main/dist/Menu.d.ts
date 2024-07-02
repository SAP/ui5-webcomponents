import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import StandardListItem from "./StandardListItem.js";
import type MenuItem from "./MenuItem.js";
import type { ListItemClickEventDetail } from "./List.js";
type CurrentItem = {
    item: MenuItem;
    position: number;
    ariaHasPopup: string | undefined;
};
type MenuItemClickEventDetail = {
    item: MenuItem;
    text: string;
};
type MenuBeforeOpenEventDetail = {
    item?: MenuItem;
};
type MenuBeforeCloseEventDetail = {
    escPressed: boolean;
};
type MenuItemFocusEventDetail = {
    ref: HTMLElement;
    item: MenuItem;
};
type OpenerStandardListItem = StandardListItem & {
    associatedItem: MenuItem;
};
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
declare class Menu extends UI5Element {
    /**
     * Defines the header text of the menu (displayed on mobile).
     * @default ""
     * @public
     */
    headerText: string;
    /**
     * Indicates if the menu is open
     * @public
     * @default false
     * @since 1.10.0
     */
    open: boolean;
    /**
     * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
     * @default false
     * @public
     * @since 1.13.0
     */
    busy: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover..
     * @default 1000
     * @public
     * @since 1.13.0
     */
    busyDelay: number;
    /**
     * Defines the ID or DOM Reference of the element that the menu is shown at
     * @public
     * @default ""
     * @since 1.10.0
     */
    opener: HTMLElement | string;
    /**
     * Defines if the menu is sub-menu (not first-level).
     * @default false
     * @private
     */
    _isSubMenu: boolean;
    /**
     * Stores id of a list item that opened sub-menu.
     * @private
     */
    _subMenuOpenerId: string;
    /**
     * Defines the currently available menu items.
     * (in case of non-phone devices these are the items of the menu,
     * but for phone devices the items of the currently opened sub-menu
     * will be populated here)
     * @private
     */
    _currentItems: Array<CurrentItem>;
    /**
     * Stores the ResponsivePopover instance
     */
    _popover?: ResponsivePopover;
    /**
     * Stores parent menu item (if there is such).
     */
    _parentMenuItem?: MenuItem;
    /**
     * Stores parent menu item DOM representation (if there is such).
     */
    _opener?: HTMLElement;
    /**
     * Stores menu item that have sub-menu opened.
     */
    _openedSubMenuItem?: MenuItem;
    /**
     * Defines the items of this component.
     *
     * **Note:** Use `ui5-menu-item` for the intended design.
     * @public
     */
    items: Array<MenuItem>;
    static i18nBundle: I18nBundle;
    _timeout?: Timeout;
    static onDefine(): Promise<void>;
    get itemsWithChildren(): boolean;
    get itemsWithIcon(): boolean;
    get isRtl(): boolean;
    get placementType(): "Left" | "Right" | "Bottom";
    get verticalAlign(): "Top" | "Bottom";
    get labelBack(): string;
    get labelClose(): string;
    get isPhone(): boolean;
    get isSubMenuOpened(): boolean | undefined;
    get menuHeaderTextPhone(): string;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    /**
     * Shows the Menu near the opener element.
     * @param opener the element that the popover is shown at
     * @public
     */
    showAt(opener: HTMLElement): Promise<void>;
    /**
     * Closes the Menu.
     * @public
     */
    close(): void;
    _createPopover(): Promise<ResponsivePopover>;
    getOpener(): HTMLElement | null;
    _navigateBack(): void;
    _closeAll(): void;
    _prepareCurrentItems(items: Array<MenuItem>): void;
    _createSubMenu(item: MenuItem, opener: HTMLElement): void;
    _clonedItemsFragment(item: MenuItem): DocumentFragment;
    _openItemSubMenu(item: MenuItem, opener: HTMLElement): void;
    _closeItemSubMenu(item: MenuItem, forceClose?: boolean, keyboard?: boolean): void;
    _closeSubMenuPopover(subMenu: Menu, forceClose?: boolean, keyboard?: boolean): void;
    _prepareSubMenu(item: MenuItem, opener: HTMLElement): void;
    _onfocusin(e: FocusEvent): void;
    _startOpenTimeout(item: MenuItem, opener: OpenerStandardListItem): void;
    _startCloseTimeout(item: MenuItem): void;
    _itemMouseOver(e: MouseEvent): void;
    _busyMouseOver(): void;
    _itemMouseOut(e: MouseEvent): void;
    _itemKeyDown(e: KeyboardEvent): void;
    _itemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _findMainMenu(element: MenuItem | Menu): Menu;
    _isMenu(element: HTMLElement): boolean;
    _beforePopoverOpen(e: CustomEvent): void;
    _afterPopoverOpen(): void;
    _beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>): void;
    _afterPopoverClose(): void;
}
export default Menu;
export type { MenuItemClickEventDetail, MenuBeforeCloseEventDetail, MenuBeforeOpenEventDetail, MenuItemFocusEventDetail, };
