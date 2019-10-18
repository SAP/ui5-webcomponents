import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getFormatLocale } from "@ui5/webcomponents-base/dist/FormatSettings.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import LocaleData from "@ui5/webcomponents-core/dist/sap/ui/core/LocaleData.js";
import { getLocale } from "@ui5/webcomponents-base/dist/LocaleProvider.js";
import CalendarType from "@ui5/webcomponents-base/dist/dates/CalendarType.js";
import CalendarDate from "@ui5/webcomponents-base/dist/dates/CalendarDate.js";
import getShadowDOMTarget from "@ui5/webcomponents-base/dist/events/getShadowDOMTarget.js";
import MonthPickerTemplate from "./generated/templates/MonthPickerTemplate.lit.js";

// Styles
import styles from "./generated/themes/MonthPicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-monthpicker",
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
		 * @type {string}
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
			noAttribute: true,
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
	_eventHandlersByConvention: true,
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
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-monthpicker
 * @public
 */
class MonthPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return MonthPickerTemplate;
	}

	static get styles() {
		return styles;
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
				classes: "ui5-mp-item",
			};

			if (this._month === i) {
				month.classes += " ui5-mp-item--selected";
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
		const eventTarget = getShadowDOMTarget(event);
		if (eventTarget.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(eventTarget);
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
		const eventTarget = getShadowDOMTarget(event);
		event.preventDefault();
		if (eventTarget.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(eventTarget);
			this.timestamp = timestamp;
			this.fireEvent("selectedMonthChange", { timestamp });
		}
	}

	getTimestampFromDOM(domNode) {
		const oMonthDomRef = domNode.getAttribute("data-sap-timestamp");
		return parseInt(oMonthDomRef);
	}

	get styles() {
		return {
			main: {
				display: this._hidden ? "none" : "",
			},
		};
	}
}

MonthPicker.define();

export default MonthPicker;
