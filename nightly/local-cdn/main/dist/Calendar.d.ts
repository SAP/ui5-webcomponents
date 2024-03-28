import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import CalendarDate from "./CalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import type { DayPickerChangeEventDetail } from "./DayPicker.js";
import type { MonthPickerChangeEventDetail } from "./MonthPicker.js";
import type { YearPickerChangeEventDetail } from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import CalendarLegend from "./CalendarLegend.js";
import type { CalendarLegendItemSelectionChangeEventDetail } from "./CalendarLegend.js";
import SpecialCalendarDate from "./SpecialCalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
interface ICalendarPicker {
    _showPreviousPage: () => void;
    _showNextPage: () => void;
    _hasPreviousPage: () => boolean;
    _hasNextPage: () => boolean;
    _autoFocus?: boolean;
    _firstYear?: number;
    _lastYear?: number;
}
type CalendarSelectedDatesChangeEventDetail = {
    values: Array<string>;
    dates: Array<number>;
    timestamp: number | undefined;
};
type SpecialCalendarDateT = {
    specialDateTimestamp: number;
    type: `${CalendarLegendItemType}`;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar` component allows users to select one or more dates.
 *
 * Currently selected dates are represented with instances of `ui5-date` as
 * children of the `ui5-calendar`. The value property of each `ui5-date` must be a
 * date string, correctly formatted according to the `ui5-calendar`'s `formatPattern` property.
 * Whenever the user changes the date selection, `ui5-calendar` will automatically create/remove instances
 * of `ui5-date` in itself, unless you prevent this behavior by calling `preventDefault()` for the
 * `selected-dates-change` event. This is useful if you want to control the selected dates externally.
 *
 * ### Usage
 *
 * The user can navigate to a particular date by:
 *
 * - Pressing over a month inside the months view
 * - Pressing over an year inside the years view
 *
 * The user can confirm a date selection by pressing over a date inside the days view.
 *
 * ### Keyboard Handling
 * The `ui5-calendar` provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - Day picker:
 *
 * - [F4] - Shows month picker
 * - [Shift] + [F4] - Shows year picker
 * - [Page Up] - Navigate to the previous month
 * - [Page Down] - Navigate to the next month
 * - [Shift] + [Page Up] - Navigate to the previous year
 * - [Shift] + [Page Down] - Navigate to the next year
 * - [Ctrl] + [Shift] + [Page Up] - Navigate ten years backwards
 * - [Ctrl] + [Shift] + [Page Down] - Navigate ten years forwards
 * - [Home] - Navigate to the first day of the week
 * - [End] - Navigate to the last day of the week
 * - [Ctrl] + [Home] - Navigate to the first day of the month
 * - [Ctrl] + [End] - Navigate to the last day of the month
 *
 * - Month picker:
 *
 * - [Page Up] - Navigate to the previous year
 * - [Page Down] - Navigate to the next year
 * - [Home] - Navigate to the first month of the current row
 * - [End] - Navigate to the last month of the current row
 * - [Ctrl] + [Home] - Navigate to the first month of the current year
 * - [Ctrl] + [End] - Navigate to the last month of the year
 *
 * - Year picker:
 *
 * - [Page Up] - Navigate to the previous year range
 * - [Page Down] - Navigate the next year range
 * - [Home] - Navigate to the first year of the current row
 * - [End] - Navigate to the last year of the current row
 * - [Ctrl] + [Home] - Navigate to the first year of the current year range
 * - [Ctrl] + [End] - Navigate to the last year of the current year range
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### Calendar types
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the `primaryCalendarType` property and import one or more of the following modules:
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";`
 *
 * Or, you can use the global configuration and set the `calendarType` key:
 *
 * ```html
 * <script data-id="sap-ui-config" type="application/json">
 * 	{
 * 		"calendarType": "Japanese"
 * 	}
 * </script>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Calendar.js";`
 * @constructor
 * @extends CalendarPart
 * @public
 * @since 1.0.0-rc.11
 */
declare class Calendar extends CalendarPart {
    /**
     * Defines the type of selection used in the calendar component.
     * Accepted property values are:
     *
     * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
     * - `CalendarSelectionMode.Range` - enables selection of a date range.
     * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
     * @default "Single"
     * @public
     */
    selectionMode: `${CalendarSelectionMode}`;
    /**
     * Defines the visibility of the week numbers column.
     *
     * **Note:** For calendars other than Gregorian,
     * the week numbers are not displayed regardless of what is set.
     * @default false
     * @public
     */
    hideWeekNumbers: boolean;
    /**
     * Which picker is currently visible to the user: day/month/year
     * @private
     */
    _currentPicker: string;
    _previousButtonDisabled: boolean;
    _nextButtonDisabled: boolean;
    _headerMonthButtonText: string;
    _headerYearButtonText: string;
    _headerYearButtonTextSecType: string;
    _pickersMode: CalendarPickersMode;
    _valueIsProcessed: boolean;
    /**
     * Defines the calendar legend of the component.
     * @public
     * @since 1.23.0
     */
    calendarLegend: Array<CalendarLegend>;
    /**
     * Defines the selected date or dates (depending on the `selectionMode` property)
     * for this calendar as instances of `ui5-date`.
     * @public
     */
    dates: Array<CalendarDate>;
    /**
     * Defines the special dates, visually emphasized in the calendar.
     * @public
     * @since 1.23.0
     */
    specialDates: Array<SpecialCalendarDate>;
    /**
     * Defines the selected item type of the calendar legend item (if such exists).
     * @private
     */
    _selectedItemType: `${CalendarLegendItemType}`;
    /**
     * @private
     */
    get _selectedDatesTimestamps(): Array<number>;
    constructor();
    /**
     * @private
     */
    _setSelectedDates(selectedDates: Array<number>): void;
    _isValidCalendarDate(dateString: string): boolean;
    get _specialCalendarDates(): SpecialCalendarDateT[];
    _onCalendarLegendSelectionChange(e: CustomEvent<CalendarLegendItemSelectionChangeEventDetail>): void;
    /**
     * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
     */
    _normalizeCurrentPicker(): void;
    onBeforeRendering(): void;
    onAfterRendering(): Promise<void>;
    onInvalidation(changeInfo: ChangeInfo): void;
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress(e: CustomEvent): void;
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress(e: CustomEvent): void;
    get _currentPickerDOM(): ICalendarPicker;
    /**
     * The year clicked the "Previous" button in the header
     */
    onHeaderPreviousPress(): void;
    /**
     * The year clicked the "Next" button in the header
     */
    onHeaderNextPress(): void;
    _setSecondaryCalendarTypeButtonText(): void;
    get secondaryCalendarTypeButtonText(): {
        yearButtonText: string;
        monthButtonText: any;
        monthButtonInfo: any;
    } | undefined;
    /**
     * The month button is hidden when the month picker or year picker is shown
     * @private
     */
    get _isHeaderMonthButtonHidden(): boolean;
    get _isDayPickerHidden(): boolean;
    get _isMonthPickerHidden(): boolean;
    get _isYearPickerHidden(): boolean;
    _fireEventAndUpdateSelectedDates(selectedDates: Array<number>): void;
    onSelectedDatesChange(e: CustomEvent<DayPickerChangeEventDetail>): void;
    onSelectedMonthChange(e: CustomEvent<MonthPickerChangeEventDetail>): void;
    onSelectedYearChange(e: CustomEvent<YearPickerChangeEventDetail>): void;
    onNavigate(e: CustomEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onLegendFocusOut(): void;
    get _specialDates(): SpecialCalendarDate[];
    /**
     * Returns an array of UTC timestamps, representing the selected dates.
     * @protected
     * @deprecated
     */
    get selectedDates(): Array<number>;
    /**
     * Creates instances of `ui5-date` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
     * @protected
     * @deprecated
     * @param selectedDates Array of UTC timestamps
     */
    set selectedDates(selectedDates: Array<number>);
}
export default Calendar;
export type { ICalendarPicker, CalendarSelectedDatesChangeEventDetail, SpecialCalendarDateT, };
