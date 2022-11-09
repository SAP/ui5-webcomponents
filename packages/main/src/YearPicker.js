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
import CalendarPart from "./CalendarPart.js";
import YearPickerTemplate from "./generated/templates/YearPickerTemplate.lit.js";
import styles from "./generated/themes/YearPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-yearpicker",
	properties: /** @lends sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * An array of UTC timestamps representing the selected date or dates depending on the capabilities of the picker component.
		 * @type {array}
		 * @public
		 */
		selectedDates: {
			type: Integer,
			multiple: true,
			compareValues: true,
		},

		_years: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a year (space/enter/click).
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when the timestamp changes - the user navigates with the keyboard or clicks with the mouse.
		 * @since 1.0.0-rc.9
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.YearPicker
 * @extends sap.ui.webcomponents.main.CalendarPart
 * @tagname ui5-yearpicker
 * @public
 */
class YearPicker extends CalendarPart {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get template() {
		return YearPickerTemplate;
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
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, getLocale());
		const oYearFormatInSecType = DateFormat.getDateInstance({ format: "y", calendarType: this.secondaryCalendarType }, getLocale());
		this._calculateFirstYear();
		this._lastYear = this._firstYear + pageSize - 1;

		const calendarDate = this._calendarDate; // store the value of the expensive getter
		const minDate = this._minDate; // store the value of the expensive getter
		const maxDate = this._maxDate; // store the value of the expensive getter
		const tempDate = new CalendarDate(calendarDate, this._primaryCalendarType);
		let tempDateInSecType;
		let textInSecType;
		tempDate.setYear(this._firstYear);

		const intervals = [];
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
				textInSecType = tempDateInSecType.firstDate.getYear() === tempDateInSecType.lastDate.getYear
					? `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)}`
					: `${oYearFormatInSecType.format(tempDateInSecType.firstDate.toLocalJSDate(), true)} - ${oYearFormatInSecType.format(tempDateInSecType.lastDate.toLocalJSDate(), true)}`;
			}

			const year = {
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
			const intervalIndex = parseInt(i / this._getRowSize());

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

	_onkeydown(event) {
		let preventDefault = true;
		const pageSize = this._getPageSize();
		const rowSize = this._getRowSize();

		if (isEnter(event)) {
			this._selectYear(event);
		} else if (isSpace(event)) {
			event.preventDefault();
		} else if (isLeft(event)) {
			this._modifyTimestampBy(-1);
		} else if (isRight(event)) {
			this._modifyTimestampBy(1);
		} else if (isUp(event)) {
			this._modifyTimestampBy(-rowSize);
		} else if (isDown(event)) {
			this._modifyTimestampBy(rowSize);
		} else if (isPageUp(event)) {
			this._modifyTimestampBy(-pageSize);
		} else if (isPageDown(event)) {
			this._modifyTimestampBy(pageSize);
		} else if (isHome(event) || isEnd(event)) {
			this._onHomeOrEnd(isHome(event));
		} else if (isHomeCtrl(event)) {
			this._setTimestamp(parseInt(this._years[0][0].timestamp)); // first year of first row
		} else if (isEndCtrl(event)) {
			this._setTimestamp(parseInt(this._years[pageSize / rowSize - 1][rowSize - 1].timestamp)); // last year of last row
		} else {
			preventDefault = false;
		}

		if (preventDefault) {
			event.preventDefault();
		}
	}

	_onHomeOrEnd(homePressed) {
		this._years.forEach(row => {
			const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
			if (indexInRow !== -1) { // The current year is on this row
				const index = homePressed ? 0 : this._getRowSize() - 1; // select the first (if Home) or last (if End) year on the row
				this._setTimestamp(parseInt(row[index].timestamp));
			}
		});
	}

	/**
	 * Sets the timestamp to an absolute value
	 * @param value
	 * @private
	 */
	_setTimestamp(value) {
		this._safelySetTimestamp(value);
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	/**
	 * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount) {
		// Modify the current timestamp
		this._safelyModifyTimestampBy(amount, "year");

		// Notify the calendar to update its timestamp
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._selectYear(event);
		}
	}

	/**
	 * User clicked with the mouser or pressed Enter/Space
	 * @param event
	 * @private
	 */
	_selectYear(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this._getTimestampFromDom(event.target);
			this._safelySetTimestamp(timestamp);
			this.fireEvent("change", { timestamp: this.timestamp });
		}
	}

	/**
	 * Called from Calendar.js
	 * @protected
	 */
	_hasPreviousPage() {
		return this._firstYear > this._minDate.getYear();
	}

	/**
	 * Called from Calendar.js
	 * @protected
	 */
	_hasNextPage() {
		return this._firstYear + this._getPageSize() - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by Calendar.js
	 * User pressed the "<" button in the calendar header (same as PageUp)
	 * @protected
	 */
	_showPreviousPage() {
		const pageSize = this._getPageSize();
		this._modifyTimestampBy(-pageSize);
	}

	/**
	 * Called by Calendar.js
	 * User pressed the ">" button in the calendar header (same as PageDown)
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(this._getPageSize());
	}
}

YearPicker.define();

export default YearPicker;
