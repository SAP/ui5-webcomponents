import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import {
	isShow,
	isLeft,
	isRight,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import DurationPickerTemplate from "./generated/templates/DurationPickerTemplate.lit.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import WheelSlider from "./WheelSlider.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Input from "./Input.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import "@ui5/webcomponents-icons/dist/fob-watch.js";
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
	languageAware: true,
	managedSlots: true,
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
		 * Defines the selection step for the minutes
		 * @type {Integer}
		 * @public
		 * @defaultValue 1
		 * @since 1.0.0-rc.8
		 */
		minutesStep: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines the selection step for the seconds
		 * @type {Integer}
		 * @public
		 * @defaultValue 1
		 * @since 1.0.0-rc.8
		 */
		secondsStep: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines a formatted maximal time that the user will be able to adjust.
		 *
		 * @type {string}
		 * @defaultvalue "23:59:59"
		 * @public
		 */
		maxValue: {
			type: String,
			defaultValue: "23:59:59",
		},

		/**
		 * Defines whether a slider for seconds will be available. By default there are sliders for hours, minutes and seconds.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideSeconds: {
			type: Boolean,
		},

		/**
		 * Defines whether the slider for minutes will be available. By default there are sliders for hours, minutes and seconds.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideMinutes: {
			type: Boolean,
		},

		/**
		 * Defines whether the slider for hours will be available. By default there are sliders for hours, minutes and seconds.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		hideHours: {
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
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-duration-picker</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-duration-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.9
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
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
 *
 * <h3>Keyboard handling</h3>
 * [F4], [ALT]+[UP], [ALT]+[DOWN] Open/Close picker dialog and move focus to it.
 * <br>
 * When closed:
 * <ul>
 * <li>[PAGEUP] - Increments hours by 1. If max value is reached, the slider doesn't increment.</li>
 * <li>[PAGEDOWN] - Decrements the corresponding field by 1. If min value is reached, the slider doesn't increment.</li>
 * <li>[SHIFT]+[PAGEUP] Increments minutes by 1.</li>
 * <li>[SHIFT]+ [PAGEDOWN] Decrements minutes by 1.</li>
 * <li>[SHIFT]+[CTRL]+[PAGEUP] Increments seconds by 1.</li>
 * <li>[SHIFT]+[CTRL]+ [PAGEDOWN] Decrements seconds by 1.</li>
 * </ul>
 * When opened:
 * <ul>
 * <li>[UP] If focus is on one of the selection lists: Select the value which is above the current value. If the first value is selected, select the last value in the list.</li>
 * <li>[DOWN] If focus is on one of the selection lists: Select the value which is below the current value. If the last value is selected, select the first value in the list.</li>
 * <li>[LEFT] If focus is on one of the selection lists: Move focus to the selection list which is left of the current selection list. If focus is at the first selection list, move focus to the last selection list.</li>
 * <li>[RIGHT] If focus is on one of the selection lists: Move focus to the selection list which is right of the current selection list. When focus is at the last selection list, move focus to the first selection list.</li>
 * <li>[PAGEUP] If focus is on one of the selection lists: Move focus to the first entry of this list.</li>
 * <li>[PAGEDOWN] If focus is on one of the selection lists: Move focus to the last entry of this list.</li>
 * </ul>
 *
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

		this._slidersDomRefs = [];
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
		this.value = `${!this.hideHours ? this.selectedHours || "00" : ""}${!this.hideHours && !this.hideMinutes ? ":" : ""}${!this.hideMinutes ? this.selectedMinutes || "00" : ""}${!this.hideSeconds ? `:${this.selectedSeconds || "00"}` : ""}`;
	}

	/**
	 * reads string from format hh:mm:ss and returns an array which contains the hours, minutes and seconds
	 * @param {string} value string in formathh:mm:ss
	 */
	readFormattedValue(value) {
		value = value.replace(/\s/g, ""); // Remove spaces
		return value.split(":");
	}

	getSecondsFromFormattedValue(destructuredValues) {
		if (this.hideSeconds) {
			return "";
		}

		if (this.hideHours && this.hideMinutes) {
			return destructuredValues[0];
		}

		if (this.hideHours || this.hideMinutes) {
			return destructuredValues[1];
		}

		return destructuredValues[2];
	}

	getMinutesFromFormattedValue(destructuredValues) {
		if (this.hideMinutes) {
			return "";
		}

		if (this.hideHours) {
			return destructuredValues[0];
		}

		return destructuredValues[1];
	}

	setSelectedValues() {
		const destructuredValues = this.readFormattedValue(this.value || "");
		let currentHours = this.hideHours ? "" : destructuredValues[0],
			currentMinutes = this.getMinutesFromFormattedValue(destructuredValues), // this.hideHours && !this.hideMinutes ? destructuredValues[0] : "",
			currentSeconds = this.getSecondsFromFormattedValue(destructuredValues); //  this.hideHours && this.hideHours ? destructuredValues[0] : {};

		if (currentHours > -1) {
			if (parseInt(currentHours) > parseInt(this._maxValue[0])) {
				currentHours = this._maxValue[0];
			}

			this.selectedHours = this._formatSelectedValue(currentHours, parseInt(this.readFormattedValue(this.maxValue)));
		}

		if (currentMinutes > -1) {
			if (currentMinutes && parseInt(currentMinutes) % this.minutesStep !== 0) {
				currentMinutes = this.findNearestStep(currentMinutes, this.minutesStep);
			}
			if (this._maxValue[0] && this.selectedHours === this._maxValue[0]) {
				currentMinutes = currentMinutes > this._maxValue[1] ? this._maxValue[1] : currentMinutes;
			} else if (parseInt(currentMinutes) > parseInt(this._maxValue[1])) {
				currentMinutes = this._maxValue[1];
			}

			this.selectedMinutes = this._formatSelectedValue(currentMinutes, 59);
		}

		if (currentSeconds > -1) {
			if (currentSeconds && parseInt(currentSeconds) % this.secondsStep !== 0) {
				currentSeconds = this.findNearestStep(currentSeconds, this.secondsStep);
			}
			if (this._maxValue[0] && this._maxValue[1] && this.selectedHours >= this._maxValue[0] && this.selectedSeconds >= this._maxValue[1]) {
				currentSeconds = currentSeconds > this._maxValue[2] ? this._maxValue[2] : currentSeconds;
			} else if (parseInt(currentSeconds) > parseInt(this._maxValue[2])) {
				currentSeconds = this._maxValue[2];
			}

			this.selectedSeconds = this._formatSelectedValue(currentSeconds, 59);
		}
	}

	_formatSelectedValue(currentValue, maximum = Infinity) {
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

	findNearestStep(currentValue, step) {
		const curr = parseInt(currentValue);
		const biggerClosest = this._getClosest(curr, step, true),
			lowerClosest = this._getClosest(curr, step, false);

		const diffToBiggerClosest = biggerClosest - curr,
			diffToLowerClosest = curr - lowerClosest;

		return diffToBiggerClosest > diffToLowerClosest ? lowerClosest.toString() : biggerClosest.toString();
	}

	/**
	 * Finds the nearest lower/bigger number to the givent curr
	 * @param {Integer} curr the starting number
	 * @param {Boolean} larger defines if we are searching for bigger or lower number
	 */
	_getClosest(curr, step, larger = true) {
		while (curr % step !== 0) {
			curr = larger ? ++curr : --curr;
		}

		return curr;
	}

	async _handleContainerKeysDown(event) {
		if (isLeft(event)) {
			let expandedSliderIndex = 0;
			for (let i = 0; i < this._slidersDomRefs.length; i++) {
				if (this._slidersDomRefs[i]._expanded) {
					expandedSliderIndex = i;
				}
			}
			if (this._slidersDomRefs[expandedSliderIndex - 1]) {
				this._slidersDomRefs[expandedSliderIndex - 1].focus();
			} else {
				this._slidersDomRefs[this._slidersDomRefs.length - 1].focus();
			}
		} else if (isRight(event)) {
			let expandedSliderIndex = 0;

			for (let i = 0; i < this._slidersDomRefs.length; i++) {
				if (this._slidersDomRefs[i]._expanded) {
					expandedSliderIndex = i;
				}
			}
			if (this._slidersDomRefs[expandedSliderIndex + 1]) {
				this._slidersDomRefs[expandedSliderIndex + 1].focus();
			} else {
				this._slidersDomRefs[0].focus();
			}
		}
	}

	_onkeydown(event) {
		if (isShow(event)) {
			event.preventDefault();
			this.togglePicker();
		}

		if (isPageUpShiftCtrl(event)) {
			event.preventDefault();
			this._incrementValue(true, false, false, true);
		} else if (isPageUpShift(event)) {
			event.preventDefault();
			this._incrementValue(true, false, true, false);
		} else if (isPageUp(event)) {
			event.preventDefault();
			this._incrementValue(true, true, false, false);
		}

		if (isPageDownShiftCtrl(event)) {
			event.preventDefault();
			this._incrementValue(false, false, false, true);
		} else if (isPageDownShift(event)) {
			event.preventDefault();
			this._incrementValue(false, false, true, false);
		} else if (isPageDown(event)) {
			event.preventDefault();
			this._incrementValue(false, true, false, false);
		}
	}

	_incrementValue(increment, hours, minutes, seconds) {
		const values = this.readFormattedValue(this.value);
		const incrementStep = increment ? 1 : -1;

		if (hours && !this.hideHours) {
			values[0] = Number(values[0]) + incrementStep;
		} else if (minutes && !this.hideMinutes) {
			values[1] = Number(values[1]) + incrementStep;
		} else if (seconds && !this.hideSeconds) {
			values[2] = Number(values[2]) + incrementStep;
		} else {
			return;
		}

		this.value = `${!this.hideHours ? values[0] : ""}${!this.hideHours && !this.hideMinutes ? ":" : ""}${!this.hideMinutes ? values[1] : ""}${!this.hideSeconds ? `:${values[2]}` : ""}`;
		this.fireEvent("change", { value: this.value });
	}


	generateTimeItemsArray(arrayLength, step = 1) {
		const resultArray = [];
		for (let i = 0; i < arrayLength; i++) {
			let tempString = i.toString();
			if (tempString.length === 1) {
				tempString = `0${tempString}`;
			}

			if (tempString % step === 0) {
				resultArray.push(tempString);
			}
		}

		return resultArray;
	}

	submitPickers() {
		const prevValue = this.value;
		this.value = `${!this.hideHours ? this.hoursSlider.value : ""}${!this.hideHours && !this.hideMinutes ? ":" : ""}${!this.hideMinutes ? this.minutesSlider.value : ""}${!this.hideSeconds ? `:${this.secondsSlider.value}` : ""}`;
		this.togglePicker();
		if (prevValue !== this.value) {
			this.fireEvent("change", { value: this.value });
		}
	}

	_handleInputChange(event) {
		const prevValue = this.value;
		this.value = event.target.value.replace(/[^\d:]/g, "");
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
			this._slidersDomRefs = await this.slidersDomRefs();
		}
	}

	async _getResponsivePopover() {
		if (this.responsivePopover) {
			return this.responsivePopover;
		}

		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("[ui5-responsive-popover]");
		return this.responsivePopover;
	}

	async slidersDomRefs() {
		await this._getResponsivePopover();
		return this.responsivePopover.default.length ? [...this.responsivePopover.default[0].children].filter(x => x.isUI5Element) : this.responsivePopover.default;
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
		const _maxHours = parseInt(this.readFormattedValue(this.maxValue)[0]);
		const _currHours = parseInt(this.selectedHours) + 1;
		let hours;

		if (_maxHours) {
			hours = _maxHours + 1;
		} else if (_currHours < 24) {
			hours = 24;
		} else {
			hours = _currHours;
		}

		return this.generateTimeItemsArray(hours);
	}

	get minutesArray() {
		const currentMinutes = parseInt(this.readFormattedValue(this.maxValue)[1]);
		const minutes = currentMinutes && currentMinutes > 0 && currentMinutes < 60 ? currentMinutes + 1 : 60;
		return this.generateTimeItemsArray(minutes, this.minutesStep);
	}

	get secondsArray() {
		const currentSeconds = parseInt(this.readFormattedValue(this.maxValue)[2]);
		const seconds = currentSeconds && currentSeconds > 0 && currentSeconds < 60 ? currentSeconds + 1 : 60;
		return this.generateTimeItemsArray(seconds, this.secondsStep);
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

	static get dependencies() {
		return [
			Icon,
			WheelSlider,
			ResponsivePopover,
			Input,
			Button,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

DurationPicker.define();

export default DurationPicker;
