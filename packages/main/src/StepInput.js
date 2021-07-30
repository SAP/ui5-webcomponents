import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	isUp,
	isDown,
	isUpCtrl,
	isDownCtrl,
	isUpShift,
	isDownShift,
	isUpShiftCtrl,
	isDownShiftCtrl,
	isPageUpShift,
	isPageDownShift,
	isEscape,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import StepInputTemplate from "./generated/templates/StepInputTemplate.lit.js";
import { STEPINPUT_DEC_ICON_TITLE, STEPINPUT_INC_ICON_TITLE } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/less.js";
import "@ui5/webcomponents-icons/dist/add.js";

import Icon from "./Icon.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";

// Styles
import StepInputCss from "./generated/themes/StepInput.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-step-input",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.StepInput.prototype */ {
		/**
		 * Defines a value of the component.
		 *
		 * @type {Float}
		 * @defaultvalue 0
		 * @public
		 */
		value: {
			type: Float,
			defaultValue: 0,
		},

		/**
		 * Defines a minimum value of the component.
		 *
		 * @type {Float}
		 * @public
		 */
		min: {
			type: Float,
		},

		/**
		 * Defines a maximum value of the component.
		 *
		 * @type {Float}
		 * @public
		 */
		max: {
			type: Float,
		},

		/**
		 * Defines a step of increasing/decreasing the value of the component.
		 *
		 * @type {Float}
		 * @defaultvalue 1
		 * @public
		 */
		step: {
			type: Float,
			defaultValue: 1,
		},

		/**
		 * Defines the value state of the component.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>None</code></li>
		 * <li><code>Error</code></li>
		 * <li><code>Warning</code></li>
		 * <li><code>Success</code></li>
		 * <li><code>Information</code></li>
		 * </ul>
		 *
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Defines whether the component is required.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Determines whether the component is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the component is displayed as read-only.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * component has no value.
		 *
		 * <br><br>
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
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
		 * Determines the name with which the component will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the component so that it can be submitted as
		 * part of an HTML form. Do not use this property unless you need to submit a form.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		name: {
			type: String,
		},

		/**
		 * Determines the number of digits after the decimal point of the component.
		 *
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		valuePrecision: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleNameRef: {
			type: String,
			defaultValue: "",
		},

		_decIconDisabled: {
			type: Boolean,
			noAttribute: true,
		},

		_incIconDisabled: {
			type: Boolean,
			noAttribute: true,
		},

		_focused: {
			type: Boolean,
			noAttribute: true,
		},

		_inputFocused: {
			type: Boolean,
			noAttribute: true,
		},

		_previousValue: {
			type: Float,
			noAttribute: true,
		},

		_previousValueState: {
			type: String,
			noAttribute: true,
			defaultValue: "",
		},

		_waitTimeout: {
			type: Float,
			noAttribute: true,
		},

		_speed: {
			type: Float,
			noAttribute: true,
		},

		_btnDown: {
			type: Boolean,
			noAttribute: true,
		},

		_spinTimeoutId: {
			type: Integer,
			noAttribute: true,
		},

		_spinStarted: {
			type: Boolean,
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.StepInput.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the component.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},

		/**
		 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit,
		 * when <code>name</code> property is set.
		 * @type {HTMLElement[]}
		 * @slot
		 * @private
		 */
		formSupport: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.StepInput.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		*/
		change: {},
	},
};

// Spin variables
const INITIAL_WAIT_TIMEOUT = 500; // milliseconds
const ACCELERATION = 0.8;
const MIN_WAIT_TIMEOUT = 50; // milliseconds
const INITIAL_SPEED = 120; // milliseconds

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-step-input</code> consists of an input field and buttons with icons to increase/decrease the value
 * with the predefined step.
 * <br><br>
 * The user can change the value of the component by pressing the increase/decrease buttons,
 * by typing a number directly, by using the keyboard up/down and page up/down,
 * or by using the mouse scroll wheel. Decimal values are supported.
 *
 * <h3>Usage</h3>
 *
 * The default step is 1 but the app developer can set a different one.
 *
 * App developers can set a maximum and minimum value for the <code>StepInput</code>.
 * The increase/decrease button and the up/down keyboard navigation become disabled when
 * the value reaches the max/min or a new value is entered from the input which is greater/less than the max/min.
 * <br><br>
 * <h4>When to use:</h4>
 * <ul>
 * <li>To adjust amounts, quantities, or other values quickly.</li>
 * <li>To adjust values for a specific step.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 * <ul>
 * <li>To enter a static number (for example, postal code, phone number, or ID). In this case,
 * use the regular <code>ui5-input</code> instead.</li>
 * <li>To display a value that rarely needs to be adjusted and does not pertain to a particular step.
 * In this case, use the regular <code>ui5-input</code> instead.</li>
 * <li>To enter dates and times. In this case, use date/time related components instead.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/StepInput.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.StepInput
 * @extends UI5Element
 * @tagname ui5-step-input
 * @since 1.0.0-rc.13
 * @public
 */
