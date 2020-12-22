import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
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
		_yearIntervals: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},

		_anchorYear: {
			type: Integer,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
		/**
		 * Fired when month, year has changed due to item navigation.
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

	constructor() {
		super();

		this._oLocale = getLocale();

		this._itemNav = new ItemNavigation(this, {
			pageSize: 20,
			rowSize: 4,
			behavior: ItemNavigationBehavior.Paging,
			getItemsCallback: () => this.focusableYears,
			affectedPropertiesNames: ["_yearIntervals"],
		});

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._itemNav.attachEvent(
			ItemNavigation.AFTER_FOCUS,
			this._handleItemNavigationAfterFocus.bind(this)
		);

		this._yearIntervals = [];
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, this._oLocale);

		if (!this._anchorYear) {
			this._anchorYear = this._calendarDate.getYear();
		}

		const oCalDate = new CalendarDate(this._calendarDate, this._primaryCalendarType);
		oCalDate.setYear(this._anchorYear);

		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 > maxCalendarDateYear - YearPicker._ITEMS_COUNT) {
			oCalDate.setYear(maxCalendarDateYear - YearPicker._ITEMS_COUNT);
		} else if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 < minCalendarDateYear) {
			oCalDate.setYear(minCalendarDateYear - 1);
		} else {
			oCalDate.setYear(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1);
		}

		const intervals = [];
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < YearPicker._ITEMS_COUNT; i++) {
			const intervalIndex = parseInt(i / 4);
			if (!intervals[intervalIndex]) {
				intervals[intervalIndex] = [];
			}

			oCalDate.setYear(oCalDate.getYear() + 1);

			timestamp = oCalDate.valueOf() / 1000;

			const year = {
				timestamp: timestamp.toString(),
				id: `${this._id}-y${timestamp}`,
				selected: this.selectedDates.some(itemTimestamp => {
					const date = CalendarDate.fromTimestamp(itemTimestamp * 1000, this._primaryCalendarType);
					return date.getYear() === oCalDate.getYear();
				}),
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (year.selected) {
				year.classes += " ui5-yp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(oCalDate.getYear())) {
				year.classes += " ui5-yp-item--disabled";
				year.disabled = true;
			}

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			}
		}

		this._yearIntervals = intervals;

		const currentIndex = this.focusableYears.findIndex(item => {
			return CalendarDate.fromLocalJSDate(new Date(item.timestamp * 1000), this._primaryCalendarType).getYear() === this._calendarDate.getYear();
		});
		this._itemNav.currentIndex = currentIndex;
	}

	onAfterRendering() {
		if (!this._hidden) {
			this._itemNav.focusCurrent();
		}
	}

	_setCurrentItemTabIndex(index) {
		const currentItem = this._itemNav._getCurrentItem();
		if (currentItem) {
			currentItem.setAttribute("tabindex", index.toString());
		}
	}

	_onmousedown(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const targetTimestamp = this.getTimestampFromDom(event.target);
			const focusedItem = this.focusableYears.find(item => parseInt(item.timestamp) === targetTimestamp);
			this._itemNav.update(focusedItem);
		}
	}

	_onmouseup(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
			this.fireEvent("change", { timestamp });
		}
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);

			this.timestamp = timestamp;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("change", { timestamp });
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
		}
	}

	_handleItemNavigationBorderReach(event) {
		if (event.start) {
			this._showPreviousPage();
		}

		if (event.end) {
			this._showNextPage();
		}
	}

	_handleItemNavigationAfterFocus() {
		const currentItem = this._itemNav._getCurrentItem();
		const currentTimestamp = parseInt(currentItem.getAttribute("data-sap-timestamp"));
		this.timestamp = currentTimestamp;
		this.fireEvent("navigate", { timestamp: currentTimestamp });
	}

	_showPreviousPage() {
		const oCalDate = this._calendarDate;
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();
		// oCalDate.setMonth(0);
		// oCalDate.setDate(1);

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX < minCalendarDateYear) {
			return;
		}
		oCalDate.setYear(oCalDate.getYear() - YearPicker._ITEMS_COUNT);

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX > maxCalendarDateYear) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
			&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;
		this._anchorYear = this._calendarDate.getYear();

		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	_showNextPage() {
		const oCalDate = this._calendarDate;
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		// oCalDate.setMonth(0);
		// oCalDate.setDate(1);

		oCalDate.setYear(oCalDate.getYear() + YearPicker._ITEMS_COUNT);

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX > maxCalendarDateYear) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
			&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;
		this._anchorYear = this._calendarDate.getYear();

		this.fireEvent("navigate", { timestamp: this.timestamp });
	}

	_isOutOfSelectableRange(year) {
		const minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && year < minDate.getFullYear(),
			maxDateCheck = maxDate && year > maxDate.getFullYear();

		return minDateCheck || maxDateCheck;
	}

	get focusableYears() {
		const focusableYears = [];

		for (let i = 0; i < this._yearIntervals.length; i++) {
			const yearInterval = this._yearIntervals[i].filter(x => !x.disabled);
			focusableYears.push(yearInterval);
		}

		return [].concat(...focusableYears);
	}

	get styles() {
		return {
			main: {
				display: this._hidden ? "none" : "",
			},
		};
	}
}

YearPicker._ITEMS_COUNT = 20;
YearPicker._MIDDLE_ITEM_INDEX = 10;

YearPicker.define();

export default YearPicker;
