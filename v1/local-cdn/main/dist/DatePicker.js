var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatePicker_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getRoundedTimestamp from "@ui5/webcomponents-localization/dist/dates/getRoundedTimestamp.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isPageUp, isPageDown, isPageUpShift, isPageDownShift, isPageUpShiftCtrl, isPageDownShiftCtrl, isShow, isF4, isEnter, isTabNext, isTabPrevious, isF6Next, isF6Previous, } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone, isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import "@ui5/webcomponents-icons/dist/appointment-2.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import HasPopup from "./types/HasPopup.js";
import { DATEPICKER_OPEN_ICON_TITLE, DATEPICKER_DATE_DESCRIPTION, INPUT_SUGGESTIONS_TITLE } from "./generated/i18n/i18n-defaults.js";
import DateComponentBase from "./DateComponentBase.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Calendar from "./Calendar.js";
import CalendarDateComponent from "./CalendarDate.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";
import DatePickerTemplate from "./generated/templates/DatePickerTemplate.lit.js";
import DatePickerPopoverTemplate from "./generated/templates/DatePickerPopoverTemplate.lit.js";
// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
// Styles
import datePickerCss from "./generated/themes/DatePicker.css.js";
import datePickerPopoverCss from "./generated/themes/DatePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
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
let DatePicker = DatePicker_1 = class DatePicker extends DateComponentBase {
    /**
     * @protected
     */
    onResponsivePopoverAfterClose() {
        this._isPickerOpen = false;
        if (isPhone()) {
            this.blur(); // close device's keyboard and prevent further typing
        }
        else {
            this._getInput()?.focus();
        }
    }
    onBeforeRendering() {
        this.FormSupport = getFeature("FormSupport");
        ["minDate", "maxDate"].forEach((prop) => {
            const propValue = this[prop];
            if (!this.isValid(propValue)) {
                console.warn(`Invalid value for property "${prop}": ${propValue} is not compatible with the configured format pattern: "${this._displayFormat}"`); // eslint-disable-line
            }
        });
        if (this.FormSupport) {
            this.FormSupport.syncNativeHiddenInput(this);
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        this.value = this.normalizeValue(this.value) || this.value;
        this.liveValue = this.value;
    }
    /**
     * Override in derivatives to change calendar selection mode
     * @protected
     */
    get _calendarSelectionMode() {
        return "Single";
    }
    /**
     * Used to provide a timestamp to the Calendar (to focus it to a relevant date when open) based on the component's state
     * Override in derivatives to provide the calendar a timestamp based on their properties
     * By default focus the calendar on the selected date if set, or the current day otherwise
     * @protected
     */
    get _calendarTimestamp() {
        if (this.value && this.dateValueUTC && this._checkValueValidity(this.value)) {
            const millisecondsUTC = this.dateValueUTC.getTime();
            return getRoundedTimestamp(millisecondsUTC);
        }
        return getTodayUTCTimestamp(this._primaryCalendarType);
    }
    /**
     * Used to provide selectedDates to the calendar based on the component's state
     * Override in derivatives to provide different rules for setting the calendar's selected dates
     * @protected
     */
    get _calendarSelectedDates() {
        if (this.value && this._checkValueValidity(this.value)) {
            return [this.value];
        }
        return [];
    }
    _onkeydown(e) {
        if (isShow(e)) {
            e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
            if (this.isOpen()) {
                if (!isF4(e)) {
                    this._toggleAndFocusInput();
                }
            }
            else {
                this._toggleAndFocusInput();
            }
        }
        if ((this._getInput().isEqualNode(e.target) && this.isOpen()) && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
            this.closePicker();
        }
        if (this.isOpen()) {
            return;
        }
        if (isEnter(e)) {
            if (this.FormSupport) {
                this.FormSupport.triggerFormSubmit(this);
            }
        }
        else if (isPageUpShiftCtrl(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "year");
        }
        else if (isPageUpShift(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "month");
        }
        else if (isPageUp(e)) {
            e.preventDefault();
            this._modifyDateValue(1, "day");
        }
        else if (isPageDownShiftCtrl(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "year");
        }
        else if (isPageDownShift(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "month");
        }
        else if (isPageDown(e)) {
            e.preventDefault();
            this._modifyDateValue(-1, "day");
        }
    }
    /**
     * @param amount
     * @param unit
     * @param preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
     * @protected
     */
    _modifyDateValue(amount, unit, preserveDate) {
        if (!this.dateValue) {
            return;
        }
        const modifiedDate = modifyDateBy(CalendarDate.fromLocalJSDate(this.dateValue), amount, unit, preserveDate, this._minDate, this._maxDate);
        const newValue = this.formatValue(modifiedDate.toUTCJSDate());
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
    }
    _updateValueAndFireEvents(value, normalizeValue, events, updateValue = true) {
        const valid = this._checkValueValidity(value);
        if (valid && normalizeValue) {
            value = this.normalizeValue(value); // transform valid values (in any format) to the correct format
        }
        let executeEvent = true;
        this.liveValue = value;
        const previousValue = this.value;
        if (updateValue) {
            this._getInput().value = value;
            this.value = value;
            this._updateValueState(); // Change the value state to Error/None, but only if needed
        }
        events.forEach((e) => {
            if (!this.fireEvent(e, { value, valid }, true)) {
                executeEvent = false;
            }
        });
        if (!executeEvent && updateValue) {
            if (this.value !== previousValue && this.value !== this._getInput().value) {
                return; // If the value was changed in the change event, do not revert it
            }
            this._getInput().value = previousValue;
            this.value = previousValue;
        }
    }
    _updateValueState() {
        const valid = this._checkValueValidity(this.value);
        const previousValueState = this.valueState;
        this.valueState = valid ? ValueState.None : ValueState.Error;
        const eventPrevented = !this.fireEvent("value-state-change", { valueState: this.valueState, valid }, true);
        if (eventPrevented) {
            this.valueState = previousValueState;
        }
    }
    _toggleAndFocusInput() {
        this.togglePicker();
        this._getInput().focus();
    }
    _getInput() {
        return this.shadowRoot.querySelector("[ui5-input]");
    }
    /**
     * The ui5-input "submit" event handler - fire change event when the user presses enter
     * @protected
     */
    _onInputSubmit() { }
    /**
     * The ui5-input "change" event handler - fire change event when the user focuses out of the input
     * @protected
     */
    _onInputChange(e) {
        this._updateValueAndFireEvents(e.target.value, true, ["change", "value-changed"]);
    }
    /**
     * The ui5-input "input" event handler - fire input even when the user types
     * @protected
     */
    _onInputInput(e) {
        this._updateValueAndFireEvents(e.target.value, false, ["input"], false);
    }
    /**
     * Checks if the provided value is valid and within valid range.
     * @protected
     * @param value
     */
    _checkValueValidity(value) {
        if (value === "") {
            return true;
        }
        return this.isValid(value) && this.isInValidRange(value);
    }
    _click(e) {
        if (isPhone()) {
            this.responsivePopover.showAt(this);
            e.preventDefault(); // prevent immediate selection of any item
        }
    }
    /**
     * Checks if a value is valid against the current date format of the DatePicker.
     * @public
     * @param value A value to be tested against the current date format
     */
    isValid(value) {
        if (value === "" || value === undefined) {
            return true;
        }
        return !!this.getFormat().parse(value);
    }
    /**
     * Checks if a date is between the minimum and maximum date.
     * @public
     * @param value A value to be checked
     */
    isInValidRange(value) {
        if (value === "" || value === undefined) {
            return true;
        }
        const calendarDate = this._getCalendarDateFromString(value);
        if (!calendarDate || !this._minDate || !this._maxDate) {
            return false;
        }
        return calendarDate.valueOf() >= this._minDate.valueOf() && calendarDate.valueOf() <= this._maxDate.valueOf();
    }
    /**
     * The parser understands many formats, but we need one format
     * @protected
     */
    normalizeValue(value) {
        if (value === "") {
            return value;
        }
        return this.getFormat().format(this.getFormat().parse(value, true), true); // it is important to both parse and format the date as UTC
    }
    get _displayFormat() {
        // @ts-ignore oFormatOptions is a private API of DateFormat
        return this.getFormat().oFormatOptions.pattern;
    }
    /**
     * @protected
     */
    get _placeholder() {
        return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
    }
    get _headerTitleText() {
        return DatePicker_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get phone() {
        return isPhone();
    }
    get showHeader() {
        return this.phone;
    }
    get showFooter() {
        return this.phone;
    }
    get accInfo() {
        return {
            "ariaRoledescription": this.dateAriaDescription,
            "ariaHasPopup": HasPopup.Grid.toLowerCase(),
            "ariaRequired": this.required,
            "ariaLabel": getEffectiveAriaLabelText(this),
        };
    }
    get openIconTitle() {
        return DatePicker_1.i18nBundle.getText(DATEPICKER_OPEN_ICON_TITLE);
    }
    get openIconName() {
        return "appointment-2";
    }
    get dateAriaDescription() {
        return DatePicker_1.i18nBundle.getText(DATEPICKER_DATE_DESCRIPTION);
    }
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader() {
        return false;
    }
    /**
     * Returns the first picker depending on the CalendarPickerMode
     */
    get firstPicker() {
        const calendarPickerMode = this._calendarPickersMode;
        let firstPicker = "day";
        if (calendarPickerMode === CalendarPickersMode.YEAR) {
            firstPicker = "year";
        }
        else if (calendarPickerMode === CalendarPickersMode.MONTH_YEAR) {
            firstPicker = "month";
        }
        return firstPicker;
    }
    /**
     * Defines whether the value help icon is hidden
     * @private
     */
    get _ariaHidden() {
        return isDesktop();
    }
    async _respPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-responsive-popover]");
    }
    _canOpenPicker() {
        return !this.disabled && !this.readonly;
    }
    get _calendarPickersMode() {
        const format = this.getFormat();
        const patternSymbolTypes = format.aFormatArray.map(patternSymbolSettings => {
            return patternSymbolSettings.type.toLowerCase();
        });
        if (patternSymbolTypes.includes("day")) {
            return CalendarPickersMode.DAY_MONTH_YEAR;
        }
        if (patternSymbolTypes.includes("month") || patternSymbolTypes.includes("monthstandalone")) {
            return CalendarPickersMode.MONTH_YEAR;
        }
        return CalendarPickersMode.YEAR;
    }
    /**
     * The user selected a new date in the calendar
     * @param e
     * @protected
     */
    onSelectedDatesChange(e) {
        e.preventDefault();
        const newValue = e.detail.values && e.detail.values[0];
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
        this.closePicker();
    }
    /**
     * The user clicked the "month" button in the header
     */
    onHeaderShowMonthPress() {
        this._calendarCurrentPicker = "month";
    }
    /**
     * The user clicked the "year" button in the header
     */
    onHeaderShowYearPress() {
        this._calendarCurrentPicker = "year";
    }
    /**
     * Formats a Java Script date object into a string representing a locale date
     * according to the `formatPattern` property of the DatePicker instance
     * @public
     * @param date A Java Script date object to be formatted as string
     * @returns The date as string
     */
    formatValue(date) {
        return this.getFormat().format(date);
    }
    /**
     * Closes the picker.
     * @public
     */
    closePicker() {
        this.responsivePopover.close();
    }
    /**
     * Opens the picker.
     * @public
     * @returns Resolves when the picker is open
     */
    async openPicker() {
        this._isPickerOpen = true;
        this._calendarCurrentPicker = this.firstPicker;
        this.responsivePopover = await this._respPopover();
        this.responsivePopover.showAt(this);
    }
    togglePicker() {
        if (this.isOpen()) {
            this.closePicker();
        }
        else if (this._canOpenPicker()) {
            this.openPicker();
        }
    }
    /**
     * Checks if the picker is open.
     * @public
     * @returns true if the picker is open, false otherwise
     */
    isOpen() {
        return !!this._isPickerOpen;
    }
    /**
     * Currently selected date represented as a Local JavaScript Date instance.
     * @public
     * @default null
     */
    get dateValue() {
        return this.liveValue ? this.getFormat().parse(this.liveValue) : this.getFormat().parse(this.value);
    }
    get dateValueUTC() {
        return this.liveValue ? this.getFormat().parse(this.liveValue, true) : this.getFormat().parse(this.value);
    }
    get styles() {
        return {
            main: {
                width: "100%",
            },
        };
    }
    get type() {
        return InputType.Text;
    }
};
__decorate([
    property()
], DatePicker.prototype, "value", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], DatePicker.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "readonly", void 0);
__decorate([
    property({ defaultValue: undefined })
], DatePicker.prototype, "placeholder", void 0);
__decorate([
    property()
], DatePicker.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "hideWeekNumbers", void 0);
__decorate([
    property()
], DatePicker.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], DatePicker.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], DatePicker.prototype, "_isPickerOpen", void 0);
__decorate([
    property({ type: Object })
], DatePicker.prototype, "_respPopoverConfig", void 0);
__decorate([
    property({ defaultValue: "day" })
], DatePicker.prototype, "_calendarCurrentPicker", void 0);
__decorate([
    slot({ type: HTMLElement })
], DatePicker.prototype, "valueStateMessage", void 0);
__decorate([
    slot({ type: HTMLElement })
], DatePicker.prototype, "formSupport", void 0);
DatePicker = DatePicker_1 = __decorate([
    customElement({
        tag: "ui5-date-picker",
        languageAware: true,
        template: DatePickerTemplate,
        staticAreaTemplate: DatePickerPopoverTemplate,
        styles: datePickerCss,
        staticAreaStyles: [
            ResponsivePopoverCommonCss,
            datePickerPopoverCss,
        ],
        dependencies: [
            Icon,
            ResponsivePopover,
            Calendar,
            CalendarDateComponent,
            Input,
            Button,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     * @allowPreventDefault
     * @public
     * @param {string} value The submitted value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
     */
    ,
    event("change", {
        detail: {
            /**
             * @public
             */
            value: {
                type: String,
            },
            /**
             * @public
             */
            valid: {
                type: Boolean,
            },
        },
    })
    /**
     * Fired when the value of the component is changed at each key stroke.
     * @allowPreventDefault
     * @public
     * @param {string} value The submitted value.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
     */
    ,
    event("input", {
        detail: {
            /**
             * @public
             */
            value: {
                type: String,
            },
            /**
             * @public
             */
            valid: {
                type: Boolean,
            },
        },
    })
    /**
     * Fired before the value state of the component is updated internally.
     * The event is preventable, meaning that if it's default action is
     * prevented, the component will not update the value state.
     * @allowPreventDefault
     * @public
     * @param {string} valueState The new `valueState` that will be set.
     * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
     */
    ,
    event("value-state-change", {
        detail: {
            /**
             * @public
             */
            valueState: {
                type: String,
            },
            /**
             * @public
             */
            valid: {
                type: Boolean,
            },
        },
    })
], DatePicker);
DatePicker.define();
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map