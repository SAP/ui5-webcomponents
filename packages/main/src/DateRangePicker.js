import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import { DATERANGE_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Styles
import DateRangePickerCss from "./generated/themes/DateRangePicker.css.js";
import DatePicker from "./DatePicker.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-daterange-picker",
	properties: /** @lends sap.ui.webcomponents.main.DateRangePicker.prototype */ {
		/**
		 * Determines the symbol which separates the dates.
		 * If not supplied, the default time interval delimiter for the current locale will be used.
		 *
		 * @type {string}
		 * @public
		 */
		delimiter: {
			type: String,
			defaultValue: "-",
		},

		/**
		 * The first date in the range during selection (this is a temporary value, not the first date in the value range)
		 * @private
		 */
		_tempValue: {
			type: String,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The DateRangePicker enables the users to enter a localized date range using touch, mouse, keyboard input, or by selecting a date range in the calendar.
 *
 * <h3>Usage</h3>
 * The user can enter a date by:
 * Using the calendar that opens in a popup or typing it in directly in the input field (not available for mobile devices).
 * For the <code>ui5-daterange-picker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DateRangePicker.js";</code>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-daterange-picker</code> provides advanced keyboard handling.
 * <br>
 *
 * When the <code>ui5-daterange-picker</code> input field is focused the user can
 * increment or decrement respectively the range start or end date, depending on where the cursor is.
 * The following shortcuts are available:
 * <br>
 * <ul>
 * <li>[PAGEDOWN] - Decrements the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEDOWN] - Decrements the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEDOWN] - Decrements the corresponding year by one</li>
 * <li>[PAGEUP] - Increments the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEUP] - Increments the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEUP] - Increments the corresponding year by one</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DateRangePicker
 * @extends sap.ui.webcomponents.main.DatePicker
 * @tagname ui5-daterange-picker
 * @since 1.0.0-rc.8
 * @public
 */
class DateRangePicker extends DatePicker {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [DatePicker.styles, DateRangePickerCss];
	}

	constructor() {
		super();
		this._prevDelimiter = null;
	}

	/**
	 * <b>Note:</b> The getter method is inherited and not supported. If called it will return an empty value.
	 *
	 * @readonly
	 * @type {Date}
	 * @public
	 */
	get dateValue() {
		return null;
	}

	/**
	 * <b>Note:</b> The getter method is inherited and not supported. If called it will return an empty value.
	 *
	 * @readonly
	 * @type {Date}
	 * @public
	 */
	get dateValueUTC() {
		return null;
	}

	get _startDateTimestamp() {
		return this._extractFirstTimestamp(this.value);
	}

	get _endDateTimestamp() {
		return this._extractLastTimestamp(this.value);
	}

	get _tempTimestamp() {
		return this._tempValue && this.getFormat().parse(this._tempValue, true).getTime() / 1000;
	}

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarSelectionMode() {
		return "Range";
	}

	/**
	 * Required by DatePicker.js - set the calendar focus on the first selected date (or today if not set)
	 * @override
	 */
	get _calendarTimestamp() {
		return this._tempTimestamp || this._startDateTimestamp || getTodayUTCTimestamp(this._primaryCalendarType);
	}

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarSelectedDates() {
		if (this._tempValue) {
			return [this._tempValue];
		}
		if (this.value && this._checkValueValidity(this.value)) {
			return this._splitValueByDelimiter(this.value);
		}
		return [];
	}

	/**
	 * Returns the start date of the currently selected range as JavaScript Date instance.
	 *
	 * @readonly
	 * @type {Date}
	 * @public
	 */
	get startDateValue() {
		return CalendarDate.fromTimestamp(this._startDateTimestamp * 1000).toLocalJSDate();
	}

	/**
	 * Returns the end date of the currently selected range as JavaScript Date instance.
	 *
	 * @readonly
	 * @type {Date}
	 * @public
	 */
	get endDateValue() {
		return CalendarDate.fromTimestamp(this._endDateTimestamp * 1000).toLocalJSDate();
	}

	/**
	 * @override
	 */
	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : `${this._displayFormat} ${this._effectiveDelimiter} ${this._displayFormat}`;
	}

	get dateAriaDescription() {
		return DateRangePicker.i18nBundle.getText(DATERANGE_DESCRIPTION);
	}

	/**
	 * @override
	 */
	async _onInputSubmit(event) {
		const input = this._getInput();
		const caretPos = input.getCaretPosition();
		await renderFinished();
		input.setCaretPosition(caretPos); // Return the caret on the previous position after rendering
	}

	/**
	 * @override
	 */
	 onResponsivePopoverAfterClose() {
		this._tempValue = ""; // reset _tempValue on popover close
		super.onResponsivePopoverAfterClose();
	}

	/**
	 * @override
	 */
	isValid(value) {
		const parts = this._splitValueByDelimiter(value);
		return parts.length <= 2 && parts.every(dateString => super.isValid(dateString)); // must be at most 2 dates and each must be valid
	}

	/**
	 * @override
	 */
	isInValidRange(value) {
		return this._splitValueByDelimiter(value).every(dateString => super.isInValidRange(dateString));
	}

	/**
	 * Extract both dates as timestamps, flip if necessary, and build (which will use the desired format so we enforce the format too)
	 * @override
	 */
	normalizeValue(value) {
		const firstDateTimestamp = this._extractFirstTimestamp(value);
		const lastDateTimestamp = this._extractLastTimestamp(value);
		if (firstDateTimestamp && lastDateTimestamp && firstDateTimestamp > lastDateTimestamp) { // if both are timestamps (not undefined), flip if necessary
			return this._buildValue(lastDateTimestamp, firstDateTimestamp);
		}
		return this._buildValue(firstDateTimestamp, lastDateTimestamp);
	}

	/**
	 * @override
	 */
	onSelectedDatesChange(event) {
		event.preventDefault(); // never let the calendar update its own dates, the parent component controls them
		const values = event.detail.values;

		if (values.length === 0) {
			return;
		}

		if (values.length === 1) { // Do nothing until the user selects 2 dates, we don't change any state at all for one date
			this._tempValue = values[0];
			return;
		}

		const newValue = this._buildValue(...event.detail.dates); // the value will be normalized so we don't need to order them here
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
		this.closePicker();
	}

	/**
	 * @override
	 */
	async _modifyDateValue(amount, unit) {
		if (!this._endDateTimestamp) { // If empty or only one date -> treat as datepicker entirely
			return super._modifyDateValue(amount, unit);
		}

		const input = this._getInput();
		let caretPos = input.getCaretPosition();
		let newValue;

		if (caretPos <= this.value.indexOf(this._effectiveDelimiter)) { // The user is focusing the first date -> change it and keep the seoond date
			const startDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._startDateTimestamp * 1000), amount, unit, this._minDate, this._maxDate);
			const newStartDateTimestamp = startDateModified.valueOf() / 1000;
			if (newStartDateTimestamp > this._endDateTimestamp) { // dates flipped -> move the caret to the same position but on the last date
				caretPos += Math.ceil(this.value.length / 2);
			}
			newValue = this._buildValue(newStartDateTimestamp, this._endDateTimestamp); // the value will be normalized so we don't try to order them here
		} else {
			const endDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._endDateTimestamp * 1000), amount, unit, this._minDate, this._maxDate);
			const newEndDateTimestamp = endDateModified.valueOf() / 1000;
			newValue = this._buildValue(this._startDateTimestamp, newEndDateTimestamp); // the value will be normalized so we don't try to order them here
			if (newEndDateTimestamp < this._startDateTimestamp) { // dates flipped -> move the caret to the same position but on the first date
				caretPos -= Math.ceil(this.value.length / 2);
			}
		}
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);

		await renderFinished();
		input.setCaretPosition(caretPos); // Return the caret to the previous (or the adjusted, if dates flipped) position after rendering
	}

	get _effectiveDelimiter() {
		return this.delimiter || this.constructor.getMetadata().getProperties().delimiter.defaultValue; // treat empty string as the default value
	}

	_splitValueByDelimiter(value) {
		const valuesArray = [];
		const partsArray = value.split(this._prevDelimiter || this._effectiveDelimiter);

		// if format successfully parse the value, the value contains only single date
		if (this.getFormat().parse(value)) {
			valuesArray[0] = partsArray.join(this._effectiveDelimiter);
			valuesArray[1] = "";
		} else {
			valuesArray[0] = partsArray.slice(0, partsArray.length / 2).join(this._effectiveDelimiter);
			valuesArray[1] = partsArray.slice(partsArray.length / 2).join(this._effectiveDelimiter);
		}

		return valuesArray;
	}

	/**
	 * Returns a UTC timestamp, representing the first date in the value string or undefined if the value is empty
	 * @private
	 */
	_extractFirstTimestamp(value) {
		if (!value || !this._checkValueValidity(value)) {
			return undefined;
		}

		const dateStrings = this._splitValueByDelimiter(value); // at least one item guaranteed due to the checks above (non-empty and valid)
		return this.getFormat().parse(dateStrings[0], true).getTime() / 1000;
	}

	/**
	 * Returns a UTC timestamp, representing the last date in the value string or undefined if the value is empty or there is just one date
	 * @private
	 */
	_extractLastTimestamp(value) {
		if (!value || !this._checkValueValidity(value)) {
			return undefined;
		}

		const dateStrings = this._splitValueByDelimiter(value);
		if (dateStrings[1]) {
			return this.getFormat().parse(dateStrings[1], true).getTime() / 1000;
		}

		return undefined;
	}

	/**
	 * Builds a string value out of two UTC timestamps - this method is the counterpart to _extractFirstTimestamp/_extractLastTimestamp
	 * @private
	 */
	_buildValue(firstDateTimestamp, lastDateTimestamp) {
		this._prevDelimiter = this._effectiveDelimiter;
		if (firstDateTimestamp) {
			const firstDateString = this._getStringFromTimestamp(firstDateTimestamp * 1000);

			if (!lastDateTimestamp) {
				return firstDateString;
			}

			const lastDateString = this._getStringFromTimestamp(lastDateTimestamp * 1000);
			return `${firstDateString} ${this._effectiveDelimiter} ${lastDateString}`;
		}

		return "";
	}
}

DateRangePicker.define();

export default DateRangePicker;
