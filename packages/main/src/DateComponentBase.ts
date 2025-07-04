import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getCalendarType, getSecondaryCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import type CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMaxCalendarDate, getMinCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import type CalendarWeekNumbering from "./types/CalendarWeekNumbering.js";

/**
 * @class
 *
 * Abstract class that provides common functionality for date-related components (day picker, month picker, year picker, calendar, date picker, date range picker, date time picker)
 * This includes:
 *  - "languageAware: true" metadata setting, CLDR fetch and i18n initialization
 *  - common properties (primaryCalendar, minDate, maxDate and formatPattern) declaration and methods that operate on them
 *  - additional common methods
 * @constructor
 * @abstract
 * @extends UI5Element
 * @public
 */
@customElement({
	languageAware: true,
	cldr: true,
	renderer: jsxRenderer,
})
class DateComponentBase extends UI5Element {
	/**
	 * Sets a calendar type used for display.
	 * If not set, the calendar type of the global configuration is used.
	 * @default undefined
	 * @public
	 */
	@property()
	primaryCalendarType?: `${CalendarType}`;

	/**
	 * Defines the secondary calendar type.
	 * If not set, the calendar will only show the primary calendar type.
	 * @since 1.0.0-rc.16
	 * @default undefined
	 * @public
	 */
	@property()
	secondaryCalendarType?: `${CalendarType}`;

	/**
	 * Determines the format, displayed in the input field.
	 * @default undefined
	 * @public
	 */
	@property()
	formatPattern?: string;

	/**
	 * Determines the minimum date available for selection.
	 *
	 * **Note:** If the formatPattern property is not set, the minDate value must be provided in the ISO date format (yyyy-MM-dd).
	 * @default ""
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	minDate = "";

	/**
	 * Determines the maximum date available for selection.
	 *
	 * **Note:** If the formatPattern property is not set, the maxDate value must be provided in the ISO date format (yyyy-MM-dd).
	 * @default ""
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	maxDate = "";

	/**
	 * Defines how to calculate calendar weeks and first day of the week.
	 * If not set, the calendar will be displayed according to the currently set global configuration.
	 * @default "Default"
	 * @since 2.2.0
	 * @public
	 */
	@property()
	calendarWeekNumbering: `${CalendarWeekNumbering}` = "Default";

	@i18n("@ui5/webcomponents")
	static i18nBundle?: I18nBundle;

	/**
	 * Cached instance of DateFormat with a format pattern of "yyyy-MM-dd".
	 * Used by the getISOFormat method to avoid creating a new DateFormat instance on each call.
	 * @private
	 */
	_isoFormatInstance?: DateFormat;

	constructor() {
		super();
	}

	get _primaryCalendarType() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
	}

	get _secondaryCalendarType() {
		return this.secondaryCalendarType || getSecondaryCalendarType();
	}

	get _minDate() {
		let minDate;

		if (this.minDate) {
			minDate = this._getMinMaxCalendarDateFromString(this.minDate);
		}

		return minDate || getMinCalendarDate(this._primaryCalendarType);
	}

	get _maxDate() {
		let maxDate;

		if (this.maxDate) {
			maxDate = this._getMinMaxCalendarDateFromString(this.maxDate)!;
		}

		return maxDate || getMaxCalendarDate(this._primaryCalendarType);
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get hasSecondaryCalendarType() {
		return !!this.secondaryCalendarType && this.secondaryCalendarType !== this.primaryCalendarType;
	}

	_getMinMaxCalendarDateFromString(date: string) {
		if (this.getFormat().parse(date)) {
			return this._getCalendarDateFromString(date);
		}

		const jsDate = this.getISOFormat().parse(date) as Date;
		if (jsDate) {
			return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
		}
	}

	_getCalendarDateFromString(value: string) {
		const jsDate = this.getFormat().parse(value) as Date;
		if (jsDate) {
			return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
		}
	}

	_getTimeStampFromString(value: string) {
		const calDate = this._getCalendarDateFromString(value);
		if (calDate) {
			return calDate.toUTCJSDate().valueOf();
		}
	}

	_getStringFromTimestamp(timestamp: number) {
		const localDate = UI5Date.getInstance(timestamp);
		return this.getFormat().format(localDate, true);
	}

	getFormat() {
		return this._isPattern
			? DateFormat.getDateInstance({
				strictParsing: true,
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			})
			: DateFormat.getDateInstance({
				strictParsing: true,
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
	}

	getISOFormat() {
		if (!this._isoFormatInstance) {
			this._isoFormatInstance = DateFormat.getDateInstance({
				strictParsing: true,
				pattern: "yyyy-MM-dd",
				calendarType: this._primaryCalendarType,
			});
		}
		return this._isoFormatInstance;
	}
}

export default DateComponentBase;
