import CustomListItem from "./CustomListItem.js";
import MenuItem from "./MenuItem.js";
/**
 * @class
 * @constructor
 * @extends CustomListItem
 * @since 1.23.0
 * @private
 */
declare class MenuListItem extends CustomListItem {
    /**
     * Defines the associated MenuItem instance
     * @private
     */
    associatedItem: MenuItem;
    /**
     * Defines the icon to be displayed as graphical element within the component.
     * The SAP-icons font provides numerous options.
     *
     * **Example:**
     *
     * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     * @since 1.24.0
     */
    icon: string;
    /**
     * Defines the `additionalText`, displayed in the end of the menu item.
     *
     * **Note:** The additional text would not be displayed if the item has a submenu.
     * @default ""
     * @public
     * @since 1.24.0
     */
    additionalText: string;
    get text(): string;
    get _additionalText(): string;
    get hasIcon(): boolean;
    get hasSubmenu(): boolean;
    get subMenuOpened(): boolean;
    get _siblingsWithIcon(): boolean;
    get _focusable(): boolean;
    get _accInfo(): {
        ariaHaspopup: "dialog" | "menu" | "grid" | "listbox" | "tree" | undefined;
        role: string;
        ariaExpanded?: boolean | undefined;
        ariaLevel?: number | undefined;
        ariaLabel: string;
        ariaLabelRadioButton: string;
        ariaSelectedText?: string | undefined;
        posinset?: number | undefined;
        setsize?: number | undefined;
        ariaSelected?: boolean | undefined;
        ariaChecked?: boolean | undefined;
        listItemAriaLabel?: string | undefined;
        ariaOwns?: string | undefined;
        tooltip?: string | undefined;
    };
}
export default MenuListItem;
