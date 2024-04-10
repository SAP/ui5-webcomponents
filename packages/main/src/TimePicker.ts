import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TimePickerBase from "./TimePickerBase.js";
import { attachFormElementInternals, setFormElementValue } from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";

import type {
	TimePickerBaseChangeEventDetail as TimePickerChangeEventDetail,
	TimePickerBaseInputEventDetail as TimePickerInputEventDetail,
} from "./TimePickerBase.js";

import {
	TIMEPICKER_INPUT_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";

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
 * @extends TimePickerBase
 * @public
 * @since 1.0.0-rc.6
 */
@customElement("ui5-time-picker")
class TimePicker extends TimePickerBase implements IFormElement {
	/**
	 * Defines a short hint, intended to aid the user with data entry when the
	 * component has no value.
	 *
	 * **Note:** When no placeholder is set, the format pattern is displayed as a placeholder.
	 * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	placeholder?: string;

	/**
	 * Determines the format, displayed in the input field.
	 *
	 * Example:
	 * HH:mm:ss -> 11:42:35
	 * hh:mm:ss a -> 2:23:15 PM
	 * mm:ss -> 12:04 (only minutes and seconds)
	 * @default ""
	 * @public
	 */
	@property()
	formatPattern!: string;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	internals_?: ElementInternals;
	static formAssociated = true;

	formAssociatedCallback() {
		attachFormElementInternals(this);
		setFormElementValue(this);
	}

	get validity() { return this.internals_?.validity; }
	get validationMessage() { return this.internals_?.validationMessage; }
	checkValidity() { return this.internals_?.checkValidity(); }
	reportValidity() { return this.internals_?.reportValidity(); }

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formElementFormattedValue(): FormData | string | null {
		return this.value || "";
	}

	onBeforeRendering() {
		if (this.value) {
			this.value = this.normalizeValue(this.value) || this.value;
			setFormElementValue(this);
		}
	}

	get _formatPattern() {
		const hasHours = !!this.formatPattern.match(/H/i);
		const fallback = !this.formatPattern || !hasHours;

		const localeData = getCachedLocaleDataInstance(getLocale());
		return fallback ? localeData.getTimePattern("medium") : this.formatPattern;
	}

	get _displayFormat() {
		// @ts-ignore oFormatOptions is a private API of DateFormat
		return this.getFormat().oFormatOptions.pattern as string;
	}

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	/**
	 * Currently selected time represented as JavaScript Date instance
	 * @public
	 * @default null
	 */
	get dateValue(): Date | Date[] | null {
		return this.getFormat().parse(this._effectiveValue as string);
	}

	get accInfo() {
		return {
			"ariaRoledescription": this.dateAriaDescription,
			"ariaHasPopup": "dialog",
		};
	}

	get dateAriaDescription() {
		return TimePicker.i18nBundle.getText(TIMEPICKER_INPUT_DESCRIPTION);
	}
}

TimePicker.define();

export default TimePicker;
export type {
	TimePickerChangeEventDetail,
	TimePickerInputEventDetail,
};
