var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StepInput_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isUp, isDown, isUpCtrl, isDownCtrl, isUpShift, isDownShift, isUpShiftCtrl, isDownShiftCtrl, isPageUpShift, isPageDownShift, isEscape, isEnter, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import "@ui5/webcomponents-base/dist/types.js";
import StepInputTemplate from "./generated/templates/StepInputTemplate.lit.js";
import { STEPINPUT_DEC_ICON_TITLE, STEPINPUT_INC_ICON_TITLE } from "./generated/i18n/i18n-defaults.js";
import "@ui5/webcomponents-icons/dist/less.js";
import "@ui5/webcomponents-icons/dist/add.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";
// Styles
import StepInputCss from "./generated/themes/StepInput.css.js";
// Spin variables
const INITIAL_WAIT_TIMEOUT = 500; // milliseconds
const ACCELERATION = 0.8;
const MIN_WAIT_TIMEOUT = 50; // milliseconds
const INITIAL_SPEED = 120; // milliseconds
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-step-input` consists of an input field and buttons with icons to increase/decrease the value
 * with the predefined step.
 *
 * The user can change the value of the component by pressing the increase/decrease buttons,
 * by typing a number directly, by using the keyboard up/down and page up/down,
 * or by using the mouse scroll wheel. Decimal values are supported.
 *
 * ### Usage
 *
 * The default step is 1 but the app developer can set a different one.
 *
 * App developers can set a maximum and minimum value for the `StepInput`.
 * The increase/decrease button and the up/down keyboard navigation become disabled when
 * the value reaches the max/min or a new value is entered from the input which is greater/less than the max/min.
 *
 * #### When to use:
 *
 * - To adjust amounts, quantities, or other values quickly.
 * - To adjust values for a specific step.
 *
 * #### When not to use:
 *
 * - To enter a static number (for example, postal code, phone number, or ID). In this case,
 * use the regular `ui5-input` instead.
 * - To display a value that rarely needs to be adjusted and does not pertain to a particular step.
 * In this case, use the regular `ui5-input` instead.
 * - To enter dates and times. In this case, use date/time related components instead.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/StepInput.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.13
 * @public
 */
let StepInput = StepInput_1 = class StepInput extends UI5Element {
    static async onDefine() {
        StepInput_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get type() {
        return InputType.Number;
    }
    // icons-related
    get decIconTitle() {
        return StepInput_1.i18nBundle.getText(STEPINPUT_DEC_ICON_TITLE);
    }
    get decIconName() {
        return "less";
    }
    get incIconTitle() {
        return StepInput_1.i18nBundle.getText(STEPINPUT_INC_ICON_TITLE);
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
        return this.focused;
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
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            formSupport.syncNativeHiddenInput(this);
        }
        else if (this.name) {
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
        if (this.value !== this._previousValue) {
            this._previousValue = this.value;
        }
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
        if (this._initialValueState === undefined) {
            this._initialValueState = this.valueState;
        }
        this._updateValueState();
    }
    _updateValueState() {
        const valid = !((this.min !== undefined && this.value < this.min) || (this.max !== undefined && this.value > this.max));
        const previousValueState = this.valueState;
        this.valueState = valid ? ValueState.None : ValueState.Error;
        const eventPrevented = !this.fireEvent("value-state-change", { valueState: this.valueState, valid }, true);
        if (eventPrevented) {
            this.valueState = previousValueState;
        }
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
     * decrement buttons according to the value and min/max values (if set). Fires `change` event when requested
     * @private
     * @param modifier modifies the value of the component with the given modifier (positive or negative)
     * @param fireChangeEvent if `true`, fires `change` event when the value is changed
     */
    _modifyValue(modifier, fireChangeEvent = false) {
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
            this.focused = true;
            this.inputOuter.setAttribute("focused", "");
            if (fireChangeEvent) {
                this._fireChangeEvent();
            }
            else {
                this.input.focus();
            }
        }
    }
    _incValue(e) {
        if (this._incIconClickable && e.isTrusted && !this.disabled && !this.readonly) {
            this._modifyValue(this.step, true);
            this._previousValue = this.value;
        }
    }
    _decValue(e) {
        if (this._decIconClickable && e.isTrusted && !this.disabled && !this.readonly) {
            this._modifyValue(-this.step, true);
            this._previousValue = this.value;
        }
    }
    _onInputChange() {
        if (this.input.value === "") {
            this.input.value = (this.min || 0);
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
        this.focused = true;
    }
    _onfocusout() {
        this.focused = false;
    }
    _onkeydown(e) {
        let preventDefault = true;
        if (this.disabled || this.readonly) {
            return;
        }
        if (isEnter(e)) {
            this._onInputChange();
            return;
        }
        if (isUp(e)) {
            // step up
            this._modifyValue(this.step);
        }
        else if (isDown(e)) {
            // step down
            this._modifyValue(-this.step);
        }
        else if (isEscape(e)) {
            // return previous value
            this.value = this._previousValue;
            this.input.value = this.value.toFixed(this.valuePrecision);
        }
        else if (this.max !== undefined && (isPageUpShift(e) || isUpShiftCtrl(e))) {
            // step to max
            this._modifyValue(this.max - this.value);
        }
        else if (this.min !== undefined && (isPageDownShift(e) || isDownShiftCtrl(e))) {
            // step to min
            this._modifyValue(this.min - this.value);
        }
        else if (!isUpCtrl(e) && !isDownCtrl(e) && !isUpShift(e) && !isDownShift(e)) {
            preventDefault = false;
        }
        if (preventDefault) {
            e.preventDefault();
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
     * @private
     * @param increment - is this the increment button or not so the values should be spin accordingly up or down
     * @param resetVariables - whether to reset the spin-related variables or not
     */
    _spinValue(increment, resetVariables = false) {
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
                }
                else {
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
};
__decorate([
    property({ validator: Float, defaultValue: 0 })
], StepInput.prototype, "value", void 0);
__decorate([
    property({ validator: Float })
], StepInput.prototype, "min", void 0);
__decorate([
    property({ validator: Float })
], StepInput.prototype, "max", void 0);
__decorate([
    property({ validator: Float, defaultValue: 1 })
], StepInput.prototype, "step", void 0);
__decorate([
    property({ type: ValueState, defaultValue: ValueState.None })
], StepInput.prototype, "valueState", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "readonly", void 0);
__decorate([
    property({ defaultValue: undefined })
], StepInput.prototype, "placeholder", void 0);
__decorate([
    property()
], StepInput.prototype, "name", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], StepInput.prototype, "valuePrecision", void 0);
__decorate([
    property()
], StepInput.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], StepInput.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], StepInput.prototype, "_decIconDisabled", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], StepInput.prototype, "_incIconDisabled", void 0);
__decorate([
    property({ type: Boolean })
], StepInput.prototype, "focused", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], StepInput.prototype, "_inputFocused", void 0);
__decorate([
    property({ validator: Float, noAttribute: true })
], StepInput.prototype, "_previousValue", void 0);
__decorate([
    property({ validator: Float, noAttribute: true })
], StepInput.prototype, "_waitTimeout", void 0);
__decorate([
    property({ validator: Float, noAttribute: true })
], StepInput.prototype, "_speed", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], StepInput.prototype, "_btnDown", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true })
], StepInput.prototype, "_spinTimeoutId", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], StepInput.prototype, "_spinStarted", void 0);
__decorate([
    slot()
], StepInput.prototype, "valueStateMessage", void 0);
__decorate([
    slot()
], StepInput.prototype, "formSupport", void 0);
StepInput = StepInput_1 = __decorate([
    customElement({
        tag: "ui5-step-input",
        renderer: litRender,
        styles: StepInputCss,
        template: StepInputTemplate,
        dependencies: [
            Icon,
            Input,
        ],
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     * @public
     */
    ,
    event("change")
    /**
     * Fired before the value state of the component is updated internally.
     * The event is preventable, meaning that if it's default action is
     * prevented, the component will not update the value state.
     * @allowPreventDefault
     * @since 1.23.0
     * @public
     * @param {string} valueState The new `valueState` that will be set.
     * @param {boolean} valid Indicator if the value is in between the min and max value.
     */
    ,
    event("value-state-change", {
        detail: {
            /**
             * @public
             */
            valueState: {
                type: String,
            },
            /**
             * @public
             */
            valid: {
                type: Boolean,
            },
        },
    })
], StepInput);
StepInput.define();
export default StepInput;
//# sourceMappingURL=StepInput.js.map