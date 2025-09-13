import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import multiSelectAll from "@ui5/webcomponents-icons/dist/multiselect-all.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import Input from "./Input.js";
import ToggleButton from "./ToggleButton.js";
import SuggestionItem from "./SuggestionItem.js";
import Icon from "./Icon.js";
import List from "./List.js";
import Popover from "./Popover.js";
import CheckBox from "./CheckBox.js";
export default function MultiComboBoxPopoverTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs(ResponsivePopover, { placement: "Bottom", horizontalAlign: "Start", class: this.classes.popover, id: this.responsivePopoverId, hideArrow: true, preventInitialFocus: true, style: this.styles.suggestionsPopover, "onui5-selection-change": this._listSelectionChange, onClose: this._afterClose, onBeforeOpen: this._beforeOpen, onBeforeClose: this._beforeClose, onOpen: this._afterOpen, onFocusOut: this._onPopoverFocusOut, accessibleName: this._popupLabel, open: this.open, opener: this, children: [this._isPhone && _jsxs(_Fragment, { children: [_jsxs("div", { slot: "header", class: "ui5-responsive-popover-header", style: this.styles.popoverHeader, children: [_jsxs("div", { class: "row", children: [_jsx("span", { children: this._headerTitleText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", icon: decline, design: "Transparent", onClick: this.handleCancel })] }), _jsxs("div", { class: "row", children: [_jsx(Input, { onInput: this._handleMobileInput, onKeyDown: this._onMobileInputKeydown, placeholder: this.placeholder, valueState: this._dialogInputValueState, showClearIcon: this.showClearIcon, noTypeahead: this.noTypeahead, children: this._filteredItems.map(item => (_jsx(SuggestionItem, { text: item.text, additionalText: item.additionalText }))) }), _jsx(ToggleButton, { slot: "header", class: "ui5-multi-combobox-toggle-button", icon: multiSelectAll, design: "Transparent", pressed: this._showAllItemsButtonPressed, onClick: this.filterSelectedItems, accessibleName: this._showSelectedButtonAccessibleNameText })] })] }), "\t\t\t\t", this.hasValueStateMessage &&
                                _jsxs("div", { class: this.classes.popoverValueState, style: this.styles.popoverValueStateMessage, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), this.open && valueStateMessage.call(this)] }), selectAllWrapper.call(this)] }), !this._isPhone && _jsxs(_Fragment, { children: [this.hasValueStateMessage &&
                                _jsxs("div", { slot: "header", onKeyDown: this._onListHeaderKeydown, class: this.classes.responsivePopoverHeaderValueState, style: this.styles.popoverValueStateMessage, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), this.open && valueStateMessage.call(this)] }), selectAllWrapper.call(this)] }), this.filterSelected ?
                        _jsx(List, { separators: "None", selectionMode: "Multiple", class: "ui5-multi-combobox-all-items-list", accessibleRole: "ListBox", children: this.selectedItems.map(item => _jsx("slot", { name: item._individualSlot })) })
                        :
                            _jsx(List, { separators: "None", selectionMode: "Multiple", class: "ui5-multi-combobox-all-items-list", accessibleRole: "ListBox", onKeyDown: this._onItemKeydown, children: this._filteredItems.map(item => _jsx("slot", { name: item._individualSlot })) }), this._isPhone &&
                        _jsx("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: _jsx(Button, { design: "Transparent", onClick: this.handleOK, children: this._dialogOkButton }) })] }), this.hasValueStateMessage &&
                _jsx(Popover
                // skipRegistryUpdate={true}
                , { 
                    // skipRegistryUpdate={true}
                    preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, class: "ui5-valuestatemessage-popover", placement: "Bottom", horizontalAlign: this._valueStatePopoverHorizontalAlign, tabIndex: -1, open: this.valueStateOpen, opener: this, children: _jsxs("div", { slot: "header", class: this.classes.popoverValueState, style: this.styles.popoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: this._valueStateMessageIcon }), this.valueStateOpen && valueStateMessage.call(this)] }) })] }));
}
function valueStateMessage() {
    return this.shouldDisplayDefaultValueStateMessage ? this.valueStateDefaultText : _jsx("slot", { name: "valueStateMessage" });
}
function selectAllWrapper() {
    if (this.showSelectAll) {
        return (_jsx("div", { class: "ui5-mcb-select-all-header", onKeyDown: this._onListHeaderKeydown, tabIndex: 0, children: _jsx(CheckBox, { disabled: this.readonly, checked: this._allSelected, class: "ui5-mcb-select-all-checkbox", text: this.selectAllCheckboxLabel, onChange: this._handleSelectAllCheckboxClick }) }));
    }
}
//# sourceMappingURL=MultiComboBoxPopoverTemplate.js.map