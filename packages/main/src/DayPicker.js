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
	isHome,
	isEnd,
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
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
import PickerBase from "./PickerBase.js";
import DayPickerTemplate from "./generated/templates/DayPickerTemplate.lit.js";

import {
	DAY_PICKER_WEEK_NUMBER_TEXT,
	DAY_PICKER_NON_WORKING_DAY,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import dayPickerCSS from "./generated/themes/DayPicker.css.js";

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

		_hoverTimestamp: {
			type: String,
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

const isBetween = (x, num1, num2) => x > Math.min(num1, num2) && x < Math.max(num1, num2);

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

			const isFocused = oCalDate.getMonth() === this._calendarDate.getMonth() && oCalDate.getDate() === this._calendarDate.getDate();
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
				_tabIndex: isFocused ? "0" : "-1",
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
		if (this._autoFocus && !this._hidden) {
			this.shadowRoot.querySelector(`[tabindex="0"]`).focus();
		}
	}

	_onfocusin() {
		this._autoFocus = true;
	}

	_isDaySelected(timestamp) {
		if (this.selection === CalendarSelection.Single) {
			return timestamp === this.selectedDates[0];
		}

		// Multiple, Range
		return this.selectedDates.includes(timestamp);
	}

	_isDayInsideSelectionRange(timestamp) {
		// No selection at all (or not in range selection mode)
		if (this.selection !== CalendarSelection.Range || !this.selectedDates.length) {
			return false;
		}

		// One date selected
		if (this.selectedDates.length === 1 && this._hoverTimestamp) {
			return isBetween(timestamp, this.selectedDates[0], this._hoverTimestamp);
		}

		// Two dates selected
		return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
	}

	_selectDate(event) {
		const target = event.target;

		if (!this._isDayPressed(target)) {
			return;
		}

		const timestamp = this.getTimestampFromDom(target);

		this._safelyUpdateTimestamp(timestamp);
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

	_onmouseover(event) {
		const hoveredItem = event.target.closest(".ui5-dp-item");
		if (hoveredItem && this.selection === CalendarSelection.Range && this.selectedDates.length === 1) {
			this._hoverTimestamp = this.getTimestampFromDom(hoveredItem);
		}
	}

	_onkeydown(event) {
		let preventDefault = true;

		if (isEnter(event)) {
			this._selectDate(event);
		} else if (isSpace(event)) {
			event.preventDefault();
		} else if (isLeft(event)) {
			this._modifyTimestampBy(-1, "day");
		} else if (isRight(event)) {
			this._modifyTimestampBy(1, "day");
		} else if (isUp(event)) {
			this._modifyTimestampBy(-7, "day");
		} else if (isDown(event)) {
			this._modifyTimestampBy(7, "day");
		} else if (isPageUp(event)) {
			this._modifyTimestampBy(-1, "month");
		} else if (isPageDown(event)) {
			this._modifyTimestampBy(1, "month");
		} else if (isPageUpShift(event)) {
			this._modifyTimestampBy(-1, "year");
		} else if (isPageDownShift(event)) {
			this._modifyTimestampBy(1, "year");
		} else if (isPageUpShiftCtrl(event)) {
			this._modifyTimestampBy(-10, "year");
		} else if (isPageDownShiftCtrl(event)) {
			this._modifyTimestampBy(10, "year");
		} else if (isHome(event) || isEnd(event)) {
			this._onHomeOrEnd(isHome(event));
		} else if (isHomeCtrl(event)) {
			const tempDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			tempDate.setDate(1); // Set the first day of the month
			this._setTimestamp(tempDate.valueOf() / 1000);
		} else if (isEndCtrl(event)) {
			const tempDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			tempDate.setMonth(tempDate.getMonth() + 1);
			tempDate.setDate(0); // Set the last day of the month (0th day of next month)
			this._setTimestamp(tempDate.valueOf() / 1000);
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			event.preventDefault();
		}
	}

	_onHomeOrEnd(homePressed) {
		this._weeks.forEach(week => {
			const dayInThisWeek = week.findIndex(item => {
				const date = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000);
				return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
			}) !== -1;
			if (dayInThisWeek) { // The current day is in this week
				const index = homePressed ? 1 : 7; // select the first (if Home) or last (if End) day of the week
				this._setTimestamp(parseInt(week[index].timestamp));
			}
		});
	}

	_showPreviousPage() {
		this._modifyTimestampBy(-1, "month");
	}

	_showNextPage() {
		this._modifyTimestampBy(1, "month");
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._selectDate(event);
		}
	}

	/**
	 * Modifies the timestamp by a certain amount of days/months/years
	 * @param amount
	 * @param unit
	 * @private
	 */
	_modifyTimestampBy(amount, unit) {
		// Modify the current timestamp
		const newDate = new CalendarDate(this._calendarDate);
		if (unit === "day") {
			newDate.setDate(this._calendarDate.getDate() + amount);
		} else if (unit === "month") {
			newDate.setMonth(this._calendarDate.getMonth() + amount);
			const stillSameMonth = amount < 0 && newDate.getMonth() === this._calendarDate.getMonth(); // PageUp remained in the same month
			const monthSkipped = amount > 0 && newDate.getMonth() - this._calendarDate.getMonth() > 1; // PageDown skipped a whole month
			if (stillSameMonth || monthSkipped) { // Select the last day of the month in any of these 2 scenarios
				newDate.setDate(0);
			}
		} else {
			newDate.setYear(this._calendarDate.getYear() + amount);
		}
		this._safelyUpdateTimestamp(newDate.valueOf() / 1000);

		// Notify the calendar to update its timestamp
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	/**
	 * Sets the timestamp to an absolute value
	 * @param value
	 * @private
	 */
	_setTimestamp(value) {
		this._safelyUpdateTimestamp(value);
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
	}

	get _dayPickerWeekNumberText() {
		return this.i18nBundle.getText(DAY_PICKER_WEEK_NUMBER_TEXT);
	}

	get _dayPickerNonWorkingDay() {
		return this.i18nBundle.getText(DAY_PICKER_NON_WORKING_DAY);
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
