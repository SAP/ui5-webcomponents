import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import getShadowDOMTarget from "@ui5/webcomponents-base/dist/events/getShadowDOMTarget.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import Button from "./Button.js";
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
		this._btnPrev.icon = "sap-icon://slim-arrow-left";

		this._btnNext = {};
		this._btnNext.icon = "sap-icon://slim-arrow-right";

		this._btn1 = {};
		this._btn1.type = ButtonDesign.Transparent;

		this._btn2 = {};
		this._btn2.type = ButtonDesign.Transparent;
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
		const eventTarget = getShadowDOMTarget(event);

		for (let index = 0; index < composedPath.length; index++) {
			const sAttributeValue = composedPath[index].getAttribute && composedPath[index].getAttribute("data-sap-cal-head-button");
			const showPickerButton = eventTarget.getAttribute("data-sap-show-picker");

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
		const eventTarget = getShadowDOMTarget(event);
		if (isSpace(event) || isEnter(event)) {
			const showPickerButton = eventTarget.getAttribute("data-sap-show-picker");

			if (showPickerButton) {
				this[`_show${showPickerButton}Picker`]();
			}
		}
	}

	get classes() {
		return {
			main: {
				"ui5-calheader-root": true,
				"sapUiSizeCompact": getCompactSize(),
			},
			buttons: {
				"ui5-calheader-arrowbtn": true,
			},
			middleButtons: {
				"ui5-calheader-middlebtn": true,
				"ui5-calheader-arrowbtn": true,
			},
		};
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	static async define(...params) {
		await Button.define();

		super.define(...params);
	}
}

CalendarHeader.define();

export default CalendarHeader;
