var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import CalendarDateComponent from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isF4, isF4Shift, } from "@ui5/webcomponents-base/dist/Keys.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarDate from "./CalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import CalendarHeader from "./CalendarHeader.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import CalendarLegend from "./CalendarLegend.js";
import "./SpecialCalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
// Default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
// Template
import CalendarTemplate from "./generated/templates/CalendarTemplate.lit.js";
// Styles
import calendarCSS from "./generated/themes/Calendar.css.js";
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
let Calendar = class Calendar extends CalendarPart {
    /**
     * @private
     */
    get _selectedDatesTimestamps() {
        return this.dates.map(date => {
            const value = date.value;
            const validValue = value && !!this.getFormat().parse(value);
            return validValue ? this._getTimeStampFromString(value) / 1000 : undefined;
        }).filter((date) => !!date);
    }
    constructor() {
        super();
        this._valueIsProcessed = false;
    }
    /**
     * @private
     */
    _setSelectedDates(selectedDates) {
        const selectedValues = selectedDates.map(timestamp => this.getFormat().format(new Date(timestamp * 1000), true)); // Format as UTC
        const valuesInDOM = [...this.dates].map(dateElement => dateElement.value);
        // Remove all elements for dates that are no longer selected
        this.dates.filter(dateElement => !selectedValues.includes(dateElement.value)).forEach(dateElement => {
            this.removeChild(dateElement);
        });
        // Create tags for the selected dates that don't already exist in DOM
        selectedValues.filter(value => !valuesInDOM.includes(value)).forEach(value => {
            const dateElement = document.createElement(CalendarDate.getMetadata().getTag());
            dateElement.value = value;
            this.appendChild(dateElement);
        });
    }
    _isValidCalendarDate(dateString) {
        const date = this.getFormat().parse(dateString);
        return !!date;
    }
    get _specialCalendarDates() {
        const validSpecialDates = this._specialDates.filter(date => {
            const dateType = date.type;
            const dateValue = date.value;
            const isTypeMatch = this._selectedItemType !== "None" ? dateType === this._selectedItemType : true;
            return isTypeMatch && dateValue && this._isValidCalendarDate(dateValue);
        });
        if (validSpecialDates.length === 0) {
            this._selectedItemType = "None";
        }
        const uniqueDates = new Set();
        const uniqueSpecialDates = [];
        validSpecialDates.forEach(date => {
            const dateFromValue = new Date(date.value);
            const timestamp = dateFromValue.getTime();
            if (!uniqueDates.has(timestamp)) {
                uniqueDates.add(timestamp);
                const specialDateTimestamp = CalendarDateComponent.fromLocalJSDate(dateFromValue).valueOf() / 1000;
                const type = date.type;
                uniqueSpecialDates.push({ specialDateTimestamp, type });
            }
        });
        return uniqueSpecialDates;
    }
    _onCalendarLegendSelectionChange(e) {
        this._selectedItemType = e.detail.item.type;
        this._currentPickerDOM._autoFocus = false;
    }
    /**
     * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
     */
    _normalizeCurrentPicker() {
        if (this._currentPicker === "day" && this._pickersMode !== CalendarPickersMode.DAY_MONTH_YEAR) {
            this._currentPicker = "month";
        }
        if (this._currentPicker === "month" && this._pickersMode === CalendarPickersMode.YEAR) {
            this._currentPicker = "year";
        }
    }
    onBeforeRendering() {
        this._normalizeCurrentPicker();
        if (!this._valueIsProcessed) {
            if (this._selectedDatesTimestamps) {
                this.timestamp = this._selectedDatesTimestamps[0];
            }
            this._valueIsProcessed = true;
        }
    }
    async onAfterRendering() {
        await renderFinished(); // Await for the current picker to render and then ask if it has previous/next pages
        this._previousButtonDisabled = !this._currentPickerDOM._hasPreviousPage();
        this._nextButtonDisabled = !this._currentPickerDOM._hasNextPage();
        const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
        const localeData = getCachedLocaleDataInstance(getLocale());
        this._headerMonthButtonText = localeData.getMonthsStandAlone("wide", this.primaryCalendarType)[this._calendarDate.getMonth()];
        if (this._currentPicker === "year") {
            const rangeStart = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
            const rangeEnd = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
            rangeStart.setYear(this._currentPickerDOM._firstYear);
            rangeEnd.setYear(this._currentPickerDOM._lastYear);
            this._headerYearButtonText = `${yearFormat.format(rangeStart.toLocalJSDate(), true)} - ${yearFormat.format(rangeEnd.toLocalJSDate(), true)}`;
        }
        else {
            this._headerYearButtonText = String(yearFormat.format(this._localDate, true));
        }
        this._secondaryCalendarType && this._setSecondaryCalendarTypeButtonText();
    }
    onInvalidation(changeInfo) {
        if (changeInfo.reason === "childchange") {
            this._valueIsProcessed = false;
        }
    }
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress(e) {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "month";
        this.fireEvent("show-month-press", e);
    }
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress(e) {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "year";
        this.fireEvent("show-year-press", e);
    }
    get _currentPickerDOM() {
        // Calendar's shadowRoot and all the pickers are always present - the "!" is safe to be used.
        return this.shadowRoot.querySelector(`[ui5-${this._currentPicker}picker]`);
    }
    /**
     * The year clicked the "Previous" button in the header
     */
    onHeaderPreviousPress() {
        this._currentPickerDOM._showPreviousPage();
        if (this.calendarLegend) {
            this._currentPickerDOM._autoFocus = true;
        }
    }
    /**
     * The year clicked the "Next" button in the header
     */
    onHeaderNextPress() {
        this._currentPickerDOM._showNextPage();
        if (this.calendarLegend) {
            this._currentPickerDOM._autoFocus = true;
        }
    }
    _setSecondaryCalendarTypeButtonText() {
        const yearFormatSecType = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
        if (this._currentPicker === "year") {
            const rangeStart = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
            const rangeEnd = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
            rangeStart.setYear(this._currentPickerDOM._firstYear);
            rangeEnd.setYear(this._currentPickerDOM._lastYear);
            const rangeStartSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeStart.valueOf() / 1000, true)
                .firstDate;
            const rangeEndSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeEnd.valueOf() / 1000, true)
                .lastDate;
            this._headerYearButtonTextSecType = `${yearFormatSecType.format(rangeStartSecType.toLocalJSDate(), true)} - ${yearFormatSecType.format(rangeEndSecType.toLocalJSDate(), true)}`;
        }
        else {
            this._headerYearButtonTextSecType = String(yearFormatSecType.format(this._localDate, true));
        }
    }
    get secondaryCalendarTypeButtonText() {
        if (!this.hasSecondaryCalendarType) {
            return;
        }
        const localDate = new Date(this._timestamp * 1000);
        const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
        const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this._secondaryCalendarType, this._timestamp);
        const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this._secondaryCalendarType);
        const secondYearText = secondYearFormat.format(localDate, true);
        return {
            yearButtonText: secondYearText,
            monthButtonText: secondMonthInfo.text,
            monthButtonInfo: secondMonthInfo.textInfo,
        };
    }
    /**
     * The month button is hidden when the month picker or year picker is shown
     * @private
     */
    get _isHeaderMonthButtonHidden() {
        return this._currentPicker === "month" || this._currentPicker === "year";
    }
    get _isDayPickerHidden() {
        return this._currentPicker !== "day";
    }
    get _isMonthPickerHidden() {
        return this._currentPicker !== "month";
    }
    get _isYearPickerHidden() {
        return this._currentPicker !== "year";
    }
    _fireEventAndUpdateSelectedDates(selectedDates) {
        const datesValues = selectedDates.map(timestamp => {
            const calendarDate = CalendarDateComponent.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
            return this.getFormat().format(calendarDate.toUTCJSDate(), true);
        });
        const defaultPrevented = !this.fireEvent("selected-dates-change", { timestamp: this.timestamp, dates: [...selectedDates], values: datesValues }, true);
        if (!defaultPrevented) {
            this._setSelectedDates(selectedDates);
        }
    }
    onSelectedDatesChange(e) {
        this.timestamp = e.detail.timestamp;
        this._fireEventAndUpdateSelectedDates(e.detail.dates);
    }
    onSelectedMonthChange(e) {
        this.timestamp = e.detail.timestamp;
        if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
            this._currentPicker = "day";
        }
        else {
            this._fireEventAndUpdateSelectedDates([this.timestamp]);
        }
        this._currentPickerDOM._autoFocus = true;
    }
    onSelectedYearChange(e) {
        this.timestamp = e.detail.timestamp;
        if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
            this._currentPicker = "day";
        }
        else if (this._pickersMode === CalendarPickersMode.MONTH_YEAR) {
            this._currentPicker = "month";
        }
        else {
            this._fireEventAndUpdateSelectedDates([this.timestamp]);
        }
        this._currentPickerDOM._autoFocus = true;
    }
    onNavigate(e) {
        this.timestamp = e.detail.timestamp;
    }
    _onkeydown(e) {
        if (isF4(e) && this._currentPicker !== "month") {
            this._currentPicker = "month";
        }
        if (isF4Shift(e) && this._currentPicker !== "year") {
            this._currentPicker = "year";
        }
    }
    _onLegendFocusOut() {
        this._selectedItemType = "None";
    }
    get _specialDates() {
        return this.getSlottedNodes("specialDates");
    }
    /**
     * Returns an array of UTC timestamps, representing the selected dates.
     * @protected
     * @deprecated
     */
    get selectedDates() {
        return this._selectedDatesTimestamps;
    }
    /**
     * Creates instances of `ui5-date` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
     * @protected
     * @deprecated
     * @param selectedDates Array of UTC timestamps
     */
    set selectedDates(selectedDates) {
        this._setSelectedDates(selectedDates);
    }
};
__decorate([
    property({
        type: CalendarSelectionMode,
        defaultValue: CalendarSelectionMode.Single,
    })
], Calendar.prototype, "selectionMode", void 0);
__decorate([
    property({ type: Boolean })
], Calendar.prototype, "hideWeekNumbers", void 0);
__decorate([
    property({ defaultValue: "day" })
], Calendar.prototype, "_currentPicker", void 0);
__decorate([
    property({ type: Boolean })
], Calendar.prototype, "_previousButtonDisabled", void 0);
__decorate([
    property({ type: Boolean })
], Calendar.prototype, "_nextButtonDisabled", void 0);
__decorate([
    property()
], Calendar.prototype, "_headerMonthButtonText", void 0);
__decorate([
    property()
], Calendar.prototype, "_headerYearButtonText", void 0);
__decorate([
    property()
], Calendar.prototype, "_headerYearButtonTextSecType", void 0);
__decorate([
    property({ type: CalendarPickersMode, defaultValue: CalendarPickersMode.DAY_MONTH_YEAR, noAttribute: true })
], Calendar.prototype, "_pickersMode", void 0);
__decorate([
    slot({ type: HTMLElement })
], Calendar.prototype, "calendarLegend", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Calendar.prototype, "dates", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Calendar.prototype, "specialDates", void 0);
__decorate([
    property({ type: CalendarLegendItemType, defaultValue: CalendarLegendItemType.None })
], Calendar.prototype, "_selectedItemType", void 0);
Calendar = __decorate([
    customElement({
        tag: "ui5-calendar",
        fastNavigation: true,
        template: CalendarTemplate,
        styles: calendarCSS,
        dependencies: [
            CalendarDate,
            CalendarHeader,
            DayPicker,
            MonthPicker,
            YearPicker,
            CalendarLegend,
        ],
    })
    /**
     * Fired when the selected dates change.
     *
     * **Note:** If you call `preventDefault()` for this event, the component will not
     * create instances of `ui5-date` for the newly selected dates. In that case you should do this manually.
     * @allowPreventDefault
     * @param {Array<string>} values The selected dates
     * @param {Array<number>} dates The selected dates as UTC timestamps
     * @public
     */
    ,
    event("selected-dates-change", {
        detail: {
            /**
             * @public
             */
            dates: { type: Array },
            /**
             * @public
             */
            values: { type: Array },
            timestamp: { type: Number },
        },
    }),
    event("show-month-press"),
    event("show-year-press")
], Calendar);
Calendar.define();
export default Calendar;
//# sourceMappingURL=Calendar.js.map