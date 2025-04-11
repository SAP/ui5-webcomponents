import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function ListItemGroupHeaderTemplate() {
    return (_jsxs("div", { part: "native-li", role: this.effectiveAccRole, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, class: {
            "ui5-ghli-root": true,
            ...this.classes.main,
        }, "aria-label": this.ariaLabelText, "aria-roledescription": this.groupHeaderText, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: [_jsx("div", { id: `${this._id}-content`, class: "ui5-li-content", children: _jsx("span", { class: "ui5-ghli-title", children: _jsx("slot", {}) }) }), this.hasSubItems && _jsx("slot", { name: "subItems" })] }));
}
//# sourceMappingURL=ListItemGroupHeaderTemplate.js.map