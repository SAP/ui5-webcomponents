import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ButtonDesign from "./types/ButtonDesign.js";
import CalendarHeaderTemplate from "./generated/templates/CalendarHeaderTemplate.lit.js";

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
	},
	events: {
		pressPrevious: {},
		pressNext: {},
		btn1Press: {},
		btn2Press: {},
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
		this.fireEvent("pressPrevious", event);
	}

	_handleNextPress(event) {
		this.fireEvent("pressNext", event);
	}

	_showMonthPicker(event) {
		this.fireEvent("btn1Press", event);
	}

	_showYearPicker(event) {
		this.fireEvent("btn2Press", event);
	}

	_onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			const showPickerButton = event.target.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
			}
		}
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	static async onDefine() {
		await Promise.all([
			await Button.define(),
			await Icon.define(),
		]);
	}
}

CalendarHeader.define();

export default CalendarHeader;
