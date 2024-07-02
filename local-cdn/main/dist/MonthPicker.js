var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MonthPicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import { isEnter, isSpace, isDown, isUp, isLeft, isRight, isHome, isEnd, isHomeCtrl, isEndCtrl, isPageUp, isPageDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { MONTH_PICKER_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
import CalendarPart from "./CalendarPart.js";
// Template
import MonthPickerTemplate from "./generated/templates/MonthPickerTemplate.lit.js";
// Styles
import monthPickerStyles from "./generated/themes/MonthPicker.css.js";
const PAGE_SIZE = 12; // total months on a single page
/**
 * Month picker component.
 * @class
 *
 * Displays months which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
let MonthPicker = MonthPicker_1 = class MonthPicker extends CalendarPart {
    static async onDefine() {
        MonthPicker_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get roleDescription() {
        return MonthPicker_1.i18nBundle.getText(MONTH_PICKER_DESCRIPTION);
    }
    onBeforeRendering() {
        this._buildMonths();
    }
    onAfterRendering() {
        if (!this._hidden) {
            this.focus();
        }
    }
    get rowSize() {
        return (this.secondaryCalendarType === CalendarType.Islamic && this.primaryCalendarType !== CalendarType.Islamic)
            || (this.secondaryCalendarType === CalendarType.Persian && this.primaryCalendarType !== CalendarType.Persian) ? 2 : 3;
    }
    _buildMonths() {
        if (this._hidden) {
            return;
        }
        const localeData = getCachedLocaleDataInstance(getLocale());
        const monthsNames = localeData.getMonthsStandAlone("wide", this._primaryCalendarType);
        const months = [];
        const calendarDate = this._calendarDate; // store the value of the expensive getter
        const minDate = this._minDate; // store the value of the expensive getter
        const maxDate = this._maxDate; // store the value of the expensive getter
        const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
        let timestamp;
        /* eslint-disable no-loop-func */
        for (let i = 0; i < 12; i++) {
            tempDate.setMonth(i);
            timestamp = tempDate.valueOf() / 1000;
            const isSelected = this.selectedDates.some(itemTimestamp => {
                const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
                return date.getYear() === tempDate.getYear() && date.getMonth() === tempDate.getMonth();
            });
            const isFocused = tempDate.getMonth() === calendarDate.getMonth();
            const isDisabled = this._isOutOfSelectableRange(tempDate, minDate, maxDate);
            const month = {
                timestamp: timestamp.toString(),
                focusRef: isFocused,
                _tabIndex: isFocused ? "0" : "-1",
                selected: isSelected,
                ariaSelected: isSelected ? "true" : "false",
                name: monthsNames[i],
                nameInSecType: this.hasSecondaryCalendarType && this._getDisplayedSecondaryMonthText(timestamp).text,
                disabled: isDisabled,
                classes: "ui5-mp-item",
            };
            if (isSelected) {
                month.classes += " ui5-mp-item--selected";
            }
            if (isDisabled) {
                month.classes += " ui5-mp-item--disabled";
            }
            const quarterIndex = Math.floor(i / this.rowSize);
            if (months[quarterIndex]) {
                months[quarterIndex].push(month);
            }
            else {
                months[quarterIndex] = [month];
            }
        }
        this._months = months;
    }
    _getDisplayedSecondaryMonthText(timestamp) {
        const monthsName = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp);
        return convertMonthNumbersToMonthNames(monthsName.firstDate.getMonth(), monthsName.lastDate.getMonth(), this.secondaryCalendarType);
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (isEnter(e)) {
            this._selectMonth(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        else if (isLeft(e)) {
            this._modifyTimestampBy(-1);
        }
        else if (isRight(e)) {
            this._modifyTimestampBy(1);
        }
        else if (isUp(e)) {
            this._modifyTimestampBy(-this.rowSize);
        }
        else if (isDown(e)) {
            this._modifyTimestampBy(this.rowSize);
        }
        else if (isPageUp(e)) {
            this._modifyTimestampBy(-PAGE_SIZE);
        }
        else if (isPageDown(e)) {
            this._modifyTimestampBy(PAGE_SIZE);
        }
        else if (isHome(e) || isEnd(e)) {
            this._onHomeOrEnd(isHome(e));
        }
        else if (isHomeCtrl(e)) {
            this._setTimestamp(parseInt(this._months[0][0].timestamp)); // first month of first row
        }
        else if (isEndCtrl(e)) {
            this._setTimestamp(parseInt(this._months[PAGE_SIZE / this.rowSize - 1][this.rowSize - 1].timestamp)); // last month of last row
        }
        else {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
        }
    }
    _onHomeOrEnd(homePressed) {
        this._months.forEach(row => {
            const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getMonth() === this._calendarDate.getMonth());
            if (indexInRow !== -1) { // The current month is on this row
                const index = homePressed ? 0 : this.rowSize - 1; // select the first (if Home) or last (if End) month on the row
                this._setTimestamp(parseInt(row[index].timestamp));
            }
        });
    }
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value) {
        this._safelySetTimestamp(value);
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    /**
     * Modifies timestamp by a given amount of months and,
     * if necessary, loads the prev/next page.
     * @param amount
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount, preserveDate) {
        // Modify the current timestamp
        this._safelyModifyTimestampBy(amount, "month", preserveDate);
        // Notify the calendar to update its timestamp
        this.fireEvent("navigate", { timestamp: this.timestamp });
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this._selectMonth(e);
        }
    }
    /**
     * Selects a month, when the user clicks or presses "Enter" or "Space".
     * @param e
     * @private
     */
    _selectMonth(e) {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("ui5-mp-item") > -1) {
            const timestamp = this._getTimestampFromDom(target);
            this._safelySetTimestamp(timestamp);
            this.fireEvent("change", { timestamp: this.timestamp });
        }
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasPreviousPage() {
        return this._calendarDate.getYear() !== this._minDate.getYear();
    }
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage() {
        return this._calendarDate.getYear() !== this._maxDate.getYear();
    }
    /**
     * Called by Calendar.js.
     *
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage() {
        this._modifyTimestampBy(-PAGE_SIZE, true);
    }
    /**
     * Called by Calendar.js
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage() {
        this._modifyTimestampBy(PAGE_SIZE, true);
    }
    _isOutOfSelectableRange(date, minDate, maxDate) {
        const month = date.getMonth();
        const year = date.getYear();
        const minYear = minDate.getYear();
        const minMonth = minDate.getMonth();
        const maxYear = maxDate.getYear();
        const maxMonth = maxDate.getMonth();
        return year < minYear || (year === minYear && month < minMonth) || year > maxYear || (year === maxYear && month > maxMonth);
    }
};
__decorate([
    property({
        validator: Integer,
        multiple: true,
        compareValues: true,
    })
], MonthPicker.prototype, "selectedDates", void 0);
__decorate([
    property({ type: Object, multiple: true })
], MonthPicker.prototype, "_months", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], MonthPicker.prototype, "_hidden", void 0);
MonthPicker = MonthPicker_1 = __decorate([
    customElement({
        tag: "ui5-monthpicker",
        template: MonthPickerTemplate,
        styles: monthPickerStyles,
    })
    /**
     * Fired when the user selects a month via "Space", "Enter" or click.
     * @public
     */
    ,
    event("change")
    /**
     * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
     * @since 1.0.0-rc.9
     * @public
     */
    ,
    event("navigate")
], MonthPicker);
MonthPicker.define();
export default MonthPicker;
//# sourceMappingURL=MonthPicker.js.map