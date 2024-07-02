var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DateTimePicker_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import "@ui5/webcomponents-icons/dist/date-time.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";
import SegmentedButton from "./SegmentedButton.js";
import Calendar from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
// i18n texts
import { TIMEPICKER_SUBMIT_BUTTON, TIMEPICKER_CANCEL_BUTTON, DATETIME_DESCRIPTION, DATETIME_PICKER_DATE_BUTTON, DATETIME_PICKER_TIME_BUTTON, } from "./generated/i18n/i18n-defaults.js";
// Template
import DateTimePickerPopoverTemplate from "./generated/templates/DateTimePickerPopoverTemplate.lit.js";
// Styles
import DateTimePickerCss from "./generated/themes/DateTimePicker.css.js";
import DateTimePickerPopoverCss from "./generated/themes/DateTimePickerPopover.css.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
const PHONE_MODE_BREAKPOINT = 640; // px
/**
 * @class
 *
 * ### Overview
 * The `DateTimePicker` component alows users to select both date (day, month and year) and time (hours, minutes and seconds)
 * and for the purpose it consists of input field and Date/Time picker.
 *
 * ### Usage
 *
 * Use the `DateTimePicker` if you need a combined date and time input component.
 * Don't use it if you want to use either date, or time value.
 * In this case, use the `DatePicker` or the `TimePicker` components instead.
 *
 * The user can set date/time by:
 *
 * - using the calendar and the time selectors
 * - typing in the input field
 *
 * Programmatically, to set date/time for the `DateTimePicker`, use the `value` property
 *
 * ### Formatting
 *
 * The value entered by typing into the input field must fit to the used date/time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *
 * **Example:** the following format `dd/MM/yyyy, hh:mm:ss aa`
 * corresponds the `13/04/2020, 03:16:16 AM` value.
 *
 * The small 'h' defines "12" hours format and the "aa" symbols - "AM/PM" time periods.
 *
 * **Example:** the following format `dd/MM/yyyy, HH:mm:ss`
 * corresponds the `13/04/2020, 15:16:16` value.
 *
 * The capital 'H' indicates "24" hours format.
 *
 * **Note:** If the `formatPattern` does NOT include time,
 * the `DateTimePicker` will fallback to the default time format according to the locale.
 *
 * **Note:** If no placeholder is set to the `DateTimePicker`,
 * the current `formatPattern` is displayed as a placeholder.
 * If another placeholder is needed, it must be set or in case no placeholder is needed - it can be set to an empty string.
 *
 * **Note:** If the user input does NOT match the `formatPattern`,
 * the `DateTimePicker` makes an attempt to parse it based on the
 * locale settings.
 *
 * ### Responsive behavior
 *
 * The `DateTimePicker` is responsive and fully adapts to all devices.
 * For larger screens, such as tablet or desktop, it is displayed as a popover, while
 * on phone devices, it is displayed full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DateTimePicker.js";`
 * @constructor
 * @extends DatePicker
 * @since 1.0.0-rc.7
 * @public
 */
