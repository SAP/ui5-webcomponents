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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import PickerBase from "./PickerBase.js";
import { getMaxCalendarDate } from "./util/DateTime.js";
import YearPickerTemplate from "./generated/templates/YearPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/YearPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-yearpicker",
	properties: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		_years: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},

		_firstYear: {
			type: Integer,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a year (space/enter/click).
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when the user navigates with the keyboard.
		 * @since 1.0.0-rc.9
		 * @public
		 * @event
		 */
		navigate: {},
	},
};

const PAGE_SIZE = 20; // Total years on a single page
const ROW_SIZE = 4; // Years per row (5 rows of 4 years each)

/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.YearPicker
 * @extends sap.ui.webcomponents.main.PickerBase
 * @tagname ui5-yearpicker
 * @public
 */
class YearPicker extends PickerBase {
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
		super.onBeforeRendering();
		this._buildYears();
	}

	_buildYears() {
		if (this._hidden) {
			return;
		}

		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, getLocale());

		this._calculateFirstYear();

		const tempDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
		tempDate.setYear(this._firstYear);

		const intervals = [];
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < PAGE_SIZE; i++) {
			timestamp = tempDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(itemTimestamp => {
				const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
				return date.getYear() === tempDate.getYear();
			});
			const isFocused = tempDate.getYear() === this._calendarDate.getYear();

			const year = {
				timestamp: timestamp.toString(),
				_tabIndex: isFocused ? "0" : "-1",
				focusRef: isFocused,
				selected: isSelected,
				ariaSelected: isSelected ? "true" : "false",
				year: oYearFormat.format(tempDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (isSelected) {
				year.classes += " ui5-yp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(tempDate.getYear())) {
				year.classes += " ui5-yp-item--disabled";
				year.disabled = true;
			}

			const intervalIndex = parseInt(i / ROW_SIZE);

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
		const absoluteMaxYear = getMaxCalendarDate(this._primaryCalendarType).getYear(); // 9999

		// If first load (so no _firstYear) or the date was changed by more than 20 years - reset _firstYear
		if (!this._firstYear || Math.abs(this._firstYear - this._calendarDate.getYear()) >= PAGE_SIZE) {
			this._firstYear = this._calendarDate.getYear() - PAGE_SIZE / 2;
		}

		// Keep it in the range between the min and max year
		this._firstYear = Math.max(this._firstYear, this._minDate.getYear());
		this._firstYear = Math.min(this._firstYear, this._maxDate.getYear());

		// If first year is > 9980, make it 9980 to not show any years beyond 9999
		if (this._firstYear > absoluteMaxYear - PAGE_SIZE + 1) {
			this._firstYear = absoluteMaxYear - PAGE_SIZE + 1;
		}
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.focus();
		}
	}

	_onkeydown(event) {
		let preventDefault = true;

		if (isEnter(event)) {
			this._selectYear(event);
		} else if (isSpace(event)) {
			event.preventDefault();
		} else if (isLeft(event)) {
			this._modifyTimestampBy(-1);
		} else if (isRight(event)) {
			this._modifyTimestampBy(1);
		} else if (isUp(event)) {
			this._modifyTimestampBy(-ROW_SIZE);
		} else if (isDown(event)) {
			this._modifyTimestampBy(ROW_SIZE);
		} else if (isPageUp(event)) {
			this._modifyTimestampBy(-PAGE_SIZE);
		} else if (isPageDown(event)) {
			this._modifyTimestampBy(PAGE_SIZE);
		} else if (isHome(event) || isEnd(event)) {
			this._onHomeOrEnd(isHome(event));
		} else if (isHomeCtrl(event)) {
			this._setTimestamp(parseInt(this._years[0][0].timestamp)); // first year of first row
		} else if (isEndCtrl(event)) {
			this._setTimestamp(parseInt(this._years[PAGE_SIZE / ROW_SIZE - 1][ROW_SIZE - 1].timestamp)); // last year of last row
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
				const index = homePressed ? 0 : ROW_SIZE - 1; // select the first (if Home) or last (if End) year on the row
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

		// Check for page overflow and show the prev/next page if necessary
		const newYear = this._calendarDate.getYear();
		if (newYear < this._firstYear) {
			this._firstYear -= PAGE_SIZE;
		}
		if (newYear >= this._firstYear + PAGE_SIZE) {
			this._firstYear += PAGE_SIZE;
		}

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
			const timestamp = this.getTimestampFromDom(event.target);
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
		return this._firstYear + PAGE_SIZE - 1 < this._maxDate.getYear();
	}

	/**
	 * Called by Calendar.js
	 * User pressed the "<" button in the calendar header (same as PageUp)
	 * @protected
	 */
	_showPreviousPage() {
		this._modifyTimestampBy(-PAGE_SIZE);
	}

	/**
	 * Called by Calendar.js
	 * User pressed the ">" button in the calendar header (same as PageDown)
	 * @protected
	 */
	_showNextPage() {
		this._modifyTimestampBy(PAGE_SIZE);
	}

	_isOutOfSelectableRange(year) {
		const minDate = new Date(this._minDate.valueOf()),
			maxDate = new Date(this._maxDate.valueOf()),
			minDateCheck = minDate && year < minDate.getFullYear(),
			maxDateCheck = maxDate && year > maxDate.getFullYear();

		return minDateCheck || maxDateCheck;
	}
}

YearPicker.define();

export default YearPicker;
