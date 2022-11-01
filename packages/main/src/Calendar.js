import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isF4,
	isF4Shift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import * as CalendarDateComponent from "./CalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import CalendarHeader from "./CalendarHeader.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";

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
	fastNavigation: true,
	properties: /** @lends sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Defines the type of selection used in the calendar component.
		 * Accepted property values are:<br>
		 * <ul>
		 * <li><code>CalendarSelectionMode.Single</code> - enables a single date selection.(default value)</li>
		 * <li><code>CalendarSelectionMode.Range</code> - enables selection of a date range.</li>
		 * <li><code>CalendarSelectionMode.Multiple</code> - enables selection of multiple dates.</li>
		 * </ul>
		 * @type {sap.ui.webcomponents.main.types.CalendarSelectionMode}
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
		 * <b>Note:</b> For calendars other than Gregorian,
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

		_previousButtonDisabled: {
			type: Boolean,
		},

		_nextButtonDisabled: {
			type: Boolean,
		},

		_headerMonthButtonText: {
			type: String,
		},

		_headerYearButtonText: {
			type: String,
		},

		_headerYearButtonTextSecType: {
			type: String,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Defines the selected date or dates (depending on the <code>selectionMode</code> property) for this calendar as instances of <code>ui5-date</code>
		 *
		 * @type {sap.ui.webcomponents.main.ICalendarDate[]}
		 * @slot dates
		 * @public
		 */
		"default": {
			propertyName: "dates",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Calendar.prototype */ {
		/**
		 * Fired when the selected dates change.
		 * <b>Note:</b> If you call <code>preventDefault()</code> for this event, the component will not
		 * create instances of <code>ui5-date</code> for the newly selected dates. In that case you should do this manually.
		 *
		 * @event sap.ui.webcomponents.main.Calendar#selected-dates-change
		 * @allowPreventDefault
		 * @param {Array} values The selected dates
		 * @param {Array} dates The selected dates as UTC timestamps
		 * @public
		 */
		"selected-dates-change": {
			detail: {
				dates: { type: Array },
				values: { type: Array },
			},
		},

		"show-month-press": {},
		"show-year-press": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-calendar</code> component allows users to select one or more dates.
 * <br><br>
 * Currently selected dates are represented with instances of <code>ui5-date</code> as
 * children of the <code>ui5-calendar</code>. The value property of each <code>ui5-date</code> must be a
 * date string, correctly formatted according to the <code>ui5-calendar</code>'s <code>formatPattern</code> property.
 * Whenever the user changes the date selection, <code>ui5-calendar</code> will automatically create/remove instances
 * of <code>ui5-date</code> in itself, unless you prevent this behavior by calling <code>preventDefault()</code> for the
 * <code>selected-dates-change</code> event. This is useful if you want to control the selected dates externally.
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
 * The user can confirm a date selection by pressing over a date inside the days view.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-calendar</code> provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * - Day picker: <br>
 * <ul>
 * <li>[F4] - Shows month picker</li>
 * <li>[SHIFT] + [F4] - Shows year picker</li>
 * <li>[PAGEUP] - Navigate to the previous month</li>
 * <li>[PAGEDOWN] - Navigate to the next month</li>
 * <li>[SHIFT] + [PAGEUP] - Navigate to the previous year</li>
 * <li>[SHIFT] + [PAGEDOWN] - Navigate to the next year</li>
 * <li>[CTRL] + [SHIFT] + [PAGEUP] - Navigate ten years backwards</li>
 * <li>[CTRL] + [SHIFT] + [PAGEDOWN] - Navigate ten years forwards</li>
 * <li>[HOME] - Navigate to the first day of the week</li>
 * <li>[END] - Navigate to the last day of the week</li>
 * <li>[CTRL] + [HOME] - Navigate to the first day of the month</li>
 * <li>[CTRL] + [END] - Navigate to the last day of the month</li>
 * </ul>
 * <br>
 * - Month picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous year</li>
 * <li>[PAGEDOWN] - Navigate to the next year</li>
 * <li>[HOME] - Navigate to the first month of the current row</li>
 * <li>[END] - Navigate to the last month of the current row</li>
 * <li>[CTRL] + [HOME] - Navigate to the first month of the current year</li>
 * <li>[CTRL] + [END] - Navigate to the last month of the year</li>
 * </ul>
 * <br>
 * - Year picker: <br>
 * <ul>
 * <li>[PAGEUP] - Navigate to the previous year range</li>
 * <li>[PAGEDOWN] - Navigate the next year range</li>
 * <li>[HOME] - Navigate to the first year of the current row</li>
 * <li>[END] - Navigate to the last year of the current row</li>
 * <li>[CTRL] + [HOME] - Navigate to the first year of the current year range</li>
 * <li>[CTRL] + [END] - Navigate to the last year of the current year range</li>
 * </ul>
 * <br>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
* <h3>Calendar types</h3>
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the <code>primaryCalendarType</code> property and import one or more of the following modules:
 * <br><br>
 *
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";</code>
 * <br><br>
 *
 * Or, you can use the global configuration and set the <code>calendarType</code> key:
 * <br>
 * <code>
 * &lt;script data-id="sap-ui-config" type="application/json"&gt;
 * {
 *	"calendarType": "Japanese"
 * }
 * &lt;/script&gt;
 * </code>
 *
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Calendar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Calendar
 * @extends sap.ui.webcomponents.main.CalendarPart
 * @tagname ui5-calendar
 * @appenddocs CalendarDate
 * @public
 * @since 1.0.0-rc.11
 */
class Calendar extends CalendarPart {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return CalendarTemplate;
	}

	static get styles() {
		return calendarCSS;
	}

	/**
	 * @private
	 */
	get _selectedDatesTimestamps() {
		return this.dates.map(date => {
			const value = date.value;
			return value && !!this.getFormat().parse(value) ? this._getTimeStampFromString(value) / 1000 : undefined;
		}).filter(date => !!date);
	}

	/**
	 * @private
	 */
	_setSelectedDates(selectedDates) {
		const selectedValues = selectedDates.map(timestamp => this.getFormat().format(new Date(timestamp * 1000), true)); // Format as UTC
		const valuesInDOM = [...this.dates].map(dateElement => dateElement.value);

		// Remove all elements for dates that are no longer selected
		this.dates.filter(dateElement => !selectedValues.includes(dateElement.value)).forEach(dateElement => {
			this.removeChild(dateElement);
		});

		// Create tags for the selected dates that don't already exist in DOM
		selectedValues.filter(value => !valuesInDOM.includes(value)).forEach(value => {
			const dateElement = document.createElement(CalendarDateComponent.default.getMetadata().getTag());
			dateElement.value = value;
			this.appendChild(dateElement);
		});
	}

	async onAfterRendering() {
		await renderFinished(); // Await for the current picker to render and then ask if it has previous/next pages
		this._previousButtonDisabled = !this._currentPickerDOM._hasPreviousPage();
		this._nextButtonDisabled = !this._currentPickerDOM._hasNextPage();

		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
		const localeData = getCachedLocaleDataInstance(getLocale());
		this._headerMonthButtonText = localeData.getMonthsStandAlone("wide", this.primaryCalendarType)[this._calendarDate.getMonth()];

		if (this._currentPicker === "year") {
			const rangeStart = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			const rangeEnd = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			rangeStart.setYear(this._currentPickerDOM._firstYear);
			rangeEnd.setYear(this._currentPickerDOM._lastYear);

			this._headerYearButtonText = `${yearFormat.format(rangeStart.toLocalJSDate(), true)} - ${yearFormat.format(rangeEnd.toLocalJSDate(), true)}`;
		} else {
			this._headerYearButtonText = String(yearFormat.format(this._localDate, true));
		}

		this.secondaryCalendarType && this._setSecondaryCalendarTypeButtonText();
	}

	/**
	 * The user clicked the "month" button in the header
	 */
	onHeaderShowMonthPress(event) {
		this._currentPickerDOM._autoFocus = false;
		this._currentPicker = "month";
		this.fireEvent("show-month-press", event);
	}

	/**
	 * The user clicked the "year" button in the header
	 */
	onHeaderShowYearPress(event) {
		this._currentPickerDOM._autoFocus = false;
		this._currentPicker = "year";
		this.fireEvent("show-year-press", event);
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

	_setSecondaryCalendarTypeButtonText() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const yearFormatSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType });
		this._headerMonthButtonTextInSexType = localeData.getMonthsStandAlone("wide", this.secondaryCalendarType)[this._calendarDate.getMonth()];

		if (this._currentPicker === "year") {
			const rangeStart = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			const rangeEnd = new CalendarDate(this._calendarDate, this._primaryCalendarType);
			rangeStart.setYear(this._currentPickerDOM._firstYear);
			rangeEnd.setYear(this._currentPickerDOM._lastYear);

			const rangeStartSecType = transformDateToSecondaryType(this.primaryCalendarType, this.secondaryCalendarType, rangeStart.valueOf() / 1000, true)
				.firstDate;
			const rangeEndSecType = transformDateToSecondaryType(this.primaryCalendarType, this.secondaryCalendarType, rangeEnd.valueOf() / 1000, true)
				.lastDate;
			this._headerYearButtonTextSecType = `${yearFormatSecType.format(rangeStartSecType.toLocalJSDate(), true)} - ${yearFormatSecType.format(rangeEndSecType.toLocalJSDate(), true)}`;
		} else {
			this._headerYearButtonTextSecType = String(yearFormatSecType.format(this._localDate, true));
		}
	}

	get secondaryCalendarTypeButtonText() {
		if (!this.secondaryCalendarType) {
			return;
		}

		const localDate = new Date(this._timestamp * 1000);
		const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType });
		const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, this._timestamp);
		const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this.secondaryCalendarType);
		const secondYearText = secondYearFormat.format(localDate, true);

		return {
			yearButtonText: secondYearText,
			monthButtonText: secondMonthInfo.text,
			monthButtonInfo: secondMonthInfo.textInfo,
		};
	}

	/**
	 * The month button is hidden when the month picker or year picker is shown
	 * @returns {boolean}
	 * @private
	 */
	get _isHeaderMonthButtonHidden() {
		return this._currentPicker === "month" || this._currentPicker === "year";
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
		const datesValues = selectedDates.map(ts => {
			const calendarDate = CalendarDate.fromTimestamp(ts * 1000, this._primaryCalendarType);
			return this.getFormat().format(calendarDate.toUTCJSDate(), true);
		});

		this.timestamp = timestamp;
		const defaultPrevented = !this.fireEvent("selected-dates-change", { timestamp, dates: [...selectedDates], values: datesValues }, true);
		if (!defaultPrevented) {
			this._setSelectedDates(selectedDates);
		}
	}

	onSelectedMonthChange(event) {
		this.timestamp = event.detail.timestamp;
		this._currentPicker = "day";
		this._currentPickerDOM._autoFocus = true;
	}

	onSelectedYearChange(event) {
		this.timestamp = event.detail.timestamp;
		this._currentPicker = "day";
		this._currentPickerDOM._autoFocus = true;
	}

	onNavigate(event) {
		this.timestamp = event.detail.timestamp;
	}

	_onkeydown(event) {
		if (isF4(event) && this._currentPicker !== "month") {
			this._currentPicker = "month";
		}

		if (isF4Shift(event) && this._currentPicker !== "year") {
			this._currentPicker = "year";
		}
	}

	/**
	 * Returns an array of UTC timestamps, representing the selected dates.
	 * @protected
	 * @deprecated
	 */
	get selectedDates() {
		return this._selectedDatesTimestamps;
	}

	/**
	 * Creates instances of <code>ui5-date</code> inside this <code>ui5-calendar</code> with values, equal to the provided UTC timestamps
	 * @protected
	 * @deprecated
	 * @param selectedDates Array of UTC timestamps
	 */
	set selectedDates(selectedDates) {
		this._setSelectedDates(selectedDates);
	}

	static get dependencies() {
		return [
			CalendarDateComponent.default,
			CalendarHeader,
			DayPicker,
			MonthPicker,
			YearPicker,
		];
	}
}

Calendar.define();

export default Calendar;
