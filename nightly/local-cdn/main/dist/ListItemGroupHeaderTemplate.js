import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function ListItemGroupHeaderTemplate() {
    return (_jsx("ul", { role: "group", part: "native-li", tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, class: {
            "ui5-ghli-root": true,
            ...this.classes.main,
        }, "aria-label": this.ariaLabelText, "aria-roledescription": this.groupHeaderText, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, children: _jsx("div", { id: `${this._id}-content`, class: "ui5-li-content", children: _jsx("span", { class: "ui5-ghli-title", children: _jsx("slot", {}) }) }) }));
}
//# sourceMappingURL=ListItemGroupHeaderTemplate.js.map