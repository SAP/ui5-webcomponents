import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import DateComponentBase from "./DateComponentBase.js";

/**
 * @class
 *
 * Abstract base class for Calendar, DayPicker, MonthPicker and YearPicker that adds support for:
 *  - common properties (timestamp, selectedDates): declarations and methods that operate on them
 *  - other common code
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarPart
 * @extends sap.ui.webc.main.DateComponentBase
 * @public
 */
class CalendarPart extends DateComponentBase {
	/**
	 * The timestamp of the currently focused date. Set this property to move the component's focus to a certain date.
	 * <b>Node:</b> Timestamp is 10-digit Integer representing the seconds (not milliseconds) since the Unix Epoch.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @protected
	 */
	@property({ validator: Integer })
	timestamp?: number;

	get _minTimestamp() {
		return this._minDate.valueOf() / 1000;
	}

	get _maxTimestamp() {
		return this._maxDate.valueOf() / 1000;
	}

	/**
	 * Returns the effective timestamp to be used by the respective calendar part
	 * @protected
	 */
	get _timestamp() {
		let timestamp = this.timestamp !== undefined ? this.timestamp : getTodayUTCTimestamp(this._primaryCalendarType);
		if (timestamp < this._minTimestamp || timestamp > this._maxTimestamp) {
			timestamp = this._minTimestamp;
		}
		return timestamp;
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	/**
	 * Returns a CalendarDate instance, representing the _timestamp getter - this date is central to all components' rendering logic
	 * @protected
	 */
	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	/**
	 * Change a timestamp and enforce limits
	 *
	 * @param timestamp
	 * @protected
	 */
	_safelySetTimestamp(timestamp: number) {
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
	 * Modify a timestamp by a certain amount of days/months/years and enforce limits
	 * @param amount
	 * @param unit
	 * @protected
	 */
	_safelyModifyTimestampBy(amount: number, unit: string) {
		const newDate = modifyDateBy(this._calendarDate, amount, unit);
		this._safelySetTimestamp(newDate.valueOf() / 1000);
	}

	_getTimestampFromDom(domNode: HTMLElement) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp")!;
		return parseInt(oMonthDomRef);
	}
}

export default CalendarPart;
