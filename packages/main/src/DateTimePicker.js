import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import "@ui5/webcomponents-icons/dist/icons/date-time.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";
import SegmentedButton from "./SegmentedButton.js";
import Calendar from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import WheelSlider from "./WheelSlider.js";

// time functions
import {
	getHours,
	getMinutes,
	getSeconds,
	getHoursConfigByFormat,
	getTimeControlsByFormat,
} from "./timepicker-utils/TimeSlider.js";

// i18n texts
import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_PERIODS_LABEL,
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
	DATETIME_PICKER_DATE_BUTTON,
	DATETIME_PICKER_TIME_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Template
import DateTimePickerPopoverTemplate from "./generated/templates/DateTimePickerPopoverTemplate.lit.js";

// Styles
import DateTimePickerCss from "./generated/themes/DateTimePicker.css.js";
import DateTimePickerPopoverCss from "./generated/themes/DateTimePickerPopover.css.js";

const PHONE_MODE_BREAKPOINT = 640; // px

/**
 * @public
 */
const metadata = {
	tag: "ui5-datetime-picker",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.DateTimePicker.prototype */ {

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
		_showTimeView: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * Defines if the <code>DateTimePicker</code> should be displayed in phone mode.
		 * The phone mode turns on when the component is used on small screens or phone devices.
		 * In phone mode the user can see either the calendar view, or the time view
		 * and can switch between the views via toggle buttons.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_phoneMode: {
			type: Boolean,
		},

		/**
		 * Defines the state the hours slider - expanded by default.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_hoursCollapsed: {
			type: Boolean,
		},
	},
};

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
 * Programatically, to set date/time for the <code>DateTimePicker</code>, use the <code>value</code> property
 * <br><br>
 * As most of the input based components, the <code>DateTimePicker</code> supports properties,
 * such as: <code>disabled</code>, <code>readonly</code>, <code>valueState</code> and  <code>placeholder</code>.
 *
 * <h3>Formatting</h3>
 *
 * The value entered by typing into the input field must fit to the used date/time format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table" class="api-table-content-cell-link">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
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
 * <code>import @ui5/webcomponents/dist/DateTimePicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DateTimePicker
 * @extends DatePicker
 * @tagname ui5-datetime-picker
 * @since 1.0.0-rc.7
 * @public
 */
class DateTimePicker extends DatePicker {
	static get metadata() {
		return metadata;
	}

	static get staticAreaTemplate() {
		return DateTimePickerPopoverTemplate;
	}

	static get styles() {
		return [super.styles, DateTimePickerCss];
	}

	static get staticAreaStyles() {
		return [...super.staticAreaStyles, DateTimePickerPopoverCss];
	}

	static async onDefine() {
		await Promise.all([
			DatePicker.define(),
			Calendar.define(),
			Button.define(),
			ToggleButton.define(),
			SegmentedButton.define(),
			WheelSlider.define(),
		]);
	}

	constructor() {
		super();

		this._calendarPreview = null; // preview of the calendar selection

		this._hoursConfig = { // hours configuration (12/24 hour format)
			minHour: 0,
			maxHour: 0,
			isTwelveHoursFormat: false,
		};

		const superFn = this._respPopoverConfig.afterClose;
		this._respPopoverConfig.afterClose = () => {
			superFn();
			this._showTimeView = false;
			this._calendarPreview = null;
		};

		this._handleResizeBound = this._handleResize.bind(this);
	}

	/**
	 * LIFECYCLE METHODS
	 */

	onBeforeRendering() {
		super.onBeforeRendering();
		this.updateHoursFormatConfig();
	}

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
	 *
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker(options) {
		await super.openPicker(options);
		await this.setSlidersValue();
		this.expandHoursSlider();
		this.storePreviousValue();
	}

	/**
	 * Closes the picker.
	 * @public
	 */
	closePicker() {
		return super.closePicker(); // in order to be displayed in the DateTimePicker API reference
	}

	/**
	 * Checks if a value is valid against the current date/time format.
	 *
	 * @param {string} value A value to be tested against the current date/time format
	 * @public
	 */
	isValid(value = "") {
		return super.isValid(value); // in order to be displayed in the DateTimePicker API reference
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
		};
	}

	get _formatPattern() {
		return this.normalizePattern(this.formatPattern);
	}

	get _calTimestamp() {
		return this._calendarPreview ? this._calendarPreview.timestamp : this._calendar.timestamp;
	}

	get _calDates() {
		return this._calendarPreview ? this._calendarPreview.selectedDates : this._calendar.selectedDates;
	}

	get secondsArray() {
		return getSeconds();
	}

	get minutesArray() {
		return getMinutes();
	}

	get hoursArray() {
		return getHours(this._hoursConfig);
	}

	get periodsArray() {
		return this.getFormat().aDayPeriods.map(x => x.toUpperCase());
	}

	get openIconName() {
		return "date-time";
	}

	get hoursLabel() {
		return this.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesLabel() {
		return this.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsLabel() {
		return this.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
	}

	get periodLabel() {
		return this.i18nBundle.getText(TIMEPICKER_PERIODS_LABEL);
	}

	get btnOKLabel() {
		return this.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get btnCancelLabel() {
		return this.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get btnDateLabel() {
		return this.i18nBundle.getText(DATETIME_PICKER_DATE_BUTTON);
	}

	get btnTimeLabel() {
		return this.i18nBundle.getText(DATETIME_PICKER_TIME_BUTTON);
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

	get shouldBuildHoursSlider() {
		return this.isTimeControlContained()[0];
	}

	get shouldBuildMinutesSlider() {
		return this.isTimeControlContained()[1];
	}

	get shouldBuildSecondsSlider() {
		return this.isTimeControlContained()[2];
	}

	get shouldBuildPeriodsSlider() {
		return this.isTimeControlContained()[3];
	}

	get _hoursExpanded() {
		return !this._hoursCollapsed;
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
	 * Overwrite the method to update the time sliders.
	 */
	_handleInputLiveChange() {
		super._handleInputLiveChange();
		this.setSlidersValue();
	}

	/**
	 * @override
	 */
	_handleCalendarChange(event) {
		const newValue = event.detail.dates && event.detail.dates[0];
		super._handleCalendarSelectedDatesChange(event, newValue);
		this.storeCalendarSelection();
	}

	/**
	 * @override
	 * Overwrite the method to avoid updating the <code>value</code> when the user clicks on the calendar.
	 *
	 * <b>Note:</b> the <code>DateTimePicker</code> should change and update the value
	 * after user presses the <code>submit</code> button.
	 */
	_updateValueCalendarSelectedDatesChange() {}

	/**
	 * Handles document resize to switch between <code>phoneMode</code> and normal appearance.
	 */
	async _handleResize() {
		const documentWidth = document.body.offsetWidth;
		const toPhoneMode = documentWidth <= PHONE_MODE_BREAKPOINT;
		const modeChange = (toPhoneMode && !this._phoneMode) || (!toPhoneMode && this._phoneMode); // XOR not allowed by lint

		if (modeChange) {
			this._phoneMode = toPhoneMode;
			this.setSlidersValue();
		}
	}

	/**
	 * Handles clicking on the <code>submit</code> button, within the picker`s footer.
	 */
	async _submitClick() {
		const selectedDate = await this.getCurrentDateTime();

		this.value = this.getFormat().format(selectedDate);
		const valid = this.isValid(this.value);

		if (this.value !== this.previousValue) {
			this.fireEvent("change", { value: this.value, valid });
			this.fireEvent("value-changed", { value: this.value, valid });
		}

		this.closePicker();
	}

	/**
	 * Handles clicking on the <code>cancel</code> button, within the picker`s footer,
	 * that would disregard the user selection.
	 */
	async _cancelClick() {
		this.value = this.previousValue;
		this.closePicker();
	}

	/**
	 * Handles the date/time switch available in <code>phoneMode</code> to switch
	 * between the date and time views.
	 * @param {Event} event
	 */
	async _dateTimeSwitchChange(event) {
		this._showTimeView = event.target.getAttribute("key") === "Time";

		if (this._showTimeView) {
			this.expandHoursSlider();
		}
	}

	/**
	 * Handles clicking on "minutes", "seconds" and "periods" sliders.
	 * <b>Note:</b> not bound for "hours" click
	 * @param {Event} event
	 */
	_sliderClick() {
		this.collapseHoursSlider();
	}

	/**
	 * PRIVATE METHODS
	 */

	 /**
	 * Stores a preview of the calendar selection to restore it
	 * when the user switches between the time and date view.
	 * <br><br>
	 * <b>Note:</b> this is needed, because the <code>value</code> is not immediately updated on user interaction,
	 * but only after the user presses the <code>sumbit</code> button.
	 */
	storeCalendarSelection() {
		this._calendarPreview = {
			timestamp: this._calendar.timestamp,
			dates: this._calendar.selectedDates,
		};
	}

	/**
	 * Stores the <code>value</code> when the picker opens to compare with the <code>value</code>,
	 * selected by any user interaction and fire the <code>change</code> event, if they differ.
	 */
	storePreviousValue() {
		this.previousValue = this.value;
	}

	/**
	 * Normalizes the current <code>formatPattern</code>.
	 *
	 * Fallbacks to the default <code>formatPattern</code> according to the locale when:
	 * - no format is set at all
	 * - the format does not include hours
	 *
	 * @param {string} pattern The current <code>formatPattern</code>
	 * @returns {string}
	 */
	normalizePattern(pattern) {
		const hasHours = !!pattern.match(/H/i);
		const fallback = !pattern || !hasHours;

		return fallback ? LocaleData.getInstance(getLocale()).getCombinedDateTimePattern("medium", "medium", this._primaryCalendarType) : pattern;
	}

	/**
	 * Expands the "hours" time slider.
	 */
	expandHoursSlider() {
		this._hoursCollapsed = false;
	}

	/**
	 * Collapses the "hours" time slider.
	 */
	collapseHoursSlider() {
		this._hoursCollapsed = true;
	}

	async getHoursSlider() {
		return (await this.getPicker()).querySelector(".ui5-dt-hours-wheel");
	}

	async getMinutesSlider() {
		return (await this.getPicker()).querySelector(".ui5-dt-minutes-wheel");
	}

	async getSecondsSlider() {
		return (await this.getPicker()).querySelector(".ui5-dt-seconds-wheel");
	}

	async getPeriodsSlider() {
		return (await this.getPicker()).querySelector(".ui5-dt-periods-wheel");
	}

	async getPicker() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("ui5-responsive-popover");
	}

	async getCurrentDateTime() {
		// the time set in the timepicker
		const selectedTime = new Date();
		const timeValues = await this.getTimePickerValues();

		selectedTime.setHours(timeValues.hours);
		selectedTime.setMinutes(timeValues.minutes);
		selectedTime.setSeconds(timeValues.seconds);

		// the date set in the calendar
		const currentCalendarValue = this.getFormat().format(
			new Date(CalendarDate.fromTimestamp(
				this._calTimestamp * 1000,
				this._primaryCalendarType
			).valueOf()),
			true
		);

		// merge both the date and time
		const selectedDate = this.getFormat().parse(currentCalendarValue) || selectedTime;
		selectedDate.setHours(selectedTime.getHours());
		selectedDate.setMinutes(selectedTime.getMinutes());
		selectedDate.setSeconds(selectedTime.getSeconds());

		return selectedDate;
	}

	async getTimePickerValues() {
		const secondsSlider = await this.getSecondsSlider();
		const minutesSlider = await this.getMinutesSlider();
		const hoursSlider = await this.getHoursSlider();
		const periodsSlider = await this.getPeriodsSlider();

		let hours = hoursSlider ? hoursSlider.value : this._hoursConfig.minHour.toString();
		const minutes = minutesSlider ? minutesSlider.value : "0";
		const seconds = secondsSlider ? secondsSlider.value : "0";
		const period = periodsSlider ? periodsSlider.value : this.periodsArray[0];

		if (period === this.periodsArray[0]) { // AM
			hours = hours === "12" ? 0 : hours;
		}

		if (period === this.periodsArray[1]) { // PM
			hours = hours === "12" ? hours : hours * 1 + 12;
		}

		return {
			hours,
			minutes,
			seconds,
			period,
		};
	}

	/**
	 * Sets hours, minutes, seconds and period according to the current <code>value</code>
	 * or the current time if the <code>value</code> is not set.
	 */
	async setSlidersValue() {
		const currentDate = this.value ? this.getFormat().parse(this.value) : new Date();

		if (currentDate) {
			await this.setHours(currentDate.getHours());
			await this.setMinutes(currentDate.getMinutes());
			await this.setSeconds(currentDate.getSeconds());
			await this.setPeriod(currentDate.getHours());
		}
	}

	async setHours(value) {
		let tempValue = "";
		const hoursSlider = await this.getHoursSlider();
		const config = this._hoursConfig;

		if (hoursSlider) {
			if (config.isTwelveHoursFormat && value > config.maxHour) {
				tempValue = value - 12;
			} else if (config.isTwelveHoursFormat && value < config.minHour) {
				tempValue = value + 12;
			} else {
				tempValue = value;
			}

			hoursSlider.value = this.normalizeDigit(tempValue);
		}
	}

	async setMinutes(value) {
		const minutesSlider = await this.getMinutesSlider();

		if (minutesSlider) {
			minutesSlider.value = this.normalizeDigit(value);
		}
	}

	async setSeconds(value) {
		const secondsSlider = await this.getSecondsSlider();

		if (secondsSlider) {
			secondsSlider.value = this.normalizeDigit(value);
		}
	}

	async setPeriod(hours) {
		const config = this._hoursConfig;
		const periodsSlider = await this.getPeriodsSlider();

		if (!periodsSlider) {
			return;
		}

		if (config.isTwelveHoursFormat) {
			if (config.minHour === 1) {
				periodsSlider.value = hours >= config.maxHour ? this.periodsArray[1] : this.periodsArray[0];
			} else {
				periodsSlider.value = (hours > config.maxHour || hours === config.minHour) ? this.periodsArray[1] : this.periodsArray[0];
			}
		}
	}

	normalizeDigit(value) {
		const valueAsString = value.toString();
		return valueAsString.length === 1 ? `0${value}` : valueAsString;
	}

	isTimeControlContained() {
		const format = this.getFormat().aFormatArray;
		return getTimeControlsByFormat(format, this._hoursConfig);
	}

	updateHoursFormatConfig() {
		const formatArray = this.getFormat().aFormatArray;

		if (formatArray.length < 7) {
			return; // does not contain time data
		}

		const config = getHoursConfigByFormat(formatArray[6].type);
		this._hoursConfig.minHour = config.minHour;
		this._hoursConfig.maxHour = config.maxHour;
		this._hoursConfig.isTwelveHoursFormat = config.isTwelveHoursFormat;
	}
}

DateTimePicker.define();

export default DateTimePicker;
