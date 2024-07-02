import type { ListItemClickEventDetail } from "./List.js";
import Menu from "./Menu.js";
import MenuItem from "./MenuItem.js";
import type NavigationMenuItem from "./NavigationMenuItem.js";
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
declare class NavigationMenu extends Menu {
    /**
     * Defines the items of this component.
     *
     * **Note:** Use `ui5-navigation-menu-item` for the intended design.
     * @public
     */
    items: Array<NavigationMenuItem>;
    _isMenu(element: HTMLElement): boolean;
    _itemMouseOver(e: MouseEvent): void;
    _clonedItemsFragment(item: MenuItem): DocumentFragment;
    _itemClick(e: CustomEvent<ListItemClickEventDetail>): void;
    get accSideNavigationPopoverHiddenText(): string;
}
export default NavigationMenu;
