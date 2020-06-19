import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import DateFormat from "@ui5/webcomponents-localization/dist/DateFormat.js";
import LocaleData from "@ui5/webcomponents-localization/dist/LocaleData.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js"; // default calendar for bundling
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isLeft,
	isRight,
	isTabNext,
	isTabPrevious,
	isShow,
} from "@ui5/webcomponents-base/src/Keys.js";
import "@ui5/webcomponents-icons/dist/icons/time-entry-request.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import ResponsivePopover from "./ResponsivePopover.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import TimePickerTemplate from "./generated/templates/TimePickerTemplate.lit.js";
import TimePickerPopoverTemplate from "./generated/templates/TimePickerPopoverTemplate.lit.js";
import Input from "./Input.js";
import WheelSlider from "./WheelSlider.js";
import {
	getHours,
	getMinutes,
	getSeconds,
	getHoursConfigByFormat,
	getTimeControlsByFormat,
} from "./timepicker-utils/TimeSlider.js";

import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_PERIODS_LABEL,
	TIMEPICKER_SUBMIT_BUTTON,
	TIMEPICKER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import TimePickerPopoverCss from "./generated/themes/TimePickerPopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-time-picker",
	altTag: "ui5-timepicker",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
		 * Defines a formatted time value.
		 *
		 * @type {string}
		 * @defaultvalue undefined
		 * @public
		 */
		value: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines a short hint, intended to aid the user with data entry when the
		 * <code>ui5-time-picker</code> has no value.
		 *
		 * <br><br>
		 * <b>Note:</b> When no placeholder is set, the format pattern is displayed as a placeholder.
		 * Passing an empty string as the value of this property will make the <code>ui5-time-picker</code> appear empty - without placeholder or format pattern.
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
		 * Determines the format, displayed in the input field.
		 *
		 * Example:
		 * HH:mm:ss -> 11:42:35
		 * hh:mm:ss a -> 2:23:15 PM
		 * mm:ss -> 12:04 (only minutes and seconds)
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		formatPattern: {
			type: String,
		},

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
		 * @type {ValueState}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines whether the <code>ui5-time-picker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-time-picker</code> is displayed as readonly.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		readonly: {
			type: Boolean,
		},

		_isPickerOpen: {
			type: Boolean,
			noAttribute: true,
		},

		_respPopover: {
			type: Object,
		},

		_hours: {
			type: String,
		},

		_minutes: {
			type: String,
		},

		_seconds: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
		 * Defines the value state message that will be displayed as pop up under the <code>ui5-time-picker</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> If not specified, a default text (in the respective language) will be displayed.
		 * <br>
		 * <b>Note:</b> The <code>valueStateMessage</code> would be displayed,
		 * when the <code>ui5-time-picker</code> is in <code>Information</code>, <code>Warning</code> or <code>Error</code> value state.
		 * @type {HTMLElement}
		 * @since 1.0.0-rc.8
		 * @slot
		 * @public
		 */
		valueStateMessage: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
		 * Fired when the input operation has finished by clicking the "OK" button or
		 * when the text in the input field has changed and the focus leaves the input field.
		 *
		 * @event
		 * @public
		*/
		change: {},
		/**
		 * Fired when the value of the <code>ui5-time-picker</code> is changed at each key stroke.
		 *
		 * @event
		 * @public
		*/
		input: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-time-picker</code> component provides an input field with assigned sliders which opens on user action.
 * The <code>ui5-time-picker</code> allows users to select a localized time using touch,
 * mouse, or keyboard input. It consists of two parts: the time input field and the
 * sliders.
 *
 * <h3>Usage</h3>
 * The user can enter a time by:
 * <ul>
 * <li>Using the sliders that opens in a popup</li>
 * <li>Typing it in directly in the input field</li>
 * </ul>
 * <br><br>
 * When the user makes an entry and chooses the enter key, the sliders shows the corresponding time.
 * When the user directly triggers the sliders display, the actual time is displayed.
 * For the <code>ui5-time-picker</code>
 *
 * <h3>Formatting</h3>
 *
 * If a time is entered by typing it into
 * the input field, it must fit to the used time format.
 * <br><br>
 * Supported format options are pattern-based on Unicode LDML Date Format notation.
 * For more information, see <ui5-link target="_blank" href="http://unicode.org/reports/tr35/#Date_Field_Symbol_Table" class="api-table-content-cell-link">UTS #35: Unicode Locale Data Markup Language</ui5-link>.
 * <br><br>
 * For example, if the <code>format-pattern</code> is "HH:mm:ss",
 * a valid value string is "11:42:35" and the same is displayed in the input.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/TimePicker.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimePicker
 * @extends UI5Element
 * @tagname ui5-time-picker
 * @public
 * @since 1.0.0-rc.6
 */
