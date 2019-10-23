import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getFormatLocale } from "@ui5/webcomponents-base/dist/FormatSettings.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { getLocale } from "@ui5/webcomponents-base/dist/LocaleProvider.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import getShadowDOMTarget from "@ui5/webcomponents-base/dist/events/getShadowDOMTarget.js";
import DateFormat from "@ui5/webcomponents-core/dist/sap/ui/core/format/DateFormat.js";
import CalendarType from "@ui5/webcomponents-base/dist/dates/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-base/dist/dates/CalendarDate.js";
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
		 * @type {string}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
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
	},
	events: /** @lends  sap.ui.webcomponents.main.YearPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		selectedYearChange: {},
	},
	_eventHandlersByConvention: true,
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
				id: `${this._state._id}-y${timestamp}`,
				year: oYearFormat.format(oCalDate.toLocalJSDate()),
				classes: "ui5-yp-item",
			};

			if (oCalDate.getYear() === this._selectedYear) {
				year.classes += " ui5-yp-item--selected";
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

	onclick(event) {
		const eventTarget = getShadowDOMTarget(event);
		if (eventTarget.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(eventTarget);
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
		const eventTarget = getShadowDOMTarget(event);
		event.preventDefault();
		if (eventTarget.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(eventTarget);

			this.timestamp = timestamp;
			this._selectedYear = this._year;
			this._itemNav.current = YearPicker._MIDDLE_ITEM_INDEX;
			this.fireEvent("selectedYearChange", { timestamp });
		}
	}

	_handleSpace(event) {
		const eventTarget = getShadowDOMTarget(event);
		event.preventDefault();
		if (eventTarget.className.indexOf("ui5-yp-item") > -1) {
			const timestamp = this.getTimestampFromDom(eventTarget);

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
