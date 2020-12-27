import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMinCalendarDate, getMaxCalendarDate } from "./util/DateTime.js";

/**
 * @public
 */
const metadata = {
	properties: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines the мinimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		/**
		 * Determines the format, displayed in the input field.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

		/**
		 * Defines the selected dates as UTC timestamps.
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
 * Base picker component.
 *
 * @class
 *
 * Abstract class for Calendar, DayPicker, MonthPicker and YearPicker
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.PickerBase
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-monthpicker
 * @public
 */
class PickerBase extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		// The following variables are calculated once per rendering and stored as they are costly due to UniversalDate usage
		this._primaryCalendarType = this._calculatePrimaryCalendarType(); // prerequisite for all calculations
		this._minDate = this._calculateMinDate(); // CalendarDate object: minDate(if provided) or the absolute minimum date
		this._maxDate = this._calculateMaxDate(); // CalendarDate object: maxDate(if provided) or the absolute maximum date
		this._timestamp = this._calculateTimestamp(); // Effective timestamp, factoring in min/max date
		this._localDate = this._calculateLocalDate(); // JS Date object, representing _timestamp
		this._calendarDate = this._calculateCalendarDate(); // CalendarDate object, representing the _timestamp
	}

	_calculatePrimaryCalendarType() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
	}

	_calculateMinDate() {
		return this.minDate ? this._getCalendarDateFromString(this.minDate) : getMinCalendarDate(this._primaryCalendarType);
	}

	_calculateMaxDate() {
		return this.maxDate ? this._getCalendarDateFromString(this.maxDate) : getMaxCalendarDate(this._primaryCalendarType);
	}

	_calculateTimestamp() {
		let timestamp = this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
		if (timestamp < this._minTimestamp || timestamp > this._maxTimestamp) {
			timestamp = this._minTimestamp;
		}
		return timestamp;
	}

	_calculateLocalDate() {
		return new Date(this._timestamp * 1000);
	}

	_calculateCalendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _year() {
		return this._calendarDate.getYear();
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _minTimestamp() {
		return this._minDate.valueOf() / 1000;
	}

	get _maxTimestamp() {
		return this._maxDate.valueOf() / 1000;
	}

	_getCalendarDateFromString(value) {
		const jsDate = this.getFormat().parse(value);
		if (jsDate) {
			return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
		}
	}

	_getTimeStampFromString(value) {
		const calDate = this._getCalendarDateFromString(value);
		if (calDate) {
			return calDate.toUTCJSDate().valueOf();
		}
	}

	getFormat() {
		let dateFormat;
		if (this._isPattern) {
			dateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			dateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return dateFormat;
	}

	getTimestampFromDom(domNode) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
		return parseInt(oMonthDomRef);
	}

	/**
	 * Safely update a timestamp by enforcing limits
	 *
	 * @param timestamp
	 * @protected
	 */
	_safelyUpdateTimestamp(timestamp) {
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

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

export default PickerBase;
