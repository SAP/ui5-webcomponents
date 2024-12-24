import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
export default function AvatarTemplate() {
    return (_jsxs("div", { class: "ui5-avatar-root", tabindex: this.tabindex, "data-sap-focus-ref": true, role: this._role, "aria-haspopup": this._ariaHasPopup, "aria-label": this.accessibleNameText, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onClick: this._onclick, children: [this.hasImage ?
                _jsx("slot", {})
                :
                    _jsxs(_Fragment, { children: [this.icon && _jsx(Icon, { class: "ui5-avatar-icon", name: this.icon }), this.initials &&
                                _jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-avatar-initials ui5-avatar-initials-hidden", children: this.validInitials }), _jsx(Icon, { name: this.fallbackIcon, class: "ui5-avatar-icon ui5-avatar-icon-fallback ui5-avatar-fallback-icon-hidden" })] })] }), _jsx("slot", { name: "badge" })] }));
}
//# sourceMappingURL=AvatarTemplate.js.map