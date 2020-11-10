import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
import DateRangePickerTemplate from "./generated/templates/DateRangePickerTemplate.lit.js";
import RenderScheduler from "../../base/src/RenderScheduler.js";

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
		 *
		 * @type {string}
		 * @defaultvalue "-"
		 * @public
		 */
		delimiter: {
			type: String,
			defaultValue: "-",
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
	slots: /** @lends sap.ui.webcomponents.main.DateRangePicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.DateRangePicker.prototype */ {
		//
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
 * increment or decrement the corresponding field of the JS date object referenced by <code>_firstDateTimestamp</code> propery
 * if the caret symbol is before the delimiter character or <code>_lastDateTimestamp</code> property if the caret symbol is
 * after the delimiter character.
 * The following shortcuts are enabled:
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

	static get render() {
		return litRender;
	}

	static get styles() {
		return [DatePicker.styles, DateRangePickerCss];
	}

	static get template() {
		return DateRangePickerTemplate;
	}

	constructor() {
		super();
	}

	onBeforeRendering(...params) {
		super.onBeforeRendering(...params);
		this._calendar.selection = CalendarSelection.Range;
	}

	_splitValueByDelimiter(value) {
		let returnValue = [];

		if (!value) {
			return ["", ""];
		}

		if (this.delimiter) {
			returnValue = String(value).split(this.delimiter);
		}

		return returnValue;
	}

	_setValue(value) {
		const emptyValue = value === "",
			isValid = emptyValue || this._checkValueValidity(value);

		if (value === this._prevValue) {
			return this;
		}

		if (!value) {
			this.value = "";
			return;
		}

		let dates = this._splitValueByDelimiter(value);
		if (!isValid) {
			this.valueState = ValueState.Error;
			console.warn("Value can not be converted to a valid dates", this); // eslint-disable-line
			return;
		}
		this.valueState = ValueState.None;

		const firstDate = this.getFormat().parse(dates[0]);
		const secondDate = this.getFormat().parse(dates[1]);

		this._firstDateTimestamp = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), firstDate.getHours()) / 1000;
		this._lastDateTimestamp = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate(), secondDate.getHours()) / 1000;

		if (this._firstDateTimestamp > this._lastDateTimestamp) {
			const temp = this._firstDateTimestamp;
			this._firstDateTimestamp = this._lastDateTimestamp;
			this._lastDateTimestamp = temp;
		}

		this.value = this._formatValue(firstDate.valueOf() / 1000, secondDate.valueOf() / 1000);
		this._prevValue = this.value;
	}

	_changeCalendarSelection(focusTimestamp) {

		if (this._calendarDate.getYear() < 1) {
			// 0 is a valid year, but we cannot display it
			return;
		}

		const oCalDate = this._calendarDate,
			timestamp = focusTimestamp || oCalDate.valueOf() / 1000,
			dates = this._splitValueByDelimiter(this.value);

		this._calendar = Object.assign({}, this._calendar);
		this._calendar.timestamp = timestamp;
		this._calendar.selectedDates = this.value && this._checkValueValidity(this.value)
			? [this._getTimeStampFromString(dates[0]) / 1000, this._getTimeStampFromString(dates[1]) / 1000]
			: [];
	}

	get _calendarDate() {
		const dates = this._splitValueByDelimiter(this.value),
			value = this._checkValueValidity(this.value) ? dates[0] : this.getFormat().format(new Date()),
			millisecondsUTCFirstDate = value ? this.getFormat().parse(value, true).getTime() : this.getFormat().parse(this.validValue, true).getTime(),
			oCalDateFirst = CalendarDate.fromTimestamp(
				millisecondsUTCFirstDate - (millisecondsUTCFirstDate % (24 * 60 * 60 * 1000)),
				this._primaryCalendarType
			);

		return oCalDateFirst;
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

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat.concat(" ", this.delimiter, " ", this._displayFormat);
	}

	async getDayPicker() {
		this.responsivePopover = await this._respPopover();
		const calendar = this.responsivePopover.querySelector(`#${this._id}-calendar`);
		return calendar.shadowRoot.querySelector(`#${calendar._id}-daypicker`);
	}

	async _handleInputChange() {
		const nextValue = await this._getInput().getInputValue();
		const emptyValue = nextValue === "";
		const isValid = emptyValue || this._checkValueValidity(nextValue);

		if (isValid) {
			this._setValue(nextValue);
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		this.fireEvent("change", { value: nextValue, valid: isValid });
		// Angular two way data binding
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_checkValueValidity(value) {
		return this.isValid(value) && this.isInValidRange(value);
	}

	isValid(value) {
		const dateStrings = this._splitValueByDelimiter(value, this.delimiter),
			isFirstDateValid = super.isValid(dateStrings[0]),
			isLastDateValid = super.isValid(dateStrings[1]);

		if (!dateStrings[1]) {
			return isFirstDateValid;
		}

		return isFirstDateValid && isLastDateValid;
	}

	isInValidRange(value) {
		const dateStrings = this._splitValueByDelimiter(value, this.delimiter),
			isFirstDateInValidRange = super.isInValidRange(this._getTimeStampFromString(dateStrings[0])),
			isLastDateInValidRange = super.isInValidRange(this._getTimeStampFromString(dateStrings[1]));

		if (!dateStrings[1]) {
			return isFirstDateInValidRange;
		}

		return isFirstDateInValidRange && isLastDateInValidRange;
	}

	_handleCalendarChange(event) {
		const selectedDates = event.detail.dates;
		if (selectedDates.length === 2) {
			this.closePicker();
			this._firstDateTimestamp = selectedDates[0] < selectedDates[1] ? selectedDates[0] : selectedDates[1];
			this._lastDateTimestamp = selectedDates[0] > selectedDates[1] ? selectedDates[0] : selectedDates[1];
			const fireChange = this._handleCalendarSelectedDatesChange(event);

			if (fireChange) {
				this.fireEvent("change", { value: this.value, valid: true });
				// Angular two way data binding
				this.fireEvent("value-changed", { value: this.value, valid: true });
			}
		} else {
			this._firstDateTimestamp = selectedDates[0];
			this._lastDateTimestamp = undefined;
			this._handleCalendarSelectedDatesChange(event);
		}
	}

	/**
	 * Adds or extracts a given number of measuring units from the "dateValue" property value
	 *
	 * @param {boolean} forward if true indicates addition
	 * @param {boolean} years indicates that the measuring unit is in years
	 * @param {boolean} months indicates that the measuring unit is in months
	 * @param {boolean} days indicates that the measuring unit is in days
	 * @param {int} step number of measuring units to substract or add defaults ot 1
	 */
	async _changeDateValueWrapper(forward, years, months, days, step = 1) {
		const emptyValue = this.value === "";
		const isValid = emptyValue || this._checkValueValidity(this.value);

		if (!isValid) {
			return;
		}

		const dates = this._splitValueByDelimiter(this.value);
		const innerInput = this.shadowRoot.querySelector("ui5-input").shadowRoot.querySelector(".ui5-input-inner");
		const caretPos = this._getCaretPosition(innerInput);
		const first = dates[0] && caretPos <= dates[0].trim().length + 1;
		const last = dates[1] && (caretPos >= this.value.length - dates[1].trim().length - 1 && caretPos <= this.value.length);
		let firstDate = this.getFormat().parse(dates[0]);
		let lastDate = this.getFormat().parse(dates[1]);

		if (first && firstDate) {
			firstDate = this._changeDateValue(firstDate, forward, years, months, days, step);
		} else if (last && lastDate) {
			lastDate = this._changeDateValue(lastDate, forward, years, months, days, step);
		}

		this.value = this._formatValue(firstDate.valueOf() / 1000, lastDate.valueOf() / 1000);

		await RenderScheduler.whenFinished();
		// Return the caret on the previous position after rendering
		this._setCaretPosition(innerInput, caretPos);
	}

	/**
	 * This method is used in the derived classes
	 */
	async _handleEnterPressed() {
		const innerInput = this.shadowRoot.querySelector("ui5-input").shadowRoot.querySelector(".ui5-input-inner");
		const caretPos = this._getCaretPosition(innerInput);

		this._confirmInput();

		await RenderScheduler.whenFinished();
		// Return the caret on the previous position after rendering
		this._setCaretPosition(innerInput, caretPos);
	}

	_onfocusout() {
		this._confirmInput();
	}

	_confirmInput() {
		const emptyValue = this.value === "";

		if (emptyValue) {
			return;
		}

		const dates = this._splitValueByDelimiter(this.value);
		let firstDate = this.getFormat().parse(dates[0]);
		let lastDate = this.getFormat().parse(dates[1]);

		if (firstDate > lastDate) {
			const temp = firstDate;
			firstDate = lastDate;
			lastDate = temp;
		}

		const newValue = this._formatValue(firstDate.valueOf() / 1000, lastDate.valueOf() / 1000);

		this._setValue(newValue);
	}

	/**
	* Returns the caret (cursor) position of the specified text field (field).
	* Return value range is 0-field.value.length.
	*/
	_getCaretPosition(field) {
		// Initialize
		let caretPos = 0;

		// IE Support
		if (document.selection) {
			// Set focus on the element
			field.focus();

			// To get cursor position, get empty selection range
			const selection = document.selection.createRange();

			// Move selection start to 0 position
			selection.moveStart("character", -field.value.length);

			// The caret position is selection length
			caretPos = selection.text.length;
		} else if (field.selectionStart || field.selectionStart === "0") { // Firefox support
			caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
		}

		return caretPos;
	}

	_setCaretPosition(field, caretPos) {
		if (field.createTextRange) {
			const range = field.createTextRange();
			range.move("character", caretPos);
			range.select();
		} else if (field.selectionStart) {
			field.focus();
			field.setSelectionRange(caretPos, caretPos);
		} else {
			field.focus();
		}
	}

	_handleCalendarSelectedDatesChange(event) {
		this._updateValueCalendarSelectedDatesChange();

		this._calendar.timestamp = this._firstDateTimestamp;
		this._calendar.selectedDates = [...event.detail.dates];
		this._focusInputAfterClose = true;

		if (this.isInValidRange(this.value)) {
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		return true;
	}

	_updateValueCalendarSelectedDatesChange() {
		if (this._firstDateTimestamp && this._lastDateTimestamp) {
			const calStartDate = CalendarDate.fromTimestamp(this._firstDateTimestamp * 1000, this._primaryCalendarType);
			const calEndDate = CalendarDate.fromTimestamp(this._lastDateTimestamp * 1000, this._primaryCalendarType);

			this.value = this._formatValue(calStartDate.toLocalJSDate().valueOf() / 1000, calEndDate.toLocalJSDate().valueOf() / 1000);
			this._prevValue = this.value;
		}
	}

	/**
	 * Combines the start and end dates of a range into a formated string
	 *
	 * @param {int} firstDateValue locale start date timestamp
	 * @param {int} lastDateValue locale end date timestamp
	 * @returns {string} formated start to end date range
	 */
	_formatValue(firstDateValue, lastDateValue) {
		let value = "";
		const delimiter = this.delimiter,
			format = this.getFormat(),
			firstDateString = format.format(new Date(firstDateValue * 1000)),
			lastDateString = format.format(new Date(lastDateValue * 1000));

		if (firstDateValue) {
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
