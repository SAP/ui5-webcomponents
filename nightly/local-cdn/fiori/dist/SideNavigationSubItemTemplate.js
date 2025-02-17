import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
export default function SideNavigationSubItemTemplate() {
    return (_jsx("li", { id: this._id, class: "ui5-sn-list-li", role: "none", children: this._href ?
            _jsxs("a", { class: `ui5-sn-item ui5-sn-item-level2 ${this._classes}`, role: "treeitem", "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex ? parseInt(this.effectiveTabIndex) : undefined, "aria-current": this._ariaCurrent, "aria-selected": this.selected, title: this._tooltip, href: this._href, target: this._target, children: [this.icon &&
                        _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.isExternalLink &&
                        _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] })
            :
                _jsxs("div", { class: `ui5-sn-item ui5-sn-item-level2 ${this._classes}`, role: "treeitem", "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex ? parseInt(this.effectiveTabIndex) : undefined, "aria-current": this._ariaCurrent, "aria-haspopup": this.accessibilityAttributes?.hasPopup, "aria-selected": this.selected, title: this._tooltip, children: [this.icon &&
                            _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.isExternalLink &&
                            _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] }) }));
}
//# sourceMappingURL=SideNavigationSubItemTemplate.js.map