import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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

		/**
		 * Already normalized by Calendar
		 * @sience 1.0.0-rc.16
		 * @defaultvalue undefined
		 * @type {CalendarType}
		 * @public
		 */
		secondaryCalendarType: {
			type: CalendarType,
		},

		/**
		 * Stores information for month button for secondary calendar type
		 * @type {Object}
		 * @private
		*/
		buttonTextForSecondaryCalendarType: {
			type: Object,
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

		_monthButtonText: {
			type: String,
		},

		_yearButtonText: {
			type: String,
		},

		_yearButtonTextSecType: {
			type: String,
		},

		isYearButtonHidden: {
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
		CalendarHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._prevButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
		this._nextButtonText = CalendarHeader.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);

		if (this.hasSecondaryCalendarType) {
			this._secondMonthButtonText = this.buttonTextForSecondaryCalendarType.monthButtonText;
			this._secondYearButtonText = this.buttonTextForSecondaryCalendarType.yearButtonText;
		}
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

	get hasSecondaryCalendarType() {
		return !!this.secondaryCalendarType;
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

	get accInfo() {
		return {
			ariaLabelMonthButton: this.hasSecondaryCalendarType
				? `${this._monthButtonText}, ${this.buttonTextForSecondaryCalendarType.monthButtonInfo}` : `${this._monthButtonText}`,
		};
	}
}

CalendarHeader.define();

export default CalendarHeader;
