import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type LocaleT from "sap/ui/core/Locale";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import {
	isEnter,
	isSpace,
	isDown,
	isUp,
	isLeft,
	isRight,
	isHome,
	isEnd,
	isHomeCtrl,
	isEndCtrl,
	isPageUp,
	isPageDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker, CalendarYearRangeT } from "./Calendar.js";
import CalendarSelectionMode from "./types/CalendarSelectionMode.js";
import { YEAR_RANGE_PICKER_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";

// Template
import YearRangePickerTemplate from "./YearRangePickerTemplate.js";

// Styles
import yearRangePickerStyles from "./generated/themes/YearRangePicker.css.js";
import { getMaxCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";

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
	parts: string;
}

type YearRanges = Array<Array<YearRange>>;

type YearRangePickerChangeEventDetail = {
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
	],
	template: YearRangePickerTemplate,
})

/**
 * Fired when the user selects a year range via "Space", "Enter" or click.
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
	/**
	 * Defines the type of selection used in the parent calendar component.
	 * Note that CalendarSelection is not available for the YearRangePicker, this property is only to visualize the selected dates.
	 * @default "Single"
	 * @since 2.2.0
	 */
	@property()
	_selectionMode: `${CalendarSelectionMode}` = "Single";

	/**
	 * When selectionMode="Range" and the first year in the range is selected, this is the currently hovered or focused year.
	 *
	 * @private
	 */
	@property({ type: Number })
	_secondTimestamp?: number;

	@property({ type: Array })
	_yearRanges: YearRanges = [];

	@property({ type: Boolean, noAttribute: true })
	_hidden = false;

	@property({ noAttribute: true })
	_currentYearRange?: CalendarYearRangeT;

	_gridStartYear?: number;

	_rangeSize: number = 20;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get roleDescription() {
		return YearRangePicker.i18nBundle.getText(YEAR_RANGE_PICKER_DESCRIPTION);
	}

	onBeforeRendering() {
		if (this._hidden) {
			return;
		}

		this._calculateRangeSize();
		this._buildYears();
	}

	_shouldShowOneColumn() {
		const locale = getLocale() as unknown as LocaleT;
		const language = locale.getLanguage();
		const longLanguage = language === "zh" || language === "ja" || language === "ko" || language === "bg" || language === "mk" || language === "ru";

		return longLanguage && this.hasSecondaryCalendarType;
	}

	_getPageSize() {
		return this._shouldShowOneColumn() ? 6 : 8;
	}

	_getRowSize() {
		return this._shouldShowOneColumn() ? 1 : 2;
	}

	_getInitialFocusedIndex() {
		return 2;
	}

	_calculateRangeSize() {
		if (this.hasSecondaryCalendarType) {
			this._rangeSize = 8;
		}

		if (this._currentYearRange) {
			this._rangeSize = this._currentYearRange.endYear - this._currentYearRange.startYear + 1;
		}
	}

	_calculateGridStartYear() {
		const pageSize = this._getPageSize();
		const pageSizeInYears = this._rangeSize * pageSize;
		const yearsOffset = this._rangeSize * this._getInitialFocusedIndex();
		const currentStartYear = this._currentYearRange!.startYear;

		// On first load, current range should be the 3rd item in the grid
		if (!this._gridStartYear) {
			this._gridStartYear = currentStartYear - yearsOffset;
		}

		// If page navigation occured, update the current range start year
		if (currentStartYear < this._gridStartYear) {
			this._gridStartYear -= pageSizeInYears;
		} else if (currentStartYear >= this._gridStartYear + pageSizeInYears) {
			this._gridStartYear += pageSizeInYears;
		}

		// Normalize grid start year to be between the min and absolute max year
		const minYear = this._minDate.getYear();
		if (currentStartYear - pageSizeInYears < minYear) {
			this._gridStartYear = minYear;
		}

		const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear();
		if (currentStartYear + pageSizeInYears > absoluteMaxYear) {
			this._gridStartYear = absoluteMaxYear - pageSizeInYears + 1;
		}
	}

	_buildYears() {
		const locale = getLocale() as unknown as LocaleT;
		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
		const yearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, locale);

		const pageSize = this._getPageSize();
		const rowSize = this._getRowSize();

		const calendarDate = this._calendarDate;
		const minYear = this._minDate.getYear();
		const maxYear = this._maxDate.getYear();

		this._calculateGridStartYear();
		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		tempDate.setYear(this._gridStartYear!);

		const yearRanges: YearRanges = [];

		for (let i = 0; i < pageSize; i++) {
			const endDate = new CalendarDate(tempDate, this._primaryCalendarType);
			endDate.setYear(endDate.getYear() + this._rangeSize - 1);

			const timestamp = tempDate.valueOf() / 1000;
			const endTimestamp = endDate.valueOf() / 1000;

			const isFocused = isBetweenInclusive(calendarDate.getYear(), tempDate.getYear(), endDate.getYear());

			const isSelected = this._isYearRangeSelected(timestamp, endTimestamp);
			const isSelectedBetween = this._isInsideSelectionRange(timestamp);

			const yearRangeText = `${yearFormat.format(tempDate.toLocalJSDate())} - ${yearFormat.format(endDate.toLocalJSDate())}`;
			let secYearRangeText;
			if (this.hasSecondaryCalendarType) {
				secYearRangeText = `${yearFormatInSecType.format(tempDate.toLocalJSDate())} - ${yearFormatInSecType.format(endDate.toLocalJSDate())}`;
			}

			const isDisabled = !(isBetweenInclusive(tempDate.getYear(), minYear, maxYear)
								|| isBetweenInclusive(endDate.getYear(), minYear, maxYear));

			const yearRange: YearRange = {
				timestamp: timestamp.toString(),
				_tabIndex: isFocused ? 0 : -1,
				focusRef: isFocused,
				selected: isSelected || isSelectedBetween,
				ariaSelected: isSelected || isSelectedBetween,
				range: yearRangeText,
				rangeInSecType: secYearRangeText,
				disabled: isDisabled,
				ariaDisabled: isDisabled,
				classes: "ui5-yrp-item",
				parts: "year-range-cell",
			};

			if (isSelected) {
				yearRange.classes += " ui5-yrp-item--selected";
				yearRange.parts += " year-range-cell-selected";
			}

			if (isSelectedBetween && !isSelected) {
				yearRange.classes += " ui5-yrp-item--selected-between";
				yearRange.parts += " year-range-cell-selected-between";
			}

			if (isDisabled) {
				yearRange.classes += " ui5-yrp-item--disabled";
			}

			if (this.hasSecondaryCalendarType) {
				yearRange.classes += " ui5-yrp-item-secondary-type";
			}

			const intervalIndex = Math.floor(i / rowSize);

			if (yearRanges[intervalIndex]) {
				yearRanges[intervalIndex].push(yearRange);
			} else {
				yearRanges[intervalIndex] = [yearRange];
			}

			tempDate.setYear(tempDate.getYear() + this._rangeSize);
		}

		this._yearRanges = yearRanges;
	}

	_isYearRangeSelected(startYear: number, endYear: number) {
		return this.selectedDates.some(itemTimestamp => {
			return isBetweenInclusive(itemTimestamp, startYear, endYear);
		});
	}

	/**
	  * Returns true if the timestamp is inside the selection range.
	  * @private
	  */
	_isInsideSelectionRange(timestamp: number): boolean {
		if (this._selectionMode !== CalendarSelectionMode.Range || !this.selectedDates.length) {
			return false;
		}

		if (this.selectedDates.length === 1 && this._secondTimestamp) {
			return isBetweenInclusive(timestamp, this.selectedDates[0], this._secondTimestamp);
		}

		return isBetweenInclusive(timestamp, this.selectedDates[0], this.selectedDates[1]);
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.focus();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		let preventDefault = true;
		const pageSize = this._getPageSize();
		const rowSize = this._getRowSize();

		if (isEnter(e)) {
			this._selectYearRange(e);
		} else if (isSpace(e)) {
			e.preventDefault();
		} else if (isLeft(e)) {
			this._modifyTimestampBy(-1);
		} else if (isRight(e)) {
			this._modifyTimestampBy(1);
		} else if (isUp(e)) {
			this._modifyTimestampBy(-rowSize);
		} else if (isDown(e)) {
			this._modifyTimestampBy(rowSize);
		} else if (isPageUp(e)) {
			this._modifyTimestampBy(-pageSize);
		} else if (isPageDown(e)) {
			this._modifyTimestampBy(pageSize);
		} else if (isHome(e) || isEnd(e)) {
			this._onHomeOrEnd(isHome(e));
		} else if (isHomeCtrl(e)) {
			this._setTimestamp(parseInt(this._yearRanges[0][0].timestamp)); // first year range of first row
		} else if (isEndCtrl(e)) {
			this._setTimestamp(parseInt(this._yearRanges[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year range of last row
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._selectYearRange(e);
		}
	}

	_onHomeOrEnd(homePressed: boolean) {
		this._yearRanges.forEach(row => {
			const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
			if (indexInRow !== -1) { // The current year is on this row
				const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
				this._setTimestamp(parseInt(row[index].timestamp));
			}
		});
	}

	/**
	 * Set the hovered day as the "_secondTimestamp".
	 *
	 * @param e
	 * @private
	 */
	_onmouseover(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const hoveredItem = target.closest(".ui5-yrp-item") as HTMLElement;
		if (hoveredItem && this._selectionMode === CalendarSelectionMode.Range && this.selectedDates.length === 1) {
			this._secondTimestamp = this._getTimestampFromDom(hoveredItem);
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
	 * In range selection, the currently focused or hovered year range is considered the "second timestamp".
	 * @private
	 */
	_updateSecondTimestamp() {
		if (this._selectionMode === CalendarSelectionMode.Range && (this.selectedDates.length === 1 || this.selectedDates.length === 2)) {
			this._secondTimestamp = this.timestamp;
		}
	}

	/**
	 * User selected range with the mouse or pressed Enter/Space.
	 * @param e
	 * @private
	 */
	_selectYearRange(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLElement;

		if (target.className.indexOf("ui5-yrp-item") === -1) {
			return;
		}

		let timestamp = this._getTimestampFromDom(target);
		timestamp = this._getYearPickerCenteredTimestamp(timestamp);

		this._safelySetTimestamp(timestamp);
		this.fireDecoratorEvent("change", {
			timestamp: this.timestamp!,
		});
	}

	/**
	 * Returns the centered timestamp for the year picker.
	 * @private
	 */
	_getYearPickerCenteredTimestamp(oldTimestamp: number): number {
		const yearPickerPageSize = this.hasSecondaryCalendarType ? 8 : 20;
		const selectedDate = CalendarDate.fromTimestamp(oldTimestamp * 1000, this._primaryCalendarType);
		const startYear = selectedDate.getYear();
		const centeredYear = startYear + yearPickerPageSize / 2;

		selectedDate.setYear(centeredYear);

		return selectedDate.valueOf() / 1000;
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasPreviousPage(): boolean {
		return this._gridStartYear! > this._minDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 */
	_hasNextPage(): boolean {
		const amountInYears = this._getPageSize() * this._rangeSize;
		return this._gridStartYear! + amountInYears - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the "<" button in the calendar header (same as "PageUp")
	 * @protected
	 */
	_showPreviousPage() {
		const pageSize = this._getPageSize();
		this._modifyTimestampBy(-pageSize);

		const amountInYears = this._getPageSize() * this._rangeSize;
		this._modifyGridStartBy(-amountInYears);
	}

	/**
	 * Called by the Calendar component.
	 * **Note:** when the user presses the ">" button in the calendar header (same as "PageDown")
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(this._getPageSize());

		const amountInYears = this._getPageSize() * this._rangeSize;
		this._modifyGridStartBy(amountInYears);
	}

	/**
	 * Modifies timestamp by a given amount of year ranges and, if necessary, loads the prev/next page.
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount: number) {
		// Modify the current timestamp
		const amountInYears = amount * this._rangeSize;
		this._safelyModifyTimestampBy(amountInYears, "year");

		// Notify the calendar to update its timestamp
		this.fireDecoratorEvent("navigate", { timestamp: this.timestamp! });
	}

	_modifyGridStartBy(years: number) {
		this._gridStartYear! += years;
	}
}

YearRangePicker.define();

export default YearRangePicker;
export type {
	YearRangePickerChangeEventDetail,
	YearRangePickerNavigateEventDetail,
};
