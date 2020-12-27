import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import {
	isSpace,
	isSpaceShift,
	isEnter,
	isEnterShift,
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
import { getMinCalendarDate, getMaxCalendarDate } from "./util/DateTime.js";
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
		 * When set, the component will skip all work in onBeforeRendering and will not automatically set the focus on itself
		 * @type {boolean}
		 * @private
		 */
		_hidden: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * When selection="Range" and the first day in the range is selected, this is the currently hovered (when using mouse) or focused (when using keyboard) day by the user
		 * @private
		 */
		_secondTimestamp: {
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
		super.onBeforeRendering();
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
		if (this._hidden) {
			return; // Optimization to not do any work unless the current picker
		}

		let tempDate,
			day,
			timestamp,
			lastWeekNumber = -1;

		const visibleDays = this._getVisibleDays();
		this._weeks = [];
		let week = [];
		this._weekNumbers = [];
		let weekday;
		const monthsNames = localeData.getMonths("wide", this._primaryCalendarType);

		/* eslint-disable no-loop-func */
		for (let i = 0; i < visibleDays.length; i++) {
			tempDate = visibleDays[i];
			timestamp = tempDate.valueOf() / 1000; // no need to round because CalendarDate does it

			// day of the week
			weekday = tempDate.getDay() - this._getFirstDayOfWeek();
			if (weekday < 0) {
				weekday += 7;
			}

			const isFocused = tempDate.getMonth() === this._calendarDate.getMonth() && tempDate.getDate() === this._calendarDate.getDate();
			const isSelected = this._isDaySelected(timestamp);
			const isSelectedBetween = this._isDayInsideSelectionRange(timestamp);
			const isOtherMonth = tempDate.getMonth() !== this._month;
			const isWeekend = this._isWeekend(tempDate);
			const isDisabled = this._isOutOfSelectableRange(tempDate);
			const isToday = tempDate.isSame(CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType));
			const isFirstDayOfWeek = tempDate.getDay() === this._getFirstDayOfWeek();

			const nonWorkingAriaLabel = isWeekend ? `${this._dayPickerNonWorkingDay} ` : "";
			const todayAriaLabel = isToday ? `today ` : "";

			day = {
				timestamp: timestamp.toString(),
				focusRef: isFocused,
				_tabIndex: isFocused ? "0" : "-1",
				selected: isSelected,
				iDay: tempDate.getDate(),
				classes: `ui5-dp-item ui5-dp-wday${weekday}`,
				ariaLabel: `${todayAriaLabel}${nonWorkingAriaLabel}${monthsNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getYear()}`,
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

			if (weekday === 6 || i === visibleDays.length - 1) {
				const weekNumber = calculateWeekNumber(getFirstDayOfWeek(), tempDate.toUTCJSDate(), tempDate.getYear(), getLocale(), localeData);
				if (lastWeekNumber !== weekNumber) {
					week.unshift({
						weekNum: weekNumber,
						isHidden: this.shouldHideWeekNumbers,
					});
					lastWeekNumber = weekNumber;
				}

				this._weeks.push(week);
				week = [];
			}
		}
		/* eslint-enable no-loop-func */
	}

	/**
	 * Builds the dayNames object (header of the month)
	 * @param localeData
	 * @private
	 */
	_buildDayNames(localeData) {
		if (this._hidden) {
			return; // Optimization to not do any work unless the current picker
		}

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
			this.focus();
		}
	}

	_onfocusin() {
		this._autoFocus = true;
	}

	/**
	 * Tells if the day is selected (dark blue)
	 * @param timestamp
	 * @returns {boolean}
	 * @private
	 */
	_isDaySelected(timestamp) {
		if (this.selection === CalendarSelection.Single) {
			return timestamp === this.selectedDates[0];
		}

		// Multiple, Range
		return this.selectedDates.includes(timestamp);
	}

	/**
	 * Tells if the day is inside a selection range (light blue)
	 * @param timestamp
	 * @returns {*}
	 * @private
	 */
	_isDayInsideSelectionRange(timestamp) {
		// No selection at all (or not in range selection mode)
		if (this.selection !== CalendarSelection.Range || !this.selectedDates.length) {
			return false;
		}

		// Only one date selected - the user is hovering with the mouse or navigating with the keyboard to select the second one
		if (this.selectedDates.length === 1 && this._secondTimestamp) {
			return isBetween(timestamp, this.selectedDates[0], this._secondTimestamp);
		}

		// Two dates selected - stable range
		return isBetween(timestamp, this.selectedDates[0], this.selectedDates[1]);
	}

	/**
	 * Selects/deselects a day
	 * @param event
	 * @param isShift true if the user did Click+Shift or Enter+Shift (but not Space+Shift)
	 * @private
	 */
	_selectDate(event, isShift) {
		const target = event.target;

		if (!this._isDayPressed(target)) {
			return;
		}

		const timestamp = this.getTimestampFromDom(target);

		this._safelySetTimestamp(timestamp);
		this._updateSecondTimestamp();

		if (this.selection === CalendarSelection.Single) {
			this.selectedDates = [timestamp];
		} else if (this.selection === CalendarSelection.Multiple) {
			if (this.selectedDates.length > 0 && isShift) {
				this._multipleSelection(timestamp);
			} else {
				this._toggleTimestampInSelection(timestamp);
			}
		} else {
			this.selectedDates = (this.selectedDates.length === 1) ? [...this.selectedDates, timestamp]	: [timestamp];
		}

		this.fireEvent("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});
	}

	/**
	 * Selects/deselects the whole row (week)
	 * @param event
	 * @private
	 */
	_selectWeek(event) {
		this._weeks.forEach(week => {
			const dayInThisWeek = week.findIndex(item => {
				const date = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000);
				return date.getMonth() === this._calendarDate.getMonth() && date.getDate() === this._calendarDate.getDate();
			}) !== -1;
			if (dayInThisWeek) { // The current day is in this week
				const notAllDaysOfThisWeekSelected = week.some(item => item.timestamp && !this.selectedDates.includes(parseInt(item.timestamp)));
				if (notAllDaysOfThisWeekSelected) { // even if one day is not selected, select the whole week
					week.filter(item => item.timestamp).forEach(item => {
						this._addTimestampToSelection(parseInt(item.timestamp));
					});
				} else { // only if all days of this week are selected, deselect them
					week.filter(item => item.timestamp).forEach(item => {
						this._removeTimestampFromSelection(parseInt(item.timestamp));
					});
				}
			}
		});

		this.fireEvent("change", {
			timestamp: this.timestamp,
			dates: this.selectedDates,
		});
	}

	_toggleTimestampInSelection(timestamp) {
		if (this.selectedDates.includes(timestamp)) {
			this._removeTimestampFromSelection(timestamp);
		} else {
			this._addTimestampToSelection(timestamp);
		}
	}


	_addTimestampToSelection(timestamp) {
		if (!this.selectedDates.includes(timestamp)) {
			this.selectedDates = [...this.selectedDates, timestamp];
		}
	}

	_removeTimestampFromSelection(timestamp) {
		this.selectedDates = this.selectedDates.filter(value => value !== timestamp);
	}

	/**
	 * When at least one day is selected and the user pressed shift
	 * @param timestamp
	 * @private
	 */
	_multipleSelection(timestamp) {
		const min = Math.min(...this.selectedDates);
		const max = Math.max(...this.selectedDates);
		let start;
		let end;
		let toggle = false;

		if (timestamp < min) {
			start = timestamp;
			end = min;
		} else if (timestamp >= min && timestamp <= max) { // inside the current range - toggle all between the selected and focused
			const distanceToMin = Math.abs(timestamp - min);
			const distanceToMax = Math.abs(timestamp - max);

			if (distanceToMin < distanceToMax) {
				start = timestamp;
				end = max;
			} else {
				start = min;
				end = timestamp;
			}
			toggle = true;
		} else {
			start = max;
			end = timestamp;
		}

		const startDate = CalendarDate.fromTimestamp(start * 1000);
		const endDate = CalendarDate.fromTimestamp(end * 1000);

		while (startDate.valueOf() <= endDate.valueOf()) {
			this[toggle ? "_toggleTimestampInSelection" : "_addTimestampToSelection"](startDate.valueOf() / 1000);
			startDate.setDate(startDate.getDate() + 1);
		}
	}


	/**
	 * Set the hovered day as the _secondTimestamp
	 * @param event
	 * @private
	 */
	_onmouseover(event) {
		const hoveredItem = event.target.closest(".ui5-dp-item");
		if (hoveredItem && this.selection === CalendarSelection.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this.getTimestampFromDom(hoveredItem);
		}
	}

	_onkeydown(event) {
		let preventDefault = true;

		if (isEnter(event) || isEnterShift(event)) {
			this._selectDate(event, isEnterShift(event));
		} else if (isSpace(event) || isSpaceShift(event)) {
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

	_onkeyup(event) {
		// Even if Space+Shift was pressed, ignore the shift unless in Multiple selection
		if (isSpace(event) || (isSpaceShift(event) && this.selection !== CalendarSelection.Multiple)) {
			this._selectDate(event, false);
		} else if (isSpaceShift(event)) {
			this._selectWeek(event);
		}
	}

	/**
	 * Click is the same as Enter: Click+Shift has the same effect as Enter+Shift
	 * @param event
	 * @private
	 */
	_onclick(event) {
		this._selectDate(event, event.shiftKey);
	}

	/**
	 * One Home or End, move the focus to the first or last item in the row
	 * @param homePressed
	 * @private
	 */
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

	/**
	 * Called from Calendar.js
	 * @protected
	 */
	_hasPreviousPage() {
		return !(this._calendarDate.getMonth() === this._minDate.getMonth() && this._calendarDate.getYear() === this._minDate.getYear());
	}

	/**
	 * Called from Calendar.js
	 * @protected
	 */
	_hasNextPage() {
		return !(this._calendarDate.getMonth() === this._maxDate.getMonth() && this._calendarDate.getYear() === this._maxDate.getYear());
	}

	/**
	 * Called from Calendar.js
	 * Same as PageUp
	 * @protected
	 */
	_showPreviousPage() {
		this._modifyTimestampBy(-1, "month");
	}

	/**
	 * Called from Calendar.js
	 * Same as PageDown
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(1, "month");
	}

	/**
	 * Modifies the timestamp by a certain amount of days/months/years
	 * @param amount
	 * @param unit
	 * @private
	 */
	_modifyTimestampBy(amount, unit) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, unit);
		this._updateSecondTimestamp();

		// Notify the calendar to update its timestamp
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	/**
	 * Sets the timestamp to an absolute value
	 * @param value
	 * @private
	 */
	_setTimestamp(value) {
		this._safelySetTimestamp(value);
		this._updateSecondTimestamp();
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	/**
	 * During range selection, when the user is navigating with the keyboard, the currently focused day is considered the "second day"
	 * @private
	 */
	_updateSecondTimestamp() {
		if (this.selection === CalendarSelection.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this.timestamp;
		}
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
		return date.valueOf() < this._minDate.valueOf() || date.valueOf() > this._maxDate.valueOf();
	}

	_getVisibleDays() {
		let tempDate,
			iDaysOldMonth,
			iYear;

		const visibleDays = [];

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

		const oDay = new CalendarDate(oFirstDay, this._primaryCalendarType);
		for (let i = 0; i < 42; i++) {
			iYear = oDay.getYear();
			tempDate = new CalendarDate(oDay, this._primaryCalendarType);
			if (iYear >= getMinCalendarDate(this._primaryCalendarType).getYear() && iYear <= getMaxCalendarDate(this._primaryCalendarType).getYear()) {
				// Days before 0001-01-01 or after 9999-12-31 should not be rendered.
				visibleDays.push(tempDate);
			}
			oDay.setDate(oDay.getDate() + 1);
		}

		return visibleDays;
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
