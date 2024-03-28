var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DateRangePicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import { DATERANGE_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
// Styles
import DateRangePickerCss from "./generated/themes/DateRangePicker.css.js";
import DatePicker from "./DatePicker.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
/**
 * @class
 *
 * ### Overview
 * The DateRangePicker enables the users to enter a localized date range using touch, mouse, keyboard input, or by selecting a date range in the calendar.
 *
 * ### Usage
 * The user can enter a date by:
 * Using the calendar that opens in a popup or typing it in directly in the input field (not available for mobile devices).
 * For the `ui5-daterange-picker`
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DateRangePicker.js";`
 *
 * ### Keyboard Handling
 * The `ui5-daterange-picker` provides advanced keyboard handling.
 *
 * When the `ui5-daterange-picker` input field is focused the user can
 * increment or decrement respectively the range start or end date, depending on where the cursor is.
 * The following shortcuts are available:
 *
 * - [Page Down] - Decrements the corresponding day of the month by one
 * - [Shift] + [Page Down] - Decrements the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Down] - Decrements the corresponding year by one
 * - [Page Up] - Increments the corresponding day of the month by one
 * - [Shift] + [Page Up] - Increments the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Up] - Increments the corresponding year by one
 * @constructor
 * @extends DatePicker
 * @since 1.0.0-rc.8
 * @public
 */
let DateRangePicker = DateRangePicker_1 = class DateRangePicker extends DatePicker {
    constructor() {
        super();
        this._prevDelimiter = null;
    }
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValue() {
        return null;
    }
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValueUTC() {
        return null;
    }
    get _startDateTimestamp() {
        return this._extractFirstTimestamp(this.value);
    }
    get _endDateTimestamp() {
        return this._extractLastTimestamp(this.value);
    }
    get _tempTimestamp() {
        return this._tempValue && this.getFormat().parse(this._tempValue, true).getTime() / 1000;
    }
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectionMode() {
        return "Range";
    }
    /**
     * Required by DatePicker.js - set the calendar focus on the first selected date (or today if not set)
     * @override
     */
    get _calendarTimestamp() {
        return this._tempTimestamp || this._startDateTimestamp || getTodayUTCTimestamp(this._primaryCalendarType);
    }
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectedDates() {
        if (this._tempValue) {
            return [this._tempValue];
        }
        if (this.value && this._checkValueValidity(this.value)) {
            return this._splitValueByDelimiter(this.value);
        }
        return [];
    }
    /**
     * Returns the start date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get startDateValue() {
        return CalendarDate.fromTimestamp(this._startDateTimestamp * 1000).toLocalJSDate();
    }
    /**
     * Returns the end date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get endDateValue() {
        return CalendarDate.fromTimestamp(this._endDateTimestamp * 1000).toLocalJSDate();
    }
    /**
     * @override
     */
    get _placeholder() {
        return this.placeholder !== undefined ? this.placeholder : `${this._displayFormat} ${this._effectiveDelimiter} ${this._displayFormat}`;
    }
    get dateAriaDescription() {
        return DateRangePicker_1.i18nBundle.getText(DATERANGE_DESCRIPTION);
    }
    /**
     * @override
     */
    async _onInputSubmit() {
        const input = this._getInput();
        const caretPos = input.getCaretPosition();
        await renderFinished();
        input.setCaretPosition(caretPos); // Return the caret on the previous position after rendering
    }
    /**
     * @override
     */
    onResponsivePopoverAfterClose() {
        this._tempValue = ""; // reset _tempValue on popover close
        super.onResponsivePopoverAfterClose();
    }
    /**
     * @override
     */
    isValid(value) {
        const parts = this._splitValueByDelimiter(value);
        return parts.length <= 2 && parts.every(dateString => super.isValid(dateString)); // must be at most 2 dates and each must be valid
    }
    /**
     * @override
     */
    isInValidRange(value) {
        return this._splitValueByDelimiter(value).every(dateString => super.isInValidRange(dateString));
    }
    /**
     * Extract both dates as timestamps, flip if necessary, and build (which will use the desired format so we enforce the format too)
     * @override
     */
    normalizeValue(value) {
        const firstDateTimestamp = this._extractFirstTimestamp(value);
        const lastDateTimestamp = this._extractLastTimestamp(value);
        if (firstDateTimestamp && lastDateTimestamp && firstDateTimestamp > lastDateTimestamp) { // if both are timestamps (not undefined), flip if necessary
            return this._buildValue(lastDateTimestamp, firstDateTimestamp);
        }
        return this._buildValue(firstDateTimestamp, lastDateTimestamp);
    }
    /**
     * @override
     */
    onSelectedDatesChange(event) {
        event.preventDefault(); // never let the calendar update its own dates, the parent component controls them
        const values = event.detail.values;
        if (values.length === 0) {
            return;
        }
        if (values.length === 1) { // Do nothing until the user selects 2 dates, we don't change any state at all for one date
            this._tempValue = values[0];
            return;
        }
        const newValue = this._buildValue(event.detail.dates[0], event.detail.dates[1]); // the value will be normalized so we don't need to order them here
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
        this.closePicker();
    }
    /**
     * @override
     */
    async _modifyDateValue(amount, unit, preserveDate) {
        if (!this._endDateTimestamp) { // If empty or only one date -> treat as datepicker entirely
            return super._modifyDateValue(amount, unit, preserveDate);
        }
        const input = this._getInput();
        let caretPos = input.getCaretPosition(); // caret position is always number for input of type text;
        let newValue;
        if (caretPos <= this.value.indexOf(this._effectiveDelimiter)) { // The user is focusing the first date -> change it and keep the second date
            const startDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._startDateTimestamp * 1000), amount, unit, preserveDate, this._minDate, this._maxDate);
            const newStartDateTimestamp = startDateModified.valueOf() / 1000;
            if (newStartDateTimestamp > this._endDateTimestamp) { // dates flipped -> move the caret to the same position but on the last date
                caretPos += Math.ceil(this.value.length / 2);
            }
            newValue = this._buildValue(newStartDateTimestamp, this._endDateTimestamp); // the value will be normalized so we don't try to order them here
        }
        else {
            const endDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._endDateTimestamp * 1000), amount, unit, preserveDate, this._minDate, this._maxDate);
            const newEndDateTimestamp = endDateModified.valueOf() / 1000;
            newValue = this._buildValue(this._startDateTimestamp, newEndDateTimestamp); // the value will be normalized so we don't try to order them here
            if (newEndDateTimestamp < this._startDateTimestamp) { // dates flipped -> move the caret to the same position but on the first date
                caretPos -= Math.ceil(this.value.length / 2);
            }
        }
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
        await renderFinished();
        input.setCaretPosition(caretPos); // Return the caret to the previous (or the adjusted, if dates flipped) position after rendering
    }
    get _effectiveDelimiter() {
        const ctor = this.constructor;
        return this.delimiter || (ctor.getMetadata().getProperties().delimiter.defaultValue);
    }
    _splitValueByDelimiter(value) {
        const valuesArray = [];
        const partsArray = value.split(this._prevDelimiter || this._effectiveDelimiter);
        // if format successfully parse the value, the value contains only single date
        if (this.getFormat().parse(value)) {
            valuesArray[0] = partsArray.join(this._effectiveDelimiter);
            valuesArray[1] = "";
        }
        else {
            valuesArray[0] = partsArray.slice(0, partsArray.length / 2).join(this._effectiveDelimiter);
            valuesArray[1] = partsArray.slice(partsArray.length / 2).join(this._effectiveDelimiter);
        }
        return valuesArray;
    }
    /**
     * Returns a UTC timestamp, representing the first date in the value string or undefined if the value is empty
     * @private
     */
    _extractFirstTimestamp(value) {
        if (!value || !this._checkValueValidity(value)) {
            return undefined;
        }
        const dateStrings = this._splitValueByDelimiter(value); // at least one item guaranteed due to the checks above (non-empty and valid)
        const parsedDate = this.getFormat().parse(dateStrings[0], true);
        return parsedDate.getTime() / 1000;
    }
    /**
     * Returns a UTC timestamp, representing the last date in the value string or undefined if the value is empty or there is just one date
     * @private
     */
    _extractLastTimestamp(value) {
        if (!value || !this._checkValueValidity(value)) {
            return undefined;
        }
        const dateStrings = this._splitValueByDelimiter(value);
        if (dateStrings[1]) {
            const parsedDate = this.getFormat().parse(dateStrings[1], true);
            return parsedDate.getTime() / 1000;
        }
        return undefined;
    }
    /**
     * Builds a string value out of two UTC timestamps - this method is the counterpart to _extractFirstTimestamp/_extractLastTimestamp
     * @private
     */
    _buildValue(firstDateTimestamp, lastDateTimestamp) {
        this._prevDelimiter = this._effectiveDelimiter;
        if (firstDateTimestamp) {
            const firstDateString = this._getStringFromTimestamp(firstDateTimestamp * 1000);
            if (!lastDateTimestamp) {
                return firstDateString;
            }
            const lastDateString = this._getStringFromTimestamp(lastDateTimestamp * 1000);
            return `${firstDateString} ${this._effectiveDelimiter} ${lastDateString}`;
        }
        return "";
    }
    /**
     * @override
     */
    get _calendarPickersMode() {
        return CalendarPickersMode.DAY_MONTH_YEAR;
    }
};
__decorate([
    property({ defaultValue: "-" })
], DateRangePicker.prototype, "delimiter", void 0);
__decorate([
    property()
], DateRangePicker.prototype, "_tempValue", void 0);
DateRangePicker = DateRangePicker_1 = __decorate([
    customElement({
        tag: "ui5-daterange-picker",
        styles: [DatePicker.styles, DateRangePickerCss],
    })
], DateRangePicker);
DateRangePicker.define();
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.js.map