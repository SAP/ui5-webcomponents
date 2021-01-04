import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
import {
	isF4,
	isF4Shift,
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import PickerBase from "./PickerBase.js";
import CalendarHeader from "./CalendarHeader.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";

// Default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Template
import CalendarTemplate from "./generated/templates/CalendarTemplate.lit.js";

// Styles
import calendarCSS from "./generated/themes/Calendar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-calendar",
	properties: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
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
		 */
		hideWeekNumbers: {
			type: Boolean,
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
			noAttribute: true,
		},

		_calendarHeight: {
			type: String,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Fired when the selected dates changed.
		 * @event sap.ui.webcomponents.main.Calendar#selected-dates-change
		 * @param {Array} dates The selected dates timestamps
		 * @public
		 */
		"selected-dates-change": {
			detail: {
				dates: { type: Array },
			},
		 },
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-calendar</code> can be used stand alone to display the years, months, weeks and days
 * <br><br>
 *
 * <h3>Usage</h3>
 *
 * The user can navigate to a particular date by:
 * <br>
 * <ul>
 * <li>Pressing over a month inside the months view</li>
 * <li>Pressing over an year inside the years view</li>
 * </ul>
 * <br>
 * The user can comfirm a date selection by pressing over a date inside the days view.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-calendar</code> provides advanced keyboard handling.
 * If the <code>ui5-calendar</code> is focused the user can
 * choose a picker by using the following shortcuts: <br>
 * <ul>
 * <li>[F4] - Shows month picker</li>
 * <li>[SHIFT] + [F4] - Shows year picker</li>
 * <br>
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * - Day picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous month</li>
 * <li>[PAGEDOWN] - Navigate to the next month</li>
 * <li>[SHIFT] + [PAGEUP] - Navigate to the previous year</li>
 * <li>[SHIFT] + [PAGEDOWN] - Navigate to the next year</li>
 * <li>[CTRL] + [SHIFT] + [PAGEUP] - Navigate ten years backwards</li>
 * <li>[CTRL] + [SHIFT] + [PAGEDOWN] - Navigate ten years forwards</li>
 * </ul>
 * <br>
 * - Month picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous month</li>
 * <li>[PAGEDOWN] - Navigate to the next month</li>
 * </ul>
 * <br>
 * - Year picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous year range</li>
 * <li>[PAGEDOWN] - Navigate the next year range</li>
 * </ul>
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Calendar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Calendar
 * @extends sap.ui.webcomponents.main.PickerBase
 * @tagname ui5-calendar
 * @public
 * @since 1.0.0-rc.11
 */
class Calendar extends PickerBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return CalendarTemplate;
	}

	static get styles() {
		return calendarCSS;
	}

	constructor() {
		super();
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
		this._monthPicker.onNavigate = this._handleYearNavigate.bind(this);

		this._yearPicker = {};
		this._yearPicker._hidden = true;
		this._yearPicker.onSelectedYearChange = this._handleSelectedYearChange.bind(this);
		this._yearPicker.onNavigate = this._handleYearNavigate.bind(this);

		this._isShiftingYears = false;
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType });
		const firstDayOfCalendarTimeStamp = this._getMinCalendarDate();

		if ((this.minDate || this.maxDate) && this._timestamp && !this.isInValidRange(this._timestamp * 1000)) {
			if (this._minDate) {
				this.timestamp = this._minDate / 1000;
			} else {
				this.timestamp = (new Date(firstDayOfCalendarTimeStamp)).getTime() / 1000;
			}
		}

		this._oMonth.formatPattern = this._formatPattern;
		this._oMonth.timestamp = this._timestamp;
		this._oMonth.selectedDates = [...this.selectedDates];
		this._oMonth.primaryCalendarType = this._primaryCalendarType;
		this._oMonth.selection = this.selection;
		this._oMonth.minDate = this.minDate;
		this._oMonth.maxDate = this.maxDate;
		this._header.monthText = localeData.getMonths("wide", this._primaryCalendarType)[this._month];
		this._header.yearText = oYearFormat.format(this._localDate, true);
		this._header.tabIndex = "-1";

		// month picker
		this._monthPicker.primaryCalendarType = this._primaryCalendarType;
		this._monthPicker.timestamp = this._timestamp;

		this._yearPicker.primaryCalendarType = this._primaryCalendarType;

		if (!this._isShiftingYears) {
			// year picker
			this._yearPicker.timestamp = this._timestamp;
		}

		this._isShiftingYears = false;

		this._refreshNavigationButtonsState();
	}

	onAfterRendering() {
		this._setDayPickerCurrentIndex(this._calendarDate, false);
	}

	_refreshNavigationButtonsState() {
		const minDateParsed = this.minDate && this.getFormat().parse(this.minDate);
		const maxDateParsed = this.maxDate && this.getFormat().parse(this.maxDate);
		let currentMonth = 0;
		let currentYear = 1;

		currentMonth = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getMonth();
		currentYear = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getYear();

		if (!this._oMonth._hidden) {
			if (this.minDate
				&& minDateParsed.getMonth() === currentMonth
				&& minDateParsed.getFullYear() === currentYear) {
				this._header._isPrevButtonDisabled = true;
			} else {
				this._header._isPrevButtonDisabled = false;
			}

			if (this.maxDate
				&& maxDateParsed.getMonth() === currentMonth
				&& maxDateParsed.getFullYear() === currentYear) {
				this._header._isNextButtonDisabled = true;
			} else {
				this._header._isNextButtonDisabled = false;
			}
		}

		if (!this._monthPicker._hidden) {
			if (this.minDate
				&& currentYear === minDateParsed.getFullYear()) {
				this._header._isPrevButtonDisabled = true;
			} else {
				this._header._isPrevButtonDisabled = false;
			}

			if (this.maxDate
				&& currentYear === maxDateParsed.getFullYear()) {
				this._header._isNextButtonDisabled = true;
			} else {
				this._header._isNextButtonDisabled = false;
			}
		}

		if (!this._yearPicker._hidden) {
			const cellsFromTheStart = 7;
			const cellsToTheEnd = 12;

			currentYear = this._yearPicker.timestamp && CalendarDate.fromTimestamp(this._yearPicker.timestamp * 1000).getYear();
			if (this.minDate
				&& (currentYear - minDateParsed.getFullYear()) < cellsFromTheStart) {
				this._header._isPrevButtonDisabled = true;
			} else {
				this._header._isPrevButtonDisabled = false;
			}

			if (this.maxDate
				&& (maxDateParsed.getFullYear() - currentYear) < cellsToTheEnd) {
				this._header._isNextButtonDisabled = true;
			} else {
				this._header._isNextButtonDisabled = false;
			}
		}
	}

	get dayPicker() {
		return this.shadowRoot.querySelector("ui5-daypicker");
	}

	get monthPicker() {
		return this.shadowRoot.querySelector("ui5-monthpicker");
	}

	get yearPicker() {
		return this.shadowRoot.querySelector("ui5-yearpicker");
	}

	get header() {
		return this.shadowRoot.querySelector("ui5-calendar-header");
	}

	get monthButton() {
		return this.header.shadowRoot.querySelector("[data-sap-show-picker='Month']");
	}

	get yearButton() {
		return this.header.shadowRoot.querySelector("[data-sap-show-picker='Year']");
	}

	_onkeydown(event) {
		if (isF4(event) && this._monthPicker._hidden) {
			this._showMonthPicker();
			if (!this._yearPicker._hidden) {
				this._hideYearPicker();
			}
		}

		if (isF4Shift(event) && this._yearPicker._hidden) {
			this._showYearPicker();
			if (!this._monthPicker._hidden) {
				this._hideMonthPicker();
			}
		}

		if (isTabNext(event)) {
			this._handleTabNext(event);
		}

		if (isTabPrevious(event)) {
			this._handleTabPrevous(event);
		}
	}

	_handleTabNext(event) {
		const target = event.target;

		if (target.tagName === "UI5-DAYPICKER" || target.tagName === "UI5-MONTHPICKER" || target.tagName === "UI5-YEARPICKER") {
			if (this.monthButton.getAttribute("hidden") === null) {
				this.monthButton.focus();
			} else {
				this.yearButton.focus();
			}
			event.preventDefault();
		} else if (target.tagName === "UI5-CALENDAR-HEADER" && event.path[0].getAttribute("data-sap-show-picker") === "Month") {
			this.yearButton.focus();
			event.preventDefault();
		} else {
			this._setPickerCurrentTabindex(-1);
		}
	}

	_handleTabPrevous(event) {
		const target = event.target;

		if (target.tagName === "UI5-CALENDAR-HEADER" && event.path[0].getAttribute("data-sap-show-picker") === "Month") {
			this._moveFocusToPickerContent();
			event.preventDefault();
		} else if (target.tagName === "UI5-CALENDAR-HEADER" && event.path[0].getAttribute("data-sap-show-picker") === "Year") {
			if (this.monthButton.getAttribute("hidden") === null) {
				this.monthButton.focus();
			} else {
				this._moveFocusToPickerContent();
			}
			event.preventDefault();
		}
	}

	_moveFocusToPickerContent() {
		if (!this._oMonth._hidden) {
			this.dayPicker._itemNav.focusCurrent();
		} else if (!this._monthPicker._hidden) {
			this.monthPicker._itemNav.focusCurrent();
		} else {
			this.yearPicker._itemNav.focusCurrent();
		}
	}

	_onfocusout(event) {
		this._header.tabIndex = "-1";
		this._setPickerCurrentTabindex(0);
	}

	_setPickerCurrentTabindex(index) {
		if (this.dayPicker) {
			this.dayPicker._setCurrentItemTabIndex(index);
		}

		if (this.monthPicker) {
			this.monthPicker._setCurrentItemTabIndex(index);
		}

		if (this.yearPicker) {
			this.yearPicker._setCurrentItemTabIndex(index);
		}
	}

	_handleSelectedDatesChange(event) {
		const selectedDates = event.detail.dates;

		// Deselecting a date in multiple selection type
		if (this.selection === CalendarSelection.Multiple && this.selectedDates.length > selectedDates.length) {
			const deselectedDates = this.selectedDates.filter(timestamp => !selectedDates.includes(timestamp));
			this.timestamp = deselectedDates[0];
		} else {
			this.timestamp = selectedDates[selectedDates.length - 1];
		}

		this.selectedDates = [...selectedDates];
		this.fireEvent("selected-dates-change", { dates: selectedDates });
	}

	_handleMonthNavigate(event) {
		this.timestamp = event.detail.timestamp;
	}

	_handleYearNavigate(event) {
		if (event.detail.start) {
			this._handlePrevious();
		}

		if (event.detail.end) {
			this._handleNext();
		}
	}

	_focusFirstDayOfMonth(targetDate) {
		let fistDayOfMonthIndex = -1;

		// focus first day of the month
		this.dayPicker._getVisibleDays(targetDate).forEach((date, index) => {
			if (date.getDate() === 1 && (fistDayOfMonthIndex === -1)) {
				fistDayOfMonthIndex = index;
			}
		});

		this.dayPicker._itemNav.currentIndex = fistDayOfMonthIndex;
		this.dayPicker._itemNav.focusCurrent();
	}

	_handleSelectedMonthChange(event) {
		const oNewDate = this._calendarDate;
		const oFocusedDate = CalendarDate.fromTimestamp(event.detail.timestamp * 1000, this._primaryCalendarType);

		oNewDate.setMonth(oFocusedDate.getMonth());
		this.timestamp = oNewDate.valueOf() / 1000;
		this._monthPicker.timestamp = this.timestamp;

		this._hideMonthPicker();
		this._setDayPickerCurrentIndex(oNewDate, true);
	}

	_handleSelectedYearChange(event) {
		const oNewDate = this._calendarDate;
		const oFocusedDate = CalendarDate.fromTimestamp(event.detail.timestamp * 1000, this._primaryCalendarType);

		oNewDate.setYear(oFocusedDate.getYear());
		this.timestamp = oNewDate.valueOf() / 1000;
		this._yearPicker.timestamp = this.timestamp;

		this._hideYearPicker();
		this._setDayPickerCurrentIndex(oNewDate, true);
	}

	async _setDayPickerCurrentIndex(calDate, applyFocus) {
		await RenderScheduler.whenFinished();
		const currentDate = new CalendarDate(calDate, this._primaryCalendarType);
		const currentIndex = this.dayPicker.focusableDays.findIndex(item => {
			return CalendarDate.fromLocalJSDate(new Date(item.timestamp * 1000), this._primaryCalendarType).isSame(currentDate);
		});
		this.dayPicker._itemNav.currentIndex = currentIndex;
		if (applyFocus) {
			this.dayPicker._itemNav.focusCurrent();
		} else {
			this.dayPicker._itemNav.update();
		}
	}

	_handleMonthButtonPress() {
		this._hideYearPicker();
		this._header._isMonthButtonHidden = true;

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
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		nextMonth.setDate(1);
		nextMonth.setMonth(nextMonth.getMonth() + 1);

		if (nextMonth.getYear() > maxCalendarDateYear) {
			return;
		}

		if (!this.isInValidRange(nextMonth.toLocalJSDate().valueOf())) {
			return;
		}

		this._focusFirstDayOfMonth(nextMonth);
		this.timestamp = nextMonth.valueOf() / 1000;
	}

	_showPrevMonth() {
		let iNewMonth = this._month - 1,
			iNewYear = this._calendarDate.getYear();

		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();

		// focus first day of the month
		const currentMonthDate = this.dayPicker._calendarDate.setMonth(this.dayPicker._calendarDate.getMonth());
		const lastMonthDate = this.dayPicker._calendarDate.setMonth(this.dayPicker._calendarDate.getMonth() - 1);

		// set the date to last day of last month
		currentMonthDate.setDate(-1);

		// find the index of the last day
		let lastDayOfMonthIndex = -1;

		if (!this.isInValidRange(currentMonthDate.toLocalJSDate().valueOf())) {
			return;
		}

		this.dayPicker._getVisibleDays(lastMonthDate).forEach((date, index) => {
			const isSameDate = currentMonthDate.getDate() === date.getDate();
			const isSameMonth = currentMonthDate.getMonth() === date.getMonth();

			if (isSameDate && isSameMonth) {
				lastDayOfMonthIndex = (index + 1);
			}
		});

		if (lastDayOfMonthIndex !== -1) {
			// find the DOM for the last day index
			const lastDay = this.dayPicker.shadowRoot.querySelectorAll(".ui5-dp-content .ui5-dp-item")[lastDayOfMonthIndex];

			// update current item in ItemNavigation
			this.dayPicker._itemNav.current = lastDayOfMonthIndex;

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


		if (oNewDate.getYear() < minCalendarDateYear) {
			return;
		}
		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextYear() {
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		if (this._calendarDate.getYear() === maxCalendarDateYear) {
			return;
		}

		const newDate = this._calendarDate;
		newDate.setYear(this._calendarDate.getYear() + 1);

		this.timestamp = newDate.valueOf() / 1000;
	}

	_showPrevYear() {
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();
		if (this._calendarDate.getYear() === minCalendarDateYear) {
			return;
		}

		const oNewDate = this._calendarDate;
		oNewDate.setYear(this._calendarDate.getYear() - 1);

		this.timestamp = oNewDate.valueOf() / 1000;
	}

	_showNextPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			YearPicker._ITEMS_COUNT - YearPicker._MIDDLE_ITEM_INDEX,
			CalendarDate.fromTimestamp(this._minDate, this._primaryCalendarType).getYear(),
			CalendarDate.fromTimestamp(this._maxDate, this._primaryCalendarType).getYear())) {
			return;
		}

		const newDate = CalendarDate.fromTimestamp(this._yearPicker.timestamp * 1000, this._primaryCalendarType);
		newDate.setYear(newDate.getYear() + YearPicker._ITEMS_COUNT);

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: newDate.valueOf() / 1000,
		});

		this.timestamp = this._yearPicker.timestamp;

		this._isShiftingYears = true;
	}

	_showPrevPageYears() {
		if (!this._isYearInRange(this._yearPicker.timestamp,
			-YearPicker._MIDDLE_ITEM_INDEX - 1,
			CalendarDate.fromTimestamp(this._minDate, this._primaryCalendarType).getYear(),
			CalendarDate.fromTimestamp(this._maxDate, this._primaryCalendarType).getYear())) {
			return;
		}

		const newDate = CalendarDate.fromTimestamp(this._yearPicker.timestamp * 1000, this._primaryCalendarType);
		newDate.setYear(newDate.getYear() - YearPicker._ITEMS_COUNT);

		this._yearPicker = Object.assign({}, this._yearPicker, {
			timestamp: newDate.valueOf() / 1000,
		});

		this.timestamp = this._yearPicker.timestamp;

		this._isShiftingYears = true;
	}

	_showMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._monthPicker.timestamp = this._timestamp;
		this._monthPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".ui5-cal-root").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();

		const monthPicker = this.shadowRoot.querySelector("[ui5-monthpicker]");
		monthPicker.selectedDates = [...this.selectedDates];
		const currentMonthIndex = monthPicker._itemNav._getItems().findIndex(item => {
			const calDate = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000, this._primaryCalendarType);
			return calDate.getMonth() === this._calendarDate.getMonth();
		});
		monthPicker._itemNav.currentIndex = currentMonthIndex;
		this._header._isMonthButtonHidden = true;
	}

	_showYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		this._yearPicker.timestamp = this._timestamp;
		this._yearPicker._selectedYear = this._calendarDate.getYear();
		this._yearPicker._hidden = false;
		this._oMonth._hidden = true;

		const calendarRect = this.shadowRoot.querySelector(".ui5-cal-root").getBoundingClientRect();

		this._calendarWidth = calendarRect.width.toString();
		this._calendarHeight = calendarRect.height.toString();

		const yearPicker = this.shadowRoot.querySelector("[ui5-yearpicker]");
		yearPicker.selectedDates = [...this.selectedDates];
		const currentYearIndex = yearPicker._itemNav._getItems().findIndex(item => {
			const calDate = CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000, this._primaryCalendarType);
			return calDate.getYear() === this._calendarDate.getYear();
		});
		yearPicker._itemNav.currentIndex = currentYearIndex;
	}

	_hideMonthPicker() {
		this._monthPicker = Object.assign({}, this._monthPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		if (this._yearPicker._hidden) {
			this._oMonth._hidden = false;
		}
		this._monthPicker._hidden = true;
		this._header._isMonthButtonHidden = false;
	}

	_hideYearPicker() {
		this._yearPicker = Object.assign({}, this._yearPicker);
		this._oMonth = Object.assign({}, this._oMonth);

		if (this._monthPicker._hidden) {
			this._oMonth._hidden = false;
		}
		this._yearPicker._hidden = true;
	}

	_isYearInRange(timestamp, yearsoffset, minYear, maxYear) {
		if (timestamp) {
			const oCalDate = CalendarDate.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
			oCalDate.setMonth(0);
			oCalDate.setDate(1);
			oCalDate.setYear(oCalDate.getYear() + yearsoffset);
			return oCalDate.getYear() >= minYear && oCalDate.getYear() <= maxYear;
		}
	}

	get classes() {
		return {
			main: {
				"ui5-cal-root": true,
			},
			dayPicker: {
				".ui5-daypicker--hidden": !this._yearPicker._hidden || !this._monthPicker._hidden,
			},
			yearPicker: {
				"ui5-yearpicker--hidden": this._yearPicker._hidden,
			},
			monthPicker: {
				"ui5-monthpicker--hidden": this._monthPicker._hidden,
			},
		};
	}

	/**
	 * Checks if a date is in range between minimum and maximum date
	 * @param {object} value
	 * @public
	 */
	isInValidRange(value = "") {
		const pickedDate = CalendarDate.fromTimestamp(value).toLocalJSDate(),
			minDate = this._minDate && new Date(this._minDate),
			maxDate = this._maxDate && new Date(this._maxDate);

		if (minDate && maxDate) {
			if (minDate <= pickedDate && maxDate >= pickedDate) {
				return true;
			}
		} else if (minDate && !maxDate) {
			if (minDate <= pickedDate) {
				return true;
			}
		} else if (maxDate && !minDate) {
			if (maxDate >= pickedDate) {
				return true;
			}
		} else if (!maxDate && !minDate) {
			return true;
		}

		return false;
	}

	get styles() {
		return {
			main: {
				"height": `${this._calendarHeight ? `${this._calendarHeight}px` : "auto"}`,
				"width": `${this._calendarWidth ? `${this._calendarWidth}px` : "auto"}`,
			},
		};
	}

	static get dependencies() {
		return [
			CalendarHeader,
			DayPicker,
			MonthPicker,
			YearPicker,
		];
	}
}

Calendar.define();

export default Calendar;
