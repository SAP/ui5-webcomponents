import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function SegmentedButtonTemplate() {
    return (_jsxs("ul", { role: "listbox", class: "ui5-segmented-button-root", onClick: this._onclick, onMouseDown: this._onmousedown, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onFocusIn: this._onfocusin, "aria-multiselectable": "true", "aria-describedby": `${this._id}-invisibleText`, "aria-roledescription": this.ariaDescription, "aria-label": this.accessibleName, children: [_jsx("slot", {}), _jsx("span", { id: `${this._id}-invisibleText`, class: "ui5-hidden-text", children: this.ariaDescribedBy })] }));
}
//# sourceMappingURL=SegmentedButtonTemplate.js.map