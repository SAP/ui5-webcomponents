var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Calendar_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import CalendarDateComponent from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isF4, isF4Shift, isSpace, } from "@ui5/webcomponents-base/dist/Keys.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import CalendarDate from "./CalendarDate.js";
import CalendarDateRange from "./CalendarDateRange.js";
import "./SpecialCalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
// Default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
// Template
import CalendarTemplate from "./CalendarTemplate.js";
// Styles
import calendarCSS from "./generated/themes/Calendar.css.js";
import CalendarHeaderCss from "./generated/themes/CalendarHeader.css.js";
import { CALENDAR_HEADER_NEXT_BUTTON, CALENDAR_HEADER_PREVIOUS_BUTTON } from "./generated/i18n/i18n-defaults.js";
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
 * `selection-change` event. This is useful if you want to control the selected dates externally.
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
 * @csspart day-cell - Used to style the day cells.
 * @csspart day-cell-selected - Used to style the day cells when selected.
 * @csspart day-cell-selected-between - Used to style the day cells in between of selected dates in range.
 * @csspart month-cell - Used to style the month cells.
 * @csspart month-cell-selected - Used to style the month cells when selected.
 * @csspart month-cell-selected-between - Used to style the day cells in between of selected months in range.
 * @csspart year-cell - Used to style the year cells.
 * @csspart year-cell-selected - Used to style the year cells when selected.
 * @csspart year-cell-selected-between - Used to style the day cells in between of selected years in range.
 * @since 1.0.0-rc.11
 */
