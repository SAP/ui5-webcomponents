import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import CalendarDate from "@ui5/webcomponents-localization/dist/dates/CalendarDate.js";
import modifyDateBy from "@ui5/webcomponents-localization/dist/dates/modifyDateBy.js";
import getRoundedTimestamp from "@ui5/webcomponents-localization/dist/dates/getRoundedTimestamp.js";
import getTodayUTCTimestamp from "@ui5/webcomponents-localization/dist/dates/getTodayUTCTimestamp.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import {
	isPageUp,
	isPageDown,
	isPageUpShift,
	isPageDownShift,
	isPageUpShiftCtrl,
	isPageDownShiftCtrl,
	isShow,
	isF4,
	isEnter,
	isTabNext,
	isTabPrevious,
	isF6Next,
	isF6Previous,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone, isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import CalendarPickersMode from "./types/CalendarPickersMode.js";
import type FormSupportT from "./features/InputElementsFormSupport.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import "@ui5/webcomponents-icons/dist/appointment-2.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import HasPopup from "./types/HasPopup.js";
import { DATEPICKER_OPEN_ICON_TITLE, DATEPICKER_DATE_DESCRIPTION, INPUT_SUGGESTIONS_TITLE } from "./generated/i18n/i18n-defaults.js";
import DateComponentBase from "./DateComponentBase.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Calendar from "./Calendar.js";
import type { CalendarSelectedDatesChangeEventDetail } from "./Calendar.js";
import CalendarDateComponent from "./CalendarDate.js";
import Input from "./Input.js";
import InputType from "./types/InputType.js";
import DatePickerTemplate from "./generated/templates/DatePickerTemplate.lit.js";
import DatePickerPopoverTemplate from "./generated/templates/DatePickerPopoverTemplate.lit.js";

// default calendar for bundling
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";

// Styles
import datePickerCss from "./generated/themes/DatePicker.css.js";
import datePickerPopoverCss from "./generated/themes/DatePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

type DatePickerChangeEventDetail = {
	value: string,
	valid: boolean,
}

type DatePickerInputEventDetail = {
	value: string,
	valid: boolean,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-date-picker</code> component provides an input field with assigned calendar which opens on user action.
 * The <code>ui5-date-picker</code> allows users to select a localized date using touch,
 * mouse, or keyboard input. It consists of two parts: the date input field and the
 * date picker.
 *
 * <h3>Usage</h3>
 *
 * The user can enter a date by:
 * <ul>
 * <li>Using the calendar that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and presses the enter key, the calendar shows the corresponding date.
 * When the user directly triggers the calendar display, the actual date is displayed.
 *
 * <h3>Formatting</h3>
 *
 * If a date is entered by typing it into
 * the input field, it must fit to the used date format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="http://unicode.org/reports/tr35/#Date_Field_Symbol_Table">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * For example, if the <code>format-pattern</code> is "yyyy-MM-dd",
 * a valid value string is "2015-07-30" and the same is displayed in the input.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-date-picker</code> provides advanced keyboard handling.
 * If the <code>ui5-date-picker</code> is focused,
 * you can open or close the drop-down by pressing <code>F4</code>, <code>ALT+UP</code> or <code>ALT+DOWN</code> keys.
 * Once the drop-down is opened, you can use the <code>UP</code>, <code>DOWN</code>, <code>LEFT</code>, <code>RIGHT</code> arrow keys
 * to navigate through the dates and select one by pressing the <code>Space</code> or <code>Enter</code> keys. Moreover you can
 * use TAB to reach the buttons for changing month and year.
 * <br>
 *
 * If the <code>ui5-date-picker</code> input field is focused and its corresponding picker dialog is not opened,
 * then users can increment or decrement the date referenced by <code>dateValue</code> property
 * by using the following shortcuts:
 * <br>
 * <ul>
 * <li>[PAGEDOWN] - Decrements the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEDOWN] - Decrements the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEDOWN] - Decrements the corresponding year by one</li>
 * <li>[PAGEUP] - Increments the corresponding day of the month by one</li>
 * <li>[SHIFT] + [PAGEUP] - Increments the corresponding month by one</li>
 * <li>[SHIFT] + [CTRL] + [PAGEUP] - Increments the corresponding year by one</li>
 * </ul>
 *
 * <h3>Calendar types</h3>
 * The component supports several calendar types - Gregorian, Buddhist, Islamic, Japanese and Persian.
 * By default the Gregorian Calendar is used. In order to use the Buddhist, Islamic, Japanese or Persian calendar,
 * you need to set the <code>primaryCalendarType</code> property and import one or more of the following modules:
 * <br><br>
 *
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";</code>
 * <br><br>
 *
 * Or, you can use the global configuration and set the <code>calendarType</code> key:
 * <br>
 * <pre><code>&lt;script data-id="sap-ui-config" type="application/json"&gt;
 * {
 *	"calendarType": "Japanese"
 * }
 * &lt;/script&gt;</code></pre>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DatePicker";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.DatePicker
 * @extends sap.ui.webc.main.DateComponentBase
 * @tagname ui5-date-picker
 * @public
 */

