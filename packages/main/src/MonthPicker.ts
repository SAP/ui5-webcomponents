import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import convertMonthNumbersToMonthNames from "@ui5/webcomponents-localization/dist/dates/convertMonthNumbersToMonthNames.js";
import transformDateToSecondaryType from "@ui5/webcomponents-localization/dist/dates/transformDateToSecondaryType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
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
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	MONTH_PICKER_DESCRIPTION,
// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";
import CalendarPart from "./CalendarPart.js";
import type { ICalendarPicker } from "./Calendar.js";

// Template
import MonthPickerTemplate from "./generated/templates/MonthPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/MonthPicker.css.js";

const PAGE_SIZE = 12; // total months on a single page
const ROW_SIZE = 3; // months per row (4 rows of 3 months each)

type Month = {
	timestamp: string,
	focusRef: boolean,
	_tabIndex: string,
	selected: boolean,
	ariaSelected: string,
	name: string,
	nameInSecType: string,
	disabled: boolean,
	classes: string,
}

type MothInterval = Array<Array<Month>>;

type SelectedMonthChangeEventDetail = {
	timestamp: number,
}

/**
 * Month picker component.
 *
 * @class
 *
 * Displays months which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MonthPicker
 * @extends sap.ui.webc.main.CalendarPart
 * @tagname ui5-monthpicker
 * @public
 */
@customElement("ui5-monthpicker")
/**
 * Fired when the user selects a month via "Space", "Enter" or click.
 * @public
 * @event sap.ui.webc.main.MonthPicker#change
 */
 @event("change")
/**
 * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
 * @since 1.0.0-rc.9
 * @public
 * @event sap.ui.webc.main.MonthPicker#navigate
 */
@event("navigate")
class MonthPicker extends CalendarPart implements ICalendarPicker {
	/**
	 * An array of UTC timestamps representing the selected date
	 * or dates depending on the capabilities of the picker component.
	 * @type {array}
	 * @name sap.ui.webc.main.MonthPicker.prototype.selectedDates
	 * @public
	 */
	@property({
		validator: Integer,
		multiple: true,
		compareValues: true,
	})
	selectedDates!: Array<number>;

	@property({ type: Object, multiple: true })
	_months!: MothInterval;

	@property({ type: Boolean, noAttribute: true })
	_hidden!: boolean;

	static i18nBundle: I18nBundle;

	static get template() {
		return MonthPickerTemplate;
	}

	static get styles() {
		return styles;
	}

	static async onDefine() {
		MonthPicker.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get roleDescription() {
		return MonthPicker.i18nBundle.getText(MONTH_PICKER_DESCRIPTION as I18nText);
	}

	onBeforeRendering() {
		this._buildMonths();
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.focus();
		}
	}

	_buildMonths() {
		if (this._hidden) {
			return;
		}

		const localeData = getCachedLocaleDataInstance(getLocale());
		const monthsNames = localeData.getMonthsStandAlone("wide", this._primaryCalendarType);

		const months: MothInterval = [];
		const calendarDate = this._calendarDate; // store the value of the expensive getter
		const minDate = this._minDate; // store the value of the expensive getter
		const maxDate = this._maxDate; // store the value of the expensive getter
		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < 12; i++) {
			tempDate.setMonth(i);
			timestamp = tempDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(itemTimestamp => {
				const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
				return date.getYear() === tempDate.getYear() && date.getMonth() === tempDate.getMonth();
			});
			const isFocused = tempDate.getMonth() === calendarDate.getMonth();
			const isDisabled = this._isOutOfSelectableRange(tempDate, minDate, maxDate);

			const month: Month = {
				timestamp: timestamp.toString(),
				focusRef: isFocused,
				_tabIndex: isFocused ? "0" : "-1",
				selected: isSelected,
				ariaSelected: isSelected ? "true" : "false",
				name: monthsNames[i],
				nameInSecType: this.secondaryCalendarType && this._getDisplayedSecondaryMonthText(timestamp).text,
				disabled: isDisabled,
				classes: "ui5-mp-item",
			};

			if (isSelected) {
				month.classes += " ui5-mp-item--selected";
			}

			if (isDisabled) {
				month.classes += " ui5-mp-item--disabled";
			}

			const quarterIndex = Math.floor(i / ROW_SIZE);

			if (months[quarterIndex]) {
				months[quarterIndex].push(month);
			} else {
				months[quarterIndex] = [month];
			}
		}

