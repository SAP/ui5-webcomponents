import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import StepInputTemplate from "./generated/templates/StepInputTemplate.lit.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { STEPINPUT_DEC_ICON_TITLE, STEPINPUT_INC_ICON_TITLE } from "./generated/i18n/i18n-defaults.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import {
	isUp,
	isDown,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isShow,
	isF4,
} from "@ui5/webcomponents-base/dist/Keys.js";
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
	properties: /** @lends sap.ui.webcomponents.main.StepInput.prototype */ {
		/**
		 * Defines a value of the <code>ui5-step-input</code>.
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
		 * Defines a minimum value of the <code>ui5-step-input</code>.
		 *
		 * @type {Float}
		 * @public
		 */
		min: {
			type: Float,
		},

		/**
		 * Defines a maximum value of the <code>ui5-step-input</code>.
		 *
		 * @type {Float}
		 * @public
		 */
		max: {
			type: Float,
		},

		/**
		 * Defines a step of increasing/decreasing the value of the <code>ui5-step-input</code>.
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
		 * Defines the value state of the <code>ui5-step-input</code>.
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
		 * Defines whether the <code>ui5-step-input</code> is required.
		 *
		 * @since 1.0.0-rc.9
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-step-input</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-step-input</code> is displayed as read-only.
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
		 * <code>ui5-step-input</code> has no value.
		 *
		 * <br><br>
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the <code>ui5-step-input</code> appear empty - without placeholder or format pattern.
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
		 * Determines the name with which the <code>ui5-step-input</code> will be submitted in an HTML form.
		 *
		 * <br><br>
		 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
		 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
		 *
		 * <br><br>
		 * <b>Note:</b> When set, a native <code>input</code> HTML element
		 * will be created inside the <code>ui5-step-input</code> so that it can be submitted as
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
		 * Determines the text alignment of the <code>ui5-step-input</code>.
		 *
		* @defaultvalue "left"
		* @public
		*/
		align: {
			type: String,
			defaultValue: "left",
		},

		/**
		 * Defines the aria-label attribute for the <code>ui5-step-input</code>.
		 *
		 * @type {String}
		 * @since 1.0.0-rc.9
		 * @private
		 * @defaultvalue ""
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Receives id(or many ids) of the elements that label the <code>ui5-step-input</code>.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.9
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
		},

		_decIconDisabled: {
			type: Boolean,
		},

		_incIconDisabled: {
			type: Boolean,
		},

	},
	slots: /** @lends sap.ui.webcomponents.main.StepInput.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-step-input</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-step-input</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.7
		 * @slot
		 * @public
		 */
		valueStateMessage: {
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

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-step-input</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/StepInput.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.StepInput
 * @extends UI5Element
 * @tagname ui5-step-input
 * @public
 */
class StepInput extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get styles() {
		return StepInputCss;
	}

	static get template() {
		return StepInputTemplate;
	}

	static get dependencies() {
		return [];
	}

	static async onDefine() {
		await Promise.resolve([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

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

	get type() {
		return InputType.Number;
	}

	get _placeholder() {
		return this.placeholder + " ";
	}

	get _decIconInteractive() {
		return !this._decIconDisabled;
	}

	get _incIconInteractive() {
		return !this._incIconDisabled;
	}

	_onfocusin() {
		this._getInputOuter().setAttribute("focused", "");
	}

	_onfocusout() {
		this._getInputOuter().removeAttribute("focused");
	}

	_getInput() {
		return this.shadowRoot.querySelector("[ui5-input]");
	}

	_getInputOuter() {
		return this.shadowRoot.querySelector(".ui5-step-input-input");
	}

	_validate() {
		if (!isNaN(this.min) && this.value < this.min) {
			this.valueState = ValueState.Error;
			this._decIconDisabled = true;
		} else if (!isNaN(this.max) && this.value > this.max) {
			this.valueState = ValueState.Error;
			this._incIconDisabled = true;
		} else {
			this.valueState = ValueState.None;
			this._decIconDisabled = false;
			this._incIconDisabled = false;
		}
	}

	_modifyValue(modifier, fireChangeEvent) {
		this.value = this.value + modifier;
		this._validate();
		this._getInput().value = this.value;
		this._getInputOuter().setAttribute("focused", "");
		if (fireChangeEvent) {
			this.fireEvent('change', { value: this.value });
		}
	}

	_incValue() {
		if (!this.disabled && !this.readonly) {
			this._modifyValue(this.step, true);
		}
	}

	_decValue() {
		if (!this.disabled && !this.readonly) {
			this._modifyValue(-this.step, true);
		}
	}

	/**
	 * The ui5-input "submit" event handler - fire change event when the user presses enter
	 * @protected
	 */
	_onInputSubmit(event) {}

	/**
	 * The ui5-input "change" event handler - fire change event when the user focuses out of the input
	 * @protected
	 */
	_onInputChange(event) {
		//this._updateValueAndFireEvents(event.target.value, true, ["change", "value-changed"]);
	}

	_onkeydown(event) {
		if (this.disabled || this.readonly) {
			return;
		}

		if (isUp(event)) {
			this._modifyValue(this.step);
		} else if (isDown(event)) {
			this._modifyValue(-this.step);
		}
	}


	static get dependencies() {
		return [
			Icon,
			Input,
		];
	}

}

StepInput.define();

export default StepInput;
