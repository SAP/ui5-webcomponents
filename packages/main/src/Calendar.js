import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import CalendarSelection from "@ui5/webcomponents-base/dist/types/CalendarSelection.js";
import {
	isF4,
	isF4Shift,
} from "@ui5/webcomponents-base/dist/Keys.js";
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

		/**
		 * Which picker is currently visible to the user: day/month/year
		 */
		_currentPicker: {
			type: String,
			defaultValue: "day",
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

	get _headerTexts() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType });

		return {
			month: localeData.getMonths("wide", this._primaryCalendarType)[this._month],
			year: yearFormat.format(this._localDate, true),
		};
	}

	/**
	 * The user clicked the "month" button in the header
	 */
	onHeaderShowMonthPress() {
		this._currentPicker = "month";
	}

	/**
	 * The user clicked the "year" button in the header
	 */
	onHeaderShowYearPress() {
		this._currentPicker = "year";
	}


	get _currentPickerDOM() {
		return this.shadowRoot.querySelector(`[ui5-${this._currentPicker}picker]`);
	}

	/**
	 * The year clicked the "Previous" button in the header
	 */
	onHeaderPreviousPress() {
		this._currentPickerDOM._showPreviousPage();
	}

	/**
	 * The year clicked the "Next" button in the header
	 */
	onHeaderNextPress() {
		this._currentPickerDOM._showNextPage();
	}

	get _headerButtonsState() {
		const minDateParsed = this.minDate && this.getFormat().parse(this.minDate);
		const maxDateParsed = this.maxDate && this.getFormat().parse(this.maxDate);

		let prevDisabled = false;
		let nextDisabled = false;

		const currentMonth = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getMonth();
		const currentYear = this.timestamp && CalendarDate.fromTimestamp(this.timestamp * 1000).getYear();

		if (this._currentPicker === "day") {
			if (this.minDate && minDateParsed.getMonth() === currentMonth && minDateParsed.getFullYear() === currentYear) {
				prevDisabled = true;
			}

			if (this.maxDate && maxDateParsed.getMonth() === currentMonth && maxDateParsed.getFullYear() === currentYear) {
				nextDisabled = true;
			}
		}

		if (this._currentPicker === "month") {
			if (this.minDate && currentYear === minDateParsed.getFullYear()) {
				prevDisabled = true;
			}

			if (this.maxDate && currentYear === maxDateParsed.getFullYear()) {
				nextDisabled = true;
			}
		}

		if (this._currentPicker === "year") {
			const cellsFromTheStart = 7;
			const cellsToTheEnd = 12;

			if (this.minDate && (currentYear - minDateParsed.getFullYear()) < cellsFromTheStart) {
				prevDisabled = true;
			}

			if (this.maxDate && (maxDateParsed.getFullYear() - currentYear) < cellsToTheEnd) {
				nextDisabled = true;
			}
		}

		return {
			prevDisabled,
			nextDisabled,
		};
	}

	/**
	 * The month button is only hidden when the month picker is shown
	 * @returns {boolean}
	 * @private
	 */
	get _isHeaderMonthButtonHidden() {
		return this._currentPicker === "month";
	}

	get _isDayPickerHidden() {
		return this._currentPicker !== "day";
	}

	get _isMonthPickerHidden() {
		return this._currentPicker !== "month";
	}

	get _isYearPickerHidden() {
		return this._currentPicker !== "year";
	}

	onSelectedDatesChange(event) {
		const timestamp = event.detail.timestamp;
		const selectedDates = event.detail.dates;

		this.timestamp = timestamp;
		this.selectedDates = selectedDates;
		this.fireEvent("selected-dates-change", { dates: [...selectedDates] });
	}

	onSelectedMonthChange(event) {
		this.timestamp = event.detail.timestamp;
		this._currentPicker = "day";
		this._autoFocus = true;
	}

	onSelectedYearChange(event) {
		this.timestamp = event.detail.timestamp;
		this._currentPicker = "day";
		this._autoFocus = true;
	}

	onNavigate(event) {
		this.timestamp = event.detail.timestamp;
	}

	_onkeydown(event) {
		if (isF4(event) && this._currentPicker === "day") {
			this._currentPicker = "month";
		}

		if (isF4Shift(event) && this._currentPicker === "day") {
			this._currentPicker = "year";
		}
	}

	get classes() {
		return {
			main: {
				"ui5-cal-root": true,
			},
			dayPicker: {
				"ui5-daypicker--hidden": this._isDayPickerHidden,
			},
			yearPicker: {
				"ui5-yearpicker--hidden": this._isYearPickerHidden,
			},
			monthPicker: {
				"ui5-monthpicker--hidden": this._isMonthPickerHidden,
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
