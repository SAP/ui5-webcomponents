import { isDesktop, isPhone, isTablet } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { submitForm } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import {
	isShow,
	isEnter,
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
import UI5Date from "@ui5/webcomponents-localization/dist/dates/UI5Date.js";
import Icon from "./Icon.js";
import Popover from "./Popover.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TimePickerTemplate from "./TimePickerTemplate.js";
import Input from "./Input.js";
import type { InputAccInfo } from "./Input.js";
import Button from "./Button.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";
import TimeSelectionInputs from "./TimeSelectionInputs.js";
import type { TimeSelectionChangeEventDetail } from "./TimePickerInternals.js";

import {
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
	TIMEPICKER_INPUT_DESCRIPTION,
	TIMEPICKER_POPOVER_ACCESSIBLE_NAME,
	FORM_TEXTFIELD_REQUIRED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import TimePickerPopoverCss from "./generated/themes/TimePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

type TimePickerChangeInputEventDetail = {
	value: string,
	valid: boolean,
}

type TimePickerChangeEventDetail = TimePickerChangeInputEventDetail;
type TimePickerInputEventDetail = TimePickerChangeInputEventDetail;

/**
 * @class
 *
 * ### Overview
 * The `ui5-time-picker` component provides an input field with assigned clocks which are opened on user action.
 * The `ui5-time-picker` allows users to select a localized time using touch, mouse, or keyboard input.
 * It consists of two parts: the time input field and the clocks.
 *
 * ### Usage
 * The user can enter a time by:
 *
 * - Using the clocks that are displayed in a popup
 * - Typing it in directly in the input field
 *
 * When the user makes an entry and chooses the enter key, the clocks show the corresponding time (hours, minutes and seconds separately).
 * When the user directly triggers the clocks display, the actual time is displayed.
 * For the `ui5-time-picker`
 *
 * ### Formatting
 *
 * If a time is entered by typing it into
 * the input field, it must fit to the used time format.
 *
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see [UTS #35: Unicode Locale Data Markup Language](http://unicode.org/reports/tr35/#Date_Field_Symbol_Table).
 *
 * For example, if the `format-pattern` is "HH:mm:ss",
 * a valid value string is "11:42:35" and the same is displayed in the input.
 *
 * ### Keyboard handling
 * [F4], [Alt]+[Up], [Alt]+[Down] Open/Close picker dialog and move focus to it.
 *
 * When closed:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * -
 *
 * When opened:
 *
 * - [Page Up] - Increments hours by 1. If 12 am is reached, increment hours to 1 pm and vice versa.
 * - [Page Down] - Decrements the corresponding field by 1. If 1 pm is reached, decrement hours to 12 am and vice versa.
 * - [Shift]+[Page Up] - Increments minutes by 1.
 * - [Shift]+[Page Down] - Decrements minutes by 1.
 * - [Shift]+[Ctrl]+[Page Up] - Increments seconds by 1.
 * - [Shift]+[Ctrl]+[Page Down] - Decrements seconds by 1.
 * - [A] or [P] - Selects AM or PM respectively.
 * - [0]-[9] - Allows direct time selecting (hours/minutes/seconds).
 * - [:] - Allows switching between hours/minutes/seconds clocks. If the last clock is displayed and [:] is pressed, the first clock is beind displayed.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TimePicker.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.6
 */
@customElement({
	tag: "ui5-time-picker",
	languageAware: true,
	cldr: true,
	formAssociated: true,
	renderer: jsxRenderer,
	template: TimePickerTemplate,
	styles: [
		TimePickerCss,
		ResponsivePopoverCommonCss,
		TimePickerPopoverCss,
	],
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
 * @public
 * @param {string} value The submitted value.
 * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
 */
@event("change", {
	bubbles: true,
})

/**
 * Fired when the value of the `ui5-time-picker` is changed at each key stroke.
 * @public
 * @param {string} value The current value.
 * @param {boolean} valid Indicator if the value is in correct format pattern and in valid range.
 */
@event("input", {
	bubbles: true,
})
/**
 * Fired after the value-help dialog of the component is opened.
 * @since 2.0.0
 * @public
 */
@event("open", {
	bubbles: true,
})
/**
 * Fired after the value-help dialog of the component is closed.
 * @since 2.0.0
 * @public
 */
@event("close", {
	bubbles: true,
})
class TimePicker extends UI5Element implements IFormInputElement {
	eventDetails!: {
		change: TimePickerChangeEventDetail;
		"value-changed": TimePickerChangeEventDetail;
		input: TimePickerInputEventDetail;
		open: void;
		close: void;
	}
	/**
	 * Defines a formatted time value.
	 * @default ""
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property()
	value = "";

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 * @since 2.0.0
	 */
	@property()
	name?: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines the disabled state of the comonent.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the readonly state of the comonent.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines a short hint, intended to aid the user with data entry when the
	 * component has no value.
	 *
	 * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
	 * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Determines the format, displayed in the input field.
	 *
	 * Example:
	 * HH:mm:ss -> 11:42:35
	 * hh:mm:ss a -> 2:23:15 PM
	 * mm:ss -> 12:04 (only minutes and seconds)
	 * @default undefined
	 * @public
	 */
	@property()
	formatPattern?: string;

	/**
	 * Defines the open or closed state of the popover.
	 * @public
	 * @default false
	 * @since 2.0.0
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines whether the component is required.
	 * @since 2.1.0
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines the aria-label attribute for the component.
	 * @default undefined
	 * @public
	 * @since 2.1.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Receives id (or many ids) of the elements that label the component.
	 * @default undefined
	 * @public
	 * @since 2.1.0
	 */
	@property()
	accessibleNameRef?: string;

	@property({ type: Boolean, noAttribute: true })
	_isInputsPopoverOpen = false;

	/**
	 * Defines the value state message that will be displayed as pop up under the `ui5-time-picker`.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the `ui5-time-picker` is in `Information`, `Critical` or `Negative` value state.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	tempValue?: string;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get formValidityMessage() {
		return TimePicker.i18nBundle.getText(FORM_TEXTFIELD_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this.required && !this.value };
	}

	async formElementAnchor() {
		return (await this.getFocusDomRefAsync() as UI5Element)?.getFocusDomRefAsync();
	}

	get formFormattedValue(): FormData | string | null {
		return this.value || "";
	}

	onBeforeRendering() {
		if (this.value) {
			this.value = this.normalizeValue(this.value) || this.value;
		}

		this.tempValue = this.value && this.isValid(this.value) ? this.value : this.getFormat().format(UI5Date.getInstance());
	}

	get dateAriaDescription() {
		return TimePicker.i18nBundle.getText(TIMEPICKER_INPUT_DESCRIPTION);
	}

	get pickerAccessibleName() {
		return TimePicker.i18nBundle.getText(TIMEPICKER_POPOVER_ACCESSIBLE_NAME);
	}

	get accInfo(): InputAccInfo {
		return {
			"ariaRoledescription": this.dateAriaDescription,
			"ariaHasPopup": "dialog",
			"ariaRequired": this.required,
			"ariaLabel": getEffectiveAriaLabelText(this),
		};
	}

	/**
	 * Currently selected time represented as JavaScript Date instance
	 * @public
	 * @default null
	 */
	get dateValue(): Date | null {
		return this.getFormat().parse(this._effectiveValue) as Date;
	}

	/**
	 * @protected
	 */
	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	/**
	 * @protected
	 */
	get _formatPattern() {
		const hasHours = !!this.formatPattern?.match(/H/i);
		const fallback = !this.formatPattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getTimePattern("medium") : this.formatPattern;
	}

	get _displayFormat() {
		// @ts-ignore oFormatOptions is a private API of DateFormat
		return this.getFormat().oFormatOptions.pattern as string;
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

	get _isMobileDevice() {
		return !isDesktop() && (isPhone() || isTablet());
	}

	onTimeSelectionChange(e: CustomEvent<TimeSelectionChangeEventDetail>) {
		this.tempValue = e.detail.value; // every time the user changes the time selection -> update tempValue
	}

	_togglePicker() {
		this.open = !this.open;
	}

	submitPickers() {
		this._updateValueAndFireEvents(this.tempValue!, true, ["change", "value-changed"]);
		this._togglePicker();
	}

	onResponsivePopoverAfterClose() {
		this.open = false;
		this.fireDecoratorEvent("close");
	}

	onResponsivePopoverAfterOpen() {
		this.fireDecoratorEvent("open");
	}

	/**
	 * Opens the Inputs popover.
	 * @private
	 * @returns Resolves when the Inputs popover is open
	 */
	openInputsPopover() {
		this.tempValue = this.value && this.isValid(this.value) ? this.value : this.getFormat().format(UI5Date.getInstance());
		const popover = this._getInputsPopover();
		popover.opener = this;
		popover.open = true;
		this._isInputsPopoverOpen = true;
	}

	/**
	 * Closes the Inputs popover
	 * @private
	 * @returns Resolves when the Inputs popover is closed
	 */
	closeInputsPopover() {
		const popover = this._getInputsPopover();
		popover.open = false;
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
	 */
	isInputsPopoverOpen(): boolean {
		return !!this._isInputsPopoverOpen;
	}

	submitInputsPopover() {
		this._updateValueAndFireEvents(this.tempValue!, true, ["change", "value-changed"]);
		this.closeInputsPopover();
	}

	onInputsPopoverAfterOpen() {
		const popover = this._getInputsPopover();
		popover.querySelector<TimeSelectionInputs>("[ui5-time-selection-inputs]")!._addNumericAttributes();
	}

	onInputsPopoverAfterClose() {
		this._isInputsPopoverOpen = false;
	}

	_handleInputClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (this.open) {
			return;
		}

		if (this._isMobileDevice && target && !target.hasAttribute("ui5-icon")) {
			this.toggleInputsPopover();
		}

		const inputField = this._getInputField();

		if (inputField) {
			(inputField as HTMLInputElement).select();
		}
	}

	_updateValueAndFireEvents(value: string, normalizeValue: boolean, eventsNames: Array<"input" | "change" | "value-changed">) {
		if (value === this.value) {
			return;
		}

		const valid = this.isValid(value);

		if (value !== undefined && valid && normalizeValue) { // if value === undefined, valid is guaranteed to be falsy
			value = this.normalizeValue(value); // transform valid values (in any format) to the correct format
		}
		if (!eventsNames.includes("input")) {
			this.value = ""; // Do not remove! DurationPicker (an external component extending TimePicker) use case -> value is 05:10, user tries 05:12, after normalization value is changed back to 05:10 so no invalidation happens, but the input still shows 05:12. Thus we enforce invalidation with the ""
			this.value = value;
		}
		this.tempValue = value; // if the picker is open, sync it
		this._updateValueState(); // Change the value state to Error/None, but only if needed
		eventsNames.forEach(eventName => {
			this.fireDecoratorEvent(eventName, { value, valid });
		});
	}

	_updateValueState() {
		const isValid = this.isValid(this.value);
		if (!isValid) { // If not valid - always set Error regardless of the current value state
			this.valueState = ValueState.Negative;
		} else if (isValid && this.valueState === ValueState.Negative) { // However if valid, change only Error (but not the others) to None
			this.valueState = ValueState.None;
		}
	}

	_handleInputChange(e: CustomEvent) {
		const target = e.target as Input;
		this._updateValueAndFireEvents(target.value, true, ["change", "value-changed"]);
	}

	_handleInputLiveChange(e: CustomEvent) {
		if (this._isPhone) {
			e.preventDefault();
		}

		const target = e.target as Input;
		this._updateValueAndFireEvents(target.value, false, ["input"]);
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_canOpenInputsPopover() {
		return !this.disabled && this._isMobileDevice;
	}

	_getPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	_getInputsPopover() {
		return this.shadowRoot!.querySelector<Popover>("[ui5-popover]")!;
	}

	_getInput(): Input {
		return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
	}

	_getInputField() {
		const input = this._getInput();
		return input && input.getInputDOMRef();
	}

	_onkeydown(e: KeyboardEvent) {
		if (this._isMobileDevice && !this.isInputsPopoverOpen()) {
			e.preventDefault();
		}
		if (isShow(e)) {
			e.preventDefault();
			this._togglePicker();
		}

		const target = e.target as HTMLElement;

		if (target && this.open && this._getInput().id === target.id && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
			this._togglePicker();
		}
		if (this.open) {
			return;
		}

		if (isEnter(e)) {
			if (this._internals.form) {
				submitForm(this);
			}
		} else if (isPageUpShiftCtrl(e)) {
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
	 * according to the `formatPattern` property of the TimePicker instance
	 * @param date A Java Script date object to be formatted as string
	 * @public
	 * @returns formatted value
	 */
	formatValue(date: Date): string {
		return this.getFormat().format(date);
	}

	/**
	 * Checks if a value is valid against the current `formatPattern` value.
	 *
	 * **Note:** an empty string is considered as valid value.
	 * @param value The value to be tested against the current date format
	 * @public
	 */
	isValid(value: string | undefined): boolean {
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
		const date = this.getFormat().parse(this._effectiveValue) as Date;
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
	 * The listener for this event can't be passive as it calls preventDefault()
	 * @param e Wheel Event
	 * @private
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

	_onfocusin(e: FocusEvent) {
		if (this._isMobileDevice) {
			this._hideMobileKeyboard();
			if (this._isInputsPopoverOpen) {
				const popover = this._getInputsPopover();
				popover.applyFocus();
			}
			e.preventDefault();
		}
	}

	get submitButtonLabel() {
		return TimePicker.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get cancelButtonLabel() {
		return TimePicker.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	/**
	 * @protected
	 */
	get openIconName() {
		return "time-entry-request";
	}
}

TimePicker.define();

export default TimePicker;
export type {
	TimeSelectionChangeEventDetail,
	TimePickerChangeEventDetail,
	TimePickerInputEventDetail,
};
