import { jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
export default function IconTemplate() {
    return (_jsxs("svg", { class: "ui5-icon-root", part: "root", tabindex: this._tabIndex, dir: this._dir, viewBox: this.viewBox, role: this.effectiveAccessibleRole, focusable: "false", preserveAspectRatio: "xMidYMid meet", "aria-label": this.effectiveAccessibleName, "aria-hidden": this.effectiveAriaHidden, xmlns: "http://www.w3.org/2000/svg", onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, children: [this.hasIconTooltip &&
                _jsxs("title", { id: `${this._id}-tooltip`, children: [" ", this.effectiveAccessibleName, " "] }), _jsxs("g", { role: "presentation", children: [this.customSvg &&
                        _jsx("g", { dangerouslySetInnerHTML: { __html: this.customSvg.strings?.join("") ?? "" } }), this.pathData.map(path => (_jsx("path", { d: path })))] })] }));
}
//# sourceMappingURL=IconTemplate.js.map