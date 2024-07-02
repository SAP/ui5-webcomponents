import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type Select from "./Select.js";
import type SelectMenuOption from "./SelectMenuOption.js";
import type { IOption } from "./Select.js";
type SelectMenuOptionClick = {
    option: SelectMenuOption;
    optionIndex: number;
};
type SelectMenuChange = {
    text: string;
    selectedIndex: number;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-select-menu` is meant to be used together with the `ui5-select` component as alternative
 * to define the select's dropdown. It acts as a popover on desktop and tablet, and as a Dialog on phone.
 *
 * The component gives the possibility to the user to customize the `ui5-select`'s dropdown
 * by slotting custom options and adding custom styles.
 *
 * ### Usage
 *
 * To use `ui5-select` with a `ui5-select-menu`,
 * you need to set the `ui5-select` `menu` property to reference `ui5-select-menu` either by ID or DOM reference.
 *
 * For the `ui5-select-menu`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/SelectMenu.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
declare class SelectMenu extends UI5Element {
    constructor();
    /**
     * Defines the options of the component.
     * @public
     */
    options: Array<IOption>;
    /**
     * Defines the width of the component.
     * @private
     */
    selectWidth?: number;
    hasValueState: boolean;
    hasValueStateSlot: boolean;
    valueState: `${ValueState}`;
    valueStateText: string;
    value: string;
    selectId?: string;
    valueStateMessageText: Array<Node>;
    _headerTitleText?: string;
    select?: Select;
    /**
     * Shows the dropdown at the given element.
     */
    showAt(opener: Select, openerWidth: number): void;
    /**
     * Closes the dropdown.
     */
    close(escPressed?: boolean, preventRegistryUpdate?: boolean, preventFocusRestore?: boolean): void;
    onBeforeRendering(): void;
    _syncSelection(): void;
    _onOptionClick(e: CustomEvent): void;
    _onBeforeOpen(): void;
    _onAfterOpen(): void;
    _onAfterClose(): void;
    _onCloseBtnClick(): void;
    get open(): boolean;
    get respPopover(): ResponsivePopover;
    get classes(): {
        popoverValueState: {
            "ui5-valuestatemessage-root": boolean;
            "ui5-valuestatemessage--success": boolean;
            "ui5-valuestatemessage--error": boolean;
            "ui5-valuestatemessage--warning": boolean;
            "ui5-valuestatemessage--information": boolean;
        };
        popover: {
            "ui5-select-popover-valuestate": boolean;
        };
    };
    get styles(): {
        valueStatePopover: {
            width: string;
        };
        responsivePopover: {
            "min-width": string;
        };
    };
    get _valueStateMessageInputIcon(): string;
    get _isPhone(): boolean;
}
export default SelectMenu;
export type { SelectMenuOptionClick, SelectMenuChange, };
