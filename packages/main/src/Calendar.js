import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import { fetchCldrData } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/CLDR";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData";
import CalendarDate from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarDate";
import CalendarType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarType";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import CalendarTemplateContext from "./CalendarTemplateContext";
import CalendarHeader from "./CalendarHeader";
import DayPicker from "./DayPicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import CalendarRenderer from "./build/compiled/CalendarRenderer.lit";

// Styles
import belize from "./themes/sap_belize/Calendar.less";
import belizeHcb from "./themes/sap_belize_hcb/Calendar.less";
import fiori3 from "./themes/sap_fiori_3/Calendar.less";

ShadowDOM.registerStyle("sap_belize", "Calendar.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Calendar.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Calendar.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-calendar",
	styleUrl: [
		"Calendar.css",
	],
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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-calendar
 * @public
 */
class Calendar extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CalendarRenderer;
	}

	constructor(state) {
		super(state);
		this._oLocale = configuration.getFormatSettings().getFormatLocale();
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
		return this.primaryCalendarType || configuration.getCalendarType();
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

		if (nextMonth.getYear() > 9999) {
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


		if (oNewDate.getYear() < 1) {
			return;
		}
		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextYear() {
		if (this._calendarDate.getYear() === 9999) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() + 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showPrevYear() {
		if (this._calendarDate.getYear() === 1) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() - 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextPageYears() {
		if (this._yearPicker.timestamp) {
			const oCalDate = CalendarDate.fromTimestamp((this._yearPicker.timestamp + (31536000 * 20)) * 1000, this._primaryCalendarType);
			oCalDate.setMonth(0);
			oCalDate.setDate(1);
			oCalDate.setYear(oCalDate.getYear() - 8);
			if (oCalDate.getYear() > 9998) {
				return;
			}
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			// add 20 years to the timestamp of the monthpicker
			timestamp: this._yearPicker.timestamp + (31536000 * 20),
		});

		this._isShiftingYears = true;
	}

	_showPrevPageYears() {
		if (this._yearPicker.timestamp) {
			const oCalDate = CalendarDate.fromTimestamp(this._yearPicker.timestamp * 1000, this._primaryCalendarType);
			oCalDate.setMonth(0);
			oCalDate.setDate(1);
			oCalDate.setYear(oCalDate.getYear() - 8);
			if (oCalDate.getYear() < 1) {
				return;
			}
		}

		this._yearPicker = Object.assign({}, this._yearPicker, {
			// subtracts 20 years from the timestamp of the monthpicker
			timestamp: this._yearPicker.timestamp - (31536000 * 20),
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

	static get calculateTemplateContext() {
		return CalendarTemplateContext.calculate;
	}

	static async define(...params) {
		await Promise.all([
			fetchCldrData(configuration.getLocale().getLanguage(), configuration.getLocale().getRegion(), configuration.getLocale().getScript()),
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
