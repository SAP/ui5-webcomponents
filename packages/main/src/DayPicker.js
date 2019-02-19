import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import ItemNavigation from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ItemNavigation";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData";
import CalendarDate from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarDate";
import CalendarUtils from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarUtils";
import CalendarType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarType";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import DayPickerTemplateContext from "./DayPickerTemplateContext";
import DayPickerRenderer from "./build/compiled/DayPickerRenderer.lit";

// Styles
import belize from "./themes/sap_belize/DayPicker.less";
import belizeHcb from "./themes/sap_belize_hcb/DayPicker.less";
import fiori3 from "./themes/sap_fiori_3/DayPicker.less";

ShadowDOM.registerStyle("sap_belize", "DayPicker.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "DayPicker.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "DayPicker.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-daypicker",
	styleUrl: [
		"DayPicker.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {number}
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

		_weeks: {
			type: Object,
			multiple: true,
		},

		_weekNumbers: {
			type: Object,
			multiple: true,
		},

		_dayNames: {
			type: Object,
			multiple: true,
			nonVisual: true,
		},
		_hidden: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		selectionChange: {},
		/**
		 * Fired when month, year has changed due to item navigation.
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

/**
 * @class
 *
 * Represents one month view inside a calendar.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DayPicker
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-daypicker
 * @public
 */
class DayPicker extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return DayPickerRenderer;
	}

	constructor(state) {
		super(state);
		this._oLocale = configuration.getFormatSettings().getFormatLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, { rowSize: 7 });
		this._itemNav.getItemsCallback = function getItemsCallback() {
			return [].concat(...this._weeks);
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._delegates.push(this._itemNav);
	}

	onBeforeRendering() {
		let oCalDate,
			day,
			timestamp,
			lastWeekNumber = -1,
			isDaySelected = false,
			todayIndex = 0;

		const _aVisibleDays = this._getVisibleDays(this._calendarDate);

		this._weeks = [];
		let week = [];
		this._weekNumbers = [];
		let weekday;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < _aVisibleDays.length; i++) {
			oCalDate = _aVisibleDays[i];
			timestamp = oCalDate.valueOf() / 1000; // no need to round because CalendarDate does it

			// day of the week
			weekday = oCalDate.getDay() - this._getFirstDayOfWeek();
			if (weekday < 0) {
				weekday += 7;
			}
			day = {
				timestamp: timestamp.toString(),
				selected: this._selectedDates.some(d => {
					return d === timestamp;
				}),
				iDay: oCalDate.getDate(),
				_index: i.toString(),
				classes: `sapWCDayPickerItem sapWCDayPickerWDay${weekday}`,
			};

			const weekNumber = CalendarUtils.calculateWeekNumber(oCalDate.toUTCJSDate(), oCalDate.getYear(), this._oLocale, this._oLocaleData);

			if (lastWeekNumber !== weekNumber) {
				this._weekNumbers.push(weekNumber);

				lastWeekNumber = weekNumber;
			}

			const isToday = (oCalDate.getDate() === this._currentCalendarDate.getDate())
				&& (oCalDate.getMonth() === this._currentCalendarDate.getMonth())
				&& (oCalDate.getYear() === this._currentCalendarDate.getYear());

			week.push(day);

			if (oCalDate.getDay() === this._getFirstDayOfWeek()) {
				day.classes += " sapWCDayPickerFirstWDay";
			}

			if (day.selected) {
				day.classes += " sapWCDayPickerItemSel";
				isDaySelected = true;
			}

			if (isToday) {
				day.classes += " sapWCDayPickerItemNow";
				todayIndex = i;
			}

			if (oCalDate.getMonth() !== this._month) {
				day.classes += " sapWCDayPickerItemOtherMonth";
			}

			day.id = `${this._id}-${timestamp}`;

			if (this._isWeekend(oCalDate)) {
				day.classes += " sapWCDayPickerItemWeekEnd";
			}

			if (day.classes.indexOf("sapWCDayPickerWDay6") !== -1
				|| _aVisibleDays.length - 1 === i) {
				this._weeks.push(week);
				week = [];
			}
		}

		while (this._weeks.length < 6) {
			this._weeks.push([]);
		}
		/* eslint-enable no-loop-func */

		if (!isDaySelected && todayIndex && this._itemNav.current === 0) {
			this._itemNav.current = todayIndex;
		}

		this._itemNav.init();

		const aDayNamesWide = this._oLocaleData.getDays("wide", this._primaryCalendarType);
		const aDayNamesAbbreviated = this._oLocaleData.getDays("abbreviated", this._primaryCalendarType);
		const aUltraShortNames = aDayNamesAbbreviated.map(n => n);
		let dayName;

		this._dayNames = [];
		for (let i = 0; i < 7; i++) {
			weekday = i + this._getFirstDayOfWeek();
			if (weekday > 6) {
				weekday -= 7;
			}
			dayName = {
				id: `${this._id}-WH${i.toString()}`,
				name: aDayNamesWide[weekday],
				ultraShortName: aUltraShortNames[weekday],
				classes: "sapWCDayPickerWH",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[0].classes += " sapWCDayPickerFirstWDay";
	}

	onclick(event) {
		if (event.ui5target.className.indexOf("sapWCDayPickerDay") > -1) {
			const targetDate = parseInt(event.ui5target.getAttribute("data-sap-timestamp"));

			// findIndex, give it to item navigation
			for (let i = 0; i < this._weeks.length; i++) {
				for (let j = 0; j < this._weeks[i].length; j++) {
					if (parseInt(this._weeks[i][j].timestamp) === targetDate) {
						this._itemNav.current = parseInt(event.ui5target.getAttribute("data-sap-index"));

						this._itemNav.update();
						break;
					}
				}
			}

			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	onsapenter(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCDayPickerItem") > -1) {
			const targetDate = parseInt(event.ui5target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	onsapspace(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCDayPickerItem") > -1) {
			const targetDate = parseInt(event.ui5target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
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

	get _year() {
		return this._calendarDate.getYear();
	}

	get _currentCalendarDate() {
		return CalendarDate.fromTimestamp(new Date().getTime(), this._primaryCalendarType);
	}

	get _selectedDates() {
		return this.selectedDates || [];
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || configuration.getCalendarType();
	}

	_modifySelectionAndNotifySubscribers(sNewDate, bAdd) {
		if (bAdd) {
			this.selectedDates = [...this._selectedDates, sNewDate];
		} else {
			this.selectedDates = [sNewDate];
		}

		this.fireEvent("selectionChange", { dates: [...this._selectedDates] });
	}

	_handleItemNavigationBorderReach(event) {
		const currentMonth = this._month,
			currentYear = this._year;
		let iNewMonth,
			iNewYear;

		if (event.end) {
			iNewMonth = currentMonth < 11 ? currentMonth + 1 : 0;
			iNewYear = currentMonth < 11 ? currentYear : currentYear + 1;
		} else if (event.start) {
			iNewMonth = currentMonth > 0 ? currentMonth - 1 : 11;
			iNewYear = currentMonth > 0 ? currentYear : currentYear - 1;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(iNewYear);
		oNewDate.setMonth(iNewMonth);

		if (oNewDate.getYear() < 1 || oNewDate.getYear() > 9999) {
			return;
		}

		this.fireEvent("navigate", { timestamp: (oNewDate.valueOf() / 1000) });
	}

	_isWeekend(oDate) {
		const iWeekDay = oDate.getDay(),
			iWeekendStart = this._oLocaleData.getWeekendStart(),
			iWeekendEnd = this._oLocaleData.getWeekendEnd();

		return (iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd)
			|| (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd));
	}

	_getVisibleDays(oStartDate, bIncludeBCDates) {
		let oCalDate,
			iDaysOldMonth,
			iYear;

		const _aVisibleDays = [];

		// If date passed generate days for new start date else return the current one
		if (!oStartDate) {
			return _aVisibleDays;
		}

		const iFirstDayOfWeek = this._getFirstDayOfWeek();

		// determine weekday of first day in month
		const oFirstDay = new CalendarDate(oStartDate, this._primaryCalendarType);
		oFirstDay.setDate(1);
		iDaysOldMonth = oFirstDay.getDay() - iFirstDayOfWeek;
		if (iDaysOldMonth < 0) {
			iDaysOldMonth = 7 + iDaysOldMonth;
		}

		if (iDaysOldMonth > 0) {
			// determine first day for display
			oFirstDay.setDate(1 - iDaysOldMonth);
		}

		const oDay = new CalendarDate(oFirstDay);
		for (let i = 0; i < 42; i++) {
			iYear = oDay.getYear();
			oCalDate = new CalendarDate(oDay, this._primaryCalendarType);
			if (bIncludeBCDates && iYear < 1) {
				// For dates before 0001-01-01 we should render only empty squares to keep
				// the month square matrix correct.
				oCalDate._bBeforeFirstYear = true;
				_aVisibleDays.push(oCalDate);
			} else if (iYear > 0 && iYear < 10000) {
				// Days before 0001-01-01 or after 9999-12-31 should not be rendered.
				_aVisibleDays.push(oCalDate);
			}
			oDay.setDate(oDay.getDate() + 1);
		}

		return _aVisibleDays;
	}

	_getFirstDayOfWeek() {
		return this._oLocaleData.getFirstDayOfWeek();
	}

	static get calculateTemplateContext() {
		return DayPickerTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	DayPicker.define();
});

export default DayPicker;
