import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import {
	isShow,
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isTabNext,
	isTabPrevious,
	isF6Next,
	isF6Previous,
} from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/time-entry-request.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimePickerTemplate from "./generated/templates/TimePickerTemplate.lit.js";
import TimePickerPopoverTemplate from "./generated/templates/TimePickerPopoverTemplate.lit.js";
import Input from "./Input.js";
import Button from "./Button.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";

import {
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import TimePickerPopoverCss from "./generated/themes/TimePickerPopover.css.js";
import PopoverCss from "./generated/themes/Popover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

type TimePickerBaseChangeInputEventDetail = {
	value: string,
	valid: boolean,
}

type TimePickerBaseChangeEventDetail = TimePickerBaseChangeInputEventDetail;
type TimePickerBaseInputEventDetail = TimePickerBaseChangeInputEventDetail;

/**
 * @class
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.TimePickerBase
 * @extends sap.ui.webc.base.UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
@customElement({
	languageAware: true,
	renderer: litRender,
	template: TimePickerTemplate,
	styles: TimePickerCss,
	staticAreaTemplate: TimePickerPopoverTemplate,
	staticAreaStyles: [ResponsivePopoverCommonCss, PopoverCss, TimePickerPopoverCss],
	dependencies: [
		Icon,
		Popover,
		ResponsivePopover,
		TimeSelectionClocks,
		TimeSelectionInputs,
		Input,
		Button,
	],
})
/**
 * Fired when the input operation has finished by clicking the "OK" button or
 * when the text in the input field has changed and the focus leaves the input field.
*
* @event sap.ui.webc.main.TimePickerBase#change
 * @public
 * @param {string} value The submitted value.
 * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
*/
@event("change", {
	detail: {
		value: {
			type: String,
		},
		valid: {
			type: Boolean,
		},
	},
})

/**
 * Fired when the value of the <code>ui5-time-picker</code> is changed at each key stroke.
 *
 * @event sap.ui.webc.main.TimePickerBase#input
 * @public
 * @param {string} value The current value.
 * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
*/
@event("input", {
	detail: {
		value: {
			type: String,
		},
		valid: {
			type: Boolean,
		},
	},
})
class TimePickerBase extends UI5Element {
	/**
	 * Defines a formatted time value.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.TimePickerBase.prototype.value
	 * @defaultvalue undefined
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property({ defaultValue: undefined })
	value?: string;

	/**
	 * Defines the value state of the <code>ui5-time-picker</code>.
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
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @name sap.ui.webc.main.TimePickerBase.prototype.valueState
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Determines whether the <code>ui5-time-picker</code> is displayed as disabled.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.TimePickerBase.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines whether the <code>ui5-time-picker</code> is displayed as readonly.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.TimePickerBase.prototype.readonly
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_isPickerOpen!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_isInputsPopoverOpen!: boolean;

	/**
	 * Defines the value state message that will be displayed as pop up under the <code>ui5-time-picker</code>.
	 * <br><br>
	 *
	 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
	 * <br>
	 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
	 * when the <code>ui5-time-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
	 * @type {HTMLElement}
	 * @name sap.ui.webc.main.TimePickerBase.prototype.valueStateMessage
	 * @since 1.0.0-rc.8
	 * @slot
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	tempValue?: string;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		[TimePickerBase.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents"),
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
		]);
	}

	constructor() {
		super();
	}

	/**
	 * @abstract
	 * @protected
	 */
	get _placeholder(): string | undefined {
		return undefined;
	}

	/**
	 * @abstract
	 * @protected
	 */
	get _formatPattern(): string | undefined {
		return undefined;
	}

	get _effectiveValue() {
		return this.value;
	}

	get _timeSelectionValue() {
		return this.tempValue;
	}

	get _isPhone() {
		return isPhone();
	}

	onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>) {
		this.tempValue = e.detail.value; // every time the user changes the time selection -> update tempValue
	}

	/**
	 * Opens the picker.
	 * @async
	 * @public
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#openPicker
	 * @returns {Promise} Resolves when the picker is open
	 */
	async openPicker() {
		this.tempValue = this.value && this.isValid(this.value) ? this.value : this.getFormat().format(new Date());
		const responsivePopover = await this._getPopover();
		responsivePopover.showAt(this);
	}

	/**
	 * Closes the picker
	 * @public
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#closePicker
	 * @returns {Promise} Resolves when the picker is closed
	 */
	async closePicker() {
		const responsivePopover = await this._getPopover();
		responsivePopover.close();
		this._isPickerOpen = false;
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}

	/**
	 * Checks if the picker is open
	 * @public
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#isOpen
	 * @returns {boolean}
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	submitPickers() {
		this._updateValueAndFireEvents(this.tempValue!, true, ["change", "value-changed"]);
		this.closePicker();
	}

	onResponsivePopoverAfterClose() {
		this._isPickerOpen = false;
	}

	async onResponsivePopoverAfterOpen() {
		this._isPickerOpen = true;
		const responsivePopover = await this._getPopover();
		responsivePopover.querySelector<TimeSelectionClocks>("[ui5-time-selection-clocks]")!._focusFirstButton();
	}

	/**
	 * Opens the Inputs popover.
	 * @async
	 * @private
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#openInputsPopover
	 * @returns {Promise} Resolves when the Inputs popover is open
	 */
	async openInputsPopover() {
		this.tempValue = this.value && this.isValid(this.value) ? this.value : this.getFormat().format(new Date());
		const popover = await this._getInputsPopover();
		popover.showAt(this);
		this._isInputsPopoverOpen = true;
	}

	/**
	 * Closes the Inputs popover
	 * @private
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#closeInputsPopover
	 * @returns {Promise} Resolves when the Inputs popover is closed
	 */
	async closeInputsPopover() {
		const popover = await this._getInputsPopover();
		popover.close();
	}

	toggleInputsPopover() {
		if (this.isInputsPopoverOpen()) {
			this.closeInputsPopover();
		} else if (this._canOpenInputsPopover()) {
			this.openInputsPopover();
		}
	}

	/**
	 * Checks if the inputs popover is open
	 * @private
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#isInputsPopoverOpen
	 * @returns {boolean}
	 */
	isInputsPopoverOpen() {
		return !!this._isInputsPopoverOpen;
	}

	submitInputsPopover() {
		this._updateValueAndFireEvents(this.tempValue!, true, ["change", "value-changed"]);
		this.closeInputsPopover();
	}

	async onInputsPopoverAfterOpen() {
		const popover = await this._getInputsPopover();
		popover.querySelector<TimeSelectionInputs>("[ui5-time-selection-inputs]")!._addNumericAttributes();
	}

	onInputsPopoverAfterClose() {
		this._isInputsPopoverOpen = false;
	}

	async _handleInputClick(evt: MouseEvent) {
		const target = evt.target as HTMLElement;
		if (this._isPickerOpen) {
			return;
		}

		if (this._isPhone && target && !target.hasAttribute("ui5-icon")) {
			this.toggleInputsPopover();
		}

		const inputField = await this._getInputField();

		if (inputField) {
			(inputField as HTMLInputElement).select();
		}
	}

	_updateValueAndFireEvents(value: string, normalizeValue: boolean, eventsNames: Array<string>) {
		if (value === this.value) {
			return;
		}

		const valid = this.isValid(value);

		if (value !== undefined && valid && normalizeValue) { // if value === undefined, valid is guaranteed to be falsy
			value = this.normalizeValue(value); // transform valid values (in any format) to the correct format
		}
		if (!eventsNames.includes("input")) {
			this.value = ""; // Do not remove! DurationPicker (an external component extending TimePickerBase) use case -> value is 05:10, user tries 05:12, after normalization value is changed back to 05:10 so no invalidation happens, but the input still shows 05:12. Thus we enforce invalidation with the ""
			this.value = value;
		}
		this.tempValue = value; // if the picker is open, sync it
		this._updateValueState(); // Change the value state to Error/None, but only if needed
		eventsNames.forEach(eventName => {
			this.fireEvent<TimePickerBaseChangeInputEventDetail>(eventName, { value, valid });
		});
	}

	_updateValueState() {
		const isValid = this.isValid(this.value);
		if (!isValid) { // If not valid - always set Error regardless of the current value state
			this.valueState = ValueState.Error;
		} else if (isValid && this.valueState === ValueState.Error) { // However if valid, change only Error (but not the others) to None
			this.valueState = ValueState.None;
		}
	}

	_handleInputChange(e: CustomEvent) {
		const target = e.target as Input;
		this._updateValueAndFireEvents(target.value, true, ["change", "value-changed"]);
	}

	_handleInputLiveChange(e: CustomEvent) {
		const target = e.target as Input;
		this._updateValueAndFireEvents(target.value, false, ["input"]);
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_canOpenInputsPopover() {
		return !this.disabled && this._isPhone;
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	async _getInputsPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>("[ui5-popover]")!;
	}

	_getInput(): Input {
		return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
	}

	_getInputField() {
		const input = this._getInput();
		return input && input.getInputDOMRef();
	}

	_onkeydown(e: KeyboardEvent) {
		if (this._isPhone && !this.isInputsPopoverOpen()) {
			e.preventDefault();
		}
		if (isShow(e)) {
			e.preventDefault();
			this.togglePicker();
		}

		const target = e.target as Node;

		if ((this._getInput().isEqualNode(target) && this.isOpen()) && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
			this.closePicker();
		}
		if (this.isOpen()) {
			return;
		}
		if (isPageUpShiftCtrl(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "second");
		} else if (isPageUpShift(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "minute");
		} else if (isPageUp(e)) {
			e.preventDefault();
			this._modifyValueBy(1, "hour");
		} else if (isPageDownShiftCtrl(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "second");
		} else if (isPageDownShift(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "minute");
		} else if (isPageDown(e)) {
			e.preventDefault();
			this._modifyValueBy(-1, "hour");
		}
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	getFormat() {
		let dateFormat;

		if (this._isPattern) {
			dateFormat = DateFormat.getDateInstance({
				pattern: this._formatPattern,
			});
		} else {
			dateFormat = DateFormat.getDateInstance({
				style: this._formatPattern,
			});
		}

		return dateFormat;
	}

	/**
	 * Formats a Java Script date object into a string representing a locale date and time
	 * according to the <code>formatPattern</code> property of the TimePicker instance
	 * @param {Date} date A Java Script date object to be formatted as string
	 * @public
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#formatValue
	 * @returns {string}
	 */
	formatValue(date: Date) {
		return this.getFormat().format(date);
	}

	/**
	 * Checks if a value is valid against the current <code>formatPattern</code> value.
	 *
	 * <br><br>
	 * <b>Note:</b> an empty string is considered as valid value.
	 * @param {string} value The value to be tested against the current date format
	 * @public
	 * @method
	 * @name sap.ui.webc.main.TimePickerBase#isValid
	 * @returns {boolean}
	 */
	isValid(value: string | undefined) {
		if (value === "") {
			return true;
		}
		return !!this.getFormat().parse(value as string);
	}

	normalizeValue(value: string) {
		if (value === "") {
			return value;
		}
		return this.getFormat().format(this.getFormat().parse(value));
	}

	_modifyValueBy(amount: number, unit: string) {
		const date = this.getFormat().parse(this._effectiveValue as string) as Date;
		if (!date) {
			return;
		}
		if (unit === "hour") {
			date.setHours(date.getHours() + amount);
		} else if (unit === "minute") {
			date.setMinutes(date.getMinutes() + amount);
		} else if (unit === "second") {
			date.setSeconds(date.getSeconds() + amount);
		}

		const newValue = this.formatValue(date);

		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
	}

	/**
	 *
	 * @param {event} e Wheel Event
	 * @private
	 *
	 * The listener for this event can't be passive as it calls preventDefault()
	 */
	_handleWheel(e: WheelEvent) {
		e.preventDefault();
	}

	/**
	 * Hides mobile device keyboard by temporary setting the input to readonly state.
	 */
	_hideMobileKeyboard() {
		this._getInput().readonly = true;
		setTimeout(() => { this._getInput().readonly = false; }, 0);
	}

	async _onfocusin(evt: FocusEvent) {
		if (this._isPhone) {
			this._hideMobileKeyboard();
			if (this._isInputsPopoverOpen) {
				const popover = await this._getInputsPopover();
				popover.applyFocus();
			}
			evt.preventDefault();
		}
	}

	_oninput(evt: CustomEvent) {
		if (this._isPhone) {
			evt.preventDefault();
		}
	}

	get submitButtonLabel() {
		return TimePickerBase.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get cancelButtonLabel() {
		return TimePickerBase.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	/**
	 * @protected
	 */
	get openIconName() {
		return "time-entry-request";
	}
}

export default TimePickerBase;
export type {
	TimeSelectionChangeEventDetail,
	TimePickerBaseChangeEventDetail,
	TimePickerBaseInputEventDetail,
};
