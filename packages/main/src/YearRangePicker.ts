import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type LocaleT from "sap/ui/core/Locale";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";
import { YEAR_RANGE_PICKER_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Template
import YearRangePickerTemplate from "./YearRangePickerTemplate.js";

// Styles
import yearRangePickerStyles from "./generated/themes/YearRangePicker.css.js";
import yearPickerStyles from "./generated/themes/YearPicker.css.js";

const isBetweenInclusive = (x: number, num1: number, num2: number) => x >= Math.min(num1, num2) && x <= Math.max(num1, num2);

type YearRange = {
	timestamp: string;
	_tabIndex: number;
	focusRef: boolean;
	selected: boolean;
	ariaSelected: boolean;
	range: string;
	rangeInSecType: string | undefined;
	disabled: boolean;
	ariaDisabled: boolean | undefined;
	classes: string;
	// parts: string; - todo
}

type YearRanges = Array<Array<YearRange>>;

type YearRangePickerChangeEventDetail = {
	dates: Array<number>,
	timestamp: number,
}

type YearRangePickerNavigateEventDetail = {
	timestamp: number,
}

/**
 * @class
 *
 * Displays year ranges which help navigate through years faster.
 * @constructor
 * @extends CalendarPart
 * @private
 */
@customElement({
	tag: "ui5-yearrange-picker",
	styles: [
		yearRangePickerStyles,
		yearPickerStyles,
	],
	template: YearRangePickerTemplate,
})

/**
 * Fired when the user selects a year range via "Space", "Enter" or click.
 * todo - implement
 */
@event("change", {
	bubbles: true,
})
/**
 * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
 */
@event("navigate", {
	bubbles: true,
})
class YearRangePicker extends CalendarPart implements ICalendarPicker {
	eventDetails!: CalendarPart["eventDetails"] & {
		"change": YearRangePickerChangeEventDetail,
		"navigate": YearRangePickerNavigateEventDetail,
	}

	/**
	 * An array of UTC timestamps representing the selected date
	 * or dates depending on the capabilities of the picker component.
	 * @default []
	 */
	@property({ type: Array })
	selectedDates: Array<number> = [];

	rangeSize: number = 8;

	@property({ type: Array })
	_yearRanges: YearRanges = [];

	@property({ type: Boolean, noAttribute: true })
	_hidden = false;

	_firstYear?: number;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get roleDescription() {
		return YearRangePicker.i18nBundle.getText(YEAR_RANGE_PICKER_DESCRIPTION);
	}

	onBeforeRendering() {
		this._buildYears();
	}

	_getPageSize() {
		return 8;
	}

	_getRowSize() {
		const longLanguage = false;
		return longLanguage ? 1 : 2;
	}

	_calculateFirstYear() {
		const pageSize = this._getPageSize();
		const currentYear = this._calendarDate.getYear();

		if (!this._firstYear) {
			this._firstYear = currentYear - pageSize / 2;
		}
	}

	_buildYears() { // todo
		if (this._hidden) {
			return;
		}

		const locale = getLocale() as unknown as LocaleT;
		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
		const yearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, locale);

		const pageSize = this._getPageSize();
		const rowSize = this._getRowSize();

		const calendarDate = this._calendarDate;
		const minYear = this._minDate.getYear();
		const maxYear = this._maxDate.getYear();

		let timestamp = this.timestamp! * 1000;
		const firstDate = CalendarDate.fromTimestamp(timestamp, this._primaryCalendarType);
		this._firstYear = firstDate.getYear();

		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		tempDate.setYear(this._firstYear);

		const rangeIntervals: YearRanges = [];

		for (let i = 0; i < pageSize; i++) {
			const endDate = new CalendarDate(tempDate, this._primaryCalendarType);
			endDate.setYear(endDate.getYear() + this.rangeSize - 1);

			timestamp = tempDate.valueOf() / 1000;
			const isFocused = isBetweenInclusive(calendarDate.getYear(), tempDate.getYear(), endDate.getYear());
			const isSelected = this._checkHasSelectedDatesInRange(tempDate.getYear(), endDate.getYear());
			const yearRangeText = `${yearFormat.format(tempDate.toLocalJSDate())} - ${yearFormat.format(endDate.toLocalJSDate())}`;
			const secYearRangeText = `${yearFormatInSecType.format(tempDate.toLocalJSDate())} - ${yearFormatInSecType.format(endDate.toLocalJSDate())}`;
			const isDisabled = !(isBetweenInclusive(tempDate.getYear(), minYear, maxYear)
								|| isBetweenInclusive(endDate.getYear(), minYear, maxYear));

			const yearRange: YearRange = {
				timestamp: timestamp.toString(),
				_tabIndex: isFocused ? 0 : -1,
				focusRef: isFocused,
				selected: isSelected,
				ariaSelected: isSelected,
				range: yearRangeText,
				rangeInSecType: secYearRangeText,
				disabled: isDisabled,
				ariaDisabled: isDisabled,
				classes: "ui5-yrp-item",
			};

			if (isSelected) {
				yearRange.classes += " ui5-yrp-item--selected";
				// todo - yearRange.parts += " year-cell-selected";
			}

			if (isDisabled) {
				yearRange.classes += " ui5-yrp-item--disabled";
			}

			if (this.hasSecondaryCalendarType) {
				yearRange.classes += " ui5-yrp-item-secondary-type";
			}

			const intervalIndex = Math.floor(i / rowSize);

			if (rangeIntervals[intervalIndex]) {
				rangeIntervals[intervalIndex].push(yearRange);
			} else {
				rangeIntervals[intervalIndex] = [yearRange];
			}

			tempDate.setYear(tempDate.getYear() + this.rangeSize);
		}

		this._yearRanges = rangeIntervals;
	}

	_checkHasSelectedDatesInRange(startYear: number, endYear: number) {
		return this.selectedDates.some(itemTimestamp => {
			const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
			return isBetweenInclusive(date.getYear(), startYear, endYear);
		});
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.focus();
		}
	}

	/**
	 * Sets the timestamp to an absolute value.
	 * @param value
	 * @private
	 */
	_setTimestamp(value: number) {
		this._safelySetTimestamp(value);
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * User clicked with the mouser or pressed Enter/Space
	 * @param e
	 * @private
	 */
	_selectYearRange(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLElement;

		if (target.className.indexOf("ui5-yrp-item") === -1) {
			return;
		}

		const timestamp = this._getTimestampFromDom(target);
		this._safelySetTimestamp(timestamp);

		this.fireDecoratorEvent("change", {
			timestamp: this.timestamp!,
			dates: this.selectedDates,
		});
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasPreviousPage(): boolean {
		return this._firstYear! > this._minDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasNextPage(): boolean {
		const amountInYears = this._getPageSize() * this.rangeSize;
		return this._firstYear! + amountInYears - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
	 * @protected
	 */
	_showPreviousPage() {
		const pageSize = this._getPageSize();
		this._modifyTimestampBy(-pageSize);
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(this._getPageSize());
	}

	/**
	 * Modifies timestamp by a given amount of year ranges and, if necessary, loads the prev/next page.
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount: number) {
		// Modify the current timestamp
		const amountInYears = amount * this.rangeSize;
		this._safelyModifyTimestampBy(amountInYears, "year");

		// Notify the calendar to update its timestamp
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}
}

YearRangePicker.define();

export default YearRangePicker;
export type {
	YearRangePickerChangeEventDetail,
	YearRangePickerNavigateEventDetail,
};
