import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
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
		 * @defaultvalue ""
		 * @since 1.0.0-rc.6
		 * @public
		 */
		maxDate: {
			type: String,
		},

		_quarters: {
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
	events: /** @lends  sap.ui.webcomponents.main.MonthPicker.prototype */ {
		/**
		 * Fired when the user selects a new Date on the Web Component.
		 * @public
		 * @event
		 */
		change: {},
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
		this._oLocale = getLocale();
		this._oLocaleData = new LocaleData(this._oLocale);

		this._itemNav = new ItemNavigation(this, {
			pageSize: 12,
			rowSize: 3,
			behavior: ItemNavigationBehavior.Paging,
		});

		this._itemNav.getItemsCallback = function getItemsCallback() {
			const focusableMonths = [];

			for (let i = 0; i < this._quarters.length; i++) {
				const quarter = this._quarters[i].filter(x => !x.disabled);
				focusableMonths.push(quarter);
			}

			return [].concat(...focusableMonths);
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
				id: `${this._id}-m${i}`,
				name: this._oLocaleData.getMonths("wide", this._primaryCalendarType)[i],
				classes: "ui5-mp-item",
			};

			if (this._month === i) {
				month.classes += " ui5-mp-item--selected";
			}

			if ((this.minDate || this.maxDate) && this._isOutOfSelectableRange(i)) {
				month.classes += " ui5-mp-item--disabled";
				month.disabled = true;
			}

			const quarterIndex = parseInt(i / 3);

			if (quarters[quarterIndex]) {
				quarters[quarterIndex].push(month);
			} else {
				quarters[quarterIndex] = [month];
			}
		}

		this._quarters = quarters;
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

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	_onclick(event) {
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(event.target);
			this.timestamp = timestamp;
			this._itemNav.current = this._month;
			this.fireEvent("change", { timestamp });
		}
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			this._activateMonth(event);
		}
	}

	_activateMonth(event) {
		event.preventDefault();
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDOM(event.target);
			this.timestamp = timestamp;
			this.fireEvent("change", { timestamp });
		}
	}

	_isOutOfSelectableRange(monthIndex) {
		const currentDateYear = this._localDate.getFullYear(),
			minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && ((currentDateYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) || currentDateYear < minDate.getFullYear()),
			maxDateCheck = maxDate && ((currentDateYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) || (currentDateYear > maxDate.getFullYear()));

		return maxDateCheck || minDateCheck;
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

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
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
