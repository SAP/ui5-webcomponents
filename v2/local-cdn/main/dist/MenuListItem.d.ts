import StandardListItem from "./StandardListItem.js";
import MenuItem from "./MenuItem.js";
/**
 * @class
 * @constructor
 * @extends StandardListItem
 * @since 1.23.0
 * @private
 */
declare class MenuListItem extends StandardListItem {
    /**
     * Defines the associated MenuItem instance
     * @private
     */
    associatedItem?: MenuItem;
    get _focusable(): boolean;
    get _accInfo(): {
        role: string;
        ariaHaspopup: "dialog" | "menu" | "grid" | "listbox" | "tree" | undefined;
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
