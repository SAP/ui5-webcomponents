import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type { ListItemClickEventDetail } from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import type ListItemBase from "./ListItemBase.js";
/**
 * Interface for components that may be slotted inside `ui5-select` as options
 * @public
 */
type IOption = ListItemBase & {
    tooltip?: string;
    icon?: string;
    value?: string;
    additionalText?: string;
    focused?: boolean;
    effectiveDisplayText: string;
};
type SelectChangeEventDetail = {
    selectedOption: IOption;
};
type SelectLiveChangeEventDetail = {
    selectedOption: IOption;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-select` component is used to create a drop-down list.
 *
 * ### Usage
 *
 * There are two main usages of the `ui5-select>`.
 *
 * 1. With Option (`ui5-option`) web component:
 *
 * The available options of the Select are defined by using the Option component.
 * The Option comes with predefined design and layout, including `icon`, `text` and `additional-text`.
 *
 * 2. With OptionCustom (`ui5-option-custom`) web component.
 *
 * Options with custom content are defined by using the OptionCustom component
 * The OptionCustom component comes with no predefined layout and it expects consumers to define it.
 *
 * ### Keyboard Handling
 * The `ui5-select` provides advanced keyboard handling.
 *
 * - [F4] / [Alt] + [Up] / [Alt] + [Down] / [Space] or [Enter] - Opens/closes the drop-down.
 * - [Up] or [Down] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.
 * - [Space], [Enter] - If the drop-down is opened - selects the focused option.
 * - [Escape] - Closes the drop-down without changing the selection.
 * - [Home] - Navigates to first option
 * - [End] - Navigates to the last option
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Select";`
 *
 * `import "@ui5/webcomponents/dist/Option";`
 * `import "@ui5/webcomponents/dist/OptionCustom";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart popover - Used to style the popover element
 * @since 0.8.0
 */
declare class Select extends UI5Element implements IFormInputElement {
    static i18nBundle: I18nBundle;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines the name by which the component will be identified upon submission in an HTML form.
     *
     * **Note:** This property is only applicable within the context of an HTML Form element.
     * @default undefined
     * @public
     */
    name?: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is required.
     * @since 1.0.0-rc.9
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @since 1.21.0
     * @public
     */
    readonly: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @since 1.0.0-rc.9
     * @public
     * @default undefined
     */
    accessibleName?: string;
    /**
     * Receives id(or many ids) of the elements that label the select.
     * @default undefined
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef?: string;
    /**
     * @private
     */
    _iconPressed: boolean;
    /**
     * @private
     */
    opened: boolean;
    /**
     * @private
     */
    _listWidth: number;
    /**
     * @private
     */
    focused: boolean;
    _selectedIndexBeforeOpen: number;
    _escapePressed: boolean;
    _lastSelectedOption: IOption | null;
    _typedChars: string;
    _typingTimeoutID?: Timeout | number;
    responsivePopover: ResponsivePopover;
    valueStatePopover?: Popover;
    /**
     * Defines the component options.
     *
     * **Note:** Only one selected option is allowed.
     * If more than one option is defined as selected, the last one would be considered as the selected one.
     *
     * **Note:** Use the `ui5-option` component to define the desired options.
     * @public
     */
    options: Array<IOption>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Warning` or `Error` value state.
     *
     * **Note:** If the component has `suggestionItems`,
     * the `valueStateMessage` would be displayed as part of the same popover, if used on desktop, or dialog - on phone.
     * @public
    */
    valueStateMessage: Array<HTMLElement>;
    /**
     * Defines the HTML element that will be displayed in the component input part,
     * representing the selected option.
     *
     * **Note:** If not specified and `ui5-option-custom` is used,
     * either the option's `display-text` or its textContent will be displayed.
     *
     * **Note:** If not specified and `ui5-option` is used,
     * the option's textContent will be displayed.
     * @public
     * @since 1.17.0
    */
    label: Array<HTMLElement>;
    get formValidityMessage(): string;
    get formValidity(): ValidityStateFlags;
    formElementAnchor(): Promise<HTMLElement | undefined>;
    get formFormattedValue(): string | null;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _ensureSingleSelection(): void;
    _onfocusin(): void;
    _onfocusout(): void;
    get _isPickerOpen(): boolean;
    _respPopover(): ResponsivePopover;
    /**
     * Defines the value of the component:
     *
     * - when get - returns the value of the component, e.g. the `value` property of the selected option or its text content.
     *
     * - when set - selects the option with matching `value` property or text content.
     *
     * **Note:** If the given value does not match any existing option,
     * the first option will get selected.
     * @public
     * @default ""
     * @since 1.20.0
     * @formProperty
     * @formEvents change liveChange
     */
    set value(newValue: string);
    get value(): string;
    get _selectedIndex(): number;
    /**
     * Currently selected `ui5-option` element.
     * @public
     * @default undefined
     */
    get selectedOption(): IOption | undefined;
    get text(): string | undefined;
    _toggleRespPopover(): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleKeyboardNavigation(e: KeyboardEvent): void;
    _selectTypedItem(text: string): void;
    _searchNextItemByText(text: string): IOption | undefined;
    _handleHomeKey(e: KeyboardEvent): void;
    _handleEndKey(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _getItemIndex(item: IOption): number;
    _select(index: number): void;
    /**
     * The user clicked on an item from the list
     * @private
     */
    _handleItemPress(e: CustomEvent<ListItemClickEventDetail>): void;
    _itemMousedown(e: MouseEvent): void;
    _onclick(): void;
    /**
     * The user selected an item with Enter or Space
     * @private
     */
    _handleSelectionChange(index?: number): void;
    _scrollSelectedItem(): void;
    _handleArrowNavigation(e: KeyboardEvent): void;
    _changeSelectedItem(oldIndex: number, newIndex: number): void;
    _getNextOptionIndex(): number;
    _getPreviousOptionIndex(): number;
    _beforeOpen(): void;
    _afterOpen(): void;
    _applyFocusToSelectedItem(): void;
    _afterClose(): void;
    get hasCustomLabel(): boolean;
    _fireChangeEvent(selectedOption: IOption): void;
    get valueStateTextMappings(): {
        Positive: string;
        Information: string;
        Negative: string;
        Critical: string;
    };
    get valueStateTypeMappings(): {
        Positive: string;
        Information: string;
        Negative: string;
        Critical: string;
    };
    get valueStateText(): string;
    get valueStateDefaultText(): string;
    get valueStateTypeText(): string;
    get hasValueState(): boolean;
    get valueStateTextId(): string | undefined;
    get isDisabled(): true | undefined;
    get _headerTitleText(): string;
    get _currentlySelectedOption(): IOption;
    get _effectiveTabIndex(): "-1" | "0";
    /**
    * This method is relevant for sap_horizon theme only
    */
    get _valueStateMessageInputIcon(): string;
    get iconsCount(): number;
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
        popoverHeader: {
            "max-width": string;
        };
        responsivePopoverHeader: {
            display: string;
            width: string;
        };
        responsivePopover: {
            "min-width": string;
        };
    };
    get ariaLabelText(): string | undefined;
    get valueStateMessageText(): Node[];
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get hasValueStateText(): boolean;
    get shouldOpenValueStateMessagePopover(): boolean;
    get _ariaRoleDescription(): string;
    get _isPhone(): boolean;
    itemSelectionAnnounce(): void;
    openValueStatePopover(): void;
    closeValueStatePopover(): void;
    toggleValueStatePopover(open: boolean): void;
    get selectedOptionIcon(): string | undefined;
    _getPopover(): Popover | null;
    static onDefine(): Promise<void>;
}
export default Select;
export type { IOption, SelectChangeEventDetail, SelectLiveChangeEventDetail, };
