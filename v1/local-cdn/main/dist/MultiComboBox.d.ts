import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ClassMap, Timeout } from "@ui5/webcomponents-base/dist/types.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/multiselect-all.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import Tokenizer from "./Tokenizer.js";
import type { TokenizerTokenDeleteEventDetail } from "./Tokenizer.js";
import type { IIcon } from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import type { ListSelectionChangeEventDetail } from "./List.js";
import ComboBoxFilter from "./types/ComboBoxFilter.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type ListItemBase from "./ListItemBase.js";
import { InputEventDetail } from "./Input.js";
/**
 * Interface for components that may be slotted inside a `ui5-multi-combobox` as items
 * @public
 */
interface IMultiComboBoxItem extends UI5Element {
    text: string;
    selected: boolean;
    isGroupItem?: boolean;
    stableDomRef: string;
}
type ValueStateAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type ValueStateTypeAnnouncement = Record<Exclude<ValueState, ValueState.None>, string>;
type MultiComboBoxSelectionChangeEventDetail = {
    items: Array<MultiComboBoxItem>;
};
type MultiComboboxItemWithSelection = {
    ref: IMultiComboBoxItem;
    selected: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-multi-combobox` component consists of a list box with items and a text field allowing the user to either type a value directly into the text field, or choose from the list of existing items.
 *
 * The drop-down list is used for selecting and filtering values, it enables users to select one or more options from a predefined list. The control provides an editable input field to filter the list, and a dropdown arrow to expand/collapse the list of available options.
 * The options in the list have checkboxes that permit multi-selection. Entered values are displayed as tokens.
 * ### Structure
 * The `ui5-multi-combobox` consists of the following elements:
 *
 * -  Tokenizer - a list of tokens with selected options.
 * -  Input field - displays the selected option/s as token/s. Users can type to filter the list.
 * -  Drop-down arrow - expands\collapses the option list.
 * -  Option list - the list of available options.
 *
 * ### Keyboard Handling
 *
 * The `ui5-multi-combobox` provides advanced keyboard handling.
 *
 * #### Picker
 * If the `ui5-multi-combobox` is focused,
 * you can open or close the drop-down by pressing [F4], [Alt] + [Up] or [Alt] + [Down] keys.
 * Once the drop-down is opened, you can use the `UP` and `DOWN` arrow keys
 * to navigate through the available options and select one by pressing the `Space` or `Enter` keys.
 *
 * #### Tokens
 *
 * -  Left/Right arrow keys - moves the focus selection form the currently focused token to the previous/next one (if available).
 * -  Delete -  deletes the token and focuses the previous token.
 * -  Backspace -  deletes the token and focus the next token.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/MultiComboBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.11.0
 * @csspart token-\{index\} - Used to style each token(where `token-0` corresponds to the first item)
 */
declare class MultiComboBox extends UI5Element {
    /**
     * Defines the value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @formEvents change input
     * @formProperty
     * @public
     */
    value: string;
    /**
     * Defines whether the value will be autcompleted to match an item
     * @default false
     * @public
     * @since 1.4.0
     */
    noTypeahead: boolean;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default ""
     * @public
     */
    placeholder: string;
    /**
     * Defines if the user input will be prevented, if no matching item has been found
     * @default false
     * @public
     */
    allowCustomValues: boolean;
    /**
     * Defines whether the component is in disabled state.
     *
     * **Note:** A disabled component is completely noninteractive.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is read-only.
     *
     * **Note:** A read-only component is not editable,
     * but still provides visual feedback upon user interaction.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines whether the component is required.
     * @default false
     * @public
     * @since 1.0.0-rc.5
     */
    required: boolean;
    /**
     * Defines the filter type of the component.
     * @default "StartsWithPerTerm"
     * @public
     */
    filter: `${ComboBoxFilter}`;
    /**
     * Defines whether the clear icon of the multi-combobox will be shown.
     * @default false
     * @public
     * @since 1.20.1
     */
    showClearIcon: boolean;
    /**
     * Defines the accessible ARIA name of the component.
     * @default ""
     * @public
     * @since 1.4.0
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default ""
     * @public
     * @since 1.4.0
     */
    accessibleNameRef: string;
    /**
     * Determines if the select all checkbox is visible on top of suggestions.
     * @default false
     * @public
     */
    showSelectAll: boolean;
    _effectiveValueState: `${ValueState}`;
    /**
     * Indicates whether the dropdown is open. True if the dropdown is open, false otherwise.
     * @default false
     * @private
     */
    _open: boolean;
    _valueBeforeOpen: string;
    _filteredItems: Array<IMultiComboBoxItem>;
    _previouslySelectedItems: Array<IMultiComboBoxItem>;
    filterSelected: boolean;
    focused: boolean;
    _tokenizerFocused: boolean;
    _iconPressed: boolean;
    _inputWidth: number;
    _listWidth: number;
    _performingSelectionTwice: boolean;
    _allSelected: boolean;
    _effectiveShowClearIcon: boolean;
    _dialogInputValueState: `${ValueState}`;
    /**
     * Indicates whether the tokenizer has tokens
     * @private
     */
    tokenizerAvailable: boolean;
    /**
     * Defines the component items.
     * @public
     */
    items: Array<IMultiComboBoxItem>;
    /**
    * Defines the icon to be displayed in the component.
    * @public
    * @since 1.0.0-rc.9
    */
    icon: Array<IIcon>;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     * The value state message slot should contain only one root element.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Warning` or `Error` value state.
     * @since 1.0.0-rc.9
     * @public
     */
    valueStateMessage: Array<HTMLElement>;
    selectedValues: Array<IMultiComboBoxItem>;
    _inputLastValue: string;
    _deleting: boolean;
    _validationTimeout: Timeout | null;
    _handleResizeBound: ResizeObserverCallback;
    valueBeforeAutoComplete: string;
    currentItemIdx: number;
    _lastValue: string;
    _shouldFilterItems?: boolean;
    _showMorePressed?: boolean;
    _clearingValue?: boolean;
    allItemsPopover?: ResponsivePopover;
    valueStateHeader?: HTMLElement;
    list?: List;
    _shouldAutocomplete?: boolean;
    _preventTokenizerToggle?: boolean;
    _isOpenedByKeyboard?: boolean;
    _itemToFocus?: IMultiComboBoxItem;
    _itemsBeforeOpen: Array<MultiComboboxItemWithSelection>;
    selectedItems?: Array<IMultiComboBoxItem>;
    FormSupport?: typeof FormSupportT;
    static i18nBundle: I18nBundle;
    constructor();
    onEnterDOM(): void;
    onExitDOM(): void;
    _handleResize(): void;
    _handleMobileInput(e: CustomEvent<InputEventDetail>): void;
    _inputChange(): void;
    _mobileInputChange(e: CustomEvent): Promise<void>;
    _togglePopover(): void;
    togglePopoverByDropdownIcon(): void;
    _showFilteredItems(): void;
    filterSelectedItems(e: MouseEvent): void;
    /**
     * Indicates whether the dropdown is open. True if the dropdown is open, false otherwise.
     * @default false
     * @public
     */
    get open(): boolean;
    get _showAllItemsButtonPressed(): boolean;
    get _inputDom(): HTMLInputElement;
    _inputLiveChange(e: InputEvent): void;
    _tokenDelete(e: CustomEvent<TokenizerTokenDeleteEventDetail>): void;
    get _getPlaceholder(): string;
    _handleArrowLeft(): void;
    _tokenizerFocusOut(e: FocusEvent): void;
    _tokenizerFocusIn(): void;
    _onkeydown(e: KeyboardEvent): void;
    _selectItems(matchingItems: IMultiComboBoxItem[]): void;
    _handlePaste(e: ClipboardEvent): void;
    _handleTokenCreationUponPaste(pastedText: string, e: KeyboardEvent | ClipboardEvent): void;
    _handleInsertPaste(e: KeyboardEvent): Promise<void>;
    _handleShow(e: KeyboardEvent): void;
    _handlePageUp(e: KeyboardEvent): void;
    _handlePageDown(e: KeyboardEvent): void;
    _handleBackspace(e: KeyboardEvent): void;
    _handleEscape(): void;
    _handleHome(e: KeyboardEvent): void;
    _handleEnd(e: KeyboardEvent): void;
    _handleTab(): void;
    _handleSelectAll(): void;
    _onListHeaderKeydown(e: KeyboardEvent): Promise<void>;
    _handleSelectAllCheckboxClick(e: CustomEvent): void;
    _onItemKeydown(e: KeyboardEvent): Promise<void>;
    _handleArrowCtrl(e: KeyboardEvent): void;
    _onItemTab(): void;
    _handleArrowNavigation(e: KeyboardEvent, isDownControl: boolean): Promise<void>;
    _handleArrowDown(): Promise<void>;
    _handleItemRangeSelection(e: KeyboardEvent): void;
    _navigateToNextItem(): void;
    _navigateToPrevItem(): void;
    _handleEnter(): void;
    _resetValueState(valueState: `${ValueState}`, callback?: () => void): void;
    _onTokenizerKeydown(e: KeyboardEvent): void;
    _filterItems(str: string): IMultiComboBoxItem[];
    /**
     * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
     * @private
     */
    static _groupItemFilter(item: IMultiComboBoxItem, idx: number, allItems: Array<IMultiComboBoxItem>, filteredItems: Array<IMultiComboBoxItem>): boolean | undefined;
    _afterOpenPicker(): void;
    _toggle(): void;
    _getSelectedItems(): Array<MultiComboBoxItem>;
    _listSelectionChange(e: CustomEvent<ListSelectionChangeEventDetail>): void;
    syncItems(listItems: Array<ListItemBase>): void;
    fireSelectionChange(): boolean;
    _getRespPopover(): Promise<void>;
    _getList(): Promise<List>;
    _click(): void;
    handleBeforeTokenizerPopoverOpen(): Promise<void>;
    _afterClosePicker(): void;
    _beforeOpen(): void;
    _handleTypeAhead(item: IMultiComboBoxItem, filterValue: string): void;
    _getFirstMatchingItem(current: string): IMultiComboBoxItem | undefined;
    _startsWithMatchingItems(str: string): IMultiComboBoxItem[];
    _revertSelection(): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    get _isPhone(): boolean;
    _onIconMousedown(): void;
    _clear(): void;
    _iconMouseDown(): void;
    storeResponsivePopoverWidth(): void;
    toggle(isToggled: boolean): void;
    handleCancel(): void;
    handleOK(): void;
    openPopover(): Promise<void>;
    _forwardFocusToInner(): void;
    get morePopoverOpener(): HTMLElement;
    closePopover(): Promise<void>;
    _getPopover(): Promise<Popover>;
    _getResponsivePopover(): Promise<ResponsivePopover>;
    _setValueStateHeader(): Promise<void>;
    get _tokenizer(): Tokenizer;
    inputFocusIn(e: FocusEvent): void;
    inputFocusOut(e: FocusEvent): void;
    get editable(): boolean;
    get _isFocusInside(): boolean;
    get selectedItemsListMode(): "None" | "MultiSelect";
    get _listItemsType(): "Inactive" | "Active";
    get hasValueState(): boolean;
    get hasValueStateMessage(): boolean;
    get ariaValueStateHiddenText(): string | undefined;
    get valueStateDefaultText(): string;
    get valueStateTextId(): "ui5-multi-combobox-valueStateDesc" | undefined;
    get valueStateMessageText(): Node[];
    get ariaLabelText(): string | undefined;
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon(): string;
    get _tokensCountText(): string | undefined;
    get _tokensCountTextId(): string;
    get _selectedTokensCount(): number;
    get ariaDescribedByText(): string;
    get shouldDisplayDefaultValueStateMessage(): boolean;
    get shouldDisplayOnlyValueStateMessage(): boolean;
    get valueStateTypeMappings(): ValueStateTypeAnnouncement;
    get valueStateTextMappings(): ValueStateAnnouncement;
    get _innerInput(): HTMLInputElement;
    get _headerTitleText(): string;
    get _iconAccessibleNameText(): string;
    get _showSelectedButtonAccessibleNameText(): string;
    get _dialogOkButton(): string;
    get _tokenizerExpanded(): boolean;
    get _valueStatePopoverHorizontalAlign(): "Left" | "Right";
    get iconsCount(): number;
    get clearIconAccessibleName(): string;
    get selectAllCheckboxLabel(): string;
    get classes(): ClassMap;
    get styles(): {
        popoverValueStateMessage: {
            width: string;
            display: string;
        };
        popoverHeader: {
            "max-width": string;
        };
        suggestionsPopover: {
            "min-width": string;
            "max-width": string;
        };
    };
    static onDefine(): Promise<void>;
}
export default MultiComboBox;
export type { IMultiComboBoxItem, MultiComboBoxSelectionChangeEventDetail, };
