import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import PopupTemplate from "./PopupTemplate.js";
import Title from "./Title.js";
export default function PopoverTemplate() {
    return PopupTemplate.call(this, {
        beforeContent,
        afterContent,
    });
}
function beforeContent() {
    return (_jsxs(_Fragment, { children: [_jsx("span", { class: "ui5-popover-arrow", style: this.styles.arrow }), this._displayHeader &&
                _jsx("header", { class: "ui5-popup-header-root", id: "ui5-popup-header", part: "header", children: this.header.length ?
                        _jsx("slot", { name: "header" })
                        :
                            _jsx(Title, { level: "H1", class: "ui5-popup-header-text", children: this.headerText }) })] }));
}
function afterContent() {
    return (_jsx(_Fragment, { children: this._displayFooter && !!this.footer.length &&
            _jsx("footer", { class: "ui5-popup-footer-root", part: "footer", children: _jsx("slot", { name: "footer" }) }) }));
}
//# sourceMappingURL=PopoverTemplate.js.map