import "@ui5/webcomponents-base/src/shims/jquery-shim.js";
import "@ui5/webcomponents-base/src/shims/Core-shim.js";
import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import { fetchCldrData } from "@ui5/webcomponents-base/src/CLDR.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { getLocale } from "@ui5/webcomponents-base/src/LocaleProvider.js";
import { getCalendarType } from "@ui5/webcomponents-base/src/Configuration.js";
import { getFormatLocale } from "@ui5/webcomponents-base/src/FormatSettings.js";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat.js";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData.js";
import CalendarDate from "@ui5/webcomponents-base/src/dates/CalendarDate.js";
import CalendarType from "@ui5/webcomponents-base/src/dates/CalendarType.js";
import Integer from "@ui5/webcomponents-base/src/types/Integer.js";
import CalendarTemplateContext from "./CalendarTemplateContext.js";
import CalendarHeader from "./CalendarHeader.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import CalendarRenderer from "./build/compiled/CalendarRenderer.lit.js";

// default calendar for bundling
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Gregorian.js";

// Styles
import calendarCSS from "./themes/Calendar.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-calendar",
	properties: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * It's a UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		*/
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * Available options are: "Gregorian", "Islamic", "Japanese", "Buddhist" and "Persian".
		 * @type {string}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Sets the selected dates as UTC timestamps.
		 * @type {Array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
			deepEqual: true,
		},

		_header: {
			type: Object,
		},
		_oMonth: {
			type: Object,
		},
		_monthPicker: {
			type: Object,
		},
		_yearPicker: {
			type: Object,
		},

		_calendarWidth: {
			type: String,
		},

		_calendarHeight: {
			type: String,
		},
		formatPattern: {
			type: String,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Fired when the selected dates changed.
		 * @event
		 * @param {Array} dates The selected dates' timestamps
		 * @public
		 */
		selectedDatesChange: { type: Array },
	},
};

/**
 * @class
 *
 * It can be used for a date picker.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Calendar
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-calendar
 * @public
 */
