import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Icon from "./Icon.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";
import {
	CALENDAR_HEADER_NEXT_BUTTON,
	CALENDAR_HEADER_PREVIOUS_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/CalendarHeader.css.js";

const metadata = {
	tag: "ui5-calendar-header",
	languageAware: true,
	properties: {
		/**
		 * Already normalized by Calendar
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Already normalized by Calendar
		 * @type {CalendarType}
		 * @public
		 */
		primaryCalendarType: {
			type: CalendarType,
		},

		isNextButtonDisabled: {
			type: Boolean,
		},

		isPrevButtonDisabled: {
			type: Boolean,
		},

		isMonthButtonHidden: {
			type: Boolean,
		},
	},
	events: {
		"previous-press": {},
		"next-press": {},
		"show-month-press": {},
		"show-year-press": {},
	},
};

class CalendarHeader extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return CalendarHeaderTemplate;
	}

	static get styles() {
		return styles;
	}

	static get dependencies() {
		return [Icon];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		const localeData = getCachedLocaleDataInstance(getLocale());
		const yearFormat = DateFormat.getDateInstance({ format: "y", calendarType: this.primaryCalendarType });
		const localDate = new Date(this.timestamp * 1000);
		const calendarDate = CalendarDate.fromTimestamp(localDate.getTime(), this.primaryCalendarType);

		this._monthButtonText = localeData.getMonths("wide", this.primaryCalendarType)[calendarDate.getMonth()];
		this._yearButtonText = yearFormat.format(localDate, true);
		this._prevButtonText = this.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
		this._nextButtonText = this.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);
	}

	onPrevButtonClick(event) {
		this.fireEvent("previous-press", event);
	}

	onNextButtonClick(event) {
		this.fireEvent("next-press", event);
	}

	onMonthButtonClick(event) {
		this.fireEvent("show-month-press", event);
	}

	onMonthButtonKeyDown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.fireEvent("show-month-press", event);
		}
	}

	onMonthButtonKeyUp(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this.fireEvent("show-month-press", event);
		}
	}

	onYearButtonClick(event) {
		this.fireEvent("show-year-press", event);
	}

	onYearButtonKeyDown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.fireEvent("show-year-press", event);
		}
	}

	onYearButtonKeyUp(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this.fireEvent("show-year-press", event);
		}
	}

	get classes() {
		return {
			prevButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this.isPrevButtonDisabled,
			},
			nextButton: {
				"ui5-calheader-arrowbtn": true,
				"ui5-calheader-arrowbtn-disabled": this.isNextButtonDisabled,
			},
		};
	}
}

CalendarHeader.define();

export default CalendarHeader;
