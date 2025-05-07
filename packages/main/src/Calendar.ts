import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import CalendarDateComponent from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isF4,
	isF4Shift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import CalendarDate from "./CalendarDate.js";
import CalendarPart from "./CalendarPart.js";
import CalendarHeader from "./CalendarHeader.js";
import DayPicker from "./DayPicker.js";
import type { DayPickerChangeEventDetail } from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import type { MonthPickerChangeEventDetail } from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import type { YearPickerChangeEventDetail } from "./YearPicker.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import CalendarLegend from "./CalendarLegend.js";
import type { CalendarLegendItemSelectionChangeEventDetail } from "./CalendarLegend.js";
import SpecialCalendarDate from "./SpecialCalendarDate.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";

// Default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Template
import CalendarTemplate from "./generated/templates/CalendarTemplate.lit.js";

// Styles
import calendarCSS from "./generated/themes/Calendar.css.js";

interface ICalendarPicker {
	_showPreviousPage: () => void,
	_showNextPage: () => void,
	_hasPreviousPage: () => boolean,
	_hasNextPage: () => boolean,
	_autoFocus?: boolean,
	_firstYear?: number,
	_lastYear?: number,
}

type CalendarSelectedDatesChangeEventDetail = {
	values: Array<string>,
	dates: Array<number>,
	timestamp: number | undefined,
}

