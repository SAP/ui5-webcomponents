import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Input from "./Input.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import error from "@ui5/webcomponents-icons/dist/error.js";
import alert from "@ui5/webcomponents-icons/dist/alert.js";
import sysEnter2 from "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import information from "@ui5/webcomponents-icons/dist/information.js";
import Popover from "./Popover.js";
import List from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
export default function InputPopoverTemplate() {
    return (_jsxs(_Fragment, { children: [this._effectiveShowSuggestions &&
                _jsxs(ResponsivePopover, { class: this.classes.popover, hideArrow: true, preventFocusRestore: true, preventInitialFocus: true, placement: "Bottom", horizontalAlign: "Start", tabindex: -1, style: this.styles.suggestionsPopover, onOpen: this._afterOpenPicker, onClose: this._afterClosePicker, onScroll: this._scroll, open: this.open, opener: this, accessibleName: this._popupLabel, children: [this._isPhone &&
                            _jsxs(_Fragment, { children: [_jsxs("div", { slot: "header", class: "ui5-responsive-popover-header", children: [_jsxs("div", { class: "row", children: [_jsx("span", { children: this._headerTitleText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", icon: decline, design: "Transparent", onClick: this._closePicker })] }), _jsx("div", { class: "row", children: _jsx("div", { class: "input-root-phone native-input-wrapper", children: _jsx(Input, { class: "ui5-input-inner-phone", type: this.inputType, value: this.value, showClearIcon: this.showClearIcon, placeholder: this.placeholder, onInput: this._handleInput, onChange: this._handleChange }) }) })] }), this.hasValueStateMessage &&
                                        _jsxs("div", { class: this.classes.popoverValueState, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon.call(this) }), this.open && valueStateMessage.call(this)] })] }), !this._isPhone && this.hasValueStateMessage &&
                            _jsxs("div", { slot: "header", class: {
                                    "ui5-responsive-popover-header": true,
                                    "ui5-responsive-popover-header--focused": this._isValueStateFocused,
                                    ...this.classes.popoverValueState,
                                }, style: this.styles.suggestionPopoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon.call(this) }), this.open && valueStateMessage.call(this)] }), suggestionsList.call(this), this._isPhone &&
                            _jsx("div", { slot: "footer", class: "ui5-responsive-popover-footer", children: _jsx(Button, { design: "Transparent", onClick: this._closePicker, children: "OK" }) })] }), this.hasValueStateMessage &&
                _jsx(Popover, { preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, class: "ui5-valuestatemessage-popover", placement: "Bottom", tabindex: -1, horizontalAlign: this._valueStatePopoverHorizontalAlign, opener: this, open: this.valueStateOpen, onClose: this._handleValueStatePopoverAfterClose, children: _jsxs("div", { slot: "header", class: this.classes.popoverValueState, style: this.styles.popoverHeader, children: [_jsx(Icon, { class: "ui5-input-value-state-message-icon", name: valueStateMessageInputIcon.call(this) }), this.valueStateOpen && valueStateMessage.call(this)] }) })] }));
}
function valueStateMessage() {
    return (_jsx(_Fragment, { children: this.shouldDisplayDefaultValueStateMessage ? this.valueStateText : _jsx("slot", { name: "valueStateMessage" }) }));
}
function suggestionsList() {
    return (_jsx(List, { separators: this.suggestionSeparators, selectionMode: "Single", onMouseDown: this.onItemMouseDown, onItemClick: this._handleSuggestionItemPress, onSelectionChange: this._handleSelectionChange, children: _jsx("slot", {}) }));
}
function valueStateMessageInputIcon() {
    const iconPerValueState = {
        Negative: error,
        Critical: alert,
        Positive: sysEnter2,
        Information: information,
    };
    return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
}
//# sourceMappingURL=InputPopoverTemplate.js.map