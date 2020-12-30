import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
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
		 * If not supplied the default time interval delimiter for the current locale will be used.
		 *
		 * @type {string}
		 * @public
		 */
		delimiter: {
			type: String,
		},
		/**
		 * Defines the UNIX timestamp of the first date - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {number}
		 * @private
		*/
		_firstDateTimestamp: {
			type: Integer,
		},
		/**
		 * Defines the UNIX timestamp of the second date- seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {number}
		 * @private
		*/
		_lastDateTimestamp: {
			type: Integer,
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

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarSelectionMode() {
		return "Range";
	}

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarTimestamp() {
		if (this.value && this._checkValueValidity(this.value)) {
			const dateStrings = this._splitValueByDelimiter(this.value);
			return this.getFormat().parse(dateStrings[0], true).getTime() / 1000;
		}

		return getRoundedTimestamp();
	}

	/**
	 * Required by DatePicker.js
	 * @override
	 */
	get _calendarSelectedDates() {
		return [this._firstDateTimestamp, this._lastDateTimestamp].filter(date => !!date);
	}

	_splitValueByDelimiter(value) {
		return value ? value.split(this._effectiveDelimiter).map(date => date.trim()) : ["", ""];
	}

	get _effectiveDelimiter() {
		if (this.delimiter) {
			return this.delimiter;
		}

		const localeData = getCachedLocaleDataInstance(getLocale());
		const pattern = localeData.getIntervalPattern();
		return pattern.slice(pattern.indexOf("{0}") + 3, pattern.indexOf("{1}")).trim();
	}

	/**
	 * Currently selected first date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get firstDateValue() {
		const dateValue = new Date(this._firstDateTimestamp * 1000);
		return new Date(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate(), dateValue.getUTCHours());
	}

	/**
	 * Currently selected last date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get lastDateValue() {
		const dateValue = new Date(this._lastDateTimestamp * 1000);
		return new Date(dateValue.getUTCFullYear(), dateValue.getUTCMonth(), dateValue.getUTCDate(), dateValue.getUTCHours());
	}

	/**
	 * @override
	 */
	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat.concat(" ", this._effectiveDelimiter, " ", this._displayFormat);
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
	 * Empty value is valid, but non-empty value is valid only if both parts are not empty and valid
	 * @override
	 */
	isValid(value) {
		if (value === "") {
			return true;
		}

		return this._splitValueByDelimiter(value).every(dateString => dateString && super.isValid(dateString));
	}

	/**
	 * Empty value is in range, but non-empty value is in range if both parts are not empty and in range
	 * @override
	 */
	isInValidRange(value) {
		if (value === "") {
			return true;
		}

		return this._splitValueByDelimiter(value).every(dateString => dateString && super.isInValidRange(dateString));
	}

	/**
	 * We enforce the correct format by processing the two parts separately and joining them again
	 * @override
	 */
	normalizeValue(value) {
		if (value === "") {
			return value;
		}

		const dates = this._splitValueByDelimiter(value);

		let firstLocalDate = this.getFormat().parse(super.normalizeValue(dates[0]));
		let lastLocalDate = this.getFormat().parse(super.normalizeValue(dates[1]));

		if (lastLocalDate.getTime() < firstLocalDate.getTime()) {
			const temp = new Date(firstLocalDate);
			firstLocalDate = new Date(lastLocalDate);
			lastLocalDate = new Date(temp);
		}

		this._firstDateTimestamp = CalendarDate.fromLocalJSDate(firstLocalDate).valueOf() / 1000;
		this._lastDateTimestamp = CalendarDate.fromLocalJSDate(lastLocalDate).valueOf() / 1000;

		return this._buildValue(firstLocalDate, lastLocalDate);
	}


	/**
	 * @override
	 */
	onSelectedDatesChange(event) {
		const selectedDates = event.detail.dates;
		if (selectedDates.length === 2) {
			this._firstDateTimestamp = Math.min(...selectedDates);
			this._lastDateTimestamp = Math.max(...selectedDates);

			const calStartDate = CalendarDate.fromTimestamp(this._firstDateTimestamp * 1000, this._primaryCalendarType);
			const calEndDate = CalendarDate.fromTimestamp(this._lastDateTimestamp * 1000, this._primaryCalendarType);
			const newValue = this._buildValue(calStartDate.toLocalJSDate(), calEndDate.toLocalJSDate());
			this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);

			this._focusInputAfterClose = true;
			this.closePicker();
		} else {
			this._firstDateTimestamp = selectedDates[0];
			this._lastDateTimestamp = undefined;
			return false;
		}
	}

	/**
	 * @override
	 */
	async _modifyDateValue(amount, unit) {
		let flipped = false;
		const emptyValue = this.value === "";
		const isValid = emptyValue || this._checkValueValidity(this.value);

		if (!isValid) {
			return;
		}

		const dates = this._splitValueByDelimiter(this.value);

		const input = this._getInput();
		let caretPos = input.getCaretPosition();

		const first = dates[0] && caretPos <= dates[0].trim().length + 1;
		const last = dates[1] && (caretPos >= this.value.length - dates[1].trim().length - 1 && caretPos <= this.value.length);
		let firstDate = this.getFormat().parse(dates[0]);
		let lastDate = this.getFormat().parse(dates[1]);

		if (first && firstDate) {
			firstDate = modifyDateBy(CalendarDate.fromLocalJSDate(firstDate, this._primaryCalendarType), amount, unit, this._primaryCalendarType, this._minDate, this._maxDate).toLocalJSDate();
		} else if (last && lastDate) {
			lastDate = modifyDateBy(CalendarDate.fromLocalJSDate(lastDate, this._primaryCalendarType), amount, unit, this._primaryCalendarType, this._minDate, this._maxDate).toLocalJSDate();
		}

		if (firstDate.valueOf() > lastDate.valueOf()) {
			flipped = true;
		}

		const newValue = this._buildValue(firstDate, lastDate);
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);

		await RenderScheduler.whenFinished();
		// Return the caret on the previous position after rendering

		if (flipped) {
			const half = Math.ceil(this.value.length / 2);
			if (caretPos < half) {
				caretPos += (half + 1);
			} else {
				caretPos -= (half + 1);
			}
		}

		input.setCaretPosition(caretPos);
	}

	/**
	 * Combines the start and end dates of a range into a formated string
	 *
	 * @param {int} firstDate locale start date
	 * @param {int} lastDate locale end date
	 * @returns {string} formated start to end date range
	 */
	_buildValue(firstDate, lastDate) {
		let value = "";
		const delimiter = this._effectiveDelimiter,
			format = this.getFormat(),
			firstDateString = firstDate && format.format(firstDate),
			lastDateString = lastDate && format.format(lastDate);

		if (firstDateString) {
			if (delimiter && delimiter !== "" && lastDateString) {
				value = firstDateString.concat(" ", delimiter, " ", lastDateString);
			} else {
				value = firstDateString;
			}
		}

		return value;
	}
}

DateRangePicker.define();

export default DateRangePicker;
