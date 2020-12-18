import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
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

	constructor() {
		super();

		this._itemNav = new ItemNavigation(this, {
			pageSize: 12,
			rowSize: 3,
			behavior: ItemNavigationBehavior.Paging,
			getItemsCallback: () => this.focusableMonths,
			affectedPropertiesNames: ["_quarters"],
		});

		this._itemNav.attachEvent(
			ItemNavigation.BORDER_REACH,
			this._handleItemNavigationBorderReach.bind(this)
		);
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());

		const quarters = [];
		const oCalDate = this._calendarDate;
		let timestamp;

		/* eslint-disable no-loop-func */
		for (let i = 0; i < 12; i++) {
			oCalDate.setMonth(i);
			timestamp = oCalDate.valueOf() / 1000;

			const month = {
				timestamp: timestamp.toString(),
				id: `${this._id}-m${i}`,
				selected: this.selectedDates.some(d => d === timestamp),
				name: localeData.getMonths("wide", this._primaryCalendarType)[i],
				classes: "ui5-mp-item",
			};

			if (month.selected) {
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

	_setCurrentItemTabIndex(index) {
		const currentItem = this._itemNav._getCurrentItem();
		if (currentItem) {
			currentItem.setAttribute("tabindex", index.toString());
		}
	}

	_onmousedown(event) {
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const targetTimestamp = this.getTimestampFromDom(event.target);
			const focusedItem = this.focusableMonths.find(item => parseInt(item.timestamp) === targetTimestamp);
			this._itemNav.update(focusedItem);
		}
	}

	_onmouseup(event) {
		if (event.target.className.indexOf("ui5-mp-item") > -1) {
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
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
			const timestamp = this.getTimestampFromDom(event.target);
			this.timestamp = timestamp;
			this.fireEvent("change", { timestamp });
		}
	}

	_handleItemNavigationBorderReach(event) {
		if (this._isOutOfSelectableRange(this._month)) {
			return;
		}

		this.fireEvent("navigate", event);
	}

	_isOutOfSelectableRange(monthIndex) {
		const currentDateYear = this._localDate.getFullYear(),
			minDate = new Date(this._minDate),
			maxDate = new Date(this._maxDate),
			minDateCheck = minDate && ((currentDateYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) || currentDateYear < minDate.getFullYear()),
			maxDateCheck = maxDate && ((currentDateYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) || (currentDateYear > maxDate.getFullYear()));

		return maxDateCheck || minDateCheck;
	}

	get focusableMonths() {
		const focusableMonths = [];

		for (let i = 0; i < this._quarters.length; i++) {
			const quarter = this._quarters[i].filter(x => !x.disabled);
			focusableMonths.push(quarter);
		}

		return [].concat(...focusableMonths);
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
