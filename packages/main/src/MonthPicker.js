import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
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
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import PickerBase from "./PickerBase.js";
import MonthPickerTemplate from "./generated/templates/MonthPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/MonthPicker.css.js";
/**
 * @public
 */
const metadata = {
	tag: "ui5-monthpicker",
	properties: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		_months: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * Fired when the user selects a month (space/enter/click).
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

const PAGE_SIZE = 12; // Total months on a single page
const ROW_SIZE = 3; // Months per row (4 rows of 3 months each)

/**
 * Month picker component.
 *
 * @class
 *
 * Displays months which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.MonthPicker
 * @extends sap.ui.webcomponents.main.PickerBase
 * @tagname ui5-monthpicker
 * @public
 */
class MonthPicker extends PickerBase {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return MonthPickerTemplate;
	}

	static get styles() {
		return styles;
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());

		const months = [];
		const tempDate = this._calendarDate;
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < 12; i++) {
			tempDate.setMonth(i);
			timestamp = tempDate.valueOf() / 1000;

			const isSelected = this.selectedDates.some(d => d === timestamp);

			const month = {
				timestamp: timestamp.toString(),
				_tabIndex: tempDate.getMonth() === this._calendarDate.getMonth() ? "0" : "-1",
				selected: isSelected,
				ariaSelected: isSelected ? "true" : "false",
				name: localeData.getMonths("wide", this._primaryCalendarType)[i],
				classes: "ui5-mp-item",
			};

			if (isSelected) {
				month.classes += " ui5-mp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(i)) {
				month.classes += " ui5-mp-item--disabled";
				month.disabled = true;
			}

			const quarterIndex = parseInt(i / ROW_SIZE);

			if (months[quarterIndex]) {
				months[quarterIndex].push(month);
			} else {
				months[quarterIndex] = [month];
			}
		}

		this._months = months;
	}

	onAfterRendering() {
		if (!this._hidden) {
			this.shadowRoot.querySelector(`[tabindex="0"]`).focus();
		}
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			this._selectMonth(event);
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
			this._months.forEach(row => {
				const indexInRow = row.findIndex(item => CalendarDate.fromTimestamp(parseInt(item.timestamp) * 1000).getMonth() === this._calendarDate.getMonth());
				if (indexInRow !== -1) { // The current month is on this row
					const index = isHome(event) ? 0 : ROW_SIZE - 1; // select the first (if Home) or last (if End) month on the row
					this._setTimestamp(parseInt(row[index].timestamp));
				}
			});
		} else if (isHomeCtrl(event)) {
			this._setTimestamp(parseInt(this._months[0][0].timestamp)); // first month of first row
		} else if (isEndCtrl(event)) {
			this._setTimestamp(parseInt(this._months[PAGE_SIZE / ROW_SIZE - 1][ROW_SIZE - 1].timestamp)); // last month of last row
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
	 * Modifies timestamp by a given amount of months and, if necessary, loads the prev/next page
	 * @param amount
	 * @private
	 */
	_modifyTimestampBy(amount) {
		// Modify the current timestamp
		const newDate = new CalendarDate(this._calendarDate);
		newDate.setMonth(this._calendarDate.getMonth() + amount);
		this.timestamp = newDate.valueOf() / 1000;

		// Notify the calendar to update its timestamp
		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._selectMonth(event);
		}
	}

	/**
	 * User clicked with the mouser or pressed Enter/Space
	 * @param event
	 * @private
	 */
	_selectMonth(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
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

	_isOutOfSelectableRange(monthIndex) {
		const currentDateYear = this._localDate.getFullYear(),
			minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && ((currentDateYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) || currentDateYear < minDate.getFullYear()),
			maxDateCheck = maxDate && ((currentDateYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) || (currentDateYear > maxDate.getFullYear()));

		return maxDateCheck || minDateCheck;
	}
}

MonthPicker.define();

export default MonthPicker;
