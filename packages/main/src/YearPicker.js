import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import YearPickerTemplate from "./generated/templates/YearPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/YearPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-yearpicker",
	languageAware: true,
	properties: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * A UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Sets a calendar type used for display.
		 * If not set, the calendar type of the global configuration is used.
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Determines the мinimum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		minDate: {
			type: String,
		},

		/**
		 * Determines the maximum date available for selection.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
			defaultValue: undefined,
		},

		_selectedDates: {
			type: Integer,
			multiple: true,
		},

		_selectedYear: {
			type: Integer,
			noAttribute: true,
		},

		_yearIntervals: {
			type: Object,
			multiple: true,
		},

		_hidden: {
			type: Boolean,
			noAttribute: true,
		},
		/**
		* Determines the format, displayed in the input field.
		*
		* @type {string}
		* @defaultvalue ""
		* @public
		*/
	   formatPattern: {
		   type: String,
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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-yearpicker
 * @public
 */
class YearPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
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
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			const focusableYears = [];

			for (let i = 0; i < this._yearIntervals.length; i++) {
				const yearInterval = this._yearIntervals[i].filter(x => !x.disabled);
				focusableYears.push(yearInterval);
			}

			return [].concat(...focusableYears);
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._yearIntervals = [];
		this._selectedDates = [];
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, this._oLocale);
		const oCalDate = this._calendarDate;
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();

		oCalDate.setMonth(0);
		oCalDate.setDate(1);
		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 > maxCalendarDateYear - YearPicker._ITEMS_COUNT) {
			oCalDate.setYear(maxCalendarDateYear - YearPicker._ITEMS_COUNT);
		} else if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 < minCalendarDateYear) {
			oCalDate.setYear(minCalendarDateYear - 1);
		} else {
			oCalDate.setYear(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1);
		}

		const intervals = [];
		let timestamp;

		if (this._selectedYear === undefined) {
			this._selectedYear = this._year;
		}

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
				selected: this._selectedDates.some(itemTimestamp => {
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
	}

	onAfterRendering() {
		this._itemNav.focusCurrent();
	}

	get _timestamp() {
		return this.timestamp !== undefined ? this.timestamp : Math.floor(new Date().getTime() / 1000);
	}

	get _localDate() {
		return new Date(this._timestamp * 1000);
	}

	get _calendarDate() {
		return CalendarDate.fromTimestamp(this._localDate.getTime(), this._primaryCalendarType);
	}

	get _year() {
		return this._calendarDate.getYear();
	}

	get _primaryCalendarType() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		return this.primaryCalendarType || getCalendarType() || localeData.getPreferredCalendarType();
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_onmousedown(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const targetTimestamp = this.getTimestampFromDom(event.target);
			const focusedItemIndex = this._itemNav._getItems().findIndex(item => parseInt(item.timestamp) === targetTimestamp);
			this._itemNav.currentIndex = focusedItemIndex;
			this._itemNav.focusCurrent();
		}
	}

	_onmouseup(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this.fireEvent("change", { timestamp });
		}
	}

	getTimestampFromDom(domNode) {
		const sTimestamp = domNode.getAttribute("data-sap-timestamp");
		return parseInt(sTimestamp);
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
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("change", { timestamp });
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);

			this._selectedYear = CalendarDate.fromTimestamp(
				timestamp * 1000,
				this._primaryCalendarType
			).getYear();
		}
	}

	_handleItemNavigationBorderReach(event) {
		const oCalDate = this._calendarDate;
		const maxCalendarDateYear = CalendarDate.fromTimestamp(this._getMaxCalendarDate(), this._primaryCalendarType).getYear();
		const minCalendarDateYear = CalendarDate.fromTimestamp(this._getMinCalendarDate(), this._primaryCalendarType).getYear();
		oCalDate.setMonth(0);
		oCalDate.setDate(1);

		if (event.end) {
			oCalDate.setYear(oCalDate.getYear() + YearPicker._ITEMS_COUNT);
		} else if (event.start) {
			if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX < minCalendarDateYear) {
				return;
			}
			oCalDate.setYear(oCalDate.getYear() - YearPicker._ITEMS_COUNT);
		}

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX > maxCalendarDateYear) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
		&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;

		this.fireEvent("navigate", event);
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	_isOutOfSelectableRange(year) {
		const minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && year < minDate.getFullYear(),
			maxDateCheck = maxDate && year > maxDate.getFullYear();

		return minDateCheck || maxDateCheck;
	}

	get _maxDate() {
		return this.maxDate ? this._getTimeStampFromString(this.maxDate) : this._getMaxCalendarDate();
	}

	get _minDate() {
		return this.minDate ? this._getTimeStampFromString(this.minDate) : this._getMinCalendarDate();
	}

	_getTimeStampFromString(value) {
		const jsDate = this.getFormat().parse(value);
		if (jsDate) {
			return CalendarDate.fromLocalJSDate(jsDate, this._primaryCalendarType).toUTCJSDate().valueOf();
		}
		return undefined;
	}

	_getMinCalendarDate() {
		const minDate = new CalendarDate(1, 0, 1, this._primaryCalendarType);
		minDate.setYear(1);
		minDate.setMonth(0);
		minDate.setDate(1);
		return minDate.valueOf();
	}

	_getMaxCalendarDate() {
		const maxDate = new CalendarDate(1, 0, 1, this._primaryCalendarType);
		maxDate.setYear(9999);
		maxDate.setMonth(11);
		const tempDate = new CalendarDate(maxDate, this._primaryCalendarType);
		tempDate.setDate(1);
		tempDate.setMonth(tempDate.getMonth() + 1, 0);
		maxDate.setDate(tempDate.getDate());// 31st for Gregorian Calendar
		return maxDate.valueOf();
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
				calendarType: this._primaryCalendarType,
			});
		}
		return this._oDateFormat;
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
