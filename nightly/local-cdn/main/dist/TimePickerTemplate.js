import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Input from "./Input.js";
import TimePickerPopoverTemplate from "./TimePickerPopoverTemplate.js";
export default function TimePickerTemplate() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: this._id, class: "ui5-time-picker-root", children: _jsxs(Input, { "data-sap-focus-ref": true, id: `${this._id}-inner`, class: "ui5-time-picker-input", value: this.value, placeholder: this._placeholder, disabled: this.disabled, readonly: this.readonly, required: this.required, valueState: this.valueState, _inputAccInfo: this.accInfo, onClick: this._handleInputClick, onChange: this._handleInputChange, onInput: this._handleInputLiveChange, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: [this.valueStateMessage.length > 0 &&
                            _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" }), !this.readonly &&
                            _jsx(Icon, { slot: "icon", name: this.openIconName, tabindex: -1, showTooltip: true, onClick: this._togglePicker, class: {
                                    "ui5-time-picker-input-icon-button": true,
                                    "inputIcon": true,
                                    "inputIcon--pressed": this.open,
                                } })] }) }), TimePickerPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=TimePickerTemplate.js.map