import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";
type Year = {
    timestamp: string;
    _tabIndex: string;
    focusRef: boolean;
    selected: boolean;
    ariaSelected: string;
    year: string;
    yearInSecType: string | undefined;
    disabled: boolean;
    classes: string;
};
type YearInterval = Array<Array<Year>>;
type YearPickerChangeEventDetail = {
    timestamp: number;
};
type YearPickerNavigateEventDetail = {
    timestamp: number;
};
/**
 * @class
 *
 * Displays years which can be selected.
 * @constructor
 * @extends CalendarPart
 * @private
 */
declare class YearPicker extends CalendarPart implements ICalendarPicker {
    /**
     * An array of UTC timestamps representing the selected date
     * or dates depending on the capabilities of the picker component.
     * @default []
     * @public
     */
    selectedDates: Array<number>;
    _years: YearInterval;
    _hidden: boolean;
    _firstYear?: number;
    _lastYear?: number;
    static i18nBundle: I18nBundle;
    static onDefine(): Promise<void>;
    get roleDescription(): string;
    onBeforeRendering(): void;
    _getPageSize(): 8 | 20;
    _getRowSize(): 2 | 4;
    _buildYears(): void;
    _calculateFirstYear(): void;
    onAfterRendering(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onHomeOrEnd(homePressed: boolean): void;
    /**
     * Sets the timestamp to an absolute value.
     * @param value
     * @private
     */
    _setTimestamp(value: number): void;
    /**
     * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
     * @param amount
     * @private
     */
    _modifyTimestampBy(amount: number): void;
    _onkeyup(e: KeyboardEvent): void;
    /**
     * User clicked with the mouser or pressed Enter/Space
     * @param e
     * @private
     */
    _selectYear(e: Event): void;
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
     * Called by the Calendar component.
     * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
     * @protected
     */
    _showPreviousPage(): void;
    /**
     * Called by the Calendar component.
     * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
     * @protected
     */
    _showNextPage(): void;
}
export default YearPicker;
export type { YearPickerChangeEventDetail, YearPickerNavigateEventDetail, };
