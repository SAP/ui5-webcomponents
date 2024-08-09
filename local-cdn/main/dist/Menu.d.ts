import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { ResponsivePopoverBeforeCloseEventDetail } from "./ResponsivePopover.js";
import MenuItem from "./MenuItem.js";
import type { ListItemClickEventDetail } from "./List.js";
/**
 * Interface for components that may be slotted inside a `ui5-menu`.
 *
 * **Note:** Use with `ui5-menu-item` or `ui5-menu-separator`. Implementing the interface does not guarantee that any other classes can work with the `ui5-menu`.
 * @public
 */
interface IMenuItem extends UI5Element {
    isSeparator: boolean;
}
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
/**
 * @class
 *
 * ### Overview
 *
 * `ui5-menu` component represents a hierarchical menu structure.
 *
 * ### Structure
 *
 * The `ui5-menu` can hold two types of entities:
 *
 * - `ui5-menu-item` components
 * - `ui5-menu-separator` - used to separate menu items with a line
 *
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
     * @default undefined
     * @public
     */
    headerText?: string;
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
    loading: boolean;
    /**
     * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover..
     * @default 1000
     * @public
     * @since 1.13.0
     */
    loadingDelay: number;
    /**
     * Defines the ID or DOM Reference of the element at which the menu is shown.
     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
     * @public
     * @default undefined
     * @since 1.10.0
     */
    opener?: HTMLElement | string;
    /**
     * Defines the items of this component.
     *
     * **Note:** Use `ui5-menu-item` and `ui5-menu-separator` for their intended design.
     * @public
     */
    items: Array<IMenuItem>;
    static i18nBundle: I18nBundle;
    _timeout?: Timeout;
    static onDefine(): Promise<void>;
    get isRtl(): boolean;
    get labelClose(): string;
    get isPhone(): boolean;
    get _popover(): ResponsivePopover;
    get _menuItems(): MenuItem[];
    onBeforeRendering(): void;
    _close(): void;
    _openItemSubMenu(item: MenuItem): void;
    _closeItemSubMenu(item: MenuItem): void;
    _itemMouseOver(e: MouseEvent): void;
    _startOpenTimeout(item: MenuItem): void;
    _itemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    _itemKeyDown(e: KeyboardEvent): void;
    _beforePopoverOpen(e: CustomEvent): void;
    _afterPopoverOpen(): void;
    _beforePopoverClose(e: CustomEvent<ResponsivePopoverBeforeCloseEventDetail>): void;
    _afterPopoverClose(): void;
}
export default Menu;
export type { MenuItemClickEventDetail, MenuBeforeCloseEventDetail, MenuBeforeOpenEventDetail, IMenuItem, };
