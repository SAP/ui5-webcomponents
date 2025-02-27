import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function ButtonTemplate(injectedProps) {
    return (_jsx(_Fragment, { children: _jsxs("button", { type: "button", class: {
                "ui5-button-root": true,
                "ui5-button-badge-placement-end": this.badge[0]?.design === "InlineText",
                "ui5-button-badge-placement-end-top": this.badge[0]?.design === "OverlayText",
                "ui5-button-badge-dot": this.badge[0]?.design === "AttentionDot",
            }, disabled: this.disabled, "data-sap-focus-ref": true, "aria-pressed": injectedProps?.ariaPressed, "aria-valuemin": injectedProps?.ariaValueMin, "aria-valuemax": injectedProps?.ariaValueMax, "aria-valuenow": injectedProps?.ariaValueNow, "aria-valuetext": injectedProps?.ariaValueText, onFocusOut: this._onfocusout, onClick: this._onclick, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onTouchStart: this._ontouchstart, onTouchEnd: this._ontouchend, tabindex: this.tabIndexValue, "aria-expanded": this.accessibilityAttributes.expanded, "aria-controls": this.accessibilityAttributes.controls, "aria-haspopup": this._hasPopup, "aria-label": this.ariaLabelText, "aria-describedby": this.ariaDescribedbyText, "aria-description": this.ariaDescriptionText, title: this.buttonTitle, part: "button", role: this.effectiveAccRole, children: [this.icon &&
                    _jsx(Icon, { class: "ui5-button-icon", name: this.icon, mode: "Decorative", part: "icon", showTooltip: this.showIconTooltip }), _jsx("span", { id: `${this._id}-content`, class: "ui5-button-text", children: _jsx("bdi", { children: _jsx("slot", {}) }) }), this.endIcon &&
                    _jsx(Icon, { class: "ui5-button-end-icon", name: this.endIcon, mode: "Decorative", part: "endIcon" }), this.hasButtonType &&
                    _jsx("span", { id: "ui5-button-hiddenText-type", "aria-hidden": "true", class: "ui5-hidden-text", children: this.buttonTypeText }), this.shouldRenderBadge &&
                    _jsx("slot", { name: "badge" })] }) }));
}
//# sourceMappingURL=ButtonTemplate.js.map