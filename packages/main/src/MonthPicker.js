import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import { getCalendarType } from "@ui5/webcomponents-base/src/Configuration";
import { getFormatLocale } from "@ui5/webcomponents-base/src/FormatSettings";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation";
import Integer from "@ui5/webcomponents-base/src/types/Integer";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData";
import { getLocale } from "@ui5/webcomponents-base/src/LocaleProvider";
import CalendarType from "@ui5/webcomponents-base/src/dates/CalendarType";
import CalendarDate from "@ui5/webcomponents-base/src/dates/CalendarDate";
import ShadowDOM from "@ui5/webcomponents-base/src/compatibility/ShadowDOM";
import MonthPickerTemplateContext from "./MonthPickerTemplateContext";
import MonthPickerRenderer from "./build/compiled/MonthPickerRenderer.lit";

// Styles
import belize from "./themes/sap_belize/MonthPicker.less";
import belizeHcb from "./themes/sap_belize_hcb/MonthPicker.less";
import fiori3 from "./themes/sap_fiori_3/MonthPicker.less";

ShadowDOM.registerStyle("sap_belize", "MonthPicker.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "MonthPicker.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "MonthPicker.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-month-picker",
	styleUrl: [
		"MonthPicker.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
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
		_quarters: {
			type: Object,
			multiple: true,
		},
		_hidden: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		selectedMonthChange: {},
	},
};

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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-month-picker
 * @public
 */
class MonthPicker extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return MonthPickerRenderer;
	}

	constructor() {
		super();
		this._oLocale = getFormatLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, { rowSize: 3, cyclic: true });
		this._itemNav.getItemsCallback = function getItemsCallback() {
			return [].concat(...this._quarters);
		}.bind(this);
		this._itemNav.setItemsCallback = function setItemsCallback(items) {
			this._quarters = items;
		}.bind(this);

		this._delegates.push(this._itemNav);
	}

	onBeforeRendering() {
		const quarters = [];
		const oCalDate = CalendarDate.fromTimestamp(new Date().getTime(), this._primaryCalendarType);
		let timestamp;

		for (let i = 0; i < 12; i++) {
			oCalDate.setMonth(i);
			timestamp = oCalDate.valueOf() / 1000;

			const month = {
				timestamp: timestamp.toString(),
				id: `${this._state._id}-m${i}`,
				name: this._oLocaleData.getMonths("wide", this._primaryCalendarType)[i],
				classes: "sapWCMonthPickerItem",
			};

			if (this._month === i) {
				month.classes += " sapWCMonthPickerItemSel";
			}

			const quarterIndex = parseInt(i / 3);

			if (quarters[quarterIndex]) {
				quarters[quarterIndex].push(month);
			} else {
				quarters[quarterIndex] = [month];
			}
		}

		this._quarters = quarters;

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

	get _month() {
		return this._calendarDate.getMonth();
	}

	get _primaryCalendarType() {
		return this.primaryCalendarType || getCalendarType() || LocaleData.getInstance(getLocale()).getPreferredCalendarType();
	}

	onclick(event) {
		if (event.ui5target.className.indexOf("sapWCMonthPickerItem") > -1) {
			const timestamp = this.getTimestampFromDOM(event.ui5target);
			this.timestamp = timestamp;
			this._itemNav.current = this._month;
			this.fireEvent("selectedMonthChange", { timestamp });
		}
	}

	onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			this._activateMonth(event);
		}
	}

	_activateMonth(event) {
		event.preventDefault();
		if (event.ui5target.className.indexOf("sapWCMonthPickerItem") > -1) {
			const timestamp = this.getTimestampFromDOM(event.ui5target);
			this.timestamp = timestamp;
			this.fireEvent("selectedMonthChange", { timestamp });
		}
	}

	getTimestampFromDOM(domNode) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
		return parseInt(oMonthDomRef);
	}

	static get calculateTemplateContext() {
		return MonthPickerTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	MonthPicker.define();
});

export default MonthPicker;