class Calendar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CalendarRenderer;
	}

	static get styles() {
		return calendarCSS;
	}

	constructor() {
		super();
		this._oLocale = getFormatLocale();
		this._oLocaleData = new LocaleData(this._oLocale);
		this._header = {};
		this._header.onPressPrevious = this._handlePrevious.bind(this);
		this._header.onPressNext = this._handleNext.bind(this);
		this._header.onBtn1Press = this._handleMonthButtonPress.bind(this);
		this._header.onBtn2Press = this._handleYearButtonPress.bind(this);

		this._oMonth = {};
		this._oMonth.onSelectedDatesChange = this._handleSelectedDatesChange.bind(this);
		this._oMonth.onNavigate = this._handleMonthNavigate.bind(this);

		this._monthPicker = {};
		this._monthPicker._hidden = true;
		this._monthPicker.onSelectedMonthChange = this._handleSelectedMonthChange.bind(this);

		this._yearPicker = {};
		this._yearPicker._hidden = true;
		this._yearPicker.onSelectedYearChange = this._handleSelectedYearChange.bind(this);

		this._isShiftingYears = false;
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType });

		this._oMonth.formatPattern = this._formatPattern;
		this._oMonth.timestamp = this._timestamp;
		this._oMonth.selectedDates = [...this._selectedDates];
		this._oMonth.primaryCalendarType = this._primaryCalendarType;

		this._header.monthText = this._oLocaleData.getMonths("wide", this._primaryCalendarType)[this._month];
		this._header.yearText = oYearFormat.format(this._localDate);

		// month picker
		this._monthPicker.primaryCalendarType = this._primaryCalendarType;
		this._monthPicker.timestamp = this._timestamp;

		this._yearPicker.primaryCalendarType = this._primaryCalendarType;

		if (!this._isShiftingYears) {
			// year picker
			this._yearPicker.timestamp = this._timestamp;
		}

		this._isShiftingYears = false;
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _selectedDates() {
		return this.selectedDates || [];
	}

	_handleSelectedDatesChange(event) {
		this.selectedDates = [...event.detail.dates];

		this.fireEvent("selectedDatesChange", { dates: event.detail.dates });
	}

	_handleMonthNavigate(event) {
		this.timestamp = event.detail.timestamp;
	}

	_handleSelectedMonthChange(event) {
		const oNewDate = this._calendarDate;
		const newMonthIndex = CalendarDate.fromTimestamp(
			event.detail.timestamp * 1000,
			this._primaryCalendarType
		).getMonth();

		oNewDate.setMonth(newMonthIndex);
		this.timestamp = oNewDate.valueOf() / 1000;

		this._hideMonthPicker();

		this._focusFirstDayOfMonth(oNewDate);
	}

	_focusFirstDayOfMonth(targetDate) {
		let fistDayOfMonthIndex = -1;

		// focus first day of the month
		const dayPicker = this.shadowRoot.querySelector("ui5-daypicker");

		dayPicker._getVisibleDays(targetDate).forEach((date, index) => {
			if (date.getDate() === 1 && (fistDayOfMonthIndex === -1)) {
				fistDayOfMonthIndex = index;
			}
		});

		const firstDay = dayPicker.shadowRoot.querySelector(".sapWCDayPickerItemsContainer").children[0].children[fistDayOfMonthIndex];

		dayPicker._itemNav.current = fistDayOfMonthIndex;

		setTimeout(() => {
			if (firstDay) {
				firstDay.focus();
			}
		}, 100);
	}

	_handleSelectedYearChange(event) {
		const oOldMonth = this._calendarDate.getMonth();
		const oOldDay = this._calendarDate.getDate();
		const oNewDate = CalendarDate.fromTimestamp(
			event.detail.timestamp * 1000,
			this._primaryCalendarType
		);
		oNewDate.setMonth(oOldMonth);
		oNewDate.setDate(oOldDay);

		this.timestamp = oNewDate.valueOf() / 1000;

		this._hideYearPicker();

		this._focusFirstDayOfMonth(oNewDate);
	}

	_handleMonthButtonPress() {
		this._hideYearPicker();

		this[`_${this._monthPicker._hidden ? "show" : "hide"}MonthPicker`]();
	}

	_handleYearButtonPress() {
		this._hideMonthPicker();

		this[`_${this._yearPicker._hidden ? "show" : "hide"}YearPicker`]();
	}

	_handlePrevious() {
		if (this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showPrevMonth();
		} else if (this._monthPicker._hidden && !this._yearPicker._hidden) {
			this._showPrevPageYears();
		} else if (!this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showPrevYear();
		}
	}

	_handleNext() {
		if (this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showNextMonth();
		} else if (this._monthPicker._hidden && !this._yearPicker._hidden) {
			this._showNextPageYears();
		} else if (!this._monthPicker._hidden && this._yearPicker._hidden) {
			this._showNextYear();
		}
	}

	_showNextMonth() {
		const nextMonth = this._calendarDate;
		nextMonth.setDate(1);
		nextMonth.setMonth(nextMonth.getMonth() + 1);

		if (nextMonth.getYear() > YearPicker._MAX_YEAR) {
			return;
		}

		this._focusFirstDayOfMonth(nextMonth);
		this.timestamp = nextMonth.valueOf() / 1000;
	}

	_showPrevMonth() {
		let iNewMonth = this._month - 1,
			iNewYear = this._calendarDate.getYear();

		// focus first day of the month
		const dayPicker = this.shadowRoot.querySelector("ui5-daypicker");
		const currentMonthDate = dayPicker._calendarDate.setMonth(dayPicker._calendarDate.getMonth());
		const lastMonthDate = dayPicker._calendarDate.setMonth(dayPicker._calendarDate.getMonth() - 1);

		// set the date to last day of last month
		currentMonthDate.setDate(-1);

		// find the index of the last day
		let lastDayOfMonthIndex = -1;

		dayPicker._getVisibleDays(lastMonthDate).forEach((date, index) => {
			const isSameDate = currentMonthDate.getDate() === date.getDate();
			const isSameMonth = currentMonthDate.getMonth() === date.getMonth();

			if (isSameDate && isSameMonth) {
				lastDayOfMonthIndex = (index + 1);
			}
		});

		const weekDaysCount = 7;

		if (lastDayOfMonthIndex !== -1) {
			// find the DOM for the last day index
			const lastDay = dayPicker.shadowRoot.querySelector(".sapWCDayPickerItemsContainer").children[parseInt(lastDayOfMonthIndex / weekDaysCount)].children[(lastDayOfMonthIndex % weekDaysCount)];

			// update current item in ItemNavigation
			dayPicker._itemNav.current = lastDayOfMonthIndex;

			// focus the item
			lastDay.focus();
		}

		if (iNewMonth > 11) {
			iNewMonth = 0;
			iNewYear = this._calendarDate.getYear() + 1;
		}

		if (iNewMonth < 0) {
			iNewMonth = 11;
			iNewYear = this._calendarDate.getYear() - 1;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(iNewYear);
		oNewDate.setMonth(iNewMonth);


		if (oNewDate.getYear() < YearPicker._MIN_YEAR) {
			return;
		}
		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextYear() {
		if (this._calendarDate.getYear() === YearPicker._MAX_YEAR) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() + 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showPrevYear() {
		if (this._calendarDate.getYear() === YearPicker._MIN_YEAR) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() - 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			YearPicker._ITEMS_COUNT - YearPicker._MIDDLE_ITEM_INDEX,
			YearPicker._MIN_YEAR,
			YearPicker._MAX_YEAR)) {
			return;
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: this._yearPicker.timestamp + (31536000 * YearPicker._ITEMS_COUNT),
		});

		this._isShiftingYears = true;
	}

	_showPrevPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			-YearPicker._MIDDLE_ITEM_INDEX - 1,
			YearPicker._MIN_YEAR,
			YearPicker._MAX_YEAR)) {
			return;
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: this._yearPicker.timestamp - (31536000 * YearPicker._ITEMS_COUNT),
		});

		this._isShiftingYears = true;
	}

	_showMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._monthPicker.timestamp = this._timestamp;
		this._monthPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".sapUiCal").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();
	}

	_showYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._yearPicker.timestamp = this._timestamp;
		this._yearPicker._selectedYear = this._calendarDate.getYear();
		this._yearPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".sapUiCal").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();
	}

	_hideMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._monthPicker._hidden = true;
		this._oMonth._hidden = false;
	}

	_hideYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._yearPicker._hidden = true;
		this._oMonth._hidden = false;
	}

	_isYearInRange(timestamp, yearsoffset, min, max) {
		if (timestamp) {
			const oCalDate = CalendarDate.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
			oCalDate.setMonth(0);
			oCalDate.setDate(1);
			oCalDate.setYear(oCalDate.getYear() + yearsoffset);
			return oCalDate.getYear() >= min && oCalDate.getYear() <= max;
		}
	}

	static get calculateTemplateContext() {
		return CalendarTemplateContext.calculate;
	}

	static async define(...params) {
		await Promise.all([
			fetchCldrData(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			CalendarHeader.define(),
			DayPicker.define(),
			MonthPicker.define(),
			YearPicker.define(),
		]);

		super.define(...params);
	}
}
Bootstrap.boot().then(_ => {
	Calendar.define();
});

export default Calendar;