@customElement({
	tag: "ui5-date-picker",
	languageAware: true,
	template: DatePickerTemplate,
	staticAreaTemplate: DatePickerPopoverTemplate,
	styles: datePickerCss,
	staticAreaStyles: [
		ResponsivePopoverCommonCss,
		datePickerPopoverCss,
	],
	dependencies: [
		Icon,
		ResponsivePopover,
		Calendar,
		CalendarDateComponent,
		Input,
		Button,
	],
})
/**
 * Fired when the input operation has finished by pressing Enter or on focusout.
 *
 * @event sap.ui.webc.main.DatePicker#change
 * @allowPreventDefault
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
 * Fired when the value of the component is changed at each key stroke.
 *
 * @event sap.ui.webc.main.DatePicker#input
 * @allowPreventDefault
 * @public
 * @param {string} value The submitted value.
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
class DatePicker extends DateComponentBase implements IFormElement {
	/**
	 * Defines a formatted date value.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DatePicker.prototype.value
	 * @defaultvalue ""
	 * @formEvents change input
	 * @formProperty
	 * @public
	 */
	@property()
	value!: string

	/**
	 * Defines the value state of the component.
	 *
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @name sap.ui.webc.main.DatePicker.prototype.valueState
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is required.
	 *
	 * @since 1.0.0-rc.9
	 * @type {boolean}
	 * @name sap.ui.webc.main.DatePicker.prototype.required
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Determines whether the component is displayed as disabled.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.DatePicker.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines whether the component is displayed as read-only.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.DatePicker.prototype.readonly
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines a short hint, intended to aid the user with data entry when the
	 * component has no value.
	 *
	 * <br><br>
	 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
	 * Passing an empty string as the value of this property will make the component appear empty - without placeholder or format pattern.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DatePicker.prototype.placeholder
	 * @defaultvalue undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	placeholder?: string;

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
	 * @name sap.ui.webc.main.DatePicker.prototype.name
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the visibility of the week numbers column.
	 * <br><br>
	 *
	 * <b>Note:</b> For calendars other than Gregorian,
	 * the week numbers are not displayed regardless of what is set.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.DatePicker.prototype.hideWeekNumbers
	 * @defaultvalue false
	 * @public
	 * @since 1.0.0-rc.8
	 */
	@property({ type: Boolean })
	hideWeekNumbers!: boolean;

	/**
	 * Defines the aria-label attribute for the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DatePicker.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.DatePicker.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	@property({ type: Boolean, noAttribute: true })
	_isPickerOpen!: boolean;

	@property({ type: Object })
	_respPopoverConfig!: object;

	@property({ defaultValue: "day" })
	_calendarCurrentPicker!: string;

	liveValue?: string;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 * <br><br>
	 *
	 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
	 * <br>
	 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
	 * when the component is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
	 * @type {HTMLElement}
	 * @name sap.ui.webc.main.DatePicker.prototype.valueStateMessage
	 * @since 1.0.0-rc.7
	 * @slot
	 * @public
	 */
	@slot({ type: HTMLElement })
	valueStateMessage!: Array<HTMLElement>;

	/**
	 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit,
	 * when <code>name</code> property is set.
	 * @type {HTMLElement[]}
	 * @slot
	 * @private
	 */
	@slot({ type: HTMLElement })
	formSupport!: Array<HTMLElement>;

	responsivePopover?: ResponsivePopover;

	FormSupport?: typeof FormSupportT;

	static i18nBundle: I18nBundle;

	/**
	 * @protected
	 */
	onResponsivePopoverAfterClose() {
		this._isPickerOpen = false;
		if (isPhone()) {
			this.blur(); // close device's keyboard and prevent further typing
		} else {
			this._getInput()?.focus();
		}
	}

	onBeforeRendering() {
		this.FormSupport = getFeature<typeof FormSupportT>("FormSupport");

		["minDate", "maxDate"].forEach((prop: string) => {
			const propValue = this[prop as keyof DatePicker] as string;

			if (!this.isValid(propValue)) {
				console.warn(`Invalid value for property "${prop}": ${propValue} is not compatible with the configured format pattern: "${this._displayFormat}"`); // eslint-disable-line
			}
		});

		if (this.FormSupport) {
			this.FormSupport.syncNativeHiddenInput(this);
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}

		this.value = this.normalizeValue(this.value) || this.value;
		this.liveValue = this.value;
	}

	/**
	 * Override in derivatives to change calendar selection mode
	 * @returns {string}
	 * @protected
	 */
	get _calendarSelectionMode() {
		return "Single";
	}

	/**
	 * Used to provide a timestamp to the Calendar (to focus it to a relevant date when open) based on the component's state
	 * Override in derivatives to provide the calendar a timestamp based on their properties
	 * By default focus the calendar on the selected date if set, or the current day otherwise
	 * @protected
	 * @returns { number } the calendar timestamp
	 */
	get _calendarTimestamp(): number {
		if (this.value && this.dateValueUTC && this._checkValueValidity(this.value)) {
			const millisecondsUTC = this.dateValueUTC.getTime();
			return getRoundedTimestamp(millisecondsUTC);
		}

		return getTodayUTCTimestamp(this._primaryCalendarType);
	}

	/**
	 * Used to provide selectedDates to the calendar based on the component's state
	 * Override in derivatives to provide different rules for setting the calendar's selected dates
	 * @protected
	 * @returns { array } the selected dates
	 */
	get _calendarSelectedDates(): Array<string> {
		if (this.value && this._checkValueValidity(this.value)) {
			return [this.value];
		}

		return [];
	}

	_onkeydown(e: KeyboardEvent) {
		if (isShow(e)) {
			e.preventDefault(); // Prevent scroll on Alt/Option + Arrow Up/Down
			if (this.isOpen()) {
				if (!isF4(e)) {
					this._toggleAndFocusInput();
				}
			} else {
				this._toggleAndFocusInput();
			}
		}

		if ((this._getInput().isEqualNode(e.target as Node) && this.isOpen()) && (isTabNext(e) || isTabPrevious(e) || isF6Next(e) || isF6Previous(e))) {
			this.closePicker();
		}

		if (this.isOpen()) {
			return;
		}

		if (isEnter(e)) {
			if (this.FormSupport) {
				this.FormSupport.triggerFormSubmit(this);
			}
		} else if (isPageUpShiftCtrl(e)) {
			e.preventDefault();
			this._modifyDateValue(1, "year");
		} else if (isPageUpShift(e)) {
			e.preventDefault();
			this._modifyDateValue(1, "month");
		} else if (isPageUp(e)) {
			e.preventDefault();
			this._modifyDateValue(1, "day");
		} else if (isPageDownShiftCtrl(e)) {
			e.preventDefault();
			this._modifyDateValue(-1, "year");
		} else if (isPageDownShift(e)) {
			e.preventDefault();
			this._modifyDateValue(-1, "month");
		} else if (isPageDown(e)) {
			e.preventDefault();
			this._modifyDateValue(-1, "day");
		}
	}

	/**
	 *
	 * @param { number } amount
	 * @param { string } unit
	 * @param { boolean } preserveDate whether to preserve the day of the month (f.e. 15th of March + 1 month = 15th of April)
	 * @protected
	 */
	_modifyDateValue(amount: number, unit: string, preserveDate?: boolean) {
		if (!this.dateValue) {
			return;
		}

		const modifiedDate = modifyDateBy(CalendarDate.fromLocalJSDate(this.dateValue), amount, unit, preserveDate, this._minDate, this._maxDate);
		const newValue = this.formatValue(modifiedDate.toUTCJSDate());
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);
	}

	_updateValueAndFireEvents(value: string, normalizeValue: boolean, events: Array<string>, updateValue = true) {
		const valid = this._checkValueValidity(value);

		if (valid && normalizeValue) {
			value = this.normalizeValue(value); // transform valid values (in any format) to the correct format
		}

		let executeEvent = true;
		this.liveValue = value;

		const previousValue = this.value;

		if (updateValue) {
			this._getInput().value = value;
			this.value = value;
			this._updateValueState(); // Change the value state to Error/None, but only if needed
		}

		events.forEach((e: string) => {
			if (!this.fireEvent<DatePickerChangeEventDetail>(e, { value, valid }, true)) {
				executeEvent = false;
			}
		});

		if (!executeEvent && updateValue) {
			if (this.value !== previousValue && this.value !== this._getInput().value) {
				return; // If the value was changed in the change event, do not revert it
			}

			this._getInput().value = previousValue;

			this.value = previousValue;
		}
	}

	_updateValueState() {
		const isValid = this._checkValueValidity(this.value);

		if (isValid && this.valueState === ValueState.Error) { // If not valid - always set Error regardless of the current value state
			this.valueState = ValueState.None;
		} else if (!isValid) { // However if valid, change only Error (but not the others) to None
			this.valueState = ValueState.Error;
		}
	}

	_toggleAndFocusInput() {
		this.togglePicker();
		this._getInput().focus();
	}

	_getInput(): Input {
		return this.shadowRoot!.querySelector<Input>("[ui5-input]")!;
	}

	/**
	 * The ui5-input "submit" event handler - fire change event when the user presses enter
	 * @protected
	 */
	_onInputSubmit() {}

	/**
	 * The ui5-input "change" event handler - fire change event when the user focuses out of the input
	 * @protected
	 */
	_onInputChange(e: Event) {
		this._updateValueAndFireEvents((e.target as DatePicker).value, true, ["change", "value-changed"]);
	}

	/**
	 * The ui5-input "input" event handler - fire input even when the user types
	 * @protected
	 */
	_onInputInput(e: KeyboardEvent) {
		this._updateValueAndFireEvents((e.target as DatePicker).value, false, ["input"], false);
	}

	/**
	 * Checks if the provided value is valid and within valid range.
	 * @protected
	 * @param { string } value
	 * @returns { boolean }
	 */
	_checkValueValidity(value: string): boolean {
		if (value === "") {
			return true;
		}
		return this.isValid(value) && this.isInValidRange(value);
	}

	_click(e: MouseEvent) {
		if (isPhone()) {
			this.responsivePopover!.showAt(this);
			e.preventDefault(); // prevent immediate selection of any item
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the DatePicker.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.DatePicker#isValid
	 * @param { string } [value=""] A value to be tested against the current date format
	 * @returns { boolean }
	 */
	isValid(value = ""): boolean {
		if (value === "") {
			return true;
		}

		return !!this.getFormat().parse(value);
	}

	/**
	 * Checks if a date is between the minimum and maximum date.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.DatePicker#isInValidRange
	 * @param { string } [value=""] A value to be checked
	 * @returns { boolean }
	 */
	isInValidRange(value = ""): boolean {
		if (value === "") {
			return true;
		}

		const calendarDate = this._getCalendarDateFromString(value);

		if (!calendarDate || !this._minDate || !this._maxDate) {
			return false;
		}

		return calendarDate.valueOf() >= this._minDate.valueOf() && calendarDate.valueOf() <= this._maxDate.valueOf();
	}

	/**
	 * The parser understands many formats, but we need one format
	 * @protected
	 */
	normalizeValue(value: string) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value, true), true); // it is important to both parse and format the date as UTC
	}

	get _displayFormat(): string {
		// @ts-ignore oFormatOptions is a private API of DateFormat
		return this.getFormat().oFormatOptions.pattern as string;
	}

	/**
	 * @protected
	 */
	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	get _headerTitleText() {
		return DatePicker.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}

	get phone() {
		return isPhone();
	}

	get showHeader() {
		return this.phone;
	}

	get showFooter() {
		return this.phone;
	}

	get accInfo() {
		return {
			"ariaRoledescription": this.dateAriaDescription,
			"ariaHasPopup": HasPopup.Grid,
			"ariaAutoComplete": "none",
			"ariaRequired": this.required,
			"ariaLabel": getEffectiveAriaLabelText(this),
		};
	}

	get openIconTitle() {
		return DatePicker.i18nBundle.getText(DATEPICKER_OPEN_ICON_TITLE);
	}

	get openIconName() {
		return "appointment-2";
	}

	get dateAriaDescription() {
		return DatePicker.i18nBundle.getText(DATEPICKER_DATE_DESCRIPTION);
	}

	/**
	 * Defines whether the dialog on mobile should have header
	 * @private
	 */
	get _shouldHideHeader() {
		return false;
	}

	/**
	 * Defines whether the value help icon is hidden
	 * @private
	 */
	get _ariaHidden() {
		return isDesktop();
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	get _calendarPickersMode() {
		const format = this.getFormat() as DateFormat & { aFormatArray: Array<{type: string}> };
		const patternSymbolTypes = format.aFormatArray.map(patternSymbolSettings => {
			return patternSymbolSettings.type.toLowerCase();
		});

		if (patternSymbolTypes.includes("day")) {
			return CalendarPickersMode.DAY_MONTH_YEAR;
		}

		if (patternSymbolTypes.includes("month") || patternSymbolTypes.includes("monthstandalone")) {
			return CalendarPickersMode.MONTH_YEAR;
		}

		return CalendarPickersMode.YEAR;
	}

	/**
	 * The user selected a new date in the calendar
	 * @param event
	 * @protected
	 */
	onSelectedDatesChange(e: CustomEvent<CalendarSelectedDatesChangeEventDetail>) {
		e.preventDefault();
		const newValue = e.detail.values && e.detail.values[0];
		this._updateValueAndFireEvents(newValue, true, ["change", "value-changed"]);

		this.closePicker();
	}

	/**
	 * The user clicked the "month" button in the header
	 */
	onHeaderShowMonthPress() {
		this._calendarCurrentPicker = "month";
	}

	/**
	 * The user clicked the "year" button in the header
	 */
	onHeaderShowYearPress() {
		this._calendarCurrentPicker = "year";
	}

	/**
	 * Formats a Java Script date object into a string representing a locale date
	 * according to the <code>formatPattern</code> property of the DatePicker instance
	 * @public
	 * @method
	 * @name sap.ui.webc.main.DatePicker#formatValue
	 * @param {Date} date A Java Script date object to be formatted as string
	 * @returns {string} The date as string
	 */
	formatValue(date: Date) {
		return this.getFormat().format(date);
	}

	/**
	 * Closes the picker.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.DatePicker#closePicker
	 */
	closePicker() {
		this.responsivePopover!.close();
	}

	/**
	 * Opens the picker.
	 * @public
	 * @async
	 * @method
	 * @name sap.ui.webc.main.DatePicker#openPicker
	 * @returns {Promise} Resolves when the picker is open
	 */
	async openPicker() {
		this._isPickerOpen = true;
		this._calendarCurrentPicker = "day";
		this.responsivePopover = await this._respPopover();

		this.responsivePopover.showAt(this);
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}

	/**
	 * Checks if the picker is open.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.DatePicker#isOpen
	 * @returns {boolean} true if the picker is open, false otherwise
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	/**
	 * Currently selected date represented as a Local JavaScript Date instance.
	 *
	 * @public
	 * @readonly
	 * @name sap.ui.webc.main.DatePicker.prototype.dateValue
	 * @type { Date }
	 */
	get dateValue(): Date | null {
		return this.liveValue ? this.getFormat().parse(this.liveValue) as Date : this.getFormat().parse(this.value) as Date;
	}

	get dateValueUTC(): Date | null {
		return this.liveValue ? this.getFormat().parse(this.liveValue, true) as Date : this.getFormat().parse(this.value) as Date;
	}

	get styles() {
		return {
			main: {
				width: "100%",
			},
		};
	}

	get type() {
		return InputType.Text;
	}
}

DatePicker.define();

export default DatePicker;
export type {
	DatePickerChangeEventDetail,
	DatePickerInputEventDetail,
};
