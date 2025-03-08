import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import slimArrowRightIcon from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import arrowRightIcon from "@ui5/webcomponents-icons/dist/arrow-right.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
const predefinedHooks = {
    listItemContent,
    iconBegin,
    iconEnd,
    listItemPostContent: () => { },
};
export default function NavigationMenuItemTemplate(hooks) {
    const currentHooks = { ...predefinedHooks, ...hooks, };
    return _jsxs(_Fragment, { children: [this._href ? (_jsx("a", { role: "treeitem", class: "ui5-navmenu-item-link", href: this.href, target: this.target, children: MenuItemTemplate.call(this, currentHooks) })) : MenuItemTemplate.call(this, currentHooks), listItemPostContent.call(this)] });
}
function listItemContent() {
    return _jsx(_Fragment, { children: this.text });
}
function iconBegin() {
    if (this.hasIcon) {
        return _jsx(Icon, { part: "icon", class: "ui5-li-icon", name: this.icon });
    }
    if (this._siblingsWithIcon) {
        return _jsx("div", { class: "ui5-menu-item-dummy-icon" });
    }
}
function iconEnd() {
    if (this.hasSubmenu) {
        return _jsx(Icon, { part: "icon", name: slimArrowRightIcon, class: "ui5-menu-item-icon-end" });
    }
    if (this.href) {
        return _jsx(Icon, { class: "ui5-sn-item-external-link-icon", name: arrowRightIcon });
    }
}
function listItemPostContent() {
    return this.hasSubmenu && _jsxs(ResponsivePopover, { id: `${this._id}-navigation-menu-rp`, class: "ui5-menu-rp ui5-navigation-menu ui5-menu-rp-sub-menu", verticalAlign: "Center", preventInitialFocus: true, preventFocusRestore: true, accessibleNameRef: `${this._id}-navigationMenuPopoverText`, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [_jsx("span", { id: `${this._id}-navigationMenuPopoverText`, class: "ui5-hidden-text", children: this.accSideNavigationPopoverHiddenText }), this.isPhone && (_jsxs("div", { slot: "header", class: "ui5-menu-dialog-header", children: [this.isSubMenuOpen && (_jsx(Button, { icon: navBackIcon, class: "ui5-menu-back-button", design: "Transparent", "aria-label": this.labelBack, onClick: this._close })), _jsx("div", { class: "ui5-menu-dialog-title", children: _jsx("div", { children: this.menuHeaderTextPhone }) }), _jsx(Button, { icon: declineIcon, design: "Transparent", "aria-label": this.labelClose, onClick: this._closeAll })] })), _jsx("div", { id: `${this._id}-menu-main`, class: "ui5-navigation-menu-main", children: this.items.length ? (_jsx(List, { accessibleRole: "Tree", id: `${this.id}-menu-list`, selectionMode: "None", loading: this.loading, loadingDelay: this.loadingDelay, separators: "None", "onui5-close-menu": this._close, children: _jsx("slot", {}) })) : (this.loading && (_jsx(BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true }))) })] });
}
//# sourceMappingURL=NavigationMenuItemTemplate.js.map