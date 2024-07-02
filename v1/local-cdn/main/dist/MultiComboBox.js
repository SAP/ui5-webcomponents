var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MultiComboBox_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isShow, isDown, isUp, isSpace, isSpaceCtrl, isSpaceShift, isRight, isHome, isEnd, isTabNext, isTabPrevious, isUpShift, isDownShift, isLeftCtrl, isRightCtrl, isUpCtrl, isDownCtrl, isHomeCtrl, isEndCtrl, isCtrlA, isDeleteShift, isInsertShift, isInsertCtrl, isBackSpace, isDelete, isEscape, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isPhone, isAndroid, isFirefox, } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/multiselect-all.js";
import "@ui5/webcomponents-icons/dist/not-editable.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/information.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import MultiComboBoxItem from "./MultiComboBoxItem.js";
import MultiComboBoxGroupItem from "./MultiComboBoxGroupItem.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";
import Tokenizer, { ClipboardDataOperation } from "./Tokenizer.js";
import Token from "./Token.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import ToggleButton from "./ToggleButton.js";
import * as Filters from "./Filters.js";
import Button from "./Button.js";
import { VALUE_STATE_SUCCESS, VALUE_STATE_ERROR, VALUE_STATE_WARNING, VALUE_STATE_INFORMATION, VALUE_STATE_TYPE_SUCCESS, VALUE_STATE_TYPE_INFORMATION, VALUE_STATE_TYPE_ERROR, VALUE_STATE_TYPE_WARNING, INPUT_SUGGESTIONS_TITLE, SELECT_OPTIONS, SHOW_SELECTED_BUTTON, MULTICOMBOBOX_DIALOG_OK_BUTTON, VALUE_STATE_ERROR_ALREADY_SELECTED, MCB_SELECTED_ITEMS, INPUT_CLEAR_ICON_ACC_NAME, } from "./generated/i18n/i18n-defaults.js";
// Templates
import MultiComboBoxTemplate from "./generated/templates/MultiComboBoxTemplate.lit.js";
import MultiComboBoxPopoverTemplate from "./generated/templates/MultiComboBoxPopoverTemplate.lit.js";
// Styles
import multiCbxStyles from "./generated/themes/MultiComboBox.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import SuggestionsCss from "./generated/themes/Suggestions.css.js";
import MultiComboBoxPopover from "./generated/themes/MultiComboBoxPopover.css.js";
import ComboBoxFilter from "./types/ComboBoxFilter.js";
import CheckBox from "./CheckBox.js";
import "./Input.js";
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
let MultiComboBox = MultiComboBox_1 = class MultiComboBox extends UI5Element {
    constructor() {
        super();
        this._filteredItems = [];
        this._previouslySelectedItems = [];
        this.selectedValues = [];
        this._itemsBeforeOpen = [];
        this._inputLastValue = "";
        this._deleting = false;
        this._validationTimeout = null;
        this._handleResizeBound = this._handleResize.bind(this);
        this.valueBeforeAutoComplete = "";
        this._lastValue = this.getAttribute("value") || "";
        this.currentItemIdx = -1;
        this.FormSupport = undefined;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
    }
    _handleResize() {
        this._inputWidth = this.offsetWidth;
    }
    _handleMobileInput(e) {
        const target = e.target;
        const value = target.value;
        if (!this.allowCustomValues && !this._filterItems(value).length) {
            this._dialogInputValueState = ValueState.Error;
        }
        else {
            this._dialogInputValueState = this.valueState;
        }
        this.value = value;
        this._shouldFilterItems = true;
        this.valueBeforeAutoComplete = value;
        this.fireEvent("input");
    }
    _inputChange() {
        if (!this._clearingValue && this._lastValue !== this.value) {
            this._lastValue = this.value;
            this.fireEvent("change");
        }
    }
    async _mobileInputChange(e) {
        this._inputChange.call(this);
        const { value } = e.target;
        const matchingItem = this.items.find(item => item.text === value);
        if (!matchingItem) {
            return;
        }
        const initiallySelected = matchingItem?.selected;
        const changePrevented = this.fireSelectionChange();
        if (!changePrevented) {
            matchingItem.selected = !initiallySelected;
            (await this._getResponsivePopover()).close();
            this.value = "";
        }
    }
    _togglePopover() {
        this._tokenizer.closeMorePopover();
        this.allItemsPopover?.toggle(this);
    }
    togglePopoverByDropdownIcon() {
        this._shouldFilterItems = false;
        this.allItemsPopover?.toggle(this);
        this._tokenizer.closeMorePopover();
    }
    _showFilteredItems() {
        this.filterSelected = true;
        this._showMorePressed = true;
        this._togglePopover();
    }
    filterSelectedItems(e) {
        this.filterSelected = e.target.pressed;
        const selectedItems = this._filteredItems.filter(item => item.selected);
        this.selectedItems = this.items.filter((item, idx, allItems) => MultiComboBox_1._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
    }
    /**
     * Indicates whether the dropdown is open. True if the dropdown is open, false otherwise.
     * @default false
     * @public
     */
    get open() {
        return this._open;
    }
    get _showAllItemsButtonPressed() {
        return this.filterSelected;
    }
    get _inputDom() {
        return this.shadowRoot.querySelector("#ui5-multi-combobox-input");
    }
    _inputLiveChange(e) {
        const input = e.target;
        const value = input.value;
        const filteredItems = this._filterItems(value);
        const oldValueState = this.valueState;
        this._shouldFilterItems = true;
        if (this.filterSelected) {
            this.filterSelected = false;
        }
        if (this._validationTimeout) {
            if (this._filterItems(value).length) {
                this.valueState = this._effectiveValueState;
                this._validationTimeout = null;
            }
            else {
                input.value = this._inputLastValue;
                return;
            }
        }
        this._effectiveValueState = this.valueState;
        if (!filteredItems.length && value && !this.allowCustomValues) {
            const newValue = this.valueBeforeAutoComplete || this._inputLastValue;
            input.value = newValue;
            this.value = newValue;
            this.valueState = ValueState.Error;
            this._shouldAutocomplete = false;
            this._resetValueState(oldValueState);
            return;
        }
        this._inputLastValue = input.value;
        this.value = input.value;
        this._filteredItems = filteredItems;
        if (!isPhone()) {
            if (filteredItems.length === 0) {
                this.allItemsPopover?.close();
            }
            else {
                this.allItemsPopover?.showAt(this);
            }
        }
        this.fireEvent("input");
    }
    _tokenDelete(e) {
        this._previouslySelectedItems = this._getSelectedItems();
        const token = e.detail.ref;
        const deletingItem = this.items.find(item => item._id === token.getAttribute("data-ui5-id"));
        deletingItem.selected = false;
        this._deleting = true;
        this._preventTokenizerToggle = true;
        this.focus();
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    get _getPlaceholder() {
        if (this._getSelectedItems().length) {
            return "";
        }
        return this.placeholder;
    }
    _handleArrowLeft() {
        const inputDomRef = this._inputDom;
        const cursorPosition = inputDomRef.selectionStart || 0;
        const isTextSelected = ((inputDomRef.selectionEnd || 0) - cursorPosition) > 0;
        if (cursorPosition === 0 && !isTextSelected) {
            this._tokenizer._focusLastToken();
        }
    }
    _tokenizerFocusOut(e) {
        this._tokenizerFocused = false;
        const tokensCount = this._tokenizer.tokens.length;
        const selectedTokens = this._selectedTokensCount;
        const lastTokenBeingDeleted = tokensCount - 1 === 0 && this._deleting;
        const allTokensAreBeingDeleted = selectedTokens === tokensCount && this._deleting;
        const relatedTarget = e.relatedTarget;
        const isFocusingPopover = this.staticAreaItem === relatedTarget;
        const isFocusingInput = this._inputDom === relatedTarget;
        const isFocusingMorePopover = e.relatedTarget === this._tokenizer.staticAreaItem;
        if (!relatedTarget?.hasAttribute("ui5-token") && !isFocusingPopover && !isFocusingInput && !isFocusingMorePopover) {
            this._tokenizer.tokens.forEach(token => {
                token.selected = false;
            });
            this._tokenizer.expanded = this._preventTokenizerToggle ? this._tokenizer.expanded : false;
        }
        if (allTokensAreBeingDeleted || lastTokenBeingDeleted) {
            setTimeout(() => {
                if (!isPhone()) {
                    this._inputDom.focus();
                }
                this._deleting = false;
            }, 0);
        }
    }
    _tokenizerFocusIn() {
        this._tokenizerFocused = true;
        this.focused = false;
    }
    _onkeydown(e) {
        const isArrowDownCtrl = isDownCtrl(e);
        const isCtrl = e.metaKey || e.ctrlKey;
        if (isShow(e) && !this.disabled) {
            this._handleShow(e);
            return;
        }
        if (isDownShift(e) || isUpShift(e)) {
            e.preventDefault();
            return;
        }
        if (isUp(e) || isDown(e) || isUpCtrl(e) || isArrowDownCtrl) {
            this._handleArrowNavigation(e, isArrowDownCtrl);
            return;
        }
        // CTRL + Arrow Down navigation is performed by the ItemNavigation module of the List,
        // here we only implement the text selection of the selected item
        if (isArrowDownCtrl && !this.allItemsPopover?.opened) {
            setTimeout(() => this._inputDom.setSelectionRange(0, this._inputDom.value.length), 0);
        }
        if (isLeftCtrl(e) || isRightCtrl(e)) {
            this._handleArrowCtrl(e);
            return;
        }
        if (isInsertShift(e)) {
            this._handleInsertPaste(e);
            return;
        }
        if (isCtrl && e.key.toLowerCase() === "i" && this._tokenizer.tokens.length > 0) {
            e.preventDefault();
            this._togglePopover();
        }
        if (isSpaceShift(e)) {
            e.preventDefault();
        }
        if (e.key === "ArrowLeft"
            || e.key === "Show"
            || e.key === "PageUp"
            || e.key === "PageDown"
            || e.key === "Backspace"
            || e.key === "Escape"
            || e.key === "Home"
            || e.key === "End"
            || e.key === "Tab"
            || e.key === "ArrowDown"
            || e.key === "Enter") {
            this[`_handle${e.key}`](e);
        }
        this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e) || isEnter(e));
    }
    _selectItems(matchingItems) {
        this._previouslySelectedItems = this._getSelectedItems();
        matchingItems.forEach(item => {
            item.selected = true;
            this.value = "";
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        });
    }
    _handlePaste(e) {
        if (this.readonly || !e.clipboardData) {
            return;
        }
        const pastedText = (e.clipboardData).getData("text/plain");
        if (!pastedText) {
            return;
        }
        this._handleTokenCreationUponPaste(pastedText, e);
    }
    _handleTokenCreationUponPaste(pastedText, e) {
        const separatedText = pastedText.split(/\r\n|\r|\n|\t/g).filter(t => !!t);
        const matchingItems = this.items.filter(item => separatedText.includes(item.text) && !item.selected);
        if (matchingItems.length > 1) {
            e.preventDefault();
            this._selectItems(matchingItems);
        }
    }
    async _handleInsertPaste(e) {
        if (this.readonly || isFirefox()) {
            return;
        }
        const pastedText = await navigator.clipboard.readText();
        if (!pastedText) {
            return;
        }
        this._handleTokenCreationUponPaste(pastedText, e);
    }
    _handleShow(e) {
        const items = this.items;
        const selectedItem = this._getSelectedItems()[0];
        const focusedToken = this._tokenizer.tokens.find(token => token.focused);
        const value = this.value;
        const matchingItem = this.items.find(item => item.text.localeCompare(value, undefined, { sensitivity: "base" }) === 0);
        e.preventDefault();
        if (this.readonly) {
            return;
        }
        this._isOpenedByKeyboard = true;
        this._shouldFilterItems = false;
        this._filteredItems = this.items;
        this._togglePopover();
        if (!focusedToken && matchingItem) {
            this._itemToFocus = matchingItem;
            return;
        }
        if (selectedItem && !focusedToken) {
            this._itemToFocus = selectedItem;
        }
        else if (focusedToken && e.target === focusedToken) {
            this._itemToFocus = items.find(item => item.text === focusedToken.text);
        }
        else {
            this._itemToFocus = items[0];
        }
    }
    _handlePageUp(e) {
        e.preventDefault();
    }
    _handlePageDown(e) {
        e.preventDefault();
    }
    _handleBackspace(e) {
        if (e.target.value === "") {
            e.preventDefault();
            this._tokenizer._focusLastToken();
        }
    }
    _handleEscape() {
        const innerInput = this._innerInput;
        const isAutoCompleted = ((innerInput.selectionEnd || 0) - (innerInput.selectionStart || 0)) > 0;
        if (isAutoCompleted) {
            this.value = this.valueBeforeAutoComplete;
        }
        if (!this.allowCustomValues || (!this.open && this.allowCustomValues)) {
            this.value = this._lastValue;
        }
    }
    _handleHome(e) {
        const shouldFocusToken = this._isFocusInside && e.target.selectionStart === 0 && this._tokenizer.tokens.length > 0;
        if (shouldFocusToken) {
            e.preventDefault();
            this._tokenizer.tokens[0].focus();
        }
    }
    _handleEnd(e) {
        const tokens = this._tokenizer.tokens;
        const lastTokenIdx = tokens.length - 1;
        const shouldFocusInput = e.target === tokens[lastTokenIdx] && tokens[lastTokenIdx] === this.shadowRoot.activeElement;
        if (shouldFocusInput) {
            e.preventDefault();
            this._inputDom.focus();
        }
    }
    _handleTab() {
        this.allItemsPopover?.close();
    }
    _handleSelectAll() {
        const filteredItems = this._filteredItems;
        const allItemsSelected = filteredItems.every(item => item.selected);
        this._previouslySelectedItems = filteredItems.filter(item => item.selected).map(item => item);
        filteredItems.forEach(item => {
            item.selected = !allItemsSelected;
        });
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    async _onListHeaderKeydown(e) {
        const isArrowDown = isDown(e);
        const isArrowUp = isUp(e);
        const isSelectAllFocused = e.target.classList.contains("ui5-mcb-select-all-checkbox");
        if (isTabNext(e) || isTabPrevious(e)) {
            this._onItemTab();
            return;
        }
        e.preventDefault();
        if (isArrowDown || isDownCtrl(e)) {
            if (this.showSelectAll && !isSelectAllFocused) {
                return (await this._getResponsivePopover()).querySelector(".ui5-mcb-select-all-checkbox").focus();
            }
            this._handleArrowDown();
        }
        if (isArrowUp || isUpCtrl(e)) {
            if (e.target === this.valueStateHeader || !this.valueStateHeader) {
                this._shouldAutocomplete = true;
                return this._inputDom.focus();
            }
            if (this.showSelectAll && isSelectAllFocused) {
                this.valueStateHeader?.focus();
            }
        }
    }
    _handleSelectAllCheckboxClick(e) {
        if (!this.filterSelected) {
            this._handleSelectAll();
            this.filterSelected = false;
        }
        else {
            this._previouslySelectedItems = this._getSelectedItems();
            this.selectedItems?.forEach(item => {
                item.selected = e.target.checked;
            });
            if (!e.target.checked) {
                this.filterSelected = false;
            }
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        }
    }
    async _onItemKeydown(e) {
        const isFirstItem = this.list?.items[0] === e.target;
        const isArrowUp = isUp(e) || isUpCtrl(e);
        if (this.hasValueStateMessage && !this.valueStateHeader) {
            await this._setValueStateHeader();
        }
        if (isTabNext(e) || isTabPrevious(e)) {
            this._onItemTab();
            return;
        }
        if (isHomeCtrl(e)) {
            this.list?._itemNavigation._handleHome();
            this.list?.items[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isEndCtrl(e)) {
            this.list?._itemNavigation._handleEnd();
            this.list?.items[this.list?._itemNavigation._currentIndex].focus();
        }
        e.preventDefault();
        if (isDownShift(e) || isUpShift(e)) {
            this._handleItemRangeSelection(e);
            return;
        }
        if ((isUpCtrl(e)) && !isFirstItem) {
            this.list?._itemNavigation._handleUp();
            this.list?.items[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isDownCtrl(e)) {
            this.list?._itemNavigation._handleDown();
            this.list?.items[this.list?._itemNavigation._currentIndex].focus();
        }
        if (isShow(e)) {
            this._togglePopover();
        }
        if (isCtrlA(e)) {
            this._handleSelectAll();
            return;
        }
        if (isFirstItem && isArrowUp) {
            if (this.showSelectAll) {
                (await this._getResponsivePopover()).querySelector(".ui5-mcb-select-all-checkbox").focus();
            }
            else if (this.valueStateHeader) {
                this.valueStateHeader.focus();
            }
            else {
                this._inputDom.focus();
                this._shouldAutocomplete = true;
            }
        }
    }
    _handleArrowCtrl(e) {
        const input = this._inputDom;
        const isArrowLeft = isLeftCtrl(e);
        if (isArrowLeft && input.selectionStart === 0 && input.selectionEnd === 0) {
            e.preventDefault();
        }
        if (isArrowLeft && ((input.selectionEnd || 0) - (input.selectionStart || 0) > 0)) {
            input.setSelectionRange(0, 0);
        }
    }
    _onItemTab() {
        this._inputDom.focus();
        this.allItemsPopover?.close();
    }
    async _handleArrowNavigation(e, isDownControl) {
        const isArrowDown = isDownControl || isDown(e);
        const hasSuggestions = this.items.length;
        const isOpen = this.allItemsPopover?.opened;
        e.preventDefault();
        if (this.hasValueStateMessage && !this.valueStateHeader) {
            await this._setValueStateHeader();
        }
        if (isArrowDown && isOpen) {
            if (this.valueStateHeader) {
                this.value = this.valueBeforeAutoComplete || this.value;
                this.valueStateHeader.focus();
                return;
            }
            if (this.showSelectAll) {
                (await this._getResponsivePopover()).querySelector(".ui5-mcb-select-all-checkbox").focus();
                return;
            }
        }
        if (isArrowDown && hasSuggestions) {
            this._handleArrowDown();
        }
        if (!isArrowDown && !isOpen && !this.readonly) {
            this._navigateToPrevItem();
        }
    }
    async _handleArrowDown() {
        const isOpen = this.allItemsPopover?.opened;
        const firstListItem = this.list?.items[0];
        if (isOpen) {
            firstListItem && this.list?._itemNavigation.setCurrentItem(firstListItem);
            this.value = this.valueBeforeAutoComplete || this.value;
            // wait item navigation to apply correct tabindex
            await renderFinished();
            firstListItem?.focus();
        }
        else if (!this.readonly) {
            this._navigateToNextItem();
        }
    }
    _handleItemRangeSelection(e) {
        const items = this.items;
        const listItems = this.list?.items;
        const currentItemIdx = Number(listItems?.indexOf(e.target));
        const nextItemIdx = currentItemIdx + 1;
        const prevItemIdx = currentItemIdx - 1;
        this._previouslySelectedItems = this._getSelectedItems();
        if (isDownShift(e) && items[nextItemIdx]) {
            items[nextItemIdx].selected = items[currentItemIdx].selected;
            items[nextItemIdx].focus();
        }
        if (isUpShift(e) && items[prevItemIdx]) {
            items[prevItemIdx].selected = items[currentItemIdx].selected;
            items[prevItemIdx].focus();
        }
        const changePrevented = this.fireSelectionChange();
        if (changePrevented) {
            this._revertSelection();
        }
    }
    _navigateToNextItem() {
        const items = this.items;
        const itemsCount = items.length;
        const previousItemIdx = this.currentItemIdx;
        if (previousItemIdx > -1 && items[previousItemIdx].text !== this.value) {
            this.currentItemIdx = -1;
        }
        if (previousItemIdx >= itemsCount - 1) {
            return;
        }
        let currentItem = this.items[++this.currentItemIdx];
        while ((this.currentItemIdx < itemsCount - 1 && currentItem.selected) || currentItem.isGroupItem) {
            currentItem = this.items[++this.currentItemIdx];
        }
        if (currentItem.selected === true || currentItem.isGroupItem) {
            this.currentItemIdx = previousItemIdx;
            return;
        }
        this.value = currentItem.text;
        this._innerInput.value = currentItem.text;
        this._innerInput.setSelectionRange(0, currentItem.text.length);
    }
    _navigateToPrevItem() {
        const items = this.items;
        let previousItemIdx = this.currentItemIdx;
        if ((!this.value && previousItemIdx !== -1) || (previousItemIdx !== -1 && this.value && this.value !== items[previousItemIdx].text)) {
            previousItemIdx = -1;
        }
        if (previousItemIdx === -1) {
            this.currentItemIdx = items.length;
        }
        if (previousItemIdx === 0) {
            this.currentItemIdx = 0;
            return;
        }
        let currentItem = this.items[--this.currentItemIdx];
        while ((currentItem && this.currentItemIdx > 0) && (currentItem.selected || currentItem.isGroupItem)) {
            currentItem = this.items[--this.currentItemIdx];
        }
        if (!currentItem) {
            return;
        }
        if (currentItem.selected || currentItem.isGroupItem) {
            this.currentItemIdx = previousItemIdx;
            return;
        }
        this.value = currentItem.text;
        this._innerInput.value = currentItem.text;
        this._innerInput.setSelectionRange(0, currentItem.text.length);
    }
    _handleEnter() {
        const lowerCaseValue = this.value.toLowerCase();
        const matchingItem = this.items.find(item => (item.text.toLowerCase() === lowerCaseValue && !item.isGroupItem));
        const oldValueState = this.valueState;
        const innerInput = this._innerInput;
        if (this.FormSupport) {
            this.FormSupport.triggerFormSubmit(this);
        }
        if (matchingItem) {
            if (matchingItem.selected) {
                if (this._validationTimeout) {
                    return;
                }
                this.valueState = ValueState.Error;
                this._performingSelectionTwice = true;
                this._resetValueState(oldValueState, () => {
                    this._performingSelectionTwice = false;
                });
            }
            else {
                this._previouslySelectedItems = this._getSelectedItems();
                matchingItem.selected = true;
                this.value = "";
                const changePrevented = this.fireSelectionChange();
                if (changePrevented) {
                    this._revertSelection();
                }
            }
            innerInput.setSelectionRange(matchingItem.text.length, matchingItem.text.length);
            this.allItemsPopover?.close();
        }
    }
    _resetValueState(valueState, callback) {
        this._validationTimeout = setTimeout(() => {
            this._effectiveValueState = this.valueState;
            this.valueState = valueState;
            this._validationTimeout = null;
            callback && callback();
        }, 2000);
    }
    _onTokenizerKeydown(e) {
        const isCtrl = !!(e.metaKey || e.ctrlKey);
        if (isRight(e)) {
            const lastTokenIndex = this._tokenizer.tokens.length - this._tokenizer.overflownTokens.length - 1;
            if (e.target === this._tokenizer.tokens[lastTokenIndex]) {
                setTimeout(() => {
                    this._inputDom.focus();
                }, 0);
            }
        }
        if ((isCtrl && ["c", "x"].includes(e.key.toLowerCase())) || isDeleteShift(e) || isInsertCtrl(e)) {
            e.preventDefault();
            const isCut = e.key.toLowerCase() === "x" || isDeleteShift(e);
            const selectedTokens = this._tokenizer.tokens.filter(token => token.selected);
            if (isCut) {
                const cutResult = this._tokenizer._fillClipboard(ClipboardDataOperation.cut, selectedTokens);
                selectedTokens.forEach(token => {
                    this._tokenizer.deleteToken(token);
                });
                this.focus();
                return cutResult;
            }
            return this._tokenizer._fillClipboard(ClipboardDataOperation.copy, selectedTokens);
        }
        if (isInsertShift(e)) {
            this._handleInsertPaste(e);
        }
        if (isHome(e)) {
            this._handleHome(e);
        }
        if (isEnd(e)) {
            this._handleEnd(e);
        }
        if (isShow(e) && !this.readonly && !this.disabled) {
            this._preventTokenizerToggle = true;
            this._handleShow(e);
        }
        if (isCtrl && e.key.toLowerCase() === "i" && this._tokenizer.tokens.length > 0) {
            e.preventDefault();
            this._togglePopover();
        }
    }
    _filterItems(str) {
        const itemsToFilter = this.items.filter(item => !item.isGroupItem);
        const filteredItems = (Filters[this.filter] || Filters.StartsWithPerTerm)(str, itemsToFilter, "text");
        // Return the filtered items and their group items
        return this.items.filter((item, idx, allItems) => MultiComboBox_1._groupItemFilter(item, ++idx, allItems, filteredItems) || filteredItems.indexOf(item) !== -1);
    }
    /**
     * Returns true if the group header should be shown (if there is a filtered suggestion item for this group item)
     * @private
     */
    static _groupItemFilter(item, idx, allItems, filteredItems) {
        if (item.isGroupItem) {
            let groupHasFilteredItems;
            while (allItems[idx] && !allItems[idx].isGroupItem && !groupHasFilteredItems) {
                groupHasFilteredItems = filteredItems.indexOf(allItems[idx]) !== -1;
                idx++;
            }
            return groupHasFilteredItems;
        }
    }
    _afterOpenPicker() {
        this._toggle();
        if (!isPhone() && !this._isOpenedByKeyboard) {
            this._innerInput.focus();
        }
        else if (this._isOpenedByKeyboard) {
            this._itemToFocus?.focus();
        }
        else {
            this.allItemsPopover?.focus();
        }
        this._previouslySelectedItems = this._getSelectedItems();
        this._isOpenedByKeyboard = false;
    }
    _toggle() {
        this._open = !this._open;
        this.fireEvent("open-change");
    }
    _getSelectedItems() {
        // Angular 2 way data binding
        this.selectedValues = this.items.filter(item => item.selected);
        return this.selectedValues;
    }
    _listSelectionChange(e) {
        let changePrevented;
        if (!isPhone()) {
            this._previouslySelectedItems = this._getSelectedItems();
        }
        // sync list items and cb items
        this.syncItems(e.target.items);
        // don't call selection change right after selection as user can cancel it on phone
        if (!isPhone()) {
            changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                e.preventDefault();
                this._revertSelection();
            }
        }
        // casted to KeyboardEvent since isSpace and isSpaceCtrl accepts KeyboardEvent only
        const castedEvent = { key: e.detail.key };
        if (!e.detail.selectedItems.length && this.filterSelected) {
            this.filterSelected = false;
        }
        if (!e.detail.selectionComponentPressed && !isSpace(castedEvent) && !isSpaceCtrl(castedEvent)) {
            this.allItemsPopover?.close();
            this.value = "";
            // if the item (not checkbox) is clicked, call the selection change
            if (isPhone()) {
                changePrevented = this.fireSelectionChange();
                if (changePrevented) {
                    e.preventDefault();
                    this._revertSelection();
                }
            }
            this.fireEvent("input");
        }
        this.value = this.valueBeforeAutoComplete || "";
    }
    syncItems(listItems) {
        listItems.forEach(item => {
            this.items.forEach(mcbItem => {
                if (mcbItem._id === item.getAttribute("data-ui5-token-id")) {
                    mcbItem.selected = item.selected;
                }
            });
        });
    }
    fireSelectionChange() {
        const changePrevented = !this.fireEvent("selection-change", {
            items: this._getSelectedItems(),
        }, true);
        // Angular 2 way data binding
        this.fireEvent("value-changed");
        return changePrevented;
    }
    async _getRespPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        this.allItemsPopover = staticAreaItem.querySelector(`.ui5-multi-combobox-all-items-responsive-popover`);
    }
    async _getList() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        this.list = staticAreaItem.querySelector(".ui5-multi-combobox-all-items-list");
        return this.list;
    }
    _click() {
        if (isPhone() && !this.readonly && !this._showMorePressed && !this._deleting) {
            this.allItemsPopover?.showAt(this);
        }
        this._showMorePressed = false;
    }
    async handleBeforeTokenizerPopoverOpen() {
        const tokens = this._tokenizer.tokens;
        const hasTruncatedToken = tokens.length === 1 && tokens[0].isTruncatable;
        const popover = (await this._getResponsivePopover());
        if (hasTruncatedToken) {
            popover?.close(false, false, true);
        }
    }
    _afterClosePicker() {
        // close device's keyboard and prevent further typing
        if (isPhone()) {
            this._dialogInputValueState = this.valueState;
            this.blur();
        }
        this._toggle();
        this._iconPressed = false;
        this._preventTokenizerToggle = false;
        this.filterSelected = false;
    }
    _beforeOpen() {
        this._itemsBeforeOpen = this.items.map(item => {
            return {
                ref: item,
                selected: item.selected,
            };
        });
        this._valueBeforeOpen = this.value;
        this._dialogInputValueState = this.valueState;
        // in order to use the autocomplete feature of the input we should not set value in state
        this._innerInput.value = this.value;
        if (this.filterSelected) {
            const selectedItems = this._filteredItems.filter(item => item.selected);
            this.selectedItems = this.items.filter((item, idx, allItems) => MultiComboBox_1._groupItemFilter(item, ++idx, allItems, selectedItems) || selectedItems.indexOf(item) !== -1);
        }
    }
    _handleTypeAhead(item, filterValue) {
        if (!item) {
            return;
        }
        const value = item.text;
        const innerInput = this._innerInput;
        filterValue = filterValue || "";
        this.value = value;
        innerInput.value = value;
        innerInput.setSelectionRange(filterValue.length, value.length);
        this._shouldAutocomplete = false;
    }
    _getFirstMatchingItem(current) {
        if (!this.items.length) {
            return;
        }
        const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.isGroupItem && !item.selected);
        if (matchingItems.length) {
            return matchingItems[0];
        }
    }
    _startsWithMatchingItems(str) {
        return Filters.StartsWith(str, this.items, "text");
    }
    _revertSelection() {
        this._filteredItems.forEach(item => {
            item.selected = this._previouslySelectedItems.includes(item);
        });
    }
    onBeforeRendering() {
        const input = this._innerInput;
        const autoCompletedChars = input && (input.selectionEnd || 0) - (input.selectionStart || 0);
        const value = input && input.value;
        if (this.open) {
            this._getList().then(list => {
                const selectedItemsCount = list?.querySelectorAll("[ui5-li][selected]")?.length;
                const allItemsCount = list?.querySelectorAll("[ui5-li]")?.length;
                this._allSelected = selectedItemsCount === allItemsCount;
            });
        }
        this._effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
        this.FormSupport = getFeature("FormSupport");
        this._inputLastValue = value;
        if (input && !input.value) {
            this.valueBeforeAutoComplete = "";
            this._filteredItems = this.items;
        }
        this.items.forEach(item => {
            item._getRealDomRef = () => this.allItemsPopover.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
        });
        this.tokenizerAvailable = this._getSelectedItems().length > 0;
        this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
        if (!input || !value) {
            return;
        }
        // Typehead causes issues on Android devices, so we disable it for now
        // If there is already a selection the autocomplete has already been performed
        if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars) {
            const item = this._getFirstMatchingItem(value);
            // Keep the original typed in text intact
            this.valueBeforeAutoComplete = value;
            item && this._handleTypeAhead(item, value);
        }
        if (this._shouldFilterItems) {
            this._filteredItems = this._filterItems(this._shouldAutocomplete || !!autoCompletedChars ? this.valueBeforeAutoComplete : value);
        }
        else {
            this._filteredItems = this.items;
        }
    }
    async onAfterRendering() {
        await this._getRespPopover();
        await this._getList();
        this.toggle(this.shouldDisplayOnlyValueStateMessage);
        this.storeResponsivePopoverWidth();
        this._deleting = false;
        // force resize of the tokenizer on invalidation
        this._tokenizer._handleResize();
    }
    get _isPhone() {
        return isPhone();
    }
    _onIconMousedown() {
        this._iconPressed = true;
    }
    _clear() {
        this.value = "";
        this._inputDom.value = "";
        this.fireEvent("input");
        if (!this._isPhone) {
            this.focus();
        }
    }
    _iconMouseDown() {
        this._clearingValue = true;
    }
    storeResponsivePopoverWidth() {
        if (this.open && !this._listWidth) {
            this._listWidth = this.list.offsetWidth;
        }
    }
    toggle(isToggled) {
        if (isToggled && !this.open) {
            this.openPopover();
        }
        else {
            this.closePopover();
        }
    }
    handleCancel() {
        this._itemsBeforeOpen.forEach(item => {
            if (item.ref instanceof MultiComboBoxItem) {
                item.ref.selected = item.selected;
            }
        });
        this._togglePopover();
        this.value = this._valueBeforeOpen;
    }
    handleOK() {
        if (isPhone()) {
            const changePrevented = this.fireSelectionChange();
            if (changePrevented) {
                this._revertSelection();
            }
        }
        if (!this.allowCustomValues) {
            this.value = "";
        }
        this._togglePopover();
    }
    async openPopover() {
        (await this._getPopover())?.showAt(this);
    }
    _forwardFocusToInner() {
        this._innerInput.focus();
    }
    get morePopoverOpener() {
        const tokens = this._tokenizer?.tokens;
        if (tokens?.length === 1 && tokens[0].isTruncatable) {
            return tokens[0];
        }
        return this;
    }
    async closePopover() {
        (await this._getPopover())?.close();
    }
    async _getPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return (staticAreaItem.querySelector("[ui5-popover]"));
    }
    async _getResponsivePopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-responsive-popover]");
    }
    async _setValueStateHeader() {
        const responsivePopover = await this._getResponsivePopover();
        this.valueStateHeader = responsivePopover.querySelector("div.ui5-responsive-popover-header.ui5-valuestatemessage-root");
    }
    get _tokenizer() {
        return this.shadowRoot.querySelector("[ui5-tokenizer]");
    }
    inputFocusIn(e) {
        if (!isPhone() || this.readonly) {
            this.focused = true;
            this._tokenizer.expanded = true;
        }
        else {
            this._innerInput.blur();
        }
        this._clearingValue = false;
        if (!isPhone() && ((e.relatedTarget?.tagName !== "UI5-STATIC-AREA-ITEM") || !e.relatedTarget)) {
            this._innerInput.setSelectionRange(0, this.value.length);
        }
        this._tokenizer.tokens.forEach(token => {
            token.selected = false;
        });
        this.valueBeforeAutoComplete = "";
    }
    inputFocusOut(e) {
        if (!this.shadowRoot.contains(e.relatedTarget) && !this._deleting && !this._clearingValue) {
            this.focused = false;
            if (this._lastValue !== this.value) {
                this._inputChange();
            }
            this._tokenizer.expanded = this.open;
            // remove the value if user focus out the input and focus is not going in the popover
            if (!isPhone() && !this.allowCustomValues && (this.staticAreaItem !== e.relatedTarget)) {
                this.value = "";
            }
        }
    }
    get editable() {
        return !this.readonly;
    }
    get _isFocusInside() {
        return !isPhone() && (this.focused || this._tokenizerFocused);
    }
    get selectedItemsListMode() {
        return this.readonly ? "None" : "MultiSelect";
    }
    get _listItemsType() {
        return this.readonly ? "Inactive" : "Active";
    }
    get hasValueState() {
        return (this.valueState !== ValueState.None) || (this._dialogInputValueState !== ValueState.None);
    }
    get hasValueStateMessage() {
        const valueState = isPhone() ? this._dialogInputValueState : this.valueState;
        return this.hasValueState && valueState !== ValueState.Success;
    }
    get ariaValueStateHiddenText() {
        if (!this.hasValueState) {
            return;
        }
        let text = "";
        if (this.valueState !== ValueState.None) {
            text = this.valueStateTypeMappings[this.valueState];
        }
        if (this.shouldDisplayDefaultValueStateMessage) {
            return `${text} ${this.valueStateDefaultText || ""}`;
        }
        return `${text}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
    }
    get valueStateDefaultText() {
        const valueState = isPhone() ? this._dialogInputValueState : this.valueState;
        if (valueState === ValueState.None) {
            return "";
        }
        if (this._performingSelectionTwice) {
            return MultiComboBox_1.i18nBundle.getText(VALUE_STATE_ERROR_ALREADY_SELECTED);
        }
        return this.valueStateTextMappings[valueState];
    }
    get valueStateTextId() {
        return this.hasValueState ? `ui5-multi-combobox-valueStateDesc` : undefined;
    }
    get valueStateMessageText() {
        return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageIcon() {
        const valueState = (isPhone() && this.open) ? this._dialogInputValueState : this.valueState;
        if (valueState === ValueState.None) {
            return "";
        }
        return {
            [ValueState.Error]: "error",
            [ValueState.Warning]: "alert",
            [ValueState.Success]: "sys-enter-2",
            [ValueState.Information]: "information",
        }[valueState];
    }
    get _tokensCountText() {
        if (!this._tokenizer) {
            return;
        }
        return this._tokenizer._tokensCountText();
    }
    get _tokensCountTextId() {
        return "ui5-multi-combobox-hiddenText-nMore";
    }
    get _selectedTokensCount() {
        return this._tokenizer.tokens.filter(token => token.selected).length;
    }
    get ariaDescribedByText() {
        return this.valueStateTextId ? `${this._tokensCountTextId} ${this.valueStateTextId}` : `${this._tokensCountTextId}`;
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueStateMessage;
    }
    get shouldDisplayOnlyValueStateMessage() {
        return this.focused && !this.readonly && this.hasValueStateMessage && !this._iconPressed;
    }
    get valueStateTypeMappings() {
        return {
            [ValueState.Success]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
            [ValueState.Information]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
            [ValueState.Error]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
            [ValueState.Warning]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
        };
    }
    get valueStateTextMappings() {
        return {
            [ValueState.Success]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            [ValueState.Error]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_ERROR),
            [ValueState.Warning]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_WARNING),
            [ValueState.Information]: MultiComboBox_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
        };
    }
    get _innerInput() {
        if (isPhone()) {
            if (this.allItemsPopover?.opened) {
                return this.allItemsPopover.querySelector("ui5-input").shadowRoot.querySelector("input");
            }
        }
        return this._inputDom;
    }
    get _headerTitleText() {
        return MultiComboBox_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get _iconAccessibleNameText() {
        return MultiComboBox_1.i18nBundle.getText(SELECT_OPTIONS);
    }
    get _showSelectedButtonAccessibleNameText() {
        return MultiComboBox_1.i18nBundle.getText(SHOW_SELECTED_BUTTON);
    }
    get _dialogOkButton() {
        return MultiComboBox_1.i18nBundle.getText(MULTICOMBOBOX_DIALOG_OK_BUTTON);
    }
    get _tokenizerExpanded() {
        if (isPhone() || this.readonly) {
            return false;
        }
        if (this._preventTokenizerToggle) {
            return this._tokenizer.expanded;
        }
        const isCurrentlyExpanded = this._tokenizer?.expanded;
        const shouldBeExpanded = this.focused || this.open || isCurrentlyExpanded;
        return shouldBeExpanded;
    }
    get _valueStatePopoverHorizontalAlign() {
        return this.effectiveDir !== "rtl" ? "Left" : "Right";
    }
    get iconsCount() {
        const slottedIconsCount = this.icon?.length || 0;
        const clearIconCount = Number(this._effectiveShowClearIcon) ?? 0;
        const arrowDownIconsCount = this.readonly ? 0 : 1;
        return slottedIconsCount + clearIconCount + arrowDownIconsCount;
    }
    get clearIconAccessibleName() {
        return MultiComboBox_1.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
    }
    get selectAllCheckboxLabel() {
        const items = this.items.filter(item => !item.isGroupItem);
        const selected = items.filter(item => item.selected);
        return MultiComboBox_1.i18nBundle.getText(MCB_SELECTED_ITEMS, selected.length, items.length);
    }
    get classes() {
        return {
            popover: {
                "ui5-multi-combobox-all-items-responsive-popover": true,
                "ui5-suggestions-popover": true,
                "ui5-popover-with-value-state-header-phone": this._isPhone && this.hasValueStateMessage,
                "ui5-popover-with-value-state-header": !this._isPhone && this.hasValueStateMessage,
            },
            popoverValueState: {
                "ui5-valuestatemessage-root": true,
                "ui5-valuestatemessage-header": true,
                "ui5-valuestatemessage--success": (this.valueState === ValueState.Success) || (this._dialogInputValueState === ValueState.Success),
                "ui5-valuestatemessage--error": (this.valueState === ValueState.Error) || (this._dialogInputValueState === ValueState.Error),
                "ui5-valuestatemessage--warning": (this.valueState === ValueState.Warning) || (this._dialogInputValueState === ValueState.Warning),
                "ui5-valuestatemessage--information": (this.valueState === ValueState.Information) || (this._dialogInputValueState === ValueState.Information),
            },
        };
    }
    get styles() {
        const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
        return {
            popoverValueStateMessage: {
                "width": `${this._listWidth || 0}px`,
                "display": this._listWidth === 0 ? "none" : "inline-block",
            },
            popoverHeader: {
                "max-width": isPhone() ? "100%" : `${this._inputWidth}px`,
            },
            suggestionsPopover: {
                "min-width": `${this._inputWidth}px`,
                "max-width": (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
            },
        };
    }
    static async onDefine() {
        MultiComboBox_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], MultiComboBox.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "noTypeahead", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "allowCustomValues", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "disabled", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], MultiComboBox.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "required", void 0);
__decorate([
    property({ type: ComboBoxFilter, defaultValue: ComboBoxFilter.StartsWithPerTerm })
], MultiComboBox.prototype, "filter", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "showClearIcon", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "accessibleName", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "showSelectAll", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], MultiComboBox.prototype, "_effectiveValueState", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "_open", void 0);
__decorate([
    property()
], MultiComboBox.prototype, "_valueBeforeOpen", void 0);
__decorate([
    property({ type: Object, noAttribute: true, multiple: true })
], MultiComboBox.prototype, "_filteredItems", void 0);
__decorate([
    property({ type: Object, noAttribute: true, multiple: true })
], MultiComboBox.prototype, "_previouslySelectedItems", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "filterSelected", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_tokenizerFocused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_iconPressed", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true })
], MultiComboBox.prototype, "_inputWidth", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true, defaultValue: 0 })
], MultiComboBox.prototype, "_listWidth", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_performingSelectionTwice", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_allSelected", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MultiComboBox.prototype, "_effectiveShowClearIcon", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], MultiComboBox.prototype, "_dialogInputValueState", void 0);
__decorate([
    property({ type: Boolean })
], MultiComboBox.prototype, "tokenizerAvailable", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
], MultiComboBox.prototype, "items", void 0);
__decorate([
    slot()
], MultiComboBox.prototype, "icon", void 0);
__decorate([
    slot()
], MultiComboBox.prototype, "valueStateMessage", void 0);
MultiComboBox = MultiComboBox_1 = __decorate([
    customElement({
        tag: "ui5-multi-combobox",
        languageAware: true,
        renderer: litRender,
        template: MultiComboBoxTemplate,
        staticAreaTemplate: MultiComboBoxPopoverTemplate,
        styles: multiCbxStyles,
        staticAreaStyles: [ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss, MultiComboBoxPopover],
        dependencies: [
            MultiComboBoxItem,
            MultiComboBoxGroupItem,
            Tokenizer,
            Token,
            Icon,
            ResponsivePopover,
            Popover,
            List,
            StandardListItem,
            GroupHeaderListItem,
            ToggleButton,
            Button,
            CheckBox,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     * @public
     */
    ,
    event("change")
    /**
     * Fired when the value of the component changes at each keystroke or clear icon is pressed.
     * @public
     */
    ,
    event("input")
    /**
     * Fired when the dropdown is opened or closed.
     * @since 1.0.0-rc.5
     * @public
     */
    ,
    event("open-change")
    /**
     * Fired when selection is changed by user interaction.
     * @param {IMultiComboBoxItem[]} items an array of the selected items.
     * @public
     * @allowPreventDefault
     */
    ,
    event("selection-change", {
        detail: {
            /**
             * @public
             */
            items: { type: (Array) },
        },
    })
], MultiComboBox);
MultiComboBox.define();
export default MultiComboBox;
//# sourceMappingURL=MultiComboBox.js.map