import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
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
	}

	onBeforeRendering() {
		const oYearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this._primaryCalendarType }, this._oLocale);
		const oCalDate = this._calendarDate;
		oCalDate.setMonth(0);
		oCalDate.setDate(1);
		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 > YearPicker._MAX_YEAR - YearPicker._ITEMS_COUNT) {
			oCalDate.setYear(YearPicker._MAX_YEAR - YearPicker._ITEMS_COUNT);
		} else if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1 < YearPicker._MIN_YEAR) {
			oCalDate.setYear(YearPicker._MIN_YEAR - 1);
		} else {
			oCalDate.setYear(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX - 1);
		}

		const intervals = [];
		let timestamp;

		if (this._selectedYear === undefined) {
			this._selectedYear = this._year;
		}

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
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (oCalDate.getYear() === this._selectedYear) {
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
		return this.primaryCalendarType || getCalendarType() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_onclick(event) {
		if (event.target.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
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
		oCalDate.setMonth(0);
		oCalDate.setDate(1);

		if (event.end) {
			oCalDate.setYear(oCalDate.getYear() + YearPicker._ITEMS_COUNT);
		} else if (event.start) {
			if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX < YearPicker._MIN_YEAR) {
				return;
			}
			oCalDate.setYear(oCalDate.getYear() - YearPicker._ITEMS_COUNT);
		}

		if (oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX > YearPicker._MAX_YEAR) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
		&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		if (this._isOutOfSelectableRange(oCalDate.getYear() - YearPicker._MIDDLE_ITEM_INDEX)
		&& this._isOutOfSelectableRange(oCalDate.getYear() + YearPicker._MIDDLE_ITEM_INDEX)) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;
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
		if (this.maxDate) {
			const jsDate = new Date(this.getFormat().parse(this.maxDate).getFullYear(), this.getFormat().parse(this.maxDate).getMonth(), this.getFormat().parse(this.maxDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.maxDate;
	}

	get _minDate() {
		if (this.minDate) {
			const jsDate = new Date(this.getFormat().parse(this.minDate).getFullYear(), this.getFormat().parse(this.minDate).getMonth(), this.getFormat().parse(this.minDate).getDate());
			const oCalDate = CalendarDate.fromTimestamp(jsDate.getTime(), this._primaryCalendarType);
			return oCalDate.valueOf();
		}
		return this.minDate;
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
YearPicker._MIDDLE_ITEM_INDEX = 7;
YearPicker._MAX_YEAR = 9999;
YearPicker._MIN_YEAR = 1;

YearPicker.define();

export default YearPicker;