let Calendar = Calendar_1 = class Calendar extends CalendarPart {
    constructor() {
        super();
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
        this.selectionMode = "Single";
        /**
         * Defines the visibility of the week numbers column.
         *
         * **Note:** For calendars other than Gregorian,
         * the week numbers are not displayed regardless of what is set.
         * @default false
         * @public
         */
        this.hideWeekNumbers = false;
        /**
         * Which picker is currently visible to the user: day/month/year
         * @private
         */
        this._currentPicker = "day";
        this._previousButtonDisabled = false;
        this._nextButtonDisabled = false;
        this._pickersMode = "DAY_MONTH_YEAR";
        this._valueIsProcessed = false;
        /**
         * Defines the selected item type of the calendar legend item (if such exists).
         * @private
         */
        this._selectedItemType = "None";
        this._valueIsProcessed = false;
    }
    /**
     * @private
     */
    get _selectedDatesTimestamps() {
        let selectedDates = [];
        if (this.selectionMode === CalendarSelectionMode.Range) {
            const range = this.dates.find(date => date.hasAttribute("ui5-date-range"));
            const startDate = range && range.startValue && this.getFormat().parse(range.startValue, true);
            const endDate = range && range.endValue && this.getFormat().parse(range.endValue, true);
            if (startDate) {
                selectedDates.push(startDate.getTime() / 1000);
            }
            if (endDate) {
                selectedDates.push(endDate.getTime() / 1000);
            }
        }
        else {
            selectedDates = this.dates
                .filter(dateElement => {
                return dateElement.hasAttribute("ui5-date")
                    && dateElement.value
                    && this._isValidCalendarDate(dateElement.value)
                    && this._getTimeStampFromString(dateElement.value);
            })
                .map(dateElement => Number(this._getTimeStampFromString(dateElement.value)) / 1000);
        }
        return selectedDates;
    }
    /**
     * @private
     */
    _setSelectedDates(selectedDates) {
        const selectedUTCDates = selectedDates.map(timestamp => this.getFormat().format(UI5Date.getInstance(timestamp * 1000), true));
        if (this.selectionMode === CalendarSelectionMode.Range) {
            // Create tags for the selected dates that don't already exist in DOM
            if (selectedUTCDates.length) {
                let dateRange = this.dates.find(dateElement => dateElement.hasAttribute("ui5-date-range") && dateElement.startValue === selectedUTCDates[0]);
                if (!dateRange) {
                    dateRange = document.createElement(CalendarDateRange.getMetadata().getTag());
                    dateRange.startValue = selectedUTCDates[0];
                    this.appendChild(dateRange);
                }
                else {
                    dateRange.endValue = selectedUTCDates[1];
                }
                // Remove all elements for dates that are no longer selected
                this.dates
                    .filter(dateElement => {
                    return dateElement.hasAttribute("ui5-date")
                        || (dateRange && dateElement.startValue !== dateRange.startValue);
                })
                    .forEach(dateElement => {
                    this.removeChild(dateElement);
                });
            }
        }
        else {
            const valuesInDOM = this._selectedDatesTimestamps.map(timestamp => this.getFormat().format(UI5Date.getInstance(timestamp * 1000)));
            // Remove all elements for dates that are no longer selected
            this.dates
                .filter(dateElement => {
                return dateElement.hasAttribute("ui5-date-range")
                    || (dateElement.hasAttribute("ui5-date") && !selectedUTCDates.includes(dateElement.value));
            })
                .forEach(dateElement => {
                this.removeChild(dateElement);
            });
            // Create tags for the selected dates that don't already exist in DOM
            selectedUTCDates
                .filter(value => !valuesInDOM.includes(value))
                .forEach(value => {
                const dateElement = document.createElement(CalendarDate.getMetadata().getTag());
                dateElement.value = value;
                this.appendChild(dateElement);
            });
        }
    }
    _isValidCalendarDate(dateString) {
        const date = this.getFormat().parse(dateString);
        return !!date;
    }
    get _specialCalendarDates() {
        const hasSelectedType = this._specialDates.some(date => date.type === this._selectedItemType);
        const validSpecialDates = this._specialDates.filter(date => {
            const dateType = date.type;
            const dateValue = date.value;
            const isTypeMatch = hasSelectedType
                ? (dateType === this._selectedItemType || dateType === "Working" || dateType === "NonWorking")
                : true;
            return isTypeMatch && dateValue && this._isValidCalendarDate(dateValue);
        });
        validSpecialDates.forEach(date => {
            const refLegendItem = this.calendarLegend.length ? this.calendarLegend[0].items.find(item => item.type === date.type) : undefined;
            date._tooltip = refLegendItem?.text || "";
        });
        const uniqueDates = new Set();
        const uniqueSpecialDates = [];
        validSpecialDates.forEach(date => {
            const dateFromValue = this.getFormat().parse(date.value);
            const timestamp = dateFromValue.getTime();
            if (!uniqueDates.has(timestamp)) {
                uniqueDates.add(timestamp);
                const specialDateTimestamp = CalendarDateComponent.fromLocalJSDate(dateFromValue).valueOf() / 1000;
                const type = date.type;
                const tooltip = date._tooltip;
                uniqueSpecialDates.push({ specialDateTimestamp, type, tooltip });
            }
        });
        return uniqueSpecialDates;
    }
    _onCalendarLegendSelectionChange(e) {
        const defaultTypes = ["Working", "NonWorking", "Selected", "Today"];
        this._selectedItemType = e.detail.item.type;
        if (defaultTypes.includes(this._selectedItemType)) {
            this._selectedItemType = "None"; // In order to avoid filtering of default types
        }
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
    onHeaderShowMonthPress() {
        this.showMonth();
        this.fireDecoratorEvent("show-month-view");
    }
    showMonth() {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "month";
    }
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress() {
        this.showYear();
        this.fireDecoratorEvent("show-year-view");
    }
    showYear() {
        this._currentPickerDOM._autoFocus = false;
        this._currentPicker = "year";
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
        const localDate = UI5Date.getInstance(this._timestamp * 1000);
        const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
        const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this._secondaryCalendarType, this._timestamp);
        const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this._secondaryCalendarType);
        const secondYearText = secondYearFormat.format(localDate);
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
    /**
     * The year button is hidden when the year picker is shown
     * @private
     */
    get _isHeaderYearButtonHidden() {
        return this._currentPicker === "year";
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
        const defaultPrevented = !this.fireDecoratorEvent("selection-change", { timestamp: this.timestamp, selectedDates: [...selectedDates], selectedValues: datesValues });
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
            this._fireEventAndUpdateSelectedDates(e.detail.dates);
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
            this._fireEventAndUpdateSelectedDates(e.detail.dates);
        }
        this._currentPickerDOM._autoFocus = true;
    }
    onNavigate(e) {
        this.timestamp = e.detail.timestamp;
    }
    _onkeydown(e) {
        if (isF4(e) && this._currentPicker !== "month") {
            this._currentPicker = "month";
            this.fireDecoratorEvent("show-month-view");
        }
        if (isF4Shift(e) && this._currentPicker !== "year") {
            this._currentPicker = "year";
            this.fireDecoratorEvent("show-year-view");
        }
    }
    _onLegendFocusOut() {
        this._selectedItemType = "None";
    }
    get _specialDates() {
        return this.getSlottedNodes("specialDates");
    }
    get classes() {
        return {
            prevButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this._previousButtonDisabled,
            },
            nextButton: {
                "ui5-calheader-arrowbtn": true,
                "ui5-calheader-arrowbtn-disabled": this._nextButtonDisabled,
            },
        };
    }
    get accInfo() {
        return {
            ariaLabelMonthButton: this.hasSecondaryCalendarType
                ? `${this._headerMonthButtonText}, ${this.secondMonthButtonText}` : `${this._headerMonthButtonText}`,
        };
    }
    get headerPreviousButtonText() {
        return Calendar_1.i18nBundle?.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
    }
    get headerNextButtonText() {
        return Calendar_1.i18nBundle?.getText(CALENDAR_HEADER_NEXT_BUTTON);
    }
    get secondMonthButtonText() {
        const secondMonthButtonText = this.secondaryCalendarTypeButtonText?.monthButtonText;
        return secondMonthButtonText;
    }
    onMonthButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.showMonth();
            this.fireDecoratorEvent("show-month-view");
        }
    }
    onMonthButtonKeyUp(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.showMonth();
            this.fireDecoratorEvent("show-month-view");
        }
    }
    onYearButtonKeyDown(e) {
        if (isSpace(e)) {
            e.preventDefault();
        }
        if (isEnter(e)) {
            this.showYear();
            this.fireDecoratorEvent("show-year-view");
        }
    }
    onYearButtonKeyUp(e) {
        if (isSpace(e)) {
            this.showYear();
            this.fireDecoratorEvent("show-year-view");
        }
    }
    onPrevButtonClick(e) {
        if (this._previousButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.onHeaderPreviousPress();
        e.preventDefault();
    }
    onNextButtonClick(e) {
        if (this._nextButtonDisabled) {
            e.preventDefault();
            return;
        }
        this.onHeaderNextPress();
        e.preventDefault();
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
     * Creates instances of `ui5-date` or `ui5-date-range` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
     * @protected
     * @deprecated
     * @param selectedDates Array of UTC timestamps
     */
    set selectedDates(selectedDates) {
        this._setSelectedDates(selectedDates);
    }
};
__decorate([
    property()
], Calendar.prototype, "selectionMode", void 0);
__decorate([
    property({ type: Boolean })
], Calendar.prototype, "hideWeekNumbers", void 0);
__decorate([
    property()
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
    property({ noAttribute: true })
], Calendar.prototype, "_pickersMode", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Calendar.prototype, "calendarLegend", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
], Calendar.prototype, "dates", void 0);
__decorate([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Calendar.prototype, "specialDates", void 0);
__decorate([
    property()
], Calendar.prototype, "_selectedItemType", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], Calendar, "i18nBundle", void 0);
Calendar = Calendar_1 = __decorate([
    customElement({
        tag: "ui5-calendar",
        fastNavigation: true,
        template: CalendarTemplate,
        styles: [calendarCSS, CalendarHeaderCss],
    })
    /**
     * Fired when the selected dates change.
     *
     * **Note:** If you call `preventDefault()` for this event, the component will not
     * create instances of `ui5-date` for the newly selected dates. In that case you should do this manually.
     * @param {Array<string>} selectedValues The selected dates
     * @param {Array<number>} selectedDates The selected dates as UTC timestamps
     * @public
     */
    ,
    event("selection-change", {
        bubbles: true,
        cancelable: true,
    }),
    event("show-month-view", {
        bubbles: true,
    }),
    event("show-year-view", {
        bubbles: true,
    })
], Calendar);
Calendar.define();
export default Calendar;
//# sourceMappingURL=Calendar.js.map