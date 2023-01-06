import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import { getMaxCalendarDate } from "@ui5/webcomponents-localization/dist/dates/ExtremeDates.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";
import {
	YEAR_PICKER_DESCRIPTION,
// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Template
import YearPickerTemplate from "./generated/templates/YearPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/YearPicker.css.js";

type Year = {
	timestamp: string;
	_tabIndex: string;
	focusRef: boolean;
	selected: boolean;
	ariaSelected: string;
	year: string;
	yearInSecType: string | undefined;
	disabled: boolean;
	classes: string;
}

type YearInterval = Array<Array<Year>>;

type YearPickerChangeEventDetail = {
	timestamp: number,
}

type YearPickerNavigateEventDetail = {
	timestamp: number,
}

/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.YearPicker
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-yearpicker
 * @public
 */
@customElement("ui5-yearpicker")
/**
 * Fired when the user selects a year via "Space", "Enter" or click.
 * @public
 * @event sap.ui.webc.main.YearPicker#change
 */
@event("change")
/**
 * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
 * @since 1.0.0-rc.9
 * @public
 * @event sap.ui.webc.main.YearPicker#navigate
 */
@event("navigate")
class YearPicker extends CalendarPart implements ICalendarPicker {
	/**
	 * An array of UTC timestamps representing the selected date
	 * or dates depending on the capabilities of the picker component.
	 * @type {array}
	 * @name sap.ui.webc.main.YearPicker.prototype.selectedDates
	 * @public
	 */
	@property({
		validator: Integer,
		multiple: true,
		compareValues: true,
	})
	selectedDates!: Array<number>;

	@property({ type: Object, multiple: true })
	_years!: YearInterval;

	@property({ type: Boolean, noAttribute: true })
	_hidden!: boolean;

	_firstYear?: number;
	_lastYear?: number;

	static i18nBundle: I18nBundle;

	static get styles() {
		return styles;
	}

	static get template() {
		return YearPickerTemplate;
	}

	static async onDefine() {
		YearPicker.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get roleDescription() {
		return YearPicker.i18nBundle.getText(YEAR_PICKER_DESCRIPTION as I18nText);
	}

	onBeforeRendering() {
		this._buildYears();
	}

	_getPageSize() {
		// Total years on a single page depending on using on one or two calendar type
		return this.secondaryCalendarType ? 8 : 20;
	}

	_getRowSize() {
		// Years per row (5 rows of 4 years each) for one claendar type and (4 row of 2 years each) for two calendar type
		return this.secondaryCalendarType ? 2 : 4;
	}

	_buildYears() {
		if (this._hidden) {
			return;
		}
		const pageSize = this._getPageSize();
		const locale = getLocale() as unknown as LocaleT;
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, locale);
		const oYearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, locale);
		this._calculateFirstYear();
		this._lastYear = this._firstYear! + pageSize - 1;

		const calendarDate = this._calendarDate; // store the value of the expensive getter
		const minDate = this._minDate; // store the value of the expensive getter
		const maxDate = this._maxDate; // store the value of the expensive getter
		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		let tempDateInSecType;
		let textInSecType;
		tempDate.setYear(this._firstYear!);

		const intervals: YearInterval = [];
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < pageSize; i++) {
			timestamp = tempDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(itemTimestamp => {
				const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
				return date.getYear() === tempDate.getYear();
			});
			const isFocused = tempDate.getYear() === calendarDate.getYear();
			const isDisabled = tempDate.getYear() < minDate.getYear() || tempDate.getYear() > maxDate.getYear();

			if (this.secondaryCalendarType) {
				tempDateInSecType = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp, true);
				textInSecType = tempDateInSecType.firstDate.getYear() === tempDateInSecType.lastDate.getYear()
					? `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)}`
					: `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)} - ${oYearFormatInSecType.format(tempDateInSecType.lastDate.toLocalJSDate(), true)}`;
			}

			const year: Year = {
				timestamp: timestamp.toString(),
				_tabIndex: isFocused ? "0" : "-1",
				focusRef: isFocused,
				selected: isSelected,
				ariaSelected: isSelected ? "true" : "false",
				year: oYearFormat.format(tempDate.toLocalJSDate()),
				yearInSecType: this.secondaryCalendarType && textInSecType,
				disabled: isDisabled,
				classes: "ui5-yp-item",
			};

			if (isSelected) {
				year.classes += " ui5-yp-item--selected";
			}

			if (isDisabled) {
				year.classes += " ui5-yp-item--disabled";
			}

			if (this.secondaryCalendarType) {
				year.classes += " ui5-yp-item-secondary-type";
			}
			const intervalIndex = Math.floor(i / this._getRowSize());

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			} else {
				intervals[intervalIndex] = [year];
			}

			tempDate.setYear(tempDate.getYear() + 1);
		}

		this._years = intervals;
	}

	_calculateFirstYear() {
		const pageSize = this._getPageSize();
		const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear(); // 9999
		const currentYear = this._calendarDate.getYear();

		// 1. If first load - center the current year (set first year to be current year minus half page size)
		if (!this._firstYear) {
			this._firstYear = currentYear - pageSize / 2;
		}

		// 2. If out of range - change by a page (20) - do not center in order to keep the same position as the last page
		if (currentYear < this._firstYear) {
			this._firstYear -= pageSize;
		} else if (currentYear >= this._firstYear + pageSize) {
			this._firstYear += pageSize;
		}

		// 3. If the date was changed by more than 20 years - reset _firstYear completely
		if (Math.abs(this._firstYear - currentYear) >= pageSize) {
			this._firstYear = currentYear - pageSize / 2;
		}

		// Keep it in the range between the min and max year
		this._firstYear = Math.max(this._firstYear, this._minDate.getYear());
		this._firstYear = Math.min(this._firstYear, this._maxDate.getYear());

		// If first year is > 9980, make it 9980 to not show any years beyond 9999
		if (this._firstYear > absoluteMaxYear - pageSize + 1) {
			this._firstYear = absoluteMaxYear - pageSize + 1;
		}
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
			this._selectYear(e);
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
			this._setTimestamp(parseInt(this._years[0][0].timestamp)); // first year of first row
		} else if (isEndCtrl(e)) {
			this._setTimestamp(parseInt(this._years[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year of last row
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_onHomeOrEnd(homePressed: boolean) {
		this._years.forEach(row => {
			const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
			if (indexInRow !== -1) { // The current year is on this row
				const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
				this._setTimestamp(parseInt(row[index].timestamp));
			}
		});
	}

	/**
	 * Sets the timestamp to an absolute value.
	 * @param { number } value
	 * @private
	 */
	_setTimestamp(value: number) {
		this._safelySetTimestamp(value);
		this.fireEvent<YearPickerNavigateEventDetail>("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page.
	 * @param { number } amount
	 * @private
	 */
	_modifyTimestampBy(amount: number) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, "year");

		// Notify the calendar to update its timestamp
		this.fireEvent<YearPickerNavigateEventDetail>("navigate", { timestamp: this.timestamp! });
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._selectYear(e);
		}
	}

	/**
	 * User clicked with the mouser or pressed Enter/Space
	 * @param { Event } e
	 * @private
	 */
	_selectYear(e: Event) {
		e.preventDefault();
		const target = e.target as HTMLElement;
		if (target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this._getTimestampFromDom(target);
			this._safelySetTimestamp(timestamp);
			this.fireEvent<YearPickerChangeEventDetail>("change", { timestamp: this.timestamp! });
		}
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 * @returns { boolean }
	 */
	_hasPreviousPage(): boolean {
		return this._firstYear! > this._minDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 * @returns { boolean }
	 */
	_hasNextPage(): boolean {
		return this._firstYear! + this._getPageSize() - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * <b>Note:</b> when the user presses the "<" button in the calendar header (same as "PageUp")
	 * @protected
	 */
	_showPreviousPage() {
		const pageSize = this._getPageSize();
		this._modifyTimestampBy(-pageSize);
	}

	/**
	 * Called by the Calendar component.
	 * <b>Note:</b> when the user presses the ">" button in the calendar header (same as "PageDown")
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(this._getPageSize());
	}
}

YearPicker.define();

export default YearPicker;
export type {
	YearPickerChangeEventDetail,
	YearPickerNavigateEventDetail,
};
