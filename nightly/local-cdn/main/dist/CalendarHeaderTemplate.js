import { jsx as _jsx, jsxs as _jsxs } from "@ui5/webcomponents-base/jsx-runtime";
import Icon from "./Icon.js";
import slimArowLeft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
export default function CalendarTemplate() {
    return (_jsxs("div", { class: "ui5-calheader-root", children: [_jsx("div", { "data-ui5-cal-header-btn-prev": true, class: {
                    "ui5-calheader-arrowbtn": true,
                    "ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
                }, role: "button", onMouseDown: this.onPrevButtonClick, title: this.headerPreviousButtonText, children: _jsx(Icon, { class: "ui5-calheader-arrowicon", name: slimArowLeft }) }), _jsxs("div", { class: "ui5-calheader-midcontainer", children: [_jsxs("div", { "data-ui5-cal-header-btn-month": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn", hidden: this._isHeaderMonthButtonHidden, tabindex: 0, role: "button", "aria-label": this.accInfo.ariaLabelMonthButton, onClick: this.onHeaderShowMonthPress, onKeyDown: this.onMonthButtonKeyDown, onKeyUp: this.onMonthButtonKeyUp, children: [_jsx("span", { children: this._headerMonthButtonText }), this.hasSecondaryCalendarType &&
                                _jsx("span", { class: "ui5-calheader-btn-sectext", children: this.secondMonthButtonText })] }), _jsxs("div", { "data-ui5-cal-header-btn-year": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn", hidden: this._isHeaderYearButtonHidden, tabindex: 0, role: "button", onClick: this.onHeaderShowYearPress, onKeyDown: this.onYearButtonKeyDown, onKeyUp: this.onYearButtonKeyUp, children: [_jsx("span", { children: this._headerYearButtonText }), this.hasSecondaryCalendarType &&
                                _jsx("span", { class: "ui5-calheader-btn-sectext", children: this._headerYearButtonTextSecType })] }), _jsxs("div", { "data-ui5-cal-header-btn-year-range": true, class: "ui5-calheader-arrowbtn ui5-calheader-middlebtn ui5-calheader-yearrange-btn-disabled", hidden: this._isHeaderYearRangeButtonHidden, tabindex: -1, children: [_jsx("span", { children: this._headerYearRangeButtonText }), this.hasSecondaryCalendarType &&
                                _jsx("span", { class: "ui5-calheader-btn-sectext", children: this._headerYearRangeButtonTextSecType })] })] }), _jsx("div", { "data-ui5-cal-header-btn-next": true, class: {
                    "ui5-calheader-arrowbtn": true,
                    "ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
                }, role: "button", onMouseDown: this.onNextButtonClick, title: this.headerNextButtonText, children: _jsx(Icon, { class: "ui5-calheader-arrowicon", name: slimArowRight }) })] }));
}
//# sourceMappingURL=CalendarHeaderTemplate.js.map