import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";
export default function SliderTemplate() {
    return SliderBaseTemplate.call(this, {
        progressBar,
        handles,
    });
}
export function progressBar() {
    return (_jsx("div", { class: "ui5-slider-progress-container", "aria-hidden": "true", part: "progress-container", children: _jsx("div", { class: "ui5-slider-progress", style: this.styles.progress, onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, tabIndex: -1, part: "progress-bar" }) }));
}
export function handles() {
    return (_jsxs("div", { class: "ui5-slider-handle-container", style: this.styles.handle, part: "handle-container", children: [_jsx("div", { class: "ui5-slider-handle", onFocusOut: this._onfocusout, onFocusIn: this._onfocusin, onKeyUp: this._onkeyup, role: "slider", tabIndex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.value, "aria-label": this._ariaLabel, "aria-disabled": this._ariaDisabled, "aria-keyshortcuts": this._ariaKeyshortcuts, "aria-describedby": this._ariaDescribedByHandleText, "data-sap-focus-ref": true, part: "handle", children: _jsx(Icon, { name: directionArrows, mode: "Decorative", part: "icon-slider", "slider-icon": true }) }), this.showTooltip &&
                _jsx("div", { class: "ui5-slider-tooltip", style: this.styles.tooltip, children: this.editableTooltip ?
                        _jsx(Input, { value: this._tooltipInputValue, valueState: this._tooltipInputValueState, type: "Number", accessibleNameRef: "ui5-slider-InputLabel", onFocusOut: this._onInputFocusOut, onKeyDown: this._onInputKeydown, onChange: this._onInputChange, onInput: this._onInputInput, "data-sap-ui-end-value": true, tabIndex: -1 })
                        :
                            _jsx("span", { class: "ui5-slider-tooltip-value", children: this.tooltipValue }) })] }));
}
//# sourceMappingURL=SliderTemplate.js.map