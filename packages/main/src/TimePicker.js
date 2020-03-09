import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getLocale } from "@ui5/webcomponents-base/dist/LocaleProvider.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import DateFormat from "@ui5/webcomponents-utils/dist/sap/ui/core/format/DateFormat.js";
import LocaleData from "@ui5/webcomponents-utils/dist/sap/ui/core/LocaleData.js";
import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import ResponsivePopover from "./ResponsivePopover.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import TimePickerTemplate from "./generated/templates/TimePickerTemplate.lit.js";
import {
	TIMEPICKER_HOURS_LABEL,
	TIMEPICKER_MINUTES_LABEL,
	TIMEPICKER_SECONDS_LABEL,
	TIMEPICKER_PERIODS_LABEL,
} from "./generated/i18n/i18n-defaults.js";
import {
	isLeft,
	isRight,
	isTabNext,
	isTabPrevious,
} from "../../base/src/events/PseudoEvents.js";

// Styles
import TimePickerCss from "./generated/themes/TimePicker.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-timepicker",
	properties: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
		 * Defines a formatted time value.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "",
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
		 * Visualizes the validation state of the Web Component, for example
		 * <code>Error</code>, <code>Warning</code> and
		 * <code>Success</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		valueState: {
			type: ValueState,
			defaultValue: ValueState.None,
		},

		/**
		 * Determines whether the <code>ui5-timepicker</code> is displayed as disabled.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-timepicker</code> is displayed as readonly.
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

		isTwelveHoursFormat: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.TimePicker.prototype */ {
		/**
		 * Fired when the input operation has finished by pressing Enter or on focusout.
		 *
		 * @event
		 * @public
		*/
		change: {},
		/**
		 * Fired when the value of the <code>ui5-timepicker</code> is changed at each key stroke.
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
 * The <code>ui5-timepicker</code> component provides an input field with assigned sliders which opens on user action.
 * The <code>ui5-timepicker</code> allows users to select a localized time using touch,
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
 * For the <code>ui5-timepicker</code>
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
 * @tagname ui5-timepicker
 * @public
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

	static get template() {
		return TimePickerTemplate;
	}

	static async onDefine() {
		await Promise.all([
			fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript()),
			ResponsivePopover.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss];
	}


	constructor() {
		super();

		this.readonly = false;
		this.disabled = false;
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

		if (!this.formatPattern) {
			this.formatPattern = LocaleData.getInstance(getLocale()).getTimePattern(this.getFormat().oFormatOptions.style);
		}
	}

	onBeforeRendering() {
		if (!this.value) {
			this.value = this.getFormat().format(new Date());
		}
		this._initHoursFormatParameters();
	}

	onAfterRendering() {
		const slidersEnablementArray = this._getSlidersContained(this.formatPattern);
		this._slidersDomRefs = this._getPopover().default.length ? [...this._getPopover().default[0].children].filter(x => x.isUI5Element) : this._getPopover().default;

		for (let i = 0; i < this._slidersDomRefs.length; i++) {
			this._slidersDomRefs[i].disabled = !slidersEnablementArray[i];
		}

		this.setSlidersValue();
	}

	_handleInputChange() {
		let nextValue = this._getInput().getInputValue();
		const isValid = this.isValid(nextValue);

		if (isValid) {
			nextValue = this.normalizeValue(nextValue);
		}

		this.setValue(nextValue);
		this.fireEvent("change", { value: nextValue, valid: isValid });
		this.fireEvent("value-changed", { value: nextValue, valid: isValid });
	}

	_handleInputLiveChange() {
		const nextValue = this._getInput().getInputValue(),
			isValid = this.isValid(nextValue);

		this.value = nextValue;
		this.fireEvent("input", { value: nextValue, valid: isValid });
	}

	setSlidersValue() {
		const currentDate = this._getInput() ? this.getFormat().parse(this._getInput().getAttribute("value")) : null,
			secondsSlider = this.shadowRoot.querySelector(".ui5-timepicker-seconds-wheelslider"),
			minutesSlider = this.shadowRoot.querySelector(".ui5-timepicker-minutes-wheelslider"),
			hoursSlider = this.shadowRoot.querySelector(".ui5-timepicker-hours-wheelslider"),
			periodsSlider = this.shadowRoot.querySelector(".ui5-timepicker-period-wheelslider");

		if (currentDate) {
			if (hoursSlider) {
				if (this._hoursParameters.isTwelveHoursFormat && currentDate.getHours() > this._hoursParameters.maxHour) {
					hoursSlider.value = currentDate.getHours() - 12;
				} else if (this._hoursParameters.isTwelveHoursFormat && currentDate.getHours() < this._hoursParameters.minHour) {
					hoursSlider.value = currentDate.getHours() + 12;
				} else {
					hoursSlider.value = currentDate.getHours();
				}
			}
			if (minutesSlider) {
				minutesSlider.value = currentDate.getMinutes();
			}
			if (secondsSlider) {
				secondsSlider.value = currentDate.getSeconds();
			}
			if (this._hoursParameters.isTwelveHoursFormat && periodsSlider && this._hoursParameters.minHour === 1) {
				periodsSlider.value = currentDate.getHours() > this._hoursParameters.maxHour ? this.periodsArray[1] : this.periodsArray[0];
			} else if (this._hoursParameters.isTwelveHoursFormat && periodsSlider) {
				periodsSlider.value = (currentDate.getHours() > this._hoursParameters.maxHour || currentDate.getHours() === this._hoursParameters.minHour) ? this.periodsArray[1] : this.periodsArray[0];
			}
		}
	}

	/**
	 * Closes the picker
	 * @public
	 */
	closePicker() {
		this._getPopover().close();

		for (let i = 0; i < this._slidersDomRefs.length; i++) {
			this._slidersDomRefs[i].collapseSlider();
		}
	}

	/**
	 * Opens the picker.
	 * @param {object} options A JSON object with additional configuration.<br>
	 * <code>{ focusInput: true }</code> By default, the focus goes in the picker after opening it.
	 * Specify this option to focus the input field.
	 * @public
	 */
	openPicker() {
		this._getPopover().open(this);
		this._isPickerOpen = true;
	}

	togglePicker() {
		if (this.isOpen()) {
			this.closePicker();
		} else if (this._canOpenPicker()) {
			this.openPicker();
		}
	}

	/**
	 * Checks if a value is valid against the current date format of the DatePicker
	 * @param {string} value A value to be tested against the current date format
	 * @public
	 */
	isOpen() {
		return !!this._isPickerOpen;
	}

	_canOpenPicker() {
		return !this.disabled && !this.readonly;
	}

	_getPopover() {
		return this.shadowRoot.querySelector("ui5-responsive-popover");
	}

	generateTimeItemsArray(x) {
		let array = [...Array(x).keys()];

		array = array.map(i => i.toString());

		return array;
	}

	get secondsArray() {
		return this.generateTimeItemsArray(60);
	}

	get minutesArray() {
		return this.generateTimeItemsArray(60);
	}

	get hoursArray() {
		let hoursValueArray = [];

		if (this._hoursParameters.isTwelveHoursFormat) {
			hoursValueArray = this.generateTimeItemsArray(12);
		} else {
			hoursValueArray = this.generateTimeItemsArray(24);
		}

		if (this._hoursParameters.minHour === 1) {
			hoursValueArray = hoursValueArray.map(x => (x * 1 + 1).toString());
		}

		return hoursValueArray;
	}

	get periodsArray() {
		return this.getFormat().aDayPeriods.map(x => x.toUpperCase());
	}

	_getInput() {
		return this.shadowRoot.querySelector("ui5-input");
	}

	submitPickers() {
		const selectedDate = new Date(),
			secondsSlider = this.shadowRoot.querySelector(".ui5-timepicker-seconds-wheelslider"),
			minutesSlider = this.shadowRoot.querySelector(".ui5-timepicker-minutes-wheelslider"),
			hoursSlider = this.shadowRoot.querySelector(".ui5-timepicker-hours-wheelslider"),
			periodsSlider = this.shadowRoot.querySelector(".ui5-timepicker-period-wheelslider"),
			hours = hoursSlider ? hoursSlider.getAttribute("value") : this._hoursParameters.minHour.toString(),
			minutes = minutesSlider ? minutesSlider.getAttribute("value") : "0",
			seconds = secondsSlider ? secondsSlider.getAttribute("value") : "0",
			period = periodsSlider ? periodsSlider.getAttribute("value") : this.periodsArray[0];

		if (period === this.periodsArray[1]) {
			selectedDate.setHours(hours * 1 + 12);
		} else {
			selectedDate.setHours(hours);
		}
		selectedDate.setMinutes(minutes);
		selectedDate.setSeconds(seconds);

		this.setValue(this.getFormat().format(selectedDate));

		this.fireEvent("change", { value: this.value, valid: true });

		this.closePicker();
	}

	/**
	 * Opens the picker.
	 * @public
	 */
	isValid(value = "") {
		return !!(value && this.getFormat().parse(value));
	}

	normalizeValue(sValue) {
		return this.getFormat().format(this.getFormat().parse(sValue));
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

	_onfocuscontainerin(e) {
		if (e.target !== e.currentTarget) {
			return;
		}
		let sliders = [];
		if (this._slidersDomRefs.length) {
			sliders = this._getPopover().default.length ? [...this._getPopover().default[0].children].filter(x => x.isUI5Element) : this._getPopover().default;
		} else {
			sliders = this._slidersDomRefs;
		}
		if (sliders[0]) {
			sliders[0].focus();
		}
	}

	_oncontainerkeydown(e) {
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
		if (isTabNext(e)) {
			this.shadowRoot.querySelector(".ui5-timepicker-footer").firstElementChild.focus();
		} else if (isTabPrevious(e)) {
			this.shadowRoot.querySelector(`#${this._id}-inner`).focus();
		}
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
			this.valueState = ValueState.None;
		} else {
			this.valueState = ValueState.Error;
		}
	}

	_getSlidersContained() {
		const formatArray = this.getFormat().aFormatArray,
			slidersBuildArray = [false, false, false, false]; // hours minutes seconds am/pm

		for (let i = 0; i < formatArray.length; i++) {
			if (this._hoursParameters.maxHour !== 0) {
				slidersBuildArray[0] = true;
			}
			if (this._hoursParameters.maxHour !== 0 && this._hoursParameters.isTwelveHoursFormat) {
				slidersBuildArray[3] = true;
				slidersBuildArray[0] = true;
			}
			if (formatArray[i].type === "minute") {
				slidersBuildArray[1] = true;
			}
			if (formatArray[i].type === "second") {
				slidersBuildArray[2] = true;
			}
		}

		return slidersBuildArray;
	}

	_initHoursFormatParameters() {
		const formatArray = this.getFormat().aFormatArray;

		if (formatArray[0].type === "hour0_23") {
			this._hoursParameters.minHour = 0;
			this._hoursParameters.maxHour = 23;
			this._hoursParameters.isTwelveHoursFormat = false;
		} else if (formatArray[0].type === "hour1_24") {
			this._hoursParameters.minHour = 1;
			this._hoursParameters.maxHour = 24;
			this._hoursParameters.isTwelveHoursFormat = false;
		} else if (formatArray[0].type === "hour0_11") {
			this._hoursParameters.minHour = 0;
			this._hoursParameters.maxHour = 11;
			this._hoursParameters.isTwelveHoursFormat = true;
		} else if (formatArray[0].type === "hour1_12") {
			this._hoursParameters.minHour = 1;
			this._hoursParameters.maxHour = 12;
			this._hoursParameters.isTwelveHoursFormat = true;
		}
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
}

TimePicker.define();

export default TimePicker;
