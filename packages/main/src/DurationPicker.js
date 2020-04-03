import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isShow } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import DurationPickerTemplate from "./generated/templates/DurationPickerTemplate.lit.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import WheelSlider from "./WheelSlider.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Input from "./Input.js";
import DurationPickerPopoverTemplate from "./generated/templates/DurationPickerPopoverTemplate.lit.js";
import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import DurationPickerCss from "./generated/themes/DurationPicker.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import DurationPickerPopoverCss from "./generated/themes/DurationPickerPopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-duration-picker",
	properties: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		/**
		 * Defines a formatted time value.
		 *
		 * @type {string}
		 * @defaultvalue "00:00:00"
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "00:00:00",
		},

		/**
		 * Defines a formatted maximal time that the user will be able to adjust.
		 *
		 * @type {string}
		 * @defaultvalue "00:00:00"
		 * @public
		 */
		maxValue: {
			type: String,
		},
		/**
		 * Defines whether a slider for secconds will be available. By default there are sliders for hours and minutes only.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showSeconds: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-duration-picker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-duration-picker</code> is displayed as readonly.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Visualizes the validation state of the Web Component, for example
		 * <code>Error</code>, <code>Warning</code> and
		 * <code>Success</code>.
		 *
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
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
		 * @private
		 */
		_isPickerOpen: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_maxValue: {
			type: String,
			multiple: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.DurationPicker.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		*/
		change: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-duration-picker</code> component provides an input field with assigned sliders which opens on user action.
 * The <code>ui5-duration-picker</code> allows users to select a time duration.
 * It consists of two parts: the time input field and the sliders.
 *
 *
 * <h3>Usage</h3>
 *
 *
 * The Duration Picker is used for input of time. Users are able to select hours, minutes and seconds.
 * The user can enter a time by:
 * <ul>
 * <li>Using the sliders that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and chooses the enter key, the sliders shows the corresponding time.
 * When the user directly triggers the sliders display, the actual time is displayed.
 *
 * For the <code>ui5-duration-picker</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/DurationPicker.js";</code>
 *
 * @constructor
 * @since 1.0.0-rc.7
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DurationPicker
 * @extends UI5Element
 * @tagname ui5-duration-picker
 * @public
 */
class DurationPicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return DurationPickerCss;
	}

	static get template() {
		return DurationPickerTemplate;
	}

	static get staticAreaTemplate() {
		return DurationPickerPopoverTemplate;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, DurationPickerPopoverCss];
	}

	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

		this._respPopover = {
			placementType: PopoverPlacementType.Bottom,
			horizontalAlign: PopoverHorizontalAlign.Left,
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			_onAfterClose: () => {
				this._isPickerOpen = false;
			},
		};
	}

	onBeforeRendering() {
		this.checkValue();
	}

	checkValue() {
		this._setValue("maxValue");
		this.setSelectedValues();
		this.normalizaValue();
	}

	normalizaValue() {
		this.value = `${this.selectedHours || "00"}:${this.selectedMinutes || "00"}${this.showSeconds ? `:${this.selectedSeconds || "00"}` : ""}`;
	}

	/**
	 * reads string from format hh:mm:ss
	 * @private
	 */
	readFormattedValue(value) {
		value = value.replace(/\s/g, ""); // Remove spaces
		return value.split(":");
	}

	setSelectedValues() {
		const destructuredValues = this.readFormattedValue(this.value || "");
		let currentHours = destructuredValues[0],
			currentMinutes = destructuredValues[1],
			currentSeconds = destructuredValues[2];

		if (currentHours > -1) {
			if (currentHours > this._maxValue[0]) {
				currentHours = this._maxValue[0];
			}

			this.selectedHours = this._formatSelectedValue(currentHours, 23);
		}

		if (currentMinutes > -1) {
			if (this._maxValue[0] && this.selectedHours === this._maxValue[0]) {
				currentMinutes = currentMinutes > this._maxValue[1] ? this._maxValue[1] : currentMinutes;
			} else if (currentMinutes > this._maxValue[1]) {
				currentMinutes = this._maxValue[1];
			}

			this.selectedMinutes = this._formatSelectedValue(currentMinutes, 59);
		}

		if (currentSeconds > -1) {
			if (this._maxValue[0] && this._maxValue[1] && this.selectedHours >= this._maxValue[0] && this.selectedSeconds >= this._maxValue[1]) {
				currentSeconds = currentSeconds > this._maxValue[2] ? this._maxValue[2] : currentSeconds;
			} else if (currentSeconds > this._maxValue[2]) {
				currentSeconds = this._maxValue[2];
			}

			this.selectedSeconds = this._formatSelectedValue(currentSeconds, 59);
		}
	}

	_formatSelectedValue(currentValue, maximum) {
		if (currentValue.length === 1) {
			return `0${currentValue}`;
		}

		if (parseInt(currentValue) < 0 || parseInt(currentValue) > maximum) {
			return "00";
		}

		return currentValue;
	}

	/**
	 * Reads maxValue and stores it as array _maxValue
	 * @param {string} name the name of the property to read(could be used for _minValue e.g.)
	 * @private
	 */
	_setValue(name) {
		const _value = this[name];
		if (!_value) {
			return;
		}
		const temp = this.readFormattedValue(_value);
		this[`_${name}`] = temp;
	}

	_onkeydown(event) {
		if (isShow(event)) {
			this.togglePicker();
		}
	}

	generateTimeItemsArray(arrayLength) {
		const resultArray = [];
		for (let i = 0; i < arrayLength; i++) {
			let tempString = i.toString();
			if (tempString.length === 1) {
				tempString = `0${tempString}`;
			}

			resultArray.push(tempString);
		}

		return resultArray;
	}

	submitPickers() {
		const prevValue = this.value;
		this.value = `${this.hoursSlider.value}:${this.minutesSlider.value}${this.showSeconds ? `:${this.secondsSlider.value}` : ""}`;
		this.togglePicker();
		if (prevValue !== this.value) {
			this.fireEvent("change", { value: this.value });
		}
	}

	_handleInputChange(event) {
		const prevValue = this.value;
		this.value = event.target.value;
		this.checkValue();

		if (prevValue !== this.value) {
			this.fireEvent("change", { value: this.value });
		}
	}

	_handleKeysDown(event) {
		if (isShow(event)) {
			event.preventDefault();
			this.togglePicker();
		}
	}

	async _handleInputLiveChange() {
		await this._getResponsivePopover();

		if (this.responsivePopover.opened) {
			this.togglePicker();
		}
	}

	async togglePicker() {
		await this._getResponsivePopover();

		if (this.responsivePopover.opened) {
			this._isPickerOpen = false;
			this.responsivePopover.close();
		} else {
			this._isPickerOpen = true;
			this.responsivePopover.open(this);
		}
	}

	async _getResponsivePopover() {
		if (this.responsivePopover) {
			return this.responsivePopover;
		}

		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("ui5-responsive-popover");
		return this.responsivePopover;
	}


	get hours() {
		return this.selectedHours;
	}

	get minutes() {
		return this.selectedMinutes;
	}

	get seconds() {
		return this.selectedSeconds;
	}

	get hoursArray() {
		const currentHours = parseInt(this.readFormattedValue(this.maxValue)[0]);
		const hours = currentHours && currentHours > 0 && currentHours < 23 ? currentHours + 1 : 24;
		return this.generateTimeItemsArray(hours);
	}

	get minutesArray() {
		const currentMinutes = parseInt(this.readFormattedValue(this.maxValue)[1]);
		const minutes = currentMinutes && currentMinutes > 0 && currentMinutes < 60 ? currentMinutes + 1 : 60;
		return this.generateTimeItemsArray(minutes);
	}

	get secondsArray() {
		const currentSeconds = parseInt(this.readFormattedValue(this.maxValue)[2]);
		const seconds = currentSeconds && currentSeconds > 0 && currentSeconds < 60 ? currentSeconds + 1 : 60;
		return this.generateTimeItemsArray(seconds);
	}

	get secondsSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-duration-picker-seconds-wheelslider");
	}

	get minutesSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-duration-picker-minutes-wheelslider");
	}

	get hoursSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-duration-picker-hours-wheelslider");
	}

	get hoursSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
	}

	get submitButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get cancelButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get classes() {
		return {
			container: {
				"ui5-duration-picker-sliders-container": true,
				"ui5-phone": isPhone(),
			},
		};
	}

	static async onDefine(...params) {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
			WheelSlider.define(),
			ResponsivePopover.define(),
			Input.define(),
		]);
	}
}

DurationPicker.define();

export default DurationPicker;
