import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ButtonDesign from "./types/ButtonDesign.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";
import {
	CALENDAR_HEADER_NEXT_BUTTON,
	CALENDAR_HEADER_PREVIOUS_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import styles from "./generated/themes/CalendarHeader.css.js";

const metadata = {
	tag: "ui5-calendar-header",
	properties: {
		monthText: {
			type: String,
		},
		yearText: {
			type: String,
		},
		_btnPrev: {
			type: Object,
		},
		_btnNext: {
			type: Object,
		},
		_btn1: {
			type: Object,
		},
		_btn2: {
			type: Object,
		},
		_isNextButtonDisabled: {
			type: Boolean,
		},
		_isPrevButtonDisabled: {
			type: Boolean,
		},
		_isMonthButtonHidden: {
			type: Boolean,
		},
		_tabIndex: {
			type: String,
			defaultValue: "0",
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
		return [Button, Icon];
	}

	constructor() {
		super();
		this._btnPrev = {};
		this._btnPrev.icon = "slim-arrow-left";

		this._btnNext = {};
		this._btnNext.icon = "slim-arrow-right";

		this._btn1 = {};
		this._btn1.type = ButtonDesign.Transparent;

		this._btn2 = {};
		this._btn2.type = ButtonDesign.Transparent;

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this._btn1.text = this.monthText;
		this._btn2.text = this.yearText;
		this._btnPrev.classes = "ui5-calheader-arrowbtn";
		this._btnNext.classes = "ui5-calheader-arrowbtn";

		if (this._isNextButtonDisabled) {
			this._btnNext.classes += " ui5-calheader-arrowbtn-disabled";
		}

		if (this._isPrevButtonDisabled) {
			this._btnPrev.classes += " ui5-calheader-arrowbtn-disabled";
		}
	}

	_handlePrevPress(event) {
		this.fireEvent("previous-press", event);
	}

	_handleNextPress(event) {
		this.fireEvent("next-press", event);
	}

	_showMonthPicker(event) {
		this.fireEvent("show-month-press", event);
	}

	_showYearPicker(event) {
		this.fireEvent("show-year-press", event);
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			const showPickerButton = event.target.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
			}
		}
	}

	_onMidContainerKeyDown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	get _prevButtonText() {
		return this.i18nBundle.getText(CALENDAR_HEADER_PREVIOUS_BUTTON);
	}

	get _nextButtonText() {
		return this.i18nBundle.getText(CALENDAR_HEADER_NEXT_BUTTON);
	}
}

CalendarHeader.define();

export default CalendarHeader;