class StepInput extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return StepInputCss;
	}

	static get template() {
		return StepInputTemplate;
	}

	static get dependencies() {
		return [
			Icon,
			Input,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	get type() {
		return InputType.Number;
	}

	// icons-related

	get decIconTitle() {
		return this.i18nBundle.getText(STEPINPUT_DEC_ICON_TITLE);
	}

	get decIconName() {
		return "less";
	}

	get incIconTitle() {
		return this.i18nBundle.getText(STEPINPUT_INC_ICON_TITLE);
	}

	get incIconName() {
		return "add";
	}

	get _decIconClickable() {
		return !this._decIconDisabled && !this.readonly && !this.disabled;
	}

	get _incIconClickable() {
		return !this._incIconDisabled && !this.readonly && !this.disabled;
	}

	get _isFocused() {
		return this._focused;
	}

	get _valuePrecisioned() {
		return this.value.toFixed(this.valuePrecision);
	}

	get accInfo() {
		return {
			"ariaRequired": this.required,
			"ariaLabel": getEffectiveAriaLabelText(this),
		};
	}

	get inputAttributes() {
		return {
			min: this.min === undefined ? undefined : this.min,
			max: this.max === undefined ? undefined : this.max,
			step: this.step,
		};
	}

	onBeforeRendering() {
		this._setButtonState();
		if (this._previousValue === undefined) {
			this._previousValue = this.value;
		}

		const FormSupport = getFeature("FormSupport");
		if (FormSupport) {
			FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	get input() {
		return this.shadowRoot.querySelector("[ui5-input]");
	}

	get inputOuter() {
		return this.shadowRoot.querySelector(".ui5-step-input-input");
	}

	_onButtonFocusOut() {
		setTimeout(() => {
			if (!this._inputFocused) {
				this.inputOuter.removeAttribute("focused");
			}
		}, 0);
	}

	_onInputFocusIn() {
		this._inputFocused = true;
	}

	_onInputFocusOut() {
		this._inputFocused = false;
		this._onInputChange();
	}

	_setButtonState() {
		this._decIconDisabled = this.min !== undefined && this.value <= this.min;
		this._incIconDisabled = this.max !== undefined && this.value >= this.max;
	}

	_validate() {
		if (this._previousValueState === "") {
			this._previousValueState = this.valueState !== "" ? this.valueState : ValueState.None;
		}
		this.valueState = ((this.min !== undefined && this.value < this.min)
			|| (this.max !== undefined && this.value > this.max))
			? ValueState.Error : this._previousValueState;
	}

	_preciseValue(value) {
		const pow = 10 ** this.valuePrecision;
		return Math.round(value * pow) / pow;
	}

	_fireChangeEvent() {
		if (this._previousValue !== this.value) {
			this._previousValue = this.value;
			this.fireEvent("change", { value: this.value });
		}
	}

	/**
	 * Value modifier - modifies the value of the component, validates the new value and enables/disables increment and
	 * decrement buttons according to the value and min/max values (if set). Fires <code>change</code> event when requested
	 *
	 * @param {Float} modifier modifies the value of the component with the given modifier (positive or negative)
	 * @param {boolean} fireChangeEvent if <code>true</code>, fires <code>change</code> event when the value is changed
	 */
	_modifyValue(modifier, fireChangeEvent) {
		let value;
		this.value = this._preciseValue(parseFloat(this.input.value));
		value = this.value + modifier;
		if (this.min !== undefined && value < this.min) {
			value = this.min;
		}
		if (this.max !== undefined && value > this.max) {
			value = this.max;
		}
		value = this._preciseValue(value);
		if (value !== this.value) {
			this.value = value;
			this._validate();
			this._setButtonState();
			this._focused = true;
			this.inputOuter.setAttribute("focused", "");
			if (fireChangeEvent) {
				this._fireChangeEvent();
			} else {
				this.input.focus();
			}
		}
	}

	_incValue(event) {
		if (this._incIconClickable && event.isTrusted && !this.disabled && !this.readonly) {
			this._modifyValue(this.step, true);
			this._previousValue = this.value;
		}
	}

	_decValue(event) {
		if (this._decIconClickable && event.isTrusted && !this.disabled && !this.readonly) {
			this._modifyValue(-this.step, true);
			this._previousValue = this.value;
		}
	}

	_onInputChange(event) {
		if (this.input.value === "") {
			this.input.value = this.min || 0;
		}
		const inputValue = this._preciseValue(parseFloat(this.input.value));
		if (this.value !== this._previousValue || this.value !== inputValue) {
			this.value = inputValue;
			this._validate();
			this._setButtonState();
			this._fireChangeEvent();
		}
	}

	_onfocusin() {
		this._focused = true;
	}

	_onfocusout() {
		this._focused = false;
	}

	_onkeydown(event) {
		let preventDefault = true;
		if (this.disabled || this.readonly) {
			return;
		}

		if (isEnter(event)) {
			this._onInputChange();
			return;
		}

		if (isUp(event)) {
			// step up
			this._modifyValue(this.step);
		} else if (isDown(event)) {
			// step down
			this._modifyValue(-this.step);
		} else if (isEscape(event)) {
			// return previous value
			this.value = this._previousValue;
			this.input.value = this.value.toFixed(this.valuePrecision);
		} else if (this.max !== undefined && (isPageUpShift(event) || isUpShiftCtrl(event))) {
			// step to max
			this._modifyValue(this.max - this.value);
		} else if (this.min !== undefined && (isPageDownShift(event) || isDownShiftCtrl(event))) {
			// step to min
			this._modifyValue(this.min - this.value);
		} else if (!isUpCtrl(event) && !isDownCtrl(event) && !isUpShift(event) && !isDownShift(event)) {
			preventDefault = false;
		}
		if (preventDefault) {
			event.preventDefault();
		}
	}

	_decSpin() {
		if (!this._decIconDisabled) {
			this._spinValue(false, true);
		}
	}

	_incSpin() {
		if (!this._incIconDisabled) {
			this._spinValue(true, true);
		}
	}

	/**
	 * Calculates the time which should be waited until _spinValue function is called.
	 */
	_calcWaitTimeout() {
		this._speed *= ACCELERATION;
		this._waitTimeout = ((this._waitTimeout - this._speed) < MIN_WAIT_TIMEOUT ? MIN_WAIT_TIMEOUT : (this._waitTimeout - this._speed));
		return this._waitTimeout;
	}

	/**
	 * Called when the increment or decrement button is pressed and held to set new value.
	 * @param {boolean} increment - is this the increment button or not so the values should be spin accordingly up or down
	 * @param {boolean} resetVariables - whether to reset the spin-related variables or not
	 */
	_spinValue(increment, resetVariables) {
		if (resetVariables) {
			this._waitTimeout = INITIAL_WAIT_TIMEOUT;
			this._speed = INITIAL_SPEED;
			this._btnDown = true;
		}
		this._spinTimeoutId = setTimeout(() => {
			if (this._btnDown) {
				this._spinStarted = true;
				this._modifyValue(increment ? this.step : -this.step);
				this._setButtonState();
				if ((!this._incIconDisabled && increment) || (!this._decIconDisabled && !increment)) {
					this._spinValue(increment);
				} else {
					this._resetSpin();
					this._fireChangeEvent();
				}
			}
		}, this._calcWaitTimeout());
	}

	/**
	* Resets spin process
	*/
	_resetSpin() {
		clearTimeout(this._spinTimeoutId);
		this._btnDown = false;
		this._spinStarted = false;
	}

	/**
	* Resets spin process when mouse outs + or - buttons
	*/
	_resetSpinOut() {
		if (this._btnDown) {
			this._resetSpin();
			this._fireChangeEvent();
		}
	}
}
StepInput.define();

export default StepInput;
