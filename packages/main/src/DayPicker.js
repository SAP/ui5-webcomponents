import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import calculateWeekNumber from "@ui5/webcomponents-localization/dist/dates/calculateWeekNumber.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
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
	languageAware: true,
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
			ItemNavigation.AFTER_FOCUS,
			this._handleItemNavigationAfterFocus.bind(this)
		);

		this._itemNav.attachEvent(
			"PageBottom",
			this._handleMonthBottomOverflow.bind(this)
		);

		this._itemNav.attachEvent(
			"PageTop",
			this._handleMonthTopOverflow.bind(this)
		);

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());

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
		const _monthsNameWide = localeData.getMonths("wide", this._calendarDate._oUDate.sCalendarType);

		this._minDateObject = new Date(this._minDate);
		this._maxDateObject = new Date(this._maxDate);

		const visualizedSelectedDates = this._getVisualizedSelectedDates();

		/* eslint-disable no-loop-func */
		for (let i = 0; i < _aVisibleDays.length; i++) {
			oCalDate = _aVisibleDays[i];
			timestamp = oCalDate.valueOf() / 1000; // no need to round because CalendarDate does it

			// day of the week
			weekday = oCalDate.getDay() - this._getFirstDayOfWeek();
			if (weekday < 0) {
				weekday += 7;
			}

			const nonWorkingAriaLabel = this._isWeekend(oCalDate) ? `${this._dayPickerNonWorkingDay} ` : "";

			day = {
				timestamp: timestamp.toString(),
				selected: visualizedSelectedDates.some(d => {
					return d === timestamp;
				}),
				iDay: oCalDate.getDate(),
				_index: i.toString(),
				classes: `ui5-dp-item ui5-dp-wday${weekday}`,
				ariaLabel: `${nonWorkingAriaLabel}${_monthsNameWide[oCalDate.getMonth()]} ${oCalDate.getDate()}, ${oCalDate.getYear()}`,
			};

			const isToday = oCalDate.isSame(CalendarDate.fromLocalJSDate(new Date(), this._primaryCalendarType));

			week.push(day);

			if (oCalDate.getDay() === this._getFirstDayOfWeek()) {
				day.classes += " ui5-dp-firstday";
			}

			if (day.selected) {
				day.classes += " ui5-dp-item--selected";
				isDaySelected = true;
			}

			if (isToday) {
				day.classes += " ui5-dp-item--now";
				todayIndex = i;
				day.ariaLabel = `today ${day.ariaLabel}`;
			}

			if (oCalDate.getMonth() !== this._month) {
				day.classes += " ui5-dp-item--othermonth";
				day.ariaDisabled = "true";
			}

			day.id = `${this._id}-${timestamp}`;

			if (this._isWeekend(oCalDate)) {
				day.classes += " ui5-dp-item--weeekend";
			}
			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate)) {
				day.classes += " ui5-dp-item--disabled";
				day.disabled = true;
			}

			this._hideWeekNumbers = this.shouldHideWeekNumbers;

			if (day.classes.indexOf("ui5-dp-wday6") !== -1
				|| _aVisibleDays.length - 1 === i) {
				const weekNumber = calculateWeekNumber(getFirstDayOfWeek(), oCalDate.toUTCJSDate(), oCalDate.getYear(), getLocale(), localeData);
				if (lastWeekNumber !== weekNumber) {
					const weekNum = {
						weekNum: weekNumber,
						isHidden: this._hideWeekNumbers,
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

		if (!isDaySelected && todayIndex && this._itemNav.current === 0) {
			this._itemNav.current = todayIndex;
		}

		const aDayNamesWide = localeData.getDays("wide", this._primaryCalendarType);
		const aDayNamesAbbreviated = localeData.getDays("abbreviated", this._primaryCalendarType);
		const aUltraShortNames = aDayNamesAbbreviated.map(n => n);
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
				id: `${this._id}-WH${i.toString()}`,
				name: aDayNamesWide[weekday],
				ultraShortName: aUltraShortNames[weekday],
				classes: "ui5-dp-dayname",
			};

			this._dayNames.push(dayName);
		}

		this._dayNames[1].classes += " ui5-dp-firstday";
	}

	onAfterRendering() {
		const visualizedDates = this._getVisualizedSelectedDates();
		if (this.selection === CalendarSelection.Range && visualizedDates.length > 0) {
			const dayItems = this.getDomRef().querySelectorAll(".ui5-dp-item");
			const firstTimestamp = this._selectedDates[0];
			const lastTimestamp = (visualizedDates.length === 1) ? parseInt(dayItems[this._itemNav.currentIndex].dataset.sapTimestamp) : this._selectedDates[1];

			this._updateSelectionBetween(dayItems, firstTimestamp, lastTimestamp);
		}
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
			this._modifySelectionAndNotifySubscribers(this.targetDate);
			this.targetDate = null;
		}

		if (!dayPressed) {
			this._itemNav.focusCurrent();
		}
	}

	_onitemmouseover(event) {
		const hoveredItem = event.target.classList.contains("ui5-dp-item") ? event.target : event.target.parentElement;
		if (this.selectedDates.length === 1 && this.selection === CalendarSelection.Range && hoveredItem.classList.contains("ui5-dp-item")) {
			const dayItems = this.getDomRef().querySelectorAll(".ui5-dp-item");
			const firstTimestamp = this._selectedDates[0];
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
			return this._handleEnter(event);
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
			this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate);
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-dp-item") > -1) {
			const targetDate = parseInt(event.target.getAttribute("data-sap-timestamp"));
			this._modifySelectionAndNotifySubscribers(targetDate);
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
		const newItemIndex = this._itemNav._getItems().findIndex(item => parseInt(item.timestamp) === currentTimestamp);

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
		const localeData = getCachedLocaleDataInstance(getLocale());
		return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
	}

	get focusableDays() {
		const focusableDays = [];

		for (let i = 0; i < this._weeks.length; i++) {
			const week = this._weeks[i].slice(1).filter(x => !x.disabled);
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
		this._itemNav._getCurrentItem().setAttribute("tabindex", index.toString());
	}

	_modifySelectionAndNotifySubscribers(timestamp) {
		switch (this.selection) {
		case CalendarSelection.Single:
			this.selectedDates = [timestamp];
			break;
		case CalendarSelection.Multiple:
			this.selectedDates = this.selectedDates.includes(timestamp)
				? this.selectedDates.filter(value => value !== timestamp)
				: [...this._selectedDates, timestamp];
			break;
		case CalendarSelection.Range:
			this.selectedDates = (this.selectedDates.length === 1)
				? [...this._selectedDates, timestamp]
				: [timestamp];
			break;
		default:
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

	_handleItemNavigationAfterFocus() {
		const currentItem = this._itemNav._getCurrentItem();
		const currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp"));

		if (currentItem.classList.contains("ui5-dp-item--othermonth")) {
			this._navigateAndWaitRerender(currentTimestamp);
		}
	}

	async _navigateAndWaitRerender(timestamp) {
		this.fireEvent("navigate", { timestamp });
		await RenderScheduler.whenFinished();

		const newItemIndex = this._itemNav._getItems().findIndex(item => parseInt(item.timestamp) === timestamp);
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
		const currentDate = date._oUDate ? date.toLocalJSDate() : CalendarDate.fromTimestamp(date).toLocalJSDate();
		const minDate = this._minDateObject;
		const maxDate = this._maxDateObject;

		currentDate.setHours(0);
		if (minDate) {
			minDate.setHours(0);
		}
		if (maxDate) {
			maxDate.setHours(0);
		}

		return currentDate > maxDate || currentDate < minDate;
	}

	get _maxDate() {
		return this.maxDate ? this._getTimeStampFromString(this.maxDate) : this._getMaxCalendarDate();
	}

	get _minDate() {
		return this.minDate ? this._getTimeStampFromString(this.minDate) : this._getMinCalendarDate();
	}

	_getTimeStampFromString(value) {
		const jsDate = this.getFormat().parse(value);
		if (jsDate) {
			const calDate = CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType);
			return calDate.toUTCJSDate().valueOf();
		}
		return undefined;
	}

	_getMinCalendarDate() {
		const minDate = new CalendarDate(1, 0, 1, this._primaryCalendarType);
		minDate.setYear(1);
		minDate.setMonth(0);
		minDate.setDate(1);
		return minDate.toUTCJSDate().valueOf();
	}

	_getMaxCalendarDate() {
		const maxDate = new CalendarDate(1, 0, 1, this._primaryCalendarType);
		maxDate.setYear(9999);
		maxDate.setMonth(11);
		const tempDate = new CalendarDate(maxDate, this._primaryCalendarType);
		tempDate.setDate(1);
		tempDate.setMonth(tempDate.getMonth() + 1, 0);
		maxDate.setDate(tempDate.getDate());// 31st for Gregorian Calendar
		return maxDate.toUTCJSDate().valueOf();
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

		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
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
			if (bIncludeBCDates && iYear < minCalendarDateYear) {
				// For dates before 0001-01-01 we should render only empty squares to keep
				// the month square matrix correct.
				oCalDate._bBeforeFirstYear = true;
				_aVisibleDays.push(oCalDate);
			} else if (iYear >= minCalendarDateYear && iYear <= maxCalendarDateYear) {
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

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}
}

DayPicker.define();

export default DayPicker;
