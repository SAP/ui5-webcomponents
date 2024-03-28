var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimePicker_1;
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import getCachedLocaleDataInstance from "@ui5/webcomponents-localization/dist/getCachedLocaleDataInstance.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import TimePickerBase from "./TimePickerBase.js";
import { TIMEPICKER_INPUT_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
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
let TimePicker = TimePicker_1 = class TimePicker extends TimePickerBase {
    onBeforeRendering() {
        if (this.value) {
            this.value = this.normalizeValue(this.value) || this.value;
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
        return this.getFormat().oFormatOptions.pattern;
    }
    get _placeholder() {
        return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
    }
    /**
     * Currently selected time represented as JavaScript Date instance
     * @public
     * @default null
     */
    get dateValue() {
        return this.getFormat().parse(this._effectiveValue);
    }
    get accInfo() {
        return {
            "ariaRoledescription": this.dateAriaDescription,
            "ariaHasPopup": "dialog",
        };
    }
    get dateAriaDescription() {
        return TimePicker_1.i18nBundle.getText(TIMEPICKER_INPUT_DESCRIPTION);
    }
};
__decorate([
    property({ defaultValue: undefined })
], TimePicker.prototype, "placeholder", void 0);
__decorate([
    property()
], TimePicker.prototype, "formatPattern", void 0);
TimePicker = TimePicker_1 = __decorate([
    customElement("ui5-time-picker")
], TimePicker);
TimePicker.define();
export default TimePicker;
//# sourceMappingURL=TimePicker.js.map