		this._months = months;
	}

	_getDisplayedSecondaryMonthText(timestamp: number) {
		const monthsName = transformDateToSecondaryType(this._primaryCalendarType, this.secondaryCalendarType, timestamp);
		return convertMonthNumbersToMonthNames(monthsName.firstDate.getMonth(), monthsName.lastDate.getMonth(), this.secondaryCalendarType);
	}

	_onkeydown(e: KeyboardEvent) {
		let preventDefault = true;

		if (isEnter(e)) {
			this._selectMonth(e);
		} else if (isSpace(e)) {
			e.preventDefault();
		} else if (isLeft(e)) {
			this._modifyTimestampBy(-1);
		} else if (isRight(e)) {
			this._modifyTimestampBy(1);
		} else if (isUp(e)) {
			this._modifyTimestampBy(-ROW_SIZE);
		} else if (isDown(e)) {
			this._modifyTimestampBy(ROW_SIZE);
		} else if (isPageUp(e)) {
			this._modifyTimestampBy(-PAGE_SIZE);
		} else if (isPageDown(e)) {
			this._modifyTimestampBy(PAGE_SIZE);
		} else if (isHome(e) || isEnd(e)) {
			this._onHomeOrEnd(isHome(e));
		} else if (isHomeCtrl(e)) {
			this._setTimestamp(parseInt(this._months[0][0].timestamp)); // first month of first row
		} else if (isEndCtrl(e)) {
			this._setTimestamp(parseInt(this._months[PAGE_SIZE / ROW_SIZE - 1][ROW_SIZE - 1].timestamp)); // last month of last row
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			e.preventDefault();
		}
	}

	_onHomeOrEnd(homePressed: boolean) {
		this._months.forEach(row => {
			const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getMonth() === this._calendarDate.getMonth());
			if (indexInRow !== -1) { // The current month is on this row
				const index = homePressed ? 0 : ROW_SIZE - 1; // select the first (if Home) or last (if End) month on the row
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
		this.fireEvent("navigate", { timestamp: this.timestamp! });
	}

	/**
	 * Modifies timestamp by a given amount of months and,
	 * if necessary, loads the prev/next page.
	 * @param { number } amount
	 * @private
	 */
	_modifyTimestampBy(amount: number) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, "month");

		// Notify the calendar to update its timestamp
		this.fireEvent("navigate", { timestamp: this.timestamp! });
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._selectMonth(e);
		}
	}

	/**
	 * Selects a month, when the user clicks or presses "Enter" or "Space".
	 * @param { Event } e
	 * @private
	 */
	_selectMonth(e: Event) {
		e.preventDefault();

		const target = e.target as HTMLElement;

		if (target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this._getTimestampFromDom(target);
			this._safelySetTimestamp(timestamp);
			this.fireEvent("change", { timestamp: this.timestamp! });
		}
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 * @returns { boolean }
	 */
	_hasPreviousPage(): boolean {
		return this._calendarDate.getYear() !== this._minDate.getYear();
	}

	/**
	 * Called by the Calendar component.
	 * @protected
	 * @returns { boolean }
	 */
	_hasNextPage(): boolean {
		return this._calendarDate.getYear() !== this._maxDate.getYear();
	}

	/**
	 * Called by Calendar.js.
	 * <b>Note:</b> when the user presses the "<" button in the calendar header (same as "PageUp")
	 * @protected
	 */
	_showPreviousPage() {
		this._modifyTimestampBy(-PAGE_SIZE);
	}

	/**
	 * Called by Calendar.js
	 * <b>Note:</b> when the user presses the ">" button in the calendar header (same as "PageDown")
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(PAGE_SIZE);
	}

	_isOutOfSelectableRange(date: CalendarDate, minDate: CalendarDate, maxDate: CalendarDate): boolean {
		const month = date.getMonth();
		const year = date.getYear();
		const minYear = minDate.getYear();
		const minMonth = minDate.getMonth();
		const maxYear = maxDate.getYear();
		const maxMonth = maxDate.getMonth();

		return year < minYear || (year === minYear && month < minMonth) || year > maxYear || (year === maxYear && month > maxMonth);
	}
}

MonthPicker.define();

export default MonthPicker;
export type {
	SelectedMonthChangeEventDetail,
};
