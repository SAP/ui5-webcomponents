import DatePicker from "./DatePicker.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type { DatePickerChangeEventDetail as DateRangePickerChangeEventDetail, DatePickerInputEventDetail as DateRangePickerInputEventDetail } from "./DatePicker.js";
import type { CalendarSelectedDatesChangeEventDetail } from "./Calendar.js";
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
declare class DateRangePicker extends DatePicker {
    /**
    * Determines the symbol which separates the dates.
    * If not supplied, the default time interval delimiter for the current locale will be used.
    * @default "-"
    * @public
    */
    delimiter: string;
    /**
    * The first date in the range during selection (this is a temporary value, not the first date in the value range)
    * @private
    */
    _tempValue: string;
    private _prevDelimiter;
    constructor();
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValue(): Date | null;
    /**
     * **Note:** The getter method is inherited and not supported. If called it will return an empty value.
     * @public
     * @default null
     */
    get dateValueUTC(): Date | null;
    get _startDateTimestamp(): number | undefined;
    get _endDateTimestamp(): number | undefined;
    get _tempTimestamp(): number | "";
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectionMode(): string;
    /**
     * Required by DatePicker.js - set the calendar focus on the first selected date (or today if not set)
     * @override
     */
    get _calendarTimestamp(): number;
    /**
     * Required by DatePicker.js
     * @override
     */
    get _calendarSelectedDates(): string[];
    /**
     * Returns the start date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get startDateValue(): Date | null;
    /**
     * Returns the end date of the currently selected range as JavaScript Date instance.
     * @public
     * @default null
     */
    get endDateValue(): Date | null;
    /**
     * @override
     */
    get _placeholder(): string;
    get dateAriaDescription(): string;
    /**
     * @override
     */
    _onInputSubmit(): Promise<void>;
    /**
     * @override
     */
    onResponsivePopoverAfterClose(): void;
    /**
     * @override
     */
    isValid(value: string): boolean;
    /**
     * @override
     */
    isInValidRange(value: string): boolean;
    /**
     * Extract both dates as timestamps, flip if necessary, and build (which will use the desired format so we enforce the format too)
     * @override
     */
    normalizeValue(value: string): string;
    /**
     * @override
     */
    onSelectedDatesChange(event: CustomEvent<CalendarSelectedDatesChangeEventDetail>): void;
    /**
     * @override
     */
    _modifyDateValue(amount: number, unit: string, preserveDate?: boolean): Promise<void>;
    get _effectiveDelimiter(): string;
    _splitValueByDelimiter(value: string): string[];
    /**
     * Returns a UTC timestamp, representing the first date in the value string or undefined if the value is empty
     * @private
     */
    _extractFirstTimestamp(value: string): number | undefined;
    /**
     * Returns a UTC timestamp, representing the last date in the value string or undefined if the value is empty or there is just one date
     * @private
     */
    _extractLastTimestamp(value: string): number | undefined;
    /**
     * Builds a string value out of two UTC timestamps - this method is the counterpart to _extractFirstTimestamp/_extractLastTimestamp
     * @private
     */
    _buildValue(firstDateTimestamp: number | undefined, lastDateTimestamp: number | undefined): string;
    /**
     * @override
     */
    get _calendarPickersMode(): CalendarPickersMode;
}
export default DateRangePicker;
export type { DateRangePickerChangeEventDetail, DateRangePickerInputEventDetail, };
