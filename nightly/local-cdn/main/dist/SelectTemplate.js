import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import SelectPopoverTemplate from "./SelectPopoverTemplate.js";
export default function SelectTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: {
                    "ui5-select-root": true,
                    "ui5-input-focusable-element": true,
                }, id: `${this._id}-select`, onClick: this._onclick, children: [this.selectedOptionIcon &&
                        _jsx(Icon, { mode: "Decorative", class: "ui5-select-option-icon", name: this.selectedOptionIcon }), _jsx("div", { class: "ui5-select-label-root", "data-sap-focus-ref": true, tabindex: this._effectiveTabIndex, role: "combobox", "aria-haspopup": "listbox", "aria-label": this.ariaLabelText, "aria-describedby": this.valueStateTextId, "aria-disabled": this.isDisabled, "aria-required": this.required, "aria-readonly": this.readonly, "aria-expanded": this._isPickerOpen, "aria-roledescription": this._ariaRoleDescription, onKeyDown: this._onkeydown, onKeyPress: this._handleKeyboardNavigation, onKeyUp: this._onkeyup, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, children: this.hasCustomLabel
                            ? _jsx("slot", { name: "label" })
                            : this.text }), !this.readonly &&
                        _jsx(Icon, { name: slimArrowDown, class: {
                                "inputIcon": true,
                                "inputIcon--pressed": this._iconPressed,
                            } }), this.hasValueState &&
                        _jsx("span", { id: `${this._id}-valueStateDesc`, class: "ui5-hidden-text", children: this.valueStateText })] }), SelectPopoverTemplate.call(this)] }));
}
//# sourceMappingURL=SelectTemplate.js.map