type SpecialCalendarDateT = {
	specialDateTimestamp: number;
	type: `${CalendarLegendItemType}`;
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-calendar` component allows users to select one or more dates.
 *
 * Currently selected dates are represented with instances of `ui5-date` as
 * children of the `ui5-calendar`. The value property of each `ui5-date` must be a
 * date string, correctly formatted according to the `ui5-calendar`'s `formatPattern` property.
 * Whenever the user changes the date selection, `ui5-calendar` will automatically create/remove instances
 * of `ui5-date` in itself, unless you prevent this behavior by calling `preventDefault()` for the
 * `selected-dates-change` event. This is useful if you want to control the selected dates externally.
 *
 * ### Usage
 *
 * The user can navigate to a particular date by:
 *
 * - Pressing over a month inside the months view
 * - Pressing over an year inside the years view
 *
 * The user can confirm a date selection by pressing over a date inside the days view.
 *
 * ### Keyboard Handling
 * The `ui5-calendar` provides advanced keyboard handling.
 * When a picker is showed and focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 *
 * - Day picker:
 *
 * - [F4] - Shows month picker
 * - [Shift] + [F4] - Shows year picker
 * - [Page Up] - Navigate to the previous month
 * - [Page Down] - Navigate to the next month
 * - [Shift] + [Page Up] - Navigate to the previous year
 * - [Shift] + [Page Down] - Navigate to the next year
 * - [Ctrl] + [Shift] + [Page Up] - Navigate ten years backwards
 * - [Ctrl] + [Shift] + [Page Down] - Navigate ten years forwards
 * - [Home] - Navigate to the first day of the week
 * - [End] - Navigate to the last day of the week
 * - [Ctrl] + [Home] - Navigate to the first day of the month
 * - [Ctrl] + [End] - Navigate to the last day of the month
 *
 * - Month picker:
 *
 * - [Page Up] - Navigate to the previous year
 * - [Page Down] - Navigate to the next year
 * - [Home] - Navigate to the first month of the current row
 * - [End] - Navigate to the last month of the current row
 * - [Ctrl] + [Home] - Navigate to the first month of the current year
 * - [Ctrl] + [End] - Navigate to the last month of the year
 *
 * - Year picker:
 *
 * - [Page Up] - Navigate to the previous year range
 * - [Page Down] - Navigate the next year range
 * - [Home] - Navigate to the first year of the current row
 * - [End] - Navigate to the last year of the current row
 * - [Ctrl] + [Home] - Navigate to the first year of the current year range
 * - [Ctrl] + [End] - Navigate to the last year of the current year range
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### Calendar types
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the `primaryCalendarType` property and import one or more of the following modules:
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";`
 *
 * `import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";`
 *
 * Or, you can use the global configuration and set the `calendarType` key:
 *
 * ```html
 * <script data-id="sap-ui-config" type="application/json">
 * 	{
 * 		"calendarType": "Japanese"
 * 	}
 * </script>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Calendar.js";`
 * @constructor
 * @extends CalendarPart
 * @public
 * @since 1.0.0-rc.11
 */
@customElement({
	tag: "ui5-calendar",
	fastNavigation: true,
	template: CalendarTemplate,
	styles: calendarCSS,
	dependencies: [
		CalendarDate,
		CalendarHeader,
		DayPicker,
		MonthPicker,
		YearPicker,
		CalendarLegend,
	],
})
/**
 * Fired when the selected dates change.
 *
 * **Note:** If you call `preventDefault()` for this event, the component will not
 * create instances of `ui5-date` for the newly selected dates. In that case you should do this manually.
 * @allowPreventDefault
 * @param {Array<string>} values The selected dates
 * @param {Array<number>} dates The selected dates as UTC timestamps
 * @public
 */
@event<CalendarSelectedDatesChangeEventDetail>("selected-dates-change", {
	detail: {
		/**
		 * @public
		 */
		dates: { type: Array },
		/**
		 * @public
		 */
		values: { type: Array },

		timestamp: { type: Number },
	},
})

@event("show-month-view")
@event("show-year-view")
class Calendar extends CalendarPart {
	/**
	 * Defines the type of selection used in the calendar component.
	 * Accepted property values are:
	 *
	 * - `CalendarSelectionMode.Single` - enables a single date selection.(default value)
	 * - `CalendarSelectionMode.Range` - enables selection of a date range.
	 * - `CalendarSelectionMode.Multiple` - enables selection of multiple dates.
	 * @default "Single"
	 * @public
	 */
	@property({
		type: CalendarSelectionMode,
		defaultValue: CalendarSelectionMode.Single,
	})
	selectionMode!: `${CalendarSelectionMode}`;

	/**
	 * Defines the visibility of the week numbers column.
	 *
	 * **Note:** For calendars other than Gregorian,
	 * the week numbers are not displayed regardless of what is set.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideWeekNumbers!: boolean;

	/**
	 * Which picker is currently visible to the user: day/month/year
	 * @private
	 */
	@property({ defaultValue: "day" })
	_currentPicker!: string;

	@property({ type: Boolean })
	_previousButtonDisabled!: boolean;

	@property({ type: Boolean })
	_nextButtonDisabled!: boolean;

	@property()
	_headerMonthButtonText!: string;

	@property()
	_headerYearButtonText!: string;

	@property()
	_headerYearButtonTextSecType!: string;

	@property({ type: CalendarPickersMode, defaultValue: CalendarPickersMode.DAY_MONTH_YEAR, noAttribute: true })
	_pickersMode!: CalendarPickersMode;

	_valueIsProcessed!: boolean

	/**
	 * Defines the calendar legend of the component.
	 * @public
	 * @since 1.23.0
	 */
	@slot({ type: HTMLElement })
	calendarLegend!: Array<CalendarLegend>;

	/**
	 * Defines the selected date or dates (depending on the `selectionMode` property)
	 * for this calendar as instances of `ui5-date`.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	dates!: Array<CalendarDate>;

	/**
	 * Defines the special dates, visually emphasized in the calendar.
	 * @public
	 * @since 1.23.0
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	specialDates!: Array<SpecialCalendarDate>;

	/**
	 * Defines the selected item type of the calendar legend item (if such exists).
	 * @private
	 */
	@property({ type: CalendarLegendItemType, defaultValue: CalendarLegendItemType.None })
	_selectedItemType!: `${CalendarLegendItemType}`;

	/**
	 * @private
	 */
	get _selectedDatesTimestamps(): Array<number> {
		return this.dates.map(date => {
			const value = date.value;
			const validValue = value && !!this.getFormat().parse(value);
			return validValue ? this._getTimeStampFromString(value)! / 1000 : undefined;
		}).filter((date): date is number => !!date);
	}

	constructor() {
		super();

		this._valueIsProcessed = false;
	}

	/**
	 * @private
	 */
	_setSelectedDates(selectedDates: Array<number>) {
		const selectedValues = selectedDates.map(timestamp => this.getFormat().format(new Date(timestamp * 1000), true)); // Format as UTC
		const valuesInDOM = [...this.dates].map(dateElement => dateElement.value);

		// Remove all elements for dates that are no longer selected
		this.dates.filter(dateElement => !selectedValues.includes(dateElement.value)).forEach(dateElement => {
			this.removeChild(dateElement);
		});

		// Create tags for the selected dates that don't already exist in DOM
		selectedValues.filter(value => !valuesInDOM.includes(value)).forEach(value => {
			const dateElement = document.createElement(CalendarDate.getMetadata().getTag()) as CalendarDate;
			dateElement.value = value;
			this.appendChild(dateElement);
		});
	}

	_isValidCalendarDate(dateString: string): boolean {
		const date = this.getFormat().parse(dateString);
		return !!date;
	}

	get _specialCalendarDates() {
		const hasSelectedType = this._specialDates.some(date => date.type === this._selectedItemType);
		const validSpecialDates = this._specialDates.filter(date => {
			const dateType = date.type;
			const dateValue = date.value;
			const isTypeMatch = hasSelectedType
				? (dateType === this._selectedItemType || dateType === "Working" || dateType === "NonWorking")
				: true;
			return isTypeMatch && dateValue && this._isValidCalendarDate(dateValue);
		});

		const uniqueDates = new Set();
		const uniqueSpecialDates: Array<SpecialCalendarDateT> = [];

		validSpecialDates.forEach(date => {
			const dateFromValue = this.getFormat().parse(date.value) as Date | UI5Date;
			const timestamp = dateFromValue.getTime();

			if (!uniqueDates.has(timestamp)) {
				uniqueDates.add(timestamp);
				const specialDateTimestamp = CalendarDateComponent.fromLocalJSDate(dateFromValue).valueOf() / 1000;
				const type = date.type;
				uniqueSpecialDates.push({ specialDateTimestamp, type });
			}
		});

		return uniqueSpecialDates;
	}

	_onCalendarLegendSelectionChange(e: CustomEvent<CalendarLegendItemSelectionChangeEventDetail>) {
		const defaultTypes = ["Working", "NonWorking", "Selected", "Today"];
		this._selectedItemType = e.detail.item.type;

		if (defaultTypes.includes(this._selectedItemType)) {
			this._selectedItemType = "None"; // In order to avoid filtering of default types
		}
		this._currentPickerDOM._autoFocus = false;
	}

	/**
	 * Makes sure that _currentPicker is always set to a value, allowed by _pickersMode
	 */
	_normalizeCurrentPicker() {
		if (this._currentPicker === "day" && this._pickersMode !== CalendarPickersMode.DAY_MONTH_YEAR) {
			this._currentPicker = "month";
		}

		if (this._currentPicker === "month" && this._pickersMode === CalendarPickersMode.YEAR) {
			this._currentPicker = "year";
		}
	}

	onBeforeRendering() {
		this._normalizeCurrentPicker();

		if (!this._valueIsProcessed) {
			if (this._selectedDatesTimestamps) {
				this.timestamp = this._selectedDatesTimestamps[0];
			}

			this._valueIsProcessed = true;
		}
	}

	async onAfterRendering() {
		await renderFinished(); // Await for the current picker to render and then ask if it has previous/next pages
		this._previousButtonDisabled = !this._currentPickerDOM._hasPreviousPage();
		this._nextButtonDisabled = !this._currentPickerDOM._hasNextPage();

		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
		const localeData = getCachedLocaleDataInstance(getLocale());
		this._headerMonthButtonText = localeData.getMonthsStandAlone("wide", this.primaryCalendarType)[this._calendarDate.getMonth()];

		if (this._currentPicker === "year") {
			const rangeStart = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
			const rangeEnd = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
			rangeStart.setYear(this._currentPickerDOM._firstYear!);
			rangeEnd.setYear(this._currentPickerDOM._lastYear!);

			this._headerYearButtonText = `${yearFormat.format(rangeStart.toLocalJSDate(), true)} - ${yearFormat.format(rangeEnd.toLocalJSDate(), true)}`;
		} else {
			this._headerYearButtonText = String(yearFormat.format(this._localDate, true));
		}

		this._secondaryCalendarType && this._setSecondaryCalendarTypeButtonText();
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.reason === "childchange") {
			this._valueIsProcessed = false;
		}
	}

	/**
	 * The user clicked the "month" button in the header
	 */
	onHeaderShowMonthPress(e: CustomEvent) {
		this._currentPickerDOM._autoFocus = false;
		this._currentPicker = "month";
		this.fireEvent("show-month-view", e);
	}

	/**
	 * The user clicked the "year" button in the header
	 */
	onHeaderShowYearPress(e: CustomEvent) {
		this._currentPickerDOM._autoFocus = false;
		this._currentPicker = "year";
		this.fireEvent("show-year-view", e);
	}

	get _currentPickerDOM() {
		// Calendar's shadowRoot and all the pickers are always present - the "!" is safe to be used.
		return this.shadowRoot!.querySelector(`[ui5-${this._currentPicker}picker]`)! as unknown as ICalendarPicker;
	}

	/**
	 * The year clicked the "Previous" button in the header
	 */
	onHeaderPreviousPress() {
		this._currentPickerDOM._showPreviousPage();

		if (this.calendarLegend) {
			this._currentPickerDOM._autoFocus = true;
		}
	}

	/**
	 * The year clicked the "Next" button in the header
	 */
	onHeaderNextPress() {
		this._currentPickerDOM._showNextPage();

		if (this.calendarLegend) {
			this._currentPickerDOM._autoFocus = true;
		}
	}

	_setSecondaryCalendarTypeButtonText() {
		const yearFormatSecType = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });

		if (this._currentPicker === "year") {
			const rangeStart = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
			const rangeEnd = new CalendarDateComponent(this._calendarDate, this._primaryCalendarType);
			rangeStart.setYear(this._currentPickerDOM._firstYear!);
			rangeEnd.setYear(this._currentPickerDOM._lastYear!);

			const rangeStartSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeStart.valueOf() / 1000, true)
				.firstDate;
			const rangeEndSecType = transformDateToSecondaryType(this.primaryCalendarType, this._secondaryCalendarType, rangeEnd.valueOf() / 1000, true)
				.lastDate;
			this._headerYearButtonTextSecType = `${yearFormatSecType.format(rangeStartSecType.toLocalJSDate(), true)} - ${yearFormatSecType.format(rangeEndSecType.toLocalJSDate(), true)}`;
		} else {
			this._headerYearButtonTextSecType = String(yearFormatSecType.format(this._localDate, true));
		}
	}

	get secondaryCalendarTypeButtonText() {
		if (!this.hasSecondaryCalendarType) {
			return;
		}

		const localDate = new Date(this._timestamp * 1000);
		const secondYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._secondaryCalendarType });
		const dateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this._secondaryCalendarType, this._timestamp);
		const secondMonthInfo = convertMonthNumbersToMonthNames(dateInSecType.firstDate.getMonth(), dateInSecType.lastDate.getMonth(), this._secondaryCalendarType);
		const secondYearText = secondYearFormat.format(localDate, true);

		return {
			yearButtonText: secondYearText,
			monthButtonText: secondMonthInfo.text,
			monthButtonInfo: secondMonthInfo.textInfo,
		};
	}

	/**
	 * The month button is hidden when the month picker or year picker is shown
	 * @private
	 */
	get _isHeaderMonthButtonHidden(): boolean {
		return this._currentPicker === "month" || this._currentPicker === "year";
	}

	/**
	 * The year button is hidden when the year picker is shown
	 * @private
	 */
	get _isHeaderYearButtonHidden(): boolean {
		return this._currentPicker === "year";
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

	_fireEventAndUpdateSelectedDates(selectedDates: Array<number>) {
		const datesValues = selectedDates.map(timestamp => {
			const calendarDate = CalendarDateComponent.fromTimestamp(timestamp * 1000, this._primaryCalendarType);
			return this.getFormat().format(calendarDate.toUTCJSDate(), true);
		});

		const defaultPrevented = !this.fireEvent<CalendarSelectedDatesChangeEventDetail>("selected-dates-change", { timestamp: this.timestamp, dates: [...selectedDates], values: datesValues }, true);
		if (!defaultPrevented) {
			this._setSelectedDates(selectedDates);
		}
	}

	onSelectedDatesChange(e: CustomEvent<DayPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;
		this._fireEventAndUpdateSelectedDates(e.detail.dates);
	}

	onSelectedMonthChange(e: CustomEvent<MonthPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;

		if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
			this._currentPicker = "day";
		} else {
			this._fireEventAndUpdateSelectedDates([this.timestamp]);
		}

		this._currentPickerDOM._autoFocus = true;
	}

	onSelectedYearChange(e: CustomEvent<YearPickerChangeEventDetail>) {
		this.timestamp = e.detail.timestamp;

		if (this._pickersMode === CalendarPickersMode.DAY_MONTH_YEAR) {
			this._currentPicker = "day";
		} else if (this._pickersMode === CalendarPickersMode.MONTH_YEAR) {
			this._currentPicker = "month";
		} else {
			this._fireEventAndUpdateSelectedDates([this.timestamp]);
		}

		this._currentPickerDOM._autoFocus = true;
	}

	onNavigate(e: CustomEvent) {
		this.timestamp = e.detail.timestamp;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isF4(e) && this._currentPicker !== "month") {
			this._currentPicker = "month";
			this.fireEvent("show-month-view", e);
		}

		if (isF4Shift(e) && this._currentPicker !== "year") {
			this._currentPicker = "year";
			this.fireEvent("show-year-view", e);
		}
	}

	_onLegendFocusOut() {
		this._selectedItemType = "None";
	}

	get _specialDates() {
		return this.getSlottedNodes<SpecialCalendarDate>("specialDates");
	}

	/**
	 * Returns an array of UTC timestamps, representing the selected dates.
	 * @protected
	 * @deprecated
	 */
	get selectedDates(): Array<number> {
		return this._selectedDatesTimestamps;
	}

	/**
	 * Creates instances of `ui5-date` inside this `ui5-calendar` with values, equal to the provided UTC timestamps
	 * @protected
	 * @deprecated
	 * @param selectedDates Array of UTC timestamps
	 */
	set selectedDates(selectedDates: Array<number>) {
		this._setSelectedDates(selectedDates);
	}
}

Calendar.define();

export default Calendar;
export type {
	ICalendarPicker,
	CalendarSelectedDatesChangeEventDetail,
	SpecialCalendarDateT,
};
