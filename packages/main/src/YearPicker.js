import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData.js";
import { getCalendarType, getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import { getFormatLocale } from "@ui5/webcomponents-base/src/FormatSettings.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import { getLocale } from "@ui5/webcomponents-base/src/LocaleProvider.js";
import Integer from "@ui5/webcomponents-base/src/types/Integer.js";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat.js";
import CalendarType from "@ui5/webcomponents-base/src/dates/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-base/src/dates/CalendarDate.js";
import YearPickerTemplate from "./build/compiled/YearPickerTemplate.lit.js";

// Styles
import styles from "./themes/YearPicker.css.js";

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
		 * @type {string}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},
		_selectedYear: {
			type: Integer,
		},
		_yearIntervals: {
			type: Object,
			multiple: true,
		},
		_hidden: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		selectedYearChange: {},
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

		this._oLocale = getFormatLocale();

		this._itemNav = new ItemNavigation(this, { rowSize: 4 });
		this._itemNav.getItemsCallback = function getItemsCallback() {
			return [].concat(...this._yearIntervals);
		}.bind(this);
		this._itemNav.setItemsCallback = function setItemsCallback(items) {
			this._yearIntervals = items;
		}.bind(this);

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);

		this._yearIntervals = [];

		this._delegates.push(this._itemNav);
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
				id: `${this._state._id}-y${timestamp}`,
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "sapWCYearPickerItem",
			};

			if (oCalDate.getYear() === this._selectedYear) {
				year.classes += " sapWCYearPickerItemSel";
			}

			if (intervals[intervalIndex]) {
				intervals[intervalIndex].push(year);
			}
		}

		this._yearIntervals = intervals;

		this._itemNav.init();
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

	onclick(event) {
		if (event.ui5target.className.indexOf("sapWCYearPickerItem") > -1) {
			const timestamp = this.getTimestampFromDom(event.ui5target);
			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("selectedYearChange", { timestamp });
		}
	}

	getTimestampFromDom(domNode) {
		const sTimestamp = domNode.getAttribute("data-sap-timestamp");
		return parseInt(sTimestamp);
	}

	onkeydown(event) {
		if (isEnter(event)) {
			return this._handleEnter(event);
		}

		if (isSpace(event)) {
			return this._handleSpace(event);
		}
	}

	_handleEnter(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCYearPickerItem") > -1) {
			const timestamp = this.getTimestampFromDom(event.ui5target);

			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("selectedYearChange", { timestamp });
		}
	}

	_handleSpace(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCYearPickerItem") > -1) {
			const timestamp = this.getTimestampFromDom(event.ui5target);

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

		this.timestamp = oCalDate.valueOf() / 1000;
	}

	get classes() {
		return {
			main: {
				sapWCYearPicker: true,
				sapUiSizeCompact: getCompactSize(),
			},
			yearInterval: {
				sapWCYearPickerIntervalContainer: true,
			},
		};
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
