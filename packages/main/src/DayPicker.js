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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import calculateWeekNumber from "@ui5/webcomponents-localization/dist/dates/calculateWeekNumber.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPart from "./CalendarPart.js";
import DayPickerTemplate from "./generated/templates/DayPickerTemplate.lit.js";

import {
	DAY_PICKER_WEEK_NUMBER_TEXT,
	DAY_PICKER_NON_WORKING_DAY,
	DAY_PICKER_TODAY,
} from "./generated/i18n/i18n-defaults.js";

import dayPickerCSS from "./generated/themes/DayPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-daypicker",
	properties: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * An array of UTC timestamps representing the selected date or dates depending on the capabilities of the picker component.
		 * @type {Array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
			compareValues: true,
		},

		/**
		 * Defines the type of selection used in the day picker component.
		 * Accepted property values are:<br>
		 * <ul>
		 * <li><code>CalendarSelectionMode.Single</code> - enables a single date selection.(default value)</li>
		 * <li><code>CalendarSelectionMode.Range</code> - enables selection of a date range.</li>
		 * <li><code>CalendarSelectionMode.Multiple</code> - enables selection of multiple dates.</li>
		 * </ul>
		 * @type {CalendarSelectionMode}
		 * @defaultvalue "Single"
		 * @public
		 */
		selectionMode: {
			type: CalendarSelectionMode,
			defaultValue: CalendarSelectionMode.Single,
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
		 * When selectionMode="Range" and the first day in the range is selected, this is the currently hovered (when using mouse) or focused (when using keyboard) day by the user
		 * @private
		 */
		_secondTimestamp: {
			type: String,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.DayPicker.prototype */ {
		/**
		 * Fired when the selected date(s) change
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when the timestamp changes (user navigates with the keyboard) or clicks with the mouse
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

const isBetween = (x, num1, num2) => x > Math.min(num1, num2) && x < Math.max(num1, num2);

const DAYS_IN_WEEK = 7;

/**
 * @class
 *
 * Represents one month view inside a calendar.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DayPicker
 * @extends CalendarPart
 * @tagname ui5-daypicker
 * @public
 */
class DayPicker extends CalendarPart {
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
		if (this._hidden) {
			return; // Optimization to not do any work unless the current picker
		}

		this._weeks = [];

		const firstDayOfWeek = this._getFirstDayOfWeek();
		const monthsNames = localeData.getMonths("wide", this._primaryCalendarType);
		const nonWorkingDayLabel = this.i18nBundle.getText(DAY_PICKER_NON_WORKING_DAY);
		const todayLabel = this.i18nBundle.getText(DAY_PICKER_TODAY);
		const tempDate = this._getFirstDay(); // date that will be changed by 1 day 42 times
		const todayDate = CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType); // current day date - calculate once
		const calendarDate = this._calendarDate; // store the _calendarDate value as this getter is expensive and degrades IE11 perf
		const minDate = this._minDate; // store the _minDate (expensive getter)
		const maxDate = this._maxDate; // store the _maxDate (expensive getter)

		let week = [];
		for (let i = 0; i < DAYS_IN_WEEK * 6; i++) { // always show 6 weeks total, 42 days to avoid jumping
			const timestamp = tempDate.valueOf() / 1000; // no need to round because CalendarDate does it

			let dayOfTheWeek = tempDate.getDay() - firstDayOfWeek;
			if (dayOfTheWeek < 0) {
				dayOfTheWeek += DAYS_IN_WEEK;
			}

			const isFocused = tempDate.getMonth() === calendarDate.getMonth() && tempDate.getDate() === calendarDate.getDate();
			const isSelected = this._isDaySelected(timestamp);
			const isSelectedBetween = this._isDayInsideSelectionRange(timestamp);
			const isOtherMonth = tempDate.getMonth() !== calendarDate.getMonth();
			const isWeekend = this._isWeekend(tempDate);
			const isDisabled = tempDate.valueOf() < minDate.valueOf() || tempDate.valueOf() > maxDate.valueOf();
			const isToday = tempDate.isSame(todayDate);
			const isFirstDayOfWeek = tempDate.getDay() === firstDayOfWeek;

			const nonWorkingAriaLabel = isWeekend ? `${nonWorkingDayLabel} ` : "";
			const todayAriaLabel = isToday ? `${todayLabel} ` : "";

			const day = {
				timestamp: timestamp.toString(),
				focusRef: isFocused,
				_tabIndex: isFocused ? "0" : "-1",
				selected: isSelected,
				iDay: tempDate.getDate(),
				classes: `ui5-dp-item ui5-dp-wday${dayOfTheWeek}`,
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

			if (dayOfTheWeek === DAYS_IN_WEEK - 1) { // 0-indexed so 6 is the last day of the week
				week.unshift({
					weekNum: calculateWeekNumber(getFirstDayOfWeek(), tempDate.toUTCJSDate(), tempDate.getYear(), getLocale(), localeData),
					isHidden: this.shouldHideWeekNumbers,
				});
			}

			if (week.length === DAYS_IN_WEEK + 1) { // 7 entries for each day + 1 for the week numbers
				this._weeks.push(week);
				week = [];
			}

			tempDate.setDate(tempDate.getDate() + 1);
		}
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

		let dayOfTheWeek;

		const aDayNamesWide = localeData.getDays("wide", this._primaryCalendarType);
		const aDayNamesAbbreviated = localeData.getDays("abbreviated", this._primaryCalendarType);
		let dayName;

		this._dayNames = [];
		this._dayNames.push({
			classes: "ui5-dp-dayname",
			name: this.i18nBundle.getText(DAY_PICKER_WEEK_NUMBER_TEXT),
		});
		for (let i = 0; i < DAYS_IN_WEEK; i++) {
			dayOfTheWeek = i + this._getFirstDayOfWeek();
			if (dayOfTheWeek > DAYS_IN_WEEK - 1) { // 0-indexed so index of 6 is the maximum allowed
				dayOfTheWeek -= DAYS_IN_WEEK;
			}
			dayName = {
				name: aDayNamesWide[dayOfTheWeek],
				ultraShortName: aDayNamesAbbreviated[dayOfTheWeek],
				classes: "ui5-dp-dayname",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[1].classes += " ui5-dp-firstday";

		if (this.shouldHideWeekNumbers) {
			this._dayNames.shift();
		}
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
		if (this.selectionMode === CalendarSelectionMode.Single) {
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
		if (this.selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
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

		const timestamp = this._getTimestampFromDom(target);

		this._safelySetTimestamp(timestamp);
		this._updateSecondTimestamp();

		if (this.selectionMode === CalendarSelectionMode.Single) {
			this.selectedDates = [timestamp];
		} else if (this.selectionMode === CalendarSelectionMode.Multiple) {
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
		if (hoveredItem && this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
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
		if (isSpace(event) || (isSpaceShift(event) && this.selectionMode !== CalendarSelectionMode.Multiple)) {
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
		if (this.selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this.timestamp;
		}
	}

	get shouldHideWeekNumbers() {
		if (this._primaryCalendarType !== CalendarType.Gregorian) {
			return true;
		}

		return this.hideWeekNumbers;
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

	_getFirstDay() {
		let daysFromPreviousMonth;

		const firstDayOfWeek = this._getFirstDayOfWeek();

		// determine weekday of first day in month
		const firstDay = new CalendarDate(this._calendarDate, this._primaryCalendarType);
		firstDay.setDate(1);
		daysFromPreviousMonth = firstDay.getDay() - firstDayOfWeek;
		if (daysFromPreviousMonth < 0) {
			daysFromPreviousMonth = 7 + daysFromPreviousMonth;
		}

		if (daysFromPreviousMonth > 0) {
			firstDay.setDate(1 - daysFromPreviousMonth);
		}

		return firstDay;
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
				"justify-content": "center",
			},
			main: {
				width: "100%",
			},
		};
	}
}

DayPicker.define();

export default DayPicker;
