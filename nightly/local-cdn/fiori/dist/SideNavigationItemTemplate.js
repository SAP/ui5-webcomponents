import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
export default function SideNavigationItemTemplate() {
    if (this.sideNavCollapsed) {
        return MenuItemTemplate.call(this);
    }
    return TreeItemTemplate.call(this);
}
function MenuItemTemplate() {
    return (_jsx(_Fragment, { children: this._href ?
            _jsxs("a", { id: this._id, class: `ui5-sn-item ui5-sn-item-level1 ${this._classes}`, role: this.ariaRole, "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onMouseEnter: this._onmouseenter, onMouseLeave: this._onmouseleave, tabIndex: this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined, "aria-haspopup": this._ariaHasPopup, "aria-checked": this._ariaChecked, title: this._tooltip, href: this._href, target: this._target, children: [_jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), !!this.items.length &&
                        _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: navRightArrow }), this.isExternalLink &&
                        _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] })
            :
                _jsxs("div", { id: this._id, class: `ui5-sn-item ui5-sn-item-level1 ${this._classes}`, role: this.ariaRole, "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onMouseEnter: this._onmouseenter, onMouseLeave: this._onmouseleave, tabIndex: this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined, "aria-haspopup": this._ariaHasPopup, "aria-checked": this._ariaChecked, title: this._tooltip, children: [_jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), !!this.items.length &&
                            _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: navRightArrow }), this.isExternalLink &&
                            _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight })] }) }));
}
function TreeItemTemplate() {
    return (_jsxs("li", { id: this._id, class: "ui5-sn-list-li", role: "none", children: [this._href ?
                _jsxs("a", { class: `ui5-sn-item ui5-sn-item-level1 ${this._classes}`, role: this.ariaRole, "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined, "aria-expanded": this._expanded, "aria-current": this._ariaCurrent, "aria-selected": this.selected, title: this._tooltip, "aria-owns": this._groupId, href: this._href, target: this._target, children: [this.icon &&
                            _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.isExternalLink &&
                            _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight }), !!this.items.length &&
                            _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: this.expanded ? navDownArrow : navRightArrow, onClick: this._onToggleClick })] })
                :
                    _jsxs("div", { class: `ui5-sn-item ui5-sn-item-level1 ${this._classes}`, role: this.ariaRole, "data-sap-focus-ref": true, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusIn: this._onfocusin, tabIndex: this.effectiveTabIndex !== undefined ? parseInt(this.effectiveTabIndex) : undefined, "aria-expanded": this._expanded, "aria-current": this._ariaCurrent, "aria-selected": this.selected, "aria-haspopup": this.accessibilityAttributes?.hasPopup, title: this._tooltip, "aria-owns": this._groupId, children: [this.icon &&
                                _jsx(Icon, { class: "ui5-sn-item-icon", name: this.icon }), _jsx("div", { class: "ui5-sn-item-text", children: this.text }), this.isExternalLink &&
                                _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRight }), !!this.items.length &&
                                _jsx(Icon, { class: "ui5-sn-item-toggle-icon", name: this.expanded ? navDownArrow : navRightArrow, onClick: this._onToggleClick })] }), !!this.items.length &&
                _jsx("ul", { id: this._groupId, class: "ui5-sn-item-ul", role: "group", children: _jsx("slot", {}) })] }));
}
//# sourceMappingURL=SideNavigationItemTemplate.js.map