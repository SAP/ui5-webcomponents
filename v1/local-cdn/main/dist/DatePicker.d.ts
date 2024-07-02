import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import "@ui5/webcomponents-icons/dist/appointment-2.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import DateComponentBase from "./DateComponentBase.js";
import ResponsivePopover from "./ResponsivePopover.js";
import type { CalendarSelectedDatesChangeEventDetail } from "./Calendar.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
type DatePickerChangeEventDetail = {
    value: string;
    valid: boolean;
};
type DatePickerValueStateChangeEventDetail = {
    valueState: `${ValueState}`;
    valid: boolean;
};
type DatePickerInputEventDetail = {
    value: string;
    valid: boolean;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-date-picker` component provides an input field with assigned calendar which opens on user action.
 * The `ui5-date-picker` allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * ### Usage
 *
 * The user can enter a date by:
 *
 * - Using the calendar that opens in a popup
 * - Typing it in directly in the input field
 *
 * When the user makes an entry and presses the enter key, the calendar shows the corresponding date.
 * When the user directly triggers the calendar display, the actual date is displayed.
 *
 * ### Formatting
 *
 * If a date is entered by typing it into
 * the input field, it must fit to the used date format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](http://unicode.org/reports/tr35/#Date_Field_Symbol_Table).
 *
 * For example, if the `format-pattern` is "yyyy-MM-dd",
 * a valid value string is "2015-07-30" and the same is displayed in the input.
 *
 * ### Keyboard Handling
 * The `ui5-date-picker` provides advanced keyboard handling.
 * If the `ui5-date-picker` is focused,
 * you can open or close the drop-down by pressing [F4], [Alt] + [Up] or [Alt] + [Down] keys.
 * Once the drop-down is opened, you can use the [Up], [Down], [Left] or [Right] arrow keys
 * to navigate through the dates and select one by pressing the `Space` or `Enter` keys. Moreover you can
 * use TAB to reach the buttons for changing month and year.
 *
 * If the `ui5-date-picker` input field is focused and its corresponding picker dialog is not opened,
 * then users can increment or decrement the date referenced by `dateValue` property
 * by using the following shortcuts:
 *
 * - [Page Down] - Decrements the corresponding day of the month by one
 * - [Shift] + [Page Down] - Decrements the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Down] - Decrements the corresponding year by one
 * - [Page Up] - Increments the corresponding day of the month by one
 * - [Shift] + [Page Up] - Increments the corresponding month by one
 * - [Shift] + [Ctrl] + [Page Up] - Increments the corresponding year by one
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
 * <script>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DatePicker.js";`
 * @constructor
 * @extends DateComponentBase
 * @public
 */
declare class DatePicker extends DateComponentBase implements IFormElement {
    /**
     * Defines a formatted date value.
     * @default ""
     * @formEvents change input
     * @formProperty
     * @public
     */
    value: string;
    /**
     * Defines the value state of the component.
     * @default "None"
     * @public
     */
    valueState: `${ValueState}`;
    /**
     * Defines whether the component is required.
     * @since 1.0.0-rc.9
     * @default false
     * @public
     */
    required: boolean;
    /**
     * Determines whether the component is displayed as disabled.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Determines whether the component is displayed as read-only.
     * @default false
     * @public
     */
    readonly: boolean;
    /**
     * Defines a short hint, intended to aid the user with data entry when the
     * component has no value.
     *
     * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
     * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Determines the name with which the component will be submitted in an HTML form.
     *
     * **Important:** For the `name` property to have effect, you must add the following import to your project:
     * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
     *
     * **Note:** When set, a native `input` HTML element
     * will be created inside the component so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     * @default ""
     * @public
     */
    name: string;
    /**
     * Defines the visibility of the week numbers column.
     *
     * **Note:** For calendars other than Gregorian,
     * the week numbers are not displayed regardless of what is set.
     * @default false
     * @public
     * @since 1.0.0-rc.8
     */
    hideWeekNumbers: boolean;
    /**
     * Defines the aria-label attribute for the component.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName: string;
    /**
     * Receives id(or many ids) of the elements that label the component.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleNameRef: string;
    _isPickerOpen: boolean;
    _respPopoverConfig: object;
    _calendarCurrentPicker: string;
    liveValue?: string;
    /**
     * Defines the value state message that will be displayed as pop up under the component.
     *
     * **Note:** If not specified, a default text (in the respective language) will be displayed.
     *
     * **Note:** The `valueStateMessage` would be displayed,
     * when the component is in `Information`, `Warning` or `Error` value state.
     * @since 1.0.0-rc.7
     * @public
     */
    valueStateMessage: Array<HTMLElement>;
    /**
     * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
     * when `name` property is set.
     * @private
     */
    formSupport: Array<HTMLElement>;
    responsivePopover?: ResponsivePopover;
    FormSupport?: typeof FormSupportT;
    static i18nBundle: I18nBundle;
    /**
     * @protected
     */
    onResponsivePopoverAfterClose(): void;
    onBeforeRendering(): void;
    /**
     * Override in derivatives to change calendar selection mode
     * @protected
     */
    get _calendarSelectionMode(): string;
    /**
     * Used to provide a timestamp to the Calendar (to focus it to a relevant date when open) based on the component's state
     * Override in derivatives to provide the calendar a timestamp based on their properties
     * By default focus the calendar on the selected date if set, or the current day otherwise
     * @protected
     */
    get _calendarTimestamp(): number;
    /**
     * Used to provide selectedDates to the calendar based on the component's state
     * Override in derivatives to provide different rules for setting the calendar's selected dates
     * @protected
     */
    get _calendarSelectedDates(): Array<string>;
    _onkeydown(e: KeyboardEvent): void;
    /**
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _modifyDateValue(amount: number, unit: string, preserveDate?: boolean): void;
    _updateValueAndFireEvents(value: string, normalizeValue: boolean, events: Array<string>, updateValue?: boolean): void;
    _updateValueState(): void;
    _toggleAndFocusInput(): void;
    _getInput(): Input;
    /**
     * The ui5-input "submit" event handler - fire change event when the user presses enter
     * @protected
     */
    _onInputSubmit(): void;
    /**
     * The ui5-input "change" event handler - fire change event when the user focuses out of the input
     * @protected
     */
    _onInputChange(e: Event): void;
    /**
     * The ui5-input "input" event handler - fire input even when the user types
     * @protected
     */
    _onInputInput(e: KeyboardEvent): void;
    /**
     * Checks if the provided value is valid and within valid range.
     * @protected
     * @param value
     */
    _checkValueValidity(value: string): boolean;
    _click(e: MouseEvent): void;
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @param value A value to be tested against the current date format
     */
    isValid(value: string): boolean;
    /**
     * Checks if a date is between the minimum and maximum date.
     * @public
     * @param value A value to be checked
     */
    isInValidRange(value: string): boolean;
    /**
     * The parser understands many formats, but we need one format
     * @protected
     */
    normalizeValue(value: string): string;
    get _displayFormat(): string;
    /**
     * @protected
     */
    get _placeholder(): string;
    get _headerTitleText(): string;
    get phone(): boolean;
    get showHeader(): boolean;
    get showFooter(): boolean;
    get accInfo(): {
        ariaRoledescription: string;
        ariaHasPopup: string;
        ariaRequired: boolean;
        ariaLabel: string | undefined;
    };
    get openIconTitle(): string;
    get openIconName(): string;
    get dateAriaDescription(): string;
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader(): boolean;
    /**
     * Returns the first picker depending on the CalendarPickerMode
     */
    get firstPicker(): string;
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _ariaHidden(): boolean;
    _respPopover(): Promise<ResponsivePopover>;
    _canOpenPicker(): boolean;
    get _calendarPickersMode(): CalendarPickersMode;
    /**
     * The user selected a new date in the calendar
     * @param e
     * @protected
     */
    onSelectedDatesChange(e: CustomEvent<CalendarSelectedDatesChangeEventDetail>): void;
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress(): void;
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress(): void;
    /**
     * Formats a Java Script date object into a string representing a locale date
     * according to the `formatPattern` property of the DatePicker instance
     * @public
     * @param date A Java Script date object to be formatted as string
     * @returns The date as string
     */
    formatValue(date: Date): string;
    /**
     * Closes the picker.
     * @public
     */
    closePicker(): void;
    /**
     * Opens the picker.
     * @public
     * @returns Resolves when the picker is open
     */
    openPicker(): Promise<void>;
    togglePicker(): void;
    /**
     * Checks if the picker is open.
     * @public
     * @returns true if the picker is open, false otherwise
     */
    isOpen(): boolean;
    /**
     * Currently selected date represented as a Local JavaScript Date instance.
     * @public
     * @default null
     */
    get dateValue(): Date | null;
    get dateValueUTC(): Date | null;
    get styles(): {
        main: {
            width: string;
        };
    };
    get type(): InputType;
}
export default DatePicker;
export type { DatePickerChangeEventDetail, DatePickerInputEventDetail, DatePickerValueStateChangeEventDetail, };
