import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import "@ui5/webcomponents-icons/dist/date-time.js";
import Button from "./Button.js";
import ToggleButton from "./ToggleButton.js";
import SegmentedButton from "./SegmentedButton.js";
import Calendar from "./Calendar.js";
import DatePicker from "./DatePicker.js";
import TimeSelection from "./TimeSelection.js";

// i18n texts
import {
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
		 * Selected, but not yet confirmed date/time
		 * @private
		 */
		_calendarPreview: {
			type: Object,
			defaultValue: null,
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
		return [super.staticAreaStyles, DateTimePickerPopoverCss];
	}

	static get dependencies() {
		return [
			...DatePicker.dependencies,
			Calendar,
			Button,
			ToggleButton,
			SegmentedButton,
			TimeSelection,
		];
	}

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
		this._calendarPreview = null;
		this.tempValue = null;
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
	 *
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker(options) {
		await super.openPicker(options);
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
		const hasHours = !!this.formatPattern.match(/H/i);
		const fallback = !this.formatPattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getCombinedDateTimePattern("medium", "medium", this._primaryCalendarType) : this.formatPattern;
	}

	get _effectiveCalendarTimestamp() {
		return this._calendarPreview ? this._calendarPreview.timestamp : this._calendarTimestamp;
	}

	get _effectiveCalendarSelectedDates() {
		return this._calendarPreview ? this._calendarPreview.selectedDates : this._calendarSelectedDates;
	}

	get _effectiveTimeValue() {
		return this.tempValue ? this.tempValue : this.value;
	}

	get openIconName() {
		return "date-time";
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
	onSelectedDatesChange(event) {
		const newValue = event.detail.dates && event.detail.dates[0];
		this._calendarPreview = {
			timestamp: event.detail.timestamp,
			dates: [newValue],
		};
	}

	onTimeSelectionChange(event) {
		this.tempValue = event.detail.value; // every time the user changes the sliders -> update tempValue
	}

	/**
	 * Handles document resize to switch between <code>phoneMode</code> and normal appearance.
	 */
	async _handleResize() {
		const documentWidth = document.body.offsetWidth;
		const toPhoneMode = documentWidth <= PHONE_MODE_BREAKPOINT;
		const modeChange = (toPhoneMode && !this._phoneMode) || (!toPhoneMode && this._phoneMode); // XOR not allowed by lint

		if (modeChange) {
			this._phoneMode = toPhoneMode;
		}
	}

	/**
	 * Handles clicking on the <code>submit</code> button, within the picker`s footer.
	 */
	_submitClick() {
		const selectedDate = this.getCurrentDateTime();

		this.value = this.getFormat().format(selectedDate);
		const valid = this.isValid(this.value);

		if (this.value !== this.previousValue) {
			this.fireEvent("change", { value: this.value, valid });
			this.fireEvent("value-changed", { value: this.value, valid });
		}

		this._focusInputAfterClose = true;
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
	 * Stores the <code>value</code> when the picker opens to compare with the <code>value</code>,
	 * selected by any user interaction and fire the <code>change</code> event, if they differ.
	 */
	storePreviousValue() {
		this.previousValue = this.value;
	}

	async getPicker() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-responsive-popover]");
	}

	getCurrentDateTime() {
		// the date set in the calendar
		const currentCalendarValue = this.getFormat().format(
			new Date(CalendarDate.fromTimestamp(
				this._effectiveCalendarTimestamp * 1000,
				this._primaryCalendarType
			).valueOf()),
			true
		);

		// merge both the date and time
		const selectedDate = this.getFormat().parse(currentCalendarValue);
		const selectedTime = this.getFormat().parse(this.tempValue);
		selectedDate.setHours(selectedTime.getHours());
		selectedDate.setMinutes(selectedTime.getMinutes());
		selectedDate.setSeconds(selectedTime.getSeconds());

		return selectedDate;
	}
}

DateTimePicker.define();

export default DateTimePicker;
