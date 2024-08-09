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
import type { ListItemClickEventDetail } from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Popover from "./Popover.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import type ListItemBase from "./ListItemBase.js";
import type SelectMenu from "./SelectMenu.js";
import type { SelectMenuOptionClick, SelectMenuChange } from "./SelectMenu.js";
/**
 * Interface for components that may be slotted inside `ui5-select` as options
 * @public
 */
interface IOption extends UI5Element {
    selected: boolean;
    disabled: boolean;
    title: string;
    icon?: string | null;
    value: string;
    additionalText?: string;
    focused?: boolean;
    text?: Array<Node>;
    stableDomRef: string;
    displayText?: string;
}
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
 * 2. With SelectMenu (`ui5-select-menu`) and SelectMenuOption (`ui5-select-menu-option`) web components:
 *
 * The SelectMenu can be used as alternative to define the Select's dropdown
 * and can be used via the `menu` property of the Select to reference SelectMenu by its ID.
 * The component gives the possibility to customize the Select's dropdown
 * by slotting entirely custom options (via the SelectMenuOption component) and adding custom styles.
 *
 * **Note:** SelectMenu is a popover and placing it top-level in the HTML page is recommended,
 * because some page styles (for example transitions) can misplace the SelectMenu.
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
 * `import "@ui5/webcomponents/dist/Option";` (comes with `ui5-select`)
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
declare class Select extends UI5Element implements IFormElement {
    static i18nBundle: I18nBundle;
    /**
     * Defines a reference (ID or DOM element) of component's menu of options
     * as alternative to define the select's dropdown.
     *
     * **Note:** Usage of `ui5-select-menu` is recommended.
     * @default undefined
     * @public
     * @since 1.17.0
     */
    menu?: HTMLElement | string;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines the name with which the component will be submitted in an HTML form.
     * The value of the component will be the value of the currently selected `ui5-option`.
     *
     * **Important:** For the `name` property to have effect, you must add the following import to your project:
     * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
     *
     * **Note:** When set, a native `input` HTML element
     * will be created inside the `ui5-select` so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     * @default ""
     * @public
     */
    name: string;
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
     * @default ""
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the select.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef: string;
    /**
     * @private
     */
    _text?: string | null;
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
    /**
     * @private
     */
    _selectedIndex: number;
    _syncedOptions: Array<IOption>;
    _selectedIndexBeforeOpen: number;
    _escapePressed: boolean;
    _lastSelectedOption: IOption | null;
    _typedChars: string;
    _typingTimeoutID?: Timeout | number;
    responsivePopover: ResponsivePopover;
    selectedItem?: string | null;
    valueStatePopover?: Popover;
    selectMenu?: SelectMenu;
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
     * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
     * when `name` property is set.
     * @private
     */
    formSupport: Array<HTMLElement>;
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
     * **Note:** If not specified and `ui5-select-menu-option` is used,
     * either the option's `display-text` or its textContent will be displayed.
     *
     * **Note:** If not specified and `ui5-option` is used,
     * the option's textContent will be displayed.
     * @public
     * @since 1.17.0
    */
    label: Array<HTMLElement>;
    _onMenuClick: (e: CustomEvent<SelectMenuOptionClick>) => void;
    _onMenuClose: () => void;
    _onMenuOpen: () => void;
    _onMenuBeforeOpen: () => void;
    _onMenuChange: (e: CustomEvent<SelectMenuChange>) => void;
    _attachMenuListeners: (menu: HTMLElement) => void;
    _detachMenuListeners: (menu: HTMLElement) => void;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _onfocusin(): void;
    _onfocusout(): void;
    get _isPickerOpen(): boolean;
    _respPopover(): Promise<ResponsivePopover>;
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
    /**
     * Currently selected `ui5-option` element.
     * @public
     * @default undefined
     */
    get selectedOption(): IOption | undefined;
    onMenuClick(e: CustomEvent<SelectMenuOptionClick>): void;
    onMenuBeforeOpen(): void;
    onMenuOpen(): void;
    onMenuClose(): void;
    onMenuChange(e: CustomEvent<SelectMenuChange>): void;
    _toggleSelectMenu(): void;
    onExitDOM(): void;
    _toggleRespPopover(): Promise<void>;
    _attachRealDomRefs(): Promise<void>;
    _syncSelection(): void;
    _getSelectMenu(): SelectMenu | undefined;
    attachMenuListeners(menu: HTMLElement): void;
    detachMenuListeners(menu: HTMLElement): void;
    _enableFormSupport(): void;
    _onkeydown(e: KeyboardEvent): void;
    _handleKeyboardNavigation(e: KeyboardEvent): void;
    _selectTypedItem(text: string): void;
    _searchNextItemByText(text: string): IOption | undefined;
    _handleHomeKey(e: KeyboardEvent): void;
    _handleEndKey(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _getSelectedItemIndex(item: ListItemBase): number;
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
    _afterClose(): void;
    get selectOptions(): Array<IOption>;
    get hasCustomLabel(): boolean;
    _fireChangeEvent(selectedOption: IOption): void;
    get valueStateTextMappings(): {
        Success: string;
        Information: string;
        Error: string;
        Warning: string;
    };
    get valueStateTypeMappings(): {
        Success: string;
        Information: string;
        Error: string;
        Warning: string;
    };
    get valueStateText(): string;
    get valueStateDefaultText(): string;
    get valueStateTypeText(): string;
    get hasValueState(): boolean;
    get valueStateTextId(): string | undefined;
    get isDisabled(): true | undefined;
    get _headerTitleText(): string;
    get _currentlySelectedOption(): IOption;
    get _effectiveTabIndex(): "0" | "-1";
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
    get _filteredItems(): IOption[];
    itemSelectionAnnounce(): void;
    openValueStatePopover(): Promise<void>;
    closeValueStatePopover(): void;
    toggleValueStatePopover(open: boolean): void;
    get selectedOptionIcon(): string | null | undefined;
    _getPopover(): Promise<Popover | null>;
    static onDefine(): Promise<void>;
}
export default Select;
export type { SelectChangeEventDetail, SelectLiveChangeEventDetail, IOption, };
