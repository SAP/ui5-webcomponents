import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type Menu from "./Menu.js";
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
 * `ui5-menu-item` is an abstract element, representing a node in a `ui5-menu`. The menu itself is rendered as a list,
 * and each `ui5-menu-item` is represented by a list item (`ui5-li`) in that list. Therefore, you should only use
 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MenuItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.3.0
 * @public
 */
declare class MenuItem extends UI5Element {
    /**
     * Defines the text of the tree item.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the `additionalText`, displayed in the end of the menu item.
     *
     * **Note:** The additional text would not be displayed if the item has a submenu.
     * @default ""
     * @public
     * @since 1.8.0
     */
    additionalText: string;
    /**
     * Defines the icon to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * **Example:**
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines whether a visual separator should be rendered before the item.
     * @default false
     * @public
     */
    startsSection: boolean;
    /**
     * Defines whether `ui5-menu-item` is in disabled state.
     *
     * **Note:** A disabled `ui5-menu-item` is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
     *
     * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
     * @default false
     * @public
     * @since 1.13.0
     */
    busy: boolean;
    /**
     * Defines the delay in milliseconds, after which the busy indicator will be displayed inside the corresponding ui5-menu popover.
     * @default 1000
     * @public
     * @since 1.13.0
     */
    busyDelay: number;
    /**
     * Defines the accessible ARIA name of the component.
     * @default ""
     * @public
     * @since 1.7.0
     */
    accessibleName: string;
    /**
     * Defines the text of the tooltip for the menu item.
     * @default ""
     * @public
     * @since 1.23.0
     */
    tooltip: string;
    /**
     * Indicates whether any of the element siblings have children items.
     */
    _siblingsWithChildren: boolean;
    /**
     * Indicates whether any of the element siblings have icon.
     */
    _siblingsWithIcon: boolean;
    /**
     * Defines whether the submenu closing must be prevented
     */
    _preventSubMenuClose: boolean;
    /**
     * Stores Menu object with submenu items
     */
    _subMenu?: Menu;
    /**
     * Defines the items of this component.
     * @public
     */
    items: Array<MenuItem>;
    get hasSubmenu(): boolean;
    get hasDummyIcon(): boolean;
    get subMenuOpened(): boolean;
    get _additionalText(): string;
    get ariaLabelledByText(): string;
}
export default MenuItem;
