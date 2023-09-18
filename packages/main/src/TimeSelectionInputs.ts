import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import {
	isEnter,
	isNumber,
} from "@ui5/webcomponents-base/dist/Keys.js";
import TimePickerInternals from "./TimePickerInternals.js";
import Input from "./Input.js";
import SegmentedButton from "./SegmentedButton.js";

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

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-time-selection-inputs</code> displays a popover with <code>ui5-input</code> components of type="number" and an
 * optional a AM/PM <code>ui5-segmented-button</code> according to the display format given to the <code>ui5-time-picker</code>.
 * Using of numeric input components enables display of mobile devices' native numeric keyboard, which speeds up entering of the time.
 * The popup appears only on mobile devices when there is a tap on the <code>ui5-time-picker</code> input.
 *
 * This component should not be used separately.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimeSelectionInputs
 * @extends sap.ui.webc.main.TimePickerInternals
 * @abstract
 * @tagname ui5-time-selection-inputs
 * @since 1.18.0
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
	@property({ validator: Integer, defaultValue: -1 })
	_editedInput!: number;

	@property()
	_editedInputValue!: string;

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

	_addNumericAttributes() {
		this._entities.forEach((item, index) => {
			const input = this._inputComponent(index);
			if (input) {
				const innerInput = this._innerInput(input)!;
				innerInput.setAttribute("autocomplete", "off");
				innerInput.setAttribute("pattern", "[0-9]*");
				innerInput.setAttribute("inputmode", "numeric");
			}
		});
	}

	/**
	 * Returns Input component by index or name.
	 *
	 * @param {number | string} indexOrName the index or name of the component
	 * @returns { Input | undefined} component (if exists) or undefined
	 */
	_inputComponent(indexOrName: number | string) {
		const index = typeof indexOrName === "string" ? this._indexFromName(indexOrName) : indexOrName;
		const entity = this._entities[index].entity;
		return entity ? this.shadowRoot?.querySelector<Input>(`#${this._id}_input_${entity}`) : undefined;
	}

	/**
	 * Returns the inner input element DOM reference.
	 *
	 * @param { Input } input the Input component
	 * @returns { HTMLElement } inner input element
	 */
	_innerInput(input: Input) {
		return input && input.getInputDOMRefSync();
	}

	/**
	 * Creates clock and button components according to the display format pattern.
	 */
	_createComponents() {
		let value;

		this._entities = [];
		this._periods = [];
		this._componentMap = {
			hours: -1,
			minutes: -1,
			seconds: -1,
		};
		if (this._hasHoursComponent) {
			// add Hours input
			this._componentMap.hours = this._entities.length;
			value = parseInt(this._hours);
			this._entities.push({
				"entity": "hours",
				"label": this.enterHoursLabel,
				"value": value,
				"stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, this._zeroPaddedHours),
				"hasSeparator": this._entities.length > 0,
				"prependZero": this._zeroPaddedHours,
				"attributes": {
					"min": this._hoursConfiguration.minHour,
					"max": this._hoursConfiguration.maxHour,
					"step": 1,
				},
			});
		}
		if (this._hasMinutesComponent) {
			// add Minutes clock
			this._componentMap.minutes = this._entities.length;
			value = parseInt(this._minutes);
			this._entities.push({
				"entity": "minutes",
				"label": this.enterMinutesLabel,
				"value": value,
				"stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, true),
				"hasSeparator": this._entities.length > 0,
				"prependZero": true,
				"attributes": {
					"min": 0,
					"max": 59,
					"step": 1,
				},
			});
		}
		if (this._hasSecondsComponent) {
			// add Seconds clock
			this._componentMap.seconds = this._entities.length;
			value = parseInt(this._seconds);
			this._entities.push({
				"entity": "seconds",
				"label": this.enterSecondsLabel,
				"value": value,
				"stringValue": this._editedInput === this._entities.length ? this._editedInputValue : this._formatNumberToString(value, true),
				"hasSeparator": this._entities.length > 0,
				"prependZero": true,
				"attributes": {
					"min": 0,
					"max": 59,
					"step": 1,
				},
			});
		}
		this._createPeriodComponent();
	}

	/**
	 * Switches to the specific input.
	 *
	 * @param {number} index the index (in _entities array) of the input
	 * @private
	 */
	_switchInput(index: number) {
		if (index >= this._entities.length) {
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

		if (!this._entities.length) {
			return;
		}
		do {
			activeInput++;
			if (activeInput >= this._entities.length) {
				activeInput = wrapAround ? 0 : this._entities.length - 1;
			}
		// false-positive finding of no-unmodified-loop-condition rule
		// eslint-disable-next-line no-unmodified-loop-condition
		} while (this._inputComponent(activeInput)!.disabled && activeInput !== startActiveInput && (wrapAround || activeInput < this._entities.length));
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
	 * @returns {string} Formatted value
	 * @private
	 */
	_formatNumberToString(num: number, prependZero: boolean) {
		return num < 10 && prependZero ? `0${num}` : num.toString();
	}

	_onkeydown(evt: KeyboardEvent) {
		if (this._activeIndex === -1) {
			return;
		}
		if (isEnter(evt)) {
			// Accept the time and close the popover
			this.fireEvent("close-inputs");
		} else if (isNumber(evt) && this._entities[this._activeIndex]) {
			const char = evt.key;
			const buffer = this._keyboardBuffer + char;
			const bufferValue = parseInt(buffer);

			evt.preventDefault();
			this._resetCooldown(true);
			if (bufferValue > this._entities[this._activeIndex].attributes!.max) {
				// value accumulated in the buffer (old entry + new entry) is greater than the input maximum value,
				// so assign old entry to the current inut and then switch to the next input, and add new entry as an old value
				this._inputChange(parseInt(this._keyboardBuffer));
				this._switchNextInput();
				this._keyboardBuffer = char;
				this._inputChange(parseInt(char));
				this._resetCooldown(true);
			} else {
				// value is less than clock's max value, so add new entry to the buffer
				this._keyboardBuffer = buffer;
				this._inputChange(parseInt(this._keyboardBuffer));
				if (this._keyboardBuffer.length === 2 || parseInt(`${this._keyboardBuffer}0`) > this._entities[this._activeIndex].attributes!.max) {
					// if buffer length is 2, or buffer value + one more (any) number is greater than clock's max value
					// there is no place for more entry - just set buffer as a value, and switch to the next clock
					this._resetCooldown(this._keyboardBuffer.length !== 2);
					this._keyboardBuffer = "";
					this._switchNextInput();
				}
			}
		}
	}

	/**
	 * Input 'change' event handler.
	 *
	 * @param {value} number new value to set on active input
	 */
	_inputChange(value: number) {
		const stringValue = this._formatNumberToString(value, this._entities[this._activeIndex].prependZero);

		if (this._activeIndex === -1) {
			return;
		}
		value = parseInt(stringValue);
		this._entities[this._activeIndex].value = value;
		this._inputComponent(this._activeIndex)!.value = this._formatNumberToString(value, this._entities[this._activeIndex].prependZero);
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

		this._editedInput = -1;
		innerInput!.select();
		this._activeIndex = this._getIndexFromId(input.id);
	}

	_onfocusout() {
		let value = this._inputComponent(this._activeIndex)!.value === "" ? 0 : this._entities[this._activeIndex].value;

		this._editedInput = -1;
		if (this._isHoursInput && !this._is24HoursFormat && value === 0) {
			value = 12;
		}
		this._inputChange(value);
		this._activeIndex = -1;
	}

	_oninput() {
		const stringValue = this._inputComponent(this._activeIndex)!.value;
		const value = stringValue === "" ? 0 : parseInt(stringValue);

		if (value !== this._entities[this._activeIndex].value) {
			this._editedInput = this._activeIndex;
			this._editedInputValue = stringValue;
			this._inputChange(value);
			this._keyboardBuffer = stringValue;
		}
	}
}

TimeSelectionInputs.define();

export default TimeSelectionInputs;
