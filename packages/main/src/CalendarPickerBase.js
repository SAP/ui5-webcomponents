import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import PickerBase from "./PickerBase.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * The timestamp of the currently focused date
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * An array of UTC timestamps representing the selected dates.
		 * @type {Array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
			compareValues: true,
		},
	},
};

/**
 * @class
 *
 * Abstract base class for Calendar, DayPicker, MonthPicker and YearPicker that adds support for the following properties: timestamp, selectedDates
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CalendarPickerBase
 * @extends sap.ui.webcomponents.main.PickerBase
 * @public
 */
class CalendarPickerBase extends PickerBase {
	static get metadata() {
		return metadata;
	}

	/**
	 * @override
	 * @protected
	 */
	get _effectiveTimestamp() {
		return this.timestamp;
	}

	/**
	 * Safely update a timestamp by enforcing limits
	 *
	 * @param timestamp
	 * @protected
	 */
	_safelySetTimestamp(timestamp) {
		const min = this._minDate.valueOf() / 1000;
		const max = this._maxDate.valueOf() / 1000;

		if (timestamp < min) {
			timestamp = min;
		}
		if (timestamp > max) {
			timestamp = max;
		}

		this.timestamp = timestamp;
	}

	/**
	 * Safely modify a stamp by a certain amount of days/months/years by enforcing limits
	 * @param amount
	 * @param unit
	 * @protected
	 */
	_safelyModifyTimestampBy(amount, unit) {
		const newDate = modifyDateBy(this._calendarDate, amount, unit, this._primaryCalendarType);
		this._safelySetTimestamp(newDate.valueOf() / 1000);
	}

	_getTimestampFromDom(domNode) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
		return parseInt(oMonthDomRef);
	}
}

export default CalendarPickerBase;
