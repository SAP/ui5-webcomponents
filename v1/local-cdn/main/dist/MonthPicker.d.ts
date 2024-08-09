import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";
type Month = {
    timestamp: string;
    focusRef: boolean;
    _tabIndex: string;
    selected: boolean;
    ariaSelected: string;
    name: string;
    nameInSecType: string;
    disabled: boolean;
    classes: string;
};
type MonthInterval = Array<Array<Month>>;
type MonthPickerChangeEventDetail = {
    timestamp: number;
};
type MonthPickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * Month picker component.
 * @class
 *
 * Displays months which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class MonthPicker extends CalendarPart implements ICalendarPicker {
    /**
     * An array of UTC timestamps representing the selected date
     * or dates depending on the capabilities of the picker component.
     * @public
     * @default []
     */
    selectedDates: Array<number>;
    _months: MonthInterval;
    _hidden: boolean;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    get roleDescription(): string;
    onBeforeRendering(): void;
    onAfterRendering(): void;
    get rowSize(): 2 | 3;
    _buildMonths(): void;
    _getDisplayedSecondaryMonthText(timestamp: number): {
        text: any;
        textInfo: any;
    };
    _onkeydown(e: KeyboardEvent): void;
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value: number): void;
    /**
     * Modifies timestamp by a given amount of months and,
     * if necessary, loads the prev/next page.
     * @param amount
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @private
     */
    _modifyTimestampBy(amount: number, preserveDate?: boolean): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * Selects a month, when the user clicks or presses "Enter" or "Space".
     * @param e
     * @private
     */
    _selectMonth(e: Event): void;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasPreviousPage(): boolean;
    /**
     * Called by the Calendar component.
     * @protected
     */
    _hasNextPage(): boolean;
    /**
     * Called by Calendar.js.
     *
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage(): void;
    /**
     * Called by Calendar.js
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage(): void;
    _isOutOfSelectableRange(date: CalendarDate, minDate: CalendarDate, maxDate: CalendarDate): boolean;
}
export default MonthPicker;
export type { MonthPickerNavigateEventDetail, MonthPickerChangeEventDetail, };
