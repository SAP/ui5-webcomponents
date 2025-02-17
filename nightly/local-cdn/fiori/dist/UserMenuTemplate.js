import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Text from "@ui5/webcomponents/dist/Text.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemCustom from "@ui5/webcomponents/dist/ListItemCustom.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Bar from "@ui5/webcomponents/dist/Bar.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import userSettings from "@ui5/webcomponents-icons/dist/user-settings.js";
import log from "@ui5/webcomponents-icons/dist/log.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import addEmployee from "@ui5/webcomponents-icons/dist/add-employee.js";
export default function UserMenuTemplate() {
    return (_jsxs(ResponsivePopover, { id: "user-menu-rp", class: "ui5-pm-rp", tabIndex: -1, placement: "Bottom", verticalAlign: "Bottom", horizontalAlign: "End", preventInitialFocus: true, accessibleName: this.accessibleNameText, open: this.open, opener: this.opener, onClose: this._handlePopoverAfterClose, onOpen: this._handlePopoverAfterOpen, children: [this._isPhone ?
                _jsxs(_Fragment, { children: [_jsxs(Bar, { class: "ui5-pm-phone-header", slot: "header", children: [this._manageAccountVisibleInHeader &&
                                    _jsx(Button, { icon: userSettings, onClick: this._handleManageAccountClick, slot: "startContent" }), this._titleMovedToHeader &&
                                    _jsx(Title, { level: "H1", wrappingType: "None", children: this._selectedAccount.titleText }), _jsx(Button, { icon: decline, design: "Transparent", accessibleName: this._closeDialogAriaLabel, onClick: this._closeUserMenu, slot: "endContent" })] }), _jsx("div", { class: "ui5-pm-header", children: headerContent.call(this) })] })
                :
                    _jsx("div", { class: "ui5-pm-header", slot: "header", children: headerContent.call(this) }), this.showOtherAccounts &&
                _jsxs(Panel, { collapsed: true, class: "ui5-pm-other-accounts", children: [_jsxs("div", { slot: "header", class: "ui5-user-menu-account-header", children: [_jsxs(Title, { slot: "header", level: "H4", children: [this._otherAccountsButtonText, " (", this._otherAccounts.length, ")"] }), this.showAddAccount &&
                                    _jsx(Button, { slot: "header", class: "ui5-pm-add-account-btn", design: "Transparent", icon: addEmployee, onClick: this._handleAddAccountClick, tooltip: this._addAccountTooltip })] }), this._otherAccounts.length > 0 &&
                            _jsx(List, { onItemClick: this._handleAccountSwitch, children: this._otherAccounts.map(account => _jsx(ListItemCustom, { ref: this.captureRef.bind(account), children: _jsxs("div", { class: "ui5-pm-other-accounts-content", children: [_jsx(Avatar, { slot: "image", size: "S", initials: account._initials, fallbackIcon: personPlaceholder, children: account.avatarSrc &&
                                                    _jsx("img", { src: account.avatarSrc }) }), _jsxs("div", { children: [account.titleText &&
                                                        _jsx(Title, { children: account.titleText }), account.subtitleText &&
                                                        _jsx(Label, { children: account.subtitleText }), account.description &&
                                                        _jsx(Label, { children: account.description })] })] }) })) })] }), this.menuItems.length > 0 &&
                _jsx(List, { class: "ui5-user-menu-list", selectionMode: "None", separators: "None", accessibleRole: "Menu", onItemClick: this._handleMenuItemClick, "onui5-close-menu": this._handleMenuItemClose, children: _jsx("slot", {}) }), _jsx("div", { slot: "footer", class: "ui5-pm-footer", children: _jsx(Button, { class: "ui5-pm-sign-out-btn", design: "Transparent", icon: log, onClick: this._handleSignOutClick, children: this._signOutButtonText }) })] }));
}
function headerContent() {
    return (_jsx(_Fragment, { children: this._selectedAccount &&
            _jsxs("div", { class: "ui5-pm-selected-account", children: [_jsxs(Avatar, { size: "L", onClick: this._handleAvatarClick, initials: this._selectedAccount._initials, fallbackIcon: personPlaceholder, class: "ui5-pm--selected-account-avatar", children: [this._selectedAccount.avatarSrc &&
                                _jsx("img", { src: this._selectedAccount.avatarSrc }), this.showEditButton &&
                                _jsx(Tag, { slot: "badge", wrappingType: "None", design: "Set1", colorScheme: "5", title: this._editAvatarTooltip, children: _jsx(Icon, { slot: "icon", name: edit }) })] }), this._selectedAccount.titleText &&
                        _jsx(Title, { id: "selected-account-title", class: "ui5-pm-selected-account-title", children: this._selectedAccount.titleText }), this._selectedAccount.subtitleText &&
                        _jsx(Text, { class: "ui5-pm-selected-account-subtitleText", children: this._selectedAccount.subtitleText }), this._selectedAccount.description &&
                        _jsx(Text, { class: "ui5-pm-selected-account-description", children: this._selectedAccount.description }), this.showManageAccount &&
                        _jsx(Button, { id: "selected-account-manage-btn", icon: userSettings, class: "ui5-pm-manage-account-btn", onClick: this._handleManageAccountClick, children: this._manageAccountButtonText })] }) }));
}
//# sourceMappingURL=UserMenuTemplate.js.map