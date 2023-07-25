import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import {
	isDown,
	isUp,
	isDownAlt,
	isUpAlt,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isSpace,
	isEnter,
	isKeyA,
	isKeyP,
	isNumber,
	isColon,
} from "@ui5/webcomponents-base/dist/Keys.js";
import TimePickerInternals from "./TimePickerInternals.js";
import Input from "./Input.js";
import SegmentedButton from "./SegmentedButton.js";

import type { TimePickerClockChangeEventDetail } from "./TimePickerClock.js";
import InputType from "./types/InputType.js";

import {
	TIMEPICKER_INPUTS_ENTER_HOURS,
	TIMEPICKER_INPUTS_ENTER_MINUTES,
	TIMEPICKER_INPUTS_ENTER_SECONDS,
} from "./generated/i18n/i18n-defaults.js";

// Template
import TimeSelectionInputsTemplate from "./generated/templates/TimeSelectionInputsTemplate.lit.js";

// Styles
import TimeSelectionInputsCss from "./generated/themes/TimeSelectionInputs.css.js";

type TimePickerInputProperties = {
	id: string,
	label: string,
	value: string,
	hasSeparator: boolean,
	prependZero: boolean,
	min: number,
	max: number,
	attributes: object,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * TODO, TODO, TODO-TODO-TODO, TODO-TODOOOO :)
 *
 * <code>ui5-time-selection-inputs</code> is component that contains all the <code>ui5-time-picker-clock</code> components
 * necessary for the <code>ui5-time-picker</code> as well as all necessary <code>ui5-toggle-spin-button</code> components
 * used for switching between different clocks.
 * <code>ui5-time-picker-clock</code> components and <code>ui5-toggle-spin-button</code> depend on the time format set to
 * <code>ui5-time-picker</code> component.
 *
 * This component should not be used separately.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimeSelectionInputs
 * @extends sap.ui.webc.main.TimePickerInternals
 * @abstract
 * @tagname ui5-time-selection-inputs
 * @since 1.15.0
 * @private
 */
@customElement({
	tag: "ui5-time-selection-inputs",
	renderer: litRender,
	styles: TimeSelectionInputsCss,
	template: TimeSelectionInputsTemplate,
	dependencies: [
		Input,
		SegmentedButton,
	],
})

class TimeSelectionInputs extends TimePickerInternals {
	/**
	 * Contains currently available Time Picker Clock components depending on time format.
	 *
	 * @type {Array}
	 */
	@property({ type: Object, multiple: true })
	_inputs!: Array<TimePickerInputProperties>;

