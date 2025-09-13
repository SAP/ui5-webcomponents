import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ShellBarPopoverTemplate from "./ShellBarPopoverTemplate.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
export default function ShellBarTemplate() {
    return (_jsxs(_Fragment, { children: [_jsxs("header", { class: this.classes.wrapper, "aria-label": this._shellbarText, onKeyDown: this._onKeyDown, part: "root", children: [_jsxs("div", { class: "ui5-shellbar-overflow-container ui5-shellbar-overflow-container-left", children: [this.startButton.length > 0 && _jsx("slot", { name: "startButton" }), this.hasBranding && (_jsx("slot", { name: "branding" })), this.hasMenuItems && !this.hasBranding && (_jsxs(_Fragment, { children: [!this.showLogoInMenuButton && this.hasLogo && singleLogo.call(this), this.showTitleInMenuButton && _jsx("h1", { class: "ui5-hidden-text", children: this.primaryTitle }), this.showMenuButton && (_jsx(_Fragment, { children: _jsxs("button", { class: {
                                                "ui5-shellbar-menu-button": true,
                                                ...this.classes.button,
                                            }, onClick: this._headerPress, "aria-haspopup": "menu", "aria-expanded": this._menuPopoverExpanded, "aria-label": this._brandingText, "data-ui5-stable": "menu", tabIndex: 0, children: [this.showLogoInMenuButton && (_jsx("span", { class: "ui5-shellbar-logo", "aria-label": this._logoText, title: this._logoText, children: _jsx("slot", { name: "logo" }) })), this.showTitleInMenuButton && (_jsx("div", { class: "ui5-shellbar-menu-button-title", children: this.primaryTitle })), _jsx(Icon, { class: "ui5-shellbar-menu-button-arrow", name: slimArrowDown })] }) }))] })), this.hasMenuItems && (
                            // The secondary title remains visible when both menu items and the branding slot are present,
                            // as the branding slot has higher priority and takes precedence in visibility.
                            _jsx(_Fragment, { children: this.secondaryTitle && !this.isSBreakPoint && (_jsx("div", { style: { display: "block" }, class: "ui5-shellbar-secondary-title", "data-ui5-stable": "secondary-title", children: this.secondaryTitle })) })), !this.hasMenuItems && (_jsxs(_Fragment, { children: [this.isSBreakPoint && this.hasLogo && !this.hasBranding && singleLogo.call(this), !this.isSBreakPoint && (this.hasLogo || this.primaryTitle) && (_jsxs(_Fragment, { children: [!this.hasBranding && combinedLogo.call(this), this.secondaryTitle && (this.primaryTitle || this.hasBranding) && (_jsx("h2", { class: "ui5-shellbar-secondary-title", "data-ui5-stable": "secondary-title", children: this.secondaryTitle }))] }))] }))] }), this.hasMidContent && (_jsx("div", { class: "ui5-shellbar-overflow-container ui5-shellbar-mid-content", children: _jsx("slot", { name: "midContent" }) })), _jsx("div", { class: "ui5-shellbar-overflow-container ui5-shellbar-overflow-container-right", children: _jsxs("div", { class: "ui5-shellbar-overflow-container-right-inner", children: [this.hasContentItems && (_jsxs("div", { class: "ui5-shellbar-content-items", role: this._contentItemsRole, "aria-label": this._contentItemsText, children: [this.showStartSeparator && (_jsx("div", { class: {
                                                "ui5-shellbar-separator": true,
                                                "ui5-shellbar-separator-start": true,
                                            } })), this.startContent.map(item => {
                                            const itemInfo = this._contentInfo.find(info => info.id === item._individualSlot);
                                            return (_jsxs("div", { id: item._individualSlot, class: itemInfo?.classes, children: [this.shouldIncludeSeparator(itemInfo, this.startContentInfoSorted) && (
                                                    // never displayed, only "packed" with last item that was hidden, used for measurement purposes
                                                    _jsx("div", { class: {
                                                            "ui5-shellbar-separator": true,
                                                            "ui5-shellbar-separator-start": true,
                                                        } })), _jsx("slot", { name: item._individualSlot })] }, item._individualSlot));
                                        }), _jsx("div", { class: "ui5-shellbar-spacer" }), this.endContent.map(item => {
                                            const itemInfo = this._contentInfo.find(info => info.id === item._individualSlot);
                                            return (_jsxs("div", { id: item._individualSlot, class: itemInfo?.classes, children: [_jsx("slot", { name: item._individualSlot }), this.shouldIncludeSeparator(itemInfo, this.endContentInfoSorted) && (
                                                    // never displayed, only "packed" with last item that was hidden, used for measurement purposes
                                                    _jsx("div", { class: {
                                                            "ui5-shellbar-separator": true,
                                                            "ui5-shellbar-separator-end": true,
                                                        } }))] }, item._individualSlot));
                                        }), this.showEndSeparator && (_jsx("div", { class: {
                                                "ui5-shellbar-separator": true,
                                                "ui5-shellbar-separator-end": true,
                                            } }))] })), !this.hasContentItems && _jsx("div", { class: "ui5-shellbar-spacer" }), _jsxs("div", { class: "ui5-shellbar-overflow-container-right-child", role: this._rightChildRole, children: [this.hasSearchField && (_jsxs(_Fragment, { children: [this.showFullWidthSearch && (_jsxs("div", { class: "ui5-shellbar-search-full-width-wrapper", style: this.styles.searchField, children: [_jsx("div", { class: "ui5-shellbar-search-full-field", children: _jsx("slot", { name: "searchField" }) }), _jsx(Button, { onClick: this._handleCancelButtonPress, class: "ui5-shellbar-button ui5-shellbar-cancel-button", "data-ui5-stable": "cancel-search", children: this._cancelBtnText })] })), _jsx("div", { id: this.hasSelfCollapsibleSearch ? `${this._id}-item-1` : undefined, class: this.classes.searchField, style: this.styles.searchField, children: _jsx("slot", { name: "searchField" }) }), !(this.hasSelfCollapsibleSearch || this.hideSearchButton) && (_jsx(Button, { id: `${this._id}-item-1`, class: {
                                                        "ui5-shellbar-button": true,
                                                        "ui5-shellbar-search-button": true,
                                                        "ui5-shellbar-search-item-for-arrow-nav": true,
                                                        ...this.classes.search,
                                                    }, icon: "sap-icon://search", "data-ui5-text": "Search", "data-ui5-notifications-count": this.notificationsCount, "data-ui5-stable": "toggle-search", onClick: this._handleSearchIconPress, tooltip: this._searchBtnOpen, "aria-label": this._searchBtnOpen, "aria-expanded": this.showSearchField, accessibilityAttributes: this.accInfo.search.accessibilityAttributes }))] })), this.hasAssistant && (_jsx("div", { id: `${this._id}-assistant`, class: this.classes.assistant, children: _jsx("slot", { name: "assistant" }) })), this.showNotifications && (_jsx(Button, { id: `${this._id}-item-2`, class: {
                                                "ui5-shellbar-button": true,
                                                "ui5-shellbar-bell-button": true,
                                                "ui5-shellbar-items-for-arrow-nav": true,
                                                ...this.classes.notification,
                                            }, icon: "sap-icon://bell", "data-ui5-text": "Notifications", onClick: this._handleNotificationsPress, tooltip: this._notificationsText, accessibilityAttributes: this.accInfo.notifications.accessibilityAttributes, "data-ui5-stable": "notifications", children: this.notificationsCount && (_jsx(ButtonBadge, { slot: "badge", design: "OverlayText", text: this.notificationsCount })) })), this.customItemsInfo.map(item => (_jsx(Button, { id: item.id, class: `${item.classes} ui5-shellbar-items-for-arrow-nav`, icon: item.icon, tooltip: item.tooltip, "data-ui5-notifications-count": this.notificationsCount, "data-ui5-external-action-item-id": item.refItemid, "data-ui5-stable": item.stableDomRef, onClick: item.press, accessibilityAttributes: item.accessibilityAttributes, children: item.count && (_jsx(ButtonBadge, { slot: "badge", design: "OverlayText", text: item.count })) }, item.id)))] })] }) }), _jsx(Button, { id: `${this._id}-item-5`, class: {
                            "ui5-shellbar-button": true,
                            "ui5-shellbar-overflow-button": true,
                            "ui5-shellbar-items-for-arrow-nav": true,
                            ...this.classes.overflow,
                        }, icon: "sap-icon://overflow", onClick: this._handleOverflowPress, tooltip: this._overflowText, accessibilityAttributes: this.accInfo.overflow.accessibilityAttributes, "data-ui5-stable": "overflow", children: this._overflowNotifications && (_jsx(ButtonBadge, { slot: "badge", design: this._overflowNotifications === " " ? "AttentionDot" : "OverlayText", text: this._overflowNotifications === " " ? "" : this._overflowNotifications })) }), this.hasProfile && profileButton.call(this), this.showProductSwitch && (_jsx(Button, { id: `${this._id}-item-4`, class: "ui5-shellbar-no-overflow-button ui5-shellbar-button ui5-shellbar-button-product-switch ui5-shellbar-items-for-arrow-nav", icon: "sap-icon://grid", "data-ui5-text": "Product Switch", onClick: this._handleProductSwitchPress, tooltip: this._productsText, "aria-label": this._productSwitchBtnText, "aria-haspopup": "dialog", "aria-expanded": this.accInfo.products.accessibilityAttributes.expanded, accessibilityAttributes: this.accInfo.products.accessibilityAttributes, "data-ui5-stable": "product-switch" }))] }), ShellBarPopoverTemplate.call(this)] }));
}
function profileButton() {
    return (_jsx(Button, { "data-profile-btn": true, id: `${this._id}-item-3`, onClick: this._handleProfilePress, tooltip: this._profileText, class: "ui5-shellbar-button ui5-shellbar-image-button ui5-shellbar-no-overflow-button ui5-shellbar-items-for-arrow-nav", "aria-label": this.imageBtnText, "aria-haspopup": "dialog", accessibilityAttributes: this.accInfo.profile.accessibilityAttributes, "data-ui5-stable": "profile", children: _jsx("slot", { name: "profile" }) }));
}
function singleLogo() {
    return (_jsx("span", { role: this.accLogoRole, class: "ui5-shellbar-logo", "aria-label": this._logoText, title: this._logoText, onClick: this._logoPress, onKeyDown: this._logoKeydown, onKeyUp: this._logoKeyup, tabIndex: 0, "data-ui5-stable": "logo", children: _jsx("slot", { name: "logo" }) }));
}
function combinedLogo() {
    return (_jsxs("div", { role: this.accLogoRole, class: "ui5-shellbar-logo-area", onClick: this._logoPress, tabIndex: 0, onKeyDown: this._logoKeydown, onKeyUp: this._logoKeyup, "aria-label": this.accessibilityAttributes.branding?.name || this._logoAreaText, children: [this.hasLogo && (_jsx("span", { class: "ui5-shellbar-logo", title: this._logoText, "data-ui5-stable": "logo", children: _jsx("slot", { name: "logo" }) })), _jsx("div", { class: "ui5-shellbar-headings", children: this.primaryTitle && (_jsx("h1", { class: "ui5-shellbar-title", children: _jsx("bdi", { children: this.primaryTitle }) })) })] }));
}
//# sourceMappingURL=ShellBarTemplate.js.map