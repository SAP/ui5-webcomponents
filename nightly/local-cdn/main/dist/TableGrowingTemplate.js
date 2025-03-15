import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
export default function TableGrowingTemplate() {
    return (_jsxs("div", { id: "growing-button", tabindex: -1, "data-ui5-growing-active": this._activeState, onClick: this.loadMore, onKeyDown: this._onKeydown, onKeyUp: this._onKeyup, onFocusOut: this._onFocusout, role: "button", "aria-labelledby": "growing-text growing-subtext", "aria-describedby": "growing-description", children: [_jsx("span", { id: "growing-text", children: this._growingButtonText }), this.growingSubText &&
                _jsx("span", { id: "growing-subtext", children: this.growingSubText }), _jsx("span", { id: "growing-description", class: "ui5-hidden-text", "aria-hidden": "true", children: this._growingButtonDescription })] }));
}
//# sourceMappingURL=TableGrowingTemplate.js.map