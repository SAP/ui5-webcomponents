import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import Input from "./Input.js";
export default function DatePickerInputTemplate() {
    return (_jsx("div", { class: "ui5-date-picker-root", style: {
            width: "100%",
        }, children: _jsxs(Input, { "data-sap-focus-ref": true, id: `${this._id}-inner`, class: "ui5-date-picker-input", placeholder: this._placeholder, type: this.type, value: this.value, disabled: this.disabled, required: this.required, readonly: this.readonly, valueState: this.valueState, _inputAccInfo: this.accInfo, onChange: this._onInputChange, onInput: this._onInputInput, onSubmit: this._onInputSubmit, onKeyDown: this._onkeydown, children: [this.valueStateMessage.length > 0 &&
                    _jsx("slot", { name: "valueStateMessage", slot: "valueStateMessage" }), !this.readonly &&
                    _jsx(Icon, { id: `${this._id}-value-help`, slot: "icon", name: this.openIconName, tabindex: -1, accessibleName: this.openIconTitle, mode: this._iconMode, showTooltip: true, class: {
                            "inputIcon": true,
                            "inputIcon--pressed": this.open,
                        }, onClick: this._togglePicker })] }) }));
}
//# sourceMappingURL=DatePickerInputTemplate.js.map