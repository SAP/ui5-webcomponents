import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TimePickerTemplate from "./generated/templates/TimePickerTemplate.lit.js";
import Popover from "./Popover.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import DateFormat from "@ui5/webcomponents-utils/dist/sap/ui/core/format/DateFormat.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { getLocale } from "@ui5/webcomponents-base/dist/LocaleProvider.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-timepicker",
	properties: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
 * Defines a formatted time value.
 *
 * @type {string}
 * @defaultvalue ""
 * @public
 */
		value: {
			type: String,
			defaultValue: ""
		},

		/**
		 * Visualizes the validation state of the Web Component, for example
		 * <code>Error</code>, <code>Warning</code> and
		 * <code>Success</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
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
			defaultValue: "HH:mm:ss"
		},

		/**
		 * Visualizes the validation state of the Web Component, for example
		 * <code>Error</code>, <code>Warning</code> and
		 * <code>Success</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * <code>ui5-datepicker</code> has no value.
		 *
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the <code>ui5-time-picker</code> appear empty - without placeholder or format pattern.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		placeholder: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Determines whether the <code>ui5-datepicker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-datepicker</code> is displayed as readonly.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		_isPickerOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_popover: {
			type: Object,
		},

		_hours: {
			type: String,
		},

		_minutes: {
			type: String,
		},

		_seconds: {
			type: String,
		},

		isTwelveHoursFormat: {
			type: Boolean,
		}
	},
	slots: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-timepicker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/TimePicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimePicker
 * @extends UI5Element
 * @tagname ui5-timepicker
 * @public
 */
class TimePicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TimePickerCss;
	}

	static get template() {
		return TimePickerTemplate;
	}

	static async define(...params) {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);

		super.define(...params);
	}

	constructor() {
		super();

		this.readonly = false;
		this.disabled = false;
		this._isPickerOpen = false;
		//this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		//this._scroller = new ScrollEnablement(this);

		this._popover = {
			placementType: PopoverPlacementType.Bottom,
			horizontalAlign: PopoverHorizontalAlign.Left,
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			afterClose: () => {
				this._isPickerOpen = false;
			}
		};
	}

	onBeforeRendering() {
		if (!this.value) {
			this.value = this.getFormat().format(new Date());
		} 
	}

	onAfterRendering() {
		let sliders = this._getPopover().default.filter(x => x.isUI5Element),
			slidersEnablementArray = this._getSlidersContained(this.formatPattern);

		for (let i = 0; i < sliders.length; i++) {
			sliders[i].disabled = !slidersEnablementArray[i];
		}

		this.setSlidersValue();
	}

	_handleInputChange() {
		let nextValue = this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		if (isValid) {
			nextValue = this.normalizeValue(nextValue);
		}

		this.value = nextValue;
		this.fireEvent("change", { value: nextValue, valid: isValid });
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue(),
			isValid = this.isValid(nextValue);

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	setSlidersValue() {
		let currentDate = this._getInput ? this.getFormat().parse(this._getInput().value) : null,
			secondsSlider = this.shadowRoot.querySelector(".ui5-timepicker-seconds-slider"),
			minutesSlider = this.shadowRoot.querySelector(".ui5-timepicker-minutes-slider"),
			hoursSlider = this.shadowRoot.querySelector(".ui5-timepicker-hours-slider"),
			periodsSlider = this.shadowRoot.querySelector(".ui5-timepicker-periods-slider");

		if (currentDate) {
			if (hoursSlider){
				if (this.isTwelveHoursFormat && currentDate.getHours() > 11){
					hoursSlider.value = currentDate.getHours() - 12;
				} else {
					hoursSlider.value = currentDate.getHours();
				} 
			}
			if (minutesSlider) {
				minutesSlider.value = currentDate.getMinutes();
			}
			if (secondsSlider) {
				secondsSlider.value = currentDate.getSeconds();
			}
			if (this.isTwelveHoursFormat && periodsSlider) {
				periodsSlider.value = currentDate.getHours() > 11 ? "PM" : "AM";
			}
		}
	}

	closePicker() {
		let sliders = this._getPopover().default.filter(x => x.isUI5Element);

		this._getPopover().close();

		for (let i = 0; i < sliders.length; i++) {
			sliders[i].collapseSlider();
		}
	}

	openPicker() {
		this._getPopover().openBy(this);
		this._isPickerOpen = true;
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}
	/**
	 * Checks if the picker is open.
	 * @returns {Boolean} true if the picker is open, false otherwise
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_getPopover() {
		return this.shadowRoot.querySelector("ui5-popover");
	}

	generateTimeItemsArray(x) {
		let array = [...Array(x).keys()];

		array = array.map(i => '' + i);

		return array;
	}

	get secondsArray() {
		return this.generateTimeItemsArray(60);
	}

	get minutesArray() {
		return this.generateTimeItemsArray(60);
	}

	get hoursArray() {
		if (this.isTwelveHoursFormat) {
			return this.generateTimeItemsArray(12);
		}
		return this.generateTimeItemsArray(24);
	}

	get periodsArray() {
		return ["AM", "PM"];
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	submitPickers() {
		let selectedDate = new Date(),
			secondsSlider = this.shadowRoot.querySelector(".ui5-timepicker-seconds-slider"),
			minutesSlider = this.shadowRoot.querySelector(".ui5-timepicker-minutes-slider"),
			hoursSlider = this.shadowRoot.querySelector(".ui5-timepicker-hours-slider"),
			periodsSlider = this.shadowRoot.querySelector(".ui5-timepicker-periods-slider"),
			hours = hoursSlider ? hoursSlider.value : "0",
			minutes = minutesSlider ? minutesSlider.value : "0",
			seconds = secondsSlider ? secondsSlider.value : "0",
			period = periodsSlider ? periodsSlider.value : "AM";

		if (period === "PM") {
			selectedDate.setHours(hours*1 + 12);
		} else {
			selectedDate.setHours(hours);
		}
		selectedDate.setMinutes(minutes);
		selectedDate.setSeconds(seconds);

		this.setValue(this.getFormat().format(selectedDate));

		this.closePicker();
	}

	/**
	 * Checks if a value is valid against the current time format of the TimePicker
	 * @param {string} value A value to be tested against the current time format
	 * @public
	 */
	isValid(value = "") {
		return !!(value && this.getFormat().parse(value));
	}

	// because the parser understands more than one format
	// but we need values in one format
	normalizeValue(sValue) {
		return this.getFormat().format(this.getFormat().parse(sValue));
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _displayFormat() {
		return this.getFormat().oFormatOptions.pattern;
	}

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	handleSliderClicked(event) {
		let sliders = this._getPopover().default.filter(x => x.isUI5Element);
		if (event.target._expanded) {
			for (var i = 0; i < sliders.length; i++) {
				if (sliders[i].label !== event.target.label) {
					sliders[i].collapseSlider();
				}
			}
		}
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
			});
		}

		return this._oDateFormat;
	}


	setValue(value) {
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
		} else {
			this.valueState = ValueState.Error;
		}
	}

	_getSlidersContained() {
		let formatArray = this.getFormat().aFormatArray,
			slidersBuildArray = [false, false, false, false]; // hours minutes seconds am/pm

		for (var i = 0; i < formatArray.length; i++) {
			if (formatArray[i].type === "hour0_23") {
				slidersBuildArray[0] = true;
				this.isTwelveHoursFormat = false;
			}
			if (formatArray[i].type === "hour1_12") {
				slidersBuildArray[3] = true;
				slidersBuildArray[0] = true;
				this.isTwelveHoursFormat = true;
			}
			if (formatArray[i].type === "minute") {
				slidersBuildArray[1] = true;
			}
			if (formatArray[i].type === "second") {
				slidersBuildArray[2] = true;
			}
		}

		return slidersBuildArray;
	}

	get shouldBuildHoursSlider() {
		return this._getSlidersContained()[0];
	}
	get shouldBuildMinutesSlider() {
		return this._getSlidersContained()[1];
	}
	get shouldBuildSecondsSlider() {
		return this._getSlidersContained()[2];
	}
	get shouldBuildPeriodsSlider() {
		return this._getSlidersContained()[3];
	}
}

TimePicker.define();

export default TimePicker;