class TimePicker extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TimePickerCss;
	}

	static get staticAreaTemplate() {
		return TimePickerPopoverTemplate;
	}

	static get template() {
		return TimePickerTemplate;
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			ResponsivePopover.define(),
			fetchI18nBundle("@ui5/webcomponents"),
			WheelSlider.define(),
			Input.define(),
		]);
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, TimePickerPopoverCss];
	}


	constructor() {
		super();

		this.prevValue = null;
		this._isPickerOpen = false;
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");

		this._respPopover = {
			placementType: PopoverPlacementType.Bottom,
			horizontalAlign: PopoverHorizontalAlign.Left,
			allowTargetOverlap: true,
			stayOpenOnScroll: true,
			afterClose: () => {
				this._isPickerOpen = false;
				this.closePicker();
			},
		};

		this._hoursParameters = {
			minHour: 0,
			maxHour: 0,
			isTwelveHoursFormat: false,
		};

		this._slidersDomRefs = [];
	}

	onBeforeRendering() {
		if (!this.formatPattern) {
			this.formatPattern = LocaleData.getInstance(getLocale()).getTimePattern(this.getFormat().oFormatOptions.style);
		}

		if (this.value === undefined) {
			this.value = this.getFormat().format(new Date());
		}

		this._initHoursFormatParameters();
	}

	async _handleInputClick() {
		if (this._isPickerOpen) {
			return;
		}

		const inputField = await this._getInputField();

		if (inputField) {
			inputField.select();
		}
	}

	_handleInputChange() {
		const nextValue = this._getInput().getInputValue(),
			isValid = this.isValid(nextValue);

		this.setValue(nextValue);
		this.fireEvent("change", { value: nextValue, valid: isValid });
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue(),
			isValid = this.isValid(nextValue);

		this.value = nextValue;
		this.setSlidersValue();
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	setSlidersValue() {
		const currentDate = this._getInput() ? this.getFormat().parse(this._getInput().getAttribute("value")) : null,
			secondsSlider = this.secondsSlider,
			minutesSlider = this.minutesSlider,
			hoursSlider = this.hoursSlider,
			periodsSlider = this.periodsSlider;

		if (!currentDate) {
			return;
		}
		if (hoursSlider) {
			let tempValue = "";
			if (this._hoursParameters.isTwelveHoursFormat && currentDate.getHours() > this._hoursParameters.maxHour) {
				tempValue = currentDate.getHours() - 12;
			} else if (this._hoursParameters.isTwelveHoursFormat && currentDate.getHours() < this._hoursParameters.minHour) {
				tempValue = currentDate.getHours() + 12;
			} else {
				tempValue = currentDate.getHours();
			}
			if (tempValue.toString().length === 1) {
				hoursSlider.value = `0${tempValue}`;
			} else {
				hoursSlider.value = tempValue.toString();
			}
		}
		if (minutesSlider) {
			const tempValue = currentDate.getMinutes();
			if (tempValue.toString().length === 1) {
				minutesSlider.value = `0${tempValue}`;
			} else {
				minutesSlider.value = tempValue.toString();
			}
		}
		if (secondsSlider) {
			const tempValue = currentDate.getSeconds();
			if (tempValue.toString().length === 1) {
				secondsSlider.value = `0${tempValue}`;
			} else {
				secondsSlider.value = tempValue.toString();
			}
		}
		if (this._hoursParameters.isTwelveHoursFormat && periodsSlider && this._hoursParameters.minHour === 1) {
			periodsSlider.value = currentDate.getHours() >= this._hoursParameters.maxHour ? this.periodsArray[1] : this.periodsArray[0];
		} else if (this._hoursParameters.isTwelveHoursFormat && periodsSlider) {
			periodsSlider.value = (currentDate.getHours() > this._hoursParameters.maxHour || currentDate.getHours() === this._hoursParameters.minHour) ? this.periodsArray[1] : this.periodsArray[0];
		}
	}

	/**
	 * Closes the picker
	 * @public
	 */
	async closePicker() {
		await this._getPopover();
		this.responsivePopover.close();
		this._isPickerOpen = false;

		for (let i = 0; i < this._slidersDomRefs.length; i++) {
			this._slidersDomRefs[i].collapseSlider();
		}
	}

	/**
	 * Opens the picker.
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	async openPicker() {
		await this._getPopover();
		this.responsivePopover.open(this);
		this._isPickerOpen = true;
		this._slidersDomRefs = await this.slidersDomRefs();

		this.setSlidersValue();

		if (this._slidersDomRefs[0]) {
			this._slidersDomRefs[0].focus();
		}
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
			this._isPickerOpen = false;
		} else if (this._canOpenPicker()) {
			this.openPicker();
			this._isPickerOpen = true;
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the TimePicker
	 * @param {string} value A value to be tested against the current date format
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("ui5-responsive-popover");
		return this.responsivePopover;
	}

	get secondsArray() {
		return getSeconds();
	}

	get minutesArray() {
		return getMinutes();
	}

	get hoursArray() {
		return getHours(this._hoursParameters);
	}

	get periodsArray() {
		return this.getFormat().aDayPeriods.map(x => x.toUpperCase());
	}

	async slidersDomRefs() {
		await this._getPopover();
		return this.responsivePopover.default.length ? [...this.responsivePopover.default[0].children].filter(x => x.isUI5Element) : this.responsivePopover.default;
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	_getInputField() {
		const input = this._getInput();
		return input && input.getInputDOMRef();
	}

	get secondsSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-time-picker-seconds-wheelslider");
	}

	get minutesSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-time-picker-minutes-wheelslider");
	}

	get hoursSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-time-picker-hours-wheelslider");
	}

	get periodsSlider() {
		return this.responsivePopover && this.responsivePopover.querySelector(".ui5-time-picker-period-wheelslider");
	}

	submitPickers() {
		const selectedDate = new Date(),
			secondsSlider = this.secondsSlider,
			minutesSlider = this.minutesSlider,
			hoursSlider = this.hoursSlider,
			periodsSlider = this.periodsSlider,
			minutes = minutesSlider ? minutesSlider.getAttribute("value") : "0",
			seconds = secondsSlider ? secondsSlider.getAttribute("value") : "0",
			period = periodsSlider ? periodsSlider.getAttribute("value") : this.periodsArray[0],
			isTwelveHoursFormat = this._hoursParameters.isTwelveHoursFormat;

		let hours = hoursSlider ? hoursSlider.getAttribute("value") : this._hoursParameters.minHour.toString();

		if (isTwelveHoursFormat) {
			if (period === this.periodsArray[0]) { // AM
				hours = hours === "12" ? 0 : hours;
			}

			if (period === this.periodsArray[1]) { // PM
				hours = hours === "12" ? hours : hours * 1 + 12;
			}
		}

		selectedDate.setHours(hours);
		selectedDate.setMinutes(minutes);
		selectedDate.setSeconds(seconds);

		this.setPrevValue(this.value);
		this.setValue(this.getFormat().format(selectedDate));

		if (this.prevValue !== this.value) {
			this.fireEvent("change", { value: this.value, valid: true });
			this.previousValue = this.value;
		}

		this.closePicker();
	}

	/**
	 * Checks if a value is valid against the current format patternt of the TimePicker.
	 *
	 * <br><br>
	 * <b>Note:</b> an empty string is considered as valid value.
	 * @param {string} value The value to be tested against the current date format
	 * @public
	 */
	isValid(value) {
		if (value === "") {
			return true;
		}
		return !!(value && this.getFormat().parse(value));
	}

	normalizeValue(value) {
		if (value === "") {
			return value;
		}

		return this.getFormat().format(this.getFormat().parse(value));
	}

	get _formatPattern() {
		return this.formatPattern || "medium"; // get from config
	}

	get _isPattern() {
		return this._formatPattern !== "medium" && this._formatPattern !== "short" && this._formatPattern !== "long";
	}

	get _displayFormat() {
		return this.getFormat().oFormatOptions.pattern;
	}

	get _placeholder() {
		return this.placeholder !== undefined ? this.placeholder : this._displayFormat;
	}

	handleSliderClicked(event) {
		if (event.target._expanded) {
			this.openSlider(event.target.label);
		}
	}

	openSlider(label) {
		for (let i = 0; i < this._slidersDomRefs.length; i++) {
			if (this._slidersDomRefs[i].label !== label) {
				this._slidersDomRefs[i].collapseSlider();
			}
		}
	}

	async _onfocuscontainerin(e) {
		if (e.target !== e.currentTarget) {
			return;
		}
		let sliders = [];
		if (this._slidersDomRefs.length) {
			sliders = await this.slidersDomRefs();
		} else {
			sliders = this._slidersDomRefs;
		}
		if (sliders[0]) {
			sliders[0].focus();
		}
	}

	async _oncontainerkeydown(e) {
		if (isLeft(e)) {
			let expandedSliderIndex = 0;
			for (let i = 0; i < this._slidersDomRefs.length; i++) {
				if (this._slidersDomRefs[i]._expanded) {
					expandedSliderIndex = i;
				}
			}
			if (this._slidersDomRefs[expandedSliderIndex - 1]) {
				this._slidersDomRefs[expandedSliderIndex - 1].focus();
			} else {
				this._slidersDomRefs[this._slidersDomRefs.length - 1].focus();
			}
		} else if (isRight(e)) {
			let expandedSliderIndex = 0;

			for (let i = 0; i < this._slidersDomRefs.length; i++) {
				if (this._slidersDomRefs[i]._expanded) {
					expandedSliderIndex = i;
				}
			}
			if (this._slidersDomRefs[expandedSliderIndex + 1]) {
				this._slidersDomRefs[expandedSliderIndex + 1].focus();
			} else {
				this._slidersDomRefs[0].focus();
			}
		}

		if (isTabNext(e) && e.target === this._slidersDomRefs[this._slidersDomRefs.length - 1]) {
			const responsivePopover = await this._getPopover();
			e.preventDefault();
			responsivePopover.querySelector(".ui5-time-picker-footer").firstElementChild.focus();
		} else if (isTabPrevious(e) && e.target === this._slidersDomRefs[0]) {
			const responsivePopover = await this._getPopover();
			e.preventDefault();
			responsivePopover.querySelector(`.ui5-time-picker-footer`).lastElementChild.focus();
		}
	}

	_onfooterkeydown(e) {
		if (isTabNext(e) && e.target === e.target.parentElement.lastElementChild) {
			e.preventDefault();
			this._slidersDomRefs[0].focus();
		}

		if (isTabPrevious(e) && e.target === e.target.parentElement.firstElementChild) {
			e.preventDefault();
			this._slidersDomRefs[this._slidersDomRefs.length - 1].focus();
		}
	}

	_ontimepickerkeydown(e) {
		this._handleTimepickerKeysDown(e);
	}

	_ontimepickerpopoverkeydown(e) {
		this._handleTimepickerKeysDown(e);
	}

	_handleTimepickerKeysDown(e) {
		if (isShow(e)) {
			e.preventDefault();
			this.togglePicker();
		}
	}

	_handleWheel(e) {
		e.preventDefault();
	}

	getFormat() {
		if (this._isPattern) {
			this._oDateFormat = DateFormat.getInstance({
				pattern: this._formatPattern,
			});
		} else {
			this._oDateFormat = DateFormat.getInstance({
				style: this._formatPattern,
			});
		}

		return this._oDateFormat;
	}

	setValue(value) {
		if (this.isValid(value)) {
			this.value = this.normalizeValue(value);
			this.setSlidersValue();
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}
	}

	setPrevValue(value) {
		if (this.isValid(value)) {
			this.prevValue = this.normalizeValue(value);
		}
	}

	/**
	 * Formats a Java Script date object into a string representing a locale date and time
	 * according to the <code>formatPattern</code> property of the TimePicker instance
	 * @param {object} oDate A Java Script date object to be formatted as string
	 * @public
	 */
	formatValue(oDate) {
		return this.getFormat().format(oDate);
	}

	_getSlidersContained() {
		const formatArray = this.getFormat().aFormatArray;
		return getTimeControlsByFormat(formatArray, this._hoursParameters);
	}

	_initHoursFormatParameters() {
		const formatArray = this.getFormat().aFormatArray;
		const config = getHoursConfigByFormat(formatArray[0].type);

		this._hoursParameters.minHour = config.minHour;
		this._hoursParameters.maxHour = config.maxHour;
		this._hoursParameters.isTwelveHoursFormat = config.isTwelveHoursFormat;
	}

	/**
	 * Currently selected date represented as JavaScript Date instance
	 *
	 * @readonly
	 * @type { Date }
	 * @public
	 */
	get dateValue() {
		return this.getFormat().parse(this.value);
	}

	get shouldBuildHoursSlider() {
		return this._getSlidersContained()[0];
	}

	get shouldBuildMinutesSlider() {
		return this._getSlidersContained()[1];
	}

	get shouldBuildSecondsSlider() {
		return this._getSlidersContained()[2];
	}

	get shouldBuildPeriodsSlider() {
		return this._getSlidersContained()[3];
	}

	get hoursSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_HOURS_LABEL);
	}

	get minutesSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_MINUTES_LABEL);
	}

	get secondsSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_SECONDS_LABEL);
	}

	get periodSliderTitle() {
		return this.i18nBundle.getText(TIMEPICKER_PERIODS_LABEL);
	}

	get submitButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_SUBMIT_BUTTON);
	}

	get cancelButtonLabel() {
		return this.i18nBundle.getText(TIMEPICKER_CANCEL_BUTTON);
	}

	get classes() {
		return {
			container: {
				"ui5-time-picker-sliders-container": true,
				"ui5-phone": isPhone(),
			},
		};
	}
}

TimePicker.define();

export default TimePicker;
