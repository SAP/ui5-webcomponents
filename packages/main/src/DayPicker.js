import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import {
	isSpace,
	isEnter,
	isUp,
	isDown,
	isLeft,
	isRight,
	isHomeCtrl,
	isEndCtrl,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageUpShiftCtrl,
	isPageDownShift,
	isPageDownShiftCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import calculateWeekNumber from "@ui5/webcomponents-localization/dist/dates/calculateWeekNumber.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
import PickerBase from "./PickerBase.js";
import DayPickerTemplate from "./generated/templates/DayPickerTemplate.lit.js";

import {
	DAY_PICKER_WEEK_NUMBER_TEXT,
	DAY_PICKER_NON_WORKING_DAY,
} from "./generated/i18n/i18n-defaults.js";

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
		 * Defines the type of selection used in the calendar component.
		 * The property takes as value an object of type <code>CalendarSelection</code>.
		 * Accepted property values are:<br>
		 * <ul>
		 * <li><code>CalendarSelection.Single</code> - enables a single date selection.(default value)</li>
		 * <li><code>CalendarSelection.Range</code> - enables selection of a date range.</li>
		 * <li><code>CalendarSelection.Multiple</code> - enables selection of multiple dates.</li>
		 * </ul>
		 * @type {CalendarSelection}
		 * @defaultvalue "Single"
		 * @public
		 */
		selection: {
			type: CalendarSelection,
			defaultValue: CalendarSelection.Single,
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
		 * @type {Object}
		 * @private
		 */
		_weeks: {
			type: Object,
			multiple: true,
		},

		_dayNames: {
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

/**
 * @class
 *
 * Represents one month view inside a calendar.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DayPicker
 * @extends sap.ui.webcomponents.main.PickerBase
 * @tagname ui5-daypicker
 * @public
 */
class DayPicker extends PickerBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return DayPickerTemplate;
	}

	static get styles() {
		return dayPickerCSS;
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		this._buildWeeks(localeData);
		this._buildDayNames(localeData);
	}

	/**
	 * Builds the _weeks object that represents the month
	 * @param localeData
	 * @private
	 */
	_buildWeeks(localeData) {
		let oCalDate,
			day,
			timestamp,
			lastWeekNumber = -1;

		const _aVisibleDays = this._getVisibleDays();
		this._weeks = [];
		let week = [];
		this._weekNumbers = [];
		let weekday;
		const monthsNames = localeData.getMonths("wide", this._primaryCalendarType);

		/* eslint-disable no-loop-func */
		for (let i = 0; i < _aVisibleDays.length; i++) {
			oCalDate = _aVisibleDays[i];
			timestamp = oCalDate.valueOf() / 1000; // no need to round because CalendarDate does it

			// day of the week
			weekday = oCalDate.getDay() - this._getFirstDayOfWeek();
			if (weekday < 0) {
				weekday += 7;
			}

			const isSelected = this._isDaySelected(timestamp);
			const isSelectedBetween = this._isDayInsideSelectionRange(timestamp);
			const isOtherMonth = oCalDate.getMonth() !== this._month;
			const isWeekend = this._isWeekend(oCalDate);
			const isDisabled = this._isOutOfSelectableRange(oCalDate);
			const isToday = oCalDate.isSame(CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType));
			const isFirstDayOfWeek = oCalDate.getDay() === this._getFirstDayOfWeek();

			const nonWorkingAriaLabel = isWeekend ? `${this._dayPickerNonWorkingDay} ` : "";
			const todayAriaLabel = isToday ? `today ` : "";

			day = {
				timestamp: timestamp.toString(),
				_tabIndex: oCalDate.getDate() === this._calendarDate.getDate() ? "0" : "-1",
				selected: isSelected,
				iDay: oCalDate.getDate(),
				_index: i.toString(),
				classes: `ui5-dp-item ui5-dp-wday${weekday}`,
				ariaLabel: `${todayAriaLabel}${nonWorkingAriaLabel}${monthsNames[oCalDate.getMonth()]} ${oCalDate.getDate()}, ${oCalDate.getYear()}`,
				ariaSelected: isSelected ? "true" : "false",
				ariaDisabled: isOtherMonth ? "true" : undefined,
				disabled: isDisabled,
			};

			if (isFirstDayOfWeek) {
				day.classes += " ui5-dp-firstday";
			}

			if (isSelected) {
				day.classes += " ui5-dp-item--selected";
			}

			if (isSelectedBetween) {
				day.classes += " ui5-dp-item--selected-between";
			}

			if (isToday) {
				day.classes += " ui5-dp-item--now";
			}

			if (isOtherMonth) {
				day.classes += " ui5-dp-item--othermonth";
			}

			if (isWeekend) {
				day.classes += " ui5-dp-item--weeekend";
			}
			if (isDisabled) {
				day.classes += " ui5-dp-item--disabled";
			}

			week.push(day);

			if (weekday === 6 || i === _aVisibleDays.length - 1) {
				const weekNumber = calculateWeekNumber(getFirstDayOfWeek(), oCalDate.toUTCJSDate(), oCalDate.getYear(), getLocale(), localeData);
				if (lastWeekNumber !== weekNumber) {
					const weekNum = {
						weekNum: weekNumber,
						isHidden: this.shouldHideWeekNumbers,
					};
					week.unshift(weekNum);
					lastWeekNumber = weekNumber;
				}

				this._weeks.push(week);
				week = [];
			}
		}
		while (this._weeks.length < 6) {
			this._weeks.push([]);
		}
		/* eslint-enable no-loop-func */
	}

	/**
	 * Builds the dayNames object (header of the month)
	 * @param localeData
	 * @private
	 */
	_buildDayNames(localeData) {
		let weekday;

		const aDayNamesWide = localeData.getDays("wide", this._primaryCalendarType);
		const aDayNamesAbbreviated = localeData.getDays("abbreviated", this._primaryCalendarType);
		let dayName;

		this._dayNames = [];
		this._dayNames.push({
			classes: "ui5-dp-dayname",
			name: this._dayPickerWeekNumberText,
		});
		for (let i = 0; i < 7; i++) {
			weekday = i + this._getFirstDayOfWeek();
			if (weekday > 6) {
				weekday -= 7;
			}
			dayName = {
				name: aDayNamesWide[weekday],
				ultraShortName: aDayNamesAbbreviated[weekday],
				classes: "ui5-dp-dayname",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[1].classes += " ui5-dp-firstday";
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.shadowRoot.querySelector(`[tabindex="0"]`).focus();
		}
	}

	_isDaySelected(timestamp) {
		if (this.selection === CalendarSelection.Single) {
			return timestamp === this.selectedDates[0];
		}

		// Multiple, Range
		return this.selectedDates.includes(timestamp);
	}

	_isDayInsideSelectionRange(timestamp) {
		if (this.selection !== CalendarSelection.Range || !this.selectedDates.length) {
			return false;
		}
		const min = Math.min(...this.selectedDates);
		const max = Math.max(...this.selectedDates);

		return timestamp > min && timestamp < max;
	}

	_getVisualizedSelectedDates() {
		switch (this.selection) {
		case CalendarSelection.Single:
			return [this.selectedDates[0]];
		case CalendarSelection.Multiple:
			return [...this.selectedDates];
		case CalendarSelection.Range:
			return this.selectedDates.slice(0, 2);
		default:
			return [];
		}
	}

	_selectDate(event) {
		const target = event.target;

		if (!this._isDayPressed(target)) {
			return;
		}

		const timestamp = this.getTimestampFromDom(target);

		this.timestamp = timestamp;
		if (this.selection === CalendarSelection.Single) {
			this.selectedDates = [timestamp];
		} else if (this.selection === CalendarSelection.Multiple) {
			this.selectedDates = this.selectedDates.includes(timestamp) ? this.selectedDates.filter(value => value !== timestamp) : [...this.selectedDates, timestamp];
		} else {
			this.selectedDates = (this.selectedDates.length === 1) ? [...this.selectedDates, timestamp]	: [timestamp];
		}

		this.fireEvent("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});

	}

	_onitemmouseover(event) {
		const hoveredItem = event.target.classList.contains("ui5-dp-item") ? event.target : event.target.parentElement;
		if (this.selectedDates.length === 1 && this.selection === CalendarSelection.Range && hoveredItem.classList.contains("ui5-dp-item")) {
			const dayItems = this.getDomRef().querySelectorAll(".ui5-dp-item");
			const firstTimestamp = this.selectedDates[0];
			const lastTimestamp = parseInt(hoveredItem.dataset.sapTimestamp);

			this._updateSelectionBetween(dayItems, firstTimestamp, lastTimestamp);
		}
	}

	_updateSelectionBetween(dayItems, firstTimestamp, lastTimestamp) {
		dayItems.forEach(day => {
			const dayTimestamp = parseInt(day.dataset.sapTimestamp);

			if ((dayTimestamp > firstTimestamp && dayTimestamp < lastTimestamp) || (dayTimestamp > lastTimestamp && dayTimestamp < firstTimestamp)) {
				day.classList.add("ui5-dp-item--selected-between");
			} else {
				day.classList.remove("ui5-dp-item--selected-between");
			}
		});
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			this._selectDate(event);
			return;
		}

		if (isSpace(event)) {
			event.preventDefault();
			return;
		}

		if (isHomeCtrl(event)) {
			this._navToStartEndDayOfTheMonth(event, true);
		}

		if (isEndCtrl(event)) {
			this._navToStartEndDayOfTheMonth(event, false);
		}

		if (isPageUpShift(event)) {
			this._changeYears(event, false, 1);
		}

		if (isPageUpShiftCtrl(event)) {
			this._changeYears(event, false, 10);
		}

		if (isPageDownShift(event)) {
			this._changeYears(event, true, 1);
		}

		if (isPageDownShiftCtrl(event)) {
			this._changeYears(event, true, 10);
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._selectDate(event);
		}
	}

	_navToStartEndDayOfTheMonth(event, start) {
		event.preventDefault();

		const currentItem = this._itemNav._getCurrentItem();
		let currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp")) * 1000;
		let calDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);

		if (currentItem.classList.contains("ui5-dp-item--othermonth")) {
			return;
		}

		calDate.setDate(1);
		if (!start) {
			// set the day to be the last day of the current month
			calDate.setMonth(calDate.getMonth() + 1, 0);
		}

		if (calDate.valueOf() < this._minDate) {
			calDate = CalendarDate.fromLocalJSDate(new Date(this._minDate), this._primaryCalendarType);
		} else if (calDate.valueOf() > this._maxDate) {
			calDate = CalendarDate.fromLocalJSDate(new Date(this._maxDate), this._primaryCalendarType);
		}

		currentTimestamp = calDate.valueOf() / 1000;
		const newItemIndex = this.focusableDays.findIndex(item => parseInt(item.timestamp) === currentTimestamp);

		this._itemNav.currentIndex = newItemIndex;
		this._itemNav.focusCurrent();
	}

	/**
	 * Converts "timestamp" property value into a Java Script Date object and
	 * adds or extracts a given number of years from it
	 *
	 * @param {object} event used to prevent the default browser behavior
	 * @param {boolean} forward if true indicates addition
	 * @param {int} step for year number to substract or add
	 */
	_changeYears(event, forward, step) {
		const currentItem = this._itemNav._getCurrentItem();
		let currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp") * 1000);
		const currentDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
		let newDate = new CalendarDate(currentDate, this._primaryCalendarType);

		if (forward) {
			newDate.setYear(newDate.getYear() + step);
		} else {
			newDate.setYear(newDate.getYear() - step);
		}

		if (currentDate.getMonth() !== newDate.getMonth()) {
			newDate.setDate(0);
		}

		if (newDate.valueOf() < this._minDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._minDate), this._primaryCalendarType);
		} else if (newDate.valueOf() > this._maxDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._maxDate), this._primaryCalendarType);
		}

		currentTimestamp = (newDate.valueOf() / 1000);

		this._navigateAndWaitRerender(currentTimestamp);

		event.preventDefault();
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
	}

	get _currentCalendarDate() {
		return CalendarDate.fromTimestamp(new Date().getTime(), this._primaryCalendarType);
	}

	get focusableDays() {
		const focusableDays = [];

		for (let i = 0; i < this._weeks.length; i++) {
			const week = this._weeks[i].slice(1).filter(dayItem => !dayItem.disabled);
			focusableDays.push(week);
		}

		return [].concat(...focusableDays);
	}

	get _dayPickerWeekNumberText() {
		return this.i18nBundle.getText(DAY_PICKER_WEEK_NUMBER_TEXT);
	}

	get _dayPickerNonWorkingDay() {
		return this.i18nBundle.getText(DAY_PICKER_NON_WORKING_DAY);
	}

	_setCurrentItemTabIndex(index) {
		const currentItem = this._itemNav._getCurrentItem();
		if (currentItem) {
			currentItem.setAttribute("tabindex", index.toString());
		}
	}

	_hasNextMonth() {
		let newMonth = this._month + 1;
		let newYear = this._year;
		const maxCalendarYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();

		if (newMonth > 11) {
			newMonth = 0;
			newYear++;
		}

		if (newYear > maxCalendarYear && newMonth === 0) {
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
		const minCalendarYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();

		if (newMonth < 0) {
			newMonth = 11;
			newYear--;
		}

		if (newYear < minCalendarYear && newMonth === 11) {
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
		const currentItem = this._itemNav._getCurrentItem();
		let newDate;
		let currentDate;
		let currentTimestamp;

		if (isUp(event.originalEvent) || isLeft(event.originalEvent)) {
			currentTimestamp = this._weeks[0][event.offset + 1].timestamp * 1000;
			newDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
			newDate.setDate(newDate.getDate() - 7);
		}

		if (isDown(event.originalEvent) || isRight(event.originalEvent)) {
			currentTimestamp = this._weeks[this._weeks.length - 1][event.offset + 1].timestamp * 1000;
			newDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
			newDate.setDate(newDate.getDate() + 7);
		}

		if (isPageUp(event.originalEvent)) {
			currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp") * 1000);
			currentDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
			newDate = new CalendarDate(currentDate, this._primaryCalendarType);
			newDate.setMonth(newDate.getMonth() - 1);
			if (currentDate.getMonth() === newDate.getMonth()) {
				newDate.setDate(0);
			}
		}

		if (isPageDown(event.originalEvent)) {
			currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp") * 1000);
			currentDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
			newDate = new CalendarDate(currentDate, this._primaryCalendarType);
			newDate.setMonth(newDate.getMonth() + 1);
			if (newDate.getMonth() - currentDate.getMonth() > 1) {
				newDate.setDate(0);
			}
		}

		if (!newDate) {
			return;
		}

		if (newDate.valueOf() < this._minDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._minDate), this._primaryCalendarType);
		} else if (newDate.valueOf() > this._maxDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._maxDate), this._primaryCalendarType);
		}

		currentTimestamp = (newDate.valueOf() / 1000);

		this._navigateAndWaitRerender(currentTimestamp);
	}

	_showPreviousPage() {
		const currentItem = this._itemNav._getCurrentItem();
		let newDate;
		// let currentDate;
		let currentTimestamp;

		currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp") * 1000);
		const currentDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
		newDate = new CalendarDate(currentDate, this._primaryCalendarType);
		newDate.setMonth(newDate.getMonth() - 1);
		if (currentDate.getMonth() === newDate.getMonth()) {
			newDate.setDate(0);
		}

		if (!newDate) {
			return;
		}

		if (newDate.valueOf() < this._minDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._minDate), this._primaryCalendarType);
		} else if (newDate.valueOf() > this._maxDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._maxDate), this._primaryCalendarType);
		}

		currentTimestamp = (newDate.valueOf() / 1000);

		this._navigateAndWaitRerender(currentTimestamp);
	}

	_showNextPage() {
		const currentItem = this._itemNav._getCurrentItem();
		let newDate;
		// let currentDate;
		let currentTimestamp;

		currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp") * 1000);
		const currentDate = CalendarDate.fromTimestamp(currentTimestamp, this._primaryCalendarType);
		newDate = new CalendarDate(currentDate, this._primaryCalendarType);
		newDate.setMonth(newDate.getMonth() + 1);
		if (newDate.getMonth() - currentDate.getMonth() > 1) {
			newDate.setDate(0);
		}

		if (!newDate) {
			return;
		}

		if (newDate.valueOf() < this._minDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._minDate), this._primaryCalendarType);
		} else if (newDate.valueOf() > this._maxDate) {
			newDate = CalendarDate.fromLocalJSDate(new Date(this._maxDate), this._primaryCalendarType);
		}

		currentTimestamp = (newDate.valueOf() / 1000);

		this._navigateAndWaitRerender(currentTimestamp);
	}

	_handleItemNavigationAfterFocus() {
		const currentItem = this._itemNav._getCurrentItem();
		const currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp"));
		this.timestamp = currentTimestamp;
		this.fireEvent("navigate", { timestamp: currentTimestamp });

		if (currentItem.classList.contains("ui5-dp-item--othermonth")) {
			this._navigateAndWaitRerender(currentTimestamp);
		}
	}

	async _navigateAndWaitRerender(timestamp) {
		// this.fireEvent("navigate", { timestamp });
		await RenderScheduler.whenFinished();

		const newItemIndex = this.focusableDays.findIndex(item => parseInt(item.timestamp) === timestamp);
		this._itemNav.currentIndex = newItemIndex;
		this._itemNav.focusCurrent();
	}

	_isWeekend(oDate) {
		const localeData = getCachedLocaleDataInstance(getLocale());

		const iWeekDay = oDate.getDay(),
			iWeekendStart = localeData.getWeekendStart(),
			iWeekendEnd = localeData.getWeekendEnd();

		return (iWeekDay >= iWeekendStart && iWeekDay <= iWeekendEnd)
			|| (iWeekendEnd < iWeekendStart && (iWeekDay >= iWeekendStart || iWeekDay <= iWeekendEnd));
	}

	_isDayPressed(target) {
		const targetParent = target.parentNode;
		return (target.className.indexOf("ui5-dp-item") > -1) || (targetParent && targetParent.classList && targetParent.classList.contains("ui5-dp-item"));
	}

	_isOutOfSelectableRange(date) {
		return date.valueOf() < this._minDate || date.valueOf() > this._maxDate;
	}

	_getVisibleDays() {
		let oCalDate,
			iDaysOldMonth,
			iYear;

		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const _aVisibleDays = [];

		const iFirstDayOfWeek = this._getFirstDayOfWeek();

		// determine weekday of first day in month
		const oFirstDay = new CalendarDate(this._calendarDate, this._primaryCalendarType);
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
			if (iYear >= minCalendarDateYear && iYear <= maxCalendarDateYear) {
				// Days before 0001-01-01 or after 9999-12-31 should not be rendered.
				_aVisibleDays.push(oCalDate);
			}
			oDay.setDate(oDay.getDate() + 1);
		}

		return _aVisibleDays;
	}

	_getFirstDayOfWeek() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const confFirstDayOfWeek = getFirstDayOfWeek();
		return Number.isInteger(confFirstDayOfWeek) ? confFirstDayOfWeek : localeData.getFirstDayOfWeek();
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
}

DayPicker.define();

export default DayPicker;
