import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import DateRangePickerTemplate from "./generated/templates/DateRangePickerTemplate.lit.js";

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
		this.isFirstDatePick = true;
		this._initialRendering = true;
		this._oneTimeStampSelected = false; // Used to determine whether the first & last date is the same
		this._dayPickerMouseoverHandler = this._itemMouseoverHandler.bind(this);
		this._respPopoverConfig.beforeOpen = this.handleBeforeOpen;
		this._respPopoverConfig.beforeClose = this.handleBeforeClose;
	}

	async onAfterRendering() {
		const daypicker = this.getDayPicker();
		this._cleanHoveredAttributeFromVisibleItems(daypicker);
		this._initialRendering = false;
	}

	async handleBeforeOpen() {
		const daypicker = await this.getDayPicker();
		daypicker.addEventListener("item-mouseover", this._dayPickerMouseoverHandler);
		daypicker.addEventListener("daypickerrendered", this._keyboardNavigationHandler);
	}

	async handleBeforeClose() {
		const daypicker = await this.getDayPicker();
		daypicker.removeEventListener("item-mouseover", this._dayPickerMouseoverHandler);
		daypicker.removeEventListener("daypickerrendered", this._keyboardNavigationHandler);
	}

	_itemMouseoverHandler(event) {
		if (this._oneTimeStampSelected) {
			return;
		}

		const dayItems = event.target.shadowRoot.querySelectorAll(".ui5-dp-item");
		const firstDateTimestamp = event.target._selectedDates[0];
		const lastDateTimestamp = event.detail.target.parentElement.dataset.sapTimestamp;

		for (let i = 0; i < dayItems.length; i++) {
			if ((dayItems[i].dataset.sapTimestamp < firstDateTimestamp && dayItems[i].dataset.sapTimestamp > lastDateTimestamp)
				|| (dayItems[i].dataset.sapTimestamp > firstDateTimestamp && dayItems[i].dataset.sapTimestamp < lastDateTimestamp)) {
				dayItems[i].setAttribute("hovered", "");
			} else {
				dayItems[i].removeAttribute("hovered");
			}
		}
	}

	_keyboardNavigationHandler(event) {
		if (!event.detail.focusedItemIndex) {
			return;
		}

		const dayItems = event.target.shadowRoot.querySelectorAll(".ui5-dp-item");
		const firstDateTimestamp = this._selectedDates[0];
		const lastDateTimestamp = dayItems[event.detail.focusedItemIndex].dataset.sapTimestamp;

		for (let i = 0; i < dayItems.length; i++) {
			if ((dayItems[i].dataset.sapTimestamp < firstDateTimestamp && dayItems[i].dataset.sapTimestamp > lastDateTimestamp)
				|| (dayItems[i].dataset.sapTimestamp > firstDateTimestamp && dayItems[i].dataset.sapTimestamp < lastDateTimestamp)) {
				dayItems[i].setAttribute("hovered", "");
			} else {
				dayItems[i].removeAttribute("hovered");
			}
		}
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
		let dates = [undefined, undefined];

		if (value === this._prevValue) {
			return this;
		}

		if (!value) {
			this.value = "";
			return;
		}

		dates = this._splitValueByDelimiter(value);
		if (!isValid) {
			this.valueState = ValueState.Error;
			console.warn("Value can not be converted to a valid dates", this); // eslint-disable-line
			return;
		}
		this.valueState = ValueState.None;

		let firstDate = this.getFormat().parse(dates[0]);
		let lastDate;

		if (dates.length > 1) {
			lastDate = this.getFormat().parse(dates[1]);

			if (firstDate > lastDate) {
				const temp = firstDate;
				firstDate = lastDate;
				lastDate = temp;
			}
			this._lastDateTimestamp = CalendarDate.fromLocalJSDate(lastDate, this._primaryCalendarType).valueOf() / 1000;
		}
		this._firstDateTimestamp = CalendarDate.fromLocalJSDate(firstDate, this._primaryCalendarType).valueOf() / 1000;
		this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._firstDateTimestamp * 1000, this._lastDateTimestamp * 1000);

		this.value = this._formatValue(firstDate, lastDate);
		this.realValue = this.value;
		this._prevValue = this.value;
	}

	_changeCalendarSelection(focusTimestamp) {
		if (this._calendarDate.getYear() < 1) {
			// 0 is a valid year, but we cannot display it
			return;
		}

		const oCalDate = this._calendarDate,
			timestamp = focusTimestamp || oCalDate.valueOf() / 1000,
			dates = this._splitValueByDelimiter(this.realValue);

		if (this._initialRendering) {
			this._oneTimeStampSelected = dates[0].trim() === dates[1].trim();
			this._setValue(this.realValue);
		}

		this._calendar = Object.assign({}, this._calendar);
		this._calendar.timestamp = timestamp;
		if (this.realValue && this._checkValueValidity(this.realValue)) {
			this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._getTimeStampFromString(dates[0]), this._getTimeStampFromString(dates[1]));
		}
	}

	get _calendarDate() {
		const dates = this._splitValueByDelimiter(this.realValue),
			value = this._checkValueValidity(this.realValue) ? dates[0] : this.getFormat().format(new Date()),
			millisecondsUTCFirstDate = value ? this.getFormat().parse(value, true).getTime() : this.getFormat().parse(this.validValue, true).getTime(),
			oCalDateFirst = CalendarDate.fromTimestamp(
				millisecondsUTCFirstDate - (millisecondsUTCFirstDate % (24 * 60 * 60 * 1000)),
				this._primaryCalendarType
			);

		return oCalDateFirst;
	}

	get _shoudHideValueInInput() {
		return this._firstDateTimestamp === this._lastDateTimestamp && this._firstDateTimestamp;
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
		const dates = this._splitValueByDelimiter(nextValue);

		if (dates.length === 2) {
			this._oneTimeStampSelected = dates[0].trim() === dates[1].trim();
		}

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

	checkRealValueValidity() {
		return this.isValid(this.realValue) && this.isInValidRange(this.realValue);
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

	dateIntervalArrayBuilder(firstTimestamp, lastTimestamp) {
		const datesTimestamps = [],
			tempCalendarDate = CalendarDate.fromTimestamp(firstTimestamp);

		while (tempCalendarDate.valueOf() < lastTimestamp) {
			datesTimestamps.push(tempCalendarDate.valueOf() / 1000);
			tempCalendarDate.setDate(tempCalendarDate.getDate() + 1);
		}

		datesTimestamps.push(tempCalendarDate.valueOf() / 1000);

		return datesTimestamps;
	}

	_handleCalendarChange(event) {
		const newValue = event.detail.dates && event.detail.dates[0];
		this._oneTimeStampSelected = false;
		if (this.isFirstDatePick) {
			this.isFirstDatePick = false;
			this._firstDateTimestamp = newValue;
			this._lastDateTimestamp = newValue;
			this._calendar.timestamp = newValue;
			this._handleCalendarSelectedDatesChange();
		} else {
			this.closePicker();
			this.isFirstDatePick = true;
			if (newValue < this._firstDateTimestamp) {
				this._lastDateTimestamp = this._firstDateTimestamp;
				this._firstDateTimestamp = newValue;
			} else {
				this._oneTimeStampSelected = newValue === this._firstDateTimestamp;
				this._lastDateTimestamp = newValue;
			}
			const fireChange = this._handleCalendarSelectedDatesChange();

			if (fireChange) {
				this.fireEvent("change", { value: this.realValue, valid: true });
				// Angular two way data binding
				this.fireEvent("value-changed", { value: this.realValue, valid: true });
			}
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

		this.value = this._formatValue(firstDate, lastDate);

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

		this._setValue(this.value);

		await RenderScheduler.whenFinished();
		// Return the caret on the previous position after rendering
		this._setCaretPosition(innerInput, caretPos);
	}

	_onfocusout() {
		this._setValue(this.value);
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

	_handleCalendarSelectedDatesChange() {
		this._updateValueCalendarSelectedDatesChange();
		this._cleanHoveredAttributeFromVisibleItems();

		this._calendar.timestamp = this._firstDateTimestamp;
		this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._firstDateTimestamp * 1000, this._lastDateTimestamp * 1000);
		this._focusInputAfterClose = true;

		if (this.isInValidRange(this.realValue)) {
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		return true;
	}

	async _cleanHoveredAttributeFromVisibleItems(dayPicker) {
		if (!dayPicker) {
			return;
		}

		const daypicker = await this.getDayPicker();
		const dayItems = daypicker.shadowRoot.querySelectorAll(".ui5-dp-item");

		for (let i = 0; i < dayItems.length; i++) {
			dayItems[i].removeAttribute("hovered");
		}
	}

	_updateValueCalendarSelectedDatesChange() {
		const calStartDate = CalendarDate.fromTimestamp(this._firstDateTimestamp * 1000, this._primaryCalendarType);
		const calEndDate = CalendarDate.fromTimestamp(this._lastDateTimestamp * 1000, this._primaryCalendarType);

		// Collect both dates and merge them into one
		if (this._firstDateTimestamp !== this._lastDateTimestamp || this._oneTimeStampSelected) {
			this.value = this._formatValue(calStartDate.toLocalJSDate(), calEndDate.toLocalJSDate());
		}

		this.realValue = this._formatValue(calStartDate.toLocalJSDate(), calEndDate.toLocalJSDate());
		this._prevValue = this.realValue;
	}

	/**
	 * Combines the start and end dates of a range into a formated string
	 *
	 * @param {int} firstDate locale start date
	 * @param {int} lastDate locale end date
	 * @returns {string} formated start to end date range
	 */
	_formatValue(firstDate, lastDate) {
		let value = "";
		const delimiter = this.delimiter,
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
