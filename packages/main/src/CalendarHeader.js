import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import CalendarHeaderTemplateContext from "./CalendarHeaderTemplateContext";
import Button from "./Button";
import ButtonType from "./types/ButtonType";
import CalendarHeaderRenderer from "./build/compiled/CalendarHeaderRenderer.lit";

// Styles
import styles from "./themes/CalendarHeader.css";

addCustomCSS("ui5-calendar-header", "sap_belize", styles);
addCustomCSS("ui5-calendar-header", "sap_belize_hcb", styles);
addCustomCSS("ui5-calendar-header", "sap_fiori_3", styles);

const metadata = {
	tag: "ui5-calendar-header",
	styleUrl: [
		"CalendarHeader.css",
	],
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
	},
	events: {
		pressPrevious: {},
		pressNext: {},
		btn1Press: {},
		btn2Press: {},
	},
};

class CalendarHeader extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return CalendarHeaderRenderer;
	}

	constructor() {
		super();
		this._btnPrev = {};
		this._btnPrev.icon = "sap-icon://slim-arrow-left";

		this._btnNext = {};
		this._btnNext.icon = "sap-icon://slim-arrow-right";

		this._btn1 = {};
		this._btn1.type = ButtonType.Transparent;

		this._btn2 = {};
		this._btn2.type = ButtonType.Transparent;
	}

	onBeforeRendering() {
		this._btn1.text = this.monthText;
		this._btn2.text = this.yearText;
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

	onclick(event) {
		const composedPath = event.composedPath();

		for (let index = 0; index < composedPath.length; index++) {
			const sAttributeValue = composedPath[index].getAttribute && composedPath[index].getAttribute("data-sap-cal-head-button");
			const showPickerButton = event.ui5target.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
				return;
			}

			if (sAttributeValue) {
				this[`_handle${sAttributeValue}Press`]();
				return;
			}
		}
	}

	onkeydown(event) {
		if (event.which === KeyCodes.SPACE || event.which === KeyCodes.ENTER) {
			const showPickerButton = event.ui5target.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
			}
		}
	}

	static get calculateTemplateContext() {
		return CalendarHeaderTemplateContext.calculate;
	}

	static async define(...params) {
		await Button.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	CalendarHeader.define();
});

export default CalendarHeader;
