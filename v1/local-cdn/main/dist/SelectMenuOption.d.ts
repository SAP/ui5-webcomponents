import CustomListItem from "./CustomListItem.js";
import ListItemType from "./types/ListItemType.js";
import type { AccessibilityAttributes } from "./ListItem.js";
import type { IButton } from "./Button.js";
import type { IOption } from "./Select.js";
/**
 * @class
 *
 * ### Overview
 * The `ui5-select-menu-option` component represents an option in the `ui5-select-menu`.
 *
 * ### Usage
 *
 * For the `ui5-select-menu-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/SelectMenuOption.js";`
 * @constructor
 * @extends CustomListItem
 * @implements {IOption}
 * @public
 * @since 1.17.0
 * @slot {Array<Node>} default  Defines the content of the component.
 */
declare class SelectMenuOption extends CustomListItem implements IOption {
    /**
     * Defines the text, displayed inside the `ui5-select` input filed
     * when the option gets selected.
     * @default ""
     * @public
     */
    displayText: string;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is hidden.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the value of the `ui5-select` inside an HTML Form element when this component is selected.
     * For more information on HTML Form support, see the `name` property of `ui5-select`.
     * @default ""
     * @public
     */
    value: string;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default "Active"
     * @public
     * @deprecated
     */
    type: `${ListItemType}`;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default {}
     * @public
     * @deprecated
     */
    accessibilityAttributes: AccessibilityAttributes;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default false
     * @public
     * @deprecated
     */
    navigated: boolean;
    /**
     * **Note:** The slot is inherited and not supported. If set, it won't take any effect.
     * @public
     * @deprecated
     */
    deleteButton: Array<IButton>;
    get stableDomRef(): string;
    get _accInfo(): {
        ariaSelected: boolean;
        role: string;
        ariaExpanded?: boolean | undefined;
        ariaLevel?: number | undefined;
        ariaLabel: string;
        ariaLabelRadioButton: string;
        ariaSelectedText?: string | undefined;
        ariaHaspopup?: "dialog" | "menu" | "grid" | "listbox" | "tree" | undefined;
        posinset?: number | undefined;
        setsize?: number | undefined;
        ariaChecked?: boolean | undefined;
        listItemAriaLabel?: string | undefined;
        ariaOwns?: string | undefined;
        tooltip?: string | undefined;
    };
}
export default SelectMenuOption;