let DateTimePicker = DateTimePicker_1 = class DateTimePicker extends DatePicker {
    constructor() {
        super();
        this._handleResizeBound = this._handleResize.bind(this);
    }
    /**
     * @override
     */
    onResponsivePopoverAfterClose() {
        super.onResponsivePopoverAfterClose();
        this._showTimeView = false;
        this._previewValues = {};
    }
    /**
     * LIFECYCLE METHODS
     */
    onEnterDOM() {
        ResizeHandler.register(document.body, this._handleResizeBound);
    }
    onExitDOM() {
        ResizeHandler.deregister(document.body, this._handleResizeBound);
    }
    /**
     * PUBLIC METHODS
     */
    /**
     * Opens the picker.
     * @public
     */
    async openPicker() {
        await super.openPicker();
        this._previewValues = {
            ...this._previewValues,
            timeSelectionValue: this.value || this.getFormat().format(new Date()),
        };
    }
    /**
     * Read-only getters
     */
    get classes() {
        return {
            picker: {
                "ui5-dt-picker-content--phone": this.phone,
            },
            dateTimeView: {
                "ui5-dt-cal--hidden": this.phone && this.showTimeView,
                "ui5-dt-time--hidden": this.phone && this.showDateView,
            },
            footer: {
                "ui5-dt-picker-footer-time-hidden": (this.phone && this.showTimeView) || (this.phone && this.showDateView),
            },
        };
    }
    get _formatPattern() {
        const hasHours = !!this.formatPattern.match(/H/i);
        const fallback = !this.formatPattern || !hasHours;
        const localeData = getCachedLocaleDataInstance(getLocale());
        return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", this._primaryCalendarType) : this.formatPattern;
    }
    get _calendarTimestamp() {
        return this._previewValues.calendarTimestamp ? this._previewValues.calendarTimestamp : super._calendarTimestamp;
    }
    get _calendarSelectedDates() {
        return this._previewValues.calendarValue ? [this._previewValues.calendarValue] : super._calendarSelectedDates;
    }
    get _timeSelectionValue() {
        return this._previewValues.timeSelectionValue ? this._previewValues.timeSelectionValue : this.value;
    }
    get openIconName() {
        return "date-time";
    }
    get btnOKLabel() {
        return DateTimePicker_1.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
    }
    get btnCancelLabel() {
        return DateTimePicker_1.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
    }
    get btnDateLabel() {
        return DateTimePicker_1.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
    }
    get btnTimeLabel() {
        return DateTimePicker_1.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
    }
    get showFooter() {
        return true;
    }
    get showDateView() {
        return this.phone ? !this._showTimeView : true;
    }
    get showTimeView() {
        return this.phone ? this._showTimeView : true;
    }
    get phone() {
        return super.phone || this._phoneMode;
    }
    get dateAriaDescription() {
        return DateTimePicker_1.i18nBundle.getText(DATETIME_DESCRIPTION);
    }
    /**
     * Defines whether the dialog on mobile should have header
     * @private
     */
    get _shouldHideHeader() {
        return true;
    }
    /**
     * EVENT HANDLERS
     */
    /**
     * @override
     */
    onSelectedDatesChange(e) {
        e.preventDefault();
        // @ts-ignore Needed for FF
        const dateTimePickerContent = e.path ? e.path[1] : e.composedPath()[1];
        this._previewValues = {
            ...this._previewValues,
            calendarTimestamp: e.detail.timestamp,
            calendarValue: e.detail.values[0],
            timeSelectionValue: dateTimePickerContent.lastChild.value,
        };
    }
    onTimeSelectionChange(e) {
        this._previewValues = {
            ...this._previewValues,
            timeSelectionValue: e.detail.value,
        };
    }
    /**
     * Handles document resize to switch between `phoneMode` and normal appearance.
     */
    _handleResize() {
        const documentWidth = document.body.offsetWidth;
        const toPhoneMode = documentWidth <= PHONE_MODE_BREAKPOINT;
        const modeChange = (toPhoneMode && !this._phoneMode) || (!toPhoneMode && this._phoneMode); // XOR not allowed by lint
        if (modeChange) {
            this._phoneMode = toPhoneMode;
        }
    }
    get _submitDisabled() {
        return !this._calendarSelectedDates || !this._calendarSelectedDates.length;
    }
    /**
     * Handles clicking on the `submit` button, within the picker`s footer.
     */
    _submitClick() {
        const selectedDate = this.getSelectedDateTime();
        const value = this.getFormat().format(selectedDate);
        if (this.value !== value) {
            this._updateValueAndFireEvents(value, true, ["change", "value-changed"]);
        }
        this.closePicker();
    }
    /**
     * Handles clicking on the `cancel` button, within the picker`s footer,
     * that would disregard the user selection.
     */
    _cancelClick() {
        this.closePicker();
    }
    /**
     * Handles the date/time switch available in `phoneMode` to switch
     * between the date and time views.
     * @param e
     */
    _dateTimeSwitchChange(e) {
        const target = e.target;
        this._showTimeView = target.getAttribute("key") === "Time";
    }
    /**
     * @override
     */
    _modifyDateValue(amount, unit, preserveDate) {
        if (!this.dateValue) {
            return;
        }
        const modifiedDate = modifyDateBy(CalendarDate.fromLocalJSDate(this.dateValue), amount, unit, preserveDate, this._minDate, this._maxDate);
        const modifiedLocalDate = modifiedDate.toLocalJSDate();
        modifiedLocalDate.setHours(this.dateValue.getHours());
        modifiedLocalDate.setMinutes(this.dateValue.getMinutes());
        modifiedLocalDate.setSeconds(this.dateValue.getSeconds());
        const newValue = this.formatValue(modifiedLocalDate);
        this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
    }
    async getPicker() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-responsive-popover]");
    }
    getSelectedDateTime() {
        const selectedDate = this.getFormat().parse(this._calendarSelectedDates[0]);
        const selectedTime = this.getFormat().parse(this._timeSelectionValue);
        if (selectedTime) {
            selectedDate.setHours(selectedTime.getHours());
            selectedDate.setMinutes(selectedTime.getMinutes());
            selectedDate.setSeconds(selectedTime.getSeconds());
        }
        return selectedDate;
    }
    /**
     * @override
     */
    get _calendarPickersMode() {
        return CalendarPickersMode.DAY_MONTH_YEAR;
    }
};
__decorate([
    property({ type: Boolean, noAttribute: true })
], DateTimePicker.prototype, "_showTimeView", void 0);
__decorate([
    property({ type: Boolean })
], DateTimePicker.prototype, "_phoneMode", void 0);
__decorate([
    property({ type: Object })
], DateTimePicker.prototype, "_previewValues", void 0);
DateTimePicker = DateTimePicker_1 = __decorate([
    customElement({
        tag: "ui5-datetime-picker",
        staticAreaTemplate: DateTimePickerPopoverTemplate,
        styles: [
            DateTimePicker.styles,
            DateTimePickerCss,
        ],
        staticAreaStyles: [
            DatePicker.staticAreaStyles,
            DateTimePickerPopoverCss,
        ],
        dependencies: [
            ...DatePicker.dependencies,
            Calendar,
            Button,
            ToggleButton,
            SegmentedButton,
            TimeSelectionClocks,
        ],
    })
], DateTimePicker);
DateTimePicker.define();
export default DateTimePicker;
//# sourceMappingURL=DateTimePicker.js.map