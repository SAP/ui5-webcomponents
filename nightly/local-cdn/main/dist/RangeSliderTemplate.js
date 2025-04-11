import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import SliderBaseTemplate from "./SliderBaseTemplate.js";
export default function RangeSliderTemplate() {
    return SliderBaseTemplate.call(this, {
        handlesAriaText,
        progressBar,
        handles,
    });
}
export function handlesAriaText() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { id: "ui5-slider-startHandleDesc", class: "ui5-hidden-text", children: this._ariaHandlesText.startHandleText }), _jsx("span", { id: "ui5-slider-endHandleDesc", class: "ui5-hidden-text", children: this._ariaHandlesText.endHandleText })] }));
}
export function progressBar() {
    return (_jsx("div", { class: "ui5-slider-progress-container", part: "progress-container", children: _jsx("div", { class: "ui5-slider-progress", part: "progress-bar", style: this.styles.progress, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabIndex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this._ariaValueNow, "aria-valuetext": `From ${this.startValue} to ${this.endValue}`, "aria-labelledby": "ui5-slider-sliderDesc", "aria-disabled": this._ariaDisabled }) }));
}
export function handles() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { class: "ui5-slider-handle-container", style: this.styles.startHandle, part: "handle-container", children: [_jsx("div", { class: "ui5-slider-handle ui5-slider-handle--start", part: "handle", onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabindex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.startValue, "aria-labelledby": this._ariaLabelledByStartHandleText, "aria-disabled": this._ariaDisabled, "aria-describedby": this._ariaDescribedByHandleText, "aria-keyshortcuts": "F2", children: _jsx(Icon, { name: directionArrows, mode: "Decorative", "slider-icon": true }) }), this.showTooltip &&
                        _jsx("div", { class: "ui5-slider-tooltip ui5-slider-tooltip--start", style: this.styles.tooltip, children: this.editableTooltip ?
                                _jsx(Input, { type: "Number", value: this.startValue.toString(), accessibleNameRef: "ui5-slider-InputLabel", onFocusOut: this._onInputFocusOut, onKeyDown: this._onInputKeydown, onChange: this._onInputChange, onInput: this._onInputInput, "data-sap-ui-start-value": true, tabIndex: -1 })
                                :
                                    _jsx("span", { class: "ui5-slider-tooltip-value", children: this.tooltipStartValue }) })] }), _jsxs("div", { class: "ui5-slider-handle-container", style: this.styles.endHandle, part: "handle-container", children: [_jsx("div", { class: "ui5-slider-handle ui5-slider-handle--end", part: "handle", onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, role: "slider", tabIndex: this._tabIndex, "aria-orientation": "horizontal", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.endValue, "aria-labelledby": this._ariaLabelledByEndHandleText, "aria-describedby": this._ariaDescribedByHandleText, "aria-disabled": this._ariaDisabled, "aria-keyshortcuts": "F2", children: _jsx(Icon, { name: directionArrows, mode: "Decorative", "slider-icon": true }) }), this.showTooltip &&
                        _jsx("div", { class: "ui5-slider-tooltip ui5-slider-tooltip--end", style: this.styles.tooltip, children: this.editableTooltip ?
                                _jsx(Input, { type: "Number", value: this.endValue.toString(), accessibleNameRef: "ui5-slider-InputLabel", onFocusOut: this._onInputFocusOut, onKeyDown: this._onInputKeydown, onChange: this._onInputChange, onInput: this._onInputInput, "data-sap-ui-end-value": true, tabIndex: -1 })
                                :
                                    _jsx("span", { class: "ui5-slider-tooltip-value", children: this.tooltipEndValue }) })] })] }));
}
//# sourceMappingURL=RangeSliderTemplate.js.map