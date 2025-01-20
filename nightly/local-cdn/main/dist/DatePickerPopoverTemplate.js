import { jsxs as _jsxs, jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
export default function DatePickerPopoverTemplate(hooks) {
    const header = hooks?.header || defaultHeader;
    const content = hooks?.content || defaultContent;
    const footer = hooks?.footer || defaultFooter;
    return (_jsxs(ResponsivePopover, { id: `${this._id}-responsive-popover`, opener: this, open: this.open, allowTargetOverlap: true, placement: "Bottom", horizontalAlign: "Start", accessibleName: this.pickerAccessibleName, hideArrow: true, _hideHeader: this._shouldHideHeader, onKeyDown: this._onkeydown, onClose: this.onResponsivePopoverAfterClose, onOpen: this.onResponsivePopoverAfterOpen, onBeforeOpen: this.onResponsivePopoverBeforeOpen, children: [this.showHeader && header.call(this), content.call(this), this.showFooter && footer.call(this)] }));
}
function defaultHeader() {
    return (_jsx("div", { slot: "header", class: "ui5-responsive-popover-header", children: _jsxs("div", { class: "row", children: [_jsx("span", { children: this._headerTitleText }), _jsx(Button, { class: "ui5-responsive-popover-close-btn", icon: decline, design: "Transparent", onClick: this._togglePicker })] }) }));
}
function defaultContent() {
    return (_jsx(Calendar, { id: `${this._id}-calendar`, primaryCalendarType: this._primaryCalendarType, secondaryCalendarType: this.secondaryCalendarType, formatPattern: this._formatPattern, selectionMode: this._calendarSelectionMode, minDate: this.minDate, maxDate: this.maxDate, calendarWeekNumbering: this.calendarWeekNumbering, onSelectionChange: this.onSelectedDatesChange, onShowMonthView: this.onHeaderShowMonthPress, onShowYearView: this.onHeaderShowYearPress, hideWeekNumbers: this.hideWeekNumbers, _currentPicker: this._calendarCurrentPicker, _pickersMode: this._calendarPickersMode, children: this._calendarSelectedDates.map(date => _jsx(CalendarDate, { value: date })) }));
}
function defaultFooter() { }
//# sourceMappingURL=DatePickerPopoverTemplate.js.map