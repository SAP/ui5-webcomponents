import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getRoundedTimestamp from "@ui5/webcomponents-localization/dist/dates/getRoundedTimestamp.js";

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
 * <code>import @ui5/webcomponents/dist/DateRangePicker.js";</code>
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
 * @extends DatePicker
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

	get _firstDateTimestamp() {
		return this._extractFirstTimestamp(this.value);
	}

	get _lastDateTimestamp() {
		return this._extractLastTimestamp(this.value);
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
		return this._firstDateTimestamp || getRoundedTimestamp();
	}

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarSelectedDates() {
		return [this._firstDateTimestamp, this._lastDateTimestamp].filter(date => !!date);
	}

	/**
	 * Currently selected first date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get firstDateValue() {
		return CalendarDate.fromTimestamp(this._firstDateTimestamp * 1000).toLocalJSDate();
	}

	/**
	 * Currently selected last date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get lastDateValue() {
		return CalendarDate.fromTimestamp(this._lastDateTimestamp * 1000).toLocalJSDate();
	}

	/**
	 * @override
	 */
	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : `${this._displayFormat} ${this._effectiveDelimiter} ${this._displayFormat}`;
	}

	/**
	 * @override
	 */
	async _onInputSubmit(event) {
		const input = this._getInput();
		const caretPos = input.getCaretPosition();

		super._onInputSubmit(event);

		await RenderScheduler.whenFinished();
		input.setCaretPosition(caretPos); // Return the caret on the previous position after rendering
	}

	/**
	 * @override
	 */
	isValid(value) {
		return value === "" || this._splitValueByDelimiter(value).every(dateString => super.isValid(dateString));
	}

	/**
	 * @override
	 */
	isInValidRange(value) {
		return value === "" || this._splitValueByDelimiter(value).every(dateString => super.isInValidRange(dateString));
	}

	/**
	 * Extract both dates as timestamps, flip if necessary, and build (which will use the desired format)
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
		const selectedDates = event.detail.dates;
		if (selectedDates.length !== 2) {
			return;
		}

		const newValue = this._buildValue(Math.min(...selectedDates), Math.max(...selectedDates));
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
		this._focusInputAfterClose = true;
		this.closePicker();
	}

	/**
	 * @override
	 */
	async _modifyDateValue(amount, unit) {
		// If empty or only one date -> treat as datepicker entirely
		if (!this._lastDateTimestamp) {
			return super._modifyDateValue(amount, unit);
		}

		const input = this._getInput();
		let caretPos = input.getCaretPosition();
		let newValue;

		if (caretPos <= this.value.indexOf(this._effectiveDelimiter)) { // The user is focusing the first date
			const firstDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._firstDateTimestamp * 1000, this._primaryCalendarType), amount, unit, this._primaryCalendarType, this._minDate, this._maxDate);
			const newFirstDateTimestamp = firstDateModified.valueOf() / 1000;
			if (newFirstDateTimestamp > this._lastDateTimestamp) {
				caretPos += Math.ceil(this.value.length / 2); // dates flipped -> move the caret to the same position on the last date
			}
			newValue = this._buildValue(newFirstDateTimestamp, this._lastDateTimestamp); // the value will be normalized, it's ok if first date > last date
		} else {
			const lastDateModified = modifyDateBy(CalendarDate.fromTimestamp(this._lastDateTimestamp * 1000, this._primaryCalendarType), amount, unit, this._primaryCalendarType, this._minDate, this._maxDate);
			const newLastDateTimestamp = lastDateModified.valueOf() / 1000;
			newValue = this._buildValue(this._firstDateTimestamp, newLastDateTimestamp); // the value will be normalized, it's ok if first date > last date
			if (newLastDateTimestamp < this._firstDateTimestamp) { // dates flipped -> move the caret to the same position on the first date
				caretPos -= Math.ceil(this.value.length / 2);
			}
		}
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);

		await RenderScheduler.whenFinished();
		input.setCaretPosition(caretPos); // Return the caret to the previous (or the adjusted, if dates flipped) position after rendering
	}

	get _effectiveDelimiter() {
		return this.delimiter || this.constructor.getMetadata().getProperties().delimiter.defaultValue; // cannot be an empty string
	}

	_splitValueByDelimiter(value) {
		return value ? value.split(this._effectiveDelimiter).map(date => date.trim()) : ["", ""];
	}

	/**
	 * Returns a UTC timestamp, representing the first date in the value string or undefined if the value is empty
	 * @private
	 */
	_extractFirstTimestamp(value) {
		if (!value || !this._checkValueValidity(value)) {
			return undefined;
		}

		const dateStrings = this._splitValueByDelimiter(value);
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
	 * Builds a string value out of two UTC timestamps
	 * @private
	 */
	_buildValue(firstDateTimestamp, lastDateTimestamp) {
		if (firstDateTimestamp) {
			const firstDate = CalendarDate.fromTimestamp(firstDateTimestamp * 1000, this._primaryCalendarType).toLocalJSDate();
			const firstDateString = this.getFormat().format(firstDate);

			if (!lastDateTimestamp) {
				return firstDateString;
			}

			const lastDate = CalendarDate.fromTimestamp(lastDateTimestamp * 1000, this._primaryCalendarType).toLocalJSDate();
			const lastDateString = this.getFormat().format(lastDate);
			return `${firstDateString} ${this._effectiveDelimiter} ${lastDateString}`;
		}

		return "";
	}
}

DateRangePicker.define();

export default DateRangePicker;
