import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
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
 * For the <code>ui5-date-range-picker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/DateRangePicker.js";</code>
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
		return [...DatePicker.styles, DateRangePickerCss];
	}

	static get template() {
		return DateRangePickerTemplate;
	}

	static async onDefine() {
		await DatePicker.define();
	}

	constructor() {
		super();
		this.isFirstDatePick = true;
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue(),
			emptyValue = nextValue === "",
			isValid = emptyValue || (this.isValid(nextValue) && this.isInValidRange(nextValue));

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	onBeforeRendering() {
		this._calendar.primaryCalendarType = this._primaryCalendarType;
		this._calendar.formatPattern = this._formatPattern;


		if (this.minDate && !super.isValid(this.minDate)) {
			this.minDate = null;
			console.warn(`In order for the "minDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}

		if (this.maxDate && !super.isValid(this.maxDate)) {
			this.maxDate = null;
			console.warn(`In order for the "maxDate" property to have effect, you should enter valid date format`); // eslint-disable-line
		}
		if (this.isValid(this.value) && this.isInValidRange(this.value)) {
			this._changeCalendarSelection(this.timestamp);
		} else {
			this._calendar.selectedDates = [];
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		if (this.minDate) {
			this._calendar.minDate = this.minDate;
		}

		if (this.maxDate) {
			this._calendar.maxDate = this.maxDate;
		}
	}

	async onAfterRendering() {
		this.responsivePopover = await this._respPopover();
		const calendar = this.responsivePopover.querySelector(`#${this._id}-calendar`);
		const dayPicker = calendar.shadowRoot.querySelector(`#${calendar._id}-daypicker`);
		dayPicker.addEventListener("item-mouseover", this._itemMouseoverHandler);
		dayPicker.addEventListener("daypickerrendered", this._keyboardNavigationHandler);

		this._cleanHoveredAttributeFromVisibleItems(dayPicker);
	}

	_itemMouseoverHandler(event) {
		const dayItems = event.target.shadowRoot.querySelectorAll(".ui5-dp-item");
		const firstDateTimestamp = this._selectedDates[0];
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

	setValue(value) {
		const emptyValue = value === "",
			isValid = emptyValue || this.isValid(value),
			isInValidRange = this.isInValidRange(value);
		let dates = [undefined, undefined];

		if (value === this.value) {
			return this;
		}

		if (value) {
			dates = this._splitValueByDelimiter(value);
			if (isValid && isInValidRange) {
				this.valueState("Error");
				console.warn("Value can not be converted to a valid dates", this); // eslint-disable-line
			}
		}

		this._firstDateTimestamp = this._getTimeStampFromString(dates[0]);
		this._lastDateTimestamp = this._getTimeStampFromString(dates[1]);
		this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._firstDateTimestamp, this._lastDateTimestamp);
		this.value = value;
		this._getInput().setValue(value);

		return this;
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
		if (this.value) {
			this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._getTimeStampFromString(dates[0]), this._getTimeStampFromString(dates[1]));
		}
	}

	get _calendarDate() {
		const dates = this._splitValueByDelimiter(this.value),
			millisecondsUTCFirstDate = dates[0] ? this.getFormat().parse(dates[0], true).getTime() : this.getFormat().parse(this.validValue, true).getTime(),
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
		return this.getFormat().parse(this.value);
	}

	/**
	 * Currently selected last date represented as JavaScript Date instance.
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get lastDateValue() {
		return this.getFormat().parse(this.value);
	}

	_handleInputChange() {
		const nextValue = this._getInput().getInputValue(),
			emptyValue = nextValue === "",
			isValid = emptyValue || this.isValid(nextValue),
			isInValidRange = this.isInValidRange(nextValue);

		if (isValid && isInValidRange) {
			this.setValue(nextValue);
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}


		this.value = nextValue;
		this.fireEvent("change", { value: nextValue, valid: isValid });
		// Angular two way data binding
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
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
			jsDate = new Date(firstTimestamp),
			tempCalendarDate = new CalendarDate(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());

		while (tempCalendarDate.valueOf() < lastTimestamp) {
			datesTimestamps.push(tempCalendarDate.valueOf() / 1000);
			tempCalendarDate.setDate(tempCalendarDate.getDate() + 1);
		}

		datesTimestamps.push(tempCalendarDate.valueOf() / 1000);

		return datesTimestamps;
	}

	_handleCalendarChange(event) {
		const newValue = event.detail.dates && event.detail.dates[0];
		const calendarSelectedDates = this._calendar.selectedDates;

		if (calendarSelectedDates[0] === newValue || calendarSelectedDates[calendarSelectedDates.length - 1] === newValue) {
			this.closePicker();
			return false;
		}

		if (this.isFirstDatePick) {
			this.isFirstDatePick = false;
			this._firstDateTimestamp = newValue;
			this._lastDateTimestamp = newValue;
			this._calendar.timestamp = newValue;
		} else {
			this.closePicker();
			this.isFirstDatePick = true;
			if (newValue < this._firstDateTimestamp) {
				this._lastDateTimestamp = this._firstDateTimestamp;
				this._firstDateTimestamp = newValue;
			} else {
				this._lastDateTimestamp = newValue;
			}
		}

		const fireChange = this._handleCalendarSelectedDatesChange();

		if (fireChange) {
			this.fireEvent("change", { value: this.value, valid: true });
			// Angular two way data binding
			this.fireEvent("value-changed", { value: this.value, valid: true });
		}
	}

	_handleCalendarSelectedDatesChange() {
		this._updateValueCalendarSelectedDatesChange();
		this._cleanHoveredAttributeFromVisibleItems();

		this._calendar.timestamp = this._firstDateTimestamp;
		this._calendar.selectedDates = this.dateIntervalArrayBuilder(this._firstDateTimestamp, this._lastDateTimestamp);
		this._focusInputAfterClose = true;

		if (this.isInValidRange(this.value)) {
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}

		return true;
	}

	_cleanHoveredAttributeFromVisibleItems(dayPicker) {
		if (!dayPicker) {
			return;
		}

		const dayItems = dayPicker.shadowRoot.querySelectorAll(".ui5-dp-item");

		for (let i = 0; i < dayItems.length; i++) {
			dayItems[i].removeAttribute("hovered");
		}
	}

	_updateValueCalendarSelectedDatesChange() {
		// Collect both dates and merge them into one
		this.value = this._formatValue(this._firstDateTimestamp, this._lastDateTimestamp);
	}

	_formatValue(firstDateValue, lastDateValue) {
		let value = "";
		const delimiter = this.delimiter,
			format = this.getFormat(),
			firstDateString = format.format(new Date(CalendarDate.fromTimestamp(
				firstDateValue * 1000,
				this._primaryCalendarType
			).valueOf()), true),
			lastDateString = format.format(new Date(CalendarDate.fromTimestamp(
				lastDateValue * 1000,
				this._primaryCalendarType
			).valueOf()), true);

		if (firstDateValue) {
			if (delimiter && delimiter !== "" && lastDateString && lastDateString !== firstDateString) {
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