	get enterHoursLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_HOURS);
	}

	get enterMinutesLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_MINUTES);
	}

	get enterSecondsLabel() {
		return TimePickerInternals.i18nBundle.getText(TIMEPICKER_INPUTS_ENTER_SECONDS);
	}

	get _numberType() {
		return InputType.Number;
	}

	get _isHoursInput() {
		const key = this._componentKey("hours");
		return this._componentMap[key] === this._activeIndex;
	}

	get _is24HoursFormat() {
		return this.formatPattern.indexOf("HH") !== -1 || this.formatPattern.indexOf("H") !== -1;
	}

	onBeforeRendering() {
		this._createComponents();
	}

	onAfterRendering() {

		// this._inputComponent(0).addEventListener("focusin", this._onFocusIn);
	}

	/**
	 * Returns name of the clock or button from the id of the event target.
	 *
	 * @returns {string | undefined} name of the clock/button
	 */
	_getNameFromId(id: string) {
		const parts = id.split("_");
		return parts.length > 0 ? parts[parts.length - 1] : undefined;
	}

	/**
	 * Returns index of the clock or button from the id of the event target.
	 *
	 * @returns {number} index of the clock/button
	 */
	_getIndexFromId(id: string) {
		const name = this._getNameFromId(id);
		if (name) {
			const key = this._componentKey(name);
			return this._componentMap[key];
		}
		return 0;
	}

	/**
	 * Returns Input component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { Input | undefined} component (if exists) or undefined
	 */
	_inputComponent(indexOrName: number | string) {
		if (typeof indexOrName === "string") {
			const key = this._componentKey(indexOrName);
			const index = this._componentMap[key];
			return index !== undefined ? this.shadowRoot?.querySelector<Input>(`#${this._inputs[index].id}`) : undefined;
		}
		return this.shadowRoot?.querySelector<Input>(`#${this._inputs[indexOrName].id}`);
	}

	_innerInput(input: Input) {
		return input && input.getInputDOMRefSync();
	}

	/**
	 * Creates clock and button components according to the display format pattern.
	 */
	_createComponents() {
		this._inputs = [];
		this._periods = [];

		this._componentMap = {
			hours: -1,
			minutes: -1,
			seconds: -1,
		};

		if (this._hasHoursComponent) {
			// add Hours input
			this._componentMap.hours = this._inputs.length;
			this._inputs.push({
				"id": `${this._id}_input_hours`,
				"label": this.enterHoursLabel,
				"value": this._hours,
				"hasSeparator": this._inputs.length > 0,
				"prependZero": this._zeroPaddedHours,
				"min": this._hoursConfiguration.minHour,
				"max": this._hoursConfiguration.maxHour,
				"attributes": {
					"min": this._hoursConfiguration.minHour,
					"max": this._hoursConfiguration.maxHour,
					"step": 1,
				},
			});
		}

		if (this._hasMinutesComponent) {
			// add Minutes clock
			this._componentMap.minutes = this._inputs.length;
			this._inputs.push({
				"id": `${this._id}_clock_minutes`,
				"label": this.enterMinutesLabel,
				"value": this._minutes,
				"hasSeparator": this._inputs.length > 0,
				"prependZero": true,
				"min": 0,
				"max": 59,
				"attributes": {
					"min": 0,
					"max": 59,
					"step": 1,
				},
			});
		}

		if (this._hasSecondsComponent) {
			// add Seconds clock
			this._componentMap.seconds = this._inputs.length;
			this._inputs.push({
				"id": `${this._id}_clock_seconds`,
				"label": this.enterSecondsLabel,
				"value": this._seconds,
				"hasSeparator": this._inputs.length > 0,
				"prependZero": true,
				"min": 0,
				"max": 59,
				"attributes": {
					"min": 0,
					"max": 59,
					"step": 1,
				},
			});
		}

		if (this._hasPeriodsComponent) {
			// add period item
			this.periodsArray.forEach(item => {
				this._periods.push({
					"label": item,
					"pressed": this._period === item,
				});
			});
		}
	}

	/**
	 * Switches to the specific input.
	 *
	 * @param {number} index the index (in _inputs array) of the input
	 * @private
	 */
	_switchInput(index: number) {
		if (index >= this._inputs.length) {
			index = 0;
		}
		this._inputComponent(index)!.focus();
	}

	/**
	 * Switches to the next input that can de focused.
	 *
	 * @param {boolean} wrapAround whether to start with first clock after reaching the last one, or not
	 * @private
	 */
	_switchNextInput(wrapAround = false) {
		let activeInput = this._activeIndex;
		const startActiveInput = activeInput;

		if (!this._inputs.length) {
			return;
		}

		do {
			activeInput++;
			if (activeInput >= this._inputs.length) {
				activeInput = wrapAround ? 0 : this._inputs.length - 1;
			}
		// false-positive finding of no-unmodified-loop-condition rule
		// eslint-disable-next-line no-unmodified-loop-condition
		} while (this._inputComponent(activeInput)!.disabled && activeInput !== startActiveInput && (wrapAround || activeInput < this._inputs.length));

		if (activeInput !== startActiveInput && !this._inputComponent(activeInput)!.disabled) {
			this._switchInput(activeInput);
		}
	}

	/**
	 * Return a value as string, formatted and prepended with zero if necessary.
	 *
	 * @param {number} num A number to format
	 * @param {boolean} prependZero Whether to prepend with zero or not
	 * @param {number} max Max value of the number for this clock
	 * @param {string} replacement A string to replace the maximum value
	 * @returns {string} Formatted value
	 * @private
	 */
	_formatNumberToString(num: number, prependZero: boolean, max: number, replacement: string) {
		let numberStr;
		if (prependZero && num < 10) {
			numberStr = `0${num}`;
		} else if (num === max && replacement !== "") {
			numberStr = replacement;
		} else {
			numberStr = num.toString();
		}
		return numberStr;
	}

	/**
	 * Sets the exact match value. Must be overriden.
	 */
	_setExactMatch() {}

	_onkeydown(evt: KeyboardEvent) {
		if (this._activeIndex === -1) {
			return;
		}

		const input = this._inputComponent(this._activeIndex);
		const innerInput = this._innerInput(input!);

		if (isEnter(evt)) {
			// Accept the time and close the popover
			this.fireEvent("close-inputs");
		} else if (isNumber(evt) && this._inputs[this._activeIndex]) {
			const char = evt.key;
			const buffer = this._kbdBuffer + char;
			const bufferValue = parseInt(buffer);
			let value;

			evt.preventDefault();
			this._resetCooldown(true);

			if (bufferValue > this._inputs[this._activeIndex].max) {
				// value accumulated in the buffer (old entry + new entry) is greater than the input maximum value,
				// so assign old entry to the current inut and then switch to the next input, and add new entry as an old value
				value = this._formatNumberToString(parseInt(this._kbdBuffer), this._inputs[this._activeIndex].prependZero, this._inputs[this._activeIndex].max, "");
				this._inputChange(value);

				this._switchNextInput();
				this._kbdBuffer = char;
				value = this._formatNumberToString(parseInt(char), this._inputs[this._activeIndex].prependZero, this._inputs[this._activeIndex].max, "");
				this._inputChange(value);
				this._resetCooldown(true);
			} else {
				// value is less than clock's max value, so add new entry to the buffer
				this._kbdBuffer = buffer;

				value = this._formatNumberToString(parseInt(this._kbdBuffer), this._inputs[this._activeIndex].prependZero, this._inputs[this._activeIndex].max, "");
				this._inputChange(value);

				if (this._kbdBuffer.length === 2 || parseInt(`${this._kbdBuffer}0`) > this._inputs[this._activeIndex].max) {
					// if buffer length is 2, or buffer value + one more (any) number is greater than clock's max value
					// there is no place for more entry - just set buffer as a value, and switch to the next clock
					this._resetCooldown(this._kbdBuffer.length !== 2);
					this._kbdBuffer = "";
					this._switchNextInput();
				}
			}
		}
	}

	/**
	 * Hours 'change' handler.
	 *
	 * @param {hours} number new hours value
	 */
	_hoursChange(hours: number) {
		if (this._hoursConfiguration.isTwelveHoursFormat) {
			hours = this._shiftHours(hours);
		}

		const date = this.validDateValue;
		date.setHours(hours);
		this.setValue(date);
	}

	/**
	 * Minutes 'change' handler.
	 *
	 * @param {minutes} number new minutes value
	 */
	_minutesChange(minutes: number) {
		const date = this.validDateValue;
		date.setMinutes(minutes);
		this.setValue(date);
	}

	/**
	 * Seconds 'change' handler.
	 *
	 * @param {seconds} number new seconds value
	 */
	_secondsChange(seconds: number) {
		const date = this.validDateValue;
		date.setSeconds(seconds);
		this.setValue(date);
	}

	/**
	 * Input 'change' event handler.
	 *
	 * @param {stringValue} string new value to set on active input
	 */
	_inputChange(stringValue: string) {
		if (this._activeIndex === -1) {
			return;
		}

		const value = parseInt(stringValue);
		this._inputComponent(this._activeIndex)!.value = stringValue;

		this._inputs[this._activeIndex].value = stringValue;

		switch (this._activeIndex) {
		case this._componentMap.hours:
			this._hoursChange(value);
			break;
		case this._componentMap.minutes:
			this._minutesChange(value);
			break;
		case this._componentMap.seconds:
			this._secondsChange(value);
			break;
		}
	}

	_onfocusin(e: FocusEvent) {
		const input = e.target as Input;
		const innerInput = this._innerInput(input);
		innerInput!.select();
		this._activeIndex = this._getIndexFromId(input.id);
	}

	_onfocusout() {
		let value = this._inputComponent(this._activeIndex)!.value === "" ? 0 : parseInt(this._inputs[this._activeIndex].value);

		if (this._isHoursInput && !this._is24HoursFormat && value === 0) {
			value = 12;
		}
		const stringValue = value < 10 && this._inputs[this._activeIndex].prependZero ? `0${value}` : value.toString();
		this._inputChange(stringValue);
		this._activeIndex = -1;
	}

	_oninput() {
		let stringValue = this._inputComponent(this._activeIndex)!.value;
		const value = stringValue === "" ? 0 : parseInt(stringValue);

		stringValue = value < 10 && this._inputs[this._activeIndex].prependZero ? `0${value}` : value.toString();
		if (stringValue !== this._inputs[this._activeIndex].value) {
			this._inputChange(stringValue);
			this._kbdBuffer = stringValue;
		}
	}
}

TimeSelectionInputs.define();

export default TimeSelectionInputs;
