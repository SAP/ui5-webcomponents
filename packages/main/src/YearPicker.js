import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import ItemNavigation from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ItemNavigation";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat";
import CalendarType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarType";
import CalendarDate from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/dates/CalendarDate";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import YearPickerTemplateContext from "./YearPickerTemplateContext";
import YearPickerRenderer from "./build/compiled/YearPickerRenderer.lit";

import belize from "./themes/sap_belize/YearPicker.less";
import belizeHcb from "./themes/sap_belize_hcb/YearPicker.less";
import fiori3 from "./themes/sap_fiori_3/YearPicker.less";

ShadowDOM.registerStyle("sap_belize", "YearPicker.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "YearPicker.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "YearPicker.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-yearpicker",
	styleUrl: [
		"YearPicker.css",
	],
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
		 * @type {String}
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

const ITEMS_COUNT = 20;
const MIDDLE_ITEM_INDEX = 7;

/**
 * @class
 *
 * Displays years which can be selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.YearPicker
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-yearpicker
 * @public
 */
class YearPicker extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return YearPickerRenderer;
	}

	constructor(state) {
		super(state);

		this._oLocale = configuration.getFormatSettings().getFormatLocale();

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
		oCalDate.setYear(oCalDate.getYear() - MIDDLE_ITEM_INDEX - 1);
		const intervals = [];
		let timestamp;

		if (this._selectedYear === undefined) {
			this._selectedYear = this._year;
		}

		for (let i = 0; i < ITEMS_COUNT; i++) {
			const intervalIndex = parseInt(i / 4);
			if (!intervals[intervalIndex]) {
				intervals[intervalIndex] = [];
			}

			oCalDate.setYear(oCalDate.getYear() + 1);

			if (oCalDate.getYear() > 0 && oCalDate.getYear() < 10000) {
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
		return this.primaryCalendarType || configuration.getCalendarType();
	}

	onclick(event) {
		if (event.ui5target.className.indexOf("sapWCYearPickerItem") > -1) {
			const timestamp = this.getTimestampFromDom(event.ui5target);
			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = MIDDLE_ITEM_INDEX;
			this.fireEvent("selectedYearChange", { timestamp });
		}
	}

	getTimestampFromDom(domNode) {
		const sTimestamp = domNode.getAttribute("data-sap-timestamp");
		return parseInt(sTimestamp);
	}

	static get calculateTemplateContext() {
		return YearPickerTemplateContext.calculate;
	}

	onsapenter(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCYearPickerItem") > -1) {
			const timestamp = this.getTimestampFromDom(event.ui5target);

			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = MIDDLE_ITEM_INDEX;
			this.fireEvent("selectedYearChange", { timestamp });
		}
	}

	onsapspace(event) {
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
			oCalDate.setYear(oCalDate.getYear() + ITEMS_COUNT);
		} else if (event.start) {
			if (oCalDate.getYear() - MIDDLE_ITEM_INDEX < 1) {
				return;
			}
			oCalDate.setYear(oCalDate.getYear() - ITEMS_COUNT);
		}

		if (oCalDate.getYear() - MIDDLE_ITEM_INDEX > 9999) {
			return;
		}

		this.timestamp = oCalDate.valueOf() / 1000;
	}
}

Bootstrap.boot().then(_ => {
	YearPicker.define();
});

export default YearPicker;
