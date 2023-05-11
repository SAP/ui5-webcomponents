import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMaxCalendarDate, getMinCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";

/**
 * @class
 *
 * Abstract class that provides common functionality for date-related components (day picker, month picker, year picker, calendar, date picker, date range picker, date time picker)
 * This includes:
 *  - "languageAware: true" metadata setting, CLDR fetch and i18n initialization
 *  - common properties (primaryCalendar, minDate, maxDate and formatPattern) declaration and methods that operate on them
 *  - additional common methods
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DateComponentBase
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
@customElement({
	languageAware: true,
	renderer: litRender,
})
class DateComponentBase extends UI5Element {
	/**
	 * Sets a calendar type used for display.
	 * If not set, the calendar type of the global configuration is used.
	 * @type {sap.ui.webc.base.types.CalendarType}
	 * @name sap.ui.webc.main.DateComponentBase.prototype.primaryCalendarType
	 * @public
	 */
	@property({ type: CalendarType })
	primaryCalendarType?: CalendarType;

	/**
	 * Defines the secondary calendar type.
	 * If not set, the calendar will only show the primary calendar type.
	 * @type {sap.ui.webc.base.types.CalendarType}
	 * @name sap.ui.webc.main.DateComponentBase.prototype.secondaryCalendarType
	 * @since 1.0.0-rc.16
	 * @defaultvalue undefined
	 * @public
	 */
	@property({ type: CalendarType })
	secondaryCalendarType?: CalendarType;

	/**
	 * Determines the format, displayed in the input field.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DateComponentBase.prototype.formatPattern
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * Determines the minimum date available for selection.
	 *
	 * <b>Note:</b> If the formatPattern property is not set, the minDate value must be provided in the ISO date format (YYYY-MM-dd).
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DateComponentBase.prototype.minDate
	 * @defaultvalue ""
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	minDate!: string;

	/**
	 * Determines the maximum date available for selection.
	 *
	 * <b>Note:</b> If the formatPattern property is not set, the maxDate value must be provided in the ISO date format (YYYY-MM-dd).
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DateComponentBase.prototype.maxDate
	 * @defaultvalue ""
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@property()
	maxDate!: string;

	static i18nBundle?: I18nBundle;

	/**
	 * Cached instance of DateFormat with a format pattern of "YYYY-MM-dd".
	 * Used by the getISOFormat method to avoid creating a new DateFormat instance on each call.
	 *
	 * @type {DateFormat}
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

	_getMinMaxCalendarDateFromString(date: string) {
		// <b>Note:</b> Format#parse accepts only boolean type for 2nd and 3rd params,
		// but has logic related to "undefined" value, so we're calling it with "undefined" and casting to "boolean".
		const utc = undefined as unknown as boolean;
		const strict = undefined as unknown as boolean;

		if (this.getFormat().parse(date, utc, strict)) {
			return this._getCalendarDateFromString(date);
		}

		const jsDate = this.getISOFormat().parse(date, utc, strict) as Date;
		if (jsDate) {
			return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
		}
	}

	_getCalendarDateFromString(value: string) {
		// <b>Note:</b> Format#parse accepts only boolean type for 2nd and 3rd params,
		// but has logic related to "undefined" value, so we're calling it with "undefined" and casting to "boolean".
		const utc = undefined as unknown as boolean;
		const strict = undefined as unknown as boolean;
		const jsDate = this.getFormat().parse(value, utc, strict) as Date;
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
		const localDate = new Date(timestamp);
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
				pattern: "YYYY-MM-dd",
				calendarType: this._primaryCalendarType,
			});
		}
		return this._isoFormatInstance;
	}

	static async onDefine() {
		[DateComponentBase.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}
}

export default DateComponentBase;
