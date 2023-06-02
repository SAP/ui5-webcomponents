import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import "@ui5/webcomponents-icons/dist/date-time.js";
import Button from "./Button.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import ToggleButton from "./ToggleButton.js";
import SegmentedButton from "./SegmentedButton.js";
import Calendar from "./Calendar.js";
import type { CalendarSelectedDatesChangeEventDetail } from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import type {
	DatePickerChangeEventDetail as DateTimePickerChangeEventDetail,
	DatePickerInputEventDetail as DateTimePickerInputEventDetail,
} from "./DatePicker.js";
import TimeSelection from "./TimeSelection.js";
import type { TimeSelectionChangeEventDetail, TimeSelectionSliderChangeEventDetail } from "./TimeSelection.js";

// i18n texts
import {
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
	DATETIME_DESCRIPTION,
	DATETIME_PICKER_DATE_BUTTON,
	DATETIME_PICKER_TIME_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Template
import DateTimePickerPopoverTemplate from "./generated/templates/DateTimePickerPopoverTemplate.lit.js";

// Styles
import DateTimePickerCss from "./generated/themes/DateTimePicker.css.js";
import DateTimePickerPopoverCss from "./generated/themes/DateTimePickerPopover.css.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";

const PHONE_MODE_BREAKPOINT = 640; // px

type PreviewValues = {
	timeSelectionValue?: string,
	calendarTimestamp?: number,
	calendarValue?: string,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>DateTimePicker</code> component alows users to select both date (day, month and year) and time (hours, minutes and seconds)
 * and for the purpose it consists of input field and Date/Time picker.
 *
 * <h3>Usage</h3>
 *
 * Use the <code>DateTimePicker</code> if you need a combined date and time input component.
 * Don't use it if you want to use either date, or time value.
 * In this case, use the <code>DatePicker</code> or the <code>TimePicker</code> components instead.
 * <br><br>
 * The user can set date/time by:
 * <ul>
 * <li>using the calendar and the time selectors</li>
 * <li>typing in the input field</li>
 * </ul>
 *
 * Programmatically, to set date/time for the <code>DateTimePicker</code>, use the <code>value</code> property
 *
 * <h3>Formatting</h3>
 *
 * The value entered by typing into the input field must fit to the used date/time format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * <b>Example:</b> the following format <code>dd/MM/yyyy, hh:mm:ss aa</code>
 * corresponds the <code>13/04/2020, 03:16:16 AM</code> value.
 * <br>
 * The small 'h' defines "12" hours format and the "aa" symbols - "AM/PM" time periods.
 *
 * <br><br>
 * <b>Example:</b> the following format <code>dd/MM/yyyy, HH:mm:ss</code>
 * corresponds the <code>13/04/2020, 15:16:16</code> value.
 * <br>
 * The capital 'H' indicates "24" hours format.
 *
 * <br><br>
 * <b>Note:</b> If the <code>formatPattern</code> does NOT include time,
 * the <code>DateTimePicker</code> will fallback to the default time format according to the locale.
 *
 * <br><br>
 * <b>Note:</b> If no placeholder is set to the <code>DateTimePicker</code>,
 * the current <code>formatPattern</code> is displayed as a placeholder.
 * If another placeholder is needed, it must be set or in case no placeholder is needed - it can be set to an empty string.
 *
 * <br><br>
 * <b>Note:</b> If the user input does NOT match the <code>formatPattern</code>,
 * the <code>DateTimePicker</code> makes an attempt to parse it based on the
 * locale settings.
 *
 * <h3>Responsive behavior</h3>
 *
 * The <code>DateTimePicker</code> is responsive and fully adapts to all devices.
 * For larger screens, such as tablet or desktop, it is displayed as a popover, while
 * on phone devices, it is displayed full screen.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DateTimePicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DateTimePicker
 * @extends sap.ui.webc.main.DatePicker
 * @tagname ui5-datetime-picker
 * @since 1.0.0-rc.7
 * @public
 */
@customElement({
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
		TimeSelection,
	],
})
class DateTimePicker extends DatePicker {
	/**
	 * Defines the visibility of the time view in <code>phoneMode</code>.
	 * For more information, see the <code>phoneMode</code> property.
	 *
	 * <br><br>
	 * <b>Note:</b> The date view would be displayed by default.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_showTimeView!: boolean;

	/**
	 * Defines if the <code>DateTimePicker</code> should be displayed in phone mode.
	 * The phone mode turns on when the component is used on small screens or phone devices.
	 * In phone mode the user can see either the calendar view, or the time view
	 * and can switch between the views via toggle buttons.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	_phoneMode!: boolean;

	/**
	 * Selected, but not yet confirmed date/time
	 * @private
	 */
	@property({ type: Object })
	_previewValues!: PreviewValues;

	/**
	 * @private
	 */
	@property({ defaultValue: "hours" })
	_currentTimeSlider!: string;

	_handleResizeBound: ResizeObserverCallback;

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
		this._currentTimeSlider = "hours";
		this._previewValues.timeSelectionValue = this.value || this.getFormat().format(new Date());
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
		return DateTimePicker.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get btnCancelLabel() {
		return DateTimePicker.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get btnDateLabel() {
		return DateTimePicker.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
	}

	get btnTimeLabel() {
		return DateTimePicker.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
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
		return DateTimePicker.i18nBundle.getText(DATETIME_DESCRIPTION);
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
	onSelectedDatesChange(e: CustomEvent<CalendarSelectedDatesChangeEventDetail>) {
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

	onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>) {
		this._previewValues = {
			...this._previewValues,
			timeSelectionValue: e.detail.value,
		};
	}

	onTimeSliderChange(e: CustomEvent<TimeSelectionSliderChangeEventDetail>) {
		this._currentTimeSlider = e.detail.slider;
	}

	/**
	 * Handles document resize to switch between <code>phoneMode</code> and normal appearance.
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
	 * Handles clicking on the <code>submit</code> button, within the picker`s footer.
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
	 * Handles clicking on the <code>cancel</code> button, within the picker`s footer,
	 * that would disregard the user selection.
	 */
	_cancelClick() {
		this.closePicker();
	}

	/**
	 * Handles the date/time switch available in <code>phoneMode</code> to switch
	 * between the date and time views.
	 * @param {Event} e
	 */
	_dateTimeSwitchChange(e: CustomEvent) { // Note: fix when SegmentedButton is implemented in TS
		const target = e.target as HTMLElement;
		this._showTimeView = target.getAttribute("key") === "Time";
		if (this._showTimeView) {
			this._currentTimeSlider = "hours";
		}
	}

	/**
	 * @override
	 */
	_modifyDateValue(amount: number, unit: string) {
		if (!this.dateValue) {
			return;
		}

		const modifiedDate = modifyDateBy(CalendarDate.fromLocalJSDate(this.dateValue), amount, unit, this._minDate, this._maxDate);
		const modifiedLocalDate = modifiedDate.toLocalJSDate();
		modifiedLocalDate.setHours(this.dateValue.getHours());
		modifiedLocalDate.setMinutes(this.dateValue.getMinutes());
		modifiedLocalDate.setSeconds(this.dateValue.getSeconds());

		const newValue = this.formatValue(modifiedLocalDate);
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
	}

	async getPicker() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	getSelectedDateTime() {
		const selectedDate = this.getFormat().parse(this._calendarSelectedDates[0]) as Date;
		const selectedTime = this.getFormat().parse(this._timeSelectionValue) as Date;
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
}

DateTimePicker.define();

export default DateTimePicker;
export type {
	DateTimePickerChangeEventDetail,
	DateTimePickerInputEventDetail,
};
