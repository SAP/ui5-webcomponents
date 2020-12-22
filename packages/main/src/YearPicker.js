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
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, getLocale());

		if (!this._firstYear) {
			this._firstYear = this._calendarDate.getYear() - PAGE_SIZE / 2;
		}

		const oCalDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
		oCalDate.setYear(this._firstYear);

		/*
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 > maxCalendarDateYear - YearPicker._ITEMS_COUNT) {
			oCalDate.setYear(maxCalendarDateYear - YearPicker._ITEMS_COUNT);
		} else if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 < minCalendarDateYear) {
			oCalDate.setYear(minCalendarDateYear - 1);
		} else {
			oCalDate.setYear(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1);
		}
		*/

		const intervals = [];
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < PAGE_SIZE; i++) {
			const intervalIndex = parseInt(i / ROW_SIZE);
			if (!intervals[intervalIndex]) {
				intervals[intervalIndex] = [];
			}

			timestamp = oCalDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(itemTimestamp => {
				const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
				return date.getYear() === oCalDate.getYear();
			});

			const year = {
				timestamp: timestamp.toString(),
				_tabIndex: oCalDate.getYear() === this._calendarDate.getYear() ? "0" : "-1",
				selected: isSelected,
				ariaSelected: isSelected ? "true" : "false",
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (isSelected) {
				year.classes += " ui5-yp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate.getYear())) {
				year.classes += " ui5-yp-item--disabled";
				year.disabled = true;
			}

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			}

			oCalDate.setYear(oCalDate.getYear() + 1);
		}

		this._years = intervals;
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.shadowRoot.querySelector(`[tabindex="0"]`).focus();
		}
	}

	_onkeydown(event) {
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
			this._years.forEach(row => {
				const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getYear() === this._calendarDate.getYear());
				if (indexInRow !== -1) {
					const index = isHome(event) ? 0 : ROW_SIZE - 1;
					this._setTimestamp(parseInt(row[index].timestamp));
				}
			});
		} else if (isHomeCtrl(event)) {
			this._setTimestamp(parseInt(this._years[0][0].timestamp));
		} else if (isEndCtrl(event)) {
			this._setTimestamp(parseInt(this._years[PAGE_SIZE / ROW_SIZE - 1][ROW_SIZE - 1].timestamp));
		}
	}

	/**
	 * Sets the timestamp to an absolute value
	 * @param value
	 * @private
	 */
	_setTimestamp(value) {
		this.timestamp = value;
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	/**
	 * Modifies timestamp by a given amount of years and, if necessary, loads the prev/next page
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount) {
		// Modify the current timestamp
		const newDate = new CalendarDate(this._calendarDate);
		newDate.setYear(this._calendarDate.getYear() + amount);
		this.timestamp = newDate.valueOf() / 1000;

		// Check for page overflow and show the prev/next page if necessary
		const newYear = newDate.getYear();
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
			this.timestamp = timestamp;
			this.fireEvent("change", { timestamp });
		}
	}

	/**
	 * User pressed the "<" button in the calendar header (same as PageUp)
	 * @private
	 */
	_showPreviousPage() {
		this._modifyTimestampBy(-PAGE_SIZE);
	}

	/**
	 * User pressed the ">" button in the calendar header (same as PageDown)
	 * @private
	 */
	_showNextPage() {
		this._modifyTimestampBy(PAGE_SIZE);
	}

	_isOutOfSelectableRange(year) {
		const minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && year < minDate.getFullYear(),
			maxDateCheck = maxDate && year > maxDate.getFullYear();

		return minDateCheck || maxDateCheck;
	}
}

YearPicker.define();

export default YearPicker;
