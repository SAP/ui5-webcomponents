import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import calculateWeekNumber from "@ui5/webcomponents-localization/dist/dates/calculateWeekNumber.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import DayPickerTemplate from "./generated/templates/DayPickerTemplate.lit.js";

// Styles
import dayPickerCSS from "./generated/themes/DayPicker.css.js";

const monthDiff = (startDate, endDate) => {
	let months;
	const _startDate = CalendarDate.fromTimestamp(startDate).toLocalJSDate(),
		_endDate = CalendarDate.fromTimestamp(endDate).toLocalJSDate();

	months = (_endDate.getFullYear() - _startDate.getFullYear()) * 12;
	months -= _startDate.getMonth();
	months += _endDate.getMonth();
	return months;
};

/**
 * @public
 */
const metadata = {
	tag: "ui5-daypicker",
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
		 * @type {CalendarType}
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
		},

		/**
		 * Determines the minimum date available for selection.
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
		 * Defines the visibility of the week numbers column.
		 * <br><br>
		 *
		 * <b>Note:<b> For calendars other than Gregorian,
		 * the week numbers are not displayed regardless of what is set.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideWeekNumbers: {
			type: Boolean,
		},

		/**
		 * Defines the effective weeks numbers visibility,
		 * based on the <code>primaryCalendarType</code> and <code>hideWeekNumbers</code> property.
		 * @type {boolean}
		 * @private
		 */
		_hideWeekNumbers: {
			type: Boolean,
		},

		/**
		 * @type {Object}
		 * @private
		 */
		_weeks: {
			type: Object,
			multiple: true,
		},

		/**
		 * @type {Object}
		 * @private
		 */
		_weekNumbers: {
			type: Object,
			multiple: true,
		},

		/**
		 * @type {boolean}
		 * @private
		 */
		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when month, year has changed due to item navigation.
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

const DEFAULT_MAX_YEAR = 9999;
const DEFAULT_MIN_YEAR = 1;

/**
 * @class
 *
 * Represents one month view inside a calendar.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DayPicker
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-daypicker
 * @public
 */
class DayPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return DayPickerTemplate;
	}

	static get styles() {
		return dayPickerCSS;
	}

	constructor() {
		super();
		this._oLocale = getLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, {
			rowSize: 7,
			pageSize: 42,
			behavior: ItemNavigationBehavior.Paging,
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			return this.focusableDays;
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._itemNav.attachEvent(
			"PageBottom",
			this._handleMonthBottomOverflow.bind(this)
		);

		this._itemNav.attachEvent(
			"PageTop",
			this._handleMonthTopOverflow.bind(this)
		);
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
		if (this.minDate) {
			this._minDateObject = new Date(this._minDate);
		}

		if (this.maxDate) {
			this._maxDateObject = new Date(this._maxDate);
		}
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
				selectedBetween: this._selectedDates.slice(1, this._selectedDates.length - 1).some(d => {
					return d === timestamp;
				}),
				iDay: oCalDate.getDate(),
				_index: i.toString(),
				classes: `ui5-dp-item ui5-dp-wday${weekday}`,
			};

			const weekNumber = calculateWeekNumber(getFirstDayOfWeek(), oCalDate.toUTCJSDate(), oCalDate.getYear(), this._oLocale, this._oLocaleData);

			if (lastWeekNumber !== weekNumber) {
				this._weekNumbers.push(weekNumber);

				lastWeekNumber = weekNumber;
			}

			const isToday = oCalDate.isSame(CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType));

			week.push(day);

			if (oCalDate.getDay() === this._getFirstDayOfWeek()) {
				day.classes += " ui5-dp-firstday";
			}

			if (day.selected) {
				day.classes += " ui5-dp-item--selected";
				isDaySelected = true;
			}

			if (day.selectedBetween) {
				day.classes += " ui5-dp-item--selected-between";
			}

			if (isToday) {
				day.classes += " ui5-dp-item--now";
				todayIndex = i;
			}

			if (oCalDate.getMonth() !== this._month) {
				day.classes += " ui5-dp-item--othermonth";
			}

			day.id = `${this._id}-${timestamp}`;

			if (this._isWeekend(oCalDate)) {
				day.classes += " ui5-dp-item--weeekend";
			}
			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate)) {
				day.classes += " ui5-dp-item--disabled";
				day.disabled = true;
			}

			if (day.classes.indexOf("ui5-dp-wday6") !== -1
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
				classes: "ui5-dp-dayname",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[0].classes += " ui5-dp-firstday";
		this._hideWeekNumbers = this.shouldHideWeekNumbers;
	}

	onAfterRendering() {
		if (this.selectedDates.length === 1) {
			this.fireEvent("daypickerrendered", { focusedItemIndex: this._itemNav.currentIndex });
		}
	}

	_onmousedown(event) {
		const target = event.target;
		const dayPressed = this._isDayPressed(target);

		if (dayPressed) {
			const targetDate = parseInt(target.getAttribute("data-sap-timestamp"));

			// findIndex, give it to item navigation
			for (let i = 0; i < this._weeks.length; i++) {
				for (let j = 0; j < this._weeks[i].length; j++) {
					if (parseInt(this._weeks[i][j].timestamp) === targetDate) {
						let index = parseInt(target.getAttribute("data-sap-index"));
						if (this.minDate || this.maxDate) {
							const focusableItem = this.focusableDays.find(item => parseInt(item._index) === index);
							index = focusableItem ? this.focusableDays.indexOf(focusableItem) : index;
						}

						this._itemNav.current = index;
						this._itemNav.update();
						break;
					}
				}
			}

			this.targetDate = targetDate;
		}
	}

	_onmouseup(event) {
		const dayPressed = this._isDayPressed(event.target);
		if (this.targetDate) {
			this._modifySelectionAndNotifySubscribers(this.targetDate, event.ctrlKey);
			this.targetDate = null;
		}

		if (!dayPressed) {
			this._itemNav.focusCurrent();
		}
	}

	_onitemmouseover(event) {
		if (this.selectedDates.length === 1) {
			this.fireEvent("item-mouseover", event);
		}
	}

	_onitemkeydown(event) {
		if (this.selectedDates.length === 1) {
			this.fireEvent("item-keydown", event);
		}
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate, event.ctrlKey);
		}
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
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

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
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
		return this.primaryCalendarType || getCalendarType() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get focusableDays() {
		const focusableDays = [];

		for (let i = 0; i < this._weeks.length; i++) {
			const week = this._weeks[i].filter(x => !x.disabled);
			focusableDays.push(week);
		}

		return [].concat(...focusableDays);
	}

	_modifySelectionAndNotifySubscribers(sNewDate, bAdd) {
		if (bAdd) {
			this.selectedDates = [...this._selectedDates, sNewDate];
		} else {
			this.selectedDates = [sNewDate];
		}

		this.fireEvent("change", { dates: [...this._selectedDates] });
	}

	_handleMonthBottomOverflow(event) {
		this._itemNav.hasNextPage = this._hasNextMonth();
	}

	_handleMonthTopOverflow(event) {
		this._itemNav.hasPrevPage = this._hasPrevMonth();
	}

	_hasNextMonth() {
		let newMonth = this._month + 1;
		let newYear = this._year;

		if (newMonth > 11) {
			newMonth = 0;
			newYear++;
		}

		if (newYear > DEFAULT_MAX_YEAR && newMonth === 0) {
			return false;
		}

		if (!this.maxDate) {
			return true;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(oNewDate.getDate());
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		const monthsBetween = monthDiff(oNewDate.valueOf(), this._maxDate);
		if (monthsBetween < 0) {
			return false;
		}

		const lastFocusableDay = this.focusableDays[this.focusableDays.length - 1].iDay;
		if (monthsBetween === 0 && CalendarDate.fromTimestamp(this._maxDate).toLocalJSDate().getDate() === lastFocusableDay) {
			return false;
		}

		return true;
	}

	_hasPrevMonth() {
		let newMonth = this._month - 1;
		let newYear = this._year;

		if (newMonth < 0) {
			newMonth = 11;
			newYear--;
		}

		if (newYear < DEFAULT_MIN_YEAR && newMonth === 11) {
			return false;
		}

		if (!this.minDate) {
			return true;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(oNewDate.getDate());
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		const monthsBetween = monthDiff(this._minDate, oNewDate.valueOf());
		if (this.minDate && monthsBetween < 0) {
			return false;
		}

		return true;
	}

	_handleItemNavigationBorderReach(event) {
		const currentMonth = this._month,
			currentYear = this._year;
		let newMonth,
			newYear,
			newDate,
			currentDate;

		if (event.end) {
			currentDate = new Date(this._weeks[this._weeks.length - 1][event.offset].timestamp * 1000);
			newMonth = currentMonth < 11 ? currentMonth + 1 : 0;
			newYear = currentMonth < 11 ? currentYear : currentYear + 1;
			newDate = currentDate.getMonth() === newMonth ? currentDate.getDate() : currentDate.getDate() + 7;
		} else if (event.start) {
			currentDate = new Date(this._weeks[0][event.offset].timestamp * 1000);
			newMonth = currentMonth > 0 ? currentMonth - 1 : 11;
			newYear = currentMonth > 0 ? currentYear : currentYear - 1;
			newDate = currentDate.getMonth() === newMonth ? currentDate.getDate() : currentDate.getDate() - 7;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setDate(newDate);
		oNewDate.setYear(newYear);
		oNewDate.setMonth(newMonth);

		if (oNewDate.getYear() < DEFAULT_MIN_YEAR || oNewDate.getYear() > DEFAULT_MAX_YEAR) {
			return;
		}

		if (this._isOutOfSelectableRange(oNewDate._oUDate.oDate)) {
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

	_isDayPressed(target) {
		const targetParent = target.parentNode;
		return (target.className.indexOf("ui5-dp-item") > -1) || (targetParent && target.parentNode.classList.contains("ui5-dp-item"));
	}

	_isOutOfSelectableRange(date) {
		const currentDate = date._oUDate ? date.toLocalJSDate() : CalendarDate.fromTimestamp(date).toLocalJSDate();

		return currentDate > this._maxDateObject || currentDate < this._minDateObject;
	}

	get _maxDate() {
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
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
			if (bIncludeBCDates && iYear < DEFAULT_MIN_YEAR) {
				// For dates before 0001-01-01 we should render only empty squares to keep
				// the month square matrix correct.
				oCalDate._bBeforeFirstYear = true;
				_aVisibleDays.push(oCalDate);
			} else if (iYear >= DEFAULT_MIN_YEAR && iYear <= DEFAULT_MAX_YEAR) {
				// Days before 0001-01-01 or after 9999-12-31 should not be rendered.
				_aVisibleDays.push(oCalDate);
			}
			oDay.setDate(oDay.getDate() + 1);
		}

		return _aVisibleDays;
	}

	_getFirstDayOfWeek() {
		const confFirstDayOfWeek = getFirstDayOfWeek();
		return Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : this._oLocaleData.getFirstDayOfWeek();
	}

	get styles() {
		return {
			wrapper: {
				display: this._hidden ? "none" : "flex",
			},
			main: {
				width: "100%",
			},
		};
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}
}

DayPicker.define();

export default DayPicker